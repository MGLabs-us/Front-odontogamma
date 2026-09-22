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
        <span class="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-og-electric mb-3 font-mono">
          {{ kicker() }}
        </span>
      }

      <h2 class="text-4xl sm:text-5xl md:text-6xl font-editorial font-medium tracking-tight text-slate-900 leading-[1.12] mb-5">
        {{ title() }}
      </h2>

      @if (subtitle()) {
        <p class="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl" [class.mx-auto]="align() === 'center'">
          {{ subtitle() }}
        </p>
      }

      <!-- Línea de acento sutil opcional -->
      @if (showDivider()) {
        <div class="mt-6 h-[1.5px] w-20 bg-gradient-to-r from-og-electric to-transparent" [class.mx-auto]="align() === 'center'"></div>
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

