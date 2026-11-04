import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { BeforeAfterSliderComponent } from '../../../../shared/components/before-after-slider/before-after-slider.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';
import { EditorialLabelComponent } from '../../../../shared/components/editorial-label/editorial-label.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../../core/constants/cloudinary-assets.manifest';
import { TranslocoPipe } from '@jsverse/transloco';
import { RoutePipe } from '../../../../core/i18n/route.pipe';
import { I18nService } from '../../../../core/i18n/i18n.service';

interface FilterCategory {
  key: string;
  label: string;
  count?: number;
}

/**
 * Vista interactiva de Antes y después: Casos clínicos reales con comparador dinámico deslizable.
 */
@Component({
  selector: 'app-before-after',
  standalone: true,
  imports: [TranslocoPipe, RoutePipe, 
    CommonModule,
    RouterLink,
    BeforeAfterSliderComponent,
    SectionHeaderComponent,
    LuxuryButtonComponent,
    EditorialLabelComponent
  ],
  templateUrl: './before-after.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeforeAfterComponent {
  private readonly i18n = inject(I18nService);
  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.smiles.dark;

  private readonly portfolioService = inject(PortfolioService);

  // Lista de casos clínicos provista por el servicio centralizado
  protected readonly allCases = this.portfolioService.cases;

  // Categoría activa seleccionada para el filtro
  protected readonly selectedCategory = signal<string>('all');

  // Categorías de filtro disponibles
  private readonly categoriesBase = [
    { key: 'all' },
    { key: 'carillas' },
    { key: 'diseno-sonrisa' },
    { key: 'rehabilitacion' },
    { key: 'ortodoncia' }
  ];
  protected readonly categories = computed<FilterCategory[]>(() =>
    this.i18n.obj<FilterCategory[]>('beforeAfter.gallery.categories').map((text, i) => ({ ...text, ...this.categoriesBase[i] }) as FilterCategory)
  );

  // Casos filtrados computados reactivamente
  protected readonly filteredCases = computed(() => {
    const category = this.selectedCategory();
    const cases = this.allCases();

    if (category === 'all') {
      return cases;
    }
    return cases.filter(c => c.category === category);
  });

  protected setCategory(categoryKey: string): void {
    this.selectedCategory.set(categoryKey);
  }
}
