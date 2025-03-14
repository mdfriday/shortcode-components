import { StyleDefinition, ComponentStyleConfig } from './style';

/**
 * CSS 框架适配器配置选项
 */
export interface CSSFrameworkAdapterOptions {
  // 是否压缩生成的 CSS
  minify?: boolean;
  // 是否生成 sourcemap
  sourceMap?: boolean;
  // 自定义前缀
  prefix?: string;
  // 自定义配置
  config?: Record<string, any>;
}

/**
 * CSS 资源类型
 */
export interface CSSResource {
  type: 'style' | 'link';
  content?: string;
  href?: string;
  media?: string;
}

/**
 * CSS 框架适配器接口
 */
export interface CSSFrameworkAdapter {
  /**
   * 适配器名称
   */
  readonly name: string;

  /**
   * 将样式定义转换为类名
   * @param styles 样式定义
   * @param options 选项
   */
  convertToClasses(styles: StyleDefinition, options?: CSSFrameworkAdapterOptions): string;

  /**
   * 将组件样式配置转换为类名
   * @param config 组件样式配置
   * @param variant 变体
   * @param size 尺寸
   * @param state 状态
   * @param options 选项
   */
  convertComponentToClasses(
    config: ComponentStyleConfig,
    variant?: string,
    size?: string,
    state?: string,
    options?: CSSFrameworkAdapterOptions
  ): string;

  /**
   * 生成完整的 CSS
   * @param options 选项
   */
  generateCSS(options?: CSSFrameworkAdapterOptions): string;

  /**
   * 获取外部资源
   * @param options 选项
   */
  getExternalResources(options?: CSSFrameworkAdapterOptions): CSSResource[];

  /**
   * 注册自定义样式
   * @param styles 自定义样式
   * @param options 选项
   */
  registerCustomStyles?(styles: Record<string, StyleDefinition>, options?: CSSFrameworkAdapterOptions): void;

  /**
   * 清理注册的样式
   */
  cleanup?(): void;
}

/**
 * CSS 框架适配器注册表
 */
export interface CSSFrameworkAdapterRegistry {
  /**
   * 注册适配器
   * @param adapter 适配器实例
   */
  register(adapter: CSSFrameworkAdapter): void;

  /**
   * 获取适配器
   * @param name 适配器名称
   */
  get(name: string): CSSFrameworkAdapter | undefined;

  /**
   * 移除适配器
   * @param name 适配器名称
   */
  remove(name: string): void;

  /**
   * 获取所有已注册的适配器
   */
  getAll(): Map<string, CSSFrameworkAdapter>;
} 