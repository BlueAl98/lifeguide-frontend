import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { ErrorStore } from '../../data-access/error-store';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

/**
 * Global error modal. Mounted once in the shell; opens whenever `ErrorStore` has an error.
 * Native <dialog> gives focus trapping, Esc to close and the backdrop for free.
 */
@Component({
  imports: [Button, Icon],
  selector: 'lg-error-dialog',
  styleUrl: './error-dialog.scss',
  templateUrl: './error-dialog.html',
})
export class ErrorDialog {
  protected readonly errorStore = inject(ErrorStore);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const dialog = this.dialog().nativeElement;
      if (this.errorStore.error() && !dialog.open) dialog.showModal();
      else if (!this.errorStore.error() && dialog.open) dialog.close();
    });
  }
}
