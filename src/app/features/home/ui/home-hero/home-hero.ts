import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { Logo } from '../../../../shared/ui/logo/logo';
import { Parallax } from '../../../../shared/ui/parallax/parallax';
import { HomeHeroContent } from '../../domain/home-content';

/** Full-screen opening of the home page ("Quiero cambiar."). Slides under the sticky header. */
@Component({
  imports: [RouterLink, Button, Icon, Logo, Parallax],
  selector: 'lg-home-hero',
  styleUrl: './home-hero.scss',
  templateUrl: './home-hero.html',
})
export class HomeHero {
  readonly content = input.required<HomeHeroContent>();
}
