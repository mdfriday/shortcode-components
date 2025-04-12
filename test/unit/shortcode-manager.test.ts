import { ShortcodeManager, ShortcodeMetadata } from '../../src/shortcode-manager';
import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';

// Mock dependencies
jest.mock('@mdfriday/shortcode-compiler', () => ({
  ShortcodeRenderer: jest.fn().mockImplementation(() => ({
    registerTemplateShortcode: jest.fn()
  }))
}));

// Mock the ThemeManager class
const mockThemeManager = {
  // Add any methods or properties needed for the tests
};

jest.mock('../../src/themes', () => ({
  ThemeManager: jest.fn().mockImplementation(() => mockThemeManager)
}));

describe('ShortcodeManager', () => {
  let manager: ShortcodeManager;
  let mockRenderer: ShortcodeRenderer;
  let testMetadata: ShortcodeMetadata;

  beforeEach(() => {
    manager = new ShortcodeManager(mockThemeManager as any);
    
    mockRenderer = new ShortcodeRenderer() as jest.Mocked<ShortcodeRenderer>;
    
    // Create a test metadata object
    testMetadata = {
      id: 1,
      uuid: 'test-uuid',
      name: 'testShortcode',
      template: '<div>{{ .Get "content" }}</div>',
      slug: 'test-slug',
      tags: ['test', 'example']
    };
  });

  describe('registerShortcode', () => {
    it('should register a shortcode successfully', () => {
      const result = manager.registerShortcode(testMetadata, mockRenderer);
      
      // Check the result
      expect(result).toBe(true);
      
      // Verify the shortcode renderer was called
      expect(mockRenderer.registerTemplateShortcode).toHaveBeenCalledWith(
        testMetadata.name,
        expect.objectContaining({
          template: testMetadata.template
        })
      );
    });

    it('should not register a duplicate shortcode by ID', () => {
      // Register the shortcode first time
      manager.registerShortcode(testMetadata, mockRenderer);
      
      // Clear the mock to verify it's not called again
      (mockRenderer.registerTemplateShortcode as jest.Mock).mockClear();
      
      // Try to register again with the same ID
      const result = manager.registerShortcode(testMetadata, mockRenderer);
      
      // Should return false and not call the renderer again
      expect(result).toBe(false);
      expect(mockRenderer.registerTemplateShortcode).not.toHaveBeenCalled();
    });

    it('should not register a duplicate shortcode by UUID', () => {
      // Register the shortcode first time
      manager.registerShortcode(testMetadata, mockRenderer);
      
      // Clear the mock to verify it's not called again
      (mockRenderer.registerTemplateShortcode as jest.Mock).mockClear();
      
      // Try to register again with the same UUID but different ID
      const newMetadata = { ...testMetadata, id: 2 };
      const result = manager.registerShortcode(newMetadata, mockRenderer);
      
      // Should return false and not call the renderer again
      expect(result).toBe(false);
      expect(mockRenderer.registerTemplateShortcode).not.toHaveBeenCalled();
    });

    it('should use default funcMap and dataProvider if not provided', () => {
      manager.registerShortcode(testMetadata, mockRenderer);
      
      // Verify the renderer was called with default options
      expect(mockRenderer.registerTemplateShortcode).toHaveBeenCalledWith(
        testMetadata.name,
        expect.objectContaining({
          template: testMetadata.template,
          funcMap: expect.any(Map),
          dataProvider: expect.any(Function)
        })
      );
    });

    it('should use custom funcMap and dataProvider if provided', () => {
      const customFuncMap = new Map([['custom', () => 'custom']]);
      const customDataProvider = () => ({ custom: 'data' });
      
      manager.registerShortcode(testMetadata, mockRenderer, {
        funcMap: customFuncMap,
        dataProvider: customDataProvider
      });
      
      // Verify the renderer was called with custom options
      expect(mockRenderer.registerTemplateShortcode).toHaveBeenCalledWith(
        testMetadata.name,
        expect.objectContaining({
          template: testMetadata.template,
          funcMap: customFuncMap,
          dataProvider: customDataProvider
        })
      );
    });
  });

  describe('finding shortcodes', () => {
    beforeEach(() => {
      // Register a test shortcode
      manager.registerShortcode(testMetadata, mockRenderer);
    });

    it('should find a shortcode by name', () => {
      const result = manager.findByName(testMetadata.name);
      
      expect(result).toEqual(testMetadata);
    });

    it('should return undefined when finding by a non-existent name', () => {
      const result = manager.findByName('non-existent-name');
      
      expect(result).toBeUndefined();
    });

    it('should find a shortcode by UUID', () => {
      const result = manager.findByUuid(testMetadata.uuid!);
      
      expect(result).toEqual(testMetadata);
    });

    it('should return undefined when finding by a non-existent UUID', () => {
      const result = manager.findByUuid('non-existent-uuid');
      
      expect(result).toBeUndefined();
    });

    it('should find a shortcode by ID', () => {
      const result = manager.findById(testMetadata.id);
      
      expect(result).toEqual(testMetadata);
    });

    it('should return undefined when finding by a non-existent ID', () => {
      const result = manager.findById(999);
      
      expect(result).toBeUndefined();
    });

    it('should check if a shortcode exists by ID', () => {
      expect(manager.existsById(testMetadata.id)).toBe(true);
      expect(manager.existsById(999)).toBe(false);
    });

    it('should get all registered shortcodes', () => {
      // Register another shortcode
      const anotherMetadata = { ...testMetadata, id: 2, name: 'anotherShortcode', uuid: 'another-uuid' };
      manager.registerShortcode(anotherMetadata, mockRenderer);
      
      const allShortcodes = manager.getAllShortcodes();
      
      expect(allShortcodes).toHaveLength(2);
      expect(allShortcodes).toEqual(expect.arrayContaining([testMetadata, anotherMetadata]));
    });
  });

  describe('utility methods', () => {
    it('should provide a default data provider', () => {
      const dataProvider = manager.getDefaultDataProvider();
      const result = dataProvider(['param=value'], 'content');
      
      expect(result).toEqual({ Inner: 'content' });
    });

    it('should provide a default function map', () => {
      const funcMap = manager.getDefaultFuncMap();
      
      expect(funcMap).toBeInstanceOf(Map);
      expect(funcMap.has('split')).toBe(true);
      
      // Test the split function
      const splitFunc = funcMap.get('split')!;
      expect(splitFunc('a,b,c', ',')).toEqual(['a', 'b', 'c']);
    });
  });
}); 