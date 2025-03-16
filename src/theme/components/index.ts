import { ComponentVariant, ComponentsRegistry, Theme, ThemeComponent, ThemeComponents } from '../types';
import { BaseComponent } from './base-component';
import { ButtonComponent } from './button';
import { CardComponent } from './card';
import { InputComponent } from './input';

/**
 * Components registry implementation
 */
export class ThemeComponentsRegistry implements ThemeComponents {
  /**
   * Map of components, keyed by name
   */
  private components: ComponentsRegistry = {};
  
  /**
   * Create a new ThemeComponentsRegistry
   */
  constructor() {
    // Register default components
    this.registerDefaultComponents();
  }
  
  /**
   * Register a component
   * @param component The component to register
   */
  registerComponent(component: ThemeComponent): void {
    this.components[component.name] = component;
  }
  
  /**
   * Get a component by name
   * @param name The component name
   * @returns The component
   */
  getComponent(name: string): ThemeComponent {
    const component = this.components[name];
    
    if (!component) {
      throw new Error(`Component ${name} not found`);
    }
    
    return component;
  }
  
  /**
   * Get all components
   * @returns All components
   */
  getAllComponents(): ThemeComponent[] {
    return Object.values(this.components);
  }
  
  /**
   * Generate CSS for all components
   * @param theme The theme
   * @param prefix Optional prefix for CSS classes
   * @returns The CSS string
   */
  generateAllComponentsCSS(theme: Theme, prefix?: string): string {
    let css = '';
    
    // Generate CSS for each component
    for (const component of this.getAllComponents()) {
      const componentCSS = component.generateCSS(theme, prefix);
      
      // 只添加非空的 CSS
      if (componentCSS.trim() !== '') {
        css += componentCSS;
      }
    }
    
    return css;
  }
  
  /**
   * Register default components
   */
  private registerDefaultComponents(): void {
    // Create default variants for components with proper base class names
    const buttonVariant: ComponentVariant = {
      base: 'btn',
      variants: {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
          outline: 'btn-outline',
          ghost: 'btn-ghost',
          success: 'btn-success',
          danger: 'btn-danger',
          warning: 'btn-warning',
          info: 'btn-info'
        },
        size: {
          xs: 'btn-xs',
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
          xl: 'btn-xl'
        },
        rounded: {
          'true': 'btn-rounded',
          'false': ''
        },
        disabled: {
          'true': 'btn-disabled',
          'false': ''
        }
      }
    };
    
    const cardVariant: ComponentVariant = {
      base: 'card',
      variants: {
        variant: {
          default: 'card-default',
          primary: 'card-primary',
          secondary: 'card-secondary',
          outline: 'card-outline',
          ghost: 'card-ghost'
        },
        padding: {
          none: 'card-padding-none',
          sm: 'card-padding-sm',
          md: 'card-padding-md',
          lg: 'card-padding-lg'
        },
        shadow: {
          none: 'card-shadow-none',
          sm: 'card-shadow-sm',
          md: 'card-shadow-md',
          lg: 'card-shadow-lg'
        }
      }
    };
    
    const inputVariant: ComponentVariant = {
      base: 'input',
      variants: {
        variant: {
          default: 'input-default',
          outline: 'input-outline',
          filled: 'input-filled',
          underline: 'input-underline'
        },
        size: {
          sm: 'input-sm',
          md: 'input-md',
          lg: 'input-lg'
        },
        disabled: {
          'true': 'input-disabled',
          'false': ''
        },
        error: {
          'true': 'input-error',
          'false': ''
        }
      }
    };
    
    // Register default components
    this.registerComponent(new ButtonComponent(buttonVariant));
    this.registerComponent(new CardComponent(cardVariant));
    this.registerComponent(new InputComponent(inputVariant));
  }
  
  /**
   * Create a component from a theme component variant
   * @param name The component name
   * @param variant The component variant
   * @returns The component
   */
  createComponentFromVariant(name: string, variant: ComponentVariant): ThemeComponent {
    switch (name) {
      case 'button':
        return new ButtonComponent(variant);
      case 'card':
        return new CardComponent(variant);
      case 'input':
        return new InputComponent(variant);
      default:
        // Use base component for unknown components
        return new BaseComponent(name, variant);
    }
  }
}

// Export all components
export { BaseComponent } from './base-component';
export { ButtonComponent } from './button';
export { CardComponent } from './card';
export { InputComponent } from './input'; 