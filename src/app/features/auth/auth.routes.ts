import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./feature/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        title: 'Iniciar sesión · Lifeguide',
        loadComponent: () => import('./feature/login-page/login-page').then((m) => m.LoginPage),
      },
      {
        path: 'registro',
        title: 'Crear cuenta · Lifeguide',
        loadComponent: () =>
          import('./feature/register-page/register-page').then((m) => m.RegisterPage),
      },
    ],
  },
] satisfies Routes;
