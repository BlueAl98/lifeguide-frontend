import { IconName } from '../../shared/ui/icon/icon';

/** Shape of the site navigation copy in `src/content/nav.content.ts`. */
export interface NavLink {
  readonly path: string;
  readonly label: string;
}

export interface SocialLink {
  readonly label: string;
  readonly icon: IconName;
  readonly url: string;
}
