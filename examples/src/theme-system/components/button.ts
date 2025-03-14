import { ComponentVariant, Theme } from '../types';
import { BaseComponent } from './base-component';

/**
 * Button component implementation
 */
export class ButtonComponent extends BaseComponent {
  /**
   * Create a new ButtonComponent
   * @param variant The button variant
   * @param parent Optional parent component name
   */
  constructor(variant: ComponentVariant, parent?: string) {
    super('button', variant, parent);
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
    
    // Common button styles
    css += `  display: inline-flex;\n`;
    css += `  align-items: center;\n`;
    css += `  justify-content: center;\n`;
    css += `  font-weight: ${theme.base.fontWeight.medium || 500};\n`;
    css += `  transition: ${theme.base.transitions.default || 'all 0.2s ease-in-out'};\n`;
    css += `  outline: none;\n`;
    css += `  cursor: pointer;\n`;
    css += `  border: 1px solid transparent;\n`;
    
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
    
    // Process variants
    Object.entries(this.variant.variants).forEach(([variantName, variants]) => {
      Object.entries(variants).forEach(([variantValue, className]) => {
        // 确保类名不为空
        if (className && className.trim() !== '') {
          const variantClass = prefix ? `${prefix}-${className}` : className;
          css += `.${variantClass} {\n`;
          
          // Variant-specific styles
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
            } else if (variantValue === 'ghost') {
              css += `  background-color: transparent;\n`;
              css += `  color: ${theme.base.colors.text};\n`;
              css += `  border: none;\n`;
            } else if (variantValue === 'success') {
              css += `  background-color: ${theme.base.colors.success};\n`;
              css += `  color: white;\n`;
            } else if (variantValue === 'danger') {
              css += `  background-color: ${theme.base.colors.danger};\n`;
              css += `  color: white;\n`;
            } else if (variantValue === 'warning') {
              css += `  background-color: ${theme.base.colors.warning};\n`;
              css += `  color: #1f2937;\n`;
            } else if (variantValue === 'info') {
              css += `  background-color: ${theme.base.colors.info};\n`;
              css += `  color: white;\n`;
            }
          } else if (variantName === 'size') {
            if (variantValue === 'xs') {
              css += `  padding: 0.25rem 0.5rem;\n`;
              css += `  font-size: ${theme.base.fontSize.xs};\n`;
              css += `  border-radius: ${theme.base.borderRadius.sm};\n`;
            } else if (variantValue === 'sm') {
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
            } else if (variantValue === 'xl') {
              css += `  padding: 0.75rem 1.5rem;\n`;
              css += `  font-size: ${theme.base.fontSize.xl};\n`;
              css += `  border-radius: ${theme.base.borderRadius.lg};\n`;
            }
          } else if (variantName === 'rounded') {
            if (variantValue === 'true') {
              css += `  border-radius: ${theme.base.borderRadius.full};\n`;
            }
          } else if (variantName === 'disabled') {
            if (variantValue === 'true') {
              css += `  opacity: 0.5;\n`;
              css += `  cursor: not-allowed;\n`;
              css += `  pointer-events: none;\n`;
            }
          }
          
          css += `}\n\n`;
        }
      });
    });
    
    // Add hover and focus states
    css = this.addHoverAndFocusStates(css, theme, prefix);
    
    return css;
  }
  
  /**
   * Add hover and focus states
   * @param css The CSS string
   * @param theme The theme
   * @param prefix Optional prefix for CSS classes
   */
  private addHoverAndFocusStates(css: string, theme: Theme, prefix?: string): string {
    let result = css;
    
    // Primary button hover
    const primaryClass = prefix ? `${prefix}-btn-primary` : 'btn-primary';
    result += `.${primaryClass}:hover {\n`;
    result += `  background-color: ${this.darkenColor(theme.base.colors.primary)};\n`;
    result += `}\n\n`;
    
    // Secondary button hover
    const secondaryClass = prefix ? `${prefix}-btn-secondary` : 'btn-secondary';
    result += `.${secondaryClass}:hover {\n`;
    result += `  background-color: ${this.darkenColor(theme.base.colors.secondary)};\n`;
    result += `}\n\n`;
    
    // Outline button hover
    const outlineClass = prefix ? `${prefix}-btn-outline` : 'btn-outline';
    result += `.${outlineClass}:hover {\n`;
    result += `  background-color: rgba(0, 0, 0, 0.05);\n`;
    result += `}\n\n`;
    
    // Primary button focus
    result += `.${primaryClass}:focus {\n`;
    result += `  box-shadow: 0 0 0 2px ${this.transparentize(theme.base.colors.primary, 0.5)};\n`;
    result += `}\n\n`;
    
    // Secondary button focus
    result += `.${secondaryClass}:focus {\n`;
    result += `  box-shadow: 0 0 0 2px ${this.transparentize(theme.base.colors.secondary, 0.5)};\n`;
    result += `}\n\n`;
    
    return result;
  }
  
  /**
   * Darken a color (simple implementation)
   * @param color The color to darken
   * @returns The darkened color
   */
  private darkenColor(color: string): string {
    // This is a simple implementation
    // In a real-world scenario, you would use a color library
    return color;
  }
  
  /**
   * Make a color transparent
   * @param color The color
   * @param opacity The opacity
   * @returns The transparent color
   */
  private transparentize(color: string, opacity: number): string {
    // This is a simple implementation
    // In a real-world scenario, you would use a color library
    return `rgba(0, 0, 0, ${opacity})`;
  }
} 