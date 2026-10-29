import { Injectable, signal, computed, inject } from '@angular/core';
import { ServiceItem } from '../models/service-item.model';
import { CaseStudy } from '../models/case-study.model';
import { CloudinaryService } from './cloudinary.service';
import { CLOUDINARY_ASSETS_MANIFEST } from '../constants/cloudinary-assets.manifest';

const IMG = CLOUDINARY_ASSETS_MANIFEST.images;

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
      title: 'Carillas de porcelana',
      subtitle: 'Porcelain veneers & feldspathic artistry',
      tagline: 'Mínima invasión biológica, máxima naturalidad',
      shortDescription: 'Láminas ultrafinas de cerámica feldespática modeladas a mano por maestros ceramistas para recrear la translucidez, opalescencia y textura del esmalte dental más puro.',
      detailedDescription: [
        'En Odontogamma Oriente concebimos las carillas de porcelana como piezas de alta relojería. A diferencia de las carillas convencionales o las resinas compuestas, cada carilla se estratifica capa por capa utilizando polvos cerámicos importados que reproducen fielmente los matices tridimensionales de un diente natural.',
        'Nuestro protocolo mínimamente invasivo preserva la mayor cantidad de estructura dental sana, logrando una adhesión micrométrica al esmalte que garantiza una longevidad superior a los 15 años sin manchas ni pérdida de brillo.',
        'Cada tratamiento comienza con un estudio biométrico digital y una prueba estética física (mock-up) para que puedas apreciar y aprobar tu nueva sonrisa antes de realizar cualquier procedimiento definitivo.'
      ],
      heroImageUrl: IMG.smiles.veneers,
      galleryImages: [
        IMG.smiles.natural,
        IMG.lab.modelsGreen,
        IMG.smiles.side
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
        beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155004/foto3_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155003/foto3_despues.png',
        caseTitle: 'Rejuvenecimiento Dental con Carillas Feldespáticas',
        description: 'Paciente con desgaste en bordes incisales y pérdida de longitud dental. Se diseñaron láminas cerámicas con textura microlineal y translucidez incisal personalizada.',
        technique: 'Carillas Cerámicas Feldespáticas',
        focus: 'Restauración de bordes & longitud',
        units: 'Carillas Cerámicas Feldespáticas',
        timeframe: 'Restauración de Bordes & Longitud'
      },
      badge: 'Firma de la clínica'
    },
    {
      id: 'odontologia-cosmetica',
      slug: 'odontologia-cosmetica',
      title: 'Odontología cosmética',
      subtitle: 'Cosmetic dentistry & facial architecture',
      tagline: 'Armonía estética que realza los rasgos de tu rostro',
      shortDescription: 'Planificación integral que fusiona la arquitectura de los labios, el marco facial y la línea de la sonrisa para lograr un rejuvenecimiento dental sutil y elegante.',
      detailedDescription: [
        'La odontología cosmética de alta gama va más allá de alinear dientes: se enfoca en cómo tu sonrisa interactúa con los ojos, los labios y la gesticulación al hablar y reír.',
        'Analizamos las proporciones áureas de tu rostro mediante fotografía macroscópica de estudio y modelado 3D para diseñar una sonrisa que te reste años y potencie tu seguridad.',
        'Combinamos recontorneo gingival con láser de diodo, microestética del esmalte y diseño digital para esculpir un resultado perfectamente equilibrado.'
      ],
      heroImageUrl: IMG.smiles.macro,
      galleryImages: [
        IMG.patients.furCoat,
        IMG.patients.closeUp,
        IMG.patients.blackBackdrop
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
        beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155002/foto7_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155002/foto7_despues.png',
        caseTitle: 'Armonización de Sonrisa y Arco Bimaxilar',
        description: 'Corrección de desgaste y aplanamiento de bordes con carillas cerámicas para devolver luminosidad, amplitud y equilibrio al rostro.',
        technique: 'Diseño de Sonrisa Cerámico',
        focus: 'Armonización facial & simetría',
        units: 'Diseño de Sonrisa Cerámico',
        timeframe: 'Armonización Facial & Simetría'
      },
      badge: 'Bespoke design'
    },
    {
      id: 'proceso-transformacion',
      slug: 'proceso-transformacion',
      title: 'Proceso de transformación de sonrisa',
      subtitle: 'The smile makeover journey',
      tagline: 'Una experiencia clínica privada, transparente y predecible',
      shortDescription: 'Un recorrido asistido en 4 fases diseñado para garantizar que cada detalle de tu nueva sonrisa se planifique, apruebe y ejecute con la máxima precisión.',
      detailedDescription: [
        'Transformar tu sonrisa en Odontogamma Oriente es un viaje exclusivo donde tú eres el protagonista. Desde la primera consulta de diagnóstico, eliminamos la incertidumbre permitiéndote ver y sentir cómo lucirá tu sonrisa definitiva.',
        'Integramos escaneo intraoral 3D sin pastas invasivas, simulación virtual computarizada y fabricación robotizada combinada con terminado manual de artista.',
        'Nos aseguramos de que no solo obtengas una estética sublime, sino también una mordida funcional, estable y completamente cómoda.'
      ],
      heroImageUrl: IMG.clinic.consultPanoramic,
      galleryImages: [
        IMG.lab.instruments,
        IMG.patients.treatmentCollage,
        IMG.lab.dentures
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
        beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155003/foto6_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155002/foto6_despues.png',
        caseTitle: 'Microestética & Nivelación de Bordes Incisales',
        description: 'Carillas de porcelana ultradelgadas con estratificación de esmalte para máxima translucidez y feminidad de la sonrisa.',
        technique: 'Láminas Cerámicas de Precisión',
        focus: 'Nivelación incisal & simetría',
        units: 'Láminas Cerámicas de Precisión',
        timeframe: 'Nivelación Incisal & Simetría'
      },
      badge: 'Experiencia total'
    },
    {
      id: 'aclaramiento-laser',
      slug: 'aclaramiento-laser',
      title: 'Aclaramiento dental avanzado',
      subtitle: 'Advanced laser teeth brightening',
      tagline: 'Luminosidad pura y blancura natural sin dolor ni sensibilidad',
      shortDescription: 'Protocolos combinados en clínica y casa con luz fría fotocatalizada que desintegran pigmentos orgánicos profundos respetando la matriz biológica del diente.',
      detailedDescription: [
        'A diferencia de los blanqueamientos agresivos que deshidratan el diente y generan sensibilidad insoportable, nuestro protocolo de aclaramiento avanzado utiliza tecnología de fotocatálisis con agentes remineralizantes.',
        'Logramos devolver la luminosidad juvenil y blancura armónica sin erosionar el esmalte ni alterar la vitalidad pulpar.',
        'Incluimos férulas termoformadas a medida y geles de mantenimiento para prolongar la pureza de tu sonrisa por años.'
      ],
      heroImageUrl: IMG.campaigns.whitening,
      galleryImages: [
        IMG.campaigns.whiteningLaser,
        IMG.smiles.profile,
        IMG.patients.blackBackdropCollage
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
        beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155005/foto1_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155005/foto1_despues.png',
        caseTitle: 'Alineación Óptica & Laminados Cerámicos',
        description: 'Corrección de apiñamiento leve anterior y elevación de luminosidad mediante carillas cerámicas de preparación mínima.',
        technique: 'Láminas Cerámicas de Contacto',
        focus: 'Alineación óptica & salud gingival',
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
      title: 'Rejuvenecimiento dental & carillas cerámicas',
      category: 'carillas',
      categoryLabel: 'Carillas de porcelana',
      description: 'Restauración anatómica de bordes incisales desgastados. Mediante láminas cerámicas personalizadas, se devolvió la longitud, textura y reflectancia natural para una sonrisa rejuvenecida y armónica.',
      beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155004/foto3_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155003/foto3_despues.png',
      details: {
        treatment: 'Carillas de cerámica pura',
        focus: 'Restauración anatómica & volumen',
        result: 'Textura y Brillo Natural'
      },
      featured: true
    },
    {
      id: 'caso-02',
      title: 'Armonización facial & diseño de sonrisa',
      category: 'diseno-sonrisa',
      categoryLabel: 'Diseño de sonrisa',
      description: 'Transformación armónica del arco dental devolviendo amplitud a la línea de la sonrisa. El diseño biométrico equilibra las proporciones del rostro con máxima naturalidad.',
      beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155002/foto7_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155002/foto7_despues.png',
      details: {
        treatment: 'Diseño de sonrisa cerámico',
        focus: 'Armonización facial & simetría',
        result: 'Luminosidad y Balance Orgánico'
      },
      featured: true
    },
    {
      id: 'caso-03',
      title: 'Microestética & nivelación de bordes incisales',
      category: 'carillas',
      categoryLabel: 'Carillas cerámicas',
      description: 'Corrección de microfracturas, asimetría de bordes incisales y tono irregular. Se colocaron láminas ultrafinas que devuelven la continuidad y suavidad a la línea de la sonrisa.',
      beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155003/foto6_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155002/foto6_despues.png',
      details: {
        treatment: 'Láminas cerámicas ultrafinas',
        focus: 'Nivelación incisal & simetría',
        result: 'Contorno Suave y Translucidez'
      },
      featured: false
    },
    {
      id: 'caso-04',
      title: 'Alineación óptica & estética de contacto',
      category: 'diseno-sonrisa',
      categoryLabel: 'Diseño de sonrisa',
      description: 'Solución estética para leves apiñamientos y discrepancias de ejes axiales sin recurrir a desgastes invasivos, optimizando la reflexión de la luz para una sonrisa uniforme.',
      beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155005/foto1_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155005/foto1_despues.png',
      details: {
        treatment: 'Láminas cerámicas de contacto',
        focus: 'Alineación óptica & ejes',
        result: 'Sonrisa Uniforme y Salud Gingival'
      },
      featured: false
    },
    {
      id: 'caso-05',
      title: 'Cierre de diastema central con lentes cerámicos',
      category: 'carillas',
      categoryLabel: 'Lentes cerámicos',
      description: 'Cierre armonioso del espacio interincisal optimizando las proporciones dentales. Se emplearon lentes cerámicos de contacto que preservan la estructura dental intacta.',
      beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155003/foto5_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155004/foto5_despues.png',
      details: {
        treatment: 'Lentes cerámicos sin desgaste',
        focus: 'Cierre de espacio interdental',
        result: 'Proporción Áurea y Continuidad'
      },
      featured: false
    },
    {
      id: 'caso-06',
      title: 'Implantología estética & corona cerámica anterior',
      category: 'rehabilitacion',
      categoryLabel: 'Rehabilitación & implantes',
      description: 'Reemplazo de pieza anterior ausente mediante implante dental y corona cerámica personalizada, logrando una integración de encía natural e imperceptible frente a los dientes contiguos.',
      beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155002/foto8_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155001/foto8_despues.png',
      details: {
        treatment: 'Implante & corona cerámica pura',
        focus: 'Perfil de emergencia y simetría',
        result: 'Integración Gingival Imperceptible'
      },
      featured: false
    },
    {
      id: 'caso-07',
      title: 'Rehabilitación fija anterior libre de metal',
      category: 'rehabilitacion',
      categoryLabel: 'Rehabilitación oral',
      description: 'Sustitución de restauraciones antiguas desajustadas por estructuras cerámicas biomiméticas de alta resistencia, devolviendo función masticatoria, soporte labial y estética.',
      beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155004/foto2_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155004/foto2_despues.png',
      details: {
        treatment: 'Cerámica biomimética sin metal',
        focus: 'Sellado marginal & biocompatibilidad',
        result: 'Firmeza Funcional y Salud de Encía'
      },
      featured: false
    },
    {
      id: 'caso-08',
      title: 'Reconstrucción de diente fracturado',
      category: 'rehabilitacion',
      categoryLabel: 'Rehabilitación oral',
      description: 'Recuperación anatómica y estructural de diente anterior fracturado mediante restauración cerámica pura, eliminando sombras antiestéticas y devolviendo la anatomía original.',
      beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155001/foto9_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155001/foto9_despues.png',
      details: {
        treatment: 'Corona cerámica monolítica',
        focus: 'Recuperación estructural & función',
        result: 'Mimetismo Óptico y Firmeza'
      },
      featured: false
    },
    {
      id: 'caso-09',
      title: 'Alineación de apiñamiento & expansión de arco',
      category: 'ortodoncia',
      categoryLabel: 'Ortodoncia & alineación',
      description: 'Corrección de maloclusión y apiñamiento severo devolviendo la amplitud del arco superior, simetría funcional y una estética luminosa y radiante.',
      beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155005/cropped_teeth.png',
      afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155005/cropped_teeth_after.png',
      details: {
        treatment: 'Alineación y expansión de arco',
        focus: 'Corrección de apiñamiento',
        result: 'Oclusión Balanceada y Amplitud'
      },
      featured: false
    },
    {
      id: 'caso-10',
      title: 'Estratificación cerámica & biomimética clínica',
      category: 'carillas',
      categoryLabel: 'Carillas & biomimética',
      description: 'Acondicionamiento y adhesión cerámica de alta precisión. La estratificación de capas reproduce fielmente la opalescencia y vitalidad de la dentición natural.',
      beforeImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155001/foto10_antes.png',
      afterImageUrl: 'https://res.cloudinary.com/u81t66ol/image/upload/v1793155000/foto10_despues.png',
      details: {
        treatment: 'Estratificación cerámica',
        focus: 'Microtextura & mimetismo',
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
   * Optimiza cualquier URL o identificador de imagen a través del motor de Cloudinary.
   */
  optimizeImage(publicIdOrUrl: string, preset: 'hero' | 'card' | 'gallery' | 'thumbnail' = 'card'): string {
    return this.cloudinaryService.buildPresetImageUrl(publicIdOrUrl, preset);
  }
}
