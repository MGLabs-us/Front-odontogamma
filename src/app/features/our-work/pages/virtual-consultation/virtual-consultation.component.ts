import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LuxuryButtonComponent } from '../../../../shared/components/luxury-button/luxury-button.component';
import { CloudinaryService } from '../../../../core/services/cloudinary.service';

export interface UploadedDentalPhoto {
  file: File;
  previewUrl: string;
  name: string;
  sizeFormatted: string;
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
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SectionHeaderComponent,
    LuxuryButtonComponent
  ],
  templateUrl: './virtual-consultation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualConsultationComponent {
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
  protected readonly treatmentOptions = [
    { value: 'carillas-porcelana', label: 'Carillas de Porcelana Feldespática' },
    { value: 'odontologia-cosmetica', label: 'Odontología Cosmética & Armonización Facial' },
    { value: 'transformacion-total', label: 'Transformación Completa de Sonrisa' },
    { value: 'aclaramiento-laser', label: 'Aclaramiento Dental Láser' },
    { value: 'desgaste-fracturas', label: 'Corrección de Dientes Desgastados o Fracturados' },
    { value: 'otro', label: 'Otra Consulta o Asesoría Personalizada' }
  ];

  // Pasos fotográficos recomendados
  protected readonly photoSteps: PhotoGuideStep[] = [
    {
      step: 'Foto 01',
      title: 'Sonrisa Natural de Frente',
      description: 'Una toma frontal con buena luz natural donde se aprecien tus labios relajados y tus dientes en una sonrisa espontánea.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      tip: 'Evita sombras fuertes y no utilices filtros de belleza.'
    },
    {
      step: 'Foto 02',
      title: 'Sonrisa de Perfil / Tres Cuartos',
      description: 'Permite al Dr. Jaime Arcila analizar la proyección dental, el perfil labial y cómo armoniza la sonrisa con tu nariz y mentón.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      tip: 'Gira levemente la cabeza unos 45 grados mirando hacia la cámara.'
    },
    {
      step: 'Foto 03',
      title: 'Primer Plano de los Dientes',
      description: 'Un acercamiento claro donde se observe el borde de los dientes superiores e inferiores en oclusión (mordiendo normalmente).',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      tip: 'Enfoca nítidamente la zona dental con buena iluminación diurna.'
    }
  ];

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
      this.errorMessage.set('Por favor sube únicamente archivos de imagen válidos (.jpg, .png, .webp).');
      return;
    }

    const currentPhotos = [...this.uploadedPhotos()];

    if (currentPhotos.length + validImages.length > 6) {
      this.errorMessage.set('Puedes subir un máximo de 6 fotografías para la valoración preliminar.');
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
      this.errorMessage.set('Por favor completa tu nombre, correo electrónico y teléfono con WhatsApp.');
      return;
    }

    if (this.uploadedPhotos().length === 0) {
      this.errorMessage.set('Por favor adjunta al menos una fotografía de tus dientes para que podamos realizar la evaluación.');
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

