import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Comparador interactivo de Antes y Después con arrastre táctil y mouse.
 * Permite revelar el resultado del tratamiento con una línea divisoria fluida.
 */
@Component({
  selector: 'app-before-after-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './before-after-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeforeAfterSliderComponent {
  // Inputs tipados con Signals
  public readonly beforeImage = input.required<string>();
  public readonly afterImage = input.required<string>();
  public readonly beforeLabel = input<string>('Antes');
  public readonly afterLabel = input<string>('Después');
  public readonly aspectRatio = input<string>('aspect-[4/3]');
  public readonly alt = input<string>('Transformación dental Odontogamma');

  // Posición del divisor (0 a 100%)
  protected readonly sliderPosition = signal<number>(50);

  /**
   * Actualiza la posición del slider al deslizar
   */
  protected onRangeInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.sliderPosition.set(Number(target.value));
    }
  }
}
