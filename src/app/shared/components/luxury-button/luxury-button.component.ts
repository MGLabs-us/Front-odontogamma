import { Component, input, output, ChangeDetectionStrategy, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Botón con microinteracción y acabados de lujo editorial.
 * Soporta navegación interna (routerLink), externa (href) o disparador de eventos (clicked).
 * Utiliza un único slot de proyección (<ng-content />) para evitar la pérdida de texto en Angular.
 */
@Component({
  selector: 'app-luxury-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'inline-block'
  },
  template: `
    <a
      [routerLink]="routerLink() ? routerLink() : null"
      [href]="href() ? href() : null"
      [target]="href() ? target() : undefined"
      [rel]="href() ? 'noopener noreferrer' : null"
      [attr.role]="!isLink() ? 'button' : null"
      [attr.tabindex]="!isLink() ? 0 : null"
      [attr.aria-disabled]="disabled() ? true : null"
      [class]="buttonClasses()"
      (click)="handleClick($event)"
      (keydown.enter)="handleKeydown($event)"
      (keydown.space)="handleKeydown($event)"
    >
      <span
        class="relative z-10 flex items-center justify-center gap-2 font-semibold"
        [class.text-white]="variant() === 'primary' || variant() === 'dark'"
      >
        <ng-content />
        @if (label()) {
          <span>{{ label() }}</span>
        }
      </span>
    </a>
  `
})
export class LuxuryButtonComponent {
  // Entradas tipadas con Signals de Angular
  public readonly label = input<string>('');
  public readonly variant = input<'primary' | 'secondary' | 'outline' | 'dark'>('primary');
  public readonly size = input<'sm' | 'md' | 'lg'>('md');
  public readonly routerLink = input<string | any[] | null>(null);
  public readonly href = input<string | null>(null);
  public readonly target = input<string>('_self');
  public readonly disabled = input<boolean>(false);

  // Emisor de evento al hacer clic
  public readonly clicked = output<MouseEvent>();

  protected readonly isLink = computed(() => !!this.routerLink() || !!this.href());

  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!this.isLink()) {
      event.preventDefault();
      this.clicked.emit(event);
    }
  }

  protected handleKeydown(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    if (!this.isLink()) {
      event.preventDefault();
      this.clicked.emit(event as unknown as MouseEvent);
    }
  }

  /**
   * Clases dinámicas calculadas según variante y tamaño
   */
  protected buttonClasses(): string {
    const base = 'group relative inline-flex items-center justify-center font-sans uppercase tracking-wider font-semibold transition-all duration-300 overflow-hidden cursor-pointer select-none text-center w-full';

    const sizeClasses = {
      sm: 'px-5 py-2.5 text-xs rounded-full',
      md: 'px-8 py-3.5 text-xs sm:text-sm rounded-full',
      lg: 'px-10 py-4 text-sm sm:text-base rounded-full'
    }[this.size()];

    const variantClasses = {
      // Azul eléctrico característico de Odontogamma con elevación - LETRAS BLANCAS
      primary: 'bg-og-electric text-white hover:bg-slate-900 hover:text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
      // Noche editorial (Azul oscuro profundo) - LETRAS BLANCAS
      dark: 'bg-slate-950 text-white hover:bg-og-electric hover:text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
      // Fondo blanco mármol - LETRAS OSCURAS para contraste nítido sobre blanco
      secondary: 'bg-white text-slate-900 border border-slate-200 hover:border-og-electric hover:text-og-electric shadow-sm hover:shadow-md hover:-translate-y-0.5',
      // Borde transparente: hereda el color del contenedor (blanco en hero oscuro, oscuro en claro)
      outline: 'bg-transparent text-inherit border border-current hover:border-og-cyan hover:text-og-cyan hover:-translate-y-0.5'
    }[this.variant()];

    const stateClasses = this.disabled() ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

    return `${base} ${sizeClasses} ${variantClasses} ${stateClasses}`;
  }
}

