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
    units?: string;       // Ej: "10 Carillas de Porcelana E-max"
    shade?: string;       // Ej: "BL2 Natural Luminescence"
    timeframe?: string;   // Ej: "2 Sesiones clínicas"
  };
  featured?: boolean;
}

