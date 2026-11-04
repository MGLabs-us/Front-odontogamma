import { Component, inject, ChangeDetectionStrategy, OnInit, OnDestroy, signal, computed, PLATFORM_ID } from '@angular/core';
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
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { WhatsappPipe } from '../../../core/i18n/whatsapp.pipe';
import { RoutePipe } from '../../../core/i18n/route.pipe';
import { RouteKey } from '../../../core/i18n/route-map';
import { I18nService } from '../../../core/i18n/i18n.service';

interface GalleryCategory {
  id: string;
  label: string;
}

export interface PhilosophyPillar {
  number: string;
  badge: string;
  categoryTag: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  route: RouteKey;
  serviceId?: string;
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
  imports: [TranslocoPipe, RoutePipe, WhatsappPipe, IconComponent, 
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
  private readonly i18n = inject(I18nService);
  protected readonly storyReels = CLOUDINARY_ASSETS_MANIFEST.videos.testimonials;

  private readonly portfolioService = inject(PortfolioService);
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly invitationVideo = CLOUDINARY_ASSETS_MANIFEST.videos.invitation;
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
  private readonly galleryCategoriesBase = [
    { id: 'todos' },
    { id: 'carillas' },
    { id: 'diseno-sonrisa' },
    { id: 'rehabilitacion' },
    { id: 'ortodoncia' }
  ];
  protected readonly galleryCategories = computed<GalleryCategory[]>(() =>
    this.i18n.obj<GalleryCategory[]>('home.gallery.categories').map((text, i) => ({ ...text, ...this.galleryCategoriesBase[i] }))
  );

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
  private readonly pillarsBase = [
    { number: '01', imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.lab.modelsBlue, route: 'service-detail' as RouteKey, serviceId: 'carillas-porcelana' },
    { number: '02', imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.clinic.receptionFront, route: 'location' as RouteKey },
    { number: '03', imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.patients.studioPortrait, route: 'before-after' as RouteKey }
  ];
  protected readonly pillars = computed<PhilosophyPillar[]>(() =>
    this.i18n.obj<PhilosophyPillar[]>('home.philosophy.items').map((text, i) => ({ ...text, ...this.pillarsBase[i] }) as PhilosophyPillar)
  );
}
