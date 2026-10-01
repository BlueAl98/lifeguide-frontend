import { Component, input } from '@angular/core';
import { ScrollReveal } from '../../../../shared/ui/scroll-reveal/scroll-reveal';
import { StoryIntroContent } from '../../domain/home-content';

/** Quiet pause after the hero that introduces the Lifeguide philosophy. */
@Component({
  selector: 'lg-story-intro',
  styleUrl: './story-intro.scss',
  template: `
    @let c = content();
    <section class="story" aria-labelledby="story-title">
      <span class="line line--1" aria-hidden="true"></span>
      <span class="line line--2" aria-hidden="true"></span>
      <span class="line line--3" aria-hidden="true"></span>

      <p class="eyebrow">{{ c.eyebrow }}</p>
      <h2 id="story-title" class="title">
        {{ c.title }} <em>{{ c.titleEmphasis }}</em>
      </h2>
      <p class="text">
        @for (line of c.text; track $index) {
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
export class StoryIntro {
  readonly content = input.required<StoryIntroContent>();
}
