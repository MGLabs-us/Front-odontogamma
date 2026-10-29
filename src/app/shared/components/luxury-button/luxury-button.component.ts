import { Component, input, output, ChangeDetectionStrategy, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArrowMarkComponent } from '../arrow-mark/arrow-mark.component';

/**
 * Botón de marca para navegación y acciones principales.
 * Soporta navegación interna (routerLink), externa (href) o disparador de eventos (clicked).
 * Utiliza un único slot de proyección (<ng-content />) para evitar la pérdida de texto en Angular.
 */
@Component({
  selector: 'app-luxury-button',
  standalone: true,
  imports: [CommonModule, RouterLink, ArrowMarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'inline-block rounded-full'
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
        @if (arrow()) {
          <span class="og-button__arrow" aria-hidden="true">
            <app-arrow-mark />
          </span>
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
  public readonly arrow = input<boolean>(false);

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
    return [
      'og-button',
      `og-button--${this.variant()}`,
      `og-button--${this.size()}`,
      this.disabled() ? 'og-button--disabled' : '',
    ].filter(Boolean).join(' ');
  }
}
