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
    
    // 使用基础元素属性
    css += `  --bs-btn-padding-x: ${theme.base.spacing['btn-padding-x'] || '0.75rem'};\n`;
    css += `  --bs-btn-padding-y: ${theme.base.spacing['btn-padding-y'] || '0.375rem'};\n`;
    css += `  --bs-btn-font-family: ${theme.base.typography.fontFamily.sans};\n`;
    css += `  --bs-btn-font-size: ${theme.base.fontSize['btn-font-size'] || theme.base.fontSize.base};\n`;
    css += `  --bs-btn-font-weight: ${theme.base.fontWeight.normal};\n`;
    css += `  --bs-btn-line-height: ${theme.base.typography.lineHeight.normal};\n`;
    css += `  --bs-btn-color: ${theme.base.colors.text};\n`;
    css += `  --bs-btn-bg: transparent;\n`;
    css += `  --bs-btn-border-width: 1px;\n`;
    css += `  --bs-btn-border-color: transparent;\n`;
    css += `  --bs-btn-border-radius: ${theme.base.borderRadius['btn-border-radius'] || theme.base.borderRadius.default};\n`;
    css += `  --bs-btn-hover-border-color: transparent;\n`;
    css += `  --bs-btn-box-shadow: ${theme.base.shadows['btn-box-shadow'] || 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075)'};\n`;
    css += `  --bs-btn-disabled-opacity: ${theme.base.opacity?.disabled || '0.65'};\n`;
    css += `  --bs-btn-focus-box-shadow: ${theme.base.shadows['btn-focus-box-shadow'] || '0 0 0 0.25rem'} rgba(var(--bs-btn-focus-shadow-rgb), .5);\n`;
    
    css += `  display: inline-block;\n`;
    css += `  padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);\n`;
    css += `  font-family: var(--bs-btn-font-family);\n`;
    css += `  font-size: var(--bs-btn-font-size);\n`;
    css += `  font-weight: var(--bs-btn-font-weight);\n`;
    css += `  line-height: var(--bs-btn-line-height);\n`;
    css += `  color: var(--bs-btn-color);\n`;
    css += `  text-align: center;\n`;
    css += `  text-decoration: none;\n`;
    css += `  vertical-align: middle;\n`;
    css += `  cursor: pointer;\n`;
    css += `  user-select: none;\n`;
    css += `  border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);\n`;
    css += `  border-radius: var(--bs-btn-border-radius);\n`;
    css += `  background-color: var(--bs-btn-bg);\n`;
    css += `  transition: ${theme.base.transitions['btn-transition'] || 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out'};\n`;
    
    css += `}\n\n`;
    
    // 按钮悬停状态
    css += `.${baseClass}:hover {\n`;
    css += `  color: var(--bs-btn-hover-color, var(--bs-btn-color));\n`;
    css += `  background-color: var(--bs-btn-hover-bg, var(--bs-btn-bg));\n`;
    css += `  border-color: var(--bs-btn-hover-border-color, var(--bs-btn-border-color));\n`;
    css += `}\n\n`;
    
    // 按钮焦点状态
    css += `.${baseClass}:focus-visible {\n`;
    css += `  color: var(--bs-btn-hover-color, var(--bs-btn-color));\n`;
    css += `  background-color: var(--bs-btn-hover-bg, var(--bs-btn-bg));\n`;
    css += `  border-color: var(--bs-btn-hover-border-color, var(--bs-btn-border-color));\n`;
    css += `  outline: 0;\n`;
    css += `  box-shadow: var(--bs-btn-focus-box-shadow);\n`;
    css += `}\n\n`;
    
    // 按钮激活状态
    css += `.${baseClass}:active {\n`;
    css += `  color: var(--bs-btn-active-color, var(--bs-btn-color));\n`;
    css += `  background-color: var(--bs-btn-active-bg, var(--bs-btn-bg));\n`;
    css += `  border-color: var(--bs-btn-active-border-color, var(--bs-btn-border-color));\n`;
    css += `}\n\n`;
    
    // 按钮禁用状态
    css += `.${baseClass}:disabled {\n`;
    css += `  color: var(--bs-btn-disabled-color, var(--bs-btn-color));\n`;
    css += `  pointer-events: none;\n`;
    css += `  background-color: var(--bs-btn-disabled-bg, var(--bs-btn-bg));\n`;
    css += `  border-color: var(--bs-btn-disabled-border-color, var(--bs-btn-border-color));\n`;
    css += `  opacity: var(--bs-btn-disabled-opacity);\n`;
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
    
    // 处理变体
    Object.entries(this.variant.variants).forEach(([variantName, variants]) => {
      Object.entries(variants).forEach(([variantValue, className]) => {
        // 确保类名不为空
        if (className && className.trim() !== '') {
          const variantClass = prefix ? `${prefix}-${className}` : className;
          
          // 处理按钮变体
          if (variantName === 'variant') {
            // 使用基础元素属性
            const colorPrefix = `${variantValue}`;
            
            if (theme.base.colors[`${colorPrefix}-text`]) {
              // 使用主题中定义的变量
              css += `.${variantClass} {\n`;
              css += `  --bs-btn-color: ${theme.base.colors[`${colorPrefix}-text`] || '#fff'};\n`;
              css += `  --bs-btn-bg: ${theme.base.colors[`${colorPrefix}-bg`] || 'transparent'};\n`;
              css += `  --bs-btn-border-color: ${theme.base.colors[`${colorPrefix}-border`] || 'transparent'};\n`;
              css += `  --bs-btn-hover-color: ${theme.base.colors[`${colorPrefix}-hover-text`] || theme.base.colors[`${colorPrefix}-text`] || '#fff'};\n`;
              css += `  --bs-btn-hover-bg: ${theme.base.colors[`${colorPrefix}-hover-bg`] || theme.base.colors[`${colorPrefix}-bg`] || 'transparent'};\n`;
              css += `  --bs-btn-hover-border-color: ${theme.base.colors[`${colorPrefix}-hover-border`] || theme.base.colors[`${colorPrefix}-border`] || 'transparent'};\n`;
              css += `  --bs-btn-focus-shadow-rgb: ${theme.base.colors[`${colorPrefix}-shadow-rgb`] || '0, 0, 0'};\n`;
              css += `  --bs-btn-active-color: ${theme.base.colors[`${colorPrefix}-active-text`] || theme.base.colors[`${colorPrefix}-hover-text`] || theme.base.colors[`${colorPrefix}-text`] || '#fff'};\n`;
              css += `  --bs-btn-active-bg: ${theme.base.colors[`${colorPrefix}-active-bg`] || theme.base.colors[`${colorPrefix}-hover-bg`] || theme.base.colors[`${colorPrefix}-bg`] || 'transparent'};\n`;
              css += `  --bs-btn-active-border-color: ${theme.base.colors[`${colorPrefix}-active-border`] || theme.base.colors[`${colorPrefix}-hover-border`] || theme.base.colors[`${colorPrefix}-border`] || 'transparent'};\n`;
              css += `  --bs-btn-active-shadow: ${theme.base.shadows['btn-active-shadow'] || 'inset 0 3px 5px rgba(0, 0, 0, 0.125)'};\n`;
              css += `  --bs-btn-disabled-color: ${theme.base.colors[`${colorPrefix}-disabled-text`] || theme.base.colors[`${colorPrefix}-text`] || '#fff'};\n`;
              css += `  --bs-btn-disabled-bg: ${theme.base.colors[`${colorPrefix}-disabled-bg`] || theme.base.colors[`${colorPrefix}-bg`] || 'transparent'};\n`;
              css += `  --bs-btn-disabled-border-color: ${theme.base.colors[`${colorPrefix}-disabled-border`] || theme.base.colors[`${colorPrefix}-border`] || 'transparent'};\n`;
              css += `}\n\n`;
            } else {
              // 回退到默认实现
              if (variantValue === 'primary') {
                css += this.generateButtonVariant(
                  variantClass,
                  theme.base.colors.primary,
                  '#fff',
                  theme.base.colors.primary,
                  '#0a58ca',
                  '#fff',
                  '#0a53be',
                  '0 0 0 0.25rem rgba(49, 132, 253, 0.5)'
                );
              } else if (variantValue === 'secondary') {
                css += this.generateButtonVariant(
                  variantClass,
                  theme.base.colors.secondary,
                  '#fff',
                  theme.base.colors.secondary,
                  '#5c636a',
                  '#fff',
                  '#565e64',
                  '0 0 0 0.25rem rgba(130, 138, 145, 0.5)'
                );
              } else if (variantValue === 'success') {
                css += this.generateButtonVariant(
                  variantClass,
                  theme.base.colors.success,
                  '#fff',
                  theme.base.colors.success,
                  '#157347',
                  '#fff',
                  '#146c43',
                  '0 0 0 0.25rem rgba(60, 153, 110, 0.5)'
                );
              } else if (variantValue === 'danger') {
                css += this.generateButtonVariant(
                  variantClass,
                  theme.base.colors.danger,
                  '#fff',
                  theme.base.colors.danger,
                  '#bb2d3b',
                  '#fff',
                  '#b02a37',
                  '0 0 0 0.25rem rgba(225, 83, 97, 0.5)'
                );
              } else if (variantValue === 'warning') {
                css += this.generateButtonVariant(
                  variantClass,
                  theme.base.colors.warning,
                  '#000',
                  theme.base.colors.warning,
                  '#d39e00',
                  '#000',
                  '#c69500',
                  '0 0 0 0.25rem rgba(217, 164, 6, 0.5)'
                );
              } else if (variantValue === 'info') {
                css += this.generateButtonVariant(
                  variantClass,
                  theme.base.colors.info,
                  '#000',
                  theme.base.colors.info,
                  '#0dcaf0',
                  '#000',
                  '#31d2f2',
                  '0 0 0 0.25rem rgba(11, 172, 204, 0.5)'
                );
              }
            }
          } else if (variantName === 'size') {
            // 使用基础元素属性
            if (variantValue === 'sm') {
              css += `.${variantClass} {\n`;
              css += `  --bs-btn-padding-y: ${theme.base.spacing['btn-padding-y-sm'] || '0.25rem'};\n`;
              css += `  --bs-btn-padding-x: ${theme.base.spacing['btn-padding-x-sm'] || '0.5rem'};\n`;
              css += `  --bs-btn-font-size: ${theme.base.fontSize['btn-font-size-sm'] || '0.875rem'};\n`;
              css += `  --bs-btn-border-radius: ${theme.base.borderRadius['btn-border-radius-sm'] || '0.25rem'};\n`;
              css += `}\n\n`;
            } else if (variantValue === 'lg') {
              css += `.${variantClass} {\n`;
              css += `  --bs-btn-padding-y: ${theme.base.spacing['btn-padding-y-lg'] || '0.5rem'};\n`;
              css += `  --bs-btn-padding-x: ${theme.base.spacing['btn-padding-x-lg'] || '1rem'};\n`;
              css += `  --bs-btn-font-size: ${theme.base.fontSize['btn-font-size-lg'] || '1.25rem'};\n`;
              css += `  --bs-btn-border-radius: ${theme.base.borderRadius['btn-border-radius-lg'] || '0.5rem'};\n`;
              css += `}\n\n`;
            }
          }
        }
      });
    });
    
    return css;
  }
  
  /**
   * 生成 Bootstrap 按钮变体样式
   */
  private generateButtonVariant(
    className: string,
    background: string,
    color: string,
    borderColor: string,
    hoverBackground: string,
    hoverColor: string,
    activeBackground: string,
    focusBoxShadow: string
  ): string {
    let css = `.${className} {\n`;
    css += `  --bs-btn-color: ${color};\n`;
    css += `  --bs-btn-bg: ${background};\n`;
    css += `  --bs-btn-border-color: ${borderColor};\n`;
    css += `  --bs-btn-hover-color: ${hoverColor};\n`;
    css += `  --bs-btn-hover-bg: ${hoverBackground};\n`;
    css += `  --bs-btn-hover-border-color: ${hoverBackground};\n`;
    css += `  --bs-btn-focus-shadow-rgb: ${this.hexToRgb(background)};\n`;
    css += `  --bs-btn-active-color: ${hoverColor};\n`;
    css += `  --bs-btn-active-bg: ${activeBackground};\n`;
    css += `  --bs-btn-active-border-color: ${activeBackground};\n`;
    css += `  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n`;
    css += `  --bs-btn-disabled-color: ${color};\n`;
    css += `  --bs-btn-disabled-bg: ${background};\n`;
    css += `  --bs-btn-disabled-border-color: ${background};\n`;
    css += `}\n\n`;
    
    return css;
  }
  
  /**
   * 将十六进制颜色转换为 RGB 格式
   */
  private hexToRgb(hex: string): string {
    // 移除 # 号
    hex = hex.replace('#', '');
    
    // 解析 RGB 值
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }
} 