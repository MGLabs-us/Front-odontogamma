import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-chat-widget',
  imports: [IconComponent, FormsModule],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.css',
})
export class ChatWidget {
  chat = inject(ChatService);
  draft = signal('');

  send() {
    const text = this.draft().trim();
    if (!text) return;
    this.chat.send(text);
    this.draft.set('');
  }
}