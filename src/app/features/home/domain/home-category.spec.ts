import { HOME_CATEGORIES } from './home-category';

describe('HOME_CATEGORIES', () => {
  it('has the eight chapters numbered 01 to 08 in order', () => {
    expect(HOME_CATEGORIES.map((c) => c.number)).toEqual([
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
    ]);
  });

  it('gives every chapter alt text and an absolute link', () => {
    for (const category of HOME_CATEGORIES) {
      expect(category.imageAlt.length).toBeGreaterThan(0);
      expect(category.link.startsWith('/')).toBe(true);
    }
  });
});
