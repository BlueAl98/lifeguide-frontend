import { HttpContext, HttpContextToken } from '@angular/common/http';

/** HTTP statuses the caller shows itself (e.g. inline in a form), so the global dialog skips them. */
export const HANDLED_ERRORS = new HttpContextToken<readonly number[]>(() => []);

/**
 *   this.http.post('/api/register', body, { context: handleErrorsLocally(400, 409) });
 */
export function handleErrorsLocally(...statuses: number[]): HttpContext {
  return new HttpContext().set(HANDLED_ERRORS, statuses);
}
