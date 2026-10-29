/**
 * Configuración de entorno de desarrollo para Odontogamma Oriente.
 */
export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  clinicName: 'Odontogamma Oriente',
  clinicDirector: 'Dr. Jaime Arcila Cano',
  location: 'El Carmen de Viboral, Antioquia, Colombia',
  cloudinary: {
    uploadCloudName: 'ffvpll33',
    mediaCloudName: 'u81t66ol',
    apiKey: '379846884563928',
    uploadPreset: 'odontogamma_preset',
    defaultFolder: 'odontogamma_dev',
    mediaBaseUrl: 'https://res.cloudinary.com/u81t66ol'
  },
  supabase: {
    chatUrl: 'https://jyocdmhimmamkoytgekh.supabase.co/functions/v1/chat',
    anonKey: 'sb_publishable_ReWHPB3d9dMivnQ6tlpw6w_70kcjvuA'
  }
};
