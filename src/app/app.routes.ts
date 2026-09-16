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
        path: 'sobre-mi',
        loadComponent: () =>
          import('./features/about/pages/about.component').then(m => m.AboutComponent),
        title: 'Dr. Jaime Arcila Cano | Odontogamma Oriente'
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
        path: 'transformaciones',
        loadComponent: () =>
          import('./features/transformations/pages/transformations.component').then(
            m => m.TransformationsComponent
          ),
        title: 'Antes & Después — Casos Clínicos | Odontogamma Oriente'
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
