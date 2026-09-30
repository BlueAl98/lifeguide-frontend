import { Component } from '@angular/core';
import { HOME_CATEGORIES } from '../../domain/home-category';
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
    <lg-home-hero />
    <lg-story-intro />
    <div class="chapters">
      @for (category of categories; track category.number; let odd = $odd) {
        <lg-category-section [category]="category" [reversed]="odd" />
      }
    </div>
    <lg-final-cta />
  `,
})
export class HomePage {
  protected readonly categories = HOME_CATEGORIES;
}
