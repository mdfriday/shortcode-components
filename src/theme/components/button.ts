import { ComponentVariant, Theme } from '../types';
import { BaseComponent } from './base-component';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  rounded?: boolean;
}

/**
 * Button component implementation
 */
export class ButtonComponent extends BaseComponent {
  /**
   * Create a new ButtonComponent
   * @param variant The button variant
   * @param parent Optional parent component name
   */
  constructor(variant?: ComponentVariant) {
    const defaultVariant: ComponentVariant = {
      base: 'btn',
      variants: {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
          success: 'btn-success',
          danger: 'btn-danger',
          warning: 'btn-warning',
          info: 'btn-info',
          light: 'btn-light',
          dark: 'btn-dark',
          link: 'btn-link',
          outline: 'btn-outline'
        },
        size: {
          sm: 'btn-sm',
          md: '',
          lg: 'btn-lg'
        },
        rounded: {
          true: 'btn-rounded',
          false: ''
        },
        disabled: {
          true: 'btn-disabled',
          false: ''
        }
      }
    };
    super('button', variant || defaultVariant);
  }
  
  /**
   * Generate base class CSS
   * @param theme The theme
   * @param prefix Optional prefix for CSS classes
   * @returns The CSS string
   */
  protected generateBaseCSS(theme: Theme, prefix?: string): string {
    const baseClass = prefix ? `${prefix}-${this.variant.base}` : this.variant.base;
    let css = '';

    // 定义 CSS 变量
    css += `.${baseClass} {
      --btn-padding-y: ${theme.base.spacing[2]};
      --btn-padding-x: ${theme.base.spacing[4]};
      --btn-font-family: ${theme.base.typography.fontFamily.sans};
      --btn-font-size: ${theme.base.fontSize.base};
      --btn-font-weight: ${theme.base.fontWeight.medium};
      --btn-line-height: ${theme.base.typography.lineHeight.normal};
      --btn-color: ${theme.base.colors.text};
      --btn-bg: transparent;
      --btn-border-width: 1px;
      --btn-border-color: transparent;
      --btn-border-radius: ${theme.base.borderRadius.default};
      --btn-box-shadow: ${theme.base.shadows.default};
      --btn-disabled-opacity: ${theme.base.opacity.disabled};
      --btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--btn-focus-shadow-rgb), 0.5);

      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--btn-padding-y) var(--btn-padding-x);
      font-family: var(--btn-font-family);
      font-size: var(--btn-font-size);
      font-weight: var(--btn-font-weight);
      line-height: var(--btn-line-height);
      color: var(--btn-color);
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
      border: var(--btn-border-width) solid var(--btn-border-color);
      border-radius: var(--btn-border-radius);
      background-color: var(--btn-bg);
      transition: ${theme.base.transitions.default};
    }\n\n`;

    // 基础悬停状态
    css += `.${baseClass}:hover:not(:disabled) {
      filter: brightness(90%);
    }\n\n`;

    // 基础焦点状态
    css += `.${baseClass}:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px ${theme.base.colors.primary}25;
    }\n\n`;

    // 基础激活状态
    css += `.${baseClass}:active:not(:disabled) {
      filter: brightness(85%);
    }\n\n`;

    // 基础禁用状态
    css += `.${baseClass}:disabled,
    .${baseClass}.${prefix ? `${prefix}-btn-disabled` : 'btn-disabled'} {
      opacity: ${theme.base.opacity?.disabled || '0.65'};
      pointer-events: none;
    }\n\n`;

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
    Object.entries(this.variant.variants).forEach(([variantType, variants]) => {
      Object.entries(variants).forEach(([variantName, className]) => {
        if (!className || className.trim() === '') return;

        const variantClass = prefix ? `${prefix}-${className}` : className;

        switch (variantType) {
          case 'variant':
            css += this.generateVariantStyles(variantName, variantClass, theme);
            break;
          case 'size':
            css += this.generateSizeStyles(variantName, variantClass, theme);
            break;
          case 'rounded':
            if (variantName === 'true') {
              css += `.${variantClass} {
                border-radius: ${theme.base.borderRadius.full};
              }\n\n`;
            }
            break;
        }
      });
    });
    
    return css;
  }
  
  private generateVariantStyles(variantName: string, className: string, theme: Theme): string {
    const colors = theme.base.colors;
    let css = '';

    if (variantName === 'outline') {
      css += `.${className} {
        --btn-color: ${colors['outline-text']};
        --btn-bg: transparent;
        --btn-border-color: ${colors['outline-border']};
        --btn-hover-color: ${colors['outline-hover-text']};
        --btn-hover-bg: ${colors['outline-hover-bg']};
        --btn-hover-border-color: ${colors['outline-hover-border']};
        --btn-active-color: ${colors['outline-active-text']};
        --btn-active-bg: ${colors['outline-active-bg']};
        --btn-active-border-color: ${colors['outline-active-border']};
        --btn-disabled-color: ${colors['outline-disabled-text']};
        --btn-disabled-bg: ${colors['outline-disabled-bg']};
        --btn-disabled-border-color: ${colors['outline-disabled-border']};
        --btn-focus-shadow-rgb: ${colors['outline-shadow-rgb']};
      }\n\n`;
    } else {
      const prefix = variantName;
      css += `.${className} {
        --btn-color: ${colors[`${prefix}-text`]};
        --btn-bg: ${colors[`${prefix}-bg`]};
        --btn-border-color: ${colors[`${prefix}-border`]};
        --btn-hover-color: ${colors[`${prefix}-hover-text`]};
        --btn-hover-bg: ${colors[`${prefix}-hover-bg`]};
        --btn-hover-border-color: ${colors[`${prefix}-hover-border`]};
        --btn-active-color: ${colors[`${prefix}-active-text`]};
        --btn-active-bg: ${colors[`${prefix}-active-bg`]};
        --btn-active-border-color: ${colors[`${prefix}-active-border`]};
        --btn-disabled-color: ${colors[`${prefix}-disabled-text`]};
        --btn-disabled-bg: ${colors[`${prefix}-disabled-bg`]};
        --btn-disabled-border-color: ${colors[`${prefix}-disabled-border`]};
        --btn-focus-shadow-rgb: ${colors[`${prefix}-shadow-rgb`]};
      }\n\n`;
    }

    // 添加状态样式
    css += `.${className}:hover:not(:disabled) {
      color: var(--btn-hover-color);
      background-color: var(--btn-hover-bg);
      border-color: var(--btn-hover-border-color);
    }\n\n`;

    css += `.${className}:focus-visible {
      color: var(--btn-hover-color);
      background-color: var(--btn-hover-bg);
      border-color: var(--btn-hover-border-color);
      outline: 0;
      box-shadow: var(--btn-focus-box-shadow);
    }\n\n`;

    css += `.${className}:active:not(:disabled) {
      color: var(--btn-active-color);
      background-color: var(--btn-active-bg);
      border-color: var(--btn-active-border-color);
    }\n\n`;

    css += `.${className}:disabled {
      color: var(--btn-disabled-color);
      background-color: var(--btn-disabled-bg);
      border-color: var(--btn-disabled-border-color);
      opacity: var(--btn-disabled-opacity);
      pointer-events: none;
    }\n\n`;

    return css;
  }
  
  private generateSizeStyles(size: string, className: string, theme: Theme): string {
    let css = '';

    switch (size) {
      case 'sm':
        css += `.${className} {
          --btn-padding-y: ${theme.base.spacing[1]};
          --btn-padding-x: ${theme.base.spacing[2]};
          --btn-font-size: ${theme.base.fontSize.sm};
          --btn-border-radius: ${theme.base.borderRadius.sm};
        }\n\n`;
        break;
      case 'lg':
        css += `.${className} {
          --btn-padding-y: ${theme.base.spacing[3]};
          --btn-padding-x: ${theme.base.spacing[6]};
          --btn-font-size: ${theme.base.fontSize.lg};
          --btn-border-radius: ${theme.base.borderRadius.lg};
        }\n\n`;
        break;
    }

    return css;
  }
}

export const button = new ButtonComponent(); 