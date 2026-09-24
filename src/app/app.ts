import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatWidget } from './shared/components/chat-widget/chat-widget';

/**
 * Componente raíz de la aplicación Odontogamma Oriente.
 * Actúa como punto de entrada montando el enrutador.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatWidget],
  template: '<router-outlet /><app-chat-widget />',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
