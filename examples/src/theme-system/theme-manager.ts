import { Theme, ThemeManager, ThemeMode, ThemeComponents, ComponentVariant } from './types';
import { mergeThemes, addPrefix, validateTheme } from './utils';
import { ThemeComponentsRegistry } from './components';

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
   * Components registry
   */
  private componentsRegistry: ThemeComponents;
  
  /**
   * Create a new ThemeManagerImpl
   * @param prefix Optional prefix for CSS classes
   */
  constructor(prefix: string = '') {
    this.prefix = prefix;
    this.componentsRegistry = new ThemeComponentsRegistry();
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
    
    // 尝试从主题中获取组件
    let component = theme.components[componentName];
    
    // 如果在主题中找不到组件，尝试从组件注册表中获取
    if (!component) {
      try {
        const componentsRegistry = this.getComponentsManager();
        const registeredComponent = componentsRegistry.getComponent(componentName);
        component = registeredComponent.variant;
        console.log(`Found custom component: ${componentName}`, component);
      } catch (error) {
        // 如果组件不存在，返回空字符串
        console.error(`Component not found: ${componentName}`, error);
        return '';
      }
    }
    
    // 开始使用基础类名
    let classes = component.base;
    
    // 根据属性添加变体类名
    for (const [propName, propValue] of Object.entries(props)) {
      if (component.variants[propName] && component.variants[propName][propValue]) {
        classes += ` ${component.variants[propName][propValue]}`;
      }
    }
    
    // 如果指定了前缀，添加前缀
    if (this.prefix) {
      // 处理类名
      classes = classes.split(' ')
        .map(cls => {
          if (!cls || !cls.trim()) return '';
          return `${this.prefix}-${cls}`;
        })
        .filter(cls => cls)
        .join(' ');
    }
    
    return classes;
  }
  
  /**
   * Get all CSS for the current theme
   * @param prefix Optional prefix for CSS classes
   * @returns The CSS string
   */
  async getAllCSS(prefix?: string): Promise<string> {
    const currentTheme = this.getCurrentTheme();
    
    // If static source is configured, load and return its content
    if (currentTheme.base.staticSource) {
      try {
        const response = await fetch(currentTheme.base.staticSource);
        if (!response.ok) {
          throw new Error(`Failed to load CSS file: ${currentTheme.base.staticSource} (${response.status} ${response.statusText})`);
        }
        return await response.text();
      } catch (error) {
        console.error(`Error loading static CSS file: ${currentTheme.base.staticSource}`, error);
        // 如果加载失败，回退到使用组件生成的 CSS
        return this.getComponentsManager().generateAllComponentsCSS(currentTheme, prefix);
      }
    }
    
    // Otherwise, generate CSS from component definitions (existing behavior)
    return this.getComponentsManager().generateAllComponentsCSS(currentTheme, prefix);
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
        
        // 为主题中的每个组件创建组件实例
        if (themeData.components) {
          const componentsRegistry = this.getComponentsManager() as ThemeComponentsRegistry;
          
          Object.entries(themeData.components).forEach(([componentName, componentVariant]) => {
            console.log(`Registering component: ${componentName}`, componentVariant);
            const component = componentsRegistry.createComponentFromVariant(
              componentName, 
              componentVariant as ComponentVariant
            );
            componentsRegistry.registerComponent(component);
          });
        }
      } else {
        console.warn(`Invalid theme data: ${JSON.stringify(themeData)}`);
      }
    }
  }
  
  /**
   * Get the theme components manager
   * @returns The theme components manager
   */
  getComponentsManager(): ThemeComponents {
    return this.componentsRegistry;
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
   * Load static CSS content from a file
   * @param filePath Path to the CSS file
   * @returns The CSS content as a string
   */
  async loadStaticCSS(filePath: string): Promise<string> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load CSS file: ${filePath} (${response.status} ${response.statusText})`);
      }
      return await response.text();
    } catch (error) {
      console.error(`Error loading static CSS file: ${filePath}`, error);
      return '';
    }
  }
} 