import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Adds `.is-visible` to the host the first time it scrolls into view, then stops watching.
 * The animation itself lives in the component CSS (opacity/transform only):
 *
 *   <section lgScrollReveal>…</section>
 *   :host(.is-visible) .title { opacity: 1; transform: none; }
 *
 * Without IntersectionObserver (old browsers, jsdom) the class is added right away.
 */
@Directive({
  selector: '[lgScrollReveal]',
})
export class ScrollReveal {
  /** Share of the element that must be visible before it reveals. */
  readonly revealThreshold = input(0.2);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.host.nativeElement;
      if (typeof IntersectionObserver === 'undefined') {
        el.classList.add('is-visible');
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { threshold: this.revealThreshold(), rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
