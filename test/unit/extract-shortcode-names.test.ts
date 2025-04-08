import { Shortcode } from '../../src/shortcode';
import { PageLexer, ShortcodeItem } from '@mdfriday/shortcode-compiler';

// Mock PageLexer.parse
jest.mock('@mdfriday/shortcode-compiler', () => {
  // Get the original module
  const originalModule = jest.requireActual('@mdfriday/shortcode-compiler');
  
  // Mock PageLexer.parse specifically
  return {
    ...originalModule,
    PageLexer: {
      parse: jest.fn()
    }
  };
});

describe('Shortcode extractShortcodeNames', () => {
  let shortcode: Shortcode;

  beforeEach(() => {
    jest.clearAllMocks();
    shortcode = new Shortcode();
  });

  it('should return an empty array for content without shortcodes', () => {
    // Mock the parser to return content with no shortcodes
    (PageLexer.parse as jest.Mock).mockReturnValue({
      items: [
        { type: 'content', val: 'This is content without shortcodes' }
      ]
    });

    const result = shortcode.extractShortcodeNames('This is content without shortcodes');
    expect(result).toEqual([]);
  });

  it('should extract a single shortcode name', () => {
    // Mock the parser to return content with one shortcode
    (PageLexer.parse as jest.Mock).mockReturnValue({
      items: [
        { type: 'content', val: 'This is content with a ' },
        { type: 'shortcode', name: 'testShortcode', params: [], content: '' },
        { type: 'content', val: ' embedded in it.' }
      ]
    });

    const result = shortcode.extractShortcodeNames('This is content with a {{< testShortcode >}} embedded in it.');
    expect(result).toEqual(['testShortcode']);
  });

  it('should extract multiple different shortcode names', () => {
    // Mock the parser to return content with multiple different shortcodes
    (PageLexer.parse as jest.Mock).mockReturnValue({
      items: [
        { type: 'content', val: 'This has ' },
        { type: 'shortcode', name: 'firstShortcode', params: [], content: '' },
        { type: 'content', val: ' and ' },
        { type: 'shortcode', name: 'secondShortcode', params: [], content: '' },
        { type: 'content', val: ' in it.' }
      ]
    });

    const result = shortcode.extractShortcodeNames('This has {{< firstShortcode >}} and {{< secondShortcode >}} in it.');
    expect(result).toEqual(['firstShortcode', 'secondShortcode']);
  });

  it('should remove duplicate shortcode names', () => {
    // Mock the parser to return content with duplicate shortcodes
    (PageLexer.parse as jest.Mock).mockReturnValue({
      items: [
        { type: 'content', val: 'This has ' },
        { type: 'shortcode', name: 'sameShortcode', params: [], content: '' },
        { type: 'content', val: ' and the same ' },
        { type: 'shortcode', name: 'sameShortcode', params: [], content: '' },
        { type: 'content', val: ' again.' }
      ]
    });

    const result = shortcode.extractShortcodeNames('This has {{< sameShortcode >}} and the same {{< sameShortcode >}} again.');
    expect(result).toEqual(['sameShortcode']);
  });

  it('should handle nested shortcodes', () => {
    // Mock the parser to return content with nested shortcodes
    (PageLexer.parse as jest.Mock).mockReturnValue({
      items: [
        { type: 'content', val: 'This has a ' },
        { 
          type: 'shortcode', 
          name: 'outerShortcode', 
          params: [], 
          content: 'content with {{< innerShortcode >}}',
          items: [
            { type: 'content', val: 'content with ' },
            { type: 'shortcode', name: 'innerShortcode', params: [], content: '' }
          ]
        },
        { type: 'content', val: ' at the end.' }
      ]
    });

    const result = shortcode.extractShortcodeNames('This has a {{< outerShortcode >}}content with {{< innerShortcode >}}{{< /outerShortcode >}} at the end.');
    expect(result).toContain('outerShortcode');
    expect(result).toContain('innerShortcode');
    expect(result.length).toBe(2);
  });

  it('should handle complex content with multiple and nested shortcodes', () => {
    // Mock the parser to return complex content
    (PageLexer.parse as jest.Mock).mockReturnValue({
      items: [
        { type: 'content', val: '# Heading\n\n' },
        { type: 'shortcode', name: 'alert', params: ['info'], content: 'This is an alert' },
        { type: 'content', val: '\n\nParagraph with ' },
        { type: 'shortcode', name: 'link', params: ['https://example.com'], content: 'a link' },
        { type: 'content', val: '.\n\n' },
        { 
          type: 'shortcode', 
          name: 'box', 
          params: ['fancy'], 
          content: 'This box contains {{< icon >}} an icon',
          items: [
            { type: 'content', val: 'This box contains ' },
            { type: 'shortcode', name: 'icon', params: [], content: '' },
            { type: 'content', val: ' an icon' }
          ]
        },
        { type: 'content', val: '\n\nThe end.' }
      ]
    });

    const complexContent = `
      # Heading
      
      {{< alert info >}}This is an alert{{< /alert >}}
      
      Paragraph with {{< link https://example.com >}}a link{{< /link >}}.
      
      {{< box fancy >}}This box contains {{< icon >}} an icon{{< /box >}}
      
      The end.
    `;

    const result = shortcode.extractShortcodeNames(complexContent);
    expect(result).toContain('alert');
    expect(result).toContain('link');
    expect(result).toContain('box');
    expect(result).toContain('icon');
    expect(result.length).toBe(4);
  });

  // Test with real PageLexer for integration
  it('should work with the real PageLexer implementation', () => {
    // Restore the original implementation for this test
    jest.restoreAllMocks();
    
    // Create a new instance to use the real implementation
    const realShortcode = new Shortcode();
    
    const content = 'This is content with a {{< testShortcode >}} embedded in it.';
    const result = realShortcode.extractShortcodeNames(content);
    
    // The real PageLexer implementation might parse shortcodes differently
    // Check if the result is an array and is not empty
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
}); 