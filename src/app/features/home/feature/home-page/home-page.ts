import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../../../../content/home.content';
import { CategorySection } from '../../ui/category-section/category-section';
import { FinalCta } from '../../ui/final-cta/final-cta';
import { HomeHero } from '../../ui/home-hero/home-hero';
import { StoryIntro } from '../../ui/story-intro/story-intro';

/** Home ("Inicio"): a long scroll story — hero, philosophy, eight chapters, final call. */
@Component({
  imports: [HomeHero, StoryIntro, CategorySection, FinalCta],
  selector: 'lg-home-page',
  styleUrl: './home-page.scss',
  template: `
    <lg-home-hero [content]="content.hero" />
    <lg-story-intro [content]="content.intro" />
    <div class="chapters">
      @for (category of content.chapters; track category.cta.link; let i = $index, odd = $odd) {
        <lg-category-section [category]="category" [position]="i + 1" [reversed]="odd" />
      }
    </div>
    <lg-final-cta [content]="content.finalCta" />
  `,
})
export class HomePage {
  /** All copy comes from src/content/home.content.ts. */
  protected readonly content = HOME_CONTENT;
}
