# Dynamic Shortcode Management

This document explains the dynamic shortcode registration and rendering system, which allows users to register shortcodes on-demand rather than loading all shortcodes upfront.

## Key Features

1. **Dynamic Registration**: Register shortcodes only when needed
2. **Metadata Management**: Store and retrieve metadata about registered shortcodes
3. **Step Rendering**: Support for multi-step rendering to integrate with markdown processors
4. **Caching**: Performance optimization with rendering cache

## Components

The system consists of several components:

1. `Shortcode` - Main class that provides all functionality
2. `ShortcodeManager` - Handles registration and management of shortcodes
3. `ShortcodeCache` - Optimizes performance through caching

## Metadata Structure

When registering a shortcode, you need to provide metadata with the following structure:

```typescript
interface ShortcodeMetadata {
  id: string | number;     // Unique identifier (required)
  name: string;            // Shortcode name (required)
  template: string;        // Template content (required)
  uuid?: string;           // Universal unique identifier
  slug?: string;           // URL-friendly shortcode name
  example?: string;        // Example usage
  asset?: string;          // Associated asset (e.g., preview image)
  tags?: string[];         // Tags for categorization
  width?: number;          // Width of preview
  height?: number;         // Height of preview
  timestamp?: number;      // Creation timestamp
  updated?: number;        // Last update timestamp
  status?: string;         // Status (e.g., "public", "draft")
  namespace?: string;      // Namespace
  hash?: string;           // Content hash
}
```

## Usage Examples

### Creating a Shortcode Instance

```typescript
import { Shortcode } from '@mdfriday/shortcode';

// Create a new Shortcode instance with a cache size of 100 items (default)
const shortcode = new Shortcode();

// Or specify a custom cache size
const shortcodeWithCustomCache = new Shortcode(50);
```

### Registering a Shortcode

```typescript
// Shortcode metadata
const cardBannerMetadata = {
  id: 1,
  name: "cardBanner",
  template: `<div class="card-banner">{{ .Get "title" }}</div>`,
  // Optional fields
  uuid: "98b64ab7-27a4-48d6-9083-da9ae9af093c",
  tags: ["banner", "card"]
};

// Optional: Custom function map
const customFuncMap = new Map<string, (...args: any[]) => any>([
  ['split', (str: string, sep: string) => str.split(sep)]
]);

// Optional: Custom data provider
const customDataProvider = (params: string[], content?: string) => {
  return {
    content,
    // Additional data processing
  };
};

// Register the shortcode
const registered = shortcode.registerShortcode(cardBannerMetadata, {
  funcMap: customFuncMap,
  dataProvider: customDataProvider
});

console.log(`Registration ${registered ? 'successful' : 'failed'}`);
```

### Checking if a Shortcode Exists

```typescript
// Check by ID
if (shortcode.existsById(1)) {
  console.log('Shortcode exists');
}
```

### Finding Shortcodes

```typescript
// Find by name
const byName = shortcode.findByName('cardBanner');

// Find by UUID
const byUuid = shortcode.findByUuid('98b64ab7-27a4-48d6-9083-da9ae9af093c');

// Find by ID
const byId = shortcode.findById(1);

// Get all shortcodes
const allShortcodes = shortcode.getAllShortcodes();
```

### Rendering Content

#### Direct Rendering

```typescript
const markdownContent = `# Title
{{< cardBanner title="My Banner" />}}`;

// Render the content
const rendered = shortcode.render(markdownContent);
```

#### Step Rendering (for integration with markdown processors)

```typescript
// Step 1: Replace shortcodes with placeholders
const stepOneResult = shortcode.stepRender(markdownContent);

// Step 2: Process with your markdown renderer
const htmlContent = yourMarkdownRenderer(stepOneResult);

// Step 3: Final rendering - replace placeholders with rendered shortcodes
const finalResult = shortcode.finalRender(htmlContent);
```

### Cache Management

```typescript
// Clear the rendering cache
shortcode.clearCache();
```

## Performance Optimization

The system includes caching to optimize performance:

1. Renders are cached based on content hash
2. Step renders are cached separately
3. Cache uses LRU (Least Recently Used) strategy
4. Cache size is configurable

## Integration Example

```typescript
import { Shortcode } from '@mdfriday/shortcode';
import markdownIt from 'markdown-it';

// Create instances
const shortcode = new Shortcode();
const md = markdownIt();

// Register your shortcodes
// ...

// Create a rendering function
function renderMarkdown(content) {
  // Step 1: Replace shortcodes with placeholders
  const withPlaceholders = shortcode.stepRender(content);
  
  // Step 2: Process with markdown renderer
  const htmlContent = md.render(withPlaceholders);
  
  // Step 3: Final rendering
  return shortcode.finalRender(htmlContent);
}

// Use the function
const result = renderMarkdown('# Hello\n{{< myShortcode >}}content{{< /myShortcode >}}');
```

## Default Function Map

The system provides a default function map that includes:

- `split(str, separator)` - Splits a string by a separator 