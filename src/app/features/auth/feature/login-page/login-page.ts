import { Component } from '@angular/core';
import { LoginFormValue, SocialProvider } from '../../domain/auth.models';
import { LoginForm } from '../../ui/login-form/login-form';

@Component({
  imports: [LoginForm],
  selector: 'lg-login-page',
  styles: `
    :host {
      display: block;
      width: 100%;
      max-width: 32rem;
    }
  `,
  template: `<lg-login-form (submitted)="login($event)" (socialLogin)="loginWith($event)" />`,
})
export class LoginPage {
  // UI only for now: these get wired to AuthStore when the backend work starts.
  protected login(_value: LoginFormValue): void {}

  protected loginWith(_provider: SocialProvider): void {}
}
