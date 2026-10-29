import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { ChatService } from './chat';

describe('ChatService', () => {
  let service: ChatService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChatService);
    http = TestBed.inject(HttpTestingController);
  });

  it('envía el mensaje con sessionId y agrega la respuesta', () => {
    service.send('Hola');
    const req = http.expectOne(environment.supabase.chatUrl);
    expect(req.request.body.message).toBe('Hola');
    expect(req.request.body.sessionId).toBeTruthy();
    expect(req.request.headers.get('apikey')).toBe(environment.supabase.anonKey);
    req.flush({ reply: 'Buenas', remaining: 19 });

    expect(service.messages().at(-1)).toEqual({ from: 'bot', text: 'Buenas' });
    expect(service.isSending()).toBe(false);
  });

  it('muestra un mensaje de respaldo si falla', () => {
    service.send('Hola');
    http.expectOne(environment.supabase.chatUrl).flush({ error: 'x' }, { status: 500, statusText: 'err' });

    expect(service.messages().at(-1)?.from).toBe('bot');
    expect(service.isSending()).toBe(false);
  });
});
