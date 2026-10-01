import { HOME_CONTENT } from './home.content';

describe('HOME_CONTENT', () => {
  const links = [
    HOME_CONTENT.hero.cta.link,
    HOME_CONTENT.finalCta.cta.link,
    ...HOME_CONTENT.chapters.map((c) => c.cta.link),
  ];

  it('has the eight chapters', () => {
    expect(HOME_CONTENT.chapters.length).toBe(8);
  });

  it('gives every chapter alt text', () => {
    for (const chapter of HOME_CONTENT.chapters) {
      expect(chapter.imageAlt.length).toBeGreaterThan(0);
    }
  });

  it('only uses absolute links, unique per chapter', () => {
    expect(links.every((link) => link.startsWith('/'))).toBe(true);
    const chapterLinks = HOME_CONTENT.chapters.map((c) => c.cta.link);
    expect(new Set(chapterLinks).size).toBe(chapterLinks.length);
  });
});
