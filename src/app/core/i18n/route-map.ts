import { LANG_PREFIX, Lang, LANGS } from './languages';

/** Identificador estable de cada página, igual en todos los idiomas. */
export type RouteKey =
  | 'home'
  | 'about'
  | 'doctor'
  | 'team'
  | 'location'
  | 'services'
  | 'service-detail'
  | 'before-after'
  | 'testimonials'
  | 'virtual-consultation'
  | 'contact';

/** Ruta (sin prefijo de idioma) de cada página en cada idioma. */
export const ROUTE_PATHS: Record<RouteKey, Record<Lang, string>> = {
  home: { 'en-us': '', 'en-gb': '', es: '' },
  about: {
    'en-us': 'who-we-are/about-us',
    'en-gb': 'who-we-are/about-us',
    es: 'quienes-somos/sobre-nosotros'
  },
  doctor: {
    'en-us': 'who-we-are/dr-jaime-arcila',
    'en-gb': 'who-we-are/dr-jaime-arcila',
    es: 'quienes-somos/dr-jaime-arcila'
  },
  team: {
    'en-us': 'who-we-are/our-team',
    'en-gb': 'who-we-are/our-team',
    es: 'quienes-somos/equipo'
  },
  location: {
    'en-us': 'who-we-are/our-location',
    'en-gb': 'who-we-are/our-location',
    es: 'quienes-somos/sede'
  },
  services: { 'en-us': 'treatments', 'en-gb': 'treatments', es: 'servicios' },
  'service-detail': { 'en-us': 'treatments', 'en-gb': 'treatments', es: 'servicios' },
  'before-after': {
    'en-us': 'our-work/before-and-after',
    'en-gb': 'our-work/before-and-after',
    es: 'nuestro-trabajo/antes-y-despues'
  },
  testimonials: {
    'en-us': 'our-work/testimonials',
    'en-gb': 'our-work/testimonials',
    es: 'nuestro-trabajo/testimonios'
  },
  'virtual-consultation': {
    'en-us': 'our-work/virtual-consultation',
    'en-gb': 'our-work/virtual-consultation',
    es: 'nuestro-trabajo/valoracion-virtual'
  },
  contact: { 'en-us': 'contact', 'en-gb': 'contact', es: 'contacto' }
};

/** Segmentos "padre" que solo redirigen a su primera página. */
export const PARENT_REDIRECTS: { segment: Record<Lang, string>; to: RouteKey }[] = [
  {
    segment: { 'en-us': 'who-we-are', 'en-gb': 'who-we-are', es: 'quienes-somos' },
    to: 'about'
  },
  {
    segment: { 'en-us': 'our-work', 'en-gb': 'our-work', es: 'nuestro-trabajo' },
    to: 'before-after'
  }
];

/** Slug de cada tratamiento en cada idioma (id interno -> slug). */
export const SERVICE_SLUGS: Record<string, Record<Lang, string>> = {
  'carillas-porcelana': {
    'en-us': 'porcelain-veneers',
    'en-gb': 'porcelain-veneers',
    es: 'carillas-porcelana'
  },
  'odontologia-cosmetica': {
    'en-us': 'cosmetic-dentistry',
    'en-gb': 'cosmetic-dentistry',
    es: 'odontologia-cosmetica'
  },
  'proceso-transformacion': {
    'en-us': 'smile-makeover-process',
    'en-gb': 'smile-makeover-process',
    es: 'proceso-transformacion'
  },
  'aclaramiento-laser': {
    'en-us': 'advanced-teeth-whitening',
    'en-gb': 'advanced-teeth-whitening',
    es: 'aclaramiento-laser'
  }
};

export const serviceSlug = (id: string, lang: Lang): string =>
  SERVICE_SLUGS[id]?.[lang] ?? id;

/** Devuelve el id interno de un tratamiento a partir de su slug en cualquier idioma. */
export const serviceIdFromSlug = (slug: string): string | undefined =>
  Object.keys(SERVICE_SLUGS).find(id => LANGS.some(l => SERVICE_SLUGS[id][l] === slug));

/** URL absoluta de path (con "/" inicial) de una página en un idioma. */
export function buildPath(lang: Lang, key: RouteKey, slug?: string): string {
  const parts = [LANG_PREFIX[lang], ROUTE_PATHS[key][lang], slug ?? ''].filter(Boolean);
  return '/' + parts.join('/');
}
