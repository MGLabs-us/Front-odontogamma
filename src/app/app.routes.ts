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
        title: 'Odontogamma Oriente | Dr. Jaime Arcila Cano — Odontología Estética de Lujo'
      },
      {
        path: 'who-we-are',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'about-us'
          },
          {
            path: 'about-us',
            loadComponent: () =>
              import('./features/who-we-are/pages/about-us/about-us.component').then(
                m => m.AboutUsComponent
              ),
            title: 'About Us | Odontogamma Oriente'
          },
          {
            path: 'dr-jaime-arcila',
            loadComponent: () =>
              import('./features/who-we-are/pages/chief-doctor/chief-doctor.component').then(
                m => m.ChiefDoctorComponent
              ),
            title: 'Dr. Jaime Arcila Cano — Director Clínico | Odontogamma Oriente'
          },
          {
            path: 'our-team',
            loadComponent: () =>
              import('./features/who-we-are/pages/team/team.component').then(
                m => m.TeamComponent
              ),
            title: 'Our Team — Especialistas Clínicos | Odontogamma Oriente'
          },
          {
            path: 'our-location',
            loadComponent: () =>
              import('./features/who-we-are/pages/location/location.component').then(
                m => m.LocationComponent
              ),
            title: 'Our Location — Sede El Carmen de Viboral | Odontogamma Oriente'
          },
          {
            path: 'brand-partners',
            loadComponent: () =>
              import('./features/who-we-are/pages/brand-partners/brand-partners.component').then(
                m => m.BrandPartnersComponent
              ),
            title: 'Brand Partners & Medios | Odontogamma Oriente'
          }
        ]
      },
      {
        path: 'sobre-mi',
        redirectTo: 'who-we-are/dr-jaime-arcila',
        pathMatch: 'full'
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('./features/services/pages/services.component').then(m => m.ServicesComponent),
        title: 'Tratamientos & Carillas Cerámicas | Odontogamma Oriente'
      },
      {
        path: 'servicios/:slug',
        loadComponent: () =>
          import('./features/services/pages/service-detail/service-detail.component').then(
            m => m.ServiceDetailComponent
          ),
        title: 'Tratamiento de Alta Precisión | Odontogamma Oriente'
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
            title: 'Antes y Después — Casos Clínicos | Odontogamma Oriente'
          },
          {
            path: 'testimonios',
            loadComponent: () =>
              import('./features/our-work/pages/testimonials/testimonials.component').then(
                m => m.TestimonialsComponent
              ),
            title: 'Testimonios de Pacientes | Odontogamma Oriente'
          },
          {
            path: 'valoracion-virtual',
            loadComponent: () =>
              import(
                './features/our-work/pages/virtual-consultation/virtual-consultation.component'
              ).then(m => m.VirtualConsultationComponent),
            title: 'Valoración Virtual Gratuita | Odontogamma Oriente'
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
        title: 'Agendar Cita Privada | Odontogamma Oriente'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
