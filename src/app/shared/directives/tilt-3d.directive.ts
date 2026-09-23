import {
  Directive,
  ElementRef,
  Renderer2,
  NgZone,
  OnInit,
  OnDestroy,
  inject,
  input,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Directiva interactiva 3D Tilt con física elástica, reflejo especular (glare)
 * y aceleración por GPU. Diseñada para dar vida y dimensión espacial a tarjetas,
 * marcos fotográficos y videos sin comprometer rendimiento (60 FPS fuera de Angular Zone).
 */
@Directive({
  selector: '[appTilt3d]',
  standalone: true
})
export class Tilt3dDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  // Parámetros de configuración reactivos mediante Signals
  public readonly maxTilt = input<number>(10);
  public readonly perspective = input<number>(1000);
  public readonly scale = input<number>(1.02);
  public readonly speed = input<number>(400);
  public readonly glare = input<boolean>(true);
  public readonly glareMaxOpacity = input<number>(0.2);
  public readonly reverse = input<boolean>(false);

  private glareElement: HTMLElement | null = null;
  private isHovered = false;
  private rafId: number | null = null;
  private unlistenMouseMove: (() => void) | null = null;
  private unlistenMouseEnter: (() => void) | null = null;
  private unlistenMouseLeave: (() => void) | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Solo habilitar en dispositivos con puntero hover para evitar interferir con gestos móviles
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const nativeEl = this.el.nativeElement;

    // Configurar propiedades CSS base de aceleración 3D
    this.renderer.setStyle(nativeEl, 'transform-style', 'preserve-3d');
    this.renderer.setStyle(nativeEl, 'will-change', 'transform');
    this.renderer.setStyle(
      nativeEl,
      'transition',
      `transform ${this.speed()}ms cubic-bezier(0.16, 1, 0.3, 1)`
    );

    // Crear capa de reflejo especular (glare) si está habilitado
    if (this.glare()) {
      this.initGlare(nativeEl);
    }

    // Registrar oyentes fuera de NgZone para máxima fluidez a 60 FPS
    this.ngZone.runOutsideAngular(() => {
      this.unlistenMouseEnter = this.renderer.listen(nativeEl, 'mouseenter', () => this.onMouseEnter());
      this.unlistenMouseMove = this.renderer.listen(nativeEl, 'mousemove', (e: MouseEvent) => this.onMouseMove(e));
      this.unlistenMouseLeave = this.renderer.listen(nativeEl, 'mouseleave', () => this.onMouseLeave());
    });
  }

  ngOnDestroy(): void {
    if (this.rafId !== null && isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.rafId);
    }
    this.unlistenMouseEnter?.();
    this.unlistenMouseMove?.();
    this.unlistenMouseLeave?.();
    if (this.glareElement?.parentElement) {
      this.glareElement.parentElement.removeChild(this.glareElement);
    }
  }

  private initGlare(parentEl: HTMLElement): void {
    const glareWrapper = this.renderer.createElement('div') as HTMLElement;
    this.renderer.addClass(glareWrapper, 'tilt-glare-wrapper');
    this.renderer.setStyle(glareWrapper, 'position', 'absolute');
    this.renderer.setStyle(glareWrapper, 'inset', '0');
    this.renderer.setStyle(glareWrapper, 'overflow', 'hidden');
    this.renderer.setStyle(glareWrapper, 'border-radius', 'inherit');
    this.renderer.setStyle(glareWrapper, 'pointer-events', 'none');
    this.renderer.setStyle(glareWrapper, 'z-index', '25');

    this.glareElement = this.renderer.createElement('div') as HTMLElement;
    this.renderer.addClass(this.glareElement, 'tilt-glare-inner');
    this.renderer.setStyle(this.glareElement, 'position', 'absolute');
    this.renderer.setStyle(this.glareElement, 'width', '200%');
    this.renderer.setStyle(this.glareElement, 'height', '200%');
    this.renderer.setStyle(this.glareElement, 'left', '-50%');
    this.renderer.setStyle(this.glareElement, 'top', '-50%');
    this.renderer.setStyle(
      this.glareElement,
      'background',
      'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(41,182,246,0.18) 35%, transparent 70%)'
    );
    this.renderer.setStyle(this.glareElement, 'opacity', '0');
    this.renderer.setStyle(this.glareElement, 'transform', 'translate3d(0, 0, 0)');
    this.renderer.setStyle(
      this.glareElement,
      'transition',
      `opacity ${this.speed()}ms cubic-bezier(0.16, 1, 0.3, 1)`
    );

    this.renderer.appendChild(glareWrapper, this.glareElement);
    this.renderer.appendChild(parentEl, glareWrapper);
  }

  private onMouseEnter(): void {
    this.isHovered = true;
    const nativeEl = this.el.nativeElement;
    // Transición rápida durante el seguimiento del cursor
    this.renderer.setStyle(nativeEl, 'transition', 'transform 100ms ease-out');
    if (this.glareElement) {
      this.renderer.setStyle(this.glareElement, 'opacity', this.glareMaxOpacity().toString());
    }
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isHovered) return;

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      const nativeEl = this.el.nativeElement;
      const rect = nativeEl.getBoundingClientRect();
      const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);

      const xOffset = (x - 0.5) * 2; // -1 to 1
      const yOffset = (y - 0.5) * 2; // -1 to 1

      const factor = this.reverse() ? -1 : 1;
      const rotateX = (-yOffset * this.maxTilt() * factor).toFixed(2);
      const rotateY = (xOffset * this.maxTilt() * factor).toFixed(2);
      const scaleVal = this.scale();

      nativeEl.style.transform = `perspective(${this.perspective()}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleVal}, ${scaleVal}, ${scaleVal})`;

      // Variables CSS reactivas para capas con brillo dinámico
      nativeEl.style.setProperty('--mouse-x', `${(x * 100).toFixed(1)}%`);
      nativeEl.style.setProperty('--mouse-y', `${(y * 100).toFixed(1)}%`);

      if (this.glareElement) {
        const glareX = (x * 100 - 50).toFixed(1);
        const glareY = (y * 100 - 50).toFixed(1);
        this.glareElement.style.transform = `translate3d(${glareX}%, ${glareY}%, 0)`;
      }
    });
  }

  private onMouseLeave(): void {
    this.isHovered = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    const nativeEl = this.el.nativeElement;
    // Regreso elástico suave a la posición neutra
    this.renderer.setStyle(
      nativeEl,
      'transition',
      `transform ${this.speed()}ms cubic-bezier(0.16, 1, 0.3, 1)`
    );
    nativeEl.style.transform = `perspective(${this.perspective()}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

    if (this.glareElement) {
      this.renderer.setStyle(this.glareElement, 'opacity', '0');
    }
  }
}

