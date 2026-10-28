import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { VideoAsset } from '../../../core/constants/cloudinary-assets.manifest';

/**
 * Carrusel horizontal de videos verticales (formato reel) con reproducción bajo demanda.
 * Muestra el póster de cada video y solo carga el archivo cuando la persona pulsa reproducir,
 * así que únicamente un video está activo a la vez.
 */
@Component({
  selector: 'app-video-reel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="reel-track flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0"
      role="list"
    >
      @for (item of videos(); track item.id) {
        <article
          role="listitem"
          class="reel-card group relative shrink-0 snap-start w-[68vw] sm:w-60 lg:w-64 aspect-[9/16] overflow-hidden rounded-2xl bg-og-dark border border-white/10 shadow-elevated"
        >
          @if (activeId() === item.id) {
            <video
              [src]="item.videoUrl"
              [poster]="item.posterUrl"
              [attr.aria-label]="item.title"
              class="absolute inset-0 w-full h-full object-cover bg-black"
              controls
              autoplay
              playsinline
              (ended)="activeId.set(null)"
            ></video>
          } @else {
            <button
              type="button"
              class="absolute inset-0 w-full h-full text-left cursor-pointer"
              [attr.aria-label]="'Reproducir video: ' + item.title"
              (click)="activeId.set(item.id)"
            >
              <img
                [src]="item.posterUrl"
                [alt]="item.title"
                loading="lazy"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span class="absolute inset-0 bg-gradient-to-t from-og-dark/90 via-og-dark/10 to-og-dark/20"></span>

              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 text-og-dark flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
              >
                <svg class="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14Z" />
                </svg>
              </span>

              <span class="absolute inset-x-0 bottom-0 p-4 text-white">
                <span class="block text-sm font-editorial font-medium leading-snug">{{ item.title }}</span>
                <span class="block text-[11px] text-white/75 font-light leading-snug mt-1">{{ item.caption }}</span>
              </span>
            </button>
          }
        </article>
      }
    </div>
  `,
  styles: `
    .reel-track {
      scrollbar-width: thin;
      scrollbar-color: rgb(183 207 210 / 55%) transparent;
      /* Centra las tarjetas cuando caben; si desbordan, se alinean al inicio para poder hacer scroll */
      justify-content: safe center;
    }
  `
})
export class VideoReelComponent {
  public readonly videos = input.required<readonly VideoAsset[]>();

  protected readonly activeId = signal<string | null>(null);
}
