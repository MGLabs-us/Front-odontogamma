import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Lang } from './languages';
import { deepMerge } from './merge';

/**
 * Cada idioma vive en `src/app/i18n/<idioma>/<sección>.json`; el archivo de una sección
 * tiene como única clave raíz el nombre de la sección (p. ej. `home.json` -> `{ "home": {...} }`).
 */
export const I18N_SECTIONS = [
  'common',
  'home',
  'about',
  'doctor',
  'team',
  'location',
  'services',
  'cases',
  'beforeAfter',
  'testimonials',
  'virtual',
  'contact',
  'notFound'
] as const;

type Dict = Record<string, unknown>;

async function loadLang(lang: Lang): Promise<Dict> {
  const parts = await Promise.all(
    I18N_SECTIONS.map(async section => {
      const mod = await import(`../../i18n/${lang}/${section}.json`);
      return (mod.default ?? mod) as Dict;
    })
  );
  return Object.assign({}, ...parts);
}

/**
 * Carga los diccionarios incluidos en el bundle (sin peticiones HTTP, así funcionan igual en el prerender).
 * `en-gb` parte de `en-us` y solo sobrescribe lo que cambia en inglés británico.
 */
@Injectable({ providedIn: 'root' })
export class AppTranslocoLoader implements TranslocoLoader {
  public async getTranslation(lang: string): Promise<Translation> {
    if (lang === 'en-gb') {
      return deepMerge(await loadLang('en-us'), await loadLang('en-gb')) as Translation;
    }
    return (await loadLang(lang as Lang)) as Translation;
  }
}
