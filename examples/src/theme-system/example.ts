import { ThemeManagerImpl, ButtonComponent, CardComponent, InputComponent, Theme, ThemeMode, ThemeBase } from './index';

// Create a tailwind-like theme
const tailwindTheme: Theme = {
  name: 'tailwind',
  mode: 'light',
  base: {
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937',
      border: '#e5e7eb'
    },
    spacing: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '64': '16rem'
    },
    typography: {
      fontFamily: {
        sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2'
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
      }
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },
    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none'
    },
    transitions: {
      default: 'all 0.2s ease-in-out',
      fast: 'all 0.1s ease-in-out',
      slow: 'all 0.3s ease-in-out'
    }
  },
  components: {
    button: {
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
          true: 'btn-rounded'
        },
        disabled: {
          true: 'btn-disabled'
        }
      }
    },
    card: {
      base: 'card',
      variants: {
        variant: {
          default: 'card-default',
          primary: 'card-primary',
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
    },
    input: {
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
          true: 'input-disabled'
        },
        error: {
          true: 'input-error'
        }
      }
    }
  }
};

// Create a bootstrap-like theme that inherits from tailwind
const bootstrapTheme: Omit<Theme, 'base'> & { base: Partial<ThemeBase> } = {
  name: 'bootstrap',
  mode: 'light',
  parent: 'tailwind', // Inherit from tailwind
  base: {
    colors: {
      primary: '#0d6efd',
      secondary: '#6c757d',
      success: '#198754',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#0dcaf0',
      background: '#ffffff',
      text: '#212529',
      border: '#dee2e6'
    },
    borderRadius: {
      default: '0.375rem',
      sm: '0.25rem',
      lg: '0.5rem'
    },
    shadows: {
      default: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
      sm: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
      lg: '0 1rem 3rem rgba(0, 0, 0, 0.175)'
    }
  },
  components: {
    button: {
      base: 'btn',
      variants: {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
          outline: 'btn-outline-primary',
          ghost: 'btn-link'
        }
      }
    }
  }
};

// Create a dark mode version of tailwind
const tailwindDarkTheme: Omit<Theme, 'base'> & { base: Partial<ThemeBase> } = {
  name: 'tailwind',
  mode: 'dark',
  parent: 'tailwind', // Inherit from light mode
  base: {
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      background: '#1f2937',
      text: '#f9fafb',
      border: '#374151'
    }
  },
  components: {}
};

// Example usage
function example() {
  // Create a theme manager with a prefix
  const themeManager = new ThemeManagerImpl('ui');
  
  // Register themes
  themeManager.register(tailwindTheme);
  themeManager.register(bootstrapTheme as Theme);
  themeManager.register(tailwindDarkTheme as Theme);
  
  // Set current theme
  themeManager.setCurrentTheme('tailwind', 'light');
  
  // Get component classes
  const buttonClasses = themeManager.getComponentClasses('button', {
    variant: 'primary',
    size: 'md',
    rounded: 'true'
  });
  console.log('Button classes:', buttonClasses);
  
  // Get all CSS
  const css = themeManager.getAllCSS();
  console.log('CSS:', css.substring(0, 500) + '...');
  
  // Switch to dark mode
  themeManager.setCurrentTheme('tailwind', 'dark');
  
  // Get component classes in dark mode
  const darkButtonClasses = themeManager.getComponentClasses('button', {
    variant: 'primary',
    size: 'md',
    rounded: 'true'
  });
  console.log('Dark mode button classes:', darkButtonClasses);
  
  // Get components manager
  const componentsManager = themeManager.getComponentsManager();
  
  // Get a specific component
  const buttonComponent = componentsManager.getComponent('button');
  console.log('Button component:', buttonComponent.name);
  
  // Create a custom button component
  const customButtonVariant = {
    base: 'custom-btn',
    variants: {
      variant: {
        primary: 'custom-btn-primary',
        secondary: 'custom-btn-secondary'
      },
      size: {
        sm: 'custom-btn-sm',
        md: 'custom-btn-md',
        lg: 'custom-btn-lg'
      }
    }
  };
  
  // Create and register the custom button component
  const customButton = new ButtonComponent(customButtonVariant, 'button');
  componentsManager.registerComponent(customButton);
  
  // Generate CSS for the custom button
  const customButtonCSS = customButton.generateCSS(themeManager.getCurrentTheme(), 'ui');
  console.log('Custom button CSS:', customButtonCSS.substring(0, 500) + '...');
}

// Run the example
example(); 