import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandLogoComponent } from '../../../shared/components/brand-logo/brand-logo.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

interface SocialLink {
  readonly name: string;
  readonly handle: string;
  readonly url: string;
  /** Path SVG (viewBox 24x24) del logo de la red. */
  readonly icon: string;
}

/**
 * Pie de página con marca, navegación rápida, contacto directo y redes sociales.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent, CommonModule, RouterLink, BrandLogoComponent],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly whatsappUrl =
    'https://wa.me/573217209420?text=Hola,%20deseo%20solicitar%20una%20cita%20de%20valoraci%C3%B3n%20con%20el%20Dr.%20Jaime%20Arcila%20en%20Odontogamma%20Oriente.';

  protected readonly socials: readonly SocialLink[] = [
    {
      name: 'WhatsApp',
      handle: '+57 321 720 9420',
      url: this.whatsappUrl,
      icon: 'M12.031 2a9.93 9.93 0 0 0-8.5 15.07L2 22l5.07-1.49A9.94 9.94 0 1 0 12.03 2Zm0 1.8a8.13 8.13 0 1 1-4.15 15.1l-.3-.18-3 .88.9-2.92-.2-.31A8.13 8.13 0 0 1 12.03 3.8Zm-3.3 3.9c-.2 0-.52.08-.79.37-.27.3-1.03 1-1.03 2.45 0 1.44 1.05 2.84 1.2 3.04.15.2 2.06 3.3 5.07 4.5 2.5 1 3.01.8 3.55.75.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57Z'
    },
    {
      name: 'Instagram',
      handle: '@odontogammaoriente',
      url: 'https://www.instagram.com/odontogammaoriente',
      icon: 'M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.25-2.55a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z'
    },
    {
      name: 'Facebook',
      handle: 'Odontogamma Oriente',
      url: 'https://www.facebook.com/profile.php?id=100082740762530',
      icon: 'M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.95.4-1.7 1.8-1.7h1.6V3.8c-.3 0-1.3-.15-2.4-.15-2.6 0-4.3 1.55-4.3 4.4v2.45H7.4v3.3h2.8V22h3.3Z'
    },
    {
      name: 'TikTok',
      handle: '@odontogammaorient',
      url: 'https://www.tiktok.com/@odontogammaorient',
      icon: 'M16.6 2h-3.2v13.1a2.9 2.9 0 1 1-2.9-2.9c.3 0 .55.04.8.1V8.9a6.1 6.1 0 1 0 5.3 6.05V8.6a7.4 7.4 0 0 0 4.3 1.4V6.8a4.3 4.3 0 0 1-4.3-4.3V2Z'
    }
  ];
}
