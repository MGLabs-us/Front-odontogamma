import { Routes } from '@angular/router';

/**
 * Enrutador principal de la aplicación Odontogamma Oriente.
 * Utiliza lazy loading por componente para optimizar los tiempos de carga inicial.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home.component').then(m => m.HomeComponent),
        title: 'Odontología estética y carillas en El Carmen de Viboral | Odontogamma Oriente',
        data: { description: 'Carillas de porcelana, diseño de sonrisa y odontología estética de mínima invasión en el Oriente Antioqueño. Agenda una valoración gratuita con el Dr. Jaime Arcila Cano.' }
      },
      {
        path: 'quienes-somos',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'sobre-nosotros'
          },
          {
            path: 'sobre-nosotros',
            loadComponent: () =>
              import('./features/who-we-are/pages/about-us/about-us.component').then(
                m => m.AboutUsComponent
              ),
            title: 'Sobre nosotros | Odontogamma Oriente',
        data: { description: 'Conoce la clínica Odontogamma Oriente en El Carmen de Viboral: nuestra historia, nuestra forma de atender y por qué los pacientes confían en nosotros.' }
          },
          {
            path: 'dr-jaime-arcila',
            loadComponent: () =>
              import('./features/who-we-are/pages/chief-doctor/chief-doctor.component').then(
                m => m.ChiefDoctorComponent
              ),
            title: 'Dr. Jaime Arcila Cano, odontólogo estético | Odontogamma Oriente',
        data: { description: 'Trayectoria, formación y enfoque clínico del Dr. Jaime Arcila Cano, director de Odontogamma Oriente y especialista en odontología estética.' }
          },
          {
            path: 'equipo',
            loadComponent: () =>
              import('./features/who-we-are/pages/team/team.component').then(
                m => m.TeamComponent
              ),
            title: 'Equipo clínico | Odontogamma Oriente',
        data: { description: 'Los especialistas que te atienden en Odontogamma Oriente: odontología estética, rehabilitación oral y acompañamiento durante todo el tratamiento.' }
          },
          {
            path: 'sede',
            loadComponent: () =>
              import('./features/who-we-are/pages/location/location.component').then(
                m => m.LocationComponent
              ),
            title: 'Sede en El Carmen de Viboral, cómo llegar | Odontogamma Oriente',
        data: { description: 'Dirección, horarios y cómo llegar a la clínica Odontogamma Oriente en El Carmen de Viboral, Antioquia. Atención con cita previa.' }
          },
        ]
      },
      { path: 'who-we-are', redirectTo: 'quienes-somos/sobre-nosotros', pathMatch: 'full' },
      { path: 'who-we-are/about-us', redirectTo: 'quienes-somos/sobre-nosotros', pathMatch: 'full' },
      { path: 'who-we-are/dr-jaime-arcila', redirectTo: 'quienes-somos/dr-jaime-arcila', pathMatch: 'full' },
      { path: 'who-we-are/our-team', redirectTo: 'quienes-somos/equipo', pathMatch: 'full' },
      { path: 'who-we-are/our-location', redirectTo: 'quienes-somos/sede', pathMatch: 'full' },
      {
        path: 'sobre-mi',
        redirectTo: 'quienes-somos/dr-jaime-arcila',
        pathMatch: 'full'
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('./features/services/pages/services.component').then(m => m.ServicesComponent),
        title: 'Tratamientos de odontología estética | Odontogamma Oriente',
        data: { description: 'Carillas de porcelana, diseño de sonrisa y rehabilitación estética. Conoce cada tratamiento, para quién es y cómo es el proceso.' }
      },
      {
        path: 'servicios/:slug',
        loadComponent: () =>
          import('./features/services/pages/service-detail/service-detail.component').then(
            m => m.ServiceDetailComponent
          ),
        title: 'Tratamiento | Odontogamma Oriente',
        data: { description: 'Detalle del tratamiento: en qué consiste, para quién es y cómo es el proceso en Odontogamma Oriente.' }
      },
      {
        path: 'nuestro-trabajo',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'antes-y-despues'
          },
          {
            path: 'antes-y-despues',
            loadComponent: () =>
              import('./features/our-work/pages/before-after/before-after.component').then(
                m => m.BeforeAfterComponent
              ),
            title: 'Antes y después: casos reales de sonrisas | Odontogamma Oriente',
        data: { description: 'Casos clínicos reales de carillas y diseño de sonrisa. Desliza para comparar el antes y el después de cada paciente.' }
          },
          {
            path: 'testimonios',
            loadComponent: () =>
              import('./features/our-work/pages/testimonials/testimonials.component').then(
                m => m.TestimonialsComponent
              ),
            title: 'Testimonios de pacientes | Odontogamma Oriente',
        data: { description: 'Escucha a pacientes de Odontogamma Oriente contar cómo fue su tratamiento y cómo cambió su sonrisa.' }
          },
          {
            path: 'valoracion-virtual',
            loadComponent: () =>
              import(
                './features/our-work/pages/virtual-consultation/virtual-consultation.component'
              ).then(m => m.VirtualConsultationComponent),
            title: 'Valoración virtual gratuita con fotos | Odontogamma Oriente',
        data: { description: 'Envía fotos de tus dientes y recibe una valoración preliminar gratuita del equipo de Odontogamma Oriente, sin salir de casa.' }
          }
        ]
      },
      {
        path: 'transformaciones',
        redirectTo: 'nuestro-trabajo/antes-y-despues',
        pathMatch: 'full'
      },
      {
        path: 'valoracion-virtual',
        redirectTo: 'nuestro-trabajo/valoracion-virtual',
        pathMatch: 'full'
      },
      {
        path: 'testimonios',
        redirectTo: 'nuestro-trabajo/testimonios',
        pathMatch: 'full'
      },
      {
        path: 'contacto',
        loadComponent: () =>
          import('./features/contact/pages/contact.component').then(m => m.ContactComponent),
        title: 'Agendar cita y contacto | Odontogamma Oriente',
        data: { description: 'Agenda tu cita en Odontogamma Oriente por WhatsApp o formulario. Atendemos en El Carmen de Viboral, de lunes a sábado.' }
      }
    ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página no encontrada | Odontogamma Oriente',
    data: { noindex: true }
  }
];
