/**
 * Represents a result from the shortcode rendering process
 */
export interface RenderResult {
  content: string;
  renderedShortcodes: string[];
}

/**
 * A cache for rendered shortcode content to improve performance
 */
export class ShortcodeCache {
  private cache: Map<string, RenderResult> = new Map();
  private stepCache: Map<string, string> = new Map();
  private contentToStepKeys: Map<string, string> = new Map();
  private stepToFinalKeys: Map<string, string[]> = new Map();
  private maxCacheSize: number;
  
  // 添加静态属性用于跟踪最后使用的步骤缓存键
  static lastStepKey: string = '';

  constructor(maxCacheSize: number = 100) {
    this.maxCacheSize = maxCacheSize;
  }

  /**
   * Get a rendered content from the cache
   * @param key The cache key (typically a hash of the markdown content)
   * @returns The cached render result or undefined if not found
   */
  get(key: string): RenderResult | undefined {
    const result = this.cache.get(key);
    if (result) {
      // Move this item to the end of the cache to mark as recently used
      this.cache.delete(key);
      this.cache.set(key, result);
    }
    return result;
  }

  /**
   * Store a rendered content in the cache
   * @param key The cache key (typically a hash of the markdown content)
   * @param result The rendered result to cache
   */
  set(key: string, result: RenderResult): void {
    // Implement cache size limit
    if (this.cache.size >= this.maxCacheSize) {
      // Remove the oldest entry (first item in the Map)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    
    // Add the new entry
    this.cache.set(key, result);
  }

  /**
   * Get a step-rendered content from the cache
   * @param key The cache key for the step
   * @param originalKey The key of the original content (for tracking relationships)
   * @returns The cached step content or undefined if not found
   */
  getStep(key: string, originalKey?: string): string | undefined {
    if (originalKey && this.contentToStepKeys.get(originalKey) !== key) {
      return undefined;
    }

    const result = this.stepCache.get(key);
    if (result) {
      // Move this item to the end of the cache to mark as recently used
      this.stepCache.delete(key);
      this.stepCache.set(key, result);
    }
    return result;
  }

  /**
   * Store a step-rendered content in the cache
   * @param key The cache key for the step
   * @param content The rendered step content to cache
   * @param originalKey The key of the original content (for tracking relationships)
   */
  setStep(key: string, content: string, originalKey?: string): void {
    // Implement cache size limit
    if (this.stepCache.size >= this.maxCacheSize) {
      // Remove the oldest entry (first item in the Map)
      const firstKey = this.stepCache.keys().next().value;
      if (firstKey !== undefined) {
        this.stepCache.delete(firstKey);
      }
    }
    
    // Add the new entry
    this.stepCache.set(key, content);

    // 如果提供了原始内容的key，保存关系映射
    if (originalKey) {
      // 如果原始内容变化了，清除相关的最终渲染缓存
      const oldStepKey = this.contentToStepKeys.get(originalKey);
      if (oldStepKey && oldStepKey !== key) {
        this.invalidateFinalCachesForStep(oldStepKey);
      }
      
      // 更新关系映射
      this.contentToStepKeys.set(originalKey, key);
    }
  }

  /**
   * Track relationship between step rendering and final rendering
   * @param stepKey The key of the step rendering
   * @param finalKey The key of the final rendering
   */
  trackStepToFinal(stepKey: string, finalKey: string): void {
    if (!this.stepToFinalKeys.has(stepKey)) {
      this.stepToFinalKeys.set(stepKey, []);
    }
    
    const finalKeys = this.stepToFinalKeys.get(stepKey)!;
    if (!finalKeys.includes(finalKey)) {
      finalKeys.push(finalKey);
    }
  }

  /**
   * Invalidate all final render caches related to a specific step
   * @param stepKey The key of the step rendering
   */
  invalidateFinalCachesForStep(stepKey: string): void {
    const finalKeys = this.stepToFinalKeys.get(stepKey);
    if (finalKeys) {
      for (const finalKey of finalKeys) {
        this.stepCache.delete(finalKey);
      }
      // 清除关系映射
      this.stepToFinalKeys.delete(stepKey);
    }
  }

  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear();
    this.stepCache.clear();
    this.contentToStepKeys.clear();
    this.stepToFinalKeys.clear();
  }

  /**
   * Create a simple hash of the content for use as a cache key
   * @param content The content to hash
   * @returns A hash string
   */
  static createCacheKey(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  }
} 