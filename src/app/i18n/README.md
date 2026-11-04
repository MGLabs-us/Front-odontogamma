# Traducciones

Idiomas: `en-us` (principal, sin prefijo en la URL), `en-gb` (`/en-gb`) y `es` (`/es`).

- Cada idioma tiene un JSON por sección (`home.json`, `services.json`, `common.json`...). La clave raíz de cada archivo es el nombre de la sección.
- `en-gb` solo guarda lo que cambia respecto a `en-us` (ortografía y vocabulario británico); el resto se hereda.
- Para añadir un texto: créalo en `es` y `en-us` con la misma clave (`i18n.spec.ts` falla si faltan o si cambian los parámetros `{{ x }}`).
- En plantillas: `{{ 'home.hero.title' | transloco }}`. Enlaces: `[routerLink]="'contact' | route"`. WhatsApp: `[href]="'whatsapp.contact' | whatsapp"`.
- En TypeScript: `inject(I18nService).t('clave')` dentro de un `computed` (se recalcula al cambiar de idioma).
- Rutas y slugs por idioma: `src/app/core/i18n/route-map.ts`.
