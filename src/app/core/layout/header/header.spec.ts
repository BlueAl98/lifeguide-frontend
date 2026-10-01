import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the brand, nav links and login link', async () => {
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('.name')?.textContent).toBe('Lifeguide');
    const labels = [...el.querySelectorAll('.nav-link')].map((a) => a.textContent?.trim());
    expect(labels).toEqual(['Inicio']);
    expect(el.querySelector('.login')?.getAttribute('href')).toBe('/login');
  });

  it('toggles the mobile menu', async () => {
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const toggle = el.querySelector<HTMLButtonElement>('.menu-toggle')!;

    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('.menu')?.classList).toContain('open');

    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('turns compact once the page scrolls', async () => {
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList).not.toContain('scrolled');

    Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    expect(host.classList).toContain('scrolled');

    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });
});
