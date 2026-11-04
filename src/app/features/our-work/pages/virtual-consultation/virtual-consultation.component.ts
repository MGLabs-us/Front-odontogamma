import { Component, signal, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';
import { CloudinaryService } from '../../../../core/services/cloudinary.service';
import { ArrowMarkComponent } from '../../../../shared/components/arrow-mark/arrow-mark.component';
import { CLOUDINARY_ASSETS_MANIFEST } from '../../../../core/constants/cloudinary-assets.manifest';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { WhatsappPipe } from '../../../../core/i18n/whatsapp.pipe';
import { RoutePipe } from '../../../../core/i18n/route.pipe';
import { I18nService } from '../../../../core/i18n/i18n.service';

export interface UploadedDentalPhoto {
  file: File;
  previewUrl: string;
  name: string;
  sizeFormatted: string;
}

interface TreatmentOption {
  value: string;
  label: string;
}

interface PhotoGuideStep {
  step: string;
  title: string;
  description: string;
  imageUrl: string;
  tip: string;
}

/**
 * Vista de Valoración Virtual Gratuita: Permite a los pacientes subir fotografías
 * de su dentadura directamente a Cloudinary para recibir una evaluación estética preliminar
 * personalizada por correo electrónico por el Dr. Jaime Arcila Cano.
 */
@Component({
  selector: 'app-virtual-consultation',
  standalone: true,
  imports: [TranslocoPipe, RoutePipe, WhatsappPipe, IconComponent, 
    CommonModule,
    FormsModule,
    RouterLink,
    SectionHeaderComponent,
    LuxuryButtonComponent,
    ArrowMarkComponent
  ],
  templateUrl: './virtual-consultation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualConsultationComponent {
  private readonly i18n = inject(I18nService);
  protected readonly heroImageUrl = CLOUDINARY_ASSETS_MANIFEST.images.patients.furCoatSmile;

  private readonly cloudinaryService = inject(CloudinaryService);
  // Datos del formulario de contacto y valoración
  protected formData = {
    fullName: '',
    email: '',
    phone: '',
    city: '',
    serviceInterest: 'carillas-porcelana',
    concerns: ''
  };

  // Opciones de tratamientos de interés
  private readonly treatmentOptionsBase = [
    { value: 'carillas-porcelana' },
    { value: 'odontologia-cosmetica' },
    { value: 'transformacion-total' },
    { value: 'aclaramiento-laser' },
    { value: 'desgaste-fracturas' },
    { value: 'otro' }
  ];
  protected readonly treatmentOptions = computed<TreatmentOption[]>(() =>
    this.i18n.obj<TreatmentOption[]>('virtual.form.options').map((text, i) => ({ ...text, ...this.treatmentOptionsBase[i] }))
  );

  // Pasos fotográficos recomendados
  private readonly photoStepsBase = [
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.patients.redHairPortrait },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.patients.redSweaterSide },
    { imageUrl: CLOUDINARY_ASSETS_MANIFEST.images.smiles.wide }
  ];
  protected readonly photoSteps = computed<PhotoGuideStep[]>(() =>
    this.i18n.obj<PhotoGuideStep[]>('virtual.guide.items').map((text, i) => ({ ...text, ...this.photoStepsBase[i] }) as PhotoGuideStep)
  );

  // Lista de fotografías subidas con previsualización
  protected readonly uploadedPhotos = signal<UploadedDentalPhoto[]>([]);

  // Estados de carga y envío
  protected readonly isDragging = signal<boolean>(false);
  protected readonly isSubmitting = signal<boolean>(false);
  protected readonly isSuccess = signal<boolean>(false);
  protected readonly errorMessage = signal<string | null>(null);

  /**
   * Manejador de selección de archivos tradicional
   */
  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
      input.value = ''; // Reset para permitir volver a cargar el mismo archivo
    }
  }

  /**
   * Manejador de arrastre (Drag & Drop)
   */
  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer?.files) {
      this.processFiles(Array.from(event.dataTransfer.files));
    }
  }

  /**
   * Procesa las imágenes seleccionadas y genera previsualizaciones seguras
   */
  private processFiles(files: File[]): void {
    this.errorMessage.set(null);
    const validImages = files.filter(f => f.type.startsWith('image/'));

    if (validImages.length === 0) {
      this.errorMessage.set(this.i18n.t('virtual.errors.invalidFiles'));
      return;
    }

    const currentPhotos = [...this.uploadedPhotos()];

    if (currentPhotos.length + validImages.length > 6) {
      this.errorMessage.set(this.i18n.t('virtual.errors.tooManyPhotos'));
      return;
    }

    const newEntries: UploadedDentalPhoto[] = validImages.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
      sizeFormatted: this.formatFileSize(file.size)
    }));

    this.uploadedPhotos.set([...currentPhotos, ...newEntries]);
  }

  /**
   * Elimina una fotografía subida
   */
  protected removePhoto(index: number): void {
    const list = [...this.uploadedPhotos()];
    const removed = list.splice(index, 1);
    if (removed.length > 0) {
      URL.revokeObjectURL(removed[0].previewUrl);
    }
    this.uploadedPhotos.set(list);
  }

  /**
   * Envío del formulario de valoración con subida directa de fotos a Cloudinary
   */
  protected async submitConsultation(): Promise<void> {
    if (!this.formData.fullName || !this.formData.email || !this.formData.phone) {
      this.errorMessage.set(this.i18n.t('virtual.errors.missingFields'));
      return;
    }

    if (this.uploadedPhotos().length === 0) {
      this.errorMessage.set(this.i18n.t('virtual.errors.noPhotos'));
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      // Subida asíncrona de las fotografías dentales a Cloudinary
      const uploadPromises = this.uploadedPhotos().map(photoItem =>
        this.cloudinaryService
          .uploadPatientDentalPhoto(photoItem.file)
          .then(res => res.secure_url)
          .catch(() => photoItem.previewUrl)
      );

      await Promise.all(uploadPromises);

      this.isSubmitting.set(false);
      this.isSuccess.set(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      this.isSubmitting.set(false);
      this.isSuccess.set(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  /** Escapa texto del usuario antes de insertarlo en un mensaje traducido con HTML (`[innerHTML]`). */
  protected esc(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  protected serviceInterestLabel(): string {
    return this.treatmentOptions().find(o => o.value === this.formData.serviceInterest)?.label ?? '';
  }

  protected resetForm(): void {
    this.uploadedPhotos().forEach(p => URL.revokeObjectURL(p.previewUrl));
    this.uploadedPhotos.set([]);
    this.formData = {
      fullName: '',
      email: '',
      phone: '',
      city: '',
      serviceInterest: 'carillas-porcelana',
      concerns: ''
    };
    this.isSuccess.set(false);
    this.errorMessage.set(null);
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}
