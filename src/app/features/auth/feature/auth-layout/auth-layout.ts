import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthHero } from '../../ui/auth-hero/auth-hero';

/**
 * Shared frame for /login and /registro: the backdrop and hero stay mounted
 * while the routed card swaps (flip animation via router view transitions).
 */
@Component({
  imports: [AuthHero, RouterOutlet],
  selector: 'lg-auth-layout',
  styleUrl: './auth-layout.scss',
  template: `
    <div class="backdrop" aria-hidden="true"></div>
    <lg-auth-hero class="hero" />
    <router-outlet />
  `,
})
export class AuthLayout {}
