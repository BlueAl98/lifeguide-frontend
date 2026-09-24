import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginFormValue, SocialProvider } from '../../domain/auth.models';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  let fixture: ComponentFixture<LoginForm>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginForm);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  function type(selector: string, value: string): void {
    const input = el.querySelector<HTMLInputElement>(selector)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  async function submitForm(): Promise<void> {
    el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();
  }

  it('shows errors and does not emit when the form is invalid', async () => {
    const emitted: LoginFormValue[] = [];
    fixture.componentInstance.submitted.subscribe((v) => emitted.push(v));

    await submitForm();

    expect(emitted).toEqual([]);
    expect(el.querySelector('#login-email-error')?.textContent).toContain('El correo es obligatorio');
    expect(el.querySelector('#login-password-error')?.textContent).toContain(
      'La contraseña es obligatoria',
    );
  });

  it('emits the form value when valid', async () => {
    const emitted: LoginFormValue[] = [];
    fixture.componentInstance.submitted.subscribe((v) => emitted.push(v));

    type('#login-email', 'ana@mail.com');
    type('#login-password', 'secreto123');
    await submitForm();

    expect(emitted).toEqual([{ email: 'ana@mail.com', password: 'secreto123', rememberMe: false }]);
  });

  it('toggles password visibility', async () => {
    const password = el.querySelector<HTMLInputElement>('#login-password')!;
    expect(password.type).toBe('password');

    el.querySelector<HTMLButtonElement>('.reveal')!.click();
    await fixture.whenStable();

    expect(password.type).toBe('text');
  });

  it('emits the chosen social provider', () => {
    const emitted: SocialProvider[] = [];
    fixture.componentInstance.socialLogin.subscribe((p) => emitted.push(p));

    el.querySelector<HTMLButtonElement>('[aria-label="Continuar con GitHub"]')!.click();

    expect(emitted).toEqual(['github']);
  });

  it('shows the server error and pending state from inputs', async () => {
    fixture.componentRef.setInput('errorMessage', 'Correo o contraseña incorrectos');
    fixture.componentRef.setInput('pending', true);
    await fixture.whenStable();

    expect(el.querySelector('[role="alert"]')?.textContent).toContain(
      'Correo o contraseña incorrectos',
    );
    expect(el.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled).toBe(true);
  });
});
