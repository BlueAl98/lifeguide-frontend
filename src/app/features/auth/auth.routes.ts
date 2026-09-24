import { Routes } from '@angular/router';

export default [
  {
    path: 'login',
    title: 'Iniciar sesión · Lifeguide',
    loadComponent: () => import('./feature/login-page/login-page').then((m) => m.LoginPage),
  },
] satisfies Routes;
