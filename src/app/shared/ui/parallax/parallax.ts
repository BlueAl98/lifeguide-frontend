import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

/**
 * Subtle parallax for large background images. Writes `--parallax-offset` on the host;
 * the component applies it with `transform: translateY(var(--parallax-offset, 0))`
 * and makes the host taller than its section so no edge ever shows.
 *
 *   <div class="bg" lgParallax="0.12">…</div>
 *
 * Only runs while the host is on screen (IntersectionObserver), at most once per frame
 * (requestAnimationFrame), and never when the user prefers reduced motion.
 */
@Directive({
  selector: '[lgParallax]',
})
export class Parallax {
  /** Fraction of the scroll distance the layer lags behind (0 = none). Keep it small. */
  readonly lgParallax = input(0.12, { transform: (v: unknown) => numberAttribute(v, 0.12) });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.host.nativeElement;
      // Measure the (untransformed) section, not the moving layer itself.
      const frame = el.parentElement;
      if (
        !frame ||
        typeof IntersectionObserver === 'undefined' ||
        matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      let onScreen = false;
      let frameId = 0;

      const update = () => {
        frameId = 0;
        const rect = frame.getBoundingClientRect();
        const fromCenter = rect.top + rect.height / 2 - innerHeight / 2;
        el.style.setProperty(
          '--parallax-offset',
          `${(-fromCenter * this.lgParallax()).toFixed(1)}px`,
        );
      };
      const onScroll = () => {
        if (onScreen && !frameId) {
          frameId = requestAnimationFrame(update);
        }
      };

      const observer = new IntersectionObserver(([entry]) => {
        onScreen = !!entry?.isIntersecting;
        onScroll();
      });
      observer.observe(frame);
      addEventListener('scroll', onScroll, { passive: true });

      destroyRef.onDestroy(() => {
        observer.disconnect();
        removeEventListener('scroll', onScroll);
        cancelAnimationFrame(frameId);
      });
    });
  }
}
