import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslocoService } from '@jsverse/transloco';
import { provideI18n } from '../../../core/i18n/provide-i18n';
import { ChatWidget } from './chat-widget';

describe('ChatWidget', () => {
  let component: ChatWidget;
  let fixture: ComponentFixture<ChatWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWidget],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideI18n()],
    }).compileComponents();

    await TestBed.inject(TranslocoService).load('en-us').toPromise();
    fixture = TestBed.createComponent(ChatWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
