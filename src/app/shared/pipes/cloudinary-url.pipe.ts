import { Pipe, PipeTransform, inject } from '@angular/core';
import { CloudinaryService } from '../../core/services/cloudinary.service';
import {
  CloudinaryImageTransformOptions,
  CloudinaryAssetPreset
} from '../../core/models/cloudinary-media.model';

/**
 * Pipe standalone para transformar y optimizar imágenes y miniaturas de Cloudinary
 * directamente en las plantillas HTML de Angular.
 *
 * Ejemplos de uso:
 * 1. Con preset predeterminado:
 *    <img [src]="item.heroImageUrl | cloudinaryUrl: 'card'" />
 *
 * 2. Con transformaciones personalizadas:
 *    <img [src]="item.imageUrl | cloudinaryUrl: { width: 600, height: 600, crop: 'fill' }" />
 *
 * 3. Uso básico con auto-formato y auto-calidad:
 *    <img [src]="item.photoUrl | cloudinaryUrl" />
 */
@Pipe({
  name: 'cloudinaryUrl',
  standalone: true
})
export class CloudinaryUrlPipe implements PipeTransform {
  private readonly cloudinaryService = inject(CloudinaryService);

  transform(
    publicIdOrUrl: string | null | undefined,
    presetOrOptions?: CloudinaryAssetPreset | CloudinaryImageTransformOptions
  ): string {
    if (!publicIdOrUrl) return '';

    if (typeof presetOrOptions === 'string') {
      return this.cloudinaryService.buildPresetImageUrl(publicIdOrUrl, presetOrOptions);
    }

    return this.cloudinaryService.buildOptimizedImageUrl(publicIdOrUrl, presetOrOptions);
  }
}

