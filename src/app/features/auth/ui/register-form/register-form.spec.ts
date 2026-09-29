import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RegisterFormValue } from '../../domain/auth.models';
import { RegisterForm } from './register-form';

describe('RegisterForm', () => {
  let fixture: ComponentFixture<RegisterForm>;
  let el: HTMLElement;
  let emitted: RegisterFormValue[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForm],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterForm);
    el = fixture.nativeElement;
    emitted = [];
    fixture.componentInstance.submitted.subscribe((v) => emitted.push(v));
    await fixture.whenStable();
  });

  function type(id: string, value: string): void {
    const input = el.querySelector<HTMLInputElement>(`#register-${id}`)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  function error(id: string): string {
    return el.querySelector(`#register-${id}-error`)?.textContent?.trim() ?? '';
  }

  async function submitForm(): Promise<void> {
    el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();
  }

  function fillValid(): void {
    type('first-name', 'Ana');
    type('last-name', 'López');
    type('username', 'ana_fit');
    type('email', 'ana@mail.com');
    type('password', 'secreto123');
    type('confirm-password', 'secreto123');
  }

  it('shows required errors and does not emit when empty', async () => {
    await submitForm();

    expect(emitted).toEqual([]);
    expect(error('first-name')).toBe('El nombre es obligatorio');
    expect(error('last-name')).toBe('El apellido es obligatorio');
    expect(error('username')).toBe('El usuario es obligatorio');
    expect(error('email')).toBe('El correo es obligatorio');
    expect(error('password')).toBe('La contraseña es obligatoria');
    expect(error('birth-date')).toBe('');
  });

  it('emits the form value when valid (birth date optional)', async () => {
    fillValid();
    await submitForm();

    expect(emitted).toEqual([
      {
        firstName: 'Ana',
        lastName: 'López',
        username: 'ana_fit',
        email: 'ana@mail.com',
        birthDate: '',
        password: 'secreto123',
        confirmPassword: 'secreto123',
      },
    ]);
  });

  it('mirrors the backend length rules', async () => {
    fillValid();
    type('username', 'an');
    type('password', 'corta');
    type('confirm-password', 'corta');
    await submitForm();

    expect(emitted).toEqual([]);
    expect(error('username')).toBe('Entre 3 y 50 caracteres');
    expect(error('password')).toBe('Mínimo 8 caracteres');
  });

  it('rejects mismatched passwords', async () => {
    fillValid();
    type('confirm-password', 'otra-cosa');
    await submitForm();

    expect(emitted).toEqual([]);
    expect(error('confirm-password')).toBe('Las contraseñas no coinciden');
  });

  it('rejects a birth date that is not in the past', async () => {
    fillValid();
    type('birth-date', '2999-01-01');
    await submitForm();

    expect(emitted).toEqual([]);
    expect(error('birth-date')).toBe('La fecha debe ser anterior a hoy');
  });

  it('toggles visibility of both password fields', async () => {
    el.querySelector<HTMLButtonElement>('.reveal')!.click();
    await fixture.whenStable();

    expect(el.querySelector<HTMLInputElement>('#register-password')!.type).toBe('text');
    expect(el.querySelector<HTMLInputElement>('#register-confirm-password')!.type).toBe('text');
  });

  it('shows the server error and pending state from inputs', async () => {
    fixture.componentRef.setInput('errorMessage', 'El correo ya está registrado');
    fixture.componentRef.setInput('pending', true);
    await fixture.whenStable();

    expect(el.querySelector('[role="alert"]')?.textContent).toContain('El correo ya está registrado');
    const submitButton = el.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    expect(submitButton.disabled).toBe(true);
    expect(submitButton.textContent).toContain('Creando cuenta…');
  });
});
