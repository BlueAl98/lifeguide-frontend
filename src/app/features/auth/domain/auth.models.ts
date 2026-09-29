// Mirrors the backend contract (api-contract.md). No Angular code in this folder.
export interface LoginRequest {
  email: string;
  password: string;
}

/** What the login form collects. `rememberMe` is UI-only; the API doesn't take it. */
export interface LoginFormValue extends LoginRequest {
  rememberMe: boolean;
}

export type SocialProvider = 'google' | 'apple' | 'github';

export function toLoginRequest({ email, password }: LoginFormValue): LoginRequest {
  return { email: email.trim(), password };
}

// POST /api/register
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  /** ISO `yyyy-MM-dd`; optional. */
  birthDate: string | null;
}

export interface RegisterResponse {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

/** What the register form collects. `confirmPassword` is UI-only; `birthDate` is '' when empty. */
export interface RegisterFormValue extends Omit<RegisterRequest, 'birthDate'> {
  birthDate: string;
  confirmPassword: string;
}

export function toRegisterRequest(value: RegisterFormValue): RegisterRequest {
  return {
    email: value.email.trim(),
    username: value.username.trim(),
    password: value.password,
    firstName: value.firstName.trim(),
    lastName: value.lastName.trim(),
    birthDate: value.birthDate || null,
  };
}
