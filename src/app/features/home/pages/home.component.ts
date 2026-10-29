import {
  Component,
  inject,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
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
import { EditorialLabelComponent } from '../../../shared/components/editorial-label/editorial-label.component';
import { ArrowMarkComponent } from '../../../shared/components/arrow-mark/arrow-mark.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../core/constants/cloudinary-assets.manifest';
import { VideoReelComponent } from '../../../shared/components/video-reel/video-reel.component';

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
 * Presenta el Hero editorial con perspectiva 3D, pilares interactivos con profundidad espacial,
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
    Tilt3dDirective,
    EditorialLabelComponent,
    ArrowMarkComponent,
    VideoReelComponent
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  protected readonly storyReels = CLOUDINARY_ASSETS_MANIFEST.videos.testimonials;

  private readonly portfolioService = inject(PortfolioService);
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly invitationVideo = CLOUDINARY_ASSETS_MANIFEST.videos.invitation;
  protected readonly whatsappUrl =
    'https://wa.me/573217209420?text=Hola,%20vi%20el%20video%20y%20quiero%20conocer%20los%20detalles%20de%20la%20experiencia%20en%20Odontogamma%20Oriente.';
  protected readonly heroVideo = CLOUDINARY_ASSETS_MANIFEST.videos.hero;
  protected readonly heroBackgroundImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.clinic.lobby;

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
    { id: 'rehabilitacion', label: 'Rehabilitación' },
    { id: 'ortodoncia', label: 'Ortodoncia' }
  ];

  // Casos filtrados para la galería de alta definición
  protected readonly filteredCases = computed(() => {
    const cat = this.selectedCaseCategory();
    const cases = this.allCases();
    if (cat === 'todos') {
      return cases;
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
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.lab.modelsBlue,
      link: '/servicios/carillas-porcelana',
      linkText: 'Conocer Carillas de Porcelana'
    },
    {
      number: '02',
      badge: 'Experiencia Sensorial',
      categoryTag: 'CONFORT CLÍNICO & CERO DOLOR',
      title: 'Confort Clínico Cero Dolor',
      subtitle: 'Olvídate del Miedo al Odontólogo',
      description: 'Una sede acogedora en El Carmen de Viboral, tecnología 3D sin moldes incómodos y un trato cálido pensado para tu absoluta relajación.',
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.receptionFront,
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
      imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.patients.studioPortrait,
      link: '/nuestro-trabajo/antes-y-despues',
      linkText: 'Ver Casos Clínicos'
    }
  ];
}
