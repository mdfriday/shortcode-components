# @mdfriday/shortcode

A flexible component-based shortcode system for Markdown content with theme support.

[![npm version](https://img.shields.io/npm/v/@mdfriday/shortcode.svg)](https://www.npmjs.com/package/@mdfriday/shortcode)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Introduction

`@mdfriday/shortcode` provides a powerful shortcode system that allows you to embed rich, themeable components in your Markdown content. It uses a simple and intuitive syntax while offering extensive customization through themes and component variants.

## Features

- **Simple Shortcode Syntax**: Easily embed components using a familiar `{{< component attr="value" >}}` syntax
- **Themeable Components**: Define and apply different themes to your components
- **Component Variants**: Create multiple variants of components with different styles
- **Light/Dark Mode Support**: Built-in support for light and dark mode themes
- **Extensible Architecture**: Easily add new components and extend existing ones

## Installation

```bash
npm install @mdfriday/shortcode
# or
yarn add @mdfriday/shortcode
```

## Basic Usage

```javascript
import { ShortcodeRenderer, ThemeManager } from '@mdfriday/shortcode';

// Create a theme manager
const themeManager = new ThemeManager();

// Create a shortcode renderer with the theme manager
const renderer = new ShortcodeRenderer(themeManager);

// Register a theme
themeManager.register({
  name: 'default',
  mode: 'light',
  components: {
    button: {
      base: 'btn',
      variants: {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary'
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg'
        }
      }
    }
  }
});

// Render content with shortcodes
const content = `
# My Document

{{< button variant="primary" size="lg" >}}Click Me{{< /button >}}
`;

const rendered = renderer.render(content);
console.log(rendered);
// Output: <h1>My Document</h1><button class="btn btn-primary btn-lg">Click Me</button>
```

## Available Components

The package comes with several built-in components:

- `button` - A customizable button component
- `callout` - For highlighting important information
- `card` - A versatile card container
- `tabs` - Tabbed interface for organizing content
- `code` - Code blocks with syntax highlighting

You can also create your own custom components.

## Theming

Themes are defined as JavaScript objects with component variants:

```javascript
const myTheme = {
  name: 'custom',
  mode: 'light',
  components: {
    button: {
      base: 'my-btn',
      variants: {
        variant: {
          primary: 'my-btn-primary',
          secondary: 'my-btn-secondary'
        }
      }
    },
    // Define other components...
  }
};

themeManager.register(myTheme);
```

## Advanced Usage

See our [documentation website](https://mdfriday.github.io/docs) for more advanced usage examples including:

- Creating custom components
- Theme inheritance
- Implementing responsive designs
- Using with React, Vue, or other frameworks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
