import { toLoginRequest, toRegisterRequest } from './auth.models';

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
