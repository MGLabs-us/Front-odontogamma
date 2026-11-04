import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';
import { ArrowMarkComponent } from '../../../../shared/components/arrow-mark/arrow-mark.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../../core/constants/cloudinary-assets.manifest';
import { VideoReelComponent } from '../../../../shared/components/video-reel/video-reel.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { RoutePipe } from '../../../../core/i18n/route.pipe';
import { I18nService } from '../../../../core/i18n/i18n.service';

interface FacilitySpace {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

interface TravelRoute {
  origin: string;
  time: string;
  route: string;
  description: string;
}

/**
 * Vista de presentación de la sede física y experiencia sensorial en el Oriente Antioqueño.
 */
@Component({
  selector: 'app-location',
  standalone: true,
  imports: [TranslocoPipe, RoutePipe, VideoReelComponent, CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent, ArrowMarkComponent],
  templateUrl: './location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent {
  private readonly i18n = inject(I18nService);
  protected readonly heroVideo = CLOUDINARY_ASSETS_MANIFEST.videos.clinicLoop;
  protected readonly clinicReels = CLOUDINARY_ASSETS_MANIFEST.videos.clinic;

  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.clinic.reception;

  // Espacios de la clínica
  private readonly spacesBase = [
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.loungeSofa },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.consultSuite },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.lab.printedModel }
  ];
  protected readonly spaces = computed<FacilitySpace[]>(() =>
    this.i18n.obj<FacilitySpace[]>('location.spaces.items').map((text, i) => ({ ...text, ...this.spacesBase[i] }) as FacilitySpace)
  );

  // Rutas de acceso privilegiadas
  protected readonly travelRoutes = computed<TravelRoute[]>(() => this.i18n.obj<TravelRoute[]>('location.access.items'));
}
