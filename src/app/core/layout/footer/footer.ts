import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../../../shared/ui/icon/icon';
import { Logo } from '../../../shared/ui/logo/logo';

interface SocialLink {
  readonly label: string;
  readonly icon: IconName;
  readonly url: string;
}

@Component({
  imports: [RouterLink, Icon, Logo],
  selector: 'lg-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly links = [
    { path: '/', label: 'Inicio' },
    { path: '/entrenamientos', label: 'Entrenamientos' },
    { path: '/nutricion', label: 'Nutrición' },
    { path: '/motivacion', label: 'Motivación' },
    { path: '/acerca-de', label: 'Acerca de' },
  ] as const;
  // TODO: point these at the real Lifeguide accounts once they exist.
  protected readonly socials: readonly SocialLink[] = [
    { label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/' },
    { label: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/' },
    { label: 'X', icon: 'x', url: 'https://x.com/' },
  ];
}
