import { ThemeManager, ThemeManagerOptions, ThemeRegistrationOptions, ThemeChangeListener } from '../types/theme-manager';
import { CSSFrameworkAdapter } from '../types';

/**
 * 默认主题管理器配置
 */
const DEFAULT_OPTIONS: ThemeManagerOptions = {
  defaultTheme: 'default',
  storageKey: 'mdf-theme',
  enableStorage: true,
  autoApplyCSS: true,
  targetElement: typeof document !== 'undefined' ? document.head : undefined
};

/**
 * 主题管理器实现
 */
export class DefaultThemeManager implements ThemeManager {
  private options: ThemeManagerOptions;
  private currentTheme: string;
  private themes: Map<string, any>;
  private listeners: Set<ThemeChangeListener>;
  private adapter?: CSSFrameworkAdapter;

  constructor(options: ThemeManagerOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.themes = new Map();
    this.listeners = new Set();
    this.currentTheme = this.loadInitialTheme();
  }

  /**
   * 设置CSS框架适配器
   */
  setAdapter(adapter: CSSFrameworkAdapter): void {
    this.adapter = adapter;
    // 如果已有当前主题，立即应用
    if (this.currentTheme) {
      this.applyThemeCSS(this.getCurrentThemeConfig());
    }
  }

  /**
   * 获取CSS框架适配器
   */
  getAdapter(): CSSFrameworkAdapter | undefined {
    return this.adapter;
  }

  /**
   * 加载初始主题
   */
  private loadInitialTheme(): string {
    if (this.options.enableStorage && typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(this.options.storageKey!);
      if (stored && this.themes.has(stored)) {
        return stored;
      }
    }
    return this.options.defaultTheme!;
  }

  /**
   * 保存当前主题到存储
   */
  private saveTheme(themeName: string): void {
    if (this.options.enableStorage && typeof window !== 'undefined') {
      window.localStorage.setItem(this.options.storageKey!, themeName);
    }
  }

  /**
   * 通知主题变更
   */
  private notifyThemeChange(newTheme: string, oldTheme: string): void {
    this.listeners.forEach(listener => {
      try {
        listener(newTheme, oldTheme);
      } catch (error) {
        console.error('Error in theme change listener:', error);
      }
    });
  }

  /**
   * 应用主题CSS
   */
  private async applyThemeCSS(config: any): Promise<void> {
    if (!this.options.autoApplyCSS || !this.options.targetElement) {
      return;
    }

    const styleId = 'mdf-theme-style';
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      this.options.targetElement.appendChild(styleElement);
    }

    if (this.adapter) {
      // 更新适配器的主题配置
      this.adapter.updateTheme?.(config);
      // 生成CSS
      const css = await this.adapter.generateCSS();
      styleElement.textContent = css;
    }
  }

  /**
   * 合并主题配置
   */
  private mergeThemeConfig(base: any, override: any): any {
    if (!override) {
      return base;
    }

    const merged = { ...base };
    for (const key in override) {
      if (typeof override[key] === 'object' && !Array.isArray(override[key])) {
        merged[key] = this.mergeThemeConfig(merged[key] || {}, override[key]);
      } else {
        merged[key] = override[key];
      }
    }
    return merged;
  }

  /**
   * 获取当前主题名称
   */
  getCurrentTheme(): string {
    return this.currentTheme;
  }

  /**
   * 获取当前主题配置
   */
  getCurrentThemeConfig(): any {
    return this.themes.get(this.currentTheme);
  }

  /**
   * 注册新主题
   */
  registerTheme(options: ThemeRegistrationOptions): void {
    const { name, description, tags, extends: parentTheme } = options;
    let config = { ...options.config };

    // 如果有父主题，合并配置
    if (parentTheme && this.themes.has(parentTheme)) {
      const parentConfig = this.themes.get(parentTheme);
      config = this.mergeThemeConfig(parentConfig, config);
    }

    // 设置 adapter
    if (this.adapter) {
      config.adapter = this.adapter;
    }

    // 注册主题
    const theme = {
      name,
      description,
      tags,
      components: config.components,
      adapter: this.adapter
    };

    this.themes.set(name, theme);

    // 如果是当前主题，应用样式
    if (name === this.currentTheme) {
      this.applyThemeCSS(theme);
    }
  }

  /**
   * 切换主题
   */
  async switchTheme(themeName: string): Promise<void> {
    if (!this.themes.has(themeName)) {
      throw new Error(`Theme "${themeName}" not found`);
    }

    const oldTheme = this.currentTheme;
    this.currentTheme = themeName;

    // 应用主题
    const config = this.getThemeConfig(themeName);
    await this.applyThemeCSS(config);

    // 保存到存储
    this.saveTheme(themeName);

    // 通知变更
    this.notifyThemeChange(themeName, oldTheme);
  }

  /**
   * 获取已注册的主题列表
   */
  getRegisteredThemes(): string[] {
    return Array.from(this.themes.keys());
  }

  /**
   * 获取指定主题的配置
   */
  getThemeConfig(themeName: string): any {
    const theme = this.themes.get(themeName);
    return theme ? theme.config : null;
  }

  /**
   * 添加主题变更监听器
   */
  addChangeListener(listener: ThemeChangeListener): void {
    this.listeners.add(listener);
  }

  /**
   * 移除主题变更监听器
   */
  removeChangeListener(listener: ThemeChangeListener): void {
    this.listeners.delete(listener);
  }

  /**
   * 检查主题是否已注册
   */
  hasTheme(themeName: string): boolean {
    return this.themes.has(themeName);
  }

  /**
   * 更新主题配置
   */
  updateThemeConfig(themeName: string, config: any): void {
    if (!this.themes.has(themeName)) {
      throw new Error(`Theme "${themeName}" not found`);
    }

    const theme = this.themes.get(themeName)!;
    theme.config = this.mergeThemeConfig(theme.config, config);

    // 如果更新的是当前主题，重新应用
    if (themeName === this.currentTheme) {
      this.applyThemeCSS(theme.config);
    }
  }

  /**
   * 生成CSS代码
   */
  async generateCSS(): Promise<string> {
    if (!this.adapter) {
      throw new Error('No CSS framework adapter configured');
    }
    return await this.adapter.generateCSS();
  }
} 