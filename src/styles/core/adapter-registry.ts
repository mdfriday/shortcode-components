import { CSSFrameworkAdapter, CSSFrameworkAdapterRegistry } from '../types/adapter';

/**
 * CSS 框架适配器注册表实现
 */
export class DefaultCSSFrameworkAdapterRegistry implements CSSFrameworkAdapterRegistry {
  private adapters: Map<string, CSSFrameworkAdapter> = new Map();

  /**
   * 注册适配器
   * @param adapter 适配器实例
   */
  register(adapter: CSSFrameworkAdapter): void {
    if (this.adapters.has(adapter.name)) {
      throw new Error(`Adapter with name "${adapter.name}" is already registered`);
    }
    this.adapters.set(adapter.name, adapter);
  }

  /**
   * 获取适配器
   * @param name 适配器名称
   */
  get(name: string): CSSFrameworkAdapter | undefined {
    return this.adapters.get(name);
  }

  /**
   * 移除适配器
   * @param name 适配器名称
   */
  remove(name: string): void {
    const adapter = this.adapters.get(name);
    if (adapter && adapter.cleanup) {
      adapter.cleanup();
    }
    this.adapters.delete(name);
  }

  /**
   * 获取所有已注册的适配器
   */
  getAll(): Map<string, CSSFrameworkAdapter> {
    return new Map(this.adapters);
  }
}

// 创建全局适配器注册表实例
export const adapterRegistry = new DefaultCSSFrameworkAdapterRegistry(); 