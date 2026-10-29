import { Component, signal, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandLogoComponent } from '../../../shared/components/brand-logo/brand-logo.component';
import { ArrowMarkComponent } from '../../../shared/components/arrow-mark/arrow-mark.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

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
  imports: [IconComponent, RouterLink, RouterLinkActive, BrandLogoComponent, ArrowMarkComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  protected readonly groups: NavGroup[] = [
    {
      id: 'services',
      label: 'Lo que hacemos',
      routePrefixes: ['/servicios'],
      items: [
        {
          label: 'Carillas de porcelana',
          description: 'Láminas feldespáticas ultrafinas de alta precisión',
          link: '/servicios/carillas-porcelana'
        },
        {
          label: 'Odontología cosmética',
          description: 'Arquitectura facial y armonización de sonrisa',
          link: '/servicios/odontologia-cosmetica'
        },
        {
          label: 'Proceso de transformación',
          description: 'El viaje de tu nueva sonrisa paso a paso',
          link: '/servicios/proceso-transformacion'
        },
        {
          label: 'Aclaramiento dental láser',
          description: 'Luz fría fotocatalizada sin sensibilidad',
          link: '/servicios/aclaramiento-laser'
        }
      ],
      footer: { label: 'Ver todos los tratamientos', link: '/servicios' }
    },
    {
      id: 'who',
      label: 'Quiénes somos',
      routePrefixes: ['/quienes-somos'],
      items: [
        { label: 'Sobre nosotros', description: 'Nuestra historia', link: '/quienes-somos/sobre-nosotros' },
        {
          label: 'Dr. Jaime Arcila Cano',
          description: 'Especialista en odontología estética y restauradora',
          link: '/quienes-somos/dr-jaime-arcila'
        },
        {
          label: 'Nuestro equipo',
          description: 'Especialistas multidisciplinarios',
          link: '/quienes-somos/equipo'
        },
        {
          label: 'Nuestra sede',
          description: 'Sede Oriente en El Carmen de Viboral',
          link: '/quienes-somos/sede'
        }
      ]
    },
    {
      id: 'work',
      label: 'Nuestro trabajo',
      routePrefixes: ['/nuestro-trabajo'],
      items: [
        {
          label: 'Antes y después',
          description: 'Galería fotográfica con comparador interactivo',
          link: '/nuestro-trabajo/antes-y-despues'
        },
        {
          label: 'Testimonios de pacientes',
          description: 'Historias reales en foto y video',
          link: '/nuestro-trabajo/testimonios'
        },
        {
          label: 'Valoración virtual',
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
