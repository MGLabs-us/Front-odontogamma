import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Botón con microinteracción y acabados de lujo editorial.
 * Soporta navegación interna (routerLink), externa (href) o disparador de eventos (clicked).
 */
@Component({
  selector: 'app-luxury-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (routerLink()) {
      <a
        [routerLink]="routerLink()"
        [class]="buttonClasses()"
      >
        <span class="relative z-10 flex items-center justify-center gap-2">
          <ng-content />
        </span>
      </a>
    } @else if (href()) {
      <a
        [href]="href()"
        [target]="target()"
        rel="noopener noreferrer"
        [class]="buttonClasses()"
      >
        <span class="relative z-10 flex items-center justify-center gap-2">
          <ng-content />
        </span>
      </a>
    } @else {
      <button
        type="button"
        [disabled]="disabled()"
        (click)="clicked.emit($event)"
        [class]="buttonClasses()"
      >
        <span class="relative z-10 flex items-center justify-center gap-2">
          <ng-content />
        </span>
      </button>
    }
  `
})
export class LuxuryButtonComponent {
  // Entradas tipadas con Signals de Angular
  public readonly variant = input<'primary' | 'secondary' | 'outline' | 'dark'>('primary');
  public readonly size = input<'sm' | 'md' | 'lg'>('md');
  public readonly routerLink = input<string | any[] | null>(null);
  public readonly href = input<string | null>(null);
  public readonly target = input<string>('_self');
  public readonly disabled = input<boolean>(false);

  // Emisor de evento al hacer clic
  public readonly clicked = output<MouseEvent>();

  /**
   * Clases dinámicas calculadas según variante y tamaño
   */
  protected buttonClasses(): string {
    const base = 'group relative inline-flex items-center justify-center font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 overflow-hidden cursor-pointer select-none text-center';

    const sizeClasses = {
      sm: 'px-5 py-2.5 text-[10px] rounded-xs',
      md: 'px-8 py-3.5 text-xs rounded-xs',
      lg: 'px-10 py-4 text-xs md:text-sm tracking-[0.25em] rounded-xs'
    }[this.size()];

    const variantClasses = {
      // Azul eléctrico característico de Odontogamma con elevación
      primary: 'bg-og-electric text-white hover:bg-og-deep shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
      // Azul oscuro / noche editorial
      dark: 'bg-og-deep text-white hover:bg-og-electric shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
      // Fondo blanco mármol
      secondary: 'bg-white text-og-deep border border-og-border hover:border-og-electric hover:text-og-electric shadow-sm hover:shadow-md hover:-translate-y-0.5',
      // Borde transparente fino estilo alta costura
      outline: 'bg-transparent text-og-deep border border-og-deep/30 hover:border-og-electric hover:text-og-electric hover:-translate-y-0.5'
    }[this.variant()];

    const stateClasses = this.disabled() ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

    return `${base} ${sizeClasses} ${variantClasses} ${stateClasses}`;
  }
}

