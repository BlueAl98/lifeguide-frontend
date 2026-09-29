import { Component, input, output, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  maxLength,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { RegisterFormValue } from '../../domain/auth.models';

/** Local `yyyy-MM-dd`, the format `<input type="date">` uses. */
function today(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

@Component({
  imports: [FormField, RouterLink, Button, Icon],
  selector: 'lg-register-form',
  styleUrl: './register-form.scss',
  templateUrl: './register-form.html',
})
export class RegisterForm {
  readonly pending = input(false);
  readonly errorMessage = input<string | null>(null);
  readonly successMessage = input<string | null>(null);
  readonly submitted = output<RegisterFormValue>();

  // Rules mirror RegisterRequest in the backend (api-contract.md).
  protected readonly model = signal<RegisterFormValue>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });
  protected readonly registerForm = form(this.model, (p) => {
    required(p.firstName, { message: 'El nombre es obligatorio' });
    maxLength(p.firstName, 100, { message: 'Máximo 100 caracteres' });
    required(p.lastName, { message: 'El apellido es obligatorio' });
    maxLength(p.lastName, 100, { message: 'Máximo 100 caracteres' });
    required(p.username, { message: 'El usuario es obligatorio' });
    minLength(p.username, 3, { message: 'Entre 3 y 50 caracteres' });
    maxLength(p.username, 50, { message: 'Entre 3 y 50 caracteres' });
    required(p.email, { message: 'El correo es obligatorio' });
    email(p.email, { message: 'Ingresa un correo válido' });
    validate(p.birthDate, ({ value }) =>
      value() && value() >= today()
        ? { kind: 'past', message: 'La fecha debe ser anterior a hoy' }
        : undefined,
    );
    required(p.password, { message: 'La contraseña es obligatoria' });
    minLength(p.password, 8, { message: 'Mínimo 8 caracteres' });
    required(p.confirmPassword, { message: 'Confirma tu contraseña' });
    validate(p.confirmPassword, ({ value, valueOf }) =>
      value() && value() !== valueOf(p.password)
        ? { kind: 'mismatch', message: 'Las contraseñas no coinciden' }
        : undefined,
    );
  });
  protected readonly maxBirthDate = today();
  protected readonly showPassword = signal(false);

  protected togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  protected async register(event: Event): Promise<void> {
    event.preventDefault();
    await submit(this.registerForm, async () => {
      this.submitted.emit(this.model());
      return undefined;
    });
  }
}
