import { Component } from '@angular/core';
import { RegisterFormValue } from '../../domain/auth.models';
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
  template: `<lg-register-form (submitted)="register($event)" />`,
})
export class RegisterPage {
  // UI only for now. When wiring: toRegisterRequest(value) → POST /api/register,
  // pass `pending` / `errorMessage` back into <lg-register-form>.
  protected register(_value: RegisterFormValue): void {}
}
