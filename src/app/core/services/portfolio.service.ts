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
      id: 'implantologia-oral',
      slug: 'implantologia-oral',
      title: 'Implantología Oral',
      subtitle: 'Oral Implantology & Osseointegration',
      badge: 'Raíz Artificial & Rehabilitación Fija',
      tagline: '¿Te falta uno o varios dientes? Recupera tu sonrisa y función con una rehabilitación sobre implantes, planificada de acuerdo con tus necesidades.',
      shortDescription: 'Tratamiento de vanguardia para reemplazar uno o varios dientes perdidos mediante un implante dental de titanio o zirconia que funciona como raíz artificial, sobre el cual se coloca una restauración fija de máxima precisión anatómica.',
      detailedDescription: [
        'La implantología oral es el tratamiento odontológico de elección para reemplazar uno o varios dientes perdidos de manera definitiva. Un implante dental funciona como una raíz artificial anclada al hueso maxilar mediante osteointegración biológica, sobre la cual se instala posteriormente una corona o restauración fija personalizada de alta estética.',
        'Materiales Principales: El implante dental se fabrica en titanio de grado médico de máxima pureza o en zirconia biocompatible. La conexión se realiza a través de un pilar (abutment) de titanio o zirconia, y la corona sobre implante se confecciona en Zirconia monolítica, Zirconia estratificada con cerámica feldespática, Disilicato de litio o Metal-cerámica, según la exigencia oclusal y estética de cada paciente.',
        'En Odontogamma Oriente planificamos cada procedimiento mediante tomografía volumétrica y escaneo digital 3D. Esto asegura una colocación milimétrica que no requiere desgastar los dientes vecinos, como ocurre en los puentes convencionales, preservando íntegra la estructura dental biológica remanente.'
      ],
      materials: [
        'Implante Dental: Titanio grado médico de alta pureza u opciones biocompatibles de zirconia.',
        'Pilar o Abutment: Conexión protésica personalizada maquinada en titanio o zirconia según la zona estética.',
        'Corona sobre Implante: Zirconia monolítica, Zirconia estratificada, Disilicato de litio o Metal-cerámica.'
      ],
      materialGroups: [
        {
          category: 'Implante Dental',
          items: ['Titanio grado médico de alta biocompatibilidad', 'Implantes cerámicos de Zirconia biocompatible']
        },
        {
          category: 'Pilar / Abutment',
          items: ['Pilar personalizado en Titanio', 'Pilar estético en Zirconia']
        },
        {
          category: 'Corona sobre Implante',
          items: ['Zirconia monolítica de máxima resistencia', 'Zirconia estratificada de alta estética', 'Disilicato de litio para mimetismo óptico', 'Metal-cerámica según indicación oclusal']
        }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=2000&q=85',
      galleryImages: [
        'https://res.cloudinary.com/ffvpll33/image/upload/v1790029060/648985706_17911045683163425_7279892063267287894_n.jpg',
        'https://res.cloudinary.com/ffvpll33/image/upload/v1789757935/483860361_18025060961656101_7267703078192937477_n.jpg',
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80'
      ],
      highlights: [
        'Recuperación total de la función masticatoria con fuerza y confort natural',
        'Apariencia y reflectancia óptica idéntica a un diente biológico',
        'Restauración fija, permanente y de máxima estabilidad ósea',
        'No requiere desgastar los dientes vecinos como en puentes convencionales'
      ],
      idealFor: [
        'Pérdida de un solo diente (reemplazo unitario con corona estética)',
        'Pérdida de varios dientes (rehabilitaciones parciales fijas)',
        'Pacientes con pérdida completa de dientes que requieren soporte sobre implantes',
        'Pacientes que desean frenar la reabsorción ósea y recuperar la estabilidad masticatoria'
      ],
      beforeAfter: {
        beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762818/cropped_teeth.png',
        afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762819/cropped_teeth_after.png',
        caseTitle: 'Reemplazo Dental & Rehabilitación Fija sobre Implante',
        description: 'Reposición de pieza dental ausente mediante implante osteointegrado y corona cerámica de ultra precisión, devolviendo la estética gingival y la función masticatoria.',
        technique: 'Implantología Digital Guiada',
        focus: 'Osteointegración & Estética Gingival'
      }
    },
    {
      id: 'coronas-porcelana',
      slug: 'coronas-porcelana',
      title: 'Coronas de Porcelana',
      subtitle: 'All-Ceramic & Zirconia Restorations',
      badge: 'Restauración Anatómica & Alta Resistencia',
      tagline: 'Devuelve a tus dientes su forma, función y estética con coronas personalizadas en materiales cerámicos de alta calidad.',
      shortDescription: 'Restauraciones personalizadas que recubren integralmente un diente para recuperar su forma anatómica, resistencia estructural, función oclusal y estética de máxima luminosidad.',
      detailedDescription: [
        'Las coronas dentales son restauraciones personalizadas de cobertura total diseñadas para recubrir un diente dañado o debilitado, devolviéndole de manera integral su forma anatómica, resistencia mecánica, función masticatoria y belleza estética.',
        'Materiales de Alta Ingeniería: En Odontogamma Oriente seleccionamos el material según el caso clínico específico. Empleamos Zirconia (alta tenacidad y resistencia mecánica, excelente opción para dientes posteriores y casos anteriores seleccionados, en versiones monolíticas o estratificadas), Disilicato de Litio (extraordinaria estética y translucidez natural, óptimo en rehabilitaciones anteriores) y Cerámica sobre estructura (combinando una base interna reforzada con cerámica feldespática de recubrimiento para detalles ópticos únicos).',
        'Cada corona se diseña y fresa con tecnología digital CAD/CAM de ultra precisión, garantizando un sellado marginal hermético que protege el tejido dental vivo y una integración biológica perfecta con la encía sin sombras artificiales.'
      ],
      materials: [
        'Zirconia: Alta resistencia mecánica, excelente opción para dientes posteriores y casos anteriores (monolítica o estratificada).',
        'Disilicato de Litio: Excelente estética y translucidez natural, muy utilizado en rehabilitaciones anteriores y casos posteriores seleccionados.',
        'Cerámica sobre Estructura: Combina una estructura interna de soporte con cerámica de recubrimiento para características funcionales y estéticas específicas.'
      ],
      materialGroups: [
        {
          category: 'Zirconia de Alta Resistencia',
          items: ['Zirconia monolítica para máxima durabilidad en molares', 'Zirconia estratificada para alta exigencia estética anterior']
        },
        {
          category: 'Disilicato de Litio',
          items: ['Translucidez y opalescencia idéntica al esmalte dental', 'Óptima para sector anterior y rehabilitaciones cosméticas']
        },
        {
          category: 'Cerámica sobre Estructura',
          items: ['Estructura interna reforzada para soporte oclusal', 'Estratificación cerámica para gradientes cromáticos naturales']
        }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=2000&q=85',
      galleryImages: [
        'https://res.cloudinary.com/ffvpll33/image/upload/v1790029060/648985706_17911045683163425_7279892063267287894_n.jpg',
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80'
      ],
      highlights: [
        'Recuperación total de la forma anatómica, resistencia estructural y masticatoria',
        'Materiales cerámicos de vanguardia: Zirconia, Disilicato de litio y cerámica estratificada',
        'Sellado marginal milimétrico que previene filtraciones y protege el diente',
        'Acabado translúcido que se mimetiza con la dentición natural adyacente'
      ],
      idealFor: [
        'Dientes fracturados o con compromiso estructural severo',
        'Dientes muy desgastados por bruxismo, atrición o erosión',
        'Dientes con grandes restauraciones previas desajustadas o tras endodoncia',
        'Cambios importantes de forma, eje o proporción dental',
        'Rehabilitaciones estéticas y funcionales complejas',
        'Restauraciones definitivas sobre implantes dentales'
      ],
      beforeAfter: {
        beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762856/foto3_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762857/foto3_despues.png',
        caseTitle: 'Restauración Integral con Coronas de Cerámica Pura',
        description: 'Reconstrucción anatómica de dientes desgastados mediante coronas en disilicato de litio, devolviendo la altura oclusal y la reflectancia natural.',
        technique: 'Disilicato de Litio CAD/CAM',
        focus: 'Resistencia & Textura Biológica'
      }
    },
    {
      id: 'protesis-hibrida-implantes',
      slug: 'protesis-hibrida-implantes',
      title: 'Prótesis Híbrida sobre Implantes',
      subtitle: 'Full-Arch Fixed Implant Rehabilitation',
      badge: 'Rehabilitación Fija de Arcada Completa',
      tagline: 'Vuelve a sonreír, hablar y comer con mayor seguridad. Las prótesis híbridas sobre implantes permiten rehabilitar una arcada completa mediante una solución fija sobre implantes.',
      shortDescription: 'Rehabilitación dental fija de arcada completa anclada rígidamente a múltiples implantes, diseñada para devolver la estabilidad total, soporte facial y función masticatoria a personas con pérdida total de dientes.',
      detailedDescription: [
        'La prótesis híbrida sobre implantes es uno de los servicios más importantes y transformadores para pacientes con pérdida total de dientes en una o ambas arcadas, o con piezas terminales sin pronóstico favorable. Se trata de una rehabilitación fija sostenida sobre múltiples implantes que reemplaza una arcada completa con máxima solidez.',
        'A diferencia radical de las prótesis removibles convencionales (que suelen moverse, desajustarse y causar inseguridad al comer o hablar), la prótesis híbrida queda firmemente atornillada a los implantes dentales, ofreciendo una sensación de estabilidad idéntica a la dentición propia.',
        'Materiales y Bioingeniería: Dependiendo del diseño clínico, se fabrica mediante una estructura interna pasiva de titanio maquinada por CAD/CAM, dientes protésicos de resina o acrílico de alta resistencia al impacto, resinas de laboratorio nanohíbridas o alternativas completas en zirconia de alta gama con caracterización gingival tridimensional para restaurar la plenitud labial y facial.'
      ],
      materials: [
        'Estructura de Titanio: Barra fresada por CAD/CAM para ajuste pasivo absoluto sobre los implantes.',
        'Dientes Protésicos de Alta Resistencia: Resinas y acrílicos de última generación diseñados para absorber fuerzas masticatorias.',
        'Resinas de Laboratorio Nanohíbridas: Caracterización estética y gingival de ultra naturalidad.',
        'Estructuras CAD/CAM y Alternativas en Zirconia: Opciones cerámicas de máxima longevidad según el caso.'
      ],
      materialGroups: [
        {
          category: 'Estructura Primaria',
          items: ['Barra de Titanio grado médico maquinada por CAD/CAM', 'Estructuras cerámicas de Zirconia reforzada']
        },
        {
          category: 'Dientes Protésicos & Resinas',
          items: ['Dientes de resina/acrílico de alta resistencia al impacto', 'Resinas de laboratorio de alta tenacidad y estética']
        },
        {
          category: 'Acabado y Fijación',
          items: ['Fijación atornillada pasiva sobre múltiples implantes', 'Mimetismo gingival biológico en tono y volumen']
        }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=2000&q=85',
      galleryImages: [
        'https://res.cloudinary.com/ffvpll33/image/upload/v1789757984/485992449_646326938135326_7644290108229838413_n.jpg',
        'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1000&q=80',
        'https://res.cloudinary.com/ffvpll33/image/upload/v1789757935/483860361_18025060961656101_7267703078192937477_n.jpg'
      ],
      highlights: [
        'Mayor estabilidad y firmeza absoluta que cualquier prótesis removible convencional',
        'Mejora radical de la función masticatoria: vuelve a comer lo que quieras sin dolor ni desajustes',
        'Recuperación inmediata del soporte labial y facial, rejuveneciendo la expresión del rostro',
        'Rehabilitación integral fija de la arcada: seguridad total para sonreír, hablar y socializar'
      ],
      idealFor: [
        'Personas que han perdido todos los dientes de una arcada (superior o inferior)',
        'Pacientes que tienen dientes con pronóstico clínico no favorable',
        'Personas que utilizan prótesis removibles y buscan una alternativa fija definitiva',
        'Pacientes que buscan una transformación completa con máxima estabilidad funcional'
      ],
      beforeAfter: {
        beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762894/foto7_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762895/foto7_despues.png',
        caseTitle: 'Rehabilitación Fija de Arcada Completa sobre Implantes',
        description: 'Transformación total de arcada mediante prótesis híbrida atornillada sobre implantes de titanio, devolviendo el soporte labial, la mordida y la plenitud de la sonrisa.',
        technique: 'Prótesis Híbrida CAD/CAM sobre Implantes',
        focus: 'Soporte Facial & Estabilidad Fija'
      }
    },
    {
      id: 'carillas-porcelana',
      slug: 'carillas-porcelana',
      title: 'Carillas de Porcelana',
      subtitle: 'Porcelain Veneers & Feldspathic Artistry',
      badge: 'Microestética & Mínima Invasión',
      tagline: 'Diseñamos una sonrisa personalizada respetando tus rasgos, proporciones y características dentales para conseguir un resultado armónico y natural.',
      shortDescription: 'Finas láminas de cerámica diseñadas individualmente para modificar características estéticas de los dientes anteriores (color, forma, tamaño, proporción y simetría) con mínima invasión biológica.',
      detailedDescription: [
        'Las carillas de porcelana son finas láminas de cerámica diseñadas individualmente para modificar de manera armónica las características estéticas de los dientes anteriores. Permiten mejorar de forma definitiva el color, forma, tamaño, proporción, simetría y pequeñas alteraciones de posición o espacios interdentales, según cada caso.',
        'Materiales de Primera Línea: Los materiales más utilizados en nuestra clínica incluyen Disilicato de Litio (excelente estética, translucidez natural y amplias posibilidades de caracterización óptica), Cerámicas Feldespáticas (extraordinaria capacidad estética y estratificación artesanal para casos de máxima exigencia biomimética) y Cerámicas Reforzadas seleccionadas según las necesidades mecánicas y funcionales del paciente.',
        'En Odontogamma Oriente concebimos cada diseño de carillas bajo protocolos de mínima invasión biológica, preservando el esmalte dental vivo para asegurar una adhesión micrométrica indestructible y una longevidad superior a 15 años sin manchas ni pérdida de brillo.'
      ],
      materials: [
        'Disilicato de Litio: Excelente estética, notable translucidez y amplias posibilidades de caracterización óptica.',
        'Cerámicas Feldespáticas: Excepcional capacidad estética, textura superficial y naturalidad en casos seleccionados.',
        'Cerámicas Reforzadas: Diversos sistemas cerámicos seleccionados según las cargas oclusales y necesidades de cada paciente.'
      ],
      materialGroups: [
        {
          category: 'Disilicato de Litio',
          items: ['Máxima versatilidad estética y translucidez viva', 'Amplia gama de caracterización para mimetismo exacto']
        },
        {
          category: 'Cerámicas Feldespáticas',
          items: ['Estratificación manual capa por capa por ceramistas maestros', 'Microtextura y reflectancia idéntica al esmalte natural']
        },
        {
          category: 'Cerámicas Reforzadas',
          items: ['Sistemas cerámicos de alta tenacidad a la flexión', 'Seleccionados según oclusión y biomecánica dental']
        }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=2000&q=85',
      galleryImages: [
        'https://res.cloudinary.com/ffvpll33/image/upload/v1790029060/648985706_17911045683163425_7279892063267287894_n.jpg',
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80'
      ],
      highlights: [
        'Corrección armónica de color, forma, tamaño, proporción y simetría dental',
        'Técnica de mínima invasión que preserva íntegro el esmalte biológico del paciente',
        'Materiales cerámicos de ultra alta gama: Disilicato de litio y Cerámicas feldespáticas',
        'Inmunidad frente a tinciones y manchas de café, vino, té o tabaco'
      ],
      idealFor: [
        'Dientes con alteraciones de forma, bordes irregulares o asimetrías',
        'Cambios de coloración intrínseca o manchas que no responden a otros tratamientos',
        'Desgastes dentales seleccionados en bordes incisales',
        'Espacios interdentales (diastemas) o pequeñas discrepancias estéticas de posición',
        'Pacientes que desean una transformación estética armónica respetando sus rasgos faciales'
      ],
      beforeAfter: {
        beforeImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762856/foto3_antes.png',
        afterImageUrl: 'https://res.cloudinary.com/ffvpll33/image/upload/v1789762857/foto3_despues.png',
        caseTitle: 'Rejuvenecimiento Dental & Carillas Cerámicas',
        description: 'Restauración anatómica de bordes incisales desgastados. Mediante láminas cerámicas personalizadas, se devolvió la longitud, textura y reflectancia natural para una sonrisa rejuvenecida y armónica.',
        technique: 'Carillas de Cerámica Pura',
        focus: 'Restauración Anatómica & Volumen'
      }
    }
  ]);

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
