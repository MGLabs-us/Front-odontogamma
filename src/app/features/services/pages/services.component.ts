import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';

/**
 * Catálogo editorial de tratamientos y procedimientos clínicos de Odontogamma Oriente.
 */
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent],
  templateUrl: './services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly services = this.portfolioService.services;
}
