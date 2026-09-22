/**
 * Modelo para casos de transformación clínica (Antes / Después)
 */
export interface CaseStudy {
  id: string;
  title: string;
  category: 'carillas' | 'diseno-sonrisa' | 'rehabilitacion' | 'aclaramiento' | 'ortodoncia';
  categoryLabel: string;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  details: {
    treatment?: string;   // Ej: "Carillas Cerámicas Feldespáticas"
    focus?: string;       // Ej: "Restauración de Bordes & Longitud"
    result?: string;      // Ej: "Textura y Brillo Natural"
    units?: string;       // Opcional para retrocompatibilidad
    shade?: string;       // Opcional para retrocompatibilidad
    timeframe?: string;   // Opcional para retrocompatibilidad
  };
  featured?: boolean;
}

