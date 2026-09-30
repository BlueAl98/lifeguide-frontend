import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { Parallax } from '../../../../shared/ui/parallax/parallax';
import { ScrollReveal } from '../../../../shared/ui/scroll-reveal/scroll-reveal';

/** Closing scene of the home page ("Ahora empieza."). */
@Component({
  imports: [RouterLink, Button, Icon, Parallax],
  selector: 'lg-final-cta',
  styleUrl: './final-cta.scss',
  template: `
    <section class="final" aria-labelledby="final-title">
      <div class="bg" lgParallax="0.1" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcset="/images/home/final-960.webp 960w, /images/home/final-1920.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/images/home/final-1920.jpg"
            srcset="/images/home/final-960.jpg 960w, /images/home/final-1920.jpg 1920w"
            sizes="100vw"
            width="1920"
            height="1313"
            loading="lazy"
            decoding="async"
            alt=""
          />
        </picture>
      </div>
      <span class="glow" aria-hidden="true"></span>
      <svg class="mark" viewBox="0 0 40 44" aria-hidden="true">
        <path d="M15 0h9L14 20h8L10 44l3-17H3z" />
        <path d="M27 22l11 16H17z" />
      </svg>

      <div class="content">
        <span class="divider" aria-hidden="true"></span>
        <p class="eyebrow">Ahora empieza.</p>
        <h2 id="final-title" class="title">Tu mejor versión te espera.</h2>
        <p class="text">Empieza hoy.<br />Pequeños hábitos. Grandes cambios.</p>
        <a lgButton size="lg" class="cta" routerLink="/registro">
          Comienza ahora <lg-icon class="arrow" name="arrow-right" />
        </a>
      </div>

      <p class="accent" aria-hidden="true">El cambio<br />empieza en ti</p>
    </section>
  `,
  hostDirectives: [ScrollReveal],
})
export class FinalCta {}
