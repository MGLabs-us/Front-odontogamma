import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
}

const SESSION_KEY = 'odg_chat_session';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);

  readonly messages = signal<ChatMessage[]>([
    { from: 'bot', text: 'Hi! 👋 How can I help you today?' },
  ]);
  readonly isOpen = signal(false);
  readonly isLoading = signal(false);

  private sessionId = this.loadSessionId();

  toggle() {
    this.isOpen.update((v) => !v);
  }

  private loadSessionId(): string {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) return saved;
      const fresh = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, fresh);
      return fresh;
    } catch {
      return crypto.randomUUID();
    }
  }

  async send(text: string) {
    this.messages.update((m) => [...m, { from: 'user', text }]);
    this.isLoading.set(true);

    try {
      const res = await firstValueFrom(
        this.http.post<{ reply: string }>(environment.chatUrl, {
          message: text,
          sessionId: this.sessionId,
        }),
      );

      this.messages.update((m) => [...m, { from: 'bot', text: res.reply }]);
    } catch (err) {
      console.error('Error en el chat:', err);
      this.messages.update((m) => [
        ...m,
        {
          from: 'bot',
          text: 'Sorry, we had a technical issue. Please write to contactus@odontogammaoriente.com.',
        },
      ]);
    } finally {
      this.isLoading.set(false);
    }
  }
}