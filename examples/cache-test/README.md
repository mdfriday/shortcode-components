# Shortcode Cache Test

This example demonstrates a caching issue where changes to shortcode attributes don't trigger re-rendering.

## The Issue

When using the shortcode library, the following workflow doesn't correctly update the rendered content:

1. Render a shortcode with certain attributes
2. Modify an attribute of the shortcode
3. Render again - the content doesn't update because it's served from cache

This happens because the caching mechanism only considers the markdown content text and not the parsed shortcode attributes.

## Example Contents

The example demonstrates the issue and provides two solutions:

1. **Manual Cache Clear**: Simply calling `clearCache()` before rendering after attribute changes
2. **Enhanced Implementation**: Modifying the Shortcode class to incorporate attribute information into cache keys

## Files

- `index.ts`: Main test file that demonstrates the issue and solutions
- `shortcode-fix.ts`: Enhanced Shortcode class that fixes the caching issue
- `fixed-shortcode-cache.ts`: Direct fix to the ShortcodeCache class for the core library

## Running the Example

```bash
# Install dependencies
npm install

# Build the TypeScript files
npm run build

# Run the example
npm start
```

This will generate an HTML file `cache-test-output.html` that shows the issue and the fixed implementations.

## Solution Details

The key to fixing the issue is to ensure the cache key generation takes into account shortcode attributes, not just the raw markdown text. The `EnhancedShortcode` class in `shortcode-fix.ts` achieves this by:

1. Parsing the markdown to extract all shortcode instances and their attributes
2. Including these attributes in the cache key generation
3. Using these enhanced keys for both `stepRender` and `finalRender` operations

This ensures that any change to a shortcode attribute will result in a cache miss and force re-rendering. 