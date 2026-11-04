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
  imports: [TranslocoPipe, RoutePipe, CommonModule, RouterLink, SectionHeaderComponent, LuxuryButtonComponent, EditorialLabelComponent],
  templateUrl: './team.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {
  private readonly i18n = inject(I18nService);
  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.clinic.consultWide;

  // Miembros del equipo de trabajo real de Odontogamma Oriente
  private readonly membersBase = [
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.team.chiefDoctorSeated },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.team.doctorGray },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.team.assistant },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.team.doctorNavy },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.team.doctorNavyTwo }
  ];
  protected readonly members = computed<TeamMember[]>(() =>
    this.i18n.obj<TeamMember[]>('team.members.items').map((text, i) => ({ ...text, ...this.membersBase[i] }) as TeamMember)
  );
}
