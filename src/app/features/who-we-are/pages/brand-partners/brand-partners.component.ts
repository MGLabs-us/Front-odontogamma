import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';

interface PartnerBrand {
  name: string;
  country: string;
  category: string;
  description: string;
  badge: string;
}

interface SocialPost {
  id: string;
  type: 'reel' | 'photo' | 'case';
  title: string;
  caption: string;
  imageUrl: string;
  likes: string;
  views?: string;
  tag: string;
  conclusion: string;
}

/**
 * Vista de Brand Partners, Alianzas Globales y Feed Social (Instagram / Reels / Prensa)
 */
@Component({
  selector: 'app-brand-partners',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent],
  templateUrl: './brand-partners.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandPartnersComponent {
  // Filtro activo del feed social
  protected readonly selectedFilter = signal<'all' | 'reels' | 'cases'>('all');

  // Alianzas de marca de vanguardia internacional
  protected readonly partners: PartnerBrand[] = [
    {
      name: 'Ivoclar Vivadent',
      country: 'Liechtenstein / Suiza',
      category: 'Sistemas Cerámicos IPS e.max',
      description: 'Líder mundial en biomateriales de disilicato de litio y cerámica feldespática con los más altos estándares de translucidez y resistencia a la flexión.',
      badge: 'Cerámica Biomimética'
    },
    {
      name: '3Shape TRIOS',
      country: 'Dinamarca',
      category: 'Escaneo Intraoral 3D de Precisión',
      description: 'Óptica de ultra alta resolución que captura la anatomía dental en color real sin necesidad de cubetas tradicionales de silicona.',
      badge: 'Flujo Digital 100%'
    },
    {
      name: 'Carl Zeiss Meditec',
      country: 'Alemania',
      category: 'Microscopía y Magnificación Óptica',
      description: 'Lentes ópticas de grado aeroespacial que permiten al Dr. Jaime Arcila trabajar en el rango microscópico para preservar el esmalte vivo.',
      badge: 'Micro-Precisión'
    },
    {
      name: 'Dentsply Sirona',
      country: 'Estados Unidos / Alemania',
      category: 'Tecnología Clínica y Fotopolimerización',
      description: 'Equipamiento clínico de avanzada que garantiza cementaciones adhesivas duraderas y máxima ergonomía para el confort del paciente.',
      badge: 'Estándar Hospitalario'
    }
  ];

  // Publicaciones editoriales destacadas simulando Instagram / Feed de Marca
  protected readonly socialPosts: SocialPost[] = [
    {
      id: 'post-1',
      type: 'reel',
      title: 'El Arte de la Estratificación Cerámica',
      caption: 'Detrás de escena en nuestro laboratorio: el maestro ceramista aplicando a pincel micro-capas de pigmentos translúcidos para imitar la mamelonización natural de un diente joven.',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=85',
      likes: '2.4k',
      views: '18.9k',
      tag: '#LaboratorioArtesanal',
      conclusion: 'Cada carilla es una pieza artística personalizada e irrepetible.'
    },
    {
      id: 'post-2',
      type: 'case',
      title: 'Transformación de 10 Unidades en El Carmen de Viboral',
      caption: 'Corrección de asimetría dental severa y desgate incisal mediante carillas feldespáticas de 0.2mm de espesor. Armonización facial completa sin tallado agresivo.',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=85',
      likes: '4.1k',
      tag: '#AntesYDespues',
      conclusion: 'Resultado imperceptible a la vista, integrándose con el marco labial del paciente.'
    },
    {
      id: 'post-3',
      type: 'reel',
      title: 'Un Día en Nuestras Suites Privadas',
      caption: 'Así se vive la experiencia Odontogamma Oriente: calma campestre, café de especialidad, vista a los jardines y tecnología silenciosa.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      likes: '3.8k',
      views: '25.3k',
      tag: '#ExperienciaOdontogamma',
      conclusion: 'Odontología concebida como un refugio de relajación sensorial.'
    },
    {
      id: 'post-4',
      type: 'photo',
      title: 'Colorimetría con Luz Polarizada',
      caption: 'La luz artificial engaña; por eso calibramos el color de tus carillas utilizando filtros de polarización cruzada y luz diurna controlada.',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=85',
      likes: '1.9k',
      tag: '#CienciaOptica',
      conclusion: 'Precisión cromática garantizada bajo cualquier iluminación.'
    },
    {
      id: 'post-5',
      type: 'reel',
      title: 'La Reacción al Ver Su Nueva Sonrisa',
      caption: 'Ese instante conmovedor en el que el paciente se mira por primera vez en el espejo tras la cementación final. La emoción que nos inspira cada día.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
      likes: '5.6k',
      views: '42.1k',
      tag: '#MomentosOdontogamma',
      conclusion: 'Seguridad y plenitud emocional al sonreír de nuevo.'
    },
    {
      id: 'post-6',
      type: 'case',
      title: 'Cierre de Diastemas y Armonización Labial',
      caption: 'Espaciado interdental resuelto en 2 sesiones preservando la vitalidad de la pulpa dental intacta.',
      imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=85',
      likes: '3.2k',
      tag: '#EsteticaBiomimetica',
      conclusion: 'Mínima invasión con longevidad garantizada.'
    }
  ];

  protected setFilter(filter: 'all' | 'reels' | 'cases'): void {
    this.selectedFilter.set(filter);
  }

  protected filteredPosts(): SocialPost[] {
    const filter = this.selectedFilter();
    if (filter === 'all') return this.socialPosts;
    if (filter === 'reels') return this.socialPosts.filter(p => p.type === 'reel');
    return this.socialPosts.filter(p => p.type === 'case');
  }
}

