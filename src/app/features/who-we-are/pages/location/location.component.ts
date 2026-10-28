import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';
import { ArrowMarkComponent } from '../../../../shared/components/arrow-mark/arrow-mark.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../../core/constants/cloudinary-assets.manifest';
import { VideoReelComponent } from '../../../../shared/components/video-reel/video-reel.component';

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
  imports: [VideoReelComponent, CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent, ArrowMarkComponent],
  templateUrl: './location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent {
  protected readonly clinicReels = CLOUDINARY_ASSETS_MANIFEST.videos.clinic;

  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.clinic.reception;

  // Espacios de la clínica
  protected readonly spaces: FacilitySpace[] = [
    {
      title: 'Lounge Privado de Recepción',
      category: 'Hospitalidad & Calma',
      description: 'Un vestíbulo sereno diseñado para disipar cualquier estrés dental. Barra de café de especialidad del Oriente, agua infusionada y atmósfera musical acústica.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.loungeSofa
    },
    {
      title: 'Nuestro Consultorio',
      category: 'Atención & Confort',
      description: 'Un consultorio equipado con sillón ergonómico y los equipos necesarios para tu valoración y tratamiento, en un ambiente cómodo y limpio.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.consultSuite
    },
    {
      title: 'Laboratorio Digital In-Situ',
      category: 'Artesanía & Precisión',
      description: 'Área dedicada a la colorimetría con luz natural y ajustes finos de cerámica en el mismo momento de la cita, reduciendo tiempos de espera.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.lab.printedModel
    }
  ];

  // Rutas de acceso privilegiadas
  protected readonly travelRoutes: TravelRoute[] = [
    {
      origin: 'Desde el Aeropuerto Internacional JMC',
      time: '15 Minutos',
      route: 'Vía El Carmen de Viboral / Rionegro',
      description: 'Conexión ultrarrápida para pacientes nacionales e internacionales que viajan por turismo médico.'
    },
    {
      origin: 'Desde Medellín (El Poblado / Laureles)',
      time: '35 Minutos',
      route: 'Por el Túnel de Oriente',
      description: 'Acceso directo y fluido sin tráfico urbano, disfrutando del clima fresco del altiplano.'
    },
    {
      origin: 'Entorno de El Carmen de Viboral & Rionegro',
      time: '5 - 10 Minutos',
      route: 'Corredor Gastronómico y Residencial',
      description: 'Ubicación privilegiada en la zona campestre más exclusiva del departamento.'
    }
  ];
}
