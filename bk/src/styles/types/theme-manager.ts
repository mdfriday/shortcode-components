/**
 * 主题变更事件监听器
 */
export type ThemeChangeListener = (newTheme: string, oldTheme: string) => void;

/**
 * 主题管理器配置选项
 */
export interface ThemeManagerOptions {
  // 默认主题名称
  defaultTheme?: string;
  // 持久化存储键名
  storageKey?: string;
  // 是否启用持久化
  enableStorage?: boolean;
  // 主题切换时是否自动应用CSS
  autoApplyCSS?: boolean;
  // CSS注入目标
  targetElement?: HTMLElement;
}

/**
 * 主题注册选项
 */
export interface ThemeRegistrationOptions {
  // 主题名称
  name: string;
  // 主题配置
  config: any;
  // 主题描述
  description?: string;
  // 主题标签
  tags?: string[];
  // 继承自其他主题
  extends?: string;
}

/**
 * 主题管理器接口
 */
export interface ThemeManager {
  /**
   * 获取当前主题名称
   */
  getCurrentTheme(): string;

  /**
   * 获取当前主题配置
   */
  getCurrentThemeConfig(): any;

  /**
   * 注册新主题
   */
  registerTheme(options: ThemeRegistrationOptions): void;

  /**
   * 切换主题
   */
  switchTheme(themeName: string): void;

  /**
   * 获取已注册的主题列表
   */
  getRegisteredThemes(): string[];

  /**
   * 获取指定主题的配置
   */
  getThemeConfig(themeName: string): any;

  /**
   * 添加主题变更监听器
   */
  addChangeListener(listener: ThemeChangeListener): void;

  /**
   * 移除主题变更监听器
   */
  removeChangeListener(listener: ThemeChangeListener): void;

  /**
   * 检查主题是否已注册
   */
  hasTheme(themeName: string): boolean;

  /**
   * 更新主题配置
   */
  updateThemeConfig(themeName: string, config: any): void;
} 