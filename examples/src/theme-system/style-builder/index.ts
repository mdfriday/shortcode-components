export * from './types';
export * from './base-builder';
export * from './bootstrap-builder';
export * from './tailwind-builder';

// Factory registry for style builders
import { StyleBuilderFactory } from './types';
import { BootstrapStyleBuilderFactory } from './bootstrap-builder';
import { TailwindStyleBuilderFactory } from './tailwind-builder';
import { Theme } from '../types';

/**
 * Style builder factory registry
 */
export class StyleBuilderRegistry {
  private static factories: Record<string, (theme: Theme) => StyleBuilderFactory> = {
    bootstrap: (theme: Theme) => new BootstrapStyleBuilderFactory(theme),
    tailwind: (theme: Theme) => new TailwindStyleBuilderFactory(theme)
  };

  /**
   * Register a new style builder factory
   * @param name Factory name
   * @param factory Factory function
   */
  static registerFactory(name: string, factory: (theme: Theme) => StyleBuilderFactory): void {
    StyleBuilderRegistry.factories[name] = factory;
  }

  /**
   * Get a style builder factory by name
   * @param name Factory name
   * @param theme Theme to use
   * @returns Style builder factory
   */
  static getFactory(name: string, theme: Theme): StyleBuilderFactory {
    const factoryFn = StyleBuilderRegistry.factories[name];
    if (!factoryFn) {
      throw new Error(`Style builder factory not found: ${name}`);
    }
    return factoryFn(theme);
  }

  /**
   * Check if a style builder factory exists
   * @param name Factory name
   * @returns True if the factory exists
   */
  static hasFactory(name: string): boolean {
    return !!StyleBuilderRegistry.factories[name];
  }
} 