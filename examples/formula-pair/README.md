# Formula Pair Example

This example demonstrates how to use the shortcode services to register and render Formula Pair components.

## Overview

This example showcases:
1. How to register custom shortcodes using the `registerShortcode` method
2. How to use the two-step rendering process with `stepRender` and `finalRender`
3. How to render a markdown document containing Formula Pair shortcodes

## Files

- `index.js`: Main script that registers shortcodes and renders the markdown
- `output.html`: Generated HTML output after running the script
- `viewer.html`: A simple HTML page to view the rendered output in a browser

## Running the Example

1. Make sure you have built the main library first:
   ```
   cd ../../
   npm run build
   ```

2. Run the example:
   ```
   cd examples/formula-pair
   node index.js
   ```

3. View the result:
   - Check the console output for the rendered HTML
   - Open `output.html` to see the raw HTML file
   - Open `viewer.html` in a browser to see the rendered result with proper styling

## Shortcodes Used

This example uses three shortcodes:

1. **mdfFormulaPair**: The main container component
2. **mdfFormulaPairCard**: Component for a formula card section
3. **mdfFormulaPairExample**: Component for individual formula examples

These shortcodes are registered using the `registerShortcode` method from the Shortcode class. 