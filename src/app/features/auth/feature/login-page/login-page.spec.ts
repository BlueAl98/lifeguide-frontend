import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginPage } from './login-page';

describe('LoginPage', () => {
  it('renders the hero and the login form', async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(LoginPage);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('lg-auth-hero')).toBeTruthy();
    expect(el.querySelector('lg-login-form h1')?.textContent).toBe('Bienvenido de nuevo');
  });
});
