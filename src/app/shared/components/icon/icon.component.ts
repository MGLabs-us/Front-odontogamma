import { Component, input, ChangeDetectionStrategy } from '@angular/core';

export type IconName =
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'arrow-right'
  | 'menu'
  | 'close'
  | 'map-pin'
  | 'clock'
  | 'phone'
  | 'chat'
  | 'mobile'
  | 'calendar'
  | 'upload'
  | 'compare';

/**
 * Set de iconos propio de Odontogamma Oriente.
 * Todos comparten cuadrícula de 24px, trazo de 1.75 y terminaciones redondeadas,
 * así que se ven como una sola familia. El tamaño lo da la clase del host (w-4 h-4, etc.)
 * y el color lo hereda de `currentColor`.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0', 'aria-hidden': 'true' },
  styles: `
    :host { width: 1.25rem; height: 1.25rem; }
    svg { width: 100%; height: 100%; }
  `,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      @switch (name()) {
        @case ('check') { <path d="m5 12.5 4.5 4.5L19 7.5" /> }
        @case ('chevron-down') { <path d="m6 9 6 6 6-6" /> }
        @case ('chevron-left') { <path d="m15 6-6 6 6 6" /> }
        @case ('chevron-right') { <path d="m9 6 6 6-6 6" /> }
        @case ('arrow-right') { <path d="M5 12h14m-6-6 6 6-6 6" /> }
        @case ('menu') { <path d="M4 7h16M4 12h16M4 17h16" /> }
        @case ('close') { <path d="m6 6 12 12M18 6 6 18" /> }
        @case ('map-pin') {
          <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        }
        @case ('phone') {
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        }
        @case ('chat') { <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.4A8.5 8.5 0 1 1 21 11.5Z" /> }
        @case ('mobile') {
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
          <path d="M11 18h2" />
        }
        @case ('calendar') {
          <path d="M8 2.5v4M16 2.5v4M3.5 10h17" />
          <rect x="3.5" y="4.5" width="17" height="16" rx="3" />
        }
        @case ('upload') { <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5" /> }
        @case ('compare') { <path d="M12 3v18M8 8l-4 4 4 4M16 8l4 4-4 4" /> }
      }
    </svg>
  `
})
export class IconComponent {
  public readonly name = input.required<IconName>();
}
