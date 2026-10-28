import { Component, signal, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandLogoComponent } from '../../../shared/components/brand-logo/brand-logo.component';
import { ArrowMarkComponent } from '../../../shared/components/arrow-mark/arrow-mark.component';

interface NavItem {
  label: string;
  description: string;
  link: string;
  highlight?: boolean;
}

interface NavGroup {
  id: string;
  label: string;
  /** Prefijo de ruta para marcar el grupo como activo */
  routePrefixes: string[];
  items: NavItem[];
  footer?: { label: string; link: string };
}

/**
 * Barra de navegación principal. El menú se define como datos y los estilos viven
 * en las clases globales `nav-*` de styles.css, para que escritorio y móvil compartan el mismo diseño.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BrandLogoComponent, ArrowMarkComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  protected readonly groups: NavGroup[] = [
    {
      id: 'services',
      label: 'Lo Que Hacemos',
      routePrefixes: ['/servicios'],
      items: [
        {
          label: 'Carillas de Porcelana',
          description: 'Láminas feldespáticas ultrafinas de alta precisión',
          link: '/servicios/carillas-porcelana'
        },
        {
          label: 'Odontología Cosmética',
          description: 'Arquitectura facial y armonización de sonrisa',
          link: '/servicios/odontologia-cosmetica'
        },
        {
          label: 'Proceso de Transformación',
          description: 'El viaje de tu nueva sonrisa paso a paso',
          link: '/servicios/proceso-transformacion'
        },
        {
          label: 'Aclaramiento Dental Láser',
          description: 'Luz fría fotocatalizada sin sensibilidad',
          link: '/servicios/aclaramiento-laser'
        }
      ],
      footer: { label: 'Ver Todos los Tratamientos', link: '/servicios' }
    },
    {
      id: 'who',
      label: 'Quiénes Somos',
      routePrefixes: ['/who-we-are'],
      items: [
        { label: 'Sobre Nosotros', description: 'Nuestra historia', link: '/who-we-are/about-us' },
        {
          label: 'Dr. Jaime Arcila Cano',
          description: 'Especialista en odontología estética y restauradora',
          link: '/who-we-are/dr-jaime-arcila'
        },
        {
          label: 'Nuestro Equipo',
          description: 'Especialistas multidisciplinarios',
          link: '/who-we-are/our-team'
        },
        {
          label: 'Nuestra Sede',
          description: 'Sede Oriente en El Carmen de Viboral',
          link: '/who-we-are/our-location'
        }
      ]
    },
    {
      id: 'work',
      label: 'Nuestro Trabajo',
      routePrefixes: ['/nuestro-trabajo'],
      items: [
        {
          label: 'Antes y Después',
          description: 'Galería fotográfica con comparador interactivo',
          link: '/nuestro-trabajo/antes-y-despues'
        },
        {
          label: 'Testimonios de Pacientes',
          description: 'Historias reales en foto y video',
          link: '/nuestro-trabajo/testimonios'
        },
        {
          label: 'Valoración Virtual',
          description: 'Sube fotos de tus dientes y recibe un diagnóstico preliminar',
          link: '/nuestro-trabajo/valoracion-virtual',
          highlight: true
        }
      ]
    }
  ];

  /** Detecta si el usuario ha hecho scroll para compactar la barra */
  protected readonly isScrolled = signal<boolean>(false);

  /** Controla el estado del menú móvil */
  protected readonly mobileMenuOpen = signal<boolean>(false);

  /** Grupo del menú móvil actualmente expandido (acordeón) */
  protected readonly openMobileGroup = signal<string | null>(null);

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.isScrolled.set(window.scrollY > 15);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMobileMenu();
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
    if (!this.mobileMenuOpen()) {
      this.openMobileGroup.set(null);
    }
  }

  protected toggleMobileGroup(id: string): void {
    this.openMobileGroup.update(current => (current === id ? null : id));
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.openMobileGroup.set(null);
  }
}
