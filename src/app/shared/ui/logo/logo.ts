import { Component } from '@angular/core';

let nextId = 0;

/** Lifeguide mark (bolt + triangle). Size it from the parent with width/height. */
@Component({
  selector: 'lg-logo',
  template: `
    <svg viewBox="0 0 40 44" aria-hidden="true">
      <defs>
        <linearGradient [attr.id]="gradientId" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#33eb91" />
          <stop offset="1" stop-color="#00bfa5" />
        </linearGradient>
      </defs>
      <path [attr.fill]="fill" d="M15 0h9L14 20h8L10 44l3-17H3z" />
      <path [attr.fill]="fill" d="M27 22l11 16H17z" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      flex-shrink: 0;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class Logo {
  protected readonly gradientId = `lg-logo-gradient-${nextId++}`;
  protected readonly fill = `url(#${this.gradientId})`;
}
