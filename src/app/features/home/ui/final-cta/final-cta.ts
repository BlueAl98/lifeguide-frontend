import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { Parallax } from '../../../../shared/ui/parallax/parallax';
import { ScrollReveal } from '../../../../shared/ui/scroll-reveal/scroll-reveal';
import { FinalCtaContent } from '../../domain/home-content';

/** Closing scene of the home page ("Ahora empieza."). */
@Component({
  imports: [RouterLink, Button, Icon, Parallax],
  selector: 'lg-final-cta',
  styleUrl: './final-cta.scss',
  template: `
    @let c = content();
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
        <p class="eyebrow">{{ c.eyebrow }}</p>
        <h2 id="final-title" class="title">{{ c.title }}</h2>
        <p class="text">
          @for (line of c.text; track $index) {
            @if (!$first) {
              <br />
            }
            {{ line }}
          }
        </p>
        <a lgButton size="lg" class="cta" [routerLink]="c.cta.link">
          {{ c.cta.label }} <lg-icon class="arrow" name="arrow-right" />
        </a>
      </div>

      <p class="accent" aria-hidden="true">
        @for (line of c.accent; track $index) {
          @if (!$first) {
            <br />
          }
          {{ line }}
        }
      </p>
    </section>
  `,
  hostDirectives: [ScrollReveal],
})
export class FinalCta {
  readonly content = input.required<FinalCtaContent>();
}
