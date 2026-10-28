import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';
import { EditorialLabelComponent } from '../../../../shared/components/editorial-label/editorial-label.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../../core/constants/cloudinary-assets.manifest';
import { VideoReelComponent } from '../../../../shared/components/video-reel/video-reel.component';

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
  imports: [CommonModule, RouterLink, VideoReelComponent, SectionHeaderComponent, LuxuryButtonComponent, EditorialLabelComponent],
  templateUrl: './testimonials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent {
  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.patients.blackBackdrop;

  protected readonly moments: ClinicMoment[] = [
    {
      id: 'mirror',
      title: 'Un momento para mirarte de nuevo',
      description: 'Una experiencia personal, acompañada por el equipo de la clínica.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.patients.mirror,
      alt: 'Paciente observando su sonrisa frente a un espejo'
    },
    {
      id: 'lounge',
      title: 'Un espacio para sentirte bien',
      description: 'Ambientes tranquilos que hacen parte de la experiencia en la sede.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.loungeTall,
      alt: 'Sala de espera de la clínica Odontogamma Oriente'
    },
    {
      id: 'treatment-room',
      title: 'Tecnología y atención clínica',
      description: 'Espacios preparados para acompañar cada consulta.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.consultPanoramic,
      alt: 'Consultorio odontológico de la sede'
    },
    {
      id: 'reception',
      title: 'Te recibimos en El Carmen de Viboral',
      description: 'Un equipo y una sede pensados para atenderte con cercanía.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.facade,
      alt: 'Fachada de la clínica Odontogamma Oriente'
    }
  ];

  protected readonly testimonialReels = CLOUDINARY_ASSETS_MANIFEST.videos.testimonials;

  protected readonly interview = CLOUDINARY_ASSETS_MANIFEST.videos.interviews[0];
}
