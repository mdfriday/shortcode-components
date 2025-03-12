import { StyleDefinition } from './style';

/**
 * 组件变体配置
 */
export interface ComponentVariants {
  [key: string]: StyleDefinition;
}

/**
 * 组件尺寸配置
 */
export interface ComponentSizes {
  [key: string]: StyleDefinition;
}

/**
 * 组件状态配置
 */
export interface ComponentStates {
  [key: string]: StyleDefinition;
}

/**
 * 组件尺寸值配置
 */
export interface ComponentSizeValues {
  [key: string]: string | number;
}

/**
 * 组件样式配置
 */
export interface ComponentStyleConfig {
  // 基础样式
  base?: StyleDefinition;
  // 变体样式
  variants?: ComponentVariants;
  // 尺寸样式
  sizes?: ComponentSizes;
  // 状态样式
  states?: ComponentStates;
  // 最大宽度配置
  maxWidth?: ComponentSizeValues;
  // 内边距配置
  padding?: ComponentSizeValues;
} 