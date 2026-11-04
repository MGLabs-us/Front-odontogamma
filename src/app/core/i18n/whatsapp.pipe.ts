import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from './i18n.service';

export const WHATSAPP_NUMBER = '573217209420';

/**
 * Los enlaces de WhatsApp están apagados: el número de arriba es provisional y no es el que irá en el sitio.
 * Los botones y los logos se conservan, pero no llevan a ninguna parte. Para reactivarlos, poner el número
 * correcto en `WHATSAPP_NUMBER` y cambiar esto a `true`.
 */
export const WHATSAPP_ENABLED = false;

/** Enlace de WhatsApp con un texto ya traducido. */
export const whatsappUrl = (text: string): string | null =>
  WHATSAPP_ENABLED ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}` : null;

/**
 * Enlace de WhatsApp con el mensaje precargado en el idioma activo:
 * `[href]="'whatsapp.appointment' | whatsapp"` o `'whatsapp.treatment' | whatsapp: { title: item.title }`.
 * Impura a propósito para recalcularse al cambiar de idioma.
 */
@Pipe({ name: 'whatsapp', standalone: true, pure: false })
export class WhatsappPipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  public transform(key: string, params?: Record<string, unknown>): string | null {
    return whatsappUrl(this.i18n.t(key, params));
  }
}
