import { Component, input, ChangeDetectionStrategy } from '@angular/core';

export type EditorialLabelTone = 'light' | 'dark' | 'muted';

@Component({
  selector: 'app-editorial-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.og-editorial-label]': 'true',
    '[class.og-editorial-label--dark]': "tone() === 'dark'",
    '[class.og-editorial-label--muted]': "tone() === 'muted'"
  },
  template: `
    <span class="og-editorial-label__rule" aria-hidden="true"></span>
    <ng-content />
  `,
  styleUrl: './editorial-label.component.css'
})
export class EditorialLabelComponent {
  public readonly tone = input<EditorialLabelTone>('light');
}
