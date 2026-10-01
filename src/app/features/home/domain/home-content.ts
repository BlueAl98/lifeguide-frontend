/**
 * Shape of the home page copy. The text itself lives in `src/content/home.content.ts`;
 * these types make the build fail if that file is missing a field or uses an unknown icon.
 */

/** Icons used by the home chapters (a subset of the shared IconName union). */
export type HomeCategoryIcon =
  'zap' | 'dumbbell' | 'meditation' | 'trending-up' | 'brain' | 'smile' | 'shield' | 'target';

/** Text split into lines; each entry is rendered on its own line. */
export type ContentLines = readonly string[];

/** A call to action: button/link label and the route it opens. */
export interface ContentLink {
  readonly label: string;
  /** Absolute app route, e.g. '/registro'. */
  readonly link: string;
}

export interface HomeHeroContent {
  readonly kicker: string;
  readonly title: string;
  readonly slogan: ContentLines;
  readonly text: string;
  readonly cta: ContentLink;
  /** Large decorative phrase on the side (hidden from screen readers). */
  readonly accent: ContentLines;
  readonly imageAlt: string;
}

export interface StoryIntroContent {
  readonly eyebrow: string;
  readonly title: string;
  /** Last words of the title, highlighted in green. */
  readonly titleEmphasis: string;
  readonly text: ContentLines;
}

/** One "chapter" of the home page story. Its number (01, 02…) comes from its position. */
export interface HomeCategory {
  readonly title: string;
  /** The reader's inner voice for this chapter ("Quiero empezar."). */
  readonly intent: string;
  readonly description: string;
  /** Base name under /images/home; files exist as `<image>-640|1200.webp|jpg`. */
  readonly image: string;
  readonly imageAlt: string;
  /** CSS object-position that keeps the subject in frame when cropped. */
  readonly imageFocus: string;
  readonly icon: HomeCategoryIcon;
  readonly cta: ContentLink;
}

export interface FinalCtaContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly text: ContentLines;
  readonly cta: ContentLink;
  /** Large decorative phrase on the side (hidden from screen readers). */
  readonly accent: ContentLines;
}

export interface HomeContent {
  readonly hero: HomeHeroContent;
  readonly intro: StoryIntroContent;
  readonly chapters: readonly HomeCategory[];
  readonly finalCta: FinalCtaContent;
}
