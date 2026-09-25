import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';

interface PatientStory {
  id: string;
  patientName: string;
  city: string;
  treatment: string;
  quote: string;
  fullStory: string;
  imageUrl: string;
  profession: string;
  highlight: string;
}

interface VideoTestimonial {
  id: string;
  title: string;
  duration: string;
  patient: string;
  treatment: string;
  thumbnailUrl: string;
}

/**
 * Vista editorial de Testimonios de Pacientes: Historias reales, vivencias humanas y confianza recuperada.
 */
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent],
  templateUrl: './testimonials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent {
  // Modal de video simulado interactivo
  protected readonly activeVideo = signal<VideoTestimonial | null>(null);

  // Historias editoriales de pacientes
  protected readonly stories: PatientStory[] = [
    {
      id: 'story-1',
      patientName: 'Valentina Restrepo',
      city: 'Medellín / Miami',
      treatment: '10 Carillas Feldespáticas Superiores',
      profession: 'Empresaria & Creadora de Contenido',
      quote: '«Solía taparme la boca al reír en reuniones. Hoy mi sonrisa es mi mayor carta de presentación y nadie imagina que llevo carillas.»',
      fullStory: 'Valentina llegó a la clínica tras una mala experiencia previa con resinas compuestas que habían perdido brillo y manchado sus encías. El Dr. Jaime Arcila diseñó un juego de 10 carillas en cerámica feldespática respetando la curvatura natural de su labio inferior. El cambio fue tan orgánico que sus amigos elogiaron su luminosidad sin notar el procedimiento dental.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
      highlight: 'Sonrisa armónica y brillo natural inalterable'
    },
    {
      id: 'story-2',
      patientName: 'Carlos Mario Gómez',
      city: 'Rionegro, Antioquia',
      treatment: 'Transformación Integral & Rehabilitación Oclusal',
      profession: 'Arquitecto & Diseñador de Espacios',
      quote: '«Como arquitecto, la proporción y la textura lo son todo. La precisión milimétrica del Dr. Arcila y su equipo superó cualquier expectativa.»',
      fullStory: 'Años de bruxismo severo habían desgastado sus bordes dentales en más de 3 milímetros, envejeciendo la expresión de su rostro. Mediante un protocolo guiado digitalmente, se recuperó la dimensión vertical de su mordida y se devolvió la juventud a su sonrisa con carillas ultrafinas de disilicato de litio.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
      highlight: 'Recuperación de 3mm de dimensión vertical'
    },
    {
      id: 'story-3',
      patientName: 'Camila Duarte',
      city: 'Bogotá, D.C.',
      treatment: 'Odontología Cosmética & Contorneado Gingival',
      profession: 'Abogada Corporativa',
      quote: '«Viajé desde Bogotá por recomendación de una colega. La paz de la sede en El Carmen de Viboral y la delicadeza del trato hicieron que la experiencia fuera un placer total.»',
      fullStory: 'Camila deseaba corregir una asimetría notable en sus encías y dientes centrales que le restaban simetría al hablar en público. En solo 2 sesiones coordinadas con el periodoncista y el Dr. Arcila, se armonizó el margen gingival y se colocaron carillas ultra delgadas con cero dolor posoperatorio.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85',
      highlight: 'Corrección de asimetría gingival en 2 sesiones'
    },
    {
      id: 'story-4',
      patientName: 'Felipe Echeverri',
      city: 'Ciudad de Panamá',
      treatment: 'Aclaramiento Láser & Microcarillas',
      profession: 'Piloto Comercial',
      quote: '«La coordinación de concierge fue impecable. Me recogieron en el aeropuerto y organizaron mis tiempos para que pudiera transformar mi sonrisa en mi escala de fin de semana.»',
      fullStory: 'Felipe aprovechó su escala internacional para someterse a una sesión de aclaramiento fotocatalizado sin dolor y colocación de microcarillas en incisivos laterales. La rapidez y el resultado sobrio le permitieron retomar su actividad de inmediato con una confianza renovada.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85',
      highlight: 'Turismo médico eficiente con traslado privado'
    }
  ];

  // Testimonios en video tipo reel
  protected readonly videoTestimonials: VideoTestimonial[] = [
    {
      id: 'v1',
      title: 'El Instante del Espejo: Primera Reacción tras la Cementación',
      duration: '1:45',
      patient: 'Mariana Z.',
      treatment: '8 Carillas Cerámicas',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85'
    },
    {
      id: 'v2',
      title: 'De Dientes Desgastados a una Sonrisa Escultural',
      duration: '2:10',
      patient: 'Dr. Andrés M.',
      treatment: 'Rehabilitación Oclusal',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85'
    },
    {
      id: 'v3',
      title: 'Por Qué Viajé desde Estados Unidos a El Carmen de Viboral',
      duration: '2:30',
      patient: 'Sofia & David',
      treatment: 'Diseño de Sonrisa en Pareja',
      thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85'
    }
  ];

  protected openVideoModal(video: VideoTestimonial): void {
    this.activeVideo.set(video);
  }

  protected closeVideoModal(): void {
    this.activeVideo.set(null);
  }
}

