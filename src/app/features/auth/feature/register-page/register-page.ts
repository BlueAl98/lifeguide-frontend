import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { AuthApi } from '../../data-access/auth-api';
import {
  RegisterFormValue,
  registerErrorMessage,
  toRegisterRequest,
} from '../../domain/auth.models';
import { RegisterForm } from '../../ui/register-form/register-form';

@Component({
  imports: [RegisterForm],
  selector: 'lg-register-page',
  styles: `
    :host {
      display: block;
      width: 100%;
      max-width: 32rem;
    }
  `,
  template: `
    <lg-register-form
      [pending]="pending()"
      [errorMessage]="errorMessage()"
      [successMessage]="successMessage()"
      (submitted)="register($event)"
    />
  `,
})
export class RegisterPage {
  private readonly authApi = inject(AuthApi);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly pending = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly successMessage = signal<string | null>(null);

  protected register(value: RegisterFormValue): void {
    // Double-submit guard. Set synchronously, before the request, so a second
    // click/Enter in the same tick is dropped even before the disabled button
    // re-renders. The backend still answers 409 if a duplicate gets through.
    if (this.pending()) return;
    this.pending.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.authApi
      .register(toRegisterRequest(value))
      .pipe(
        finalize(() => this.pending.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        // Stay on the page for now (manual testing); redirect once login exists.
        next: (user) =>
          this.successMessage.set(`¡Cuenta creada! Te damos la bienvenida, ${user.firstName}.`),
        error: (error: HttpErrorResponse) =>
          this.errorMessage.set(registerErrorMessage(error.status, error.error)),
      });
  }
}
