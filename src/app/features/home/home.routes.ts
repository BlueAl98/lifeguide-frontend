import { Routes } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    title: 'Inicio · Lifeguide',
    loadComponent: () => import('./feature/home-page/home-page').then((m) => m.HomePage),
  },
] satisfies Routes;
