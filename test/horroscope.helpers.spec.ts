import { Horroscopehelper } from '../src/helpers/horroscope.helpers';
describe('Horroscopehelper', () => {
  let horoscopeHelper: Horroscopehelper;

  beforeEach(() => {
    horoscopeHelper = new Horroscopehelper();
  });

  describe('getChineseZodiac', () => {
    it('should return the correct Chinese zodiac based on the year', () => {
      expect(horoscopeHelper.getChineseZodiac(2000)).toBe('Dragon');
      expect(horoscopeHelper.getChineseZodiac(2001)).toBe('Snake');
      expect(horoscopeHelper.getChineseZodiac(2002)).toBe('Horse');
    });
  });

  describe('getWesternHoroscope', () => {
    it('should return the correct Western horoscope based on the date', () => {
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 0, 20))).toBe(
        'Aquarius',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 1, 19))).toBe(
        'Pisces',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 2, 21))).toBe(
        'Aries',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 3, 20))).toBe(
        'Taurus',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 4, 21))).toBe(
        'Gemini',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 5, 21))).toBe(
        'Cancer',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 6, 23))).toBe(
        'Leo',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 7, 23))).toBe(
        'Virgo',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 8, 23))).toBe(
        'Libra',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 9, 23))).toBe(
        'Scorpio',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 10, 22))).toBe(
        'Sagittarius',
      );
      expect(horoscopeHelper.getWesternHoroscope(new Date(2000, 11, 22))).toBe(
        'Capricorn',
      );
    });
  });
});
