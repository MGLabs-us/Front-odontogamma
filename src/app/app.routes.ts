import { inject, Type } from '@angular/core';
import { ResolveFn, Route, Routes } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import { I18nService } from './core/i18n/i18n.service';
import { LANGS, LANG_PREFIX, Lang } from './core/i18n/languages';
import { PARENT_REDIRECTS, ROUTE_PATHS, RouteKey, buildPath } from './core/i18n/route-map';

/** Páginas del sitio: clave de ruta, clave de las meta en el diccionario y componente (carga diferida). */
interface PageDef {
  key: RouteKey;
  meta: string;
  load: () => Promise<Type<unknown>>;
}

const PAGES: PageDef[] = [
  {
    key: 'home',
    meta: 'home',
    load: () => import('./features/home/pages/home.component').then(m => m.HomeComponent)
  },
  {
    key: 'about',
    meta: 'about',
    load: () =>
      import('./features/who-we-are/pages/about-us/about-us.component').then(m => m.AboutUsComponent)
  },
  {
    key: 'doctor',
    meta: 'doctor',
    load: () =>
      import('./features/who-we-are/pages/chief-doctor/chief-doctor.component').then(
        m => m.ChiefDoctorComponent
      )
  },
  {
    key: 'team',
    meta: 'team',
    load: () => import('./features/who-we-are/pages/team/team.component').then(m => m.TeamComponent)
  },
  {
    key: 'location',
    meta: 'location',
    load: () =>
      import('./features/who-we-are/pages/location/location.component').then(m => m.LocationComponent)
  },
  {
    key: 'services',
    meta: 'services',
    load: () =>
      import('./features/services/pages/services.component').then(m => m.ServicesComponent)
  },
  {
    key: 'service-detail',
    meta: 'serviceDetail',
    load: () =>
      import('./features/services/pages/service-detail/service-detail.component').then(
        m => m.ServiceDetailComponent
      )
  },
  {
    key: 'before-after',
    meta: 'beforeAfter',
    load: () =>
      import('./features/our-work/pages/before-after/before-after.component').then(
        m => m.BeforeAfterComponent
      )
  },
  {
    key: 'testimonials',
    meta: 'testimonials',
    load: () =>
      import('./features/our-work/pages/testimonials/testimonials.component').then(
        m => m.TestimonialsComponent
      )
  },
  {
    key: 'virtual-consultation',
    meta: 'virtual',
    load: () =>
      import('./features/our-work/pages/virtual-consultation/virtual-consultation.component').then(
        m => m.VirtualConsultationComponent
      )
  },
  {
    key: 'contact',
    meta: 'contact',
    load: () => import('./features/contact/pages/contact.component').then(m => m.ContactComponent)
  }
];

/** Fija el idioma antes de pintar la página (el prefijo de la URL manda). */
const langResolver =
  (lang: Lang): ResolveFn<Lang> =>
  async () => {
    const transloco = inject(TranslocoService);
    const i18n = inject(I18nService);
    await firstValueFrom(transloco.load(lang));
    i18n.setLang(lang);
    return lang;
  };

/** Lee una cadena del diccionario del idioma de la ruta (título y descripción de cada página). */
const metaResolver =
  (lang: Lang, key: string): ResolveFn<string> =>
  async () => {
    const transloco = inject(TranslocoService);
    await firstValueFrom(transloco.load(lang));
    return transloco.translate(key, {}, lang);
  };

function pageRoute(lang: Lang, page: PageDef): Route {
  const base = ROUTE_PATHS[page.key][lang];
  const path = page.key === 'service-detail' ? `${base}/:slug` : base;
  return {
    path,
    pathMatch: path === '' ? 'full' : undefined,
    loadComponent: page.load,
    title: metaResolver(lang, `meta.${page.meta}.title`),
    resolve: { description: metaResolver(lang, `meta.${page.meta}.description`) },
    data: { routeKey: page.key }
  };
}

/** Árbol de rutas de un idioma: mismas páginas, rutas traducidas y bajo su prefijo. */
function langTree(lang: Lang): Route {
  return {
    path: LANG_PREFIX[lang],
    loadComponent: () => import('./layout/main-layout.component').then(m => m.MainLayoutComponent),
    resolve: { lang: langResolver(lang) },
    data: { lang },
    children: [
      ...PAGES.map(page => pageRoute(lang, page)),
      ...PARENT_REDIRECTS.map(
        (r): Route => ({
          path: r.segment[lang],
          pathMatch: 'full',
          redirectTo: buildPath(lang, r.to)
        })
      ),
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: metaResolver(lang, 'meta.notFound.title'),
        data: { noindex: true }
      }
    ]
  };
}

/**
 * Enrutador principal de Odontogamma Oriente.
 * Inglés (EE. UU.) vive en la raíz; inglés (Reino Unido) bajo `/en-gb` y español bajo `/es`.
 * El árbol de la raíz va al final porque su `**` captura cualquier ruta no reconocida.
 */
export const routes: Routes = [
  ...LANGS.filter(l => LANG_PREFIX[l] !== '').map(langTree),
  ...LANGS.filter(l => LANG_PREFIX[l] === '').map(langTree)
];
