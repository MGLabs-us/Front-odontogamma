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
  imports: [TranslocoPipe, RoutePipe, CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent, EditorialLabelComponent],
  templateUrl: './chief-doctor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiefDoctorComponent {
  private readonly i18n = inject(I18nService);
  protected readonly secondaryImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.team.doctorAtWork;

  // Principios de firma del Dr. Jaime Arcila
  protected readonly signaturePrinciples = computed<DoctorSignaturePrinciple[]>(() => this.i18n.obj<DoctorSignaturePrinciple[]>('doctor.principles.items'));

  // Credenciales y membresías académicas
  protected readonly credentials = computed<Credential[]>(() => this.i18n.obj<Credential[]>('doctor.career.items'));
}
