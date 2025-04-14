import { ShortcodeCache, RenderResult } from '../../src/shortcode-cache';

describe('ShortcodeCache', () => {
  let cache: ShortcodeCache;
  const testKey = 'test-key';
  const testResult: RenderResult = {
    content: '<div>Test content</div>',
    renderedShortcodes: ['shortcode1']
  };

  beforeEach(() => {
    // Create a fresh cache instance before each test
    cache = new ShortcodeCache(3); // Small size for testing cache eviction
  });

  describe('createCacheKey', () => {
    it('should generate consistent cache keys for the same content', () => {
      const content = 'test content';
      const key1 = ShortcodeCache.createCacheKey(content);
      const key2 = ShortcodeCache.createCacheKey(content);
      
      expect(key1).toBe(key2);
    });

    it('should generate different cache keys for different content', () => {
      const content1 = 'test content 1';
      const content2 = 'test content 2';
      const key1 = ShortcodeCache.createCacheKey(content1);
      const key2 = ShortcodeCache.createCacheKey(content2);
      
      expect(key1).not.toBe(key2);
    });
  });

  describe('render result cache', () => {
    it('should store and retrieve a render result', () => {
      cache.set(testKey, testResult);
      const result = cache.get(testKey);
      
      expect(result).toEqual(testResult);
    });

    it('should return undefined for non-existent keys', () => {
      const result = cache.get('non-existent-key');
      
      expect(result).toBeUndefined();
    });

    it('should evict oldest entries when cache limit is reached', () => {
      // Fill the cache
      cache.set('key1', { content: 'content1', renderedShortcodes: [] });
      cache.set('key2', { content: 'content2', renderedShortcodes: [] });
      cache.set('key3', { content: 'content3', renderedShortcodes: [] });
      
      // Add one more item, which should evict the oldest item
      cache.set('key4', { content: 'content4', renderedShortcodes: [] });
      
      // The oldest item (key1) should be evicted
      expect(cache.get('key1')).toBeUndefined();
      expect(cache.get('key2')).not.toBeUndefined();
      expect(cache.get('key3')).not.toBeUndefined();
      expect(cache.get('key4')).not.toBeUndefined();
    });

    it('should update access order when an item is accessed', () => {
      // Fill the cache
      cache.set('key1', { content: 'content1', renderedShortcodes: [] });
      cache.set('key2', { content: 'content2', renderedShortcodes: [] });
      cache.set('key3', { content: 'content3', renderedShortcodes: [] });
      
      // Access the oldest item
      cache.get('key1');
      
      // Add one more item, which should evict the second oldest (key2)
      cache.set('key4', { content: 'content4', renderedShortcodes: [] });
      
      // key1 should still be in the cache since it was accessed
      expect(cache.get('key1')).not.toBeUndefined();
      // key2 should be evicted
      expect(cache.get('key2')).toBeUndefined();
      expect(cache.get('key3')).not.toBeUndefined();
      expect(cache.get('key4')).not.toBeUndefined();
    });
  });

  describe('step cache', () => {
    it('should store and retrieve a step result', () => {
      const content = '<div>Step content</div>';
      cache.setStep(testKey, content);
      const result = cache.getStep(testKey);
      
      expect(result).toBe(content);
    });

    it('should return undefined for non-existent keys in step cache', () => {
      const result = cache.getStep('non-existent-key');
      
      expect(result).toBeUndefined();
    });

    it('should evict oldest entries from step cache when limit is reached', () => {
      // Fill the cache
      cache.setStep('key1', 'content1');
      cache.setStep('key2', 'content2');
      cache.setStep('key3', 'content3');
      
      // Add one more item, which should evict the oldest item
      cache.setStep('key4', 'content4');
      
      // The oldest item (key1) should be evicted
      expect(cache.getStep('key1')).toBeUndefined();
      expect(cache.getStep('key2')).not.toBeUndefined();
      expect(cache.getStep('key3')).not.toBeUndefined();
      expect(cache.getStep('key4')).not.toBeUndefined();
    });

    it('should update access order when a step item is accessed', () => {
      // Fill the cache
      cache.setStep('key1', 'content1');
      cache.setStep('key2', 'content2');
      cache.setStep('key3', 'content3');
      
      // Access the oldest item
      cache.getStep('key1');
      
      // Add one more item, which should evict the second oldest (key2)
      cache.setStep('key4', 'content4');
      
      // key1 should still be in the cache since it was accessed
      expect(cache.getStep('key1')).not.toBeUndefined();
      // key2 should be evicted
      expect(cache.getStep('key2')).toBeUndefined();
      expect(cache.getStep('key3')).not.toBeUndefined();
      expect(cache.getStep('key4')).not.toBeUndefined();
    });
  });

  describe('clear', () => {
    it('should clear both render and step caches', () => {
      // Add items to both caches
      cache.set('render-key', { content: 'render-content', renderedShortcodes: [] });
      cache.setStep('step-key', 'step-content');
      
      // Verify items are in the cache
      expect(cache.get('render-key')).not.toBeUndefined();
      expect(cache.getStep('step-key')).not.toBeUndefined();
      
      // Clear the cache
      cache.clear();
      
      // Verify both caches are empty
      expect(cache.get('render-key')).toBeUndefined();
      expect(cache.getStep('step-key')).toBeUndefined();
    });
  });

  describe('attribute change handling', () => {
    // Helper function to generate test shortcode content with different attributes
    const generateContent = (version: number, color: string, showFooter: boolean) => `
      {{< test-card 
         title="测试卡片 - 第${version}版"
         subtitle="这是一个测试卡片的副标题 ${version}"
         
         section1-badge="核心要点"
         section1-color="${color}"
         section1-content="这是第${version}版卡片的核心内容，用于测试属性变化时的渲染行为"
         
         section2-badge="详细说明"
         section2-color="#E0E0E0"
         section2-content="这是第${version}版卡片的详细说明，包含更多信息和上下文"
         
         ${showFooter ? 'show-footer="true"' : ''}
         ${showFooter ? `footer-text="第${version}版卡片的页脚信息"` : ''}
         ${showFooter ? `page-number="${version}"` : ''}
      />}}
    `;
    
    // Mock function for simulating step render results
    const mockStepRender = (content: string): string => {
      return `<div data-shortcode="test-card">Placeholder for shortcode with hash ${ShortcodeCache.createCacheKey(content)}</div>`;
    };
    
    // Mock function for simulating final render results
    const mockFinalRender = (placeholderContent: string, originalContent: string): string => {
      const colorMatch = originalContent.match(/section1-color="([^"]+)"/);
      const color = colorMatch ? colorMatch[1] : "unknown";
      
      return `
        <div class="test-card">
          <div class="section" style="background-color: ${color}">
            Rendered content with color ${color}
          </div>
        </div>
      `;
    };
    
    it('should generate different cache keys for content with different attributes', () => {
      // Create two versions with only color attribute different
      const content1 = generateContent(1, "#FFB6C1", true);  // Pink
      const content2 = generateContent(1, "#00FF00", true);  // Green (same version but different color)
      
      const contentKey1 = ShortcodeCache.createCacheKey(content1);
      const contentKey2 = ShortcodeCache.createCacheKey(content2);
      
      expect(contentKey1).not.toBe(contentKey2);
    });
    
    it('should properly handle full content caching with different attributes', () => {
      const content1 = generateContent(1, "#FFB6C1", true);  // Pink
      const contentKey1 = ShortcodeCache.createCacheKey(content1);
      
      // Mock result for the first content
      const result1: RenderResult = {
        content: mockFinalRender('placeholder1', content1),
        renderedShortcodes: ['test-card']
      };
      
      // Store and retrieve the content
      cache.set(contentKey1, result1);
      const cachedResult = cache.get(contentKey1);
      
      expect(cachedResult).toBeDefined();
      expect(cachedResult?.content).toContain('#FFB6C1');
    });
    
    it('should properly handle step caching with content tracking', () => {
      // Create test content with different attributes
      const content1 = generateContent(1, "#FFB6C1", true);  // Pink
      const content2 = generateContent(1, "#00FF00", true);  // Green
      
      // Generate cache keys
      const contentKey1 = ShortcodeCache.createCacheKey(content1);
      const contentKey2 = ShortcodeCache.createCacheKey(content2);
      
      // Generate step keys and results
      const stepKey1 = ShortcodeCache.createCacheKey(`step:${content1}`);
      const stepKey2 = ShortcodeCache.createCacheKey(`step:${content2}`);
      const stepResult1 = mockStepRender(content1);
      const stepResult2 = mockStepRender(content2);
      
      // Cache the first step result
      cache.setStep(stepKey1, stepResult1, contentKey1);
      
      // Verify step is cached correctly
      const cachedStep1 = cache.getStep(stepKey1, contentKey1);
      expect(cachedStep1).toBe(stepResult1);
      
      // Test final render caching for the first content
      const finalKey1 = ShortcodeCache.createCacheKey(`final:${stepResult1}`);
      const finalResult1 = mockFinalRender(stepResult1, content1);
      
      // Cache the final result and track relationship
      cache.setStep(finalKey1, finalResult1);
      cache.trackStepToFinal(stepKey1, finalKey1);
      
      // Now cache the second step result
      cache.setStep(stepKey2, stepResult2, contentKey2);
      
      // This is the critical test: verify that we can't retrieve step1 with content2's key
      const wrongKeyStep = cache.getStep(stepKey1, contentKey2);
      expect(wrongKeyStep).toBeUndefined();
      
      // Verify we can get step2 with its correct content key
      const correctStep2 = cache.getStep(stepKey2, contentKey2);
      expect(correctStep2).toBe(stepResult2);
    });
    
    it('should properly invalidate final caches when content changes', () => {
      // Set up the initial cache state
      const content1 = generateContent(1, "#FFB6C1", true);  // Pink
      const contentKey1 = ShortcodeCache.createCacheKey(content1);
      const stepKey1 = ShortcodeCache.createCacheKey(`step:${content1}`);
      const stepResult1 = mockStepRender(content1);
      
      // Cache step and track final render
      cache.setStep(stepKey1, stepResult1, contentKey1);
      const finalKey1 = ShortcodeCache.createCacheKey(`final:${stepResult1}`);
      const finalResult1 = mockFinalRender(stepResult1, content1);
      cache.setStep(finalKey1, finalResult1);
      cache.trackStepToFinal(stepKey1, finalKey1);
      
      // Verify the final result is cached
      expect(cache.getStep(finalKey1)).toBe(finalResult1);
      
      // Now invalidate the step's final caches
      cache.invalidateFinalCachesForStep(stepKey1);
      
      // Verify the final cache is invalidated
      expect(cache.getStep(finalKey1)).toBeUndefined();
    });
    
    it('should handle when the same step is used with different content', () => {
      // Create two contents with different attributes
      const content1 = generateContent(1, "#FFB6C1", true);  // Pink
      const content2 = generateContent(1, "#00FF00", true);  // Green
      
      // For testing purposes, force the same step key for both contents
      // (this shouldn't happen normally, but tests the cache's robustness)
      const sameStepKey = 'forced-same-step-key';
      const contentKey1 = ShortcodeCache.createCacheKey(content1);
      const contentKey2 = ShortcodeCache.createCacheKey(content2);
      
      // First associate the step with content1
      cache.setStep(sameStepKey, 'Step Result 1', contentKey1);
      
      // Verify we can retrieve it with content1's key
      expect(cache.getStep(sameStepKey, contentKey1)).toBe('Step Result 1');
      
      // Now associate the same step with content2 (this should invalidate previous final caches)
      cache.setStep(sameStepKey, 'Step Result 2', contentKey2);
      
      // Verify we can get the new result with content2's key
      expect(cache.getStep(sameStepKey, contentKey2)).toBe('Step Result 2');
      
      // Verify we can't get the new result with content1's key
      expect(cache.getStep(sameStepKey, contentKey1)).toBeUndefined();
    });
  });
}); 