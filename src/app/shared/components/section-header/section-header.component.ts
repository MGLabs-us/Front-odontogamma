import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Encabezado de sección con estilo editorial de alta costura.
 * Integra supertítulo en caja alta espaciada y título en tipografía serif Cormorant Garamond.
 */
@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapperClasses()">
      @if (kicker()) {
        <span class="inline-block text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-og-electric mb-3">
          {{ kicker() }}
        </span>
      }

      <h2 class="text-3xl md:text-5xl lg:text-6xl font-editorial font-light tracking-tight text-og-headline leading-[1.1] mb-5">
        {{ title() }}
      </h2>

      @if (subtitle()) {
        <p class="text-sm md:text-base text-og-slate font-light leading-relaxed max-w-2xl" [class.mx-auto]="align() === 'center'">
          {{ subtitle() }}
        </p>
      }

      <!-- Línea de acento sutil opcional -->
      @if (showDivider()) {
        <div class="mt-6 h-[1px] w-16 bg-gradient-to-r from-og-electric to-transparent" [class.mx-auto]="align() === 'center'"></div>
      }
    </div>
  `
})
export class SectionHeaderComponent {
  public readonly kicker = input<string | null>(null);
  public readonly title = input.required<string>();
  public readonly subtitle = input<string | null>(null);
  public readonly align = input<'left' | 'center' | 'right'>('center');
  public readonly showDivider = input<boolean>(true);

  protected wrapperClasses(): string {
    const alignments = {
      left: 'text-left',
      center: 'text-center mx-auto',
      right: 'text-right ml-auto'
    }[this.align()];

    return `max-w-3xl mb-12 md:mb-16 ${alignments}`;
  }
}

