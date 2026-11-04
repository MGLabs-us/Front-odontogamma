import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { LANGS, Lang } from './core/i18n/languages';
import { ROUTE_PATHS, SERVICE_SLUGS } from './core/i18n/route-map';
import { LANG_PREFIX } from './core/i18n/languages';
import { PortfolioService } from './core/services/portfolio.service';

/**
 * Todas las páginas, en cada idioma, se generan como HTML estático al compilar (prerender),
 * así los buscadores y las vistas previas de WhatsApp/Facebook leen el contenido y las meta de cada ruta.
 */
const detailRoute = (lang: Lang): ServerRoute => ({
  path: [LANG_PREFIX[lang], ROUTE_PATHS['service-detail'][lang], ':slug'].filter(Boolean).join('/'),
  renderMode: RenderMode.Prerender,
  getPrerenderParams: async () => {
    const ids = inject(PortfolioService).serviceIds();
    return ids.map(id => ({ slug: SERVICE_SLUGS[id]?.[lang] ?? id }));
  }
});

export const serverRoutes: ServerRoute[] = [
  ...LANGS.map(detailRoute),
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
