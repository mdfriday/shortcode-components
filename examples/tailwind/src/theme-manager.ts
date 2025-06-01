// 🏗️ 重构后的主题系统 - 基于 Tailwind 基础令牌

/**
 * 🎯 主题配置接口 - 基于 Tailwind 设计令牌
 */
export interface ThemeConfig {
  theme: ThemeName;
  mode: ThemeMode;
}

export type ThemeName = 'base' | 'fire' | 'ocean' | 'electric' | 'grass' | 'newspaper';
export type ThemeMode = 'light' | 'dark';

/**
 * 🎯 优化的主题管理器 - 充分利用 Tailwind 功能
 */
export class ThemeManager {
  private currentTheme: ThemeConfig = { theme: 'base', mode: 'light' };
  private readonly validThemes: readonly ThemeName[] = ['base', 'fire', 'ocean', 'electric', 'grass', 'newspaper'];
  private readonly validModes: readonly ThemeMode[] = ['light', 'dark'];

  constructor() {
    this.initializeTheme();
    this.setupThemeListeners();
  }

  /**
   * 初始化主题系统
   */
  private initializeTheme(): void {
    // 从 localStorage 恢复主题设置
    const savedTheme = localStorage.getItem('app-theme');
    const savedMode = localStorage.getItem('app-mode');
    
    if (savedTheme && this.validThemes.includes(savedTheme as ThemeName)) {
      this.currentTheme.theme = savedTheme as ThemeName;
    }
    
    if (savedMode && this.validModes.includes(savedMode as ThemeMode)) {
      this.currentTheme.mode = savedMode as ThemeMode;
    }

    this.applyTheme();
  }

  /**
   * 设置监听器，支持实时主题切换
   */
  private setupThemeListeners(): void {
    // 延迟设置监听器，确保 DOM 已加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.bindSelectors());
    } else {
      this.bindSelectors();
    }

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('app-mode')) {
        this.setMode(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * 绑定主题选择器
   */
  private bindSelectors(): void {
    const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
    const modeSelect = document.getElementById('mode-select') as HTMLSelectElement;

    if (themeSelect) {
      themeSelect.value = this.currentTheme.theme;
      themeSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.setTheme(target.value as ThemeName);
      });
    }

    if (modeSelect) {
      modeSelect.value = this.currentTheme.mode;
      modeSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.setMode(target.value as ThemeMode);
      });
    }
  }

  /**
   * 设置主题
   */
  setTheme(theme: ThemeName): void {
    if (!this.validThemes.includes(theme)) {
      console.warn(`Invalid theme: ${theme}. Using 'base' instead.`);
      theme = 'base';
    }
    
    this.currentTheme.theme = theme;
    localStorage.setItem('app-theme', theme);
    this.applyTheme();
  }

  /**
   * 设置模式
   */
  setMode(mode: ThemeMode): void {
    if (!this.validModes.includes(mode)) {
      console.warn(`Invalid mode: ${mode}. Using 'light' instead.`);
      mode = 'light';
    }
    
    this.currentTheme.mode = mode;
    localStorage.setItem('app-mode', mode);
    this.applyTheme();
  }

  /**
   * 同时设置主题和模式
   */
  setThemeConfig(config: Partial<ThemeConfig>): void {
    if (config.theme) this.setTheme(config.theme);
    if (config.mode) this.setMode(config.mode);
  }

  /**
   * 获取当前主题配置
   */
  getCurrentTheme(): ThemeConfig {
    return { ...this.currentTheme };
  }

  /**
   * 应用主题到 DOM
   * 🎯 使用 Tailwind 的类名系统，充分利用 CSS 变量
   */
  private applyTheme(): void {
    const root = document.documentElement;
    const body = document.body;

    // 清除旧的主题类名
    this.validThemes.forEach(theme => {
      root.classList.remove(`theme-${theme}`);
      body.classList.remove(`theme-${theme}`);
    });
    
    this.validModes.forEach(mode => {
      root.classList.remove(mode);
      body.classList.remove(mode);
    });

    // 应用新的主题类名
    const themeClass = `theme-${this.currentTheme.theme}`;
    const modeClass = this.currentTheme.mode;

    root.classList.add(themeClass, modeClass);
    body.classList.add(themeClass, modeClass);

    // 设置数据属性，支持 CSS 选择器
    root.setAttribute('data-theme', this.currentTheme.theme);
    root.setAttribute('data-mode', this.currentTheme.mode);

    // 更新选择器状态
    this.updateSelectors();

    // 触发主题变化事件
    const event = new CustomEvent('themechange', {
      detail: this.currentTheme
    });
    document.dispatchEvent(event);
  }

  /**
   * 更新主题选择器的状态
   */
  private updateSelectors(): void {
    const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
    const modeSelect = document.getElementById('mode-select') as HTMLSelectElement;

    if (themeSelect && themeSelect.value !== this.currentTheme.theme) {
      themeSelect.value = this.currentTheme.theme;
    }

    if (modeSelect && modeSelect.value !== this.currentTheme.mode) {
      modeSelect.value = this.currentTheme.mode;
    }
  }

  /**
   * 切换明暗模式
   */
  toggleMode(): void {
    this.setMode(this.currentTheme.mode === 'light' ? 'dark' : 'light');
  }

  /**
   * 获取主题变量值
   * 🎯 利用 CSS 自定义属性获取当前主题的计算值
   */
  getThemeVariable(variableName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--${variableName}`)
      .trim();
  }

  /**
   * 获取所有可用主题
   */
  getAvailableThemes(): readonly ThemeName[] {
    return this.validThemes;
  }

  /**
   * 获取所有可用模式
   */
  getAvailableModes(): readonly ThemeMode[] {
    return this.validModes;
  }

  /**
   * 获取主题色彩预览
   * 🎯 返回当前主题的主要颜色值，用于 UI 预览
   */
  getThemePreview(): { primary: string; background: string; foreground: string } {
    return {
      primary: this.getThemeVariable('primary'),
      background: this.getThemeVariable('background'),
      foreground: this.getThemeVariable('foreground')
    };
  }

  /**
   * 检查是否为暗色模式
   */
  isDarkMode(): boolean {
    return this.currentTheme.mode === 'dark';
  }

  /**
   * 检查是否为指定主题
   */
  isTheme(theme: ThemeName): boolean {
    return this.currentTheme.theme === theme;
  }
} 