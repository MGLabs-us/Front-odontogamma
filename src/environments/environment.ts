/**
 * Configuración de entorno de producción para Odontogamma Oriente.
 * Centraliza las credenciales públicas de Cloudinary y parámetros de la clínica.
 */
export const environment = {
  production: true,
  siteUrl: 'https://odontogammaoriente.com',
  clinicName: 'Odontogamma Oriente',
  clinicDirector: 'Dr. Jaime Arcila Cano',
  location: 'El Carmen de Viboral, Antioquia, Colombia',
  cloudinary: {
    uploadCloudName: 'ffvpll33',
    mediaCloudName: 'u81t66ol',
    apiKey: '379846884563928',
    uploadPreset: 'odontogamma_preset',
    defaultFolder: 'odontogamma',
    mediaBaseUrl: 'https://res.cloudinary.com/u81t66ol'
  },
  supabase: {
    chatUrl: 'https://jyocdmhimmamkoytgekh.supabase.co/functions/v1/chat',
    anonKey: 'sb_publishable_ReWHPB3d9dMivnQ6tlpw6w_70kcjvuA'
  }
};
