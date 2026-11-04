import { Injectable, computed, inject } from '@angular/core';
import { ServiceItem } from '../models/service-item.model';
import { CaseStudy } from '../models/case-study.model';
import { CloudinaryService } from './cloudinary.service';
import { CLOUDINARY_ASSETS_MANIFEST } from '../constants/cloudinary-assets.manifest';
import { I18nService } from '../i18n/i18n.service';
import { serviceIdFromSlug, serviceSlug } from '../i18n/route-map';

const IMG = CLOUDINARY_ASSETS_MANIFEST.images;
const CASE_IMG = 'https://res.cloudinary.com/u81t66ol/image/upload';

/** Parte de un tratamiento que no depende del idioma (imágenes y fotos antes/después). */
type ServiceBase = Pick<ServiceItem, 'id' | 'heroImageUrl' | 'galleryImages' | 'galleryFocus'> & {
  beforeImageUrl: string;
  afterImageUrl: string;
};

/** Parte de un caso clínico que no depende del idioma. */
type CaseBase = Pick<CaseStudy, 'id' | 'category' | 'beforeImageUrl' | 'afterImageUrl' | 'featured'>;

/** Textos de un tratamiento tal como viven en `services.items.<id>` del diccionario. */
type ServiceText = Omit<ServiceItem, 'id' | 'slug' | 'heroImageUrl' | 'galleryImages' | 'beforeAfter'> & {
  beforeAfter: Omit<ServiceItem['beforeAfter'], 'beforeImageUrl' | 'afterImageUrl'>;
};

type CaseText = Pick<CaseStudy, 'title' | 'categoryLabel' | 'description' | 'details'>;

const SERVICES_BASE: ServiceBase[] = [
  {
    id: 'carillas-porcelana',
    heroImageUrl: IMG.smiles.veneers,
    galleryImages: [IMG.smiles.natural, IMG.lab.modelsGreen, IMG.smiles.side],
    beforeImageUrl: `${CASE_IMG}/v1793155004/foto3_antes.png`,
    afterImageUrl: `${CASE_IMG}/v1793155003/foto3_despues.png`
  },
  {
    id: 'odontologia-cosmetica',
    heroImageUrl: IMG.smiles.macro,
    galleryImages: [IMG.patients.furCoat, IMG.patients.closeUp, IMG.patients.blackBackdrop],
    beforeImageUrl: `${CASE_IMG}/v1793155002/foto7_antes.png`,
    afterImageUrl: `${CASE_IMG}/v1793155002/foto7_despues.png`
  },
  {
    id: 'proceso-transformacion',
    heroImageUrl: IMG.clinic.consultPanoramic,
    galleryImages: [IMG.lab.instruments, IMG.patients.treatmentCollage, IMG.lab.dentures],
    beforeImageUrl: `${CASE_IMG}/v1793155003/foto6_antes.png`,
    afterImageUrl: `${CASE_IMG}/v1793155002/foto6_despues.png`
  },
  {
    id: 'aclaramiento-laser',
    heroImageUrl: IMG.campaigns.whitening,
    galleryImages: [IMG.campaigns.whiteningLaser, IMG.smiles.profile, IMG.patients.blackBackdropCollage],
    // La primera es un diseño vertical y la tercera un collage cuadrado: la cara está arriba, no en el centro.
    galleryFocus: ['center 12%', 'center', 'center 8%'],
    beforeImageUrl: `${CASE_IMG}/v1793155005/foto1_antes.png`,
    afterImageUrl: `${CASE_IMG}/v1793155005/foto1_despues.png`
  }
];

const CASES_BASE: CaseBase[] = [
  { id: 'caso-01', category: 'carillas', featured: true, beforeImageUrl: `${CASE_IMG}/v1793155004/foto3_antes.png`, afterImageUrl: `${CASE_IMG}/v1793155003/foto3_despues.png` },
  { id: 'caso-03', category: 'carillas', featured: true, beforeImageUrl: `${CASE_IMG}/v1793155003/foto6_antes.png`, afterImageUrl: `${CASE_IMG}/v1793155002/foto6_despues.png` },
  { id: 'caso-04', category: 'diseno-sonrisa', featured: false, beforeImageUrl: `${CASE_IMG}/v1793155005/foto1_antes.png`, afterImageUrl: `${CASE_IMG}/v1793155005/foto1_despues.png` },
  { id: 'caso-05', category: 'carillas', featured: false, beforeImageUrl: `${CASE_IMG}/v1793155003/foto5_antes.png`, afterImageUrl: `${CASE_IMG}/v1793155004/foto5_despues.png` },
  { id: 'caso-07', category: 'rehabilitacion', featured: false, beforeImageUrl: `${CASE_IMG}/v1793155004/foto2_antes.png`, afterImageUrl: `${CASE_IMG}/v1793155004/foto2_despues.png` },
  { id: 'caso-08', category: 'rehabilitacion', featured: false, beforeImageUrl: `${CASE_IMG}/v1793155001/foto9_antes.png`, afterImageUrl: `${CASE_IMG}/v1793155001/foto9_despues.png` },
  { id: 'caso-09', category: 'ortodoncia', featured: false, beforeImageUrl: `${CASE_IMG}/v1793155005/cropped_teeth.png`, afterImageUrl: `${CASE_IMG}/v1793155005/cropped_teeth_after.png` },
];

/**
 * Catálogo de tratamientos y casos de transformación de Odontogamma Oriente.
 * Aquí viven solo los ids y las imágenes (Cloudinary); los textos salen del diccionario del
 * idioma activo (`services.items.<id>` y `cases.items.<id>`), así que las listas se recalculan al cambiar de idioma.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly cloudinaryService = inject(CloudinaryService);
  private readonly i18n = inject(I18nService);

  /** Tratamientos en el idioma activo. */
  public readonly services = computed<ServiceItem[]>(() => {
    const lang = this.i18n.lang();
    return SERVICES_BASE.map(base => {
      const text = this.i18n.obj<ServiceText>(`services.items.${base.id}`);
      return {
        ...text,
        id: base.id,
        slug: serviceSlug(base.id, lang),
        heroImageUrl: base.heroImageUrl,
        galleryImages: base.galleryImages,
        galleryFocus: base.galleryFocus,
        beforeAfter: {
          ...text.beforeAfter,
          beforeImageUrl: base.beforeImageUrl,
          afterImageUrl: base.afterImageUrl
        }
      };
    });
  });

  /** Casos clínicos en el idioma activo. */
  public readonly cases = computed<CaseStudy[]>(() =>
    CASES_BASE.map(base => ({
      ...base,
      ...this.i18n.obj<CaseText>(`cases.items.${base.id}`)
    }))
  );

  // Casos destacados para la Landing Page
  public readonly featuredCases = computed(() => this.cases().filter(c => c.featured));

  /** Ids internos de los tratamientos (para generar las rutas estáticas de cada idioma). */
  public serviceIds(): string[] {
    return SERVICES_BASE.map(s => s.id);
  }

  /** Obtiene un tratamiento por su slug (en cualquiera de los idiomas). */
  getServiceBySlug(slug: string): ServiceItem | undefined {
    const id = serviceIdFromSlug(slug);
    return this.services().find(s => s.id === id);
  }

  /** Filtra los casos por categoría */
  getCasesByCategory(category: string): CaseStudy[] {
    if (!category || category === 'todos') {
      return this.cases();
    }
    return this.cases().filter(c => c.category === category);
  }

  /** Optimiza cualquier URL o identificador de imagen a través del motor de Cloudinary. */
  optimizeImage(publicIdOrUrl: string, preset: 'hero' | 'card' | 'gallery' | 'thumbnail' = 'card'): string {
    return this.cloudinaryService.buildPresetImageUrl(publicIdOrUrl, preset);
  }
}
