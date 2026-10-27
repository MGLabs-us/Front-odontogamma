// scripts/convert.mjs
// Convierte fotos -> WebP 1400px y videos -> WebM (VP9) listos para upload.mjs
//
// Uso:
//   node scripts/convert.mjs [--dry] [--force] [--only=images|videos]
//   node scripts/upload.mjs --delete-local
//
// Requisitos: sharp, ffmpeg y ImageMagick o exiftool para archivos .CR3.

import { readdir, mkdir, stat, rename, rm, appendFile, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';
import { ROOT } from './lib.mjs';

const run = promisify(execFile);

/* ───────────────────────── Configuración ───────────────────────── */

const SOURCES = [
  'drive-download-20261026T181522Z-1-001',
  'Fotos octubre 2026-20261026T181244Z-1-001',
  'videos',
].map((d) => path.join(ROOT, 'public', d));

const OUT_IMAGES = path.join(ROOT, 'public/images');
const OUT_VIDEOS = path.join(ROOT, 'public/videos');
const ERROR_LOG = path.join(ROOT, 'scripts/convert-errors.log');

const IMAGE_WIDTH = 1400;
const IMAGE_QUALITY = 80;

const VIDEO_MAX_SIDE = 1280; // lado largo máximo (720p)
const VIDEO_CRF = 40;
const VIDEO_TIMEOUT_MS = 20 * 60 * 1000; // 20 min por video

// Límites para 8 GB de RAM
const IMAGE_CONCURRENCY = 2; // fotos en paralelo
const VIDEO_CONCURRENCY = 1; // videos en paralelo (ffmpeg es lo que más pesa)
const FFMPEG_THREADS = 2;
const SHARP_CACHE_MB = 64;
const MIN_FREE_MB = 900; // si la RAM disponible baja de esto, se pausa antes de iniciar otro archivo
const MEMORY_WAIT_TIMEOUT_MS = 5 * 60 * 1000;

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png']);
const RAW_EXT = new Set(['.cr3']);
const VIDEO_EXT = new Set(['.mov', '.mp4', '.m4v']);

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const FORCE = args.includes('--force');
const ONLY = args.find((a) => a.startsWith('--only='))?.split('=')[1]; // images | videos

/* ───────────────────────── Utilidades ───────────────────────── */

sharp.cache({ memory: SHARP_CACHE_MB, files: 0, items: 50 });
sharp.concurrency(2);

let aborted = false;
const children = new Set();

process.on('SIGINT', () => {
  if (aborted) process.exit(130); // segundo Ctrl+C: salir ya
  aborted = true;
  console.log('\n⏹  Cancelando... (Ctrl+C otra vez para forzar)');
  for (const c of children) c.kill('SIGKILL');
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fmtTime = (ms) => {
  const s = Math.round(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h ? `${h}h${String(m).padStart(2, '0')}m` : m ? `${m}m${String(sec).padStart(2, '0')}s` : `${sec}s`;
};

const fmtSize = (bytes) =>
  bytes > 1024 ** 2 ? `${(bytes / 1024 ** 2).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const slug = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function availableMb() {
  try {
    const m = readFileSync('/proc/meminfo', 'utf8').match(/MemAvailable:\s+(\d+)/);
    if (m) return Math.round(Number(m[1]) / 1024);
  } catch {}
  return Math.round(os.freemem() / 1024 / 1024);
}

async function waitForMemory(label) {
  const start = Date.now();
  let warned = false;
  while (availableMb() < MIN_FREE_MB) {
    if (aborted) return;
    if (!warned) {
      console.log(`   ⏸  RAM baja (${availableMb()} MB libres), esperando antes de ${label}...`);
      warned = true;
    }
    if (Date.now() - start > MEMORY_WAIT_TIMEOUT_MS) {
      throw new Error(`Sin memoria suficiente tras ${fmtTime(MEMORY_WAIT_TIMEOUT_MS)} (${availableMb()} MB libres)`);
    }
    await sleep(2000);
  }
}

async function pool(items, limit, worker) {
  let next = 0;
  const lanes = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (!aborted) {
      const i = next++;
      if (i >= items.length) return;
      await worker(items[i], i);
    }
  });
  await Promise.all(lanes);
}

async function* walk(dir) {
  const entries = (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function hasBinary(bin, versionArg = '-version') {
  try { await run(bin, [versionArg]); return true; } catch { return false; }
}

/* ───────────────────────── Conversión ───────────────────────── */

async function extractRawPreview(file) {
  // Saca el JPEG embebido del RAW (.CR3) con exiftool
  for (const tag of ['-JpgFromRaw', '-PreviewImage']) {
    try {
      const { stdout } = await run('exiftool', ['-b', tag, file], {
        encoding: 'buffer',
        maxBuffer: 80 * 1024 * 1024,
      });
      if (stdout?.length > 10_000) return stdout;
    } catch {}
  }
  throw new Error('No se pudo extraer una vista previa del RAW');
}

async function convertImage(job) {
  const tmp = job.out.replace(/\.webp$/, '.part.webp');
  try {
    if (job.raw && !hasExiftool) {
      await run('convert', [
        `${job.src}[0]`,
        '-auto-orient',
        '-resize', `${IMAGE_WIDTH}x>`,
        '-quality', String(IMAGE_QUALITY),
        tmp,
      ]);
      await rename(tmp, job.out);
      return;
    }

    const input = job.raw ? await extractRawPreview(job.src) : job.src;
    await sharp(input, { sequentialRead: true, failOn: 'none' })
      .rotate() // respeta orientación EXIF
      .resize({ width: IMAGE_WIDTH, withoutEnlargement: true })
      .webp({ quality: IMAGE_QUALITY })
      .toFile(tmp);
    await rename(tmp, job.out);
  } catch (err) {
    await rm(tmp, { force: true });
    throw err;
  }
}

async function probeDuration(file) {
  try {
    const { stdout } = await run('ffprobe', [
      '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file,
    ]);
    const d = parseFloat(stdout);
    return Number.isFinite(d) ? d : 0;
  } catch {
    return 0;
  }
}

// Reduce el lado largo a VIDEO_MAX_SIDE sin agrandar (funciona en horizontal y vertical)
const VIDEO_FILTER =
  `scale=w='if(gt(iw,ih),min(${VIDEO_MAX_SIDE},iw),-2)':h='if(gt(iw,ih),-2,min(${VIDEO_MAX_SIDE},ih))'`;

async function convertVideo(job, onProgress) {
  const tmp = job.out.replace(/\.webm$/, '.part.webm');
  const duration = await probeDuration(job.src);

  const ffArgs = [
    '-n', '10', 'ffmpeg',
    '-hide_banner', '-loglevel', 'error', '-nostdin', '-y',
    '-i', job.src,
    '-vf', VIDEO_FILTER,
    '-c:v', 'libvpx-vp9', '-crf', String(VIDEO_CRF), '-b:v', '0',
    '-deadline', 'good', '-cpu-used', '4', '-row-mt', '1',
    '-threads', String(FFMPEG_THREADS),
    '-pix_fmt', 'yuv420p',
    '-c:a', 'libopus', '-b:a', '96k',
    '-f', 'webm',
    '-progress', 'pipe:1',
    tmp,
  ];

  await new Promise((resolve, reject) => {
    const child = spawn('nice', ffArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
    children.add(child);
    let stderrTail = '';
    let buf = '';
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error(`Timeout (${fmtTime(VIDEO_TIMEOUT_MS)})`));
    }, VIDEO_TIMEOUT_MS);

    child.stdout.on('data', (d) => {
      buf += d.toString();
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        const m = line.match(/^out_time_(?:us|ms)=(\d+)/);
        if (m && duration > 0) {
          const pct = Math.min(99, Math.round((Number(m[1]) / 1e6 / duration) * 100));
          onProgress?.(pct);
        }
      }
    });
    child.stderr.on('data', (d) => { stderrTail = (stderrTail + d.toString()).slice(-1500); });
    child.on('error', (e) => { clearTimeout(timer); children.delete(child); reject(e); });
    child.on('close', (code, signal) => {
      clearTimeout(timer);
      children.delete(child);
      if (code === 0) resolve();
      else reject(new Error(signal ? `ffmpeg terminado (${signal})` : `ffmpeg salió con código ${code}\n${stderrTail.trim()}`));
    });
  }).catch(async (err) => {
    await rm(tmp, { force: true });
    throw err;
  });

  await rename(tmp, job.out);
}

/* ───────────────────────── Fase genérica con progreso ───────────────────────── */

async function runPhase(title, jobs, concurrency, convertFn) {
  const stats = { ok: 0, skipped: 0, failed: 0, ms: 0, inBytes: 0, outBytes: 0 };
  if (!jobs.length) return stats;

  console.log(`\n━━ ${title}: ${jobs.length} archivos (concurrencia ${concurrency}) ━━`);
  const phaseStart = Date.now();
  let finished = 0;
  const durations = [];

  await pool(jobs, concurrency, async (job, index) => {
    const tag = `[${String(index + 1).padStart(String(jobs.length).length, ' ')}/${jobs.length}]`;
    const name = path.basename(job.src);

    if (!FORCE && (await exists(job.out))) {
      stats.skipped++;
      finished++;
      console.log(`${tag} ⏭  ${name} (ya existe)`);
      return;
    }

    const t0 = Date.now();
    try {
      await waitForMemory(name);
      if (aborted) return;
      const lastPct = { v: -1 };
      const onProgress = (pct) => {
        if (pct - lastPct.v >= 10) {
          lastPct.v = pct;
          console.log(`   … ${name}: ${pct}%  (RAM libre ${availableMb()} MB)`);
        }
      };
      await convertFn(job, onProgress);
      const ms = Date.now() - t0;
      const [inS, outS] = [(await stat(job.src)).size, (await stat(job.out)).size];
      durations.push(ms);
      stats.ok++;
      stats.inBytes += inS;
      stats.outBytes += outS;
      finished++;

      const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
      const remaining = jobs.length - finished;
      const eta = remaining ? ` | ETA ~${fmtTime((avg * remaining) / concurrency)}` : '';
      console.log(
        `${tag} ✔ ${name} → ${path.basename(job.out)}  ${fmtSize(inS)} → ${fmtSize(outS)}  (${fmtTime(ms)})` +
          ` | RAM libre ${availableMb()} MB${eta}`,
      );

    } catch (err) {
      if (aborted) return;
      stats.failed++;
      finished++;
      const msg = String(err.message || err).split('\n')[0];
      console.error(`${tag} ✘ ${name}: ${msg}`);
      await appendFile(ERROR_LOG, `[${new Date().toISOString()}] ${job.src}\n${err.stack || err}\n\n`);
    }
  });

  stats.ms = Date.now() - phaseStart;
  return stats;
}

/* ───────────────────────── Main ───────────────────────── */

const globalStart = Date.now();
console.log(`RAM disponible al inicio: ${availableMb()} MB (mínimo configurado: ${MIN_FREE_MB} MB)`);

const needVideos = ONLY !== 'images';
const hasFfmpeg = await hasBinary('ffmpeg');
const hasFfprobe = await hasBinary('ffprobe');
const hasExiftool = await hasBinary('exiftool', '-ver');
const hasImageMagick = await hasBinary('convert');

if (needVideos && (!hasFfmpeg || !hasFfprobe)) {
  console.error('✘ Falta ffmpeg/ffprobe. Instala con: sudo apt install ffmpeg');
  process.exit(1);
}

await mkdir(OUT_IMAGES, { recursive: true });
await mkdir(OUT_VIDEOS, { recursive: true });
await writeFile(ERROR_LOG, '');

// Limpia restos de ejecuciones canceladas
for (const dir of [OUT_IMAGES, OUT_VIDEOS]) {
  for await (const f of walk(dir)) if (/\.part\.(webp|webm)$/.test(f)) await rm(f, { force: true });
}

// Descubrir archivos
const imageJobs = [];
const videoJobs = [];
const notices = [];
const usedImg = new Set();
const usedVid = new Set();

const uniqueName = (base, used) => {
  let n = base || 'archivo';
  for (let k = 2; used.has(n); k++) n = `${base}-${k}`;
  used.add(n);
  return n;
};

for (const dir of SOURCES) {
  if (!(await exists(dir))) {
    notices.push(`Carpeta no encontrada: ${dir}`);
    continue;
  }
  for await (const f of walk(dir)) {
    const ext = path.extname(f).toLowerCase();
    const base = slug(path.basename(f, path.extname(f)));
    if (IMAGE_EXT.has(ext)) {
      imageJobs.push({ src: f, out: path.join(OUT_IMAGES, `${uniqueName(base, usedImg)}-${IMAGE_WIDTH}.webp`) });
    } else if (RAW_EXT.has(ext)) {
      if (hasExiftool || hasImageMagick) {
        imageJobs.push({ src: f, raw: true, out: path.join(OUT_IMAGES, `${uniqueName(base, usedImg)}-${IMAGE_WIDTH}.webp`) });
      } else {
        notices.push(`RAW sin convertir; instala exiftool o ImageMagick: ${path.basename(f)}`);
      }
    } else if (VIDEO_EXT.has(ext)) {
      videoJobs.push({ src: f, out: path.join(OUT_VIDEOS, `${uniqueName(base, usedVid)}.webm`) });
    } else if (!path.basename(f).startsWith('.')) {
      notices.push(`Omitido (formato no soportado): ${path.basename(f)}`);
    }
  }
}

console.log(`Encontrados: ${imageJobs.length} imágenes, ${videoJobs.length} videos`);

if (DRY) {
  [...imageJobs, ...videoJobs].slice(0, 15).forEach((j) => console.log(`  ${path.basename(j.src)} → ${path.basename(j.out)}`));
  notices.forEach((n) => console.log('  ⚠', n));
  console.log('(dry run, no se convirtió nada)');
  process.exit(0);
}

if (notices.some((notice) => notice.startsWith('RAW sin convertir'))) {
  notices.forEach((notice) => console.error('✘', notice));
  process.exit(1);
}

const imgStats = ONLY === 'videos' ? null : await runPhase('Imágenes', imageJobs, IMAGE_CONCURRENCY, convertImage);
const vidStats = ONLY === 'images' || aborted ? null : await runPhase('Videos', videoJobs, VIDEO_CONCURRENCY, convertVideo);

/* ───────────────────────── Resumen ───────────────────────── */

const line = (label, s) =>
  s && `  ${label}: ${s.ok} ok, ${s.skipped} omitidos, ${s.failed} con error` +
  (s.ok ? ` | ${fmtSize(s.inBytes)} → ${fmtSize(s.outBytes)}` : '') +
  ` | ${fmtTime(s.ms)}`;

console.log('\n━━ Resumen ━━');
[line('Imágenes', imgStats), line('Videos  ', vidStats)].filter(Boolean).forEach((l) => console.log(l));
notices.forEach((n) => console.log('  ⚠', n));
console.log(`  Tiempo total: ${fmtTime(Date.now() - globalStart)}`);

const totalFailed = (imgStats?.failed ?? 0) + (vidStats?.failed ?? 0);
if (totalFailed) console.log(`  Detalle de errores en: ${ERROR_LOG}`);
if (aborted) console.log('  ⏹ Ejecución cancelada: vuelve a correr el script y continuará donde quedó (omite lo ya convertido).');

process.exitCode = aborted ? 130 : totalFailed ? 1 : 0;
