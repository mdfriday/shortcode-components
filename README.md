# Theme Management System

A flexible and extensible theme management system for Obsidian notes, allowing users to apply different themes to their components and preview the rendered effects in real-time.

## Features

- **Multiple Themes**: Register and manage multiple themes
- **Theme Modes**: Support for light and dark modes
- **Theme Extension**: Extend existing themes to create new ones
- **Component Variants**: Define different variants of components based on props
- **CSS Generation**: Generate complete CSS for themes
- **Style Isolation**: Add prefixes to CSS classes for style isolation
- **JSON Loading**: Load themes from JSON files

## Installation

```bash
npm install theme-management-system
```

## Usage

### Basic Usage

```typescript
import { ThemeManagerImpl } from 'theme-management-system';

// Create a theme manager with a prefix for CSS classes
const themeManager = new ThemeManagerImpl('obs-theme');

// Register a theme
themeManager.register({
  name: 'my-theme',
  mode: 'light',
  base: {
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      // ...
    },
    // ...
  },
  components: {
    button: {
      base: 'btn',
      variants: {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
          // ...
        },
        // ...
      }
    },
    // ...
  }
});

// Set the current theme
themeManager.setCurrentTheme('my-theme', 'light');

// Get component classes
const buttonClasses = themeManager.getComponentClasses('button', {
  variant: 'primary',
  size: 'md'
});

// Get all CSS for the current theme
const css = themeManager.getAllCSS();
```

### Loading Themes from JSON

```typescript
import { ThemeManagerImpl } from 'theme-management-system';
import themesJson from './themes.json';

const themeManager = new ThemeManagerImpl('obs-theme');
themeManager.preloadThemes(themesJson);
```

### Theme Extension

```typescript
// Base theme
themeManager.register({
  name: 'base',
  mode: 'light',
  base: { /* ... */ },
  components: { /* ... */ }
});

// Extended theme
themeManager.register({
  name: 'extended',
  mode: 'light',
  parent: 'base', // Extend the base theme
  base: {
    // Override or add to base theme
    colors: {
      primary: '#0d6efd'
    }
  },
  components: {
    // Override or add to base theme components
    button: {
      base: 'custom-btn',
      variants: {
        // ...
      }
    }
  }
});
```

### Parsing Shortcodes

```typescript
function parseShortcode(shortcode: string) {
  // Example shortcode: {{< button variant="primary" theme="tailwind" >}}
  const match = shortcode.match(/{{< (\w+) (.+) >}}/);
  
  if (!match) return null;
  
  const [, componentName, propsString] = match;
  const props = {};
  
  // Parse props
  const propMatches = propsString.matchAll(/(\w+)="([^"]+)"/g);
  for (const propMatch of propMatches) {
    const [, propName, propValue] = propMatch;
    props[propName] = propValue;
  }
  
  // Extract theme and mode
  const theme = props.theme || 'default';
  const mode = props.mode || 'light';
  
  // Set the theme
  themeManager.setCurrentTheme(theme, mode);
  
  // Get the classes
  const classes = themeManager.getComponentClasses(componentName, props);
  
  // Return the HTML
  return `<${componentName} class="${classes}">${props.text || ''}</${componentName}>`;
}
```

## API Reference

### ThemeManager

The main interface for managing themes.

#### Methods

- `register(theme: Theme): void` - Register a new theme
- `getTheme(name: string, mode: ThemeMode): Theme` - Get a theme by name and mode
- `getCurrentTheme(): Theme` - Get the current theme
- `setCurrentTheme(name: string, mode: ThemeMode): void` - Set the current theme
- `getComponentClasses(componentName: string, props: Record<string, any>): string` - Get component classes based on props
- `getAllCSS(prefix?: string): string` - Get all CSS for the current theme
- `preloadThemes(themesJson: any): void` - Preload themes from JSON

### Theme Structure

```typescript
interface Theme {
  name: string;
  mode: 'light' | 'dark';
  base: {
    colors: Record<string, string>;
    spacing: Record<string, string>;
    typography: {
      fontFamily: Record<string, string>;
      lineHeight: Record<string, string | number>;
      letterSpacing: Record<string, string>;
    };
    fontSize: Record<string, string>;
    fontWeight: Record<string, number | string>;
    borderRadius: Record<string, string>;
    shadows: Record<string, string>;
    transitions: Record<string, string>;
  };
  components: {
    [componentName: string]: {
      base: string;
      variants: {
        [propName: string]: {
          [propValue: string]: string;
        };
      };
    };
  };
  parent?: string;
}
```

## License

MIT
