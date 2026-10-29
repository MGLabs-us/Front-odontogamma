import { Component, inject, input, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/services/seo.service';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { BeforeAfterSliderComponent } from '../../../../shared/components/before-after-slider/before-after-slider.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';
import { ArrowMarkComponent } from '../../../../shared/components/arrow-mark/arrow-mark.component';
import { EditorialLabelComponent } from '../../../../shared/components/editorial-label/editorial-label.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

/**
 * Vista detallada de un tratamiento individual en Odontogamma Oriente.
 * Recibe el parámetro 'slug' de la ruta mediante input binding de Angular
 * y presenta: primer contenedor a fondo completo, descripción clínica,
 * galería de fotos de referencia de la empresa, y caso de antes/después interactivo.
 */
@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [IconComponent, CommonModule, RouterLink, BeforeAfterSliderComponent, LuxuryButtonComponent, ArrowMarkComponent, EditorialLabelComponent],
  templateUrl: './service-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceDetailComponent {
  private readonly portfolioService = inject(PortfolioService);
  private readonly seo = inject(SeoService);

  /** Recibe el parámetro :slug de la URL automáticamente gracias a withComponentInputBinding */
  public readonly slug = input.required<string>();

  /** Servicio reactivo computado según el slug actual */
  protected readonly service = computed(() => {
    return this.portfolioService.getServiceBySlug(this.slug());
  });

  constructor() {
    effect(() => {
      const service = this.service();
      if (!service) return;
      this.seo.update({
        title: `${service.title} en El Carmen de Viboral | Odontogamma Oriente`,
        description: service.shortDescription,
        image: service.heroImageUrl
      });
    });
  }
}
