import { Component } from '@angular/core';
import { Logo } from '../../../../shared/ui/logo/logo';

@Component({
  imports: [Logo],
  selector: 'lg-auth-hero',
  styleUrl: './auth-hero.scss',
  template: `
    <p class="brand">
      <lg-logo class="logo" />
      <span class="name">Lifeguide</span>
    </p>
    <p class="slogan">Mejores hábitos.<br />Un tú más fuerte.</p>
    <span class="divider" aria-hidden="true"></span>
    <p class="text">Tu guía hacia un cuerpo más sano,<br />una mente más fuerte y una vida mejor.</p>
  `,
})
export class AuthHero {}
