import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { DEFAULT_LANG, LANGS } from './languages';
import { AppTranslocoLoader } from './transloco-loader';

/** Configuración de Transloco compartida por la app y por los tests. */
export const provideI18n = () =>
  provideTransloco({
    config: {
      availableLangs: [...LANGS],
      defaultLang: DEFAULT_LANG,
      fallbackLang: DEFAULT_LANG,
      reRenderOnLangChange: true,
      prodMode: !isDevMode(),
      missingHandler: { useFallbackTranslation: true }
    },
    loader: AppTranslocoLoader
  });
