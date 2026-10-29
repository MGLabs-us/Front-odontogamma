import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { PortfolioService } from './core/services/portfolio.service';

/**
 * Todas las páginas se generan como HTML estático al compilar (prerender),
 * así los buscadores y las vistas previas de WhatsApp/Facebook leen el contenido y las meta de cada ruta.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'servicios/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => inject(PortfolioService).services().map(s => ({ slug: s.slug }))
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
