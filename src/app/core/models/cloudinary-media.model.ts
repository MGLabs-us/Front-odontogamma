/**
 * Tipos y modelos para el ecosistema multimedia de Cloudinary en Odontogamma Oriente.
 */

/**
 * Modos de recorte y ajuste disponibles en Cloudinary.
 */
export type CloudinaryCropMode =
  | 'scale'
  | 'fit'
  | 'limit'
  | 'mfit'
  | 'fill'
  | 'lfill'
  | 'pad'
  | 'lpad'
  | 'mpad'
  | 'crop'
  | 'thumb'
  | 'auto';

/**
 * Puntos focales de gravedad para recortes inteligentes.
 */
export type CloudinaryGravity =
  | 'auto'
  | 'face'
  | 'faces'
  | 'center'
  | 'north'
  | 'north_east'
  | 'east'
  | 'south_east'
  | 'south'
  | 'south_west'
  | 'west'
  | 'north_west';

/**
 * Opciones de transformación para optimización de imágenes en Cloudinary.
 */
export interface CloudinaryImageTransformOptions {
  /** Ancho en píxeles */
  width?: number;
  /** Alto en píxeles */
  height?: number;
  /** Modo de recorte */
  crop?: CloudinaryCropMode;
  /** Gravedad o enfoque inteligente */
  gravity?: CloudinaryGravity;
  /** Relación de aspecto (ej. '16:9', '1:1', '4:5', '3:2') */
  aspectRatio?: string;
  /** Nivel de compresión / calidad ('auto' por defecto para compresión perceptual óptima) */
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | 'auto:low' | number;
  /** Formato de entrega ('auto' por defecto para servir WebP/AVIF según el navegador) */
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  /** Radio de borde para esquinas redondeadas o círculo ('max') */
  radius?: number | 'max';
  /** Desenfocar imagen (útil para placeholders o fondos) */
  blur?: number;
  /** Parámetros adicionales en formato crudo si se requieren */
  rawTransformations?: string;
}

/**
 * Opciones de transformación para optimización y streaming de videos en Cloudinary.
 */
export interface CloudinaryVideoTransformOptions {
  /** Ancho en píxeles */
  width?: number;
  /** Alto en píxeles */
  height?: number;
  /** Modo de recorte */
  crop?: CloudinaryCropMode;
  /** Calidad de codificación */
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | number;
  /** Formato de video ('auto', 'mp4', 'webm') */
  format?: 'auto' | 'mp4' | 'webm';
  /** Segundo específico del cual capturar el fotograma poster */
  posterTimeOffset?: number | string;
}

/**
 * Presets o configuraciones predefinidas de visualización para la web.
 */
export type CloudinaryAssetPreset =
  | 'hero'
  | 'card'
  | 'card-portrait'
  | 'gallery'
  | 'avatar'
  | 'thumbnail'
  | 'slider-before-after'
  | 'video-poster';

/**
 * Respuesta devuelta por la API de subida directa de Cloudinary (Unsigned Direct Upload).
 */
export interface CloudinaryDirectUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
}

/**
 * Estado de progreso de subida de un archivo individual.
 */
export interface CloudinaryUploadProgress {
  fileName: string;
  fileSize: number;
  percentage: number;
  isComplete: boolean;
  hasError: boolean;
  errorMessage?: string;
  secureUrl?: string;
  publicId?: string;
}

