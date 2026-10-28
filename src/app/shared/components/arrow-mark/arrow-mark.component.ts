import { Component, input, ChangeDetectionStrategy } from '@angular/core';

export type ArrowDirection = 'right' | 'down' | 'external';

@Component({
  selector: 'app-arrow-mark',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      @switch (direction()) {
        @case ('down') {
          <path d="M12 4v15m-6-6 6 6 6-6" />
        }
        @case ('external') {
          <path d="M13 5h6v6m0-6-9 9" />
          <path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        }
        @default {
          <path d="M4 12h15m-6-6 6 6-6 6" />
        }
      }
    </svg>
  `,
  styleUrl: './arrow-mark.component.css'
})
export class ArrowMarkComponent {
  public readonly direction = input<ArrowDirection>('right');
}
