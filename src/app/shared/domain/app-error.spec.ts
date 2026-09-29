import { toAppError } from './app-error';

describe('toAppError', () => {
  it('keeps the backend code and uses Spanish copy', () => {
    const error = toAppError(404, { code: 'NOT_FOUND', message: 'User not found', status: 404 });
    expect(error).toEqual({
      status: 404,
      code: 'NOT_FOUND',
      title: 'No encontrado',
      message: 'Lo que buscas no existe o fue movido.',
    });
  });

  it('flags connection errors', () => {
    expect(toAppError(0, null)).toMatchObject({ code: 'NETWORK_ERROR', title: 'Sin conexión' });
  });

  it('falls back to a generic message for unknown bodies and statuses', () => {
    expect(toAppError(502, '<html>Bad gateway</html>')).toMatchObject({
      code: 'UNKNOWN',
      title: 'Algo salió mal',
    });
  });
});
