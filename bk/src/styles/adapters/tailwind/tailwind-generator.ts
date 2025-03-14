/**
 * Tailwind工具类配置选项
 */
interface TailwindGeneratorOptions {
  // 前缀
  prefix?: string;
  // 分隔符
  separator?: string;
  // 主题配置
  theme?: {
    colors?: Record<string, string | Record<string, string>>;
    spacing?: Record<string, string>;
    fontFamily?: Record<string, string[]>;
    fontSize?: Record<string, [string, { lineHeight?: string }]>;
    fontWeight?: Record<string, number>;
    lineHeight?: Record<string, string>;
    borderRadius?: Record<string, string>;
    borderWidth?: Record<string, string>;
    boxShadow?: Record<string, string>;
    screens?: Record<string, string>;
  };
  // 变体配置
  variants?: TailwindVariantConfig;
}

/**
 * Tailwind主题配置
 */
interface TailwindThemeConfig {
  // 颜色系统
  colors?: Record<string, string | Record<string | number, string>>;
  // 间距系统
  spacing?: Record<string | number, string>;
  // 字体大小
  fontSize?: Record<string, [string, { lineHeight?: string }]>;
  // 字体权重
  fontWeight?: Record<string, number>;
  // 行高
  lineHeight?: Record<string, string>;
  // 边框圆角
  borderRadius?: Record<string, string>;
  // 边框宽度
  borderWidth?: Record<string | number, string>;
  // 阴影
  boxShadow?: Record<string, string>;
  // 断点
  screens?: Record<string, string>;
}

/**
 * Tailwind变体配置
 */
interface TailwindVariantConfig {
  // 响应式
  responsive?: string[];
  // 悬停
  hover?: string[];
  // 焦点
  focus?: string[];
  // 激活
  active?: string[];
  // 禁用
  disabled?: string[];
}

/**
 * Tailwind工具类生成器
 */
export class TailwindGenerator {
  private options: TailwindGeneratorOptions;
  private generatedClasses: Set<string>;

  constructor(options: TailwindGeneratorOptions = {}) {
    this.options = {
      prefix: '',
      separator: ':',
      theme: {},
      variants: {},
      ...options
    };
    this.generatedClasses = new Set();
  }

  /**
   * 生成工具类
   */
  generateUtilities(): string {
    const utilities: string[] = [];

    // 生成布局工具类
    utilities.push(...this.generateLayoutUtilities());

    // 生成排版工具类
    utilities.push(...this.generateTypographyUtilities());

    // 生成颜色工具类
    utilities.push(...this.generateColorUtilities());

    // 生成间距工具类
    utilities.push(...this.generateSpacingUtilities());

    // 生成Flexbox工具类
    utilities.push(...this.generateFlexUtilities());

    // 生成Grid工具类
    utilities.push(...this.generateGridUtilities());

    // 生成边框工具类
    utilities.push(...this.generateBorderUtilities());

    // 生成效果工具类
    utilities.push(...this.generateEffectUtilities());

    return this.processUtilities(utilities);
  }

  /**
   * 获取默认主题配置
   */
  private getDefaultTheme(): TailwindThemeConfig {
    return {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        white: '#ffffff',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      },
      spacing: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem'
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }]
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    };
  }

  /**
   * 获取默认变体配置
   */
  private getDefaultVariants(): TailwindVariantConfig {
    return {
      responsive: [
        'container',
        'display',
        'flex',
        'grid',
        'margin',
        'padding',
        'space',
        'gap'
      ],
      hover: [
        'backgroundColor',
        'textColor',
        'borderColor',
        'opacity',
        'scale',
        'shadow'
      ],
      focus: [
        'outline',
        'ring',
        'borderColor',
        'backgroundColor'
      ],
      active: [
        'backgroundColor',
        'scale'
      ],
      disabled: [
        'opacity',
        'cursor'
      ]
    };
  }

  /**
   * 生成布局工具类
   */
  private generateLayoutUtilities(): string[] {
    const utilities: string[] = [];

    // Display
    utilities.push(
      '.block { display: block; }',
      '.inline-block { display: inline-block; }',
      '.inline { display: inline; }',
      '.flex { display: flex; }',
      '.inline-flex { display: inline-flex; }',
      '.grid { display: grid; }',
      '.hidden { display: none; }'
    );

    // Position
    utilities.push(
      '.static { position: static; }',
      '.fixed { position: fixed; }',
      '.absolute { position: absolute; }',
      '.relative { position: relative; }',
      '.sticky { position: sticky; }'
    );

    // Width and Height
    utilities.push(...this.generateWidthUtilities());
    utilities.push(...this.generateHeightUtilities());

    return utilities;
  }

  /**
   * 生成宽度工具类
   */
  private generateWidthUtilities(): string[] {
    const utilities: string[] = [];
    const { spacing } = this.options.theme || {};

    // 固定宽度
    if (spacing) {
      Object.entries(spacing).forEach(([key, value]) => {
        utilities.push(`.w-${key} { width: ${value}; }`);
      });
    }

    // 百分比宽度
    utilities.push(
      '.w-1/2 { width: 50%; }',
      '.w-1/3 { width: 33.333333%; }',
      '.w-2/3 { width: 66.666667%; }',
      '.w-1/4 { width: 25%; }',
      '.w-2/4 { width: 50%; }',
      '.w-3/4 { width: 75%; }',
      '.w-1/5 { width: 20%; }',
      '.w-2/5 { width: 40%; }',
      '.w-3/5 { width: 60%; }',
      '.w-4/5 { width: 80%; }',
      '.w-1/6 { width: 16.666667%; }',
      '.w-2/6 { width: 33.333333%; }',
      '.w-3/6 { width: 50%; }',
      '.w-4/6 { width: 66.666667%; }',
      '.w-5/6 { width: 83.333333%; }'
    );

    // 特殊宽度
    utilities.push(
      '.w-full { width: 100%; }',
      '.w-screen { width: 100vw; }',
      '.w-min { width: min-content; }',
      '.w-max { width: max-content; }',
      '.w-fit { width: fit-content; }',
      '.w-auto { width: auto; }'
    );

    return utilities;
  }

  /**
   * 生成高度工具类
   */
  private generateHeightUtilities(): string[] {
    const utilities: string[] = [];
    const { spacing } = this.options.theme || {};

    // 固定高度
    if (spacing) {
      Object.entries(spacing).forEach(([key, value]) => {
        utilities.push(`.h-${key} { height: ${value}; }`);
      });
    }

    // 百分比高度
    utilities.push(
      '.h-1/2 { height: 50%; }',
      '.h-1/3 { height: 33.333333%; }',
      '.h-2/3 { height: 66.666667%; }',
      '.h-1/4 { height: 25%; }',
      '.h-2/4 { height: 50%; }',
      '.h-3/4 { height: 75%; }',
      '.h-1/5 { height: 20%; }',
      '.h-2/5 { height: 40%; }',
      '.h-3/5 { height: 60%; }',
      '.h-4/5 { height: 80%; }',
      '.h-1/6 { height: 16.666667%; }',
      '.h-2/6 { height: 33.333333%; }',
      '.h-3/6 { height: 50%; }',
      '.h-4/6 { height: 66.666667%; }',
      '.h-5/6 { height: 83.333333%; }'
    );

    // 特殊高度
    utilities.push(
      '.h-full { height: 100%; }',
      '.h-screen { height: 100vh; }',
      '.h-min { height: min-content; }',
      '.h-max { height: max-content; }',
      '.h-fit { height: fit-content; }',
      '.h-auto { height: auto; }'
    );

    return utilities;
  }

  /**
   * 生成排版工具类
   */
  private generateTypographyUtilities(): string[] {
    const utilities: string[] = [];
    const { fontSize, fontFamily, fontWeight } = this.options.theme || {};

    // Font Size
    if (fontSize) {
      Object.entries(fontSize).forEach(([key, [size, config]]) => {
        utilities.push(
          `.text-${key} {
            font-size: ${size};
            line-height: ${config.lineHeight || 'normal'};
          }`
        );
      });
    }

    // Font Family
    if (fontFamily) {
      Object.entries(fontFamily).forEach(([key, value]) => {
        utilities.push(
          `.font-${key} { font-family: ${value.join(', ')}; }`
        );
      });
    }

    // Font Weight
    if (fontWeight) {
      Object.entries(fontWeight).forEach(([key, value]) => {
        utilities.push(
          `.font-${key} { font-weight: ${value}; }`
        );
      });
    }

    // Text Align
    utilities.push(
      '.text-left { text-align: left; }',
      '.text-center { text-align: center; }',
      '.text-right { text-align: right; }',
      '.text-justify { text-align: justify; }'
    );

    return utilities;
  }

  /**
   * 生成颜色工具类
   */
  private generateColorUtilities(): string[] {
    const utilities: string[] = [];
    const { colors } = this.options.theme || {};

    if (colors) {
      Object.entries(colors).forEach(([colorName, colorValue]) => {
        if (typeof colorValue === 'string') {
          // 单色
          utilities.push(
            `.text-${colorName} { color: ${colorValue}; }`,
            `.bg-${colorName} { background-color: ${colorValue}; }`,
            `.border-${colorName} { border-color: ${colorValue}; }`
          );
        } else {
          // 色阶或变体
          Object.entries(colorValue).forEach(([variant, value]) => {
            const className = variant === 'DEFAULT' ? colorName : `${colorName}-${variant}`;
            utilities.push(
              `.text-${className} { color: ${value}; }`,
              `.bg-${className} { background-color: ${value}; }`,
              `.border-${className} { border-color: ${value}; }`
            );
          });
        }
      });
    }

    return utilities;
  }

  /**
   * 生成间距工具类
   */
  private generateSpacingUtilities(): string[] {
    const utilities: string[] = [];
    const { spacing } = this.options.theme || {};

    if (spacing) {
      Object.entries(spacing).forEach(([key, value]) => {
        // Margin
        utilities.push(
          `.m-${key} { margin: ${value}; }`,
          `.mx-${key} { margin-left: ${value}; margin-right: ${value}; }`,
          `.my-${key} { margin-top: ${value}; margin-bottom: ${value}; }`,
          `.mt-${key} { margin-top: ${value}; }`,
          `.mr-${key} { margin-right: ${value}; }`,
          `.mb-${key} { margin-bottom: ${value}; }`,
          `.ml-${key} { margin-left: ${value}; }`
        );

        // Padding
        utilities.push(
          `.p-${key} { padding: ${value}; }`,
          `.px-${key} { padding-left: ${value}; padding-right: ${value}; }`,
          `.py-${key} { padding-top: ${value}; padding-bottom: ${value}; }`,
          `.pt-${key} { padding-top: ${value}; }`,
          `.pr-${key} { padding-right: ${value}; }`,
          `.pb-${key} { padding-bottom: ${value}; }`,
          `.pl-${key} { padding-left: ${value}; }`
        );

        // Gap
        utilities.push(
          `.gap-${key} { gap: ${value}; }`,
          `.gap-x-${key} { column-gap: ${value}; }`,
          `.gap-y-${key} { row-gap: ${value}; }`
        );
      });
    }

    return utilities;
  }

  /**
   * 生成Flexbox工具类
   */
  private generateFlexUtilities(): string[] {
    return [
      // Flex Direction
      '.flex-row { flex-direction: row; }',
      '.flex-row-reverse { flex-direction: row-reverse; }',
      '.flex-col { flex-direction: column; }',
      '.flex-col-reverse { flex-direction: column-reverse; }',

      // Flex Wrap
      '.flex-wrap { flex-wrap: wrap; }',
      '.flex-wrap-reverse { flex-wrap: wrap-reverse; }',
      '.flex-nowrap { flex-wrap: nowrap; }',

      // Justify Content
      '.justify-start { justify-content: flex-start; }',
      '.justify-end { justify-content: flex-end; }',
      '.justify-center { justify-content: center; }',
      '.justify-between { justify-content: space-between; }',
      '.justify-around { justify-content: space-around; }',
      '.justify-evenly { justify-content: space-evenly; }',

      // Align Items
      '.items-start { align-items: flex-start; }',
      '.items-end { align-items: flex-end; }',
      '.items-center { align-items: center; }',
      '.items-baseline { align-items: baseline; }',
      '.items-stretch { align-items: stretch; }'
    ];
  }

  /**
   * 生成Grid工具类
   */
  private generateGridUtilities(): string[] {
    const utilities: string[] = [];

    // Grid Template Columns
    for (let i = 1; i <= 12; i++) {
      utilities.push(`.grid-cols-${i} { grid-template-columns: repeat(${i}, minmax(0, 1fr)); }`);
    }

    // Grid Column Start/End
    for (let i = 1; i <= 13; i++) {
      utilities.push(
        `.col-start-${i} { grid-column-start: ${i}; }`,
        `.col-end-${i} { grid-column-end: ${i}; }`
      );
    }

    // Grid Template Rows
    for (let i = 1; i <= 6; i++) {
      utilities.push(`.grid-rows-${i} { grid-template-rows: repeat(${i}, minmax(0, 1fr)); }`);
    }

    // Grid Row Start/End
    for (let i = 1; i <= 7; i++) {
      utilities.push(
        `.row-start-${i} { grid-row-start: ${i}; }`,
        `.row-end-${i} { grid-row-end: ${i}; }`
      );
    }

    return utilities;
  }

  /**
   * 生成边框工具类
   */
  private generateBorderUtilities(): string[] {
    const utilities: string[] = [];
    const { borderWidth, borderRadius } = this.options.theme || {};

    // Border Width
    if (borderWidth) {
      Object.entries(borderWidth).forEach(([key, value]) => {
        utilities.push(
          `.border-${key} { border-width: ${value}; }`,
          `.border-t-${key} { border-top-width: ${value}; }`,
          `.border-r-${key} { border-right-width: ${value}; }`,
          `.border-b-${key} { border-bottom-width: ${value}; }`,
          `.border-l-${key} { border-left-width: ${value}; }`
        );
      });
    }

    // Border Radius
    if (borderRadius) {
      Object.entries(borderRadius).forEach(([key, value]) => {
        utilities.push(
          `.rounded-${key} { border-radius: ${value}; }`,
          `.rounded-t-${key} { border-top-left-radius: ${value}; border-top-right-radius: ${value}; }`,
          `.rounded-r-${key} { border-top-right-radius: ${value}; border-bottom-right-radius: ${value}; }`,
          `.rounded-b-${key} { border-bottom-right-radius: ${value}; border-bottom-left-radius: ${value}; }`,
          `.rounded-l-${key} { border-top-left-radius: ${value}; border-bottom-left-radius: ${value}; }`
        );
      });
    }

    // Border Style
    utilities.push(
      '.border-solid { border-style: solid; }',
      '.border-dashed { border-style: dashed; }',
      '.border-dotted { border-style: dotted; }',
      '.border-double { border-style: double; }',
      '.border-none { border-style: none; }'
    );

    return utilities;
  }

  /**
   * 生成效果工具类
   */
  private generateEffectUtilities(): string[] {
    const utilities: string[] = [];
    const { boxShadow } = this.options.theme || {};

    // Opacity
    for (let i = 0; i <= 100; i += 25) {
      utilities.push(`.opacity-${i} { opacity: ${i / 100}; }`);
    }

    // Box Shadow
    if (boxShadow) {
      Object.entries(boxShadow).forEach(([key, value]) => {
        utilities.push(`.shadow-${key} { box-shadow: ${value}; }`);
      });
    }

    return utilities;
  }

  /**
   * 处理工具类
   */
  private processUtilities(utilities: string[]): string {
    // 添加前缀
    if (this.options.prefix) {
      utilities = utilities.map(utility => {
        const [selector, ...rest] = utility.split(' ');
        return [`.${this.options.prefix}-${selector.slice(1)}`, ...rest].join(' ');
      });
    }

    // 生成响应式变体
    const responsiveUtilities = this.generateResponsiveVariants(utilities);
    utilities.push(...responsiveUtilities);

    // 生成状态变体
    const stateUtilities = this.generateStateVariants(utilities);
    utilities.push(...stateUtilities);

    return utilities.join('\n');
  }

  /**
   * 生成响应式变体
   */
  private generateResponsiveVariants(utilities: string[]): string[] {
    const variants: string[] = [];
    const { screens } = this.options.theme || {};
    const { responsive } = this.options.variants || {};

    if (screens && responsive) {
      Object.entries(screens).forEach(([breakpoint, minWidth]) => {
        utilities.forEach(utility => {
          if (responsive.some(pattern => utility.includes(pattern))) {
            variants.push(
              `@media (min-width: ${minWidth}) {
                ${utility.replace(
                  /^(\.[^{]+)/,
                  `$1${this.options.separator}${breakpoint}`
                )}
              }`
            );
          }
        });
      });
    }

    return variants;
  }

  /**
   * 生成状态变体
   */
  private generateStateVariants(utilities: string[]): string[] {
    const variants: string[] = [];
    const { hover, focus, active, disabled } = this.options.variants || {};

    utilities.forEach(utility => {
      // Hover
      if (hover?.some(pattern => utility.includes(pattern))) {
        variants.push(utility.replace(/^(\.[^{]+)/, `$1${this.options.separator}hover`));
      }

      // Focus
      if (focus?.some(pattern => utility.includes(pattern))) {
        variants.push(utility.replace(/^(\.[^{]+)/, `$1${this.options.separator}focus`));
      }

      // Active
      if (active?.some(pattern => utility.includes(pattern))) {
        variants.push(utility.replace(/^(\.[^{]+)/, `$1${this.options.separator}active`));
      }

      // Disabled
      if (disabled?.some(pattern => utility.includes(pattern))) {
        variants.push(utility.replace(/^(\.[^{]+)/, `$1${this.options.separator}disabled`));
      }
    });

    return variants;
  }
} 