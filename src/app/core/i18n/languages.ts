/**
 * Idiomas soportados. `en-us` es el idioma principal (sin prefijo en la URL);
 * `en-gb` solo guarda las diferencias de ortografía y vocabulario respecto a `en-us`.
 */
export const LANGS = ['en-us', 'en-gb', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'en-us';

/** Prefijo de URL de cada idioma ('' = raíz del sitio). */
export const LANG_PREFIX: Record<Lang, string> = {
  'en-us': '',
  'en-gb': 'en-gb',
  es: 'es'
};

/** Valor del atributo `lang` del <html> y de `hreflang`. */
export const LANG_HTML: Record<Lang, string> = {
  'en-us': 'en-US',
  'en-gb': 'en-GB',
  es: 'es'
};

/** Valor de `og:locale`. */
export const LANG_OG_LOCALE: Record<Lang, string> = {
  'en-us': 'en_US',
  'en-gb': 'en_GB',
  es: 'es_CO'
};

/** Nombre del idioma escrito en el propio idioma (para el selector). */
export const LANG_LABEL: Record<Lang, string> = {
  'en-us': 'English (US)',
  'en-gb': 'English (UK)',
  es: 'Español'
};

/** Código corto que se muestra en el botón del selector. */
export const LANG_SHORT: Record<Lang, string> = {
  'en-us': 'EN',
  'en-gb': 'UK',
  es: 'ES'
};

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && (LANGS as readonly string[]).includes(value);
