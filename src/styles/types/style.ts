import { ComponentVariant, ComponentSize, ComponentState } from './component-theme';

/**
 * 布局属性
 */
export interface LayoutStyle {
  display?: 'block' | 'inline' | 'inline-flex' | 'flex' | 'grid' | 'none';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
}

/**
 * 间距属性
 */
export interface SpacingValue {
  x?: string | number;
  y?: string | number;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
}

export interface SpacingStyle {
  margin?: string | number | SpacingValue;
  padding?: string | number | SpacingValue;
  gap?: string | number;
}

/**
 * 排版属性
 */
export interface TypographyStyle {
  fontSize?: string | number;
  fontWeight?: number | 'normal' | 'medium' | 'bold' | 'lighter' | 'bolder';
  fontStyle?: 'normal' | 'italic' | 'oblique';
  lineHeight?: string | number;
  letterSpacing?: string | number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

/**
 * 颜色属性
 */
export interface ColorStyle {
  text?: string;
  background?: string;
  border?: string;
}

/**
 * 边框属性
 */
export interface BorderStyle {
  width?: string | number;
  style?: 'none' | 'solid' | 'dashed' | 'dotted';
  color?: string;
  radius?: string | number;
}

/**
 * Flexbox 属性
 */
export interface FlexStyle {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  grow?: number;
  shrink?: number;
  basis?: string | number;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

/**
 * Grid 属性
 */
export interface GridStyle {
  columns?: number;
  rows?: number;
  gap?: string | number;
  columnGap?: string | number;
  rowGap?: string | number;
  autoFlow?: 'row' | 'column' | 'dense';
  autoColumns?: string;
  autoRows?: string;
}

/**
 * 响应式样式
 */
export interface ResponsiveStyle {
  sm?: Partial<StyleDefinition>;
  md?: Partial<StyleDefinition>;
  lg?: Partial<StyleDefinition>;
  xl?: Partial<StyleDefinition>;
  '2xl'?: Partial<StyleDefinition>;
}

/**
 * 状态样式
 */
export interface StateStyle {
  hover?: Partial<StyleDefinition>;
  focus?: Partial<StyleDefinition>;
  active?: Partial<StyleDefinition>;
  disabled?: Partial<StyleDefinition>;
}

/**
 * 样式定义接口
 */
export interface StyleDefinition {
  layout?: Partial<LayoutStyle>;
  spacing?: Partial<SpacingStyle>;
  typography?: Partial<TypographyStyle>;
  colors?: Partial<ColorStyle>;
  border?: Partial<BorderStyle>;
  flex?: Partial<FlexStyle>;
  grid?: Partial<GridStyle>;
  responsive?: Partial<ResponsiveStyle>;
  states?: Partial<StateStyle>;
}

/**
 * 组件样式配置
 */
export interface ComponentStyleConfig {
  base?: StyleDefinition;
  variants?: Record<ComponentVariant, StyleDefinition>;
  sizes?: Record<ComponentSize, StyleDefinition>;
  states?: Record<ComponentState, StyleDefinition>;
} 