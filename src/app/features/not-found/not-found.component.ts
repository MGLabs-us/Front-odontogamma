import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LuxuryButtonComponent } from '../../shared/components/luxury-button/luxury-button.component';

/** Página 404: orienta al visitante hacia los destinos principales en lugar de redirigir al inicio. */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, LuxuryButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-dvh flex items-center bg-og-dark text-white px-6 pt-32 pb-24">
      <div class="max-w-xl mx-auto text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-og-cyan mb-4">Error 404</p>
        <h1 class="text-4xl sm:text-5xl font-editorial font-medium tracking-tight mb-4">
          No encontramos esta página
        </h1>
        <p class="text-base sm:text-lg text-slate-200 mb-8">
          El enlace puede estar desactualizado. Puedes volver al inicio o ver nuestros tratamientos.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <app-luxury-button routerLink="/" variant="primary" class="w-full sm:w-auto">Volver al inicio</app-luxury-button>
          <app-luxury-button routerLink="/servicios" variant="outline" class="w-full sm:w-auto">Ver tratamientos</app-luxury-button>
        </div>
      </div>
    </section>
  `
})
export class NotFoundComponent {}
