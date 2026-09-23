import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';

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
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent],
  templateUrl: './location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent {
  // Espacios de la clínica
  protected readonly spaces: FacilitySpace[] = [
    {
      title: 'Lounge Privado de Recepción',
      category: 'Hospitalidad & Calma',
      description: 'Un vestíbulo sereno diseñado para disipar cualquier estrés dental. Barra de café de especialidad del Oriente, agua infusionada y atmósfera musical acústica.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    },
    {
      title: 'Suites Clínicas Panorámicas',
      category: 'Tecnología & Confort',
      description: 'Consultorios con ventanales a la naturaleza, sillones ergonómicos con memoria de forma y pantallas multimedia para visualizar tu diseño 3D en tiempo real.',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85'
    },
    {
      title: 'Laboratorio Digital In-Situ',
      category: 'Artesanía & Precisión',
      description: 'Área dedicada a la colorimetría con luz natural y ajustes finos de cerámica en el mismo momento de la cita, reduciendo tiempos de espera.',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85'
    },
    {
      title: 'Suite de Recuperación Post-Tratamiento',
      category: 'Privacidad Absoluta',
      description: 'Espacio privado para descansar tras sesiones de transformación de sonrisa, con salida directa discreta al área de estacionamiento VIP.',
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85'
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

