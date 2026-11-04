import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../../environments/environment';
import { I18nService } from '../i18n/i18n.service';
import { LANGS, LANG_HTML, LANG_OG_LOCALE, DEFAULT_LANG } from '../i18n/languages';

/** Foto de la sede recortada a 1200x630 para las vistas previas al compartir el enlace. */
const SHARE_IMAGE = `${environment.cloudinary.mediaBaseUrl}/image/upload/f_jpg,q_auto,w_1200,h_630,c_fill,g_auto/odontogamma/site/images/03a3b803-9acf-4fc8-b3e9-605d37a89c05`;

export interface PageSeo {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

/**
 * Mantiene al día title, description, canonical, Open Graph y robots en cada navegación.
 * Las rutas declaran `title` y `data: { description, noindex }`; las páginas dinámicas
 * (por ejemplo el detalle de un tratamiento) llaman a `update()` con sus propios datos.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(I18nService);

  init(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const leaf = this.leaf(this.router.routerState.snapshot.root);
      const key = leaf.data['routeKey'];
      if (key) {
        const slug = leaf.params['slug'] as string | undefined;
        this.i18n.setPage({ key, serviceId: slug ? this.i18n.serviceIdFromSlug(slug) : undefined });
      }
      this.apply(
        {
          title: this.title.getTitle(),
          description: leaf.data['description'],
          noindex: leaf.data['noindex']
        },
        (e as NavigationEnd).urlAfterRedirects
      );
    });
  }

  update(page: PageSeo): void {
    this.apply(page, this.router.url);
  }

  private apply(page: PageSeo, url: string): void {
    const description = this.clip(page.description ?? this.i18n.t('meta.defaultDescription'));
    const image = page.image ?? SHARE_IMAGE;
    const path = url.split(/[?#]/)[0];
    const canonical = environment.siteUrl + (path === '/' ? '' : path);

    if (page.title) this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: page.noindex ? 'noindex, follow' : 'index, follow' });

    this.meta.updateTag({ property: 'og:title', content: page.title ?? this.title.getTitle() });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:title', content: page.title ?? this.title.getTitle() });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.meta.updateTag({ property: 'og:locale', content: LANG_OG_LOCALE[this.i18n.lang()] });
    this.applyAlternates(page.noindex === true);

    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = canonical;
  }

  /** Enlaces `hreflang` a la misma página en cada idioma (más `x-default` hacia el inglés de EE. UU.). */
  private applyAlternates(skip: boolean): void {
    const head = this.document.head;
    head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    if (skip) return;
    const add = (hreflang: string, href: string) => {
      const el = this.document.createElement('link');
      el.rel = 'alternate';
      el.hreflang = hreflang;
      el.href = href;
      head.appendChild(el);
    };
    for (const lang of LANGS) {
      const path = this.i18n.currentPageIn(lang);
      add(LANG_HTML[lang], environment.siteUrl + (path === '/' ? '' : path));
    }
    const def = this.i18n.currentPageIn(DEFAULT_LANG);
    add('x-default', environment.siteUrl + (def === '/' ? '' : def));
  }

  /** Google recorta las descripciones largas; las dejamos en ~158 caracteres. */
  private clip(text: string): string {
    return text.length <= 158 ? text : text.slice(0, 155).replace(/\s+\S*$/, '') + '…';
  }

  private leaf(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let r = route;
    while (r.firstChild) r = r.firstChild;
    return r;
  }
}
