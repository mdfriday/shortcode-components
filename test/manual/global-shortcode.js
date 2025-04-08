// Test script to verify that extractShortcodeNames is available in the global shortcode variable
const pkg = require('../../dist/index.js');

// Simulate a global instance like in the error case
const globalShortcode = new pkg.Shortcode();

// Check if the method exists
console.log('Global - extractShortcodeNames method type:', typeof globalShortcode.extractShortcodeNames);

// Test extracting shortcode names from content
try {
  // Simple case with one shortcode
  const simpleContent = 'Content with {{< shortcode param="value" >}} embedded.';
  console.log('Global - Simple extraction result:', globalShortcode.extractShortcodeNames(simpleContent));
  
  // Multiple different shortcodes
  const multipleContent = `
    Content with {{< first-shortcode />}} multiple
    {{< second-shortcode >}} shortcodes.
  `;
  console.log('Global - Multiple extraction result:', globalShortcode.extractShortcodeNames(multipleContent));
  
  // Nested shortcodes
  const nestedContent = `
    {{< outer-shortcode >}}
      Content with {{< inner-shortcode />}} inside.
    {{< /outer-shortcode >}}
  `;
  console.log('Global - Nested extraction result:', globalShortcode.extractShortcodeNames(nestedContent));
  
} catch (error) {
  console.error('Global - Error using extractShortcodeNames:', error);
  console.error(error.stack);
} 