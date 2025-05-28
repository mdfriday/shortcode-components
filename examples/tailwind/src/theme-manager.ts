/**
 * 多主题系统管理器
 * 支持主题 (base, fire, ocean, electric, grass) 和模式 (light, dark) 的组合
 */

export type ThemeName = 'base' | 'fire' | 'ocean' | 'electric' | 'grass';
export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  theme: ThemeName;
  mode: ThemeMode;
}

export class ThemeManager {
  private currentTheme: ThemeName = 'base';
  private currentMode: ThemeMode = 'light';
  private container: HTMLElement | null = null;

  constructor(container?: HTMLElement) {
    this.container = container || document.body;
    this.applyTheme();
  }

  /**
   * 设置主题
   */
  setTheme(theme: ThemeName): void {
    this.currentTheme = theme;
    this.applyTheme();
  }

  /**
   * 设置模式
   */
  setMode(mode: ThemeMode): void {
    this.currentMode = mode;
    this.applyTheme();
  }

  /**
   * 同时设置主题和模式
   */
  setThemeConfig(config: ThemeConfig): void {
    this.currentTheme = config.theme;
    this.currentMode = config.mode;
    this.applyTheme();
  }

  /**
   * 获取当前主题配置
   */
  getCurrentConfig(): ThemeConfig {
    return {
      theme: this.currentTheme,
      mode: this.currentMode
    };
  }

  /**
   * 切换模式 (light <-> dark)
   */
  toggleMode(): void {
    this.currentMode = this.currentMode === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  /**
   * 应用主题到容器
   */
  private applyTheme(): void {
    if (!this.container) return;

    // 移除所有主题类
    const themeClasses = ['theme-base', 'theme-fire', 'theme-ocean', 'theme-electric', 'theme-grass'];
    const modeClasses = ['light', 'dark'];
    
    themeClasses.forEach(cls => this.container!.classList.remove(cls));
    modeClasses.forEach(cls => this.container!.classList.remove(cls));

    // 添加当前主题和模式类
    this.container.classList.add(`theme-${this.currentTheme}`);
    this.container.classList.add(this.currentMode);
    
    // 设置 data-mode 属性 (用于 CSS 选择器)
    this.container.setAttribute('data-mode', this.currentMode);
    this.container.setAttribute('data-theme', this.currentTheme);
  }

  /**
   * 从 shortcode 参数解析主题配置
   */
  static parseThemeFromParams(theme?: string, mode?: string): ThemeConfig {
    const validThemes: ThemeName[] = ['base', 'fire', 'ocean', 'electric', 'grass'];
    const validModes: ThemeMode[] = ['light', 'dark'];

    return {
      theme: validThemes.includes(theme as ThemeName) ? (theme as ThemeName) : 'base',
      mode: validModes.includes(mode as ThemeMode) ? (mode as ThemeMode) : 'light'
    };
  }

  /**
   * 生成主题容器的 CSS 类名
   */
  static getThemeClasses(theme: ThemeName = 'base', mode: ThemeMode = 'light'): string {
    return `theme-${theme} ${mode}`;
  }

  /**
   * 生成主题容器的属性
   */
  static getThemeAttributes(theme: ThemeName = 'base', mode: ThemeMode = 'light'): Record<string, string> {
    return {
      'data-theme': theme,
      'data-mode': mode,
      'class': this.getThemeClasses(theme, mode)
    };
  }
} 