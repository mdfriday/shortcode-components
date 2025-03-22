import { BaseThemeComponent, ComponentVariant, Theme } from '../types';

/**
 * Base component implementation
 * All jsons components should extend this class
 */
export class BaseComponent extends BaseThemeComponent {
  /**
   * Generate CSS for this component
   * @param theme The jsons
   * @param prefix Optional prefix for CSS classes
   * @returns The CSS string
   */
  generateCSS(theme: Theme, prefix?: string): string {
    // Generate base CSS
    let css = this.generateBaseCSS(theme, prefix);
    
    // Generate variant CSS
    css += this.generateVariantCSS(theme, prefix);
    
    return css;
  }
  
  /**
   * Generate base class CSS
   * @param theme The jsons
   * @param prefix Optional prefix for CSS classes
   * @returns The CSS string
   */
  protected generateBaseCSS(theme: Theme, prefix?: string): string {
    const baseClass = prefix ? `${prefix}-${this.variant.base}` : this.variant.base;
    let css = `.${baseClass} {\n`;
    
    // 添加基础样式
    css += `  display: inline-block;\n`;
    css += `  position: relative;\n`;
    css += `  box-sizing: border-box;\n`;
    
    css += `}\n\n`;
    
    return css;
  }
  
  /**
   * Generate variant class CSS
   * @param theme The jsons
   * @param prefix Optional prefix for CSS classes
   * @returns The CSS string
   */
  protected generateVariantCSS(theme: Theme, prefix?: string): string {
    let css = '';
    
    Object.entries(this.variant.variants).forEach(([variantName, variants]) => {
      Object.entries(variants).forEach(([variantValue, className]) => {
        if (className && className.trim() !== '') {
          const variantClass = prefix ? `${prefix}-${className}` : className;
          css += `.${variantClass} {\n`;
          css += `  /* Variant styles for ${this.name} ${variantName}=${variantValue} */\n`;
          css += `  /* Please override this style with generateVariantCSS method */\n`;
          css += `}\n\n`;
        }
      });
    });
    
    return css;
  }
} 