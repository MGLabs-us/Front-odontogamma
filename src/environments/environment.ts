/**
 * Configuración de entorno de producción para Odontogamma Oriente.
 * Centraliza las credenciales públicas de Cloudinary y parámetros de la clínica.
 */
export const environment = {
  production: true,
  chatUrl: 'https://gvzsbtuyaraqierhnhjz.supabase.co/functions/v1/chat',
  clinicName: 'Odontogamma Oriente',
  clinicDirector: 'Dr. Jaime Arcila Cano',
  location: 'Carmen de viboral, Antioquia, Colombia',
  cloudinary: {
    cloudName: 'ffvpll33',
    apiKey: '379846884563928',
    uploadPreset: 'odontogamma_preset',
    defaultFolder: 'odontogamma',
    mediaBaseUrl: 'https://res.cloudinary.com/ffvpll33'
  }
};

