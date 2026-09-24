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
