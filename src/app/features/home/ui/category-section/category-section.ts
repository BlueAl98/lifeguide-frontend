import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ScrollReveal } from '../../../../shared/ui/scroll-reveal/scroll-reveal';
import { HomeCategory } from '../../domain/home-category';

/** One cinematic chapter: half photo, half story. The whole row links to the category. */
@Component({
  imports: [RouterLink, Icon],
  selector: 'lg-category-section',
  styleUrl: './category-section.scss',
  templateUrl: './category-section.html',
  hostDirectives: [ScrollReveal],
})
export class CategorySection {
  readonly category = input.required<HomeCategory>();
  /** Photo on the right instead of the left (chapters alternate). */
  readonly reversed = input(false);

  protected readonly headingId = computed(() => `chapter-${this.category().number}`);
  protected readonly image = computed(() => {
    const base = `/images/home/${this.category().image}`;
    return {
      webp: `${base}-640.webp 640w, ${base}-1200.webp 1200w`,
      jpg: `${base}-640.jpg 640w, ${base}-1200.jpg 1200w`,
      src: `${base}-1200.jpg`,
    };
  });
}
