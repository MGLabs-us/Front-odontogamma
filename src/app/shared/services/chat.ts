import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
}

interface ChatResponse {
  reply: string;
  remaining?: number;
}

const FALLBACK_REPLY =
  'No pude responder en este momento. Escríbenos por WhatsApp o a marketingodontogamma@gmail.com';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly sessionId = crypto.randomUUID();

  readonly messages = signal<ChatMessage[]>([
    { from: 'bot', text: '¡Hola! ¿En qué te puedo ayudar?' },
  ]);
  readonly isOpen = signal(false);
  readonly isSending = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }

  send(text: string) {
    if (this.isSending()) return;
    this.messages.update((m) => [...m, { from: 'user', text }]);
    this.isSending.set(true);

    const { chatUrl, anonKey } = environment.supabase;
    this.http
      .post<ChatResponse>(
        chatUrl,
        { message: text, sessionId: this.sessionId },
        { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } },
      )
      .subscribe({
        next: (res) => this.reply(res.reply || FALLBACK_REPLY),
        error: () => this.reply(FALLBACK_REPLY),
      });
  }

  private reply(text: string) {
    this.messages.update((m) => [...m, { from: 'bot', text }]);
    this.isSending.set(false);
  }
}
