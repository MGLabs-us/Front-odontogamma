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
        <span [class]="kickerClasses()">
          {{ kicker() }}
        </span>
      }

      <h2 [class]="titleClasses()">
        {{ title() }}
      </h2>

      @if (subtitle()) {
        <p [class]="subtitleClasses()" [class.mx-auto]="align() === 'center'">
          {{ subtitle() }}
        </p>
      }

      <!-- Línea de acento sutil opcional -->
      @if (showDivider()) {
        <div [class]="dividerClasses()" [class.mx-auto]="align() === 'center'"></div>
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
  public readonly theme = input<'light' | 'dark'>('light');

  protected kickerClasses(): string {
    return this.theme() === 'dark'
      ? 'inline-block text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-white mb-3 font-mono'
      : 'inline-block text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-og-electric mb-3 font-mono';
  }

  protected titleClasses(): string {
    return this.theme() === 'dark'
      ? 'text-4xl sm:text-5xl md:text-6xl font-editorial font-medium tracking-tight text-white leading-[1.12] mb-5'
      : 'text-4xl sm:text-5xl md:text-6xl font-editorial font-medium tracking-tight text-slate-900 leading-[1.12] mb-5';
  }

  protected subtitleClasses(): string {
    return this.theme() === 'dark'
      ? 'text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl'
      : 'text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl';
  }

  protected dividerClasses(): string {
    return this.theme() === 'dark'
      ? 'mt-6 h-[1.5px] w-20 bg-gradient-to-r from-white/70 to-transparent'
      : 'mt-6 h-[1.5px] w-20 bg-gradient-to-r from-og-electric to-transparent';
  }

  protected wrapperClasses(): string {
    const alignments = {
      left: 'text-left',
      center: 'text-center mx-auto',
      right: 'text-right ml-auto'
    }[this.align()];

    return `max-w-3xl mb-12 md:mb-16 ${alignments}`;
  }
}

