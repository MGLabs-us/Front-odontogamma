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
  // Miembros del equipo de trabajo real de Odontogamma Oriente
  protected readonly members: TeamMember[] = [
    {
      name: 'Dr. Jaime Arcila Cano',
      role: 'Director Médico & Especialista en Estética',
      specialty: 'Diseño de Sonrisa Biomimético',
      bio: 'Lidera la dirección clínica, la visión artística y la personalización integral de cada sonrisa en Odontogamma Oriente.',
      imageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789758166/624512340_18106700200685547_1543458093715588057_n.jpg',
      credentials: ['Director Clínico', 'Rehabilitación Oral & Estética', 'Odontogamma Oriente']
    },
    {
      name: 'Equipo Odontogamma',
      role: 'Atención Clínica & Estética Dental',
      specialty: 'Odontología de Precisión',
      bio: 'Parte integral del equipo interdisciplinario que acompaña al Dr. Jaime Arcila en cada procedimiento de diseño y restauración estética.',
      imageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789758172/623767744_18139684015482831_3052695333261664610_n.jpg',
      credentials: ['Atención Personalizada', 'Biomimética y Confort', 'Odontogamma Oriente']
    },
    {
      name: 'Equipo Odontogamma',
      role: 'Asistencia Clínica & Biomateriales',
      specialty: 'Precisión en Procedimientos',
      bio: 'Comprometida con los protocolos clínicos más rigurosos y el bienestar sensorial del paciente en cada sesión de consulta.',
      imageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789758178/622980093_18093378355788920_6489025597437504639_n.jpg',
      credentials: ['Cuidado Integral', 'Protocolos de Vanguardia', 'Odontogamma Oriente']
    },
    {
      name: 'Equipo Odontogamma',
      role: 'Coordinación Clínica & Cuidados',
      specialty: 'Salud y Armonía Dental',
      bio: 'Acompaña a cada paciente durante las distintas etapas clínicas, asegurando una experiencia cálida, cercana y sin dolor.',
      imageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789758188/624649658_18056254670663874_7510318105389766555_n.jpg',
      credentials: ['Atención Dedicada', 'Experiencia del Paciente', 'Odontogamma Oriente']
    },
    {
      name: 'Equipo Odontogamma',
      role: 'Coordinación & Hospitalidad VIP',
      specialty: 'Experiencia & Gestión de Pacientes',
      bio: 'Coordina la atención, tiempos de cita y acompañamiento exclusivo para pacientes locales e internacionales en El Carmen de Viboral.',
      imageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789758232/632201995_18412412407121334_7513765155196393691_n.jpg',
      credentials: ['Acompañamiento VIP', 'Gestión Integral', 'Odontogamma Oriente']
    }
  ];
}
