import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Encabezado editorial compartido para secciones de contenido.
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
    return `og-eyebrow mb-3 ${this.theme() === 'dark' ? 'og-eyebrow--dark' : ''}`;
  }

  protected titleClasses(): string {
    return this.theme() === 'dark'
      ? 'font-editorial text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-white mb-5'
      : 'font-editorial text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-og-headline mb-5';
  }

  protected subtitleClasses(): string {
    return this.theme() === 'dark'
      ? 'text-base sm:text-lg text-white/75 font-normal leading-relaxed max-w-2xl'
      : 'text-base sm:text-lg text-og-slate font-normal leading-relaxed max-w-2xl';
  }

  protected dividerClasses(): string {
    return this.theme() === 'dark'
      ? 'og-section-divider og-section-divider--dark'
      : 'og-section-divider';
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
