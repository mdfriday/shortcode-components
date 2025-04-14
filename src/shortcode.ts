import {ShortcodeRenderer, PageRenderer, PageLexer, ShortcodeItem} from '@mdfriday/shortcode-compiler';
import {Theme} from './theme';
import {ThemeManager} from "./themes";
import {ShortcodeManager, ShortcodeMetadata, ShortcodeTemplateOptions} from "./shortcode-manager";
import {ShortcodeCache, RenderResult} from "./shortcode-cache";

export class Shortcode {
    private readonly themeManager: ThemeManager;
    private readonly renderer: ShortcodeRenderer;
    private readonly pageRenderer: PageRenderer;
    private readonly manager: ShortcodeManager;
    private readonly cache: ShortcodeCache;

    constructor(cacheSizeLimit: number = 100) {
        this.themeManager = new Theme('mdf').manager();
        this.renderer = new ShortcodeRenderer();
        this.manager = new ShortcodeManager(this.themeManager);
        this.pageRenderer = new PageRenderer(this.renderer);
        this.cache = new ShortcodeCache(cacheSizeLimit);
    }

    /**
     * Register a shortcode template dynamically
     * @param metadata The metadata of the shortcode
     * @param options Additional options for the template (funcMap, dataProvider)
     * @returns true if the shortcode was registered, false if it already exists
     */
    registerShortcode(
        metadata: ShortcodeMetadata,
        options?: Partial<ShortcodeTemplateOptions>
    ): boolean {
        return this.manager.registerShortcode(metadata, this.renderer, options);
    }

    /**
     * Check if a shortcode with the given ID already exists
     * @param id The ID of the shortcode
     * @returns true if the shortcode exists, false otherwise
     */
    existsById(id: string | number): boolean {
        return this.manager.existsById(id);
    }

    /**
     * Find a shortcode by its name
     * @param name The name of the shortcode
     * @returns The shortcode metadata or undefined if not found
     */
    findByName(name: string): ShortcodeMetadata | undefined {
        return this.manager.findByName(name);
    }

    /**
     * Find a shortcode by its UUID
     * @param uuid The UUID of the shortcode
     * @returns The shortcode metadata or undefined if not found
     */
    findByUuid(uuid: string): ShortcodeMetadata | undefined {
        return this.manager.findByUuid(uuid);
    }

    /**
     * Find a shortcode by its ID
     * @param id The ID of the shortcode
     * @returns The shortcode metadata or undefined if not found
     */
    findById(id: string | number): ShortcodeMetadata | undefined {
        return this.manager.findById(id);
    }

    /**
     * Get all registered shortcodes
     * @returns An array of shortcode metadata
     */
    getAllShortcodes(): ShortcodeMetadata[] {
        return this.manager.getAllShortcodes();
    }

    /**
     * Get default function map that can be used with shortcodes
     * @returns The default function map
     */
    getDefaultFuncMap(): Map<string, (...args: any[]) => any> {
        return this.manager.getDefaultFuncMap();
    }

    /**
     * Get default data provider function
     * @returns A function that can be used as a data provider for shortcodes
     */
    getDefaultDataProvider(): (params: string[], content?: string) => Record<string, any> {
        return this.manager.getDefaultDataProvider();
    }

    /**
     * Extract all shortcode names from markdown content
     * @param markdownContent The markdown content to extract shortcode names from
     * @returns An array of shortcode names found in the content
     */
    extractShortcodeNames(markdownContent: string): string[] {
        // Parse the content using PageLexer
        const result = PageLexer.parse(markdownContent);
        
        // Set to collect unique shortcode names
        const shortcodeNames: Set<string> = new Set();
        
        // Recursive function to process items and collect shortcode names
        const processItems = (items: any[]) => {
            if (!items || !Array.isArray(items)) return;
            
            for (const item of items) {
                if (item.type === 'shortcode') {
                    // Add the shortcode name
                    shortcodeNames.add(item.name);
                    
                    // Process nested items if they exist
                    if (item.items && Array.isArray(item.items)) {
                        processItems(item.items);
                    }
                }
            }
        };
        
        // Process all items
        processItems(result.items);
        
        // Return the unique shortcode names as an array
        return Array.from(shortcodeNames);
    }

    /**
     * Clear the rendering cache
     */
    clearCache(): void {
        this.cache.clear();
    }

    /**
     * Create a cache key for the given content
     * @param content The content to create a key for
     * @returns A string key
     */
    private createCacheKey(content: string): string {
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            const char = content.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString(36);
    }

    /**
     * Perform a complete rendering of markdown content with shortcodes
     * @param markdownContent The markdown content to render
     * @returns The fully rendered content
     */
    render(markdownContent: string): string {
        // Check cache first
        const cacheKey = this.createCacheKey(markdownContent);
        const cachedResult = this.cache.get(cacheKey);
        
        if (cachedResult) {
            return cachedResult.content;
        }
        
        // Render the content
        const renderedResult = this.pageRenderer.render(markdownContent);
        
        // Store in cache for future use
        this.cache.set(cacheKey, {
            content: renderedResult.content,
            renderedShortcodes: [] // We don't have rendered shortcodes information in the current API
        });
        
        return renderedResult.content;
    }

    /**
     * First step of the rendering process - replaces shortcodes with placeholders
     * @param markdownContent The markdown content to process
     * @returns The content with shortcodes replaced by placeholders
     */
    stepRender(markdownContent: string): string {
        // 创建原始内容的缓存键
        const originalCacheKey = this.createCacheKey(markdownContent);
        
        // 创建步骤缓存键
        const stepCacheKey = this.createCacheKey(`step:${markdownContent}`);
        
        // 检查缓存，同时传入原始内容的键以验证内容是否变化
        const cachedResult = this.cache.getStep(stepCacheKey, originalCacheKey);
        
        if (cachedResult) {
            // 即使是缓存的结果，也更新最后的步骤键
            ShortcodeCache.lastStepKey = stepCacheKey;
            return cachedResult;
        }
        
        // Process the first step
        const stepResult = this.pageRenderer.render(markdownContent, { stepRender: true });
        
        // Store in cache for future use,同时保存与原始内容的关系
        this.cache.setStep(stepCacheKey, stepResult.content, originalCacheKey);
        
        // 更新最后的步骤键
        ShortcodeCache.lastStepKey = stepCacheKey;
        
        return stepResult.content;
    }

    /**
     * Final step of the rendering process - replaces placeholders with rendered shortcodes
     * @param htmlContent The HTML content with placeholders
     * @returns The fully rendered HTML content
     */
    finalRender(htmlContent: string): string {
        // 尝试找到生成这个 HTML 内容的原始步骤缓存键
        // 这里我们使用带前缀的键，需要在步骤渲染时保存关联关系
        const finalCacheKey = this.createCacheKey(`final:${htmlContent}`);
        
        // 检查缓存
        const cachedResult = this.cache.getStep(finalCacheKey);
        
        if (cachedResult) {
            return cachedResult;
        }
        
        // Process the final step
        const finalResult = this.pageRenderer.finalRender(htmlContent);
        
        // 保存到缓存
        this.cache.setStep(finalCacheKey, finalResult);
        
        // 获取最近一次的步骤缓存键（假设是上次调用 stepRender 保存的）
        // 这通常就是生成当前 HTML 内容的步骤
        // 注意：这种方法假设 stepRender 和 finalRender 是依次调用的
        // 在真实场景中，可能需要在 stepRender 时保存上下文，并在 finalRender 中传递
        
        // 跟踪步骤缓存与最终缓存的关系
        // 我们需要找出是哪个步骤生成了当前的 HTML 内容
        // 这里使用简单的启发式方法：假设最近处理的 stepRender 生成了当前的 HTML
        
        // 在这个实现中，我们需要从外部传递上下文或添加额外信息
        // 作为简单修复，我们可以使用静态方法保存最后的步骤键
        if (ShortcodeCache.lastStepKey) {
            this.cache.trackStepToFinal(ShortcodeCache.lastStepKey, finalCacheKey);
        }
        
        return finalResult;
    }
}
