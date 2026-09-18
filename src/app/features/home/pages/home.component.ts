import { Component, inject, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';
import { BeforeAfterSliderComponent } from '../../../shared/components/before-after-slider/before-after-slider.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

export interface PhilosophyPillar {
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  imageUrl: string;
  link: string;
  linkText: string;
}

/**
 * Página Principal (Landing Page) inspirada en la estética editorial de Apa Aesthetic.
 * Presenta el Hero cinemático, pilares persuasivos con imágenes y beneficios, casos interactivos
 * y catálogo de procedimientos de firma.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LuxuryButtonComponent,
    BeforeAfterSliderComponent,
    SectionHeaderComponent
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('heroVideo') private heroVideo?: ElementRef<HTMLVideoElement>;
  private readonly portfolioService = inject(PortfolioService);

  public ngAfterViewInit(): void {
    const video = this.heroVideo?.nativeElement;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const triggerPlayback = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Si la política del navegador bloquea el autoplay tras restaurar pestaña
            const onWakeup = () => {
              video.play().catch(() => {});
              window.removeEventListener('click', onWakeup);
              window.removeEventListener('touchstart', onWakeup);
              window.removeEventListener('scroll', onWakeup);
            };
            window.addEventListener('click', onWakeup, { once: true, passive: true });
            window.addEventListener('touchstart', onWakeup, { once: true, passive: true });
            window.addEventListener('scroll', onWakeup, { once: true, passive: true });
          });
        }
      };

      if (video.readyState >= 2) {
        triggerPlayback();
      } else {
        video.addEventListener('loadeddata', triggerPlayback, { once: true });
        triggerPlayback();
      }
    }
  }

  // Signals reactivas obtenidas del servicio central
  protected readonly services = this.portfolioService.services;
  protected readonly featuredCases = this.portfolioService.featuredCases;

  // Pilares persuasivos con imágenes, ventajas de alto impacto y llamadas a la acción
  protected readonly pillars: PhilosophyPillar[] = [
    {
      number: '01',
      badge: 'Cero Desgaste Agresivo',
      title: 'Biomimética y Precisión',
      subtitle: 'Tus Dientes Intactos: Belleza Sin Dolor',
      description: '¿Temes que tallen tus dientes como en la odontología tradicional? Diseñamos láminas cerámicas ultrafinas (0.2 a 0.3mm) que preservan tu esmalte vivo. Obtienes una sonrisa alineada, simétrica y luminosa con máxima naturalidad.',
      benefits: [
        'Adiós a dientes gruesos, artificiales o "blanco pared"',
        'Preservación del 100% de la salud biológica de tu diente',
        'Diseño guiado por microscopía óptica y estética facial'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=85',
      link: '/servicios/carillas-porcelana',
      linkText: 'Conocer Carillas de Porcelana →'
    },
    {
      number: '02',
      badge: 'Blancura Inalterable +15 Años',
      title: 'Maestría en Cerámica',
      subtitle: 'Inmune al Café, Vino y Paso del Tiempo',
      description: 'Las resinas plásticas se manchan y pierden brillo a los pocos meses. Nuestras carillas de cerámica feldespática europea son modeladas a mano por maestros ceramistas con la misma translucidez y refracción lumínica que el esmalte de un diamante.',
      benefits: [
        'Disfruta de café, vino y comidas sin temor a pigmentaciones',
        'Brillo vítreo permanente que no requiere pulidos constantes',
        'Resistencia superior a microfracturas y desgaste por masticación'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=85',
      link: '/servicios/odontologia-cosmetica',
      linkText: 'Ver Arte en Cerámica →'
    },
    {
      number: '03',
      badge: 'Santuario de Calma en Llanogrande',
      title: 'Experiencia Privada VIP',
      subtitle: 'Olvídate del Miedo al Odontólogo',
      description: 'Transformar tu sonrisa debe ser un momento de absoluto deleite. Nuestra clínica en el Oriente Antioqueño combina arquitectura contemporánea, jardines verdes, insonorización, suites privadas y un trato cálido y humano sin prisas.',
      benefits: [
        'Atención confidencial personalizada One-to-One',
        'Tecnología 3D sin moldes de silicona ni procedimientos incómodos',
        'Entorno campestre exclusivo a 15 min del Aeropuerto JMC'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      link: '/who-we-are/our-location',
      linkText: 'Explorar Nuestra Sede →'
    }
  ];
}
