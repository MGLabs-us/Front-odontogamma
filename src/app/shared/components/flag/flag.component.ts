import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Lang } from '../../../core/i18n/languages';

/**
 * Bandera redonda de cada idioma: EE. UU. (en-us), Reino Unido (en-gb) y España (es, la bandera estándar del idioma español).
 * Son SVG propios: no dependen de imágenes externas y se ven nítidos a cualquier tamaño.
 */
@Component({
  selector: 'app-flag',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-flag', 'aria-hidden': 'true' },
  styles: `
    :host {
      display: inline-flex;
      flex: 0 0 auto;
      width: 1.35rem;
      height: 1.35rem;
      overflow: hidden;
      border-radius: 9999px;
      box-shadow: 0 0 0 1px rgb(255 255 255 / 28%);
    }
    svg { width: 100%; height: 100%; display: block; }
  `,
  template: `
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" focusable="false">
      @switch (lang()) {
        @case ('en-us') {
          <rect width="60" height="40" fill="#fff" />
          <path
            d="M0 0h60v3.08H0zM0 6.15h60v3.08H0zM0 12.3h60v3.08H0zM0 18.46h60v3.08H0zM0 24.6h60v3.08H0zM0 30.77h60v3.08H0zM0 36.92h60V40H0z"
            fill="#b22234"
          />
          <rect width="25" height="21.5" fill="#3c3b6e" />
          <g fill="#fff">
            <circle cx="4" cy="4" r="1.1" /><circle cx="10" cy="4" r="1.1" /><circle cx="16" cy="4" r="1.1" /><circle cx="22" cy="4" r="1.1" />
            <circle cx="7" cy="8.6" r="1.1" /><circle cx="13" cy="8.6" r="1.1" /><circle cx="19" cy="8.6" r="1.1" />
            <circle cx="4" cy="13.2" r="1.1" /><circle cx="10" cy="13.2" r="1.1" /><circle cx="16" cy="13.2" r="1.1" /><circle cx="22" cy="13.2" r="1.1" />
            <circle cx="7" cy="17.8" r="1.1" /><circle cx="13" cy="17.8" r="1.1" /><circle cx="19" cy="17.8" r="1.1" />
          </g>
        }
        @case ('en-gb') {
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0l60 40M60 0 0 40" stroke="#fff" stroke-width="8" />
          <path d="M0 0l60 40M60 0 0 40" stroke="#c8102e" stroke-width="3" />
          <path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="13" />
          <path d="M30 0v40M0 20h60" stroke="#c8102e" stroke-width="8" />
        }
        @case ('es') {
          <rect width="60" height="40" fill="#aa151b" />
          <rect y="10" width="60" height="20" fill="#f1bf00" />
        }
      }
    </svg>
  `
})
export class FlagComponent {
  public readonly lang = input.required<Lang>();
}
