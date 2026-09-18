import { Injectable, signal } from '@angular/core';

export interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  readonly messages = signal<ChatMessage[]>([
    { from: 'bot', text: '¡Hola! ¿En qué te puedo ayudar?' },
  ]);
  readonly isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }

  send(text: string) {
    this.messages.update(m => [...m, { from: 'user', text }]);
    setTimeout(() => {
      this.messages.update(m => [...m, { from: 'bot', text: 'Recibido 👍' }]);
    }, 500);
  }
}