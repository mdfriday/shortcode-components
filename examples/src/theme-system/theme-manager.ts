import { Theme, ThemeManager, ThemeMode } from './types';
import { mergeThemes, addPrefix, validateTheme } from './utils';

/**
 * Implementation of the ThemeManager interface
 */
export class ThemeManagerImpl implements ThemeManager {
  /**
   * Map of themes, keyed by name-mode
   */
  private themes: Map<string, Theme> = new Map();
  
  /**
   * Current theme name and mode
   */
  private currentTheme: { name: string; mode: ThemeMode } = { name: '', mode: 'light' };
  
  /**
   * Prefix for CSS classes
   */
  private prefix: string;
  
  /**
   * Create a new ThemeManagerImpl
   * @param prefix Optional prefix for CSS classes
   */
  constructor(prefix: string = '') {
    this.prefix = prefix;
  }
  
  /**
   * Register a new theme
   * @param theme The theme to register
   */
  register(theme: Theme): void {
    if (!validateTheme(theme)) {
      throw new Error(`Invalid theme: ${theme.name}`);
    }
    
    const key = `${theme.name}-${theme.mode}`;
    this.themes.set(key, theme);
    
    // Set as current theme if no theme is set
    if (!this.currentTheme.name) {
      this.setCurrentTheme(theme.name, theme.mode);
    }
  }
  
  /**
   * Get a theme by name and mode
   * @param name The theme name
   * @param mode The theme mode
   * @returns The theme
   */
  getTheme(name: string, mode: ThemeMode): Theme {
    const key = `${name}-${mode}`;
    const theme = this.themes.get(key);
    
    if (!theme) {
      throw new Error(`Theme ${name} with mode ${mode} not found`);
    }
    
    // If the theme has a parent, merge with parent
    if (theme.parent) {
      const parentTheme = this.getTheme(theme.parent, mode);
      return mergeThemes(parentTheme, theme);
    }
    
    return theme;
  }
  
  /**
   * Get the current theme
   * @returns The current theme
   */
  getCurrentTheme(): Theme {
    if (!this.currentTheme.name) {
      throw new Error('No theme is currently set');
    }
    
    return this.getTheme(this.currentTheme.name, this.currentTheme.mode);
  }
  
  /**
   * Set the current theme
   * @param name The theme name
   * @param mode The theme mode
   */
  setCurrentTheme(name: string, mode: ThemeMode): void {
    const key = `${name}-${mode}`;
    
    if (!this.themes.has(key)) {
      throw new Error(`Theme ${name} with mode ${mode} not found`);
    }
    
    this.currentTheme = { name, mode };
  }
  
  /**
   * Get component classes based on props
   * @param componentName The component name
   * @param props The component props
   * @returns The component classes
   */
  getComponentClasses(componentName: string, props: Record<string, any>): string {
    const theme = this.getCurrentTheme();
    const component = theme.components[componentName];
    
    if (!component) {
      return '';
    }
    
    // Start with base class
    let classes = component.base;
    
    // Add variant classes based on props
    for (const [propName, propValue] of Object.entries(props)) {
      if (component.variants[propName] && component.variants[propName][propValue]) {
        classes += ` ${component.variants[propName][propValue]}`;
      }
    }
    
    // Add prefix if specified
    if (this.prefix) {
      classes = addPrefix(classes, this.prefix);
    }
    
    return classes;
  }
  
  /**
   * Get all CSS for the current theme
   * @param prefix Optional prefix for CSS classes, defaults to the prefix set in the constructor
   * @returns The CSS string
   */
  getAllCSS(prefix: string = this.prefix): string {
    const theme = this.getCurrentTheme();
    
    // Generate CSS
    let css = '';
    
    // Generate base CSS
    css += this.generateBaseCSS(theme, prefix);
    
    // Generate component CSS
    css += this.generateComponentCSS(theme, prefix);
    
    return css;
  }
  
  /**
   * Preload themes from JSON
   * @param themesJson The themes JSON
   */
  preloadThemes(themesJson: any): void {
    if (!Array.isArray(themesJson)) {
      throw new Error('Themes JSON must be an array');
    }
    
    for (const themeData of themesJson) {
      if (validateTheme(themeData)) {
        this.register(themeData);
      } else {
        console.warn(`Invalid theme data: ${JSON.stringify(themeData)}`);
      }
    }
  }
  
  /**
   * Generate CSS for base styles
   * @param theme The theme
   * @param prefix The prefix
   * @returns The CSS string
   */
  private generateBaseCSS(theme: Theme, prefix: string): string {
    let css = '';
    
    // Generate CSS variables
    css += `:root {\n`;
    
    // Colors
    Object.entries(theme.base.colors).forEach(([name, value]) => {
      css += `  --${prefix ? prefix + '-' : ''}color-${name}: ${value};\n`;
    });
    
    // Spacing
    Object.entries(theme.base.spacing).forEach(([name, value]) => {
      css += `  --${prefix ? prefix + '-' : ''}spacing-${name}: ${value};\n`;
    });
    
    // Typography
    Object.entries(theme.base.typography.fontFamily).forEach(([name, value]) => {
      css += `  --${prefix ? prefix + '-' : ''}font-family-${name}: ${value};\n`;
    });
    
    Object.entries(theme.base.typography.lineHeight).forEach(([name, value]) => {
      css += `  --${prefix ? prefix + '-' : ''}line-height-${name}: ${value};\n`;
    });
    
    Object.entries(theme.base.typography.letterSpacing).forEach(([name, value]) => {
      css += `  --${prefix ? prefix + '-' : ''}letter-spacing-${name}: ${value};\n`;
    });
    
    // Font sizes
    Object.entries(theme.base.fontSize).forEach(([name, value]) => {
      css += `  --${prefix ? prefix + '-' : ''}font-size-${name}: ${value};\n`;
    });
    
    // Font weights
    Object.entries(theme.base.fontWeight).forEach(([name, value]) => {
      css += `  --${prefix ? prefix + '-' : ''}font-weight-${name}: ${value};\n`;
    });
    
    // Border radius
    Object.entries(theme.base.borderRadius).forEach(([name, value]) => {
      css += `  --${prefix ? prefix + '-' : ''}border-radius-${name}: ${value};\n`;
    });
    
    // Shadows
    Object.entries(theme.base.shadows).forEach(([name, value]) => {
      css += `  --${prefix ? prefix + '-' : ''}shadow-${name}: ${value};\n`;
    });
    
    // Transitions
    Object.entries(theme.base.transitions).forEach(([name, value]) => {
      css += `  --${prefix ? prefix + '-' : ''}transition-${name}: ${value};\n`;
    });
    
    css += `}\n\n`;
    
    return css;
  }
  
  /**
   * Generate CSS for component styles
   * @param theme The theme
   * @param prefix The prefix
   * @returns The CSS string
   */
  private generateComponentCSS(theme: Theme, prefix: string): string {
    let css = '';
    
    // Generate component CSS
    Object.entries(theme.components).forEach(([componentName, component]) => {
      // Base class
      const baseClass = prefix ? `${prefix}-${component.base}` : component.base;
      css += `.${baseClass} {\n`;
      
      // 解析基础类名并添加实际样式
      if (componentName === 'button') {
        if (theme.name === 'tailwind') {
          // 为tailwind主题的按钮添加基础样式
          css += `  display: inline-flex;\n`;
          css += `  align-items: center;\n`;
          css += `  justify-content: center;\n`;
          css += `  font-weight: 500;\n`;
          css += `  transition-property: color, background-color, border-color;\n`;
          css += `  transition-duration: 150ms;\n`;
          css += `  transition-timing-function: ease-in-out;\n`;
          css += `  outline: none;\n`;
          css += `  cursor: pointer;\n`;
        } else if (theme.name === 'bootstrap') {
          // 为bootstrap主题的按钮添加基础样式
          css += `  display: inline-block;\n`;
          css += `  font-weight: 400;\n`;
          css += `  text-align: center;\n`;
          css += `  vertical-align: middle;\n`;
          css += `  user-select: none;\n`;
          css += `  border: 1px solid transparent;\n`;
          css += `  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;\n`;
          css += `  cursor: pointer;\n`;
        }
      } else if (componentName === 'card') {
        // 为卡片添加基础样式
        css += `  display: block;\n`;
        css += `  background-color: ${theme.base.colors.background};\n`;
        css += `  color: ${theme.base.colors.text};\n`;
        css += `  overflow: hidden;\n`;
      } else if (componentName === 'input') {
        // 为输入框添加基础样式
        css += `  display: block;\n`;
        css += `  width: 100%;\n`;
        css += `  font-family: ${theme.base.typography.fontFamily.sans};\n`;
        css += `  color: ${theme.base.colors.text};\n`;
        css += `  background-color: ${theme.base.colors.background};\n`;
        css += `  transition: ${theme.base.transitions.default};\n`;
      }
      css += `}\n\n`;
      
      // Variant classes
      Object.entries(component.variants).forEach(([variantName, variants]) => {
        Object.entries(variants).forEach(([variantValue, className]) => {
          const variantClass = prefix ? `${prefix}-${className}` : className;
          css += `.${variantClass} {\n`;
          
          // 为不同变体添加实际样式
          if (componentName === 'button') {
            if (theme.name === 'tailwind') {
              // 为tailwind主题的按钮变体添加样式
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
                  css += `  padding-left: 0.5rem;\n`;
                  css += `  padding-right: 0.5rem;\n`;
                  css += `  padding-top: 0.25rem;\n`;
                  css += `  padding-bottom: 0.25rem;\n`;
                  css += `  font-size: ${theme.base.fontSize.xs};\n`;
                  css += `  border-radius: ${theme.base.borderRadius.sm};\n`;
                } else if (variantValue === 'sm') {
                  css += `  padding-left: 0.75rem;\n`;
                  css += `  padding-right: 0.75rem;\n`;
                  css += `  padding-top: 0.375rem;\n`;
                  css += `  padding-bottom: 0.375rem;\n`;
                  css += `  font-size: ${theme.base.fontSize.sm};\n`;
                  css += `  border-radius: ${theme.base.borderRadius.md};\n`;
                } else if (variantValue === 'md') {
                  css += `  padding-left: 1rem;\n`;
                  css += `  padding-right: 1rem;\n`;
                  css += `  padding-top: 0.5rem;\n`;
                  css += `  padding-bottom: 0.5rem;\n`;
                  css += `  font-size: ${theme.base.fontSize.base};\n`;
                  css += `  border-radius: ${theme.base.borderRadius.md};\n`;
                } else if (variantValue === 'lg') {
                  css += `  padding-left: 1.25rem;\n`;
                  css += `  padding-right: 1.25rem;\n`;
                  css += `  padding-top: 0.625rem;\n`;
                  css += `  padding-bottom: 0.625rem;\n`;
                  css += `  font-size: ${theme.base.fontSize.lg};\n`;
                  css += `  border-radius: ${theme.base.borderRadius.md};\n`;
                } else if (variantValue === 'xl') {
                  css += `  padding-left: 1.5rem;\n`;
                  css += `  padding-right: 1.5rem;\n`;
                  css += `  padding-top: 0.75rem;\n`;
                  css += `  padding-bottom: 0.75rem;\n`;
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
            } else if (theme.name === 'bootstrap') {
              // 为bootstrap主题的按钮变体添加样式
              if (variantName === 'variant') {
                if (variantValue === 'primary') {
                  css += `  background-color: ${theme.base.colors.primary};\n`;
                  css += `  color: white;\n`;
                  css += `  border-color: ${theme.base.colors.primary};\n`;
                } else if (variantValue === 'secondary') {
                  css += `  background-color: ${theme.base.colors.secondary};\n`;
                  css += `  color: white;\n`;
                  css += `  border-color: ${theme.base.colors.secondary};\n`;
                } else if (variantValue === 'outline') {
                  css += `  color: ${theme.base.colors.primary};\n`;
                  css += `  border-color: ${theme.base.colors.primary};\n`;
                  css += `  background-color: transparent;\n`;
                } else if (variantValue === 'ghost') {
                  css += `  background-color: transparent;\n`;
                  css += `  color: ${theme.base.colors.text};\n`;
                  css += `  border: none;\n`;
                } else if (variantValue === 'success') {
                  css += `  background-color: ${theme.base.colors.success};\n`;
                  css += `  color: white;\n`;
                  css += `  border-color: ${theme.base.colors.success};\n`;
                } else if (variantValue === 'danger') {
                  css += `  background-color: ${theme.base.colors.danger};\n`;
                  css += `  color: white;\n`;
                  css += `  border-color: ${theme.base.colors.danger};\n`;
                } else if (variantValue === 'warning') {
                  css += `  background-color: ${theme.base.colors.warning};\n`;
                  css += `  color: #212529;\n`;
                  css += `  border-color: ${theme.base.colors.warning};\n`;
                } else if (variantValue === 'info') {
                  css += `  background-color: ${theme.base.colors.info};\n`;
                  css += `  color: white;\n`;
                  css += `  border-color: ${theme.base.colors.info};\n`;
                }
              } else if (variantName === 'size') {
                if (variantValue === 'xs') {
                  css += `  padding: 0.2rem 0.4rem;\n`;
                  css += `  font-size: ${theme.base.fontSize.xs};\n`;
                  css += `  border-radius: ${theme.base.borderRadius.sm};\n`;
                } else if (variantValue === 'sm') {
                  css += `  padding: 0.25rem 0.5rem;\n`;
                  css += `  font-size: ${theme.base.fontSize.sm};\n`;
                  css += `  border-radius: ${theme.base.borderRadius.default};\n`;
                } else if (variantValue === 'md') {
                  css += `  padding: 0.5rem 0.75rem;\n`;
                  css += `  font-size: ${theme.base.fontSize.base};\n`;
                  css += `  border-radius: ${theme.base.borderRadius.default};\n`;
                } else if (variantValue === 'lg') {
                  css += `  padding: 0.75rem 1rem;\n`;
                  css += `  font-size: ${theme.base.fontSize.lg};\n`;
                  css += `  border-radius: ${theme.base.borderRadius.default};\n`;
                } else if (variantValue === 'xl') {
                  css += `  padding: 1rem 1.5rem;\n`;
                  css += `  font-size: ${theme.base.fontSize.xl};\n`;
                  css += `  border-radius: ${theme.base.borderRadius.lg};\n`;
                }
              } else if (variantName === 'rounded') {
                if (variantValue === 'true') {
                  css += `  border-radius: ${theme.base.borderRadius.full};\n`;
                }
              } else if (variantName === 'disabled') {
                if (variantValue === 'true') {
                  css += `  opacity: 0.65;\n`;
                  css += `  cursor: not-allowed;\n`;
                  css += `  pointer-events: none;\n`;
                }
              }
            }
          } else if (componentName === 'card') {
            // 为卡片变体添加样式
            if (variantName === 'variant') {
              if (variantValue === 'default') {
                css += `  background-color: ${theme.base.colors.background};\n`;
                css += `  border: 1px solid ${theme.base.colors.border};\n`;
              } else if (variantValue === 'primary') {
                css += `  background-color: ${theme.base.colors.primary};\n`;
                css += `  color: white;\n`;
              } else if (variantValue === 'outline') {
                css += `  background-color: transparent;\n`;
                css += `  border: 1px solid ${theme.base.colors.border};\n`;
              } else if (variantValue === 'ghost') {
                css += `  background-color: transparent;\n`;
                css += `  border: none;\n`;
              }
            } else if (variantName === 'padding') {
              if (variantValue === 'none') {
                css += `  padding: 0;\n`;
              } else if (variantValue === 'sm') {
                css += `  padding: ${theme.base.spacing[2]};\n`;
              } else if (variantValue === 'md') {
                css += `  padding: ${theme.base.spacing[4]};\n`;
              } else if (variantValue === 'lg') {
                css += `  padding: ${theme.base.spacing[6]};\n`;
              }
            } else if (variantName === 'shadow') {
              if (variantValue === 'none') {
                css += `  box-shadow: none;\n`;
              } else if (variantValue === 'sm') {
                css += `  box-shadow: ${theme.base.shadows.sm};\n`;
              } else if (variantValue === 'md') {
                css += `  box-shadow: ${theme.base.shadows.md};\n`;
              } else if (variantValue === 'lg') {
                css += `  box-shadow: ${theme.base.shadows.lg};\n`;
              }
            }
          } else if (componentName === 'input') {
            // 为输入框变体添加样式
            if (variantName === 'variant') {
              if (variantValue === 'default') {
                css += `  border: 1px solid ${theme.base.colors.border};\n`;
                css += `  border-radius: ${theme.base.borderRadius.default};\n`;
              } else if (variantValue === 'outline') {
                css += `  border: 1px solid ${theme.base.colors.border};\n`;
                css += `  border-radius: ${theme.base.borderRadius.default};\n`;
                css += `  background-color: transparent;\n`;
              } else if (variantValue === 'filled') {
                css += `  border: 1px solid transparent;\n`;
                css += `  border-radius: ${theme.base.borderRadius.default};\n`;
                css += `  background-color: rgba(0, 0, 0, 0.05);\n`;
              } else if (variantValue === 'underline') {
                css += `  border: none;\n`;
                css += `  border-bottom: 1px solid ${theme.base.colors.border};\n`;
                css += `  border-radius: 0;\n`;
                css += `  background-color: transparent;\n`;
              }
            } else if (variantName === 'size') {
              if (variantValue === 'sm') {
                css += `  padding: 0.25rem 0.5rem;\n`;
                css += `  font-size: ${theme.base.fontSize.sm};\n`;
              } else if (variantValue === 'md') {
                css += `  padding: 0.5rem 0.75rem;\n`;
                css += `  font-size: ${theme.base.fontSize.base};\n`;
              } else if (variantValue === 'lg') {
                css += `  padding: 0.75rem 1rem;\n`;
                css += `  font-size: ${theme.base.fontSize.lg};\n`;
              }
            } else if (variantName === 'disabled') {
              if (variantValue === 'true') {
                css += `  opacity: 0.6;\n`;
                css += `  cursor: not-allowed;\n`;
              }
            } else if (variantName === 'error') {
              if (variantValue === 'true') {
                css += `  border-color: ${theme.base.colors.danger};\n`;
              }
            }
          }
          
          css += `}\n\n`;
        });
      });
    });
    
    // 添加悬停和焦点状态样式
    if (theme.name === 'tailwind') {
      // Tailwind 按钮悬停状态
      css += `.${prefix}-btn-primary:hover {\n`;
      css += `  background-color: #2563eb; /* 深一点的蓝色 */\n`;
      css += `}\n\n`;
      
      css += `.${prefix}-btn-secondary:hover {\n`;
      css += `  background-color: #4b5563; /* 深一点的灰色 */\n`;
      css += `}\n\n`;
      
      css += `.${prefix}-btn-outline:hover {\n`;
      css += `  background-color: rgba(0, 0, 0, 0.05);\n`;
      css += `}\n\n`;
      
      // Tailwind 按钮焦点状态
      css += `.${prefix}-btn-primary:focus {\n`;
      css += `  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);\n`;
      css += `}\n\n`;
      
      css += `.${prefix}-btn-secondary:focus {\n`;
      css += `  box-shadow: 0 0 0 2px rgba(107, 114, 128, 0.5);\n`;
      css += `}\n\n`;
      
      css += `.${prefix}-btn-outline:focus {\n`;
      css += `  box-shadow: 0 0 0 2px rgba(229, 231, 235, 0.5);\n`;
      css += `}\n\n`;
    } else if (theme.name === 'bootstrap') {
      // Bootstrap 按钮悬停状态
      css += `.${prefix}-btn-primary:hover {\n`;
      css += `  background-color: #0b5ed7; /* 深一点的蓝色 */\n`;
      css += `  border-color: #0a58ca;\n`;
      css += `}\n\n`;
      
      css += `.${prefix}-btn-secondary:hover {\n`;
      css += `  background-color: #5c636a; /* 深一点的灰色 */\n`;
      css += `  border-color: #565e64;\n`;
      css += `}\n\n`;
      
      css += `.${prefix}-btn-outline-primary:hover {\n`;
      css += `  background-color: ${theme.base.colors.primary};\n`;
      css += `  color: white;\n`;
      css += `}\n\n`;
      
      // Bootstrap 按钮焦点状态
      css += `.${prefix}-btn-primary:focus {\n`;
      css += `  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n`;
      css += `}\n\n`;
      
      css += `.${prefix}-btn-secondary:focus {\n`;
      css += `  box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.25);\n`;
      css += `}\n\n`;
      
      css += `.${prefix}-btn-outline-primary:focus {\n`;
      css += `  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n`;
      css += `}\n\n`;
    }
    
    return css;
  }
} 