/**
 * Manifiesto Centralizado de Activos Multimedia en Cloudinary para Odontogamma Oriente.
 * Cloud Name: ffvpll33
 *
 * Estructura de carpetas en Cloudinary:
 * - odontogamma/videos/
 * - odontogamma/servicios/
 * - odontogamma/transformaciones/
 * - odontogamma/sede-llanogrande/
 * - odontogamma/equipo/
 * - odontogamma/valoraciones-virtuales/
 */

export const CLOUDINARY_FOLDERS = {
  VIDEOS: 'odontogamma/videos',
  SERVICES: 'odontogamma/servicios',
  TRANSFORMATIONS: 'odontogamma/transformaciones',
  CLINIC: 'odontogamma/sede-llanogrande',
  TEAM: 'odontogamma/equipo',
  PATIENT_UPLOADS: 'odontogamma/valoraciones-virtuales'
} as const;

/**
 * Catálogo de identificadores públicos de recursos en Cloudinary con sus URLs de respaldo.
 * Permite cambiar los IDs cuando el usuario suba sus archivos finales a Cloudinary sin romper nada.
 */
export const CLOUDINARY_ASSETS_MANIFEST = {
  // Video Principal del Hero & Póster
  hero: {
    videoPublicId: `${CLOUDINARY_FOLDERS.VIDEOS}/hero-loop`,
    posterPublicId: `${CLOUDINARY_FOLDERS.VIDEOS}/hero-poster`,
    fallbackVideoUrl: '/videos/hero-loop.mp4',
    fallbackPosterUrl: '/videos/hero-poster.jpg'
  },

  // Sede Llanogrande & Espacios de Confort
  clinic: {
    heroLandscape: `${CLOUDINARY_FOLDERS.CLINIC}/sede-fachada-principal`,
    suitePrivate: `${CLOUDINARY_FOLDERS.CLINIC}/suite-clinica-privada`,
    scanner3d: `${CLOUDINARY_FOLDERS.CLINIC}/tecnologia-intraoral-3d`,
    lounge: `${CLOUDINARY_FOLDERS.CLINIC}/lounge-pacientes-vip`,
    gardenView: `${CLOUDINARY_FOLDERS.CLINIC}/vista-jardines-llanogrande`,
    fallbackLandscape: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85'
  },

  // Dirección Médica & Equipo
  team: {
    chiefDoctorHero: `${CLOUDINARY_FOLDERS.TEAM}/dr-jaime-arcila-hero`,
    chiefDoctorPortrait: `${CLOUDINARY_FOLDERS.TEAM}/dr-jaime-arcila-retrato`,
    chiefDoctorLab: `${CLOUDINARY_FOLDERS.TEAM}/dr-jaime-arcila-laboratorio`,
    masterCeramist: `${CLOUDINARY_FOLDERS.TEAM}/maestro-ceramista-artesanal`,
    periodontist: `${CLOUDINARY_FOLDERS.TEAM}/especialista-periodoncia`,
    conciergeLead: `${CLOUDINARY_FOLDERS.TEAM}/coordinadora-concierge-vip`,
    fallbackDoctor: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=2200&q=85'
  },

  // Tratamientos y Procedimientos de Firma
  services: {
    porcelainVeneers: {
      hero: `${CLOUDINARY_FOLDERS.SERVICES}/carillas-porcelana-hero`,
      fallback: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=2000&q=85'
    },
    cosmeticDentistry: {
      hero: `${CLOUDINARY_FOLDERS.SERVICES}/odontologia-cosmetica-hero`,
      fallback: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=2000&q=85'
    },
    smileTransformation: {
      hero: `${CLOUDINARY_FOLDERS.SERVICES}/transformacion-sonrisa-hero`,
      fallback: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=85'
    },
    digitalDesign: {
      hero: `${CLOUDINARY_FOLDERS.SERVICES}/diseno-sonrisa-digital-hero`,
      fallback: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=2000&q=85'
    },
    oralRehab: {
      hero: `${CLOUDINARY_FOLDERS.SERVICES}/rehabilitacion-oral-hero`,
      fallback: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=85'
    },
    teethWhitening: {
      hero: `${CLOUDINARY_FOLDERS.SERVICES}/aclaramiento-dental-hero`,
      fallback: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=2000&q=85'
    }
  }
} as const;

