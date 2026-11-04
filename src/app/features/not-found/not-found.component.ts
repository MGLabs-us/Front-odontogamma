import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RoutePipe } from '../../core/i18n/route.pipe';
import { LuxuryButtonComponent } from '../../shared/components/luxury-button/luxury-button.component';

/** Página 404: orienta al visitante hacia los destinos principales en lugar de redirigir al inicio. */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [TranslocoPipe, RoutePipe, RouterLink, LuxuryButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-dvh flex items-center bg-og-dark text-white px-6 pt-32 pb-24">
      <div class="max-w-xl mx-auto text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-og-cyan mb-4">{{ 'notFound.code' | transloco }}</p>
        <h1 class="text-4xl sm:text-5xl font-editorial font-medium tracking-tight mb-4">
          {{ 'notFound.title' | transloco }}
        </h1>
        <p class="text-base sm:text-lg text-slate-200 mb-8">
          {{ 'notFound.text' | transloco }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <app-luxury-button [routerLink]="'home' | route" variant="primary" class="w-full sm:w-auto">{{ 'notFound.home' | transloco }}</app-luxury-button>
          <app-luxury-button [routerLink]="'services' | route" variant="outline" class="w-full sm:w-auto">{{ 'notFound.treatments' | transloco }}</app-luxury-button>
        </div>
      </div>
    </section>
  `
})
export class NotFoundComponent {}
