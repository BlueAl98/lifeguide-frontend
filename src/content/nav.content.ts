import { NavLink, SocialLink } from '../app/core/layout/nav-link';

/**
 * Site navigation shown in the header and the footer. Edit here, push, done.
 * A tab only works if its route exists in `app.routes.ts`.
 */
export const NAV_LINKS = [
  { path: '/', label: 'Inicio' },
  // More tabs (Entrenamientos, Nutrición, …) get added here once their pages exist.
] as const satisfies readonly NavLink[];

// TODO: point these at the real Lifeguide accounts once they exist.
export const SOCIAL_LINKS = [
  { label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/' },
  { label: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/' },
  { label: 'X', icon: 'x', url: 'https://x.com/' },
] as const satisfies readonly SocialLink[];
