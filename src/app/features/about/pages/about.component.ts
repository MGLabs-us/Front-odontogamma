import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';

/**
 * Vista 'Sobre Mí': Dr. Jaime Arcila Cano y la filosofía de Odontogamma Oriente.
 * Presenta su enfoque clínico, valores de práctica, bioseguridad y ambiente de clínica privada.
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}
