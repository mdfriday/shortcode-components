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
      css += `  /* Base styles for ${componentName} */\n`;
      css += `}\n\n`;
      
      // Variant classes
      Object.entries(component.variants).forEach(([variantName, variants]) => {
        Object.entries(variants).forEach(([variantValue, className]) => {
          const variantClass = prefix ? `${prefix}-${className}` : className;
          css += `.${variantClass} {\n`;
          css += `  /* Styles for ${componentName} ${variantName}=${variantValue} */\n`;
          css += `}\n\n`;
        });
      });
    });
    
    return css;
  }
} 