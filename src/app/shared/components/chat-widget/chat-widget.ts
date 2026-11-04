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
      let opened = false;
      let dismissed = false;
      try {
        opened = globalThis.localStorage?.getItem('og-chat-opened') === '1';
        dismissed = globalThis.sessionStorage?.getItem('og-chat-teaser') === '1';
      } catch {
        /* almacenamiento no disponible */
      }
      if (opened) {
        this.chat.hasBeenOpened.set(true);
        return;
      }
      if (dismissed) return;
      const show = setTimeout(() => this.teaserVisible.set(true), 4500);
      const hide = setTimeout(() => this.teaserVisible.set(false), 22000);
      this.destroyRef.onDestroy(() => {
        clearTimeout(show);
        clearTimeout(hide);
      });
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
    try {
      globalThis.sessionStorage?.setItem('og-chat-teaser', '1');
    } catch {
      /* almacenamiento no disponible */
    }
  }

  protected openFromTeaser() {
    this.dismissTeaser();
    this.chat.open();
  }
}
