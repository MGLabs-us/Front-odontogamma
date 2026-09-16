import { Component, signal, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';

/**
 * Barra de navegación principal en azul corporativo con texto en blanco de alto contraste,
 * microinteracciones de subrayado animado y transición suave al hacer scroll.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LuxuryButtonComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  /** Detecta si el usuario ha hecho scroll para compactar la barra */
  protected readonly isScrolled = signal<boolean>(false);

  /** Controla el estado del menú desplegable móvil */
  protected readonly mobileMenuOpen = signal<boolean>(false);

  /** Controla el submenú de tratamientos en versión móvil */
  protected readonly mobileServicesOpen = signal<boolean>(false);

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.isScrolled.set(window.scrollY > 30);
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(val => !val);
  }

  protected toggleMobileServices(): void {
    this.mobileServicesOpen.update(val => !val);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.mobileServicesOpen.set(false);
  }
}
