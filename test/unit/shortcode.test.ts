import { Shortcode } from '../../src/shortcode';
import { ShortcodeManager, ShortcodeMetadata } from '../../src/shortcode-manager';
import { ShortcodeRenderer, PageRenderer } from '@mdfriday/shortcode-compiler';
import { Theme } from '../../src/theme';

// Mock for PageRenderer
const mockRender = jest.fn().mockImplementation((content, options) => {
  if (options && options.stepRender) {
    return { content: 'step-rendered-customize' };
  }
  return { content: 'rendered-customize' };
});

const mockFinalRender = jest.fn().mockReturnValue('final-rendered-customize');

// Mock dependencies
jest.mock('@mdfriday/shortcode-compiler', () => ({
  ShortcodeRenderer: jest.fn().mockImplementation(() => ({
    registerTemplateShortcode: jest.fn()
  })),
  PageRenderer: jest.fn().mockImplementation(() => ({
    render: mockRender,
    finalRender: mockFinalRender
  }))
}));

jest.mock('../../src/theme', () => ({
  Theme: jest.fn().mockImplementation(() => ({
    manager: jest.fn().mockReturnValue({})
  }))
}));

// Mock ShortcodeManager with jest.fn() for static methods
const mockRegisterShortcode = jest.fn().mockReturnValue(true);
const mockExistsById = jest.fn().mockImplementation(id => id === 1);
const mockFindByName = jest.fn().mockImplementation(name => name === 'testShortcode' ? { name: 'testShortcode' } : undefined);
const mockFindByUuid = jest.fn().mockImplementation(uuid => uuid === 'test-uuid' ? { uuid: 'test-uuid' } : undefined);
const mockFindById = jest.fn().mockImplementation(id => id === 1 ? { id: 1 } : undefined);
const mockGetAllShortcodes = jest.fn().mockReturnValue([{ id: 1, name: 'testShortcode' }]);
const mockGetDefaultFuncMap = jest.fn().mockReturnValue(new Map([['split', () => []]]));
const mockGetDefaultDataProvider = jest.fn().mockReturnValue(() => ({}));

jest.mock('../../src/shortcode-manager', () => {
  return {
    ShortcodeManager: jest.fn().mockImplementation(() => ({
      registerShortcode: mockRegisterShortcode,
      existsById: mockExistsById,
      findByName: mockFindByName,
      findByUuid: mockFindByUuid,
      findById: mockFindById,
      getAllShortcodes: mockGetAllShortcodes,
      getDefaultFuncMap: mockGetDefaultFuncMap,
      getDefaultDataProvider: mockGetDefaultDataProvider
    }))
  };
});

describe('Shortcode', () => {
  let shortcode: Shortcode;
  let testMetadata: ShortcodeMetadata;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Also reset the mock render functions
    mockRender.mockClear();
    mockFinalRender.mockClear();
    
    // Create a new instance
    shortcode = new Shortcode();
    
    // Create test metadata
    testMetadata = {
      id: 1,
      uuid: 'test-uuid',
      name: 'testShortcode',
      template: '<div>Test shortcode</div>'
    };
  });

  describe('constructor', () => {
    it('should create the necessary managers and renderers', () => {
      expect(Theme).toHaveBeenCalledWith('mdf');
      expect(ShortcodeRenderer).toHaveBeenCalled();
      expect(ShortcodeManager).toHaveBeenCalled();
      expect(PageRenderer).toHaveBeenCalled();
    });
  });

  describe('shortcode registration and lookup', () => {
    it('should register a shortcode', () => {
      const result = shortcode.registerShortcode(testMetadata);
      
      expect(result).toBe(true);
      expect(mockRegisterShortcode).toHaveBeenCalledWith(
        testMetadata,
        expect.any(Object),
        undefined
      );
    });

    it('should register a shortcode with customize options', () => {
      const options = {
        funcMap: new Map([['test', () => {}]]),
        dataProvider: () => ({})
      };
      
      shortcode.registerShortcode(testMetadata, options);
      
      expect(mockRegisterShortcode).toHaveBeenCalledWith(
        testMetadata,
        expect.any(Object),
        options
      );
    });

    it('should check if a shortcode exists by ID', () => {
      expect(shortcode.existsById(1)).toBe(true);
      expect(shortcode.existsById(2)).toBe(false);
      expect(mockExistsById).toHaveBeenCalledTimes(2);
    });

    it('should find a shortcode by name', () => {
      expect(shortcode.findByName('testShortcode')).toEqual({ name: 'testShortcode' });
      expect(shortcode.findByName('nonExistent')).toBeUndefined();
      expect(mockFindByName).toHaveBeenCalledTimes(2);
    });

    it('should find a shortcode by UUID', () => {
      expect(shortcode.findByUuid('test-uuid')).toEqual({ uuid: 'test-uuid' });
      expect(shortcode.findByUuid('nonExistent')).toBeUndefined();
      expect(mockFindByUuid).toHaveBeenCalledTimes(2);
    });

    it('should find a shortcode by ID', () => {
      expect(shortcode.findById(1)).toEqual({ id: 1 });
      expect(shortcode.findById(2)).toBeUndefined();
      expect(mockFindById).toHaveBeenCalledTimes(2);
    });

    it('should get all shortcodes', () => {
      expect(shortcode.getAllShortcodes()).toEqual([{ id: 1, name: 'testShortcode' }]);
      expect(mockGetAllShortcodes).toHaveBeenCalled();
    });

    it('should get default function map', () => {
      shortcode.getDefaultFuncMap();
      expect(mockGetDefaultFuncMap).toHaveBeenCalled();
    });

    it('should get default data provider', () => {
      shortcode.getDefaultDataProvider();
      expect(mockGetDefaultDataProvider).toHaveBeenCalled();
    });
  });

  describe('rendering', () => {
    const markdownContent = '# Test\n{{< testShortcode >}}';
    const htmlContent = '<h1>Test</h1>\n<!-- SHORTCODE_PLACEHOLDER_0 -->';

    it('should render markdown customize', () => {
      // Set up cache miss first, then hit

      const result = shortcode.render(markdownContent);
      
      expect(result).toBe('rendered-customize');
      expect(mockRender).toHaveBeenCalledWith(markdownContent);

      // Should still be called only once
      expect(mockRender).toHaveBeenCalledTimes(1);
    });

    it('should perform step rendering', () => {
      const result = shortcode.stepRender(markdownContent);
      
      expect(result).toBe('step-rendered-customize');
      expect(mockRender).toHaveBeenCalledWith(
        markdownContent, 
        { stepRender: true }
      );

      // Should still be called only once
      expect(mockRender).toHaveBeenCalledTimes(1);
    });

    it('should perform final rendering', () => {
      const result = shortcode.finalRender(htmlContent);
      
      expect(result).toBe('final-rendered-customize');
      expect(mockFinalRender).toHaveBeenCalledWith(htmlContent);

      // Should still be called only once
      expect(mockFinalRender).toHaveBeenCalledTimes(1);
    });

  });
}); 