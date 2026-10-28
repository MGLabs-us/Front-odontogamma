import { environment } from '../../../environments/environment';

/**
 * Manifiesto centralizado de la biblioteca multimedia REAL de Odontogamma Oriente en Cloudinary.
 * Todo lo que se muestra en el sitio sale de aquí: no se usan fotografías externas ni de stock.
 *
 * Carpetas en Cloudinary:
 * - odontogamma/site/images/   → fotografías optimizadas de la clínica, pacientes y laboratorio
 * - raíz de la biblioteca      → fotos del equipo (Instagram), antes/después y videos verticales
 */

export const CLOUDINARY_FOLDERS = {
  VIDEOS: 'odontogamma/videos',
  SITE_MEDIA: 'odontogamma/site',
  SERVICES: 'odontogamma/servicios',
  TRANSFORMATIONS: 'odontogamma/transformaciones',
  CLINIC: 'odontogamma/sede-llanogrande',
  TEAM: 'odontogamma/equipo',
  PATIENT_UPLOADS: 'odontogamma/valoraciones-virtuales'
} as const;

const baseUrl = `https://res.cloudinary.com/${environment.cloudinary.mediaCloudName}`;

/** Foto optimizada de `odontogamma/site/images`. */
const site = (id: string, width = 1400): string =>
  `${baseUrl}/image/upload/f_auto,q_auto,w_${width},c_limit/${CLOUDINARY_FOLDERS.SITE_MEDIA}/images/${id}`;

/** Foto optimizada de la raíz de la biblioteca (equipo, material gráfico, antes/después). */
const root = (id: string, width = 1400): string =>
  `${baseUrl}/image/upload/f_auto,q_auto,w_${width},c_limit/${id}`;

const videoUrl = (publicId: string): string =>
  `${baseUrl}/video/upload/f_mp4,q_auto/${publicId}.mp4`;

const videoPoster = (publicId: string, width = 600): string =>
  `${baseUrl}/video/upload/so_1,f_jpg,q_auto,w_${width}/${publicId}.jpg`;

export type MediaOrientation = 'vertical' | 'landscape';

export interface VideoAsset {
  id: string;
  title: string;
  caption: string;
  orientation: MediaOrientation;
  videoUrl: string;
  posterUrl: string;
}

const video = (
  id: string,
  publicId: string,
  title: string,
  caption: string,
  orientation: MediaOrientation = 'vertical'
): VideoAsset => ({
  id,
  title,
  caption,
  orientation,
  videoUrl: videoUrl(publicId),
  posterUrl: videoPoster(publicId)
});

/**
 * Fotografías agrupadas por lo que muestran. Cada clave se usa en una ubicación concreta del sitio.
 */
const images = {
  /** Espacios de la sede */
  clinic: {
    lobby: site('03a3b803-9acf-4fc8-b3e9-605d37a89c05'),
    reception: site('1df83274-9d87-4883-8344-403ef35a0339'),
    receptionFront: site('9e41178a-74ce-4702-9eb0-c4d9a65d4f30'),
    loungeSofa: site('92790622-1dcb-4c18-bad6-28a6660c9969'),
    loungeTall: site('c552057c-e9c5-43be-9387-a57da35a9569', 1000),
    consultGlass: site('601d345c-6ad3-4a9a-b0b2-200339d538b6'),
    consultWide: site('b7fc8c99-6627-4314-81c9-66b7f5ee0bba'),
    consultSuite: site('d18ea34b-cdbe-4cad-af7c-fdc9cae61bdf'),
    consultPanoramic: site('a70348cf-3230-4b22-8c96-bbf0152aabcc'),
    consultTall: site('b50a47a6-b8c7-443b-8aa0-369e1e0dda8f', 1000),
    facade: root('503026625_8019923951464486_6346069601575127716_n', 900)
  },

  /** Sonrisas en primer plano (detalle estético) */
  smiles: {
    veneers: site('d9454156-1755-4a56-8c47-83bfa0f40b05'),
    natural: site('d4f92a41-a7d8-4a2f-86b8-21b51b0c5ecc'),
    cosmetic: site('c6cfe6c5-a432-4b4b-a005-aa107652ad23'),
    glossy: site('9281fd5e-5f26-4659-ab84-4a9b3bec8ed8'),
    profile: site('8b9b0e41-3da4-487c-aa4e-64a144fb4a21'),
    macro: site('82c1befa-73a6-4f31-bc80-3b05c247a864'),
    wide: site('7f5f3f3c-322b-4d93-9f0a-9c91acc69565'),
    side: site('632fc2dd-110f-4e7b-882d-5e7f463628cb'),
    dark: site('f3430369-5a00-450d-8d90-01f6ca0d8d90'),
    withLogo: site('88245d31-725a-4b9f-bc52-7a5ba3ddfe80')
  },

  /** Laboratorio, modelos y material clínico */
  lab: {
    modelsGreen: site('dsc-0796'),
    modelsBlue: site('dsc-0794'),
    dentures: site('ae0d4c35-0e2d-4369-b34e-7ccc906f0f20'),
    printedModel: site('8032f34e-d51a-4729-bf50-f81b71bf0571'),
    gloves: site('6', 1000),
    instruments: site('15', 1000)
  },

  /** Pacientes */
  patients: {
    blackBackdrop: site('5af85abf-ad5c-4972-8502-c46350589608', 1800),
    smilingStudio: site('59b69c3b-6507-40d2-bf31-061de0351d6d'),
    furCoat: site('76ba30f5-2a5d-4300-9a09-afec83ab79d6'),
    furCoatSmile: site('17bafcc2-999a-4efc-9793-ac0de0680f3f'),
    mirror: site('999fe688-653a-4433-8fd1-49b40100a099'),
    redSweater: site('df0d6e98-f590-46a4-9b8a-1aeb35cbe214', 1000),
    redSweaterTall: site('67d9a957-c8ed-4a30-b6d3-bb01468f7124', 1000),
    redSweaterSide: site('40e18b09-fb6f-4873-8777-30eaf15dbb8e', 1000),
    closeUp: site('2d9ef25b-7eee-4e12-b1f3-e2b624195d04', 1000),
    redHairFront: root('485992449_646326938135326_7644290108229838413_n', 1000),
    redHairPortrait: site('img-5061-a2-ig', 1000),
    redHairPoint: site('img-5034-a1', 1000),
    blackBackdropCollage: root('485372175_18025986287656101_8369169854241861362_n', 1000),
    treatmentCollage: root('483860361_18025060961656101_7267703078192937477_n', 1000)
  },

  /** Equipo y dirección clínica */
  team: {
    directorAndAssistant: root('467016403_18011053835656101_6993562505798444797_n', 2000),
    chiefDoctor: root('628032151_18503251906073838_8830790894546818104_n', 1000),
    chiefDoctorSeated: root('624512340_18106700200685547_1543458093715588057_n', 900),
    doctorGray: root('623767744_18139684015482831_3052695333261664610_n', 900),
    assistant: root('622980093_18093378355788920_6489025597437504639_n', 900),
    doctorNavy: root('624649658_18056254670663874_7510318105389766555_n', 900),
    doctorNavyTwo: root('632201995_18412412407121334_7513765155196393691_n', 900),
    doctorAtWork: root('485446576_18026307299656101_8022447782530159767_n', 1000),
    doctorSuit: site('img-1454-odg6', 900),
    doctorGrayStudio: site('img-1479-odg8', 900)
  },

  /** Material gráfico de campañas */
  campaigns: {
    whitening: root('486139286_646285874806099_4089039439370104702_n', 1000),
    whiteningLaser: root('623237436_18072623216387488_2507455715493042827_n', 1000),
    scheduleVisit: root('503808728_727319606512388_2513256258237696741_n', 900)
  }
} as const;

/**
 * Videos de la biblioteca (verticales para formato reel y apaisados para entrevistas).
 */
const videos = {
  testimonials: [
    video('ivonn', 'VIdeo_9', 'Ivonn, paciente de Odontogamma', 'Cliente Odontogamma Oriente.'),
    video('christopher', 'VIdeo_8', 'Christopher, paciente', 'Cliente Odontogamma Oriente.'),
    video('sonrisa-segura', 'VIdeo_4', 'Una paciente comparte su resultado', 'Paciente Odontogamma Oriente.')
  ],
  doctor: [
    video('veneers-colombia', 'VIdeo_2', 'Carillas de porcelana en Colombia', 'El Dr. Jaime Arcila explica el proceso de carillas de porcelana en Colombia.'),
    video('veneers-seguridad', 'VIdeo_6', 'Seguridad y confianza', 'Seguridad y confianza en tu tratamiento de carillas.'),
    video('veneers-viaje', 'VIdeo_5', 'Tu viaje a Colombia', 'Procedimiento y tiempos explicados por el Dr. Jaime Arcila.'),
    video('veneers-semana', 'VIdeo_7', 'Transforma tu sonrisa en una semana', 'Visita Colombia con el Dr. Jaime Arcila.')
  ],
  clinic: [
    video('sede-recepcion', 'VIdeo_1', 'Nuestra sede por dentro', 'Un recorrido por la recepción de Odontogamma Oriente.'),
    video('sede-entrada', 'VIdeo_3', 'Bienvenida a la clínica', 'Así te recibimos al llegar.'),
    video('sede-consulta', `${CLOUDINARY_FOLDERS.SITE_MEDIA}/videos/img-6844`, 'Atención en consultorio', 'Procedimiento real en nuestros consultorios.'),
    video('carillas-ceramica', `${CLOUDINARY_FOLDERS.SITE_MEDIA}/videos/6d3666e3-1aed-472c-9372-10278c6633d8`, 'Carillas listas para colocar', 'Láminas cerámicas elaboradas a medida.')
  ],
  interviews: [
    video(
      'entrevista-paciente',
      `${CLOUDINARY_FOLDERS.SITE_MEDIA}/videos/img-6881`,
      'Una paciente comparte su experiencia',
      'Entrevista en la sede de El Carmen de Viboral.',
      'landscape'
    )
  ]
} as const;

/**
 * Catálogo de recursos en Cloudinary.
 */
export const CLOUDINARY_ASSETS_MANIFEST = {
  images,
  videos
} as const;
