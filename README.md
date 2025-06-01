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

## Usage

This package provides a flexible shortcode system that allows you to register and render custom shortcodes in Markdown content.

### CommonJS Usage (Node.js)

```javascript
// CommonJS (require) - RECOMMENDED WAY
const pkg = require('@mdfriday/shortcode');
const { Shortcode } = pkg;

// Create a new Shortcode instance
const shortcode = new Shortcode();

// Register a shortcode
shortcode.registerShortcode({
  id: 1,
  name: 'alert',
  template: '<div class="alert alert-{{.type}}">{{.customize}}</div>',
  uuid: 'alert-shortcode'
});

// Render markdown customize with shortcodes
const markdown = 'Normal text {{< alert type="danger" >}}This is an alert{{< /alert >}}';
const html = shortcode.render(markdown);
```

### ES Modules Usage

```javascript
// ES Modules (import) - RECOMMENDED WAY
import pkg from '@mdfriday/shortcode';
const { Shortcode } = pkg;

// Create a new Shortcode instance
const shortcode = new Shortcode();

// Register a shortcode
shortcode.registerShortcode({
  id: 2,
  name: 'button',
  template: '<button class="btn btn-{{.type}}">{{.customize}}</button>',
  uuid: 'button-shortcode'
});

// Render markdown customize with shortcodes
const markdown = 'Normal text {{< button type="primary" >}}Click me{{< /button >}}';
const html = shortcode.render(markdown);
```

## Important Note About Imports

Due to how the package is built, always use the imports as shown above. Direct named imports (e.g., `import { Shortcode } from '@mdfriday/shortcode'`) might not work in all environments.

## Shortcode Metadata

When registering a shortcode, you should provide metadata:

```javascript
shortcode.registerShortcode({
  id: "unique-id", // Required: string or number
  name: "shortcode-name", // Required: the name used in markdown {{< shortcode-name >}}
  template: "Template with {{.customize}} and {{.params}}", // Required: the template to render
  uuid: "optional-uuid", // Optional: a UUID for the shortcode
  tags: ["optional", "tags"], // Optional: tags for categorization
  // Other optional fields: slug, example, asset, width, height, etc.
});
```

## Advanced Usage

### Custom Functions and Data Providers

```javascript
// Register a shortcode with customize functions and data provider
shortcode.registerShortcode(
  {
    id: 3,
    name: 'list',
    template: '{{range .items}}<li>{{.}}</li>{{end}}',
    uuid: 'list-shortcode'
  },
  {
    // Custom function map (optional)
    funcMap: new Map([
      ['uppercase', (str) => str.toUpperCase()],
      // Add more customize functions...
    ]),
    
    // Custom data provider (optional)
    dataProvider: (params, content) => {
      return {
        content,
        items: content ? content.split(',').map(item => item.trim()) : [],
        // Add more data based on params...
      };
    }
  }
);
```

## API Reference

### Shortcode Class

- `new Shortcode(cacheSizeLimit?: number)` - Create a new Shortcode instance with optional cache size limit
- `registerShortcode(metadata, options?)` - Register a new shortcode
- `render(markdownContent)` - Render markdown content with shortcodes
- `existsById(id)` - Check if a shortcode exists by ID
- `findByName(name)` - Find a shortcode by name
- `findByUuid(uuid)` - Find a shortcode by UUID
- `findById(id)` - Find a shortcode by ID
- `getAllShortcodes()` - Get all registered shortcodes
- `clearCache()` - Clear the rendering cache

## License

This project is licensed under the MIT License - see the LICENSE file for details.
