import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';
import { EditorialLabelComponent } from '../../../../shared/components/editorial-label/editorial-label.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../../core/constants/cloudinary-assets.manifest';
import { VideoReelComponent } from '../../../../shared/components/video-reel/video-reel.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { RoutePipe } from '../../../../core/i18n/route.pipe';
import { I18nService } from '../../../../core/i18n/i18n.service';

interface ClinicMoment {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
}

/**
 * Muestra espacios reales de la clínica y testimonios en video.
 */
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [TranslocoPipe, RoutePipe, CommonModule, RouterLink, VideoReelComponent, SectionHeaderComponent, LuxuryButtonComponent, EditorialLabelComponent],
  templateUrl: './testimonials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent {
  private readonly i18n = inject(I18nService);
  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.patients.blackBackdrop;

  private readonly momentsBase = [
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.patients.mirror },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.loungeTall },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.consultPanoramic },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.facade }
  ];
  protected readonly moments = computed<ClinicMoment[]>(() =>
    this.i18n.obj<ClinicMoment[]>('testimonials.moments.items').map((text, i) => ({ ...text, ...this.momentsBase[i] }) as ClinicMoment)
  );

  protected readonly testimonialReels = CLOUDINARY_ASSETS_MANIFEST.videos.testimonials;

  protected readonly interview = CLOUDINARY_ASSETS_MANIFEST.videos.interviews[0];
}
