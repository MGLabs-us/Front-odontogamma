import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';
import { BeforeAfterSliderComponent } from '../../../shared/components/before-after-slider/before-after-slider.component';
import { Tilt3dDirective } from '../../../shared/directives/tilt-3d.directive';

export interface PhilosophyPillar {
  number: string;
  badge: string;
  categoryTag: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  link: string;
  linkText: string;
}

/**
 * Página Principal (Landing Page) optimizada, limpia y sin redundancias.
 * Mantiene la máxima elegancia editorial, perspectiva 3D, 1 caso destacado interactivo
 * y tiempos de carga instantáneos.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LuxuryButtonComponent,
    BeforeAfterSliderComponent,
    Tilt3dDirective
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('heroVideo') private heroVideo?: ElementRef<HTMLVideoElement>;

  // Único caso de transformación destacado para la home
  protected readonly featuredCase = {
    title: 'Rejuvenecimiento Dental & Carillas Cerámicas',
    categoryLabel: 'Carillas de Porcelana',
    description: 'Restauración anatómica de bordes incisales desgastados. Mediante láminas cerámicas personalizadas, se devolvió la longitud, textura y reflectancia natural para una sonrisa rejuvenecida y armónica.',
    beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762856/foto3_antes.png',
    afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762857/foto3_despues.png',
    details: {
      treatment: 'Carillas de Cerámica Pura',
      focus: 'Restauración Anatómica & Mínima Invasión',
      result: 'Textura y Brillo Natural'
    }
  };

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

  // Pilares de filosofía estética con fotografías reales de Odontogamma y redacción concisa
  protected readonly pillars: PhilosophyPillar[] = [
    {
      number: '01',
      badge: 'Dirección Médica',
      categoryTag: 'BIOMIMÉTICA & PRECISIÓN',
      title: 'Biomimética y Alta Precisión',
      subtitle: 'Tus Dientes Intactos: Belleza Sin Dolor',
      description: 'Láminas cerámicas ultrafinas (0.2 a 0.3 mm) modeladas con magnificación microscópica que preservan tu esmalte biológico vivo sin desgastes invasivos.',
      imageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1790029060/648985706_17911045683163425_7279892063267287894_n.jpg',
      link: '/servicios/carillas-porcelana',
      linkText: 'Conocer Carillas de Porcelana'
    },
    {
      number: '02',
      badge: 'Experiencia Sensorial',
      categoryTag: 'CONFORT CLÍNICO & CERO DOLOR',
      title: 'Confort Clínico Cero Dolor',
      subtitle: 'Olvídate del Miedo al Odontólogo',
      description: 'Suites privadas insonorizadas en El Carmen de Viboral, tecnología 3D sin moldes incómodos y un trato cálido pensado para tu absoluta relajación.',
      imageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789757935/483860361_18025060961656101_7267703078192937477_n.jpg',
      link: '/who-we-are/our-location',
      linkText: 'Explorar Nuestra Sede'
    },
    {
      number: '03',
      badge: 'Resultados Reales',
      categoryTag: 'EVIDENCIA CLÍNICA & PRESTIGIO',
      title: 'Sonrisas de Firma y Confianza',
      subtitle: 'Resultados que Transforman Vidas',
      description: 'Casos clínicos reales que devuelven la armonía y naturalidad a tu rostro para que sonreír vuelva a ser tu mayor fuente de orgullo y seguridad.',
      imageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789757984/485992449_646326938135326_7644290108229838413_n.jpg',
      link: '/nuestro-trabajo/antes-y-despues',
      linkText: 'Ver Casos Clínicos'
    }
  ];
}
