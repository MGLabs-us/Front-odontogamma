import { Injectable, signal, computed, inject } from '@angular/core';
import { ServiceItem } from '../models/service-item.model';
import { CaseStudy } from '../models/case-study.model';
import { CloudinaryService } from './cloudinary.service';
import { CLOUDINARY_ASSETS_MANIFEST } from '../constants/cloudinary-assets.manifest';

/**
 * Servicio centralizado para gestionar el catálogo de servicios clínicos,
 * testimonios y casos de transformación de Odontogamma Oriente,
 * totalmente adaptado a Cloudinary para entrega y optimización de medios.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly cloudinaryService = inject(CloudinaryService);
  /**
   * Catálogo de tratamientos con vistas individuales completas
   */
  private readonly servicesData = signal<ServiceItem[]>([
    {
      id: 'carillas-porcelana',
      slug: 'carillas-porcelana',
      title: 'Carillas de Porcelana',
      subtitle: 'Porcelain Veneers & Feldspathic Artistry',
      tagline: 'Mínima invasión biológica, máxima naturalidad',
      shortDescription: 'Láminas ultrafinas de cerámica feldespática modeladas a mano por maestros ceramistas para recrear la translucidez, opalescencia y textura del esmalte dental más puro.',
      detailedDescription: [
        'En Odontogamma Oriente concebimos las carillas de porcelana como piezas de alta relojería. A diferencia de las carillas convencionales o las resinas compuestas, cada carilla se estratifica capa por capa utilizando polvos cerámicos importados que reproducen fielmente los matices tridimensionales de un diente natural.',
        'Nuestro protocolo mínimamente invasivo preserva la mayor cantidad de estructura dental sana, logrando una adhesión micrométrica al esmalte que garantiza una longevidad superior a los 15 años sin manchas ni pérdida de brillo.',
        'Cada tratamiento comienza con un estudio biométrico digital y una prueba estética física (mock-up) para que puedas apreciar y aprobar tu nueva sonrisa antes de realizar cualquier procedimiento definitivo.'
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=2000&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1000&q=80'
      ],
      highlights: [
        'Espesor ultrafino (0.2 a 0.4 mm) sin desgaste agresivo',
        'Estratificación artesanal por ceramistas de clase mundial',
        'Inmunidad total a pigmentaciones de café, vino o tabaco',
        'Biocompatibilidad absoluta con los tejidos gingivales'
      ],
      idealFor: [
        'Dientes desgastados, fracturados o con bordes irregulares',
        'Espacios interdentales (diastemas) y asimetrías de forma',
        'Pigmentaciones profundas resistentes a aclaramiento químico',
        'Pacientes que buscan una sonrisa radiante con acabado 100% natural'
      ],
      beforeAfter: {
        beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762856/foto3_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762857/foto3_despues.png',
        caseTitle: 'Rejuvenecimiento Dental con Carillas Feldespáticas',
        description: 'Paciente con desgaste en bordes incisales y pérdida de longitud dental. Se diseñaron láminas cerámicas con textura microlineal y translucidez incisal personalizada.',
        technique: 'Carillas Cerámicas Feldespáticas',
        focus: 'Restauración de Bordes & Longitud',
        units: 'Carillas Cerámicas Feldespáticas',
        timeframe: 'Restauración de Bordes & Longitud'
      },
      badge: 'Firma de la Clínica'
    },
    {
      id: 'odontologia-cosmetica',
      slug: 'odontologia-cosmetica',
      title: 'Odontología Cosmética',
      subtitle: 'Cosmetic Dentistry & Facial Architecture',
      tagline: 'Armonía estética que realza los rasgos de tu rostro',
      shortDescription: 'Planificación integral que fusiona la arquitectura de los labios, el marco facial y la línea de la sonrisa para lograr un rejuvenecimiento dental sutil y elegante.',
      detailedDescription: [
        'La odontología cosmética de alta gama va más allá de alinear dientes: se enfoca en cómo tu sonrisa interactúa con los ojos, los labios y la gesticulación al hablar y reír.',
        'Analizamos las proporciones áureas de tu rostro mediante fotografía macroscópica de estudio y modelado 3D para diseñar una sonrisa que te reste años y potencie tu seguridad.',
        'Combinamos recontorneo gingival con láser de diodo, microestética del esmalte y diseño digital para esculpir un resultado perfectamente equilibrado.'
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=2000&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80'
      ],
      highlights: [
        'Análisis biométrico facial tridimensional',
        'Gingivoplastia láser sin sangrado ni suturas',
        'Prueba en boca (Mock-up estético) antes de iniciar',
        'Corrección milimétrica del corredor bucal y exposición dental'
      ],
      idealFor: [
        'Sonrisa gingival (exceso de encía al sonreír)',
        'Dientes pequeños en relación al marco de los labios',
        'Asimetrías notorias en la curva de la sonrisa',
        'Personas que buscan un rejuvenecimiento dental integral'
      ],
      beforeAfter: {
        beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762894/foto7_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762895/foto7_despues.png',
        caseTitle: 'Armonización de Sonrisa y Arco Bimaxilar',
        description: 'Corrección de desgaste y aplanamiento de bordes con carillas cerámicas para devolver luminosidad, amplitud y equilibrio al rostro.',
        technique: 'Diseño de Sonrisa Cerámico',
        focus: 'Armonización Facial & Simetría',
        units: 'Diseño de Sonrisa Cerámico',
        timeframe: 'Armonización Facial & Simetría'
      },
      badge: 'Bespoke Design'
    },
    {
      id: 'proceso-transformacion',
      slug: 'proceso-transformacion',
      title: 'Proceso de Transformación de Sonrisa',
      subtitle: 'The Smile Makeover Journey',
      tagline: 'Una experiencia clínica privada, transparente y predecible',
      shortDescription: 'Un recorrido asistido en 4 fases diseñado para garantizar que cada detalle de tu nueva sonrisa se planifique, apruebe y ejecute con la máxima precisión.',
      detailedDescription: [
        'Transformar tu sonrisa en Odontogamma Oriente es un viaje exclusivo donde tú eres el protagonista. Desde la primera consulta de diagnóstico, eliminamos la incertidumbre permitiéndote ver y sentir cómo lucirá tu sonrisa definitiva.',
        'Integramos escaneo intraoral 3D sin pastas invasivas, simulación virtual computarizada y fabricación robotizada combinada con terminado manual de artista.',
        'Nos aseguramos de que no solo obtengas una estética sublime, sino también una mordida funcional, estable y completamente cómoda.'
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=2000&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80'
      ],
      highlights: [
        'Fase 1: Consulta diagnóstica, fotos de estudio y escaneo 3D',
        'Fase 2: Simulación digital y prueba en boca estética (Mock-up)',
        'Fase 3: Confección de élite en laboratorio de vanguardia',
        'Fase 4: Cementación definitiva bajo aislamiento y pulido'
      ],
      idealFor: [
        'Pacientes que desean una transformación dental completa y definitiva',
        'Personas que valoran la predictibilidad y quieren ver el resultado antes de comenzar',
        'Casos complejos con restauraciones previas desadaptadas o desgastadas'
      ],
      beforeAfter: {
        beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762884/foto6_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762885/foto6_despues.png',
        caseTitle: 'Microestética & Nivelación de Bordes Incisales',
        description: 'Carillas de porcelana ultradelgadas con estratificación de esmalte para máxima translucidez y feminidad de la sonrisa.',
        technique: 'Láminas Cerámicas de Precisión',
        focus: 'Nivelación Incisal & Simetría',
        units: 'Láminas Cerámicas de Precisión',
        timeframe: 'Nivelación Incisal & Simetría'
      },
      badge: 'Experiencia Total'
    },
    {
      id: 'aclaramiento-laser',
      slug: 'aclaramiento-laser',
      title: 'Aclaramiento Dental Avanzado',
      subtitle: 'Advanced Laser Teeth Brightening',
      tagline: 'Luminosidad pura y blancura natural sin dolor ni sensibilidad',
      shortDescription: 'Protocolos combinados en clínica y casa con luz fría fotocatalizada que desintegran pigmentos orgánicos profundos respetando la matriz biológica del diente.',
      detailedDescription: [
        'A diferencia de los blanqueamientos agresivos que deshidratan el diente y generan sensibilidad insoportable, nuestro protocolo de aclaramiento avanzado utiliza tecnología de fotocatálisis con agentes remineralizantes.',
        'Logramos devolver la luminosidad juvenil y blancura armónica sin erosionar el esmalte ni alterar la vitalidad pulpar.',
        'Incluimos férulas termoformadas a medida y geles de mantenimiento para prolongar la pureza de tu sonrisa por años.'
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80'
      ],
      highlights: [
        'Tecnología de luz fría con agentes bio-protectores',
        'Cero dolor y máxima protección del esmalte dental',
        'Aclaramiento profundo y luminoso en una sola sesión',
        'Kit exclusivo para mantenimiento y brillo duradero'
      ],
      idealFor: [
        'Dientes oscurecidos por café, té, mate, vino tinto o tabaco',
        'Preparación estética previa a la colocación de carillas',
        'Pacientes con eventos especiales que buscan resultados inmediatos'
      ],
      beforeAfter: {
        beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762828/foto1_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762829/foto1_despues.png',
        caseTitle: 'Alineación Óptica & Laminados Cerámicos',
        description: 'Corrección de apiñamiento leve anterior y elevación de luminosidad mediante carillas cerámicas de preparación mínima.',
        technique: 'Láminas Cerámicas de Contacto',
        focus: 'Alineación Óptica & Salud Gingival',
        units: 'Láminas Cerámicas de Contacto',
        timeframe: 'Alineación Óptica & Salud Gingival'
      }
    }
  ]);

  /**
   * Galería de transformaciones clínicas reales (Antes / Después)
   * Casos clínicos certificados de Odontogamma Oriente alojados en Cloudinary
   */
  private readonly casesData = signal<CaseStudy[]>([
    {
      id: 'caso-01',
      title: 'Rejuvenecimiento Dental & Carillas Cerámicas',
      category: 'carillas',
      categoryLabel: 'Carillas de Porcelana',
      description: 'Restauración anatómica de bordes incisales desgastados. Mediante láminas cerámicas personalizadas, se devolvió la longitud, textura y reflectancia natural para una sonrisa rejuvenecida y armónica.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762856/foto3_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762857/foto3_despues.png',
      details: {
        treatment: 'Carillas de Cerámica Pura',
        focus: 'Restauración Anatómica & Volumen',
        result: 'Textura y Brillo Natural'
      },
      featured: true
    },
    {
      id: 'caso-02',
      title: 'Armonización Facial & Diseño de Sonrisa',
      category: 'diseno-sonrisa',
      categoryLabel: 'Diseño de Sonrisa',
      description: 'Transformación armónica del arco dental devolviendo amplitud a la línea de la sonrisa. El diseño biométrico equilibra las proporciones del rostro con máxima naturalidad.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762894/foto7_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762895/foto7_despues.png',
      details: {
        treatment: 'Diseño de Sonrisa Cerámico',
        focus: 'Armonización Facial & Simetría',
        result: 'Luminosidad y Balance Orgánico'
      },
      featured: true
    },
    {
      id: 'caso-03',
      title: 'Microestética & Nivelación de Bordes Incisales',
      category: 'carillas',
      categoryLabel: 'Carillas Cerámicas',
      description: 'Corrección de microfracturas, asimetría de bordes incisales y tono irregular. Se colocaron láminas ultrafinas que devuelven la continuidad y suavidad a la línea de la sonrisa.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762884/foto6_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762885/foto6_despues.png',
      details: {
        treatment: 'Láminas Cerámicas Ultrafinas',
        focus: 'Nivelación Incisal & Simetría',
        result: 'Contorno Suave y Translucidez'
      },
      featured: false
    },
    {
      id: 'caso-04',
      title: 'Alineación Óptica & Estética de Contacto',
      category: 'diseno-sonrisa',
      categoryLabel: 'Diseño de Sonrisa',
      description: 'Solución estética para leves apiñamientos y discrepancias de ejes axiales sin recurrir a desgastes invasivos, optimizando la reflexión de la luz para una sonrisa uniforme.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762828/foto1_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762829/foto1_despues.png',
      details: {
        treatment: 'Láminas Cerámicas de Contacto',
        focus: 'Alineación Óptica & Ejes',
        result: 'Sonrisa Uniforme y Salud Gingival'
      },
      featured: false
    },
    {
      id: 'caso-05',
      title: 'Cierre de Diastema Central con Lentes Cerámicos',
      category: 'carillas',
      categoryLabel: 'Lentes Cerámicos',
      description: 'Cierre armonioso del espacio interincisal optimizando las proporciones dentales. Se emplearon lentes cerámicos de contacto que preservan la estructura dental intacta.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762873/foto5_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762874/foto5_despues.png',
      details: {
        treatment: 'Lentes Cerámicos Sin Desgaste',
        focus: 'Cierre de Espacio Interdental',
        result: 'Proporción Áurea y Continuidad'
      },
      featured: false
    },
    {
      id: 'caso-06',
      title: 'Implantología Estética & Corona Cerámica Anterior',
      category: 'rehabilitacion',
      categoryLabel: 'Rehabilitación & Implantes',
      description: 'Reemplazo de pieza anterior ausente mediante implante dental y corona cerámica personalizada, logrando una integración de encía natural e imperceptible frente a los dientes contiguos.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762902/foto8_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762907/foto8_despues.png',
      details: {
        treatment: 'Implante & Corona Cerámica Pura',
        focus: 'Perfil de Emergencia y Simetría',
        result: 'Integración Gingival Imperceptible'
      },
      featured: false
    },
    {
      id: 'caso-07',
      title: 'Rehabilitación Fija Anterior Libre de Metal',
      category: 'rehabilitacion',
      categoryLabel: 'Rehabilitación Oral',
      description: 'Sustitución de restauraciones antiguas desajustadas por estructuras cerámicas biomiméticas de alta resistencia, devolviendo función masticatoria, soporte labial y estética.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762839/foto2_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762845/foto2_despues.png',
      details: {
        treatment: 'Cerámica Biomimética Sin Metal',
        focus: 'Sellado Marginal & Biocompatibilidad',
        result: 'Firmeza Funcional y Salud de Encía'
      },
      featured: false
    },
    {
      id: 'caso-08',
      title: 'Reconstrucción de Diente Fracturado',
      category: 'rehabilitacion',
      categoryLabel: 'Rehabilitación Oral',
      description: 'Recuperación anatómica y estructural de diente anterior fracturado mediante restauración cerámica pura, eliminando sombras antiestéticas y devolviendo la anatomía original.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762916/foto9_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762917/foto9_despues.png',
      details: {
        treatment: 'Corona Cerámica Monolítica',
        focus: 'Recuperación Estructural & Función',
        result: 'Mimetismo Óptico y Firmeza'
      },
      featured: false
    },
    {
      id: 'caso-09',
      title: 'Alineación de Apiñamiento & Expansión de Arco',
      category: 'ortodoncia',
      categoryLabel: 'Ortodoncia & Alineación',
      description: 'Corrección de maloclusión y apiñamiento severo devolviendo la amplitud del arco superior, simetría funcional y una estética luminosa y radiante.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762818/cropped_teeth.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762819/cropped_teeth_after.png',
      details: {
        treatment: 'Alineación y Expansión de Arco',
        focus: 'Corrección de Apiñamiento',
        result: 'Oclusión Balanceada y Amplitud'
      },
      featured: false
    },
    {
      id: 'caso-10',
      title: 'Estratificación Cerámica & Biomimética Clínica',
      category: 'carillas',
      categoryLabel: 'Carillas & Biomimética',
      description: 'Acondicionamiento y adhesión cerámica de alta precisión. La estratificación de capas reproduce fielmente la opalescencia y vitalidad de la dentición natural.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762918/foto10_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762920/foto10_despues.png',
      details: {
        treatment: 'Estratificación Cerámica',
        focus: 'Microtextura & Mimetismo',
        result: 'Opalescencia y Vitalidad Visual'
      },
      featured: false
    }
  ]);

  // Readonly signals expuestas a los componentes
  public readonly services = this.servicesData.asReadonly();
  public readonly cases = this.casesData.asReadonly();

  // Casos destacados para la Landing Page
  public readonly featuredCases = computed(() =>
    this.casesData().filter(c => c.featured)
  );

  /**
   * Obtiene un servicio por su slug
   */
  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.servicesData().find(s => s.slug === slug);
  }

  /**
   * Filtra los casos por categoría
   */
  getCasesByCategory(category: string): CaseStudy[] {
    if (!category || category === 'todos') {
      return this.casesData();
    }
    return this.casesData().filter(c => c.category === category);
  }

  /**
   * Obtiene la URL del video cinemático del Hero optimizado para streaming en Cloudinary.
   */
  getHeroVideoUrl(): string {
    return this.cloudinaryService.buildOptimizedVideoUrl(
      CLOUDINARY_ASSETS_MANIFEST.hero.fallbackVideoUrl
    );
  }

  /**
   * Obtiene la URL del póster de respaldo del Hero optimizado en Cloudinary.
   */
  getHeroPosterUrl(): string {
    return this.cloudinaryService.buildOptimizedImageUrl(
      CLOUDINARY_ASSETS_MANIFEST.hero.fallbackPosterUrl,
      { width: 1920, quality: 'auto', format: 'auto' }
    );
  }

  /**
   * Optimiza cualquier URL o identificador de imagen a través del motor de Cloudinary.
   */
  optimizeImage(publicIdOrUrl: string, preset: 'hero' | 'card' | 'gallery' | 'thumbnail' = 'card'): string {
    return this.cloudinaryService.buildPresetImageUrl(publicIdOrUrl, preset);
  }
}
