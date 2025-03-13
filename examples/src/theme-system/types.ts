/**
 * Theme mode type - light or dark
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Base theme elements interface
 * Contains all the basic style elements like colors, spacing, typography, etc.
 */
export interface ThemeBase {
  /**
   * Color palette
   */
  colors: Record<string, string>;
  
  /**
   * Spacing scale
   */
  spacing: Record<string, string>;
  
  /**
   * Typography settings
   */
  typography: {
    fontFamily: Record<string, string>;
    lineHeight: Record<string, string | number>;
    letterSpacing: Record<string, string>;
  };
  
  /**
   * Font size scale
   */
  fontSize: Record<string, string>;
  
  /**
   * Font weight scale
   */
  fontWeight: Record<string, number | string>;
  
  /**
   * Border radius scale
   */
  borderRadius: Record<string, string>;
  
  /**
   * Shadow definitions
   */
  shadows: Record<string, string>;
  
  /**
   * Transition definitions
   */
  transitions: Record<string, string>;
}

/**
 * Component variant interface
 * Defines how a component can have different variants based on props
 */
export interface ComponentVariant {
  /**
   * Base class name for the component
   */
  base: string;
  
  /**
   * Variants for the component
   * Key is the prop name, value is a map of prop value to class name
   */
  variants: Record<string, Record<string, string>>;
}

/**
 * Components interface
 * Maps component names to their variant definitions
 */
export interface Components {
  [componentName: string]: ComponentVariant;
}

/**
 * Theme interface
 * Defines the structure of a theme
 */
export interface Theme {
  /**
   * Theme name
   */
  name: string;
  
  /**
   * Theme mode (light or dark)
   */
  mode: ThemeMode;
  
  /**
   * Base styles
   */
  base: ThemeBase;
  
  /**
   * Component styles
   */
  components: Components;
  
  /**
   * Parent theme name (for theme extension)
   */
  parent?: string;
}

/**
 * Theme manager interface
 * Defines the methods for managing themes
 */
export interface ThemeManager {
  /**
   * Register a new theme
   * @param theme The theme to register
   */
  register(theme: Theme): void;
  
  /**
   * Get a theme by name and mode
   * @param name The theme name
   * @param mode The theme mode
   * @returns The theme
   */
  getTheme(name: string, mode: ThemeMode): Theme;
  
  /**
   * Get the current theme
   * @returns The current theme
   */
  getCurrentTheme(): Theme;
  
  /**
   * Set the current theme
   * @param name The theme name
   * @param mode The theme mode
   */
  setCurrentTheme(name: string, mode: ThemeMode): void;
  
  /**
   * Get component classes based on props
   * @param componentName The component name
   * @param props The component props
   * @returns The component classes
   */
  getComponentClasses(componentName: string, props: Record<string, any>): string;
  
  /**
   * Get all CSS for the current theme
   * @param prefix Optional prefix for CSS classes
   * @returns The CSS string
   */
  getAllCSS(prefix?: string): string;
  
  /**
   * Preload themes from JSON
   * @param themesJson The themes JSON
   */
  preloadThemes(themesJson: any): void;
} 