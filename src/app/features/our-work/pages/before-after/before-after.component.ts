import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { BeforeAfterSliderComponent } from '../../../../shared/components/before-after-slider/before-after-slider.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';

interface FilterCategory {
  key: string;
  label: string;
  count?: number;
}

/**
 * Vista interactiva de Antes & Después: Casos clínicos reales con comparador dinámico deslizable.
 */
@Component({
  selector: 'app-before-after',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BeforeAfterSliderComponent,
    SectionHeaderComponent,
    LuxuryButtonComponent
  ],
  templateUrl: './before-after.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeforeAfterComponent {
  private readonly portfolioService = inject(PortfolioService);

  // Lista de casos clínicos provista por el servicio centralizado
  protected readonly allCases = this.portfolioService.cases;

  // Categoría activa seleccionada para el filtro
  protected readonly selectedCategory = signal<string>('all');

  // Categorías de filtro disponibles
  protected readonly categories: FilterCategory[] = [
    { key: 'all', label: 'Todos los Casos' },
    { key: 'veneers', label: 'Carillas de Porcelana' },
    { key: 'cosmetic', label: 'Odontología Cosmética' },
    { key: 'full-mouth', label: 'Transformación Integral' },
    { key: 'whitening', label: 'Aclaramiento Dental' }
  ];

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

