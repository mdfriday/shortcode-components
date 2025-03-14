import { BaseThemeComponent, ComponentVariant, Theme } from '../types';

/**
 * Base component implementation
 * All theme components should extend this class
 */
export class BaseComponent extends BaseThemeComponent {
  /**
   * Generate CSS for this component
   * @param theme The theme
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
   * @param theme The theme
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
   * @param theme The theme
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
          
          // 根据组件类型和变体添加样式
          if (this.name === 'button') {
            if (variantName === 'variant') {
              if (variantValue === 'primary') {
                css += `  background-color: ${theme.base.colors.primary};\n`;
                css += `  color: white;\n`;
              } else if (variantValue === 'secondary') {
                css += `  background-color: ${theme.base.colors.secondary};\n`;
                css += `  color: white;\n`;
              } else if (variantValue === 'outline') {
                css += `  border: 1px solid ${theme.base.colors.border};\n`;
                css += `  color: ${theme.base.colors.text};\n`;
                css += `  background-color: transparent;\n`;
              }
            } else if (variantName === 'size') {
              if (variantValue === 'sm') {
                css += `  padding: 0.375rem 0.75rem;\n`;
                css += `  font-size: ${theme.base.fontSize.sm};\n`;
                css += `  border-radius: ${theme.base.borderRadius.md};\n`;
              } else if (variantValue === 'md') {
                css += `  padding: 0.5rem 1rem;\n`;
                css += `  font-size: ${theme.base.fontSize.base};\n`;
                css += `  border-radius: ${theme.base.borderRadius.md};\n`;
              } else if (variantValue === 'lg') {
                css += `  padding: 0.625rem 1.25rem;\n`;
                css += `  font-size: ${theme.base.fontSize.lg};\n`;
                css += `  border-radius: ${theme.base.borderRadius.md};\n`;
              }
            }
          } else {
            css += `  /* Variant styles for ${this.name} ${variantName}=${variantValue} */\n`;
          }
          
          css += `}\n\n`;
        }
      });
    });
    
    return css;
  }
} 