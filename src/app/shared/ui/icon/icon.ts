import { Component, input } from '@angular/core';

export type IconName =
  | 'user'
  | 'lock'
  | 'eye'
  | 'eye-off'
  | 'log-in'
  | 'google'
  | 'apple'
  | 'github';

/** Inline SVG icons. Decorative by default: give the parent element the accessible name. */
@Component({
  selector: 'lg-icon',
  templateUrl: './icon.html',
  styles: `
    :host {
      display: inline-block;
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
