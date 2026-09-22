import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  CloudinaryImageTransformOptions,
  CloudinaryVideoTransformOptions,
  CloudinaryAssetPreset,
  CloudinaryDirectUploadResponse
} from '../models/cloudinary-media.model';

/**
 * Servicio centralizado para la gestión, optimización y carga de medios en Cloudinary.
 * Adaptado para Odontogamma Oriente (cloud: ffvpll33).
 */
@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private readonly cloudName = environment.cloudinary.cloudName;
  private readonly uploadPreset = environment.cloudinary.uploadPreset;
  private readonly baseUrl = `https://res.cloudinary.com/${this.cloudName}`;

  /**
   * Obtiene el nombre de la nube configurada.
   */
  public getCloudName(): string {
    return this.cloudName;
  }

  /**
   * Construye una URL de imagen altamente optimizada con auto-formato (WebP/AVIF),
   * compresión perceptual inteligente (q_auto) y transformaciones dimensionales.
   *
   * Si recibe una URL externa (ej. Unsplash o CDN externo), utiliza el endpoint de Fetch de Cloudinary
   * para optimizarla a través de tu nube sin necesidad de descargarla manualmente.
   *
   * @param publicIdOrUrl Identificador público en Cloudinary o URL externa de imagen.
   * @param options Opciones de transformación (ancho, alto, recorte, etc.)
   * @returns URL de Cloudinary con transformaciones aplicadas.
   */
  public buildOptimizedImageUrl(
    publicIdOrUrl: string,
    options?: CloudinaryImageTransformOptions
  ): string {
    if (!publicIdOrUrl) return '';

    const transformationString = this.serializeImageTransformations(options);

    // Caso 1: Es una URL completa de Cloudinary previa -> insertamos transformaciones si no las tiene
    if (publicIdOrUrl.includes('res.cloudinary.com')) {
      return this.injectTransformationsIntoCloudinaryUrl(publicIdOrUrl, transformationString);
    }

    // Caso 2: Es una URL externa HTTP/HTTPS -> Servir mediante Cloudinary Fetch API
    if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
      const encodedUrl = encodeURI(publicIdOrUrl);
      return `${this.baseUrl}/image/fetch/${transformationString}/${encodedUrl}`;
    }

    // Caso 3: Es un Public ID nativo de Cloudinary (ej: 'odontogamma/carillas/pilar-01')
    const cleanPublicId = publicIdOrUrl.replace(/^\/+/, '');
    return `${this.baseUrl}/image/upload/${transformationString}/${cleanPublicId}`;
  }

  /**
   * Transforma una imagen con recorte automático inteligente (Auto-Crop)
   * enfocado en el área visualmente más relevante (dientes o rostro).
   *
   * @param publicIdOrUrl Identificador público o URL de la imagen.
   * @param width Ancho en píxeles.
   * @param height Alto en píxeles.
   * @param gravity Punto focal ('auto', 'face', etc.)
   * @returns URL optimizada con auto-crop aplicado.
   */
  public buildAutoCropImageUrl(
    publicIdOrUrl: string,
    width: number,
    height: number,
    gravity: 'auto' | 'face' | 'center' = 'auto'
  ): string {
    return this.buildOptimizedImageUrl(publicIdOrUrl, {
      width,
      height,
      crop: 'auto',
      gravity,
      format: 'auto',
      quality: 'auto'
    });
  }

  /**
   * Aplica un preset predefinido de visualización según la zona de la web.
   *
   * @param publicIdOrUrl Identificador o URL de la imagen.
   * @param preset Preset estandarizado ('hero', 'card', 'gallery', etc.)
   * @returns URL optimizada para dicho preset.
   */
  public buildPresetImageUrl(
    publicIdOrUrl: string,
    preset: CloudinaryAssetPreset
  ): string {
    const presetOptions = this.getOptionsForPreset(preset);
    return this.buildOptimizedImageUrl(publicIdOrUrl, presetOptions);
  }

  /**
   * Construye una URL de video optimizada para streaming de alta eficiencia.
   * Aplica transcodificación automática a MP4/WebM según el navegador.
   *
   * @param publicIdOrUrl Identificador del video o URL.
   * @param options Opciones de transformación de video.
   * @returns URL de streaming de video optimizada.
   */
  public buildOptimizedVideoUrl(
    publicIdOrUrl: string,
    options?: CloudinaryVideoTransformOptions
  ): string {
    if (!publicIdOrUrl) return '';

    const transformationString = this.serializeVideoTransformations(options);

    if (publicIdOrUrl.includes('res.cloudinary.com')) {
      return publicIdOrUrl;
    }

    if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
      return `${this.baseUrl}/video/fetch/${transformationString}/${encodeURI(publicIdOrUrl)}`;
    }

    const cleanPublicId = publicIdOrUrl.replace(/^\/+/, '');
    return `${this.baseUrl}/video/upload/${transformationString}/${cleanPublicId}`;
  }

  /**
   * Extrae un fotograma de un video en Cloudinary para usarlo como póster fotográfico.
   *
   * @param videoPublicId Identificador público del video.
   * @param timeOffset Segundo del cual extraer el fotograma (ej. 1, '1.5', 'so_auto').
   * @returns URL de la imagen fija extraída del video.
   */
  public buildVideoPosterUrl(
    videoPublicId: string,
    timeOffset: number | string = 1
  ): string {
    const cleanPublicId = videoPublicId.replace(/^\/+/, '').replace(/\.[^/.]+$/, '');
    const timeParam = typeof timeOffset === 'number' ? `so_${timeOffset}` : timeOffset;
    return `${this.baseUrl}/video/upload/f_auto,q_auto,${timeParam}/${cleanPublicId}.jpg`;
  }

  /**
   * Genera el contenido para el atributo `srcset` de una imagen responsive.
   * Permite que móviles carguen imágenes ligeras y monitores 4K carguen máxima definición.
   *
   * @param publicIdOrUrl Identificador público o URL de la imagen.
   * @param widths Lista de anchos en píxeles (por defecto: [480, 768, 1024, 1440, 1920])
   * @returns Cadena formateada para `srcset`.
   */
  public buildResponsiveSrcSet(
    publicIdOrUrl: string,
    widths: number[] = [480, 768, 1024, 1440, 1920]
  ): string {
    if (!publicIdOrUrl) return '';

    return widths
      .map(width => {
        const url = this.buildOptimizedImageUrl(publicIdOrUrl, {
          width,
          quality: 'auto',
          format: 'auto'
        });
        return `${url} ${width}w`;
      })
      .join(', ');
  }

  /**
   * Sube directamente una fotografía dental de un paciente desde el navegador a Cloudinary
   * utilizando la API REST de subida directa con preset no firmado.
   *
   * @param file Archivo de imagen seleccionado por el usuario (File o Blob).
   * @param folder Carpeta de destino dentro de Cloudinary (por defecto: 'odontogamma/valoraciones-virtuales').
   * @returns Promesa con los metadatos y URL permanente segura en Cloudinary.
   */
  public async uploadPatientDentalPhoto(
    file: File | Blob,
    folder: string = `${environment.cloudinary.defaultFolder}/valoraciones-virtuales`
  ): Promise<CloudinaryDirectUploadResponse> {
    const uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    formData.append('folder', folder);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.error?.message ||
          `Error ${response.status} al subir la fotografía dental a Cloudinary.`
      );
    }

    return (await response.json()) as CloudinaryDirectUploadResponse;
  }

  /**
   * Serializa un objeto de opciones de imagen a una cadena de transformaciones de Cloudinary.
   */
  private serializeImageTransformations(options?: CloudinaryImageTransformOptions): string {
    const parts: string[] = ['f_auto', 'q_auto'];

    if (!options) return parts.join(',');

    if (options.format && options.format !== 'auto') {
      parts[0] = `f_${options.format}`;
    }

    if (options.quality && options.quality !== 'auto') {
      parts[1] = `q_${options.quality}`;
    }

    if (options.width) parts.push(`w_${options.width}`);
    if (options.height) parts.push(`h_${options.height}`);
    if (options.crop) parts.push(`c_${options.crop}`);
    if (options.gravity) parts.push(`g_${options.gravity}`);
    if (options.aspectRatio) parts.push(`ar_${options.aspectRatio}`);
    if (options.radius) parts.push(`r_${options.radius}`);
    if (options.blur) parts.push(`e_blur:${options.blur}`);
    if (options.rawTransformations) parts.push(options.rawTransformations);

    return parts.join(',');
  }

  /**
   * Serializa un objeto de opciones de video a una cadena de transformaciones de Cloudinary.
   */
  private serializeVideoTransformations(options?: CloudinaryVideoTransformOptions): string {
    const parts: string[] = ['f_auto', 'q_auto'];

    if (!options) return parts.join(',');

    if (options.format && options.format !== 'auto') {
      parts[0] = `f_${options.format}`;
    }

    if (options.quality && options.quality !== 'auto') {
      parts[1] = `q_${options.quality}`;
    }

    if (options.width) parts.push(`w_${options.width}`);
    if (options.height) parts.push(`h_${options.height}`);
    if (options.crop) parts.push(`c_${options.crop}`);

    return parts.join(',');
  }

  /**
   * Mapea cada preset estandarizado a sus parámetros óptimos de resolución y recorte.
   */
  private getOptionsForPreset(preset: CloudinaryAssetPreset): CloudinaryImageTransformOptions {
    switch (preset) {
      case 'hero':
        return { width: 1920, quality: 'auto:good', format: 'auto' };
      case 'card':
        return { width: 800, height: 500, crop: 'fill', gravity: 'auto', format: 'auto', quality: 'auto' };
      case 'card-portrait':
        return { width: 600, height: 800, crop: 'fill', gravity: 'auto', format: 'auto', quality: 'auto' };
      case 'gallery':
        return { width: 1000, height: 750, crop: 'fill', gravity: 'auto', format: 'auto', quality: 'auto' };
      case 'avatar':
        return { width: 300, height: 300, crop: 'fill', gravity: 'face', radius: 'max', format: 'auto', quality: 'auto' };
      case 'thumbnail':
        return { width: 250, height: 250, crop: 'fill', gravity: 'auto', format: 'auto', quality: 'auto' };
      case 'slider-before-after':
        return { width: 1200, height: 800, crop: 'fill', gravity: 'center', format: 'auto', quality: 'auto:best' };
      case 'video-poster':
        return { width: 1280, height: 720, crop: 'fill', format: 'auto', quality: 'auto' };
      default:
        return { quality: 'auto', format: 'auto' };
    }
  }

  /**
   * Inyecta parámetros de transformación dentro de una URL de Cloudinary existente si no los tenía.
   */
  private injectTransformationsIntoCloudinaryUrl(
    url: string,
    transformations: string
  ): string {
    const uploadToken = '/upload/';
    if (url.includes(uploadToken)) {
      const [before, after] = url.split(uploadToken);
      // Si la URL no tiene parámetros entre /upload/ y el public ID
      if (!after.startsWith('f_') && !after.startsWith('w_') && !after.startsWith('c_')) {
        return `${before}${uploadToken}${transformations}/${after}`;
      }
    }
    return url;
  }
}

