import { StyleDefinition } from './style';
import { ComponentStyleConfig } from './component';

export * from './style';
export * from './adapter';
export * from './theme-manager';

/**
 * CSS框架适配器接口
 */
export interface CSSFrameworkAdapter {
  /**
   * 适配器名称
   */
  readonly name: string;

  /**
   * 将样式定义转换为类名
   */
  convertToClasses(style: StyleDefinition, options?: CSSFrameworkAdapterOptions): string;

  /**
   * 将组件配置转换为类名
   */
  convertComponentToClasses(
    config: ComponentStyleConfig,
    variant?: string,
    size?: string,
    state?: string,
    options?: CSSFrameworkAdapterOptions
  ): string;

  /**
   * 生成CSS代码
   */
  generateCSS(): string;

  /**
   * 获取外部资源
   */
  getExternalResources(): CSSResource[];

  /**
   * 更新主题配置
   */
  updateTheme?(theme: any): void;
}

/**
 * CSS框架适配器选项
 */
export interface CSSFrameworkAdapterOptions {
  // 自定义前缀
  prefix?: string;
  // 自定义分隔符
  separator?: string;
  // 自定义类名映射
  classMapping?: Record<string, string>;
}

/**
 * CSS资源类型
 */
export interface CSSResource {
  // 资源类型
  type: 'link' | 'style' | 'script';
  // 资源路径
  href?: string;
  // 资源内容
  content?: string;
  // 资源属性
  attributes?: Record<string, string>;
}

// 预留其他类型导出 