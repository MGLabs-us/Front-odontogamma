import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { provideI18n } from '../../../core/i18n/provide-i18n';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent (menús de escritorio)', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let el: HTMLElement;

  const groups = () => Array.from(el.querySelectorAll<HTMLElement>('.nav-group'));
  const open = () => groups().filter(g => g.classList.contains('is-open'));
  const detect = () => fixture.detectChanges();
  const enter = (g: HTMLElement) => { g.dispatchEvent(new Event('mouseenter')); detect(); };
  const leave = (g: HTMLElement) => { g.dispatchEvent(new Event('mouseleave')); detect(); };
  const click = (node: Element) => { node.dispatchEvent(new MouseEvent('click', { bubbles: true })); detect(); };
  const trigger = (g: HTMLElement) => g.querySelector('button.nav-link')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([{ path: '**', children: [] }]), provideI18n()]
    }).compileComponents();
    await TestBed.inject(TranslocoService).load('en-us').toPromise();
    TestBed.inject(I18nService).setLang('en-us');
    fixture = TestBed.createComponent(NavbarComponent);
    el = fixture.nativeElement;
    document.body.appendChild(el);
    detect();
  });

  afterEach(() => el.remove());

  it('el hover abre un menú y al salir se cierra', () => {
    const [first] = groups();
    enter(first);
    expect(open()).toEqual([first]);
    leave(first);
    expect(open()).toEqual([]);
  });

  it('un clic fija el menú y otro clic sobre el mismo lo cierra', () => {
    const [first] = groups();
    click(trigger(first));
    leave(first);
    expect(open()).toEqual([first]);
    click(trigger(first));
    expect(open()).toEqual([]);
  });

  it('con un menú fijado el hover de los demás no hace nada', () => {
    const [first, second] = groups();
    click(trigger(first));
    enter(second);
    expect(open()).toEqual([first]);
    leave(second);
    expect(open()).toEqual([first]);
  });

  it('al elegir una opción se cierran los menús', () => {
    const [first] = groups();
    click(trigger(first));
    click(first.querySelector('.nav-dropdown-item')!);
    expect(open()).toEqual([]);
  });

  it('un clic fuera del menú lo cierra', () => {
    const [first] = groups();
    click(trigger(first));
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    detect();
    expect(open()).toEqual([]);
  });

  it('Escape cierra el menú fijado', () => {
    const [first] = groups();
    click(trigger(first));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    detect();
    expect(open()).toEqual([]);
  });
});
