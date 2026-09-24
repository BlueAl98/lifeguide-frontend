import { Component, input, output, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { LoginFormValue, SocialProvider } from '../../domain/auth.models';

@Component({
  imports: [FormField, RouterLink, Button, Icon],
  selector: 'lg-login-form',
  styleUrl: './login-form.scss',
  templateUrl: './login-form.html',
})
export class LoginForm {
  readonly pending = input(false);
  readonly errorMessage = input<string | null>(null);
  readonly submitted = output<LoginFormValue>();
  readonly socialLogin = output<SocialProvider>();

  protected readonly model = signal<LoginFormValue>({ email: '', password: '', rememberMe: false });
  protected readonly loginForm = form(this.model, (p) => {
    required(p.email, { message: 'El correo es obligatorio' });
    email(p.email, { message: 'Ingresa un correo válido' });
    required(p.password, { message: 'La contraseña es obligatoria' });
  });
  protected readonly showPassword = signal(false);
  protected readonly socialProviders: readonly { id: SocialProvider; label: string }[] = [
    { id: 'google', label: 'Continuar con Google' },
    { id: 'apple', label: 'Continuar con Apple' },
    { id: 'github', label: 'Continuar con GitHub' },
  ];

  protected togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  protected async login(event: Event): Promise<void> {
    event.preventDefault();
    await submit(this.loginForm, async () => {
      this.submitted.emit(this.model());
      return undefined;
    });
  }
}
