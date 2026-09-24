import { Component } from '@angular/core';
import { LoginFormValue, SocialProvider } from '../../domain/auth.models';
import { AuthHero } from '../../ui/auth-hero/auth-hero';
import { LoginForm } from '../../ui/login-form/login-form';

@Component({
  imports: [AuthHero, LoginForm],
  selector: 'lg-login-page',
  styleUrl: './login-page.scss',
  template: `
    <div class="backdrop" aria-hidden="true"></div>
    <lg-auth-hero class="hero" />
    <lg-login-form class="form" (submitted)="login($event)" (socialLogin)="loginWith($event)" />
  `,
})
export class LoginPage {
  // UI only for now: these get wired to AuthStore when the backend work starts.
  protected login(_value: LoginFormValue): void {}

  protected loginWith(_provider: SocialProvider): void {}
}
