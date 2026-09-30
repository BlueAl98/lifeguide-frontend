import { Component } from '@angular/core';
import { ScrollReveal } from '../../../../shared/ui/scroll-reveal/scroll-reveal';

/** Quiet pause after the hero that introduces the Lifeguide philosophy. */
@Component({
  selector: 'lg-story-intro',
  styleUrl: './story-intro.scss',
  template: `
    <section class="story" aria-labelledby="story-title">
      <span class="line line--1" aria-hidden="true"></span>
      <span class="line line--2" aria-hidden="true"></span>
      <span class="line line--3" aria-hidden="true"></span>

      <p class="eyebrow">Construye tu mejor versión</p>
      <h2 id="story-title" class="title">El cambio comienza <em>contigo.</em></h2>
      <p class="text">
        No necesitas cambiar toda tu vida de un día para otro.<br />
        Necesitas empezar con pequeños pasos.
      </p>
    </section>
  `,
  hostDirectives: [ScrollReveal],
})
export class StoryIntro {}
