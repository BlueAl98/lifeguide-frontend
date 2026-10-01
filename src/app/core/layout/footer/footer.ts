import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_LINKS, SOCIAL_LINKS } from '../../../../content/nav.content';
import { Icon } from '../../../shared/ui/icon/icon';
import { Logo } from '../../../shared/ui/logo/logo';

@Component({
  imports: [RouterLink, Icon, Logo],
  selector: 'lg-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly links = NAV_LINKS;
  protected readonly socials = SOCIAL_LINKS;
}
