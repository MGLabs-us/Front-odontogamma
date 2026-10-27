import { readdir, rm, rmdir } from 'node:fs/promises';
import path from 'node:path';
import { ROOT, mapLimit } from './lib.mjs';

process.loadEnvFile(path.join(ROOT, '.env'));
const { v2: cloudinary } = await import('cloudinary');
cloudinary.config({ secure: true });

const PUBLIC_DIR = path.join(ROOT, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const VIDEOS_DIR = path.join(PUBLIC_DIR, 'videos');
const FOLDER = 'odontogamma/site';
const dryRun = process.argv.includes('--dry');
const deleteLocal = process.argv.includes('--delete-local');
const overwrite = process.argv.includes('--overwrite');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const images = [];
for await (const file of walk(IMAGES_DIR)) {
  if (file.endsWith('-1400.webp') || file.endsWith('.svg')) images.push(file);
}

const videos = [];
for await (const file of walk(VIDEOS_DIR)) {
  if (file.endsWith('.webm')) videos.push(file);
}

const imagePublicId = (file) => {
  const relative = path.relative(IMAGES_DIR, file).split(path.sep).join('/');
  return `${FOLDER}/images/${relative.replace(/-1400\.webp$/, '').replace(/\.svg$/, '')}`;
};

const videoPublicId = (file) => {
  const relative = path.relative(VIDEOS_DIR, file).split(path.sep).join('/');
  return `${FOLDER}/videos/${relative.replace(/\.webm$/, '')}`;
};

const uploads = [
  ...images.map((file) => ({
    file,
    publicId: imagePublicId(file),
    resourceType: 'image',
    expectedFormat: file.endsWith('.svg') ? 'svg' : 'webp',
  })),
  ...videos.map((file) => ({
    file,
    publicId: videoPublicId(file),
    resourceType: 'video',
    expectedFormat: 'webm',
  })),
];

console.log(
  `${images.length} imágenes y ${videos.length} videos -> Cloudinary "${cloudinary.config().cloud_name}"` +
    `${dryRun ? ' (dry run)' : ''}${deleteLocal ? ' [limpieza local al finalizar]' : ''}`,
);

if (dryRun) {
  uploads.slice(0, 10).forEach(({ publicId }) => console.log(`  ${publicId}`));
  process.exit(0);
}

if (uploads.length === 0) {
  throw new Error('No se encontraron archivos WebP/SVG o WebM para subir.');
}

const failed = [];
let done = 0;
await mapLimit(uploads, 4, async ({ file, publicId, resourceType, expectedFormat }) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      public_id: publicId,
      overwrite,
      invalidate: overwrite,
      resource_type: resourceType,
    });
    if (
      result.public_id !== publicId ||
      !result.secure_url ||
      result.bytes <= 0 ||
      result.format !== expectedFormat
    ) {
      throw new Error(`Respuesta de Cloudinary no válida (${result.format ?? 'sin formato'})`);
    }
    console.log(`OK ${publicId}`);
  } catch (error) {
    failed.push(`${publicId}: ${error.message}`);
  }
  done++;
  if (done % 10 === 0 || done === uploads.length) console.log(`${done}/${uploads.length}`);
});

if (failed.length) {
  failed.forEach((failure) => console.error('FAILED', failure));
  console.error('No se borraron archivos locales porque hubo cargas fallidas.');
  process.exitCode = 1;
} else {
  console.log(`Subidos y verificados: ${uploads.length}/${uploads.length}`);
  if (deleteLocal) {
    const removableExtensions = new Set([
      '.cr3',
      '.jpg',
      '.jpeg',
      '.png',
      '.mp4',
      '.mov',
      '.m4v',
      '.webm',
      '.webp',
    ]);
    const localMedia = [];
    for await (const file of walk(PUBLIC_DIR)) {
      const basename = path.basename(file);
      if (
        removableExtensions.has(path.extname(file).toLowerCase()) &&
        !/(?:^|[-_])(logo|wordmark|brand|favicon)(?:[-_.]|$)/i.test(basename)
      ) {
        localMedia.push(file);
      }
    }
    for (const file of localMedia) await rm(file);

    const publicDirs = await readdir(PUBLIC_DIR, { withFileTypes: true });
    const directories = [
      ...new Set([
        IMAGES_DIR,
        VIDEOS_DIR,
        ...publicDirs
          .filter((entry) => entry.isDirectory())
          .map((entry) => path.join(PUBLIC_DIR, entry.name)),
      ]),
    ];
    for (const dir of directories) {
      try {
        await rmdir(dir);
      } catch (error) {
        if (error.code !== 'ENOTEMPTY' && error.code !== 'ENOENT') throw error;
      }
    }
    console.log(`Archivos multimedia locales borrados: ${localMedia.length}`);
  }
}
