// Test script to verify that extractShortcodeNames is available in the built package
const { Shortcode } = require('../../dist/index.js');

// Create a new instance
const sc = new Shortcode();

// Check if the method exists
console.log('extractShortcodeNames method type:', typeof sc.extractShortcodeNames);

// Test extracting shortcode names from content
try {
  // Simple case with one shortcode
  const simpleContent = 'Content with {{< shortcode param="value" >}} embedded.';
  console.log('Simple extraction result:', sc.extractShortcodeNames(simpleContent));
  
  // Multiple different shortcodes
  const multipleContent = `
    Content with {{< first-shortcode />}} multiple
    {{< second-shortcode >}} shortcodes.
  `;
  console.log('Multiple extraction result:', sc.extractShortcodeNames(multipleContent));
  
  // Nested shortcodes
  const nestedContent = `
    {{< outer-shortcode >}}
      Content with {{< inner-shortcode />}} inside.
    {{< /outer-shortcode >}}
  `;
  console.log('Nested extraction result:', sc.extractShortcodeNames(nestedContent));
  
} catch (error) {
  console.error('Error using extractShortcodeNames:', error);
} 