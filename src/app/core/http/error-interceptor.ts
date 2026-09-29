import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorStore } from '../../shared/data-access/error-store';
import { HANDLED_ERRORS } from '../../shared/data-access/handled-errors';
import { toAppError } from '../../shared/domain/app-error';

/**
 * Single place where every failed HTTP call lands:
 * 1. skip it if the caller handles that status itself (`handleErrorsLocally`),
 * 2. run the side effect for that status, if any (`onStatus`),
 * 3. show the global error dialog.
 * The error is always re-thrown, so the caller's `error`/`finalize` still run.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorStore = inject(ErrorStore);
  const router = inject(Router);

  // One lambda per status. Add entries here as features land.
  const onStatus: Partial<Record<number, () => void>> = {
    401: () => {
      // TODO: clear the stored token once login exists.
      void router.navigate(['/login']);
    },
  };

  return next(req).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        !req.context.get(HANDLED_ERRORS).includes(error.status)
      ) {
        onStatus[error.status]?.();
        errorStore.show(toAppError(error.status, error.error));
      }
      return throwError(() => error);
    }),
  );
};
