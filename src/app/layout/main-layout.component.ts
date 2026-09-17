import { Component, ChangeDetectionStrategy, inject, afterNextRender, DestroyRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

/**
 * Layout principal de la aplicación con motor de animaciones al scroll (Scroll Reveal).
 * Detecta automáticamente elementos con la clase .reveal-init y los anima suavemente al entrar en viewport.
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private observer: IntersectionObserver | null = null;
  private mutationObserver: MutationObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.initScrollObserver();

      const sub = this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          setTimeout(() => this.observeElements(), 50);
          setTimeout(() => this.observeElements(), 200);
          setTimeout(() => this.observeElements(), 500);
        });

      if (typeof MutationObserver !== 'undefined') {
        this.mutationObserver = new MutationObserver(() => {
          this.observeElements();
        });
        const mainEl = document.querySelector('main');
        if (mainEl) {
          this.mutationObserver.observe(mainEl, { childList: true, subtree: true });
        }
      }

      this.destroyRef.onDestroy(() => {
        sub.unsubscribe();
        this.observer?.disconnect();
        this.mutationObserver?.disconnect();
      });
    });
  }

  private initScrollObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    this.observeElements();
  }

  private observeElements(): void {
    if (!this.observer || typeof document === 'undefined') return;

    const elements = document.querySelectorAll('.reveal-init:not(.reveal-active)');
    elements.forEach(el => this.observer?.observe(el));
  }
}

