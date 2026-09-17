import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';

interface ValuePillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

/**
 * Vista editorial de About Us: Manifiesto, historia y estándares de alta costura dental de Odontogamma Oriente.
 */
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent],
  templateUrl: './about-us.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsComponent {
  // Pilares de la filosofía Odontogamma
  protected readonly pillars: ValuePillar[] = [
    {
      number: '01',
      title: 'Biomimética & Mínima Invasión',
      subtitle: 'Preservación como Máximo Valor',
      description: 'Creemos que la mejor estructura dental es la natural. Diseñamos restauraciones ultrafinas de menos de 0.3mm que emulan la flexión, transparencia y esmalte biológico sin desgastes agresivos.',
      highlight: '0.2 - 0.3mm de espesor cerámico'
    },
    {
      number: '02',
      title: 'Arquitectura Facial & Proporción Áurea',
      subtitle: 'El Rostro como Lienzo Total',
      description: 'Una sonrisa jamás debe verse como un accesorio postizo. Analizamos la fisionomía, la línea labial, el tono de piel y la fonética para que cada carilla dialogue armónicamente con tu personalidad.',
      highlight: 'Análisis Fisiognómico Integral'
    },
    {
      number: '03',
      title: 'Hospitalidad Médica & Privacidad',
      subtitle: 'Una Experiencia Sensorial Única',
      description: 'Desafiamos el paradigma del consultorio frío. Nuestra sede en el Oriente Antioqueño ha sido concebida como un santuario privado de calma, privacidad confidencial y atención sin prisas.',
      highlight: 'Atención One-to-One Confidencial'
    }
  ];

  // Línea de tiempo de hitos
  protected readonly milestones: Milestone[] = [
    {
      year: 'Fundación',
      title: 'El Nacimiento de un Concepto',
      description: 'Establecimiento en el Oriente Antioqueño con la premisa de llevar la odontología cosmética al estándar de las capitales mundiales del diseño.'
    },
    {
      year: 'Innovación',
      title: 'Ecosistema 100% Digital',
      description: 'Integración de escáneres intraorales de última generación y planificación tridimensional en tiempo real.'
    },
    {
      year: 'Presente',
      title: 'Referente de Turismo Dental Selecto',
      description: 'Pacientes de todo el país y el exterior eligen nuestra clínica en Llanogrande por su confidencialidad, entorno natural y resultados de autor.'
    }
  ];
}

