/**
 * Modelo completo para tratamientos y servicios clínicos individuales de Odontogamma Oriente
 */
export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  shortDescription: string;
  detailedDescription: string[];
  heroImageUrl: string;
  galleryImages: string[];
  /** `object-position` de cada foto de la galería (para no cortar caras en fotos verticales). */
  galleryFocus?: string[];
  highlights: string[];
  idealFor: string[];
  beforeAfter: {
    beforeImageUrl: string;
    afterImageUrl: string;
    caseTitle: string;
    description: string;
    technique?: string;
    focus?: string;
    units?: string;
    timeframe?: string;
  };
  badge?: string;
}
