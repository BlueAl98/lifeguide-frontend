import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomePage } from './home-page';

describe('HomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('tells the story: hero, philosophy, eight chapters and the final call', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Lifeguide');
    expect(el.querySelector('#story-title')?.textContent).toContain('El cambio comienza');

    const chapters = [...el.querySelectorAll('lg-category-section')];
    expect(chapters.length).toBe(8);
    expect(chapters[0].querySelector('h2')?.textContent?.trim()).toBe('Encuentra tu propósito');
    expect(chapters[0].querySelector('.cta')?.getAttribute('href')).toBe('/proposito');
    expect(chapters[7].querySelector('h2')?.textContent?.trim()).toBe('Valentía');

    expect(el.querySelector('#final-title')?.textContent).toBe('Tu mejor versión te espera.');
  });

  it('alternates the photo side between chapters', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const reversed = [...fixture.nativeElement.querySelectorAll('.chapter')].map((c: Element) =>
      c.classList.contains('reversed'),
    );

    expect(reversed).toEqual([false, true, false, true, false, true, false, true]);
  });

  it('gives every chapter photo alt text and lazy loading', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const images: HTMLImageElement[] = [...fixture.nativeElement.querySelectorAll('.chapter img')];

    expect(
      images.every((img) => img.alt.length > 0 && img.getAttribute('loading') === 'lazy'),
    ).toBe(true);
  });
});
