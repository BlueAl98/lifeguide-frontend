import { TestBed } from '@angular/core/testing';
import { ErrorStore } from '../../data-access/error-store';
import { toAppError } from '../../domain/app-error';
import { ErrorDialog } from './error-dialog';

describe('ErrorDialog', () => {
  beforeAll(() => {
    // jsdom doesn't implement <dialog> methods yet.
    HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
      this.open = true;
    };
    HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
  });

  it('opens with the store error and resets the store when closed', async () => {
    const fixture = TestBed.createComponent(ErrorDialog);
    const store = TestBed.inject(ErrorStore);
    const dialog: HTMLDialogElement = fixture.nativeElement.querySelector('dialog');
    await fixture.whenStable();
    expect(dialog.open).toBe(false);

    store.show(toAppError(0, null));
    await fixture.whenStable();
    expect(dialog.open).toBe(true);
    expect(dialog.textContent).toContain('Sin conexión');

    dialog.close();
    expect(store.error()).toBeNull();
  });
});
