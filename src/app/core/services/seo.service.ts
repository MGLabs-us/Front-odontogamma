import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../../environments/environment';

const DEFAULT_DESCRIPTION =
  'Odontología estética, carillas de porcelana y diseño de sonrisa en El Carmen de Viboral, Oriente Antioqueño.';

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

  init(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const leaf = this.leaf(this.router.routerState.snapshot.root);
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
    const description = this.clip(page.description ?? DEFAULT_DESCRIPTION);
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

    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = canonical;
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
