import { Injectable, signal, computed } from '@angular/core';
import { ServiceItem } from '../models/service-item.model';
import { CaseStudy } from '../models/case-study.model';

/**
 * Servicio centralizado para gestionar el catálogo de servicios clínicos,
 * testimonios y casos de transformación de Odontogamma Oriente.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
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
        beforeImageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80',
        afterImageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
        caseTitle: 'Perfeccionamiento con 10 Carillas Feldespáticas',
        description: 'Paciente con desgaste en bordes incisales y tono opaco. Se diseñaron 10 carillas cerámicas con textura microlineal y translucidez incisal personalizada.',
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
        beforeImageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80',
        afterImageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
        caseTitle: 'Armonización de Sonrisa y Nivelación Gingival',
        description: 'Corrección de márgenes gingivales asimétricos combinada con 8 microcarillas para devolver luminosidad y amplitud a la sonrisa.',
        units: '8 Microcarillas + Láser Gingival',
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
      heroImageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=2000&q=85',
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
        beforeImageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
        afterImageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
        caseTitle: 'Transformación Integral de Arco Superior',
        description: 'Reemplazo de restauraciones antiguas desalineadas por carillas de circonio y cerámica translúcida, restaurando la función masticatoria.',
        units: 'Transformación 12 Unidades',
        timeframe: '4 Semanas'
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
        beforeImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        afterImageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80',
        caseTitle: 'Protocolo de Aclaramiento Fotocatalizado',
        description: 'Paciente con tono dental saturado por consumo de café. Se elevaron 6 tonos con iluminación láser y aplicación de desensibilizante mineral.',
        units: 'Sesión Láser + Kit de Mantenimiento',
        timeframe: '1 Sesión (90 minutos)'
      }
    }
  ]);

  /**
   * Galería de transformaciones clínicas reales (Antes / Después)
   */
  private readonly casesData = signal<CaseStudy[]>([
    {
      id: 'caso-01',
      title: 'Perfeccionamiento de Sonrisa & Proporciones Áureas',
      category: 'carillas',
      categoryLabel: 'Carillas Cerámicas',
      description: 'Paciente femenina con desgaste incisal y asimetría dental. Se colocaron 10 carillas cerámicas ultrafinas en tono natural, devolviendo volumen y luminosidad.',
      beforeImageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1000&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
      details: {
        units: '10 Carillas Feldespáticas',
        shade: 'BL2 Soft Natural',
        timeframe: '2 Sesiones Clínicas'
      },
      featured: true
    },
    {
      id: 'caso-02',
      title: 'Cierre de Diastemas y Armonización del Perfil',
      category: 'diseno-sonrisa',
      categoryLabel: 'Diseño de Sonrisa',
      description: 'Corrección de espaciamiento anterior y recontorneo gingival con láser para lograr proporciones ideales sin desgastar la estructura dental.',
      beforeImageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
      details: {
        units: '8 Carillas E-max & Gingivoplastia',
        shade: 'OM2 Translucent',
        timeframe: '3 Semanas'
      },
      featured: true
    },
    {
      id: 'caso-03',
      title: 'Rehabilitación Integral de Desgaste Severo',
      category: 'rehabilitacion',
      categoryLabel: 'Rehabilitación Oral',
      description: 'Recuperación de la dimensión vertical en paciente con bruxismo crónico severo mediante coronas y microcarillas de circonio estratificado.',
      beforeImageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80',
      details: {
        units: 'Rehabilitación 20 Unidades',
        shade: 'A1 Enamel Effect',
        timeframe: '5 Semanas'
      },
      featured: false
    },
    {
      id: 'caso-04',
      title: 'Aclaramiento y Microcarillas Estéticas',
      category: 'aclaramiento',
      categoryLabel: 'Aclaramiento Dental',
      description: 'Protocolo de aclaramiento profundo combinado con 4 carillas de contacto para corregir un incisivo con discromía por trauma antiguo.',
      beforeImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80',
      details: {
        units: 'Protocolo Láser + 4 Carillas',
        shade: 'BL1 Ultra Lumens',
        timeframe: '10 Días'
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
}
