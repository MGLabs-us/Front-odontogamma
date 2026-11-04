import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { TranslocoService } from '@jsverse/transloco';
import { provideI18n } from '../../core/i18n/provide-i18n';
import { I18nService } from '../../core/i18n/i18n.service';
import { ChatService } from './chat';

describe('ChatService', () => {
  let service: ChatService;
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideI18n()],
    });
    await TestBed.inject(TranslocoService).load('es').toPromise();
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

  it('envía el idioma activo al backend', async () => {
    const i18n = TestBed.inject(I18nService);
    await TestBed.inject(TranslocoService).load('en-gb').toPromise();
    i18n.setLang('en-gb');
    service.send('Hello');
    const req = http.expectOne(environment.supabase.chatUrl);
    expect(req.request.body.language).toBe('en-GB');
    req.flush({ reply: 'Hi' });
  });

  it('el saludo y el mensaje de respaldo se traducen según el idioma', async () => {
    const i18n = TestBed.inject(I18nService);
    const transloco = TestBed.inject(TranslocoService);
    await transloco.load('es').toPromise();
    await transloco.load('en-us').toPromise();

    const greeting = service.messages()[0];
    expect(greeting.key).toBe('chat.greeting');
    i18n.setLang('es');
    expect(i18n.t(greeting.key!)).toContain('Hola');
    i18n.setLang('en-us');
    expect(i18n.t(greeting.key!)).toContain('Hi!');
  });
});
