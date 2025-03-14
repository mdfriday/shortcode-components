import { ComponentStyleConfig } from './component';

/**
 * 组件主题配置映射
 */
export interface ComponentThemeConfig {
  // 布局组件
  container: ComponentStyleConfig;
  grid: ComponentStyleConfig;
  flex: ComponentStyleConfig;

  // 内容组件
  button: ComponentStyleConfig;
  text: ComponentStyleConfig;
  heading: ComponentStyleConfig;

  // 复杂组件
  card: ComponentStyleConfig;
  feature: ComponentStyleConfig;
  testimonial: ComponentStyleConfig;
}

/**
 * 组件变体类型
 */
export type ComponentVariant = 
  // 按钮变体
  | 'solid' | 'outline' | 'ghost' | 'link'
  // 卡片变体
  | 'elevated' | 'filled' | 'outlined'
  // 特性变体
  | 'default' | 'centered' | 'stacked'
  // 其他变体
  | string;

/**
 * 组件尺寸类型
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string;

/**
 * 组件状态类型
 */
export type ComponentState = 
  | 'hover' | 'focus' | 'active' | 'disabled'
  | 'loading' | 'selected' | 'error' | 'success'
  | string;

/**
 * 组件主题上下文
 */
export interface ComponentThemeContext {
  // 当前主题名称
  themeName: string;
  // 当前变体
  variant?: ComponentVariant;
  // 当前尺寸
  size?: ComponentSize;
  // 当前状态
  state?: ComponentState;
  // 是否为暗色主题
  isDark: boolean;
} 