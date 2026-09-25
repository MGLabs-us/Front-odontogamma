import {
  Component,
  inject,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  signal,
  computed,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { LuxuryButtonComponent } from '../../../shared/components/luxury-button/luxury-button.component';
import { BeforeAfterSliderComponent } from '../../../shared/components/before-after-slider/before-after-slider.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
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
 * Página Principal (Landing Page) inspirada en la estética editorial de Apa Aesthetic.
 * Presenta el Hero cinemático con perspectiva 3D, pilares interactivos con profundidad espacial,
 * casos interactivos antes/después y galería tridimensional de micro-detalle.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LuxuryButtonComponent,
    BeforeAfterSliderComponent,
    SectionHeaderComponent,
    Tilt3dDirective
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroVideo') private heroVideo?: ElementRef<HTMLVideoElement>;
  private readonly portfolioService = inject(PortfolioService);
  private readonly platformId = inject(PLATFORM_ID);

  // Slider de tratamientos de firma interactivo ("corredizo" con avance automático)
  protected readonly activeServiceIndex = signal<number>(0);
  protected readonly isAutoplayPaused = signal<boolean>(false);
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private readonly AUTOPLAY_INTERVAL_MS = 6000;

  // Señal calculada para el procedimiento actualmente visible
  protected readonly activeService = computed(() => {
    const list = this.services();
    return list[this.activeServiceIndex()] ?? list[0];
  });

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
    }
  }

  public ngOnDestroy(): void {
    this.stopAutoplay();
  }

  public setService(index: number): void {
    this.activeServiceIndex.set(index);
    this.restartAutoplay();
  }

  public nextService(): void {
    const count = this.services().length;
    if (count > 0) {
      this.activeServiceIndex.update(curr => (curr + 1) % count);
    }
    this.restartAutoplay();
  }

  public prevService(): void {
    const count = this.services().length;
    if (count > 0) {
      this.activeServiceIndex.update(curr => (curr - 1 + count) % count);
    }
    this.restartAutoplay();
  }

  public pauseAutoplay(): void {
    this.isAutoplayPaused.set(true);
    this.stopAutoplay();
  }

  public resumeAutoplay(): void {
    this.isAutoplayPaused.set(false);
    this.startAutoplay();
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (!this.isAutoplayPaused()) {
        const count = this.services().length;
        if (count > 0) {
          this.activeServiceIndex.update(curr => (curr + 1) % count);
        }
      }
    }, this.AUTOPLAY_INTERVAL_MS);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private restartAutoplay(): void {
    if (isPlatformBrowser(this.platformId) && !this.isAutoplayPaused()) {
      this.startAutoplay();
    }
  }

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
  protected readonly allCases = this.portfolioService.cases;

  // Estado del visualizador tridimensional de casos de transformación
  protected readonly selectedCaseCategory = signal<string>('todos');
  protected readonly activeCompareView = signal<Record<string, 'after' | 'before'>>({});

  // Categorías disponibles para filtrar la galería tridimensional
  protected readonly galleryCategories = [
    { id: 'todos', label: 'Todos los Casos' },
    { id: 'carillas', label: 'Carillas & Lentes' },
    { id: 'diseno-sonrisa', label: 'Diseño de Sonrisa' },
    { id: 'rehabilitacion', label: 'Rehabilitación' }
  ];

  // Casos filtrados para la galería de alta definición
  protected readonly filteredCases = computed(() => {
    const cat = this.selectedCaseCategory();
    const cases = this.allCases();
    if (cat === 'todos') {
      return cases.slice(0, 6);
    }
    return cases.filter(c => c.category === cat);
  });

  public setCategory(categoryId: string): void {
    this.selectedCaseCategory.set(categoryId);
  }

  public toggleCaseView(caseId: string): void {
    this.activeCompareView.update(map => {
      const current = map[caseId] ?? 'after';
      return { ...map, [caseId]: current === 'after' ? 'before' : 'after' };
    });
  }

  public getCaseCurrentView(caseId: string): 'after' | 'before' {
    return this.activeCompareView()[caseId] ?? 'after';
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
