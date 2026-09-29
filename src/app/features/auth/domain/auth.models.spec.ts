import { registerErrorMessage, toLoginRequest, toRegisterRequest } from './auth.models';

describe('toLoginRequest', () => {
  it('trims the email and drops UI-only fields', () => {
    expect(toLoginRequest({ email: '  ana@mail.com ', password: ' secret ', rememberMe: true })).toEqual({
      email: 'ana@mail.com',
      password: ' secret ',
    });
  });
});

describe('toRegisterRequest', () => {
  const value = {
    email: ' ana@mail.com ',
    username: ' ana ',
    password: ' secreto123 ',
    confirmPassword: ' secreto123 ',
    firstName: ' Ana ',
    lastName: ' López ',
    birthDate: '1995-04-12',
  };

  it('trims text fields, keeps the password as typed and drops confirmPassword', () => {
    expect(toRegisterRequest(value)).toEqual({
      email: 'ana@mail.com',
      username: 'ana',
      password: ' secreto123 ',
      firstName: 'Ana',
      lastName: 'López',
      birthDate: '1995-04-12',
    });
  });

  it('sends a null birth date when left empty', () => {
    expect(toRegisterRequest({ ...value, birthDate: '' }).birthDate).toBeNull();
  });
});

describe('registerErrorMessage', () => {
  it('maps backend conflicts to Spanish messages', () => {
    expect(registerErrorMessage(409, { message: 'Email is already registered' })).toBe(
      'Este correo ya está registrado.',
    );
    expect(registerErrorMessage(409, { message: 'Username is already taken' })).toBe(
      'Ese usuario ya está en uso.',
    );
    expect(registerErrorMessage(409, { message: 'Conflict' })).toBe('Esa cuenta ya existe.');
  });

  it('handles validation, offline and unexpected errors', () => {
    expect(registerErrorMessage(400, null)).toBe('Revisa los datos del formulario.');
    expect(registerErrorMessage(0, null)).toContain('No pudimos conectar');
    expect(registerErrorMessage(500, null)).toContain('Algo salió mal');
  });
});
