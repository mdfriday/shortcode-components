// ESM test for extractShortcodeNames method
import pkg from '../../dist/index.js';
const { Shortcode } = pkg;

// Create a new instance
const sc = new Shortcode();

// Check if the method exists
console.log('ESM - extractShortcodeNames method type:', typeof sc.extractShortcodeNames);

// Test extracting shortcode names from content
try {
  // Simple case with one shortcode
  const simpleContent = 'Content with {{< shortcode param="value" >}} embedded.';
  console.log('ESM - Simple extraction result:', sc.extractShortcodeNames(simpleContent));
  
  // Multiple different shortcodes
  const multipleContent = `
    Content with {{< first-shortcode />}} multiple
    {{< second-shortcode >}} shortcodes.
  `;
  console.log('ESM - Multiple extraction result:', sc.extractShortcodeNames(multipleContent));
  
  // Nested shortcodes
  const nestedContent = `
    {{< outer-shortcode >}}
      Content with {{< inner-shortcode />}} inside.
    {{< /outer-shortcode >}}
  `;
  console.log('ESM - Nested extraction result:', sc.extractShortcodeNames(nestedContent));
  
} catch (error) {
  console.error('ESM - Error using extractShortcodeNames:', error);
} 