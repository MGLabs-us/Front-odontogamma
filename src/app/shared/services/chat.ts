import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { I18nService } from '../../core/i18n/i18n.service';
import { LANG_HTML } from '../../core/i18n/languages';

export interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
  /** Si existe, el mensaje es una cadena fija del diccionario y se traduce al idioma activo (saludo, error). */
  key?: string;
}

interface ChatResponse {
  reply: string;
  remaining?: number;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly i18n = inject(I18nService);
  private readonly sessionId = crypto.randomUUID();

  readonly messages = signal<ChatMessage[]>([
    { from: 'bot', text: '', key: 'chat.greeting' },
  ]);
  readonly isOpen = signal(false);
  readonly isSending = signal(false);

  /** Verdadero cuando la persona ya abrió el chat alguna vez: deja de llamar la atención. */
  readonly hasBeenOpened = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
    if (this.isOpen()) this.markOpened();
  }

  /** Abre el chat desde cualquier parte del sitio (por ejemplo, la tarjeta de Contacto). */
  open() {
    this.isOpen.set(true);
    this.markOpened();
  }

  /** Lo recuerda en el navegador para no volver a insistir con el brillo y el aviso. */
  markOpened() {
    this.hasBeenOpened.set(true);
    try {
      globalThis.localStorage?.setItem('og-chat-opened', '1');
    } catch {
      /* almacenamiento no disponible */
    }
  }

  send(text: string) {
    if (this.isSending()) return;
    this.messages.update((m) => [...m, { from: 'user', text }]);
    this.isSending.set(true);

    const { chatUrl, anonKey } = environment.supabase;
    this.http
      .post<ChatResponse>(
        chatUrl,
        { message: text, sessionId: this.sessionId, language: LANG_HTML[this.i18n.lang()] },
        { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } },
      )
      .subscribe({
        next: (res) => (res.reply ? this.reply(res.reply) : this.replyFallback()),
        error: () => this.replyFallback(),
      });
  }

  private reply(text: string) {
    this.messages.update((m) => [...m, { from: 'bot', text }]);
    this.isSending.set(false);
  }

  /** Mensaje de respaldo traducido: se guarda como clave para que siga el idioma activo. */
  private replyFallback() {
    this.messages.update((m) => [...m, { from: 'bot', text: '', key: 'chat.fallback' }]);
    this.isSending.set(false);
  }
}
