/**
 * Configuración de entorno de desarrollo para Odontogamma Oriente.
 */
export const environment = {
  production: false,
  clinicName: 'Odontogamma Oriente',
  clinicDirector: 'Dr. Jaime Arcila Cano',
  location: 'Llanogrande, Rionegro, Antioquia, Colombia',
  cloudinary: {
    cloudName: 'ffvpll33',
    apiKey: '379846884563928',
    uploadPreset: 'odontogamma_preset',
    defaultFolder: 'odontogamma_dev',
    mediaBaseUrl: 'https://res.cloudinary.com/ffvpll33'
  }
};

