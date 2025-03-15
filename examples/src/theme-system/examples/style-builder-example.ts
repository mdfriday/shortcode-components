import { ThemeManagerImpl } from '../theme-manager';
import { StyleBuilderRegistry } from '../style-builder';
import { Theme } from '../types';

// Example theme
const bootstrapTheme: Theme = {
  name: 'bootstrap',
  mode: 'light',
  base: {
    colors: {
      primary: '#0d6efd',
      secondary: '#6c757d',
      success: '#198754',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#0dcaf0',
      light: '#f8f9fa',
      dark: '#212529'
    },
    spacing: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '1rem',
      '4': '1.5rem',
      '5': '3rem'
    },
    typography: {
      fontFamily: {
        sans: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        serif: 'Georgia, "Times New Roman", serif',
        mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75'
      },
      letterSpacing: {
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em'
      }
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    transitions: {
      DEFAULT: 'all 0.15s ease-in-out',
      colors: 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out',
      opacity: 'opacity 0.15s ease-in-out',
      shadow: 'box-shadow 0.15s ease-in-out'
    },
    opacity: {
      '0': '0',
      '25': '0.25',
      '50': '0.5',
      '75': '0.75',
      '100': '1'
    }
  },
  components: {
    button: {
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
          link: 'btn-link'
        },
        size: {
          sm: 'btn-sm',
          md: '',
          lg: 'btn-lg'
        },
        outline: {
          true: 'btn-outline'
        }
      }
    }
  }
};

// Example usage
function example() {
  // Create a theme manager
  const themeManager = new ThemeManagerImpl();
  
  // Register the theme
  themeManager.register(bootstrapTheme);
  
  // Set the current theme
  themeManager.setCurrentTheme('bootstrap', 'light');
  
  // Get component classes using the new style builder system
  const buttonClasses = themeManager.getComponentClasses('button', {
    variant: 'primary',
    size: 'lg',
    rounded: true,
    shadow: 'md',
    display: 'flex',
    textAlign: 'center',
    fontWeight: 'bold',
    hover: {
      backgroundColor: 'secondary'
    },
    disabled: false
  });
  
  console.log('Button classes:', buttonClasses);
  
  // Example of using the style builder directly
  const theme = themeManager.getCurrentTheme();
  const factory = StyleBuilderRegistry.getFactory('bootstrap', theme);
  const builder = factory.createBuilder();
  
  const customClasses = builder
    .style({
      variant: 'success',
      size: 'sm',
      rounded: true,
      shadow: 'sm'
    })
    .layout({
      display: 'flex',
      gap: 2,
      padding: 3
    })
    .typography({
      fontWeight: 'bold',
      textAlign: 'center'
    })
    .interactive({
      cursor: 'pointer',
      hover: {
        backgroundColor: 'primary'
      }
    })
    .build();
  
  console.log('Custom classes:', customClasses);
}

// Run the example
example(); 