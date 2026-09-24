import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  readonly path: string;
  readonly label: string;
}

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'lg-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  protected readonly tagline = 'Brand';
  protected readonly links: readonly NavLink[] = [
    { path: '/', label: 'Inicio' },
    { path: '/entrenamientos', label: 'Entrenamientos' },
    { path: '/nutricion', label: 'Nutrición' },
    { path: '/motivacion', label: 'Motivación' },
    { path: '/acerca-de', label: 'Acerca de' },
  ];
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
