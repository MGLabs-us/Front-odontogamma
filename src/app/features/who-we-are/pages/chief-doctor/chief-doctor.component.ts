import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';

interface Credential {
  institution: string;
  role: string;
  detail: string;
}

interface DoctorSignaturePrinciple {
  title: string;
  quote: string;
  description: string;
}

/**
 * Vista de autor dedicada al Director Clínico: Dr. Jaime Arcila Cano.
 */
@Component({
  selector: 'app-chief-doctor',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent],
  templateUrl: './chief-doctor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiefDoctorComponent {
  // Principios de firma del Dr. Jaime Arcila
  protected readonly signaturePrinciples: DoctorSignaturePrinciple[] = [
    {
      title: 'Odontología Emocional',
      quote: '«No cambiamos sólo dientes; devolvemos la seguridad de sonreír al mundo sin reservas.»',
      description: 'Cada paciente llega con una historia, inseguridades previas o anhelos personales. El primer paso jamás es el taladro; es la escucha empática y el entendimiento profundo de su objetivo de vida.'
    },
    {
      title: 'Mínima Invasión Biomimética',
      quote: '«El mayor logro de un odontólogo estético no es lo que desgasta, sino lo que logra preservar intacto.»',
      description: 'Mediante magnificación óptica y adhesión química de última generación, trabajamos sobre espesores milimétricos, respetando la estructura biológica viva del diente natural.'
    },
    {
      title: 'Armonía Facial Global',
      quote: '«Una sonrisa perfecta aislada puede verse falsa; la verdadera belleza radica en cómo se integra con los ojos, los labios y la expresión.»',
      description: 'El diseño se analiza desde la tridimensionalidad del rostro en movimiento dinámico, considerando la fonética, la curva labial y la proyección del tercio inferior de la cara.'
    }
  ];

  // Credenciales y membresías académicas
  protected readonly credentials: Credential[] = [
    {
      institution: 'Dirección Médica & Fundador',
      role: 'Odontogamma Oriente',
      detail: 'Líder en diseño de sonrisa cerámico de alta complejidad en Antioquia.'
    },
    {
      institution: 'Rehabilitación Oral & Alta Estética',
      role: 'Especialización Clínica Avanzada',
      detail: 'Entrenamiento continuado con referentes mundiales de la escuela europea y norteamericana.'
    },
    {
      institution: 'Odontología Digital 3D',
      role: 'Certificación en Flujos Ópticos Cad/Cam',
      detail: 'Dominio de escaneo intraoral, encerado diagnóstico virtual y diseño asistido por computadora.'
    },
    {
      institution: 'Sociedades Científicas',
      role: 'Miembro Activo',
      detail: 'Compromiso riguroso con la actualización científica en biomateriales cerámicos de última generación.'
    }
  ];
}

