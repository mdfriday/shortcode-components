/**
 * Style interface for component styling
 */
export interface Style {
  // 颜色相关
  variant?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;

  // 尺寸相关
  size?: 'sm' | 'md' | 'lg';
  width?: string;
  height?: string;

  // 边框相关
  border?: boolean;
  rounded?: boolean;
  outline?: boolean;

  // 阴影
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Layout interface for component layout
 */
export interface Layout {
  // 显示方式
  display?: 'block' | 'inline' | 'flex' | 'grid' | 'none';

  // 定位
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

  // 间距
  gap?: number;
  padding?: number;
  margin?: number;

  // 尺寸
  cols?: number;
  rows?: number;
}

/**
 * Typography interface for text styling
 */
export interface Typography {
  // 字体
  fontFamily?: 'sans' | 'serif' | 'mono';
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  fontWeight?: 'normal' | 'medium' | 'bold';

  // 文本对齐
  textAlign?: 'left' | 'center' | 'right' | 'justify';

  // 行高
  lineHeight?: 'none' | 'tight' | 'normal' | 'relaxed';

  // 字间距
  letterSpacing?: 'tight' | 'normal' | 'wide';

  // 文本装饰
  textDecoration?: 'underline' | 'line-through' | 'none';

  // 文本转换
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
}

/**
 * Animation interface for component animations
 */
export interface Animation {
  // 动画
  animation?: 'none' | 'spin' | 'ping' | 'pulse' | 'bounce';

  // 过渡
  transition?: 'none' | 'all' | 'colors' | 'opacity' | 'shadow';
  duration?: 'fast' | 'normal' | 'slow';

  // 变换
  scale?: number;
  rotate?: number;
  translate?: string;

  // 动画时机
  delay?: number;
  timing?: 'linear' | 'ease' | 'ease-in' | 'ease-out';
}

/**
 * Interactive interface for interactive states
 */
export interface Interactive {
  // 鼠标
  cursor?: 'pointer' | 'default' | 'not-allowed';

  // 悬停状态
  hover?: Partial<Style>;

  // 焦点状态
  focus?: Partial<Style>;

  // 激活状态
  active?: Partial<Style>;

  // 禁用状态
  disabled?: boolean;
}

/**
 * Responsive interface for responsive design
 */
export interface Responsive {
  // 断点
  sm?: Partial<Style>;
  md?: Partial<Style>;
  lg?: Partial<Style>;
  xl?: Partial<Style>;

  // 可见性
  hidden?: 'sm' | 'md' | 'lg' | 'xl';
  visible?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * ClassBuilder interface for building component classes
 */
export interface ClassBuilder {
  style(props: Style): this;
  layout(props: Layout): this;
  typography(props: Typography): this;
  animation(props: Animation): this;
  interactive(props: Interactive): this;
  responsive(props: Responsive): this;
  build(): string;
}

/**
 * StyleBuilderFactory interface for creating style builders
 */
export interface StyleBuilderFactory {
  createBuilder(): ClassBuilder;
} 