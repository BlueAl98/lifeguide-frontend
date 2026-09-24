import { toLoginRequest } from './auth.models';

describe('toLoginRequest', () => {
  it('trims the email and drops UI-only fields', () => {
    expect(toLoginRequest({ email: '  ana@mail.com ', password: ' secret ', rememberMe: true })).toEqual({
      email: 'ana@mail.com',
      password: ' secret ',
    });
  });
});
