import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';
import { EditorialLabelComponent } from '../../../../shared/components/editorial-label/editorial-label.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../../core/constants/cloudinary-assets.manifest';

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
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent, EditorialLabelComponent],
  templateUrl: './team.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {
  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.clinic.consultWide;

  // Miembros del equipo de trabajo real de Odontogamma Oriente
  protected readonly members: TeamMember[] = [
    {
      name: 'Dr. Jaime Arcila Cano',
      role: 'Director Médico & Especialista en Estética',
      specialty: 'Diseño de Sonrisa Biomimético',
      bio: 'Lidera la dirección clínica, la visión artística y la personalización integral de cada sonrisa en Odontogamma Oriente.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.team.chiefDoctorSeated,
      credentials: ['Director Clínico', 'Rehabilitación Oral & Estética', 'Odontogamma Oriente']
    },
    {
      name: 'Equipo Odontogamma',
      role: 'Atención Clínica & Estética Dental',
      specialty: 'Odontología de Precisión',
      bio: 'Parte integral del equipo interdisciplinario que acompaña al Dr. Jaime Arcila en cada procedimiento de diseño y restauración estética.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.team.doctorGray,
      credentials: ['Atención Personalizada', 'Biomimética y Confort', 'Odontogamma Oriente']
    },
    {
      name: 'Equipo Odontogamma',
      role: 'Asistencia Clínica & Biomateriales',
      specialty: 'Precisión en Procedimientos',
      bio: 'Comprometida con los protocolos clínicos más rigurosos y el bienestar sensorial del paciente en cada sesión de consulta.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.team.assistant,
      credentials: ['Cuidado Integral', 'Protocolos de Vanguardia', 'Odontogamma Oriente']
    },
    {
      name: 'Equipo Odontogamma',
      role: 'Coordinación Clínica & Cuidados',
      specialty: 'Salud y Armonía Dental',
      bio: 'Acompaña a cada paciente durante las distintas etapas clínicas, asegurando una experiencia cálida, cercana y sin dolor.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.team.doctorNavy,
      credentials: ['Atención Dedicada', 'Experiencia del Paciente', 'Odontogamma Oriente']
    },
    {
      name: 'Equipo Odontogamma',
      role: 'Coordinación & Hospitalidad VIP',
      specialty: 'Experiencia & Gestión de Pacientes',
      bio: 'Coordina la atención, tiempos de cita y acompañamiento exclusivo para pacientes locales e internacionales en El Carmen de Viboral.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.team.doctorNavyTwo,
      credentials: ['Acompañamiento VIP', 'Gestión Integral', 'Odontogamma Oriente']
    }
  ];
}
