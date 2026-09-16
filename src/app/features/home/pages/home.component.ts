import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';
import { BeforeAfterSliderComponent } from '../../../shared/components/before-after-slider/before-after-slider.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

/**
 * Página Principal (Landing Page) inspirada en la estética editorial de Apa Aesthetic.
 * Presenta el Hero de alto impacto, pilares de filosofía, casos interactivos antes/después
 * y resumen de procedimientos clínicos.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LuxuryButtonComponent,
    BeforeAfterSliderComponent,
    SectionHeaderComponent
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly portfolioService = inject(PortfolioService);

  // Signals reactivas obtenidas del servicio central
  protected readonly services = this.portfolioService.services;
  protected readonly featuredCases = this.portfolioService.featuredCases;
}
