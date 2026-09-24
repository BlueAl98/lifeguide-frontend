import { Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Base button for the whole app. It's an attribute on a real <button> or <a>,
 * so links and buttons keep their native behavior (keyboard, routerLink, forms):
 *
 *   <button lgButton type="submit">Guardar</button>
 *   <a lgButton variant="outline" routerLink="/login">Iniciar sesión</a>
 */
@Component({
  selector: 'button[lgButton], a[lgButton]',
  styleUrl: './button.scss',
  template: `<ng-content />`,
  host: {
    class: 'lg-button',
    '[class]': "'lg-button--' + variant() + ' lg-button--' + size()",
    '[class.lg-button--full]': 'fullWidth()',
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly fullWidth = input(false);
}
