// App-wide error model + mapper. Pure TS (no Angular) so it's trivial to test.

// Error envelope returned by the backend for every error (api-contract.md).
export interface ErrorResponse {
  code: string;
  message: string;
  status: number;
  path: string;
  timestamp: string;
}

/** What the UI shows. Always Spanish, never the raw backend text. */
export interface AppError {
  /** HTTP status; 0 = no connection. */
  status: number;
  /** Backend `code` (`CONFLICT`, `NOT_FOUND`…) or `NETWORK_ERROR` / `UNKNOWN`. */
  code: string;
  title: string;
  message: string;
}

/** Maps a failed HTTP call (status + response body) to an `AppError`. */
export function toAppError(status: number, body: unknown): AppError {
  const code = isErrorResponse(body) ? body.code : status === 0 ? 'NETWORK_ERROR' : 'UNKNOWN';
  return { status, code, ...copyFor(status) };
}

function copyFor(status: number): Pick<AppError, 'title' | 'message'> {
  switch (status) {
    case 0:
      return {
        title: 'Sin conexión',
        message: 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
      };
    case 400:
      return { title: 'Datos no válidos', message: 'Revisa los datos e inténtalo de nuevo.' };
    case 401:
      return { title: 'Sesión expirada', message: 'Inicia sesión de nuevo para continuar.' };
    case 403:
      return { title: 'Acceso denegado', message: 'No tienes permiso para hacer esto.' };
    case 404:
      return { title: 'No encontrado', message: 'Lo que buscas no existe o fue movido.' };
    case 409:
      return { title: 'Ya existe', message: 'Ese registro ya existe.' };
    default:
      return {
        title: 'Algo salió mal',
        message: 'Algo salió mal. Inténtalo de nuevo en unos minutos.',
      };
  }
}

function isErrorResponse(body: unknown): body is ErrorResponse {
  return (
    typeof body === 'object' && body !== null && typeof (body as ErrorResponse).code === 'string'
  );
}
