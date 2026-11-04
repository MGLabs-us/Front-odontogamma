// scripts/sitemap.mjs
// Genera public/sitemap.xml (con hreflang) a partir del prerender en dist/.
//
// Uso:
//   npm run build && npm run sitemap
//
// Lista sólo las páginas cuyo <link rel="canonical"> coincide con su propia ruta (las que solo
// redirigen, como /who-we-are, quedan fuera) y que no son noindex. Cada URL incluye sus equivalentes
// en los demás idiomas, tomados de los <link rel="alternate" hreflang> que ya escribe SeoService.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const BROWSER = path.join(ROOT, 'dist/odontoGammaOriente/browser');
const SITE = 'https://odontogammaoriente.com';

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name === 'index.html') yield full;
  }
}

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

const pages = [];
for await (const file of walk(BROWSER)) {
  const html = await readFile(file, 'utf8');
  const rel = '/' + path.relative(BROWSER, path.dirname(file)).split(path.sep).filter(Boolean).join('/');
  const canonical = attr(html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0] ?? '', 'href');
  const robots = attr(html.match(/<meta[^>]*name="robots"[^>]*>/)?.[0] ?? '', 'content') ?? '';
  const own = SITE + (rel === '/' ? '' : rel);
  if (!canonical || canonical !== own || robots.includes('noindex')) continue;
  const alternates = [...html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang[^>]*>/g)].map(m => ({
    hreflang: attr(m[0], 'hreflang'),
    href: attr(m[0], 'href')
  }));
  pages.push({ loc: own, alternates });
}

pages.sort((a, b) => a.loc.localeCompare(b.loc));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...pages.map(p =>
    [
      '  <url>',
      `    <loc>${p.loc}${p.loc === SITE ? '/' : ''}</loc>`,
      ...p.alternates.map(a => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}${a.href === SITE ? '/' : ''}"/>`),
      '  </url>'
    ].join('\n')
  ),
  '</urlset>',
  ''
].join('\n');

await writeFile(path.join(ROOT, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml: ${pages.length} URLs`);
