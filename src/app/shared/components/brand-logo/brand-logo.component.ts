import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BrandLogoVariant = 'navbar' | 'footer' | 'full' | 'hero';

/**
 * Componente oficial del Logotipo de Odontogamma Oriente.
 * 
 * Estructura del Emblema:
 * 1. Isotipo Superior: Muelita anatómica estilizada en el centro, flanqueada por
 *    alas dinámicas aerodinámicas en doble trazo curvado (superior e inferior).
 * 2. Tipografía Principal: "ODONTOGAMMA" en mayúsculas con espaciado editorial romano (Cinzel).
 * 3. Línea Divisoria Central: Trazos horizontales enmarcando "ORIENTE".
 * 4. Subtítulo: "Dr. Jaime Arcila Cano" con tipografía refinada.
 */
@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="inline-flex flex-col items-center select-none transition-all duration-300 group"
      [ngClass]="getContainerClasses()"
    >
      <!-- ==================== ISOTIPO: MUELITA ENCIMA CON ALAS ==================== -->
      <div class="relative w-full flex justify-center items-center shrink-0 transition-transform duration-300 group-hover:scale-[1.03]">
        <svg
          viewBox="0 0 280 88"
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-auto overflow-visible"
          [ngClass]="getSvgClasses()"
          aria-hidden="true"
        >
          <defs>
            <!-- Gradiente para el modo cromático de la marca -->
            <linearGradient id="ogBrandLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" [attr.stop-color]="theme === 'light' ? '#0072CE' : '#FFFFFF'" />
              <stop offset="60%" [attr.stop-color]="theme === 'light' ? '#104B96' : '#E0F2FE'" />
              <stop offset="100%" [attr.stop-color]="theme === 'light' ? '#0B356D' : (monochrome ? '#FFFFFF' : '#29B6F6')" />
            </linearGradient>

            <linearGradient id="ogWingLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" [attr.stop-color]="theme === 'light' ? '#29B6F6' : (monochrome ? '#FFFFFF' : '#29B6F6')" [attr.stop-opacity]="theme === 'light' ? '0.7' : (monochrome ? '0.4' : '0.25')" />
              <stop offset="60%" [attr.stop-color]="theme === 'light' ? '#0072CE' : '#BAE6FD'" />
              <stop offset="100%" [attr.stop-color]="theme === 'light' ? '#104B96' : '#FFFFFF'" />
            </linearGradient>

            <linearGradient id="ogWingRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" [attr.stop-color]="theme === 'light' ? '#104B96' : '#FFFFFF'" />
              <stop offset="40%" [attr.stop-color]="theme === 'light' ? '#0072CE' : '#BAE6FD'" />
              <stop offset="100%" [attr.stop-color]="theme === 'light' ? '#29B6F6' : (monochrome ? '#FFFFFF' : '#29B6F6')" [attr.stop-opacity]="theme === 'light' ? '0.7' : (monochrome ? '0.4' : '0.25')" />
            </linearGradient>

            <filter id="ogLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" [attr.flood-color]="theme === 'light' ? '#0072CE' : (monochrome ? '#FFFFFF' : '#29B6F6')" [attr.flood-opacity]="theme === 'light' ? '0.2' : (monochrome ? '0.25' : '0.4')" />
            </filter>
          </defs>

          <g filter="url(#ogLogoGlow)">
            <!-- ==================== ALAS SUPERIORES ==================== -->
            <!-- Ala Superior Izquierda (curva aerodinámica que termina en punta afilada) -->
            <path
              d="M 120 31 
                 C 82 23, 40 25, 6 32 
                 C 45 28, 86 27, 122 37 Z"
              [attr.fill]="monochrome ? '#FFFFFF' : 'url(#ogWingLeft)'"
            />

            <!-- Ala Superior Derecha (simétrica) -->
            <path
              d="M 160 31 
                 C 198 23, 240 25, 274 32 
                 C 235 28, 194 27, 158 37 Z"
              [attr.fill]="monochrome ? '#FFFFFF' : 'url(#ogWingRight)'"
            />

            <!-- ==================== ALAS INFERIORES ==================== -->
            <!-- Ala Inferior Izquierda -->
            <path
              d="M 124 44 
                 C 90 40, 56 42, 26 47 
                 C 60 43, 94 43, 126 50 Z"
              [attr.fill]="monochrome ? '#FFFFFF' : 'url(#ogWingLeft)'"
              opacity="0.9"
            />

            <!-- Ala Inferior Derecha -->
            <path
              d="M 156 44 
                 C 190 40, 224 42, 254 47 
                 C 220 43, 186 43, 154 50 Z"
              [attr.fill]="monochrome ? '#FFFFFF' : 'url(#ogWingRight)'"
              opacity="0.9"
            />

            <!-- ==================== MUELITA CENTRAL (Diente Anatómico) ==================== -->
            <!-- Contorno exterior sólido y silueta anatómica con apertura interior -->
            <path
              fill-rule="evenodd"
              d="M 140 7
                 C 133 3, 125 5, 123 15
                 C 121 24, 124 33, 127 45
                 C 129 55, 131 67, 133 69
                 C 135 70, 137 61, 138 52
                 C 139 44, 140 40, 140 40
                 C 140 40, 141 44, 142 52
                 C 143 61, 145 70, 147 69
                 C 149 67, 151 55, 153 45
                 C 156 33, 159 24, 157 15
                 C 155 5, 147 3, 140 7 Z
                 
                 M 140 14
                 C 145 10, 150 11, 151 18
                 C 152 25, 150 34, 147 42
                 C 145 49, 144 54, 143 57
                 C 143 54, 142 46, 141 41
                 C 140 37, 140 37, 139 41
                 C 138 46, 137 54, 137 57
                 C 136 54, 135 49, 133 42
                 C 130 34, 128 25, 129 18
                 C 130 11, 135 10, 140 14 Z"
              [attr.fill]="monochrome ? '#FFFFFF' : 'url(#ogBrandLogoGrad)'"
            />
          </g>
        </svg>
      </div>

      <!-- ==================== BLOQUE TIPOGRÁFICO ==================== -->
      <!-- Nombre Principal ODONTOGAMMA -->
      <span
        class="font-cinzel font-bold uppercase tracking-[0.24em] leading-none transition-colors duration-300 drop-shadow-xs text-center"
        [ngClass]="[getTitleClasses(), theme === 'light' ? 'text-og-headline group-hover:text-og-electric' : 'text-white group-hover:text-og-cyan']"
      >
        ODONTOGAMMA
      </span>

      <!-- Línea con ORIENTE centrada -->
      <div class="flex items-center justify-center gap-2 w-full mt-1 sm:mt-1.5">
        <span class="h-[1px] flex-1" [ngClass]="theme === 'light' ? 'bg-gradient-to-r from-transparent via-og-deep/40 to-og-deep/70' : 'bg-gradient-to-r from-transparent via-white/80 to-white/90'"></span>
        <span
          class="font-cinzel uppercase font-semibold tracking-[0.42em] leading-none"
          [ngClass]="[getSubtitleClasses(), theme === 'light' ? 'text-og-deep' : 'text-white']"
        >
          ORIENTE
        </span>
        <span class="h-[1px] flex-1" [ngClass]="theme === 'light' ? 'bg-gradient-to-l from-transparent via-og-deep/40 to-og-deep/70' : 'bg-gradient-to-l from-transparent via-white/80 to-white/90'"></span>
      </div>
    </div>
  `
})
export class BrandLogoComponent {
  @Input() variant: BrandLogoVariant = 'navbar';
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() monochrome = false;

  getContainerClasses(): string {
    switch (this.variant) {
      case 'navbar':
        return 'w-36 sm:w-44 md:w-50 py-0.5';
      case 'footer':
        return 'w-52 sm:w-60 md:w-64 py-1';
      case 'hero':
      case 'full':
        return 'w-64 sm:w-72 md:w-84 py-2';
      default:
        return 'w-44';
    }
  }

  getSvgClasses(): string {
    switch (this.variant) {
      case 'navbar':
        return 'max-h-7 sm:max-h-8 md:max-h-9 mb-1';
      case 'footer':
        return 'max-h-9 sm:max-h-11 md:max-h-12 mb-1.5';
      case 'hero':
      case 'full':
        return 'max-h-12 sm:max-h-14 md:max-h-16 mb-2';
      default:
        return 'max-h-8 mb-1';
    }
  }

  getTitleClasses(): string {
    switch (this.variant) {
      case 'navbar':
        return 'text-xs sm:text-sm md:text-base';
      case 'footer':
        return 'text-base sm:text-lg md:text-xl';
      case 'hero':
      case 'full':
        return 'text-xl sm:text-2xl md:text-3xl';
      default:
        return 'text-sm';
    }
  }

  getSubtitleClasses(): string {
    switch (this.variant) {
      case 'navbar':
        return 'text-[8px] sm:text-[9px] md:text-[10px]';
      case 'footer':
        return 'text-[9px] sm:text-[10px] md:text-xs';
      case 'hero':
      case 'full':
        return 'text-xs sm:text-sm';
      default:
        return 'text-[9px]';
    }
  }
}

