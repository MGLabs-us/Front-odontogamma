import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { BeforeAfterSliderComponent } from '../../../shared/components/before-after-slider/before-after-slider.component';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';

/**
 * Galería interactiva de Antes y Después con filtros por categoría
 * y comparadores táctiles individuales.
 */
@Component({
  selector: 'app-transformations',
  standalone: true,
  imports: [CommonModule, BeforeAfterSliderComponent, LuxuryButtonComponent],
  templateUrl: './transformations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransformationsComponent {
  private readonly portfolioService = inject(PortfolioService);

  protected readonly categories = [
    { key: 'todos', label: 'Todos los Casos' },
    { key: 'carillas', label: 'Carillas Cerámicas' },
    { key: 'diseno-sonrisa', label: 'Diseño de Sonrisa' },
    { key: 'rehabilitacion', label: 'Rehabilitación' },
    { key: 'aclaramiento', label: 'Aclaramiento' }
  ];

  protected readonly selectedCategory = signal<string>('todos');

  // Casos computados según el filtro activo
  protected readonly filteredCases = computed(() => {
    return this.portfolioService.getCasesByCategory(this.selectedCategory());
  });

  protected setCategory(key: string): void {
    this.selectedCategory.set(key);
  }
}
