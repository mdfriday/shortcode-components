import { ComponentThemeConfig } from './component-theme';
import { CSSFrameworkAdapter } from './css-framework';

/**
 * 主题配置
 */
export interface Theme {
  /**
   * 主题名称
   */
  name: string;

  /**
   * 主题描述
   */
  description?: string;

  /**
   * 主题标签
   */
  tags?: string[];

  /**
   * 是否为暗色主题
   */
  isDark?: boolean;

  /**
   * 组件主题配置
   */
  components: ComponentThemeConfig;

  /**
   * CSS 框架适配器
   */
  adapter?: CSSFrameworkAdapter;
} 