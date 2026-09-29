import { Injectable, signal } from '@angular/core';
import { AppError } from '../domain/app-error';

/** Holds the error shown by the global `<lg-error-dialog>`. `null` = dialog closed. */
@Injectable({ providedIn: 'root' })
export class ErrorStore {
  private readonly current = signal<AppError | null>(null);
  readonly error = this.current.asReadonly();

  show(error: AppError): void {
    this.current.set(error);
  }

  dismiss(): void {
    this.current.set(null);
  }
}
