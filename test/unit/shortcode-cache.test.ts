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
}); 