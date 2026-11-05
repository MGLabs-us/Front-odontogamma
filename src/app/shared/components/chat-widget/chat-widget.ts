import { Component, DestroyRef, ElementRef, afterNextRender, afterRenderEffect, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { ChatService } from '../../services/chat';

@Component({
  selector: 'app-chat-widget',
  imports: [FormsModule, TranslocoPipe],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.css',
})
export class ChatWidget {
  chat = inject(ChatService);
  draft = signal('');
  private readonly messagesEl = viewChild<ElementRef<HTMLElement>>('messagesEl');

  /** Aviso que señala el botón unos segundos después de entrar al sitio. */
  protected readonly teaserVisible = signal(false);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      // Se muestra en cada visita nada más cargar y se oculta a los 7 s.
      this.teaserVisible.set(true);
      const hide = setTimeout(() => this.teaserVisible.set(false), 7000);
      this.destroyRef.onDestroy(() => clearTimeout(hide));
    });

    // Mantiene a la vista el último mensaje y el indicador de "escribiendo".
    afterRenderEffect(() => {
      this.chat.messages();
      this.chat.isSending();
      const el = this.messagesEl()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  send() {
    const text = this.draft().trim();
    if (!text) return;
    this.chat.send(text);
    this.draft.set('');
  }

  protected dismissTeaser() {
    this.teaserVisible.set(false);
  }

  protected openFromTeaser() {
    this.dismissTeaser();
    this.chat.open();
  }
}
