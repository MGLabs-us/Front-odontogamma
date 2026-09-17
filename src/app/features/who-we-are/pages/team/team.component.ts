import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';

interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  credentials: string[];
}

/**
 * Vista de presentación del equipo interdisciplinario de Odontogamma Oriente.
 */
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent],
  templateUrl: './team.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {
  // Miembros del equipo editorial clínico y artesanal
  protected readonly members: TeamMember[] = [
    {
      name: 'Dr. Jaime Arcila Cano',
      role: 'Director Médico & Especialista en Estética',
      specialty: 'Diseño de Sonrisa Biomimético & Carillas',
      bio: 'Lidera la dirección clínica, la planificación digital y la armonización facial individual de cada paciente que visita Odontogamma.',
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=85',
      credentials: ['+15 Años de Experiencia', 'Máster en Rehabilitación Oral', 'Certificación Digital Smile Design']
    },
    {
      name: 'Maestro Ceramista Dental',
      role: 'Director de Laboratorio de Cerámica Fina',
      specialty: 'Estratificación y Microtexturizado de Feldespato',
      bio: 'Artesano de precisión dedicado a esculpir a mano cada carilla. Especialista en juegos de opalescencia, translucidez incisal y degradé de tonalidades naturales.',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=85',
      credentials: ['Entrenado en Suiza y Alemania', 'Especialista en Cerámica Feldespática', 'Micromecanizado de Precisión']
    },
    {
      name: 'Dra. Especialista en Periodoncia',
      role: 'Microcirugía Plástica Gingival',
      specialty: 'Armonización de Encroaches y Márgenes Rosados',
      bio: 'Garantiza el marco perfecto para los dientes. Realiza alargamientos coronarios estéticos, injertos y contornos gingivales de cicatrización ultrarrápida.',
      imageUrl: 'https://images.unsplash.com/photo-1594824813590-7892b1580214?auto=format&fit=crop&w=1000&q=85',
      credentials: ['Periodoncia e Implantología', 'Microcirugía Asistida por Láser', 'Salud Biológica Periapical']
    },
    {
      name: 'Especialista en Ortodoncia Invisible',
      role: 'Ortodoncia Digital & Alineadores',
      specialty: 'Estabilidad Oclusal Pre-Carillas',
      bio: 'Alinea las arcadas dentales con mínima fricción para que las carillas requieran el menor desgaste posible, logrando la perfecta oclusión funcional.',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=85',
      credentials: ['Certificación Alineadores Transparentes', 'Planificación Oclusal 3D', 'Biomecánica Dental Avanzada']
    },
    {
      name: 'Concierge & Dirección de Pacientes',
      role: 'Hospitalidad & Bienestar VIP',
      specialty: 'Experiencia del Paciente & Turismo Dental',
      bio: 'Tu contacto de confianza desde el primer mensaje. Coordina agendas privadas, traslados desde el aeropuerto, estadías en el Oriente y seguimiento posoperatorio 24/7.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85',
      credentials: ['Atención Bilingüe', 'Hospitalidad de Lujo', 'Acompañamiento Personalizado']
    }
  ];
}

