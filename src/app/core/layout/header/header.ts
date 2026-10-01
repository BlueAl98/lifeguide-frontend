import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_LINKS } from '../../../../content/nav.content';
import { Logo } from '../../../shared/ui/logo/logo';

/** Past this many pixels of scroll the bar gets compact, blurrier and gains a border glow. */
const SCROLLED_AFTER = 24;

@Component({
  imports: [RouterLink, RouterLinkActive, Logo],
  selector: 'lg-header',
  styleUrls: ['./header.scss', './header-mobile.scss'],
  templateUrl: './header.html',
  host: {
    '[class.scrolled]': 'scrolled()',
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class Header {
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected onScroll(): void {
    // Signals skip unchanged values, so this only re-renders when crossing the threshold.
    this.scrolled.set(scrollY > SCROLLED_AFTER);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
