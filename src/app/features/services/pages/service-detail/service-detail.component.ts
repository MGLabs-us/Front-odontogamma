import { Component, inject, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { BeforeAfterSliderComponent } from '../../../../shared/components/before-after-slider/before-after-slider.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';

/**
 * Vista detallada de un tratamiento individual en Odontogamma Oriente.
 * Recibe el parámetro 'slug' de la ruta mediante input binding de Angular
 * y presenta: primer contenedor a fondo completo, descripción clínica,
 * galería de fotos de referencia de la empresa, y caso de antes/después interactivo.
 */
@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, BeforeAfterSliderComponent, LuxuryButtonComponent],
  templateUrl: './service-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceDetailComponent {
  private readonly portfolioService = inject(PortfolioService);

  /** Recibe el parámetro :slug de la URL automáticamente gracias a withComponentInputBinding */
  public readonly slug = input.required<string>();

  /** Servicio reactivo computado según el slug actual */
  protected readonly service = computed(() => {
    return this.portfolioService.getServiceBySlug(this.slug());
  });
}

