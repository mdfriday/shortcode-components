import { ShortcodeManager } from '../../src/shortcode-manager';

// Mock the ThemeManager
const mockThemeManager = {
  // Add any methods or properties needed for the tests
};

jest.mock('../../src/themes', () => ({
  ThemeManager: jest.fn().mockImplementation(() => mockThemeManager)
}));

describe('defaultFuncMap', () => {
  // Create a ShortcodeManager instance to access the default function map
  const shortcodeManager = new ShortcodeManager(mockThemeManager as any);
  const defaultFuncMap = shortcodeManager.getDefaultFuncMap();

  describe('split function', () => {
    const splitFunc = defaultFuncMap.get('split')!;

    it('should split a string by the specified separator', () => {
      expect(splitFunc('a,b,c', ',')).toEqual(['a', 'b', 'c']);
      expect(splitFunc('a|b|c', '|')).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty strings', () => {
      expect(splitFunc('', ',')).toEqual(['']);
    });

    it('should handle non-string inputs safely', () => {
      expect(splitFunc(null, ',')).toEqual(['']);
      expect(splitFunc(undefined, ',')).toEqual(['']);
      expect(splitFunc(123, ',')).toEqual(['']);
    });

    it('should use comma as default separator if separator is not a string', () => {
      expect(splitFunc('a,b,c', null)).toEqual(['a', 'b', 'c']);
      expect(splitFunc('a,b,c', undefined)).toEqual(['a', 'b', 'c']);
      expect(splitFunc('a,b,c', 123)).toEqual(['a', 'b', 'c']);
    });
  });

  describe('eq function', () => {
    const eqFunc = defaultFuncMap.get('eq')!;

    it('should return true for equal values', () => {
      expect(eqFunc('a', 'a')).toBe(true);
      expect(eqFunc(1, 1)).toBe(true);
      expect(eqFunc(true, true)).toBe(true);
      expect(eqFunc(null, null)).toBe(true);
    });

    it('should return false for different values', () => {
      expect(eqFunc('a', 'b')).toBe(false);
      expect(eqFunc(1, 2)).toBe(false);
      expect(eqFunc(true, false)).toBe(false);
      expect(eqFunc(null, undefined)).toBe(false);
    });

    it('should perform strict equality checks', () => {
      expect(eqFunc(1, '1')).toBe(false);
      expect(eqFunc(0, false)).toBe(false);
      expect(eqFunc('', false)).toBe(false);
    });
  });

  describe('len function', () => {
    const lenFunc = defaultFuncMap.get('len')!;

    it('should return the length of an array', () => {
      expect(lenFunc([])).toBe(0);
      expect(lenFunc([1, 2, 3])).toBe(3);
      expect(lenFunc(['a', 'b', 'c', 'd'])).toBe(4);
    });

    it('should handle array-like objects', () => {
      expect(lenFunc('abc')).toBe(3); // String has length property
    });
  });

  describe('lt function', () => {
    const ltFunc = defaultFuncMap.get('lt')!;

    it('should return true if first value is less than second value', () => {
      expect(ltFunc(1, 2)).toBe(true);
      expect(ltFunc(0, 1)).toBe(true);
      expect(ltFunc(-1, 0)).toBe(true);
    });

    it('should return false if first value is greater than or equal to second value', () => {
      expect(ltFunc(2, 1)).toBe(false);
      expect(ltFunc(1, 1)).toBe(false);
      expect(ltFunc(0, -1)).toBe(false);
    });
  });

  describe('sub function', () => {
    const subFunc = defaultFuncMap.get('sub')!;

    it('should subtract the second number from the first number', () => {
      expect(subFunc(5, 3)).toBe(2);
      expect(subFunc(10, 5)).toBe(5);
      expect(subFunc(0, 5)).toBe(-5);
    });

    it('should handle negative numbers', () => {
      expect(subFunc(-5, 3)).toBe(-8);
      expect(subFunc(5, -3)).toBe(8);
      expect(subFunc(-5, -3)).toBe(-2);
    });

    it('should handle decimal numbers', () => {
      expect(subFunc(5.5, 3.3)).toBeCloseTo(2.2);
      expect(subFunc(10.1, 5.1)).toBe(5);
    });
  });
}); 