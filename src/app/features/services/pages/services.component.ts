import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';
import { EditorialLabelComponent } from '../../../shared/components/editorial-label/editorial-label.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../core/constants/cloudinary-assets.manifest';
import { VideoReelComponent } from '../../../shared/components/video-reel/video-reel.component';

/**
 * Catálogo editorial de tratamientos y procedimientos clínicos de Odontogamma Oriente.
 */
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [VideoReelComponent, CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent, EditorialLabelComponent],
  templateUrl: './services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent {
  protected readonly doctorReels = CLOUDINARY_ASSETS_MANIFEST.videos.doctor;

  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.smiles.natural;

  private readonly portfolioService = inject(PortfolioService);
  protected readonly services = this.portfolioService.services;
}
