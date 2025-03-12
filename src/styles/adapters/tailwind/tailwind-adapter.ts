import { CSSFrameworkAdapter, CSSResource, CSSFrameworkAdapterOptions } from '../../types/adapter';
import { StyleDefinition } from '../../types/style';
import { ComponentStyleConfig } from '../../types/component';
import { TailwindGenerator } from './tailwind-generator';
import { TailwindThemeConfig, defaultTheme } from './theme';

/**
 * Tailwind CSS 适配器配置选项
 */
interface TailwindAdapterOptions {
  // 是否启用JIT模式
  jit?: boolean;
  // 自定义前缀
  prefix?: string;
  // 自定义分隔符
  separator?: string;
  // 自定义类名映射
  classMapping?: Record<string, string>;
  // 主题配置
  theme?: Partial<TailwindThemeConfig>;
  // 变体配置
  variants?: any;
}

/**
 * Tailwind CSS 框架适配器
 */
export class TailwindAdapter implements CSSFrameworkAdapter {
  readonly name = 'tailwind';
  private options: TailwindAdapterOptions;
  private styleCache: Map<string, string[]>;
  private generator: TailwindGenerator;
  private theme: TailwindThemeConfig;

  constructor(options: TailwindAdapterOptions = {}) {
    this.options = {
      jit: true,
      prefix: '',
      separator: ':',
      classMapping: {},
      ...options
    };
    this.styleCache = new Map();
    this.theme = this.mergeTheme(defaultTheme, options.theme || {});
    this.generator = new TailwindGenerator({
      prefix: this.options.prefix,
      separator: this.options.separator,
      theme: this.convertThemeToTailwindConfig(),
      variants: this.options.variants
    });
  }

  /**
   * 合并主题配置
   */
  private mergeTheme(base: TailwindThemeConfig, override: Partial<TailwindThemeConfig>): TailwindThemeConfig {
    return {
      colors: { ...base.colors, ...override.colors },
      spacing: { ...base.spacing, ...override.spacing },
      typography: {
        fontFamily: { ...base.typography.fontFamily, ...override.typography?.fontFamily },
        fontSize: { ...base.typography.fontSize, ...override.typography?.fontSize },
        fontWeight: { ...base.typography.fontWeight, ...override.typography?.fontWeight },
      }
    };
  }

  /**
   * 将主题配置转换为Tailwind配置格式
   */
  private convertThemeToTailwindConfig(): any {
    const { colors, spacing, typography } = this.theme;
    
    // 转换颜色配置
    const convertedColors: Record<string, any> = {
      // 转换主要颜色
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      // 转换中性色
      ...colors.neutral,
      // 转换语义色
      ...colors.semantic
    };

    // 转换间距配置
    const convertedSpacing: Record<string, string> = {};
    Object.entries(spacing.scale).forEach(([key, value]) => {
      convertedSpacing[key] = `${value * spacing.unit}rem`;
    });

    return {
      colors: convertedColors,
      spacing: convertedSpacing,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight
    };
  }

  /**
   * 获取主题配置
   */
  getTheme(): TailwindThemeConfig {
    return this.theme;
  }

  /**
   * 更新主题配置
   */
  updateTheme(theme: Partial<TailwindThemeConfig>): void {
    this.theme = this.mergeTheme(this.theme, theme);
    this.generator = new TailwindGenerator({
      ...this.generator['options'],
      theme: this.convertThemeToTailwindConfig()
    });
    this.styleCache.clear();
  }

  /**
   * 将样式定义转换为Tailwind类名
   */
  convertToClasses(style: StyleDefinition, options?: CSSFrameworkAdapterOptions): string {
    const classes: string[] = [];

    // 处理布局相关样式
    if (style.layout) {
      classes.push(...this.convertLayoutStyles(style.layout));
    }

    // 处理排版相关样式
    if (style.typography) {
      classes.push(...this.convertTypographyStyles(style.typography));
    }

    // 处理颜色相关样式
    if (style.colors) {
      classes.push(...this.convertColorStyles(style.colors));
    }

    // 处理边框相关样式
    if (style.border) {
      classes.push(...this.convertBorderStyles(style.border));
    }

    // 处理Flexbox相关样式
    if (style.flex) {
      classes.push(...this.convertFlexStyles(style.flex));
    }

    // 处理Grid相关样式
    if (style.grid) {
      classes.push(...this.convertGridStyles(style.grid));
    }

    // 处理间距相关样式
    if (style.spacing) {
      classes.push(...this.convertSpacingStyles(style.spacing));
    }

    // 处理响应式样式
    if (style.responsive) {
      classes.push(...this.convertResponsiveStyles(style.responsive));
    }

    // 处理状态样式
    if (style.states) {
      classes.push(...this.convertStateStyles(style.states));
    }

    return this.deduplicateClasses(classes).join(' ');
  }

  /**
   * 将组件配置转换为类名
   */
  convertComponentToClasses(
    config: ComponentStyleConfig,
    variant?: string,
    size?: string,
    state?: string,
    options?: CSSFrameworkAdapterOptions
  ): string {
    const classes: string[] = [];

    // 处理基础样式
    if (config.base) {
      classes.push(this.convertToClasses(config.base, options));
    }

    // 处理变体样式
    if (config.variants && variant && variant in config.variants) {
      const variantStyle = config.variants[variant as keyof typeof config.variants];
      if (variantStyle) {
        classes.push(this.convertToClasses(variantStyle, options));
      }
    }

    // 处理尺寸样式
    if (config.sizes && size && size in config.sizes) {
      const sizeStyle = config.sizes[size as keyof typeof config.sizes];
      if (sizeStyle) {
        classes.push(this.convertToClasses(sizeStyle, options));
      }
    }

    // 处理状态样式
    if (config.states && state && state in config.states) {
      const stateStyle = config.states[state as keyof typeof config.states];
      if (stateStyle) {
        classes.push(this.convertToClasses(stateStyle, options));
      }
    }

    return classes.filter(Boolean).join(' ');
  }

  /**
   * 生成CSS代码
   */
  async generateCSS(): Promise<string> {
    const css = `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `;

    // 配置 tailwind
    const tailwindConfig = {
      content: [], // 不需要扫描文件
      prefix: this.options.prefix || '',
      theme: this.convertThemeToTailwindConfig(),
      corePlugins: {
        preflight: false, // 禁用默认样式重置
      }
    };

    try {
      // 使用 require 导入依赖
      const postcss = require('postcss');
      const tailwindcss = require('tailwindcss');
      const autoprefixer = require('autoprefixer');

      // 创建 postcss 处理器
      const processor = postcss([
        tailwindcss(tailwindConfig),
        autoprefixer()
      ]);

      // 处理 CSS
      const result = await processor.process(css, {
        from: undefined
      });

      // 生成我们自己的工具类
      const ourUtilities = this.generator.generateUtilities();

      // 合并样式
      return `${result.css}\n${ourUtilities}`;
    } catch (error) {
      console.error('Error generating CSS:', error);
      // 如果出错，至少返回我们自己的工具类
      return this.generator.generateUtilities();
    }
  }

  /**
   * 获取外部资源
   */
  getExternalResources(): CSSResource[] {
    // 不再需要返回 CDN 资源，因为我们已经内联了所有样式
    return [];
  }

  /**
   * 转换布局样式
   */
  private convertLayoutStyles(layout: NonNullable<StyleDefinition['layout']>): string[] {
    const classes: string[] = [];
    
    if (layout.display) {
      classes.push(layout.display);
    }
    
    if (layout.position) {
      classes.push(layout.position);
    }
    
    if (layout.width) {
      // Convert percentage values to Tailwind's naming convention
      if (layout.width === '100%') {
        classes.push('w-full');
      } else if (layout.width === '75%') {
        classes.push('w-3/4');
      } else if (layout.width === '50%') {
        classes.push('w-1/2');
      } else if (layout.width === '25%') {
        classes.push('w-1/4');
      } else if (layout.width === 'auto') {
        classes.push('w-auto');
      } else {
        // For other values, use Tailwind's naming convention
        classes.push(`w-${layout.width}`);
      }
    }
    
    if (layout.height) {
      // Convert percentage values to Tailwind's naming convention
      if (layout.height === '100%') {
        classes.push('h-full');
      } else if (layout.height === '75%') {
        classes.push('h-3/4');
      } else if (layout.height === '50%') {
        classes.push('h-1/2');
      } else if (layout.height === '25%') {
        classes.push('h-1/4');
      } else if (layout.height === 'auto') {
        classes.push('h-auto');
      } else {
        // For other values, use Tailwind's naming convention
        classes.push(`h-${layout.height}`);
      }
    }

    return classes;
  }

  /**
   * 转换排版样式
   */
  private convertTypographyStyles(typography: NonNullable<StyleDefinition['typography']>): string[] {
    const classes: string[] = [];
    
    if (typography.fontSize) {
      classes.push(`text-${typography.fontSize}`);
    }
    
    if (typography.fontWeight) {
      classes.push(`font-${typography.fontWeight}`);
    }
    
    if (typography.textAlign) {
      classes.push(`text-${typography.textAlign}`);
    }

    return classes;
  }

  /**
   * 转换颜色样式
   */
  private convertColorStyles(colors: NonNullable<StyleDefinition['colors']>): string[] {
    const classes: string[] = [];
    
    if (colors.text) {
      classes.push(`text-${colors.text}`);
    }
    
    if (colors.background) {
      classes.push(`bg-${colors.background}`);
    }
    
    if (colors.border) {
      classes.push(`border-${colors.border}`);
    }

    return classes;
  }

  /**
   * 转换边框样式
   */
  private convertBorderStyles(border: NonNullable<StyleDefinition['border']>): string[] {
    const classes: string[] = [];
    
    if (border.width) {
      classes.push(`border-${border.width}`);
    }
    
    if (border.style) {
      classes.push(`border-${border.style}`);
    }
    
    if (border.radius) {
      classes.push(`rounded-${border.radius}`);
    }

    return classes;
  }

  /**
   * 转换Flexbox样式
   */
  private convertFlexStyles(flex: NonNullable<StyleDefinition['flex']>): string[] {
    const classes: string[] = [];
    
    if (flex.direction) {
      classes.push(`flex-${flex.direction}`);
    }
    
    if (flex.wrap) {
      classes.push(`flex-${flex.wrap}`);
    }
    
    if (flex.justify) {
      classes.push(`justify-${flex.justify}`);
    }
    
    if (flex.align) {
      classes.push(`items-${flex.align}`);
    }

    return classes;
  }

  /**
   * 转换Grid样式
   */
  private convertGridStyles(grid: NonNullable<StyleDefinition['grid']>): string[] {
    const classes: string[] = [];
    
    if (grid.columns) {
      classes.push(`grid-cols-${grid.columns}`);
    }
    
    if (grid.rows) {
      classes.push(`grid-rows-${grid.rows}`);
    }
    
    if (grid.gap) {
      classes.push(`gap-${grid.gap}`);
    }

    return classes;
  }

  /**
   * 转换间距样式
   */
  private convertSpacingStyles(spacing: NonNullable<StyleDefinition['spacing']>): string[] {
    const classes: string[] = [];
    
    if (spacing.margin) {
      if (typeof spacing.margin === 'string') {
        // Convert common values to Tailwind's naming convention
        if (spacing.margin === '0 auto') {
          classes.push('mx-auto');
        } else if (spacing.margin === '0') {
          classes.push('m-0');
        } else if (spacing.margin === 'auto') {
          classes.push('m-auto');
        } else if (spacing.margin === '1rem') {
          classes.push('m-4');
        } else if (spacing.margin === '0.5rem') {
          classes.push('m-2');
        } else if (spacing.margin === '0.25rem') {
          classes.push('m-1');
        } else if (spacing.margin === '2rem') {
          classes.push('m-8');
        } else {
          classes.push(`m-${spacing.margin}`);
        }
      } else {
        Object.entries(spacing.margin).forEach(([key, value]) => {
          // Convert common values for directional margins
          if (value === 'auto') {
            classes.push(`m${key}-auto`);
          } else if (value === '0') {
            classes.push(`m${key}-0`);
          } else if (value === '1rem') {
            classes.push(`m${key}-4`);
          } else if (value === '0.5rem') {
            classes.push(`m${key}-2`);
          } else if (value === '0.25rem') {
            classes.push(`m${key}-1`);
          } else if (value === '2rem') {
            classes.push(`m${key}-8`);
          } else {
            classes.push(`m${key}-${value}`);
          }
        });
      }
    }
    
    if (spacing.padding) {
      if (typeof spacing.padding === 'string') {
        // Convert common values to Tailwind's naming convention
        if (spacing.padding === '0') {
          classes.push('p-0');
        } else if (spacing.padding === '1rem') {
          classes.push('p-4');
        } else if (spacing.padding === '0.5rem') {
          classes.push('p-2');
        } else if (spacing.padding === '0.25rem') {
          classes.push('p-1');
        } else if (spacing.padding === '2rem') {
          classes.push('p-8');
        } else {
          classes.push(`p-${spacing.padding}`);
        }
      } else {
        Object.entries(spacing.padding).forEach(([key, value]) => {
          // Convert common values for directional padding
          if (value === '0') {
            classes.push(`p${key}-0`);
          } else if (value === '1rem') {
            classes.push(`p${key}-4`);
          } else if (value === '0.5rem') {
            classes.push(`p${key}-2`);
          } else if (value === '0.25rem') {
            classes.push(`p${key}-1`);
          } else if (value === '2rem') {
            classes.push(`p${key}-8`);
          } else {
            classes.push(`p${key}-${value}`);
          }
        });
      }
    }

    return classes;
  }

  /**
   * 转换响应式样式
   */
  private convertResponsiveStyles(responsive: NonNullable<StyleDefinition['responsive']>): string[] {
    const classes: string[] = [];
    
    Object.entries(responsive).forEach(([breakpoint, styles]) => {
      const breakpointClasses = this.convertToClasses(styles).split(' ');
      classes.push(...breakpointClasses.map(cls => `${breakpoint}:${cls}`));
    });

    return classes;
  }

  /**
   * 转换状态样式
   */
  private convertStateStyles(states: NonNullable<StyleDefinition['states']>): string[] {
    const classes: string[] = [];
    
    Object.entries(states).forEach(([state, styles]) => {
      const stateClasses = this.convertToClasses(styles).split(' ');
      classes.push(...stateClasses.map(cls => `${state}:${cls}`));
    });

    return classes;
  }

  /**
   * 去重并应用自定义映射
   */
  private deduplicateClasses(classes: string[]): string[] {
    const { prefix, classMapping = {} } = this.options;
    
    return [...new Set(classes)]
      .map(cls => {
        // 应用自定义映射
        const mappedClass = classMapping[cls] || cls;
        // 添加前缀
        return prefix ? `${prefix}-${mappedClass}` : mappedClass;
      })
      .filter(Boolean);
  }
} 