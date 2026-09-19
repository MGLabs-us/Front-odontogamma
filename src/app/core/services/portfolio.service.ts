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
        caseTitle: 'Rejuvenecimiento con 10 Carillas Feldespáticas',
        description: 'Paciente con desgaste en bordes incisales y pérdida de longitud dental. Se diseñaron 10 carillas cerámicas con textura microlineal y translucidez incisal personalizada.',
        units: '10 Carillas Feldespáticas',
        timeframe: '2 Sesiones Clínicas'
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
        description: 'Corrección de desgaste por bruxismo y aplanamiento de bordes con 16 carillas cerámicas para devolver luminosidad, amplitud y equilibrio al rostro.',
        units: '16 Carillas Cerámicas E-max',
        timeframe: '3 Semanas'
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
      heroImageUrl: 'https://images.cloudinary.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=2000&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80'
      ],
      highlights: [
        'Fase 1: Consulta diagnóstica, fotografías de alta gama y escaneo 3D',
        'Fase 2: Simulación digital y prueba en boca en resina estética (Mock-up)',
        'Fase 3: Preparación microscópica y confección en laboratorio de élite',
        'Fase 4: Cementación definitiva bajo aislamiento absoluto y pulido'
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
        units: '8 Carillas Ultrafinas (0.3 mm)',
        timeframe: '2 Sesiones'
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
        'Logramos aclarar entre 4 y 8 tonos en la escala cromática dental, devolviendo la luminosidad juvenil sin erosionar el esmalte.',
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
        'Cero sensibilidad dental post-tratamiento',
        'Elevación de hasta 8 tonos en una sola sesión clínica',
        'Kit premium para mantenimiento en el hogar'
      ],
      idealFor: [
        'Dientes oscurecidos por café, té, mate, vino tinto o tabaco',
        'Preparación estética previa a la colocación de carillas',
        'Pacientes con eventos especiales (bodas, compromisos) que buscan resultados rápidos'
      ],
      beforeAfter: {
        beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762828/foto1_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762829/foto1_despues.png',
        caseTitle: 'Alineación Óptica & Laminados Cerámicos',
        description: 'Corrección de apiñamiento leve anterior y elevación de luminosidad mediante carillas cerámicas de preparación mínima.',
        units: '8 Carillas de Contacto',
        timeframe: '2 Semanas'
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
      title: 'Rejuvenecimiento Dental & Carillas Feldespáticas',
      category: 'carillas',
      categoryLabel: 'Carillas de Porcelana',
      description: 'Paciente con atrición dental severa, pérdida de longitud del tercio incisal y dentina expuesta. Se diseñaron 10 carillas cerámicas personalizadas devolviendo volumen anatómico, reflectancia y luminosidad natural.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762856/foto3_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762857/foto3_despues.png',
      details: {
        units: '10 Carillas Feldespáticas',
        shade: 'BL2 Soft Natural',
        timeframe: '2 Sesiones Clínicas'
      },
      featured: true
    },
    {
      id: 'caso-02',
      title: 'Armonización de Arco Bimaxilar & Diseño de Sonrisa',
      category: 'diseno-sonrisa',
      categoryLabel: 'Diseño de Sonrisa',
      description: 'Tratamiento de desgaste generalizado por bruxismo y pérdida de curvatura de la sonrisa. Se realizó un diseño de sonrisa biométrico con carillas cerámicas superiores e inferiores logrando una estética radiante y equilibrada.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762894/foto7_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762895/foto7_despues.png',
      details: {
        units: '16 Carillas Cerámicas E-max',
        shade: 'BL1 Ultra Luminescence',
        timeframe: '3 Semanas'
      },
      featured: true
    },
    {
      id: 'caso-03',
      title: 'Microestética & Nivelación de Bordes Incisales',
      category: 'carillas',
      categoryLabel: 'Carillas Cerámicas',
      description: 'Corrección de microfracturas, asimetría de bordes incisales y tono dental irregular. Se colocaron carillas ultrafinas de alta translucidez respetando la anatomía orgánica y la feminidad de la sonrisa.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762884/foto6_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762885/foto6_despues.png',
      details: {
        units: '8 Carillas Ultrafinas (0.3 mm)',
        shade: 'OM2 Translucent',
        timeframe: '2 Sesiones'
      },
      featured: true
    },
    {
      id: 'caso-04',
      title: 'Alineación Óptica & Corrección de Apiñamiento Anterior',
      category: 'diseno-sonrisa',
      categoryLabel: 'Diseño de Sonrisa',
      description: 'Resolución de apiñamiento leve anterior y discrepancia de ejes axiales mediante carillas cerámicas de preparación mínima, redefiniendo el plano de oclusión de forma armónica.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762828/foto1_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762829/foto1_despues.png',
      details: {
        units: '8 Carillas Cerámicas de Contacto',
        shade: 'BL2 Soft White',
        timeframe: '2 Semanas'
      },
      featured: true
    },
    {
      id: 'caso-05',
      title: 'Cierre de Diastema Central con Lentes Cerámicos',
      category: 'carillas',
      categoryLabel: 'Lentes Cerámicos',
      description: 'Cierre estético de espacio interincisal (diastema) y optimización de proporciones áureas mediante lentes cerámicos de contacto ultrafinos sin desgaste del esmalte dental.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762873/foto5_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762874/foto5_despues.png',
      details: {
        units: '4 Lentes Cerámicos Sin Desgaste',
        shade: 'A1 Natural Bright',
        timeframe: '10 Días'
      },
      featured: false
    },
    {
      id: 'caso-06',
      title: 'Implantología Estética & Corona de Circonio Anterior',
      category: 'rehabilitacion',
      categoryLabel: 'Rehabilitación & Implantes',
      description: 'Reemplazo de incisivo central ausente mediante implante osteointegrado y corona cerámica personalizada sobre pilar estético, logrando perfecta simetría gingival e indistinguible del diente contralateral.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762902/foto8_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762907/foto8_despues.png',
      details: {
        units: '1 Implante Inmediato + Corona Circonio',
        shade: 'Colorimetría 3D Individual',
        timeframe: 'Fase Guiada'
      },
      featured: false
    },
    {
      id: 'caso-07',
      title: 'Rehabilitación Fija Anterior & Prótesis Cerámica',
      category: 'rehabilitacion',
      categoryLabel: 'Rehabilitación Oral',
      description: 'Rehabilitación estética y funcional de sector anterior edéntulo mediante estructura fija de alta resistencia libre de metal, restaurando de inmediato fonación, soporte labial y seguridad masticatoria.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762839/foto2_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762845/foto2_despues.png',
      details: {
        units: 'Estructura Cerámica de Alta Resistencia',
        shade: 'BL3 Natural Tone',
        timeframe: '3 Semanas'
      },
      featured: false
    },
    {
      id: 'caso-08',
      title: 'Reconstrucción de Diente Fracturado & Corona Libre de Metal',
      category: 'rehabilitacion',
      categoryLabel: 'Rehabilitación Oral',
      description: 'Sustitución de muñón y diente fracturado con poste de fibra de vidrio y corona estética de porcelana pura, eliminando sombras oscuras en la encía y devolviendo la anatomía original.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762916/foto9_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762917/foto9_despues.png',
      details: {
        units: 'Poste Anatómico + Corona Cerámica',
        shade: 'A2 Translucent Match',
        timeframe: '2 Sesiones'
      },
      featured: false
    },
    {
      id: 'caso-09',
      title: 'Alineación de Apiñamiento Severo & Expansión de Arco',
      category: 'ortodoncia',
      categoryLabel: 'Ortodoncia & Alineación',
      description: 'Corrección de maloclusión y apiñamiento severo con discrepancia anterior. Se logró la nivelación completa del arco dental superior, simetría funcional y una estética luminosa y radiante.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762818/cropped_teeth.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762819/cropped_teeth_after.png',
      details: {
        units: 'Alineación de Arco Completo',
        shade: 'Esmalte Natural',
        timeframe: 'Tratamiento Integral'
      },
      featured: false
    },
    {
      id: 'caso-10',
      title: 'Estratificación Cerámica & Biomimética Clínica',
      category: 'carillas',
      categoryLabel: 'Carillas & Biomimética',
      description: 'Documentación intraoral de alta precisión clínica. Manejo y acondicionamiento biológico tisular para la adhesión de carillas cerámicas con sellado marginal microscópico.',
      beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762918/foto10_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762920/foto10_despues.png',
      details: {
        units: 'Laminados Cerámicos Directos',
        shade: 'BL2 / Traslúcido',
        timeframe: 'Fase de Precisión'
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
