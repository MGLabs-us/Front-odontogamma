import { Component, signal, computed, inject, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';
import { I18nService } from '../../../core/i18n/i18n.service';
import { RoutePipe } from '../../../core/i18n/route.pipe';
import { RouteKey } from '../../../core/i18n/route-map';
import { LANG_HTML, LANG_LABEL, LANG_SHORT, Lang } from '../../../core/i18n/languages';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandLogoComponent } from '../../../shared/components/brand-logo/brand-logo.component';
import { ArrowMarkComponent } from '../../../shared/components/arrow-mark/arrow-mark.component';
import { FlagComponent } from '../../../shared/components/flag/flag.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

interface NavItemDef {
  id: string;
  route: RouteKey;
  /** Id del tratamiento cuando la ruta es el detalle de un servicio. */
  serviceId?: string;
  highlight?: boolean;
}

interface NavGroupDef {
  id: string;
  items: NavItemDef[];
  footer?: RouteKey;
}

interface NavItem {
  label: string;
  description: string;
  link: string;
  highlight?: boolean;
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
  footer?: { label: string; link: string };
}

/** Estructura del menú; los textos salen de `nav.<grupo>` en el diccionario. */
const NAV_GROUPS: NavGroupDef[] = [
  {
    id: 'services',
    footer: 'services',
    items: [
      { id: 'veneers', route: 'service-detail', serviceId: 'carillas-porcelana' },
      { id: 'cosmetic', route: 'service-detail', serviceId: 'odontologia-cosmetica' },
      { id: 'process', route: 'service-detail', serviceId: 'proceso-transformacion' },
      { id: 'whitening', route: 'service-detail', serviceId: 'aclaramiento-laser' }
    ]
  },
  {
    id: 'who',
    items: [
      { id: 'about', route: 'about' },
      { id: 'doctor', route: 'doctor' },
      { id: 'team', route: 'team' },
      { id: 'location', route: 'location' }
    ]
  },
  {
    id: 'work',
    items: [
      { id: 'beforeAfter', route: 'before-after' },
      { id: 'testimonials', route: 'testimonials' },
      { id: 'virtual', route: 'virtual-consultation', highlight: true }
    ]
  }
];

/**
 * Barra de navegación principal. El menú se define como datos y los estilos viven
 * en las clases globales `nav-*` de styles.css, para que escritorio y móvil compartan el mismo diseño.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslocoPipe, RoutePipe, FlagComponent, IconComponent, RouterLink, RouterLinkActive, BrandLogoComponent, ArrowMarkComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  protected readonly i18n = inject(I18nService);
  private readonly router = inject(Router);

  constructor() {
    // Al cambiar de página se cierra todo, también si se llega por los botones atrás/adelante.
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => {
        this.closeDesktopMenus();
        this.closeMobileMenu();
      });
  }

  protected readonly langShort = LANG_SHORT;
  protected readonly langLabel = LANG_LABEL;
  protected readonly langHtml = LANG_HTML;

  /** Menú en el idioma activo (se recalcula al cambiar de idioma). */
  protected readonly groups = computed<NavGroup[]>(() =>
    NAV_GROUPS.map(group => ({
      id: group.id,
      label: this.i18n.t(`nav.${group.id}.label`),
      items: group.items.map(item => ({
        label: this.i18n.t(`nav.${group.id}.items.${item.id}.label`),
        description: this.i18n.t(`nav.${group.id}.items.${item.id}.description`),
        link: item.serviceId ? this.i18n.serviceLink(item.serviceId) : this.i18n.link(item.route),
        highlight: item.highlight
      })),
      footer: group.footer
        ? { label: this.i18n.t(`nav.${group.id}.footer`), link: this.i18n.link(group.footer) }
        : undefined
    }))
  );

  /**
   * Menú de escritorio abierto:
   * - `pinnedGroup`: el que se fijó con un clic (se cierra con otro clic, al elegir una opción, al hacer clic fuera, con Escape o al navegar).
   * - `hoveredGroup`: el que se abre al pasar el mouse. Solo funciona mientras no haya uno fijado.
   */
  private readonly pinnedGroup = signal<string | null>(null);
  private readonly hoveredGroup = signal<string | null>(null);

  /** Identificador del selector de idioma dentro del mismo mecanismo de menús. */
  protected readonly langGroupId = 'lang';

  protected isOpen(id: string): boolean {
    return (this.pinnedGroup() ?? this.hoveredGroup()) === id;
  }

  protected hover(id: string): void {
    if (this.pinnedGroup() === null) {
      this.hoveredGroup.set(id);
    }
  }

  protected unhover(id: string): void {
    if (this.hoveredGroup() === id) {
      this.hoveredGroup.set(null);
    }
  }

  /** Un clic fija el menú; otro clic sobre el mismo lo cierra. */
  protected togglePinned(id: string): void {
    if (this.pinnedGroup() === id) {
      this.closeDesktopMenus();
    } else {
      this.pinnedGroup.set(id);
      this.hoveredGroup.set(null);
    }
  }

  protected closeDesktopMenus(): void {
    this.pinnedGroup.set(null);
    this.hoveredGroup.set(null);
  }

  /** Detecta si el usuario ha hecho scroll para compactar la barra */
  protected readonly isScrolled = signal<boolean>(false);

  /** Controla el estado del menú móvil */
  protected readonly mobileMenuOpen = signal<boolean>(false);

  /** Grupo del menú móvil actualmente expandido (acordeón) */
  protected readonly openMobileGroup = signal<string | null>(null);

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.isScrolled.set(window.scrollY > 15);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMobileMenu();
    this.closeDesktopMenus();
  }

  /** Un clic fuera de los menús de escritorio cierra el que esté fijado. */
  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.pinnedGroup() !== null && !(event.target as Element | null)?.closest?.('.nav-group')) {
      this.closeDesktopMenus();
    }
  }

  protected switchLang(lang: Lang): void {
    this.closeMobileMenu();
    this.closeDesktopMenus();
    this.i18n.switchTo(lang);
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
    if (!this.mobileMenuOpen()) {
      this.openMobileGroup.set(null);
    }
  }

  protected toggleMobileGroup(id: string): void {
    this.openMobileGroup.update(current => (current === id ? null : id));
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.openMobileGroup.set(null);
  }
}
