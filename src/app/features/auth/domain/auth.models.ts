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

// Error envelope returned by the backend for every error (api-contract.md).
export interface ErrorResponse {
  code: string;
  message: string;
  status: number;
  path: string;
  timestamp: string;
}

/** Spanish message for a failed POST /api/register. `status` 0 = no connection. */
export function registerErrorMessage(status: number, body: Partial<ErrorResponse> | null): string {
  if (status === 409) {
    if (body?.message === 'Email is already registered') return 'Este correo ya está registrado.';
    if (body?.message === 'Username is already taken') return 'Ese usuario ya está en uso.';
    return 'Esa cuenta ya existe.';
  }
  if (status === 400) return 'Revisa los datos del formulario.';
  if (status === 0) return 'No pudimos conectar con el servidor. Inténtalo de nuevo.';
  return 'Algo salió mal. Inténtalo de nuevo en unos minutos.';
}
