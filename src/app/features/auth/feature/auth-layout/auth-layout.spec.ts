import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import authRoutes from '../../auth.routes';

describe('AuthLayout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(authRoutes)] });
  });

  it('keeps the hero and shows the login card on /login', async () => {
    const harness = await RouterTestingHarness.create('/login');
    const el: HTMLElement = harness.routeNativeElement!.parentElement!;

    expect(el.querySelector('lg-auth-hero')).toBeTruthy();
    expect(el.querySelector('lg-login-form')).toBeTruthy();
  });

  it('swaps to the register card on /registro', async () => {
    const harness = await RouterTestingHarness.create('/registro');
    const el: HTMLElement = harness.routeNativeElement!.parentElement!;

    expect(el.querySelector('lg-auth-hero')).toBeTruthy();
    expect(el.querySelector('lg-register-form h1')?.textContent).toBe('Crea tu cuenta');
    expect(el.querySelector('lg-login-form')).toBeNull();
  });
});
