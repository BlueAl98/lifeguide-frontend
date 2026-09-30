import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScrollReveal } from './scroll-reveal';

@Component({
  imports: [ScrollReveal],
  template: `<section lgScrollReveal>Hola</section>`,
})
class Host {}

describe('ScrollReveal', () => {
  it('reveals right away when IntersectionObserver is not available', async () => {
    // jsdom has no IntersectionObserver, which is exactly the fallback path.
    expect(typeof IntersectionObserver).toBe('undefined');
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('section').classList).toContain('is-visible');
  });
});
