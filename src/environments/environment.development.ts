/**
 * Configuración de entorno de desarrollo para Odontogamma Oriente.
 */
export const environment = {
  production: false,
  chatUrl: 'https://gvzsbtuyaraqierhnhjz.supabase.co/functions/v1/chat',
  clinicName: 'Odontogamma Oriente',
  clinicDirector: 'Dr. Jaime Arcila Cano',
  location: 'Carmen de viboral, Antioquia, Colombia',
  cloudinary: {
    cloudName: 'ffvpll33',
    apiKey: '379846884563928',
    uploadPreset: 'odontogamma_preset',
    defaultFolder: 'odontogamma_dev',
    mediaBaseUrl: 'https://res.cloudinary.com/ffvpll33'
  }
};

