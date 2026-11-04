import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';
import { EditorialLabelComponent } from '../../../../shared/components/editorial-label/editorial-label.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../../core/constants/cloudinary-assets.manifest';
import { TranslocoPipe } from '@jsverse/transloco';
import { RoutePipe } from '../../../../core/i18n/route.pipe';
import { I18nService } from '../../../../core/i18n/i18n.service';

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
  imports: [TranslocoPipe, RoutePipe, CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent, EditorialLabelComponent],
  templateUrl: './about-us.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsComponent {
  private readonly i18n = inject(I18nService);
  protected readonly secondaryImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.lab.gloves;
  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.team.directorAndAssistant;

  // Pilares de la filosofía Odontogamma
  private readonly pillarsBase = [
    { number: '01' },
    { number: '02' },
    { number: '03' }
  ];
  protected readonly pillars = computed<ValuePillar[]>(() =>
    this.i18n.obj<ValuePillar[]>('about.pillars.items').map((text, i) => ({ ...text, ...this.pillarsBase[i] }) as ValuePillar)
  );

  // Línea de tiempo de hitos
  protected readonly milestones = computed<Milestone[]>(() => this.i18n.obj<Milestone[]>('about.timeline.items'));
}
