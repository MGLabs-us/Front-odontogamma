import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { DEFAULT_LANG, LANGS, LANG_HTML, Lang, isLang } from './languages';
import { RouteKey, buildPath, serviceIdFromSlug, serviceSlug } from './route-map';

const STORAGE_KEY = 'og-lang';

/** Página actual: clave de ruta y, en el detalle de un tratamiento, el id del tratamiento. */
export interface CurrentPage {
  key: RouteKey;
  serviceId?: string;
}

/**
 * Punto único del idioma: idioma activo, enlaces localizados, cambio de idioma
 * (navega a la misma página en el otro idioma) y traducción desde TypeScript.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly transloco = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  private readonly langSignal = signal<Lang>(DEFAULT_LANG);
  public readonly lang = this.langSignal.asReadonly();
  public readonly langs = LANGS;
  public readonly isSpanish = computed(() => this.langSignal() === 'es');

  private readonly pageSignal = signal<CurrentPage>({ key: 'home' });
  public readonly page = this.pageSignal.asReadonly();

  /** Activa un idioma (lo llama el enrutador al entrar en el árbol de rutas de ese idioma). */
  public setLang(lang: Lang): void {
    if (this.langSignal() !== lang) {
      this.langSignal.set(lang);
    }
    this.transloco.setActiveLang(lang);
    this.document.documentElement.lang = LANG_HTML[lang];
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, lang);
    } catch {
      /* almacenamiento no disponible (modo privado, prerender) */
    }
  }

  public setPage(page: CurrentPage): void {
    this.pageSignal.set(page);
  }

  /** Enlace absoluto a una página en el idioma activo (o en `lang`). */
  public link(key: RouteKey, slug?: string, lang: Lang = this.langSignal()): string {
    return buildPath(lang, key, slug);
  }

  /** Enlace al detalle de un tratamiento (por su id interno) en el idioma indicado. */
  public serviceLink(serviceId: string, lang: Lang = this.langSignal()): string {
    return buildPath(lang, 'service-detail', serviceSlug(serviceId, lang));
  }

  /** URL de la página actual en otro idioma. */
  public currentPageIn(lang: Lang): string {
    const { key, serviceId } = this.pageSignal();
    return key === 'service-detail' && serviceId
      ? this.serviceLink(serviceId, lang)
      : buildPath(lang, key);
  }

  /** Cambia de idioma navegando a la misma página en ese idioma. */
  public switchTo(lang: Lang): void {
    if (lang === this.langSignal()) return;
    void this.router.navigateByUrl(this.currentPageIn(lang));
  }

  /** Id del tratamiento a partir de un slug (de cualquier idioma). */
  public serviceIdFromSlug(slug: string): string | undefined {
    return serviceIdFromSlug(slug);
  }

  /** Traduce una clave; al leer `lang()` queda registrada como dependencia en `computed` y plantillas. */
  public t(key: string, params?: Record<string, unknown>): string {
    const lang = this.langSignal();
    return this.transloco.translate(key, params, lang);
  }

  /** Devuelve un objeto/arreglo completo del diccionario (para listas de tarjetas, pasos, etc.). */
  public obj<T = unknown>(key: string): T {
    const lang = this.langSignal();
    return this.transloco.translateObject(key, {}, lang) as T;
  }

  public readonly isLang = isLang;
}
