// Cache Test Example - Tests shortcode attribute update caching issue
import { Shortcode } from '../../src/shortcode';
import * as fs from 'fs';
import * as path from 'path';

// Create a simple card shortcode template that displays a title and description
const cardShortcodeTemplate = `
<div class="card" style="border: 1px solid #ddd; border-radius: 4px; padding: 16px; margin: 16px 0; max-width: 400px;">
  <div class="card-header" style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: {{ .Get "titleColor" }};">
    {{ .Get "title" }}
  </div>
  <div class="card-body" style="font-size: 14px; color: #333;">
    {{ .Inner }}
  </div>
</div>
`;

// Main function to test the cache issue
function testCacheIssue() {
  console.log('Starting cache test...');

  // Initialize the Shortcode instance
  const shortcode = new Shortcode();

  // Register our test shortcode
  shortcode.registerShortcode(
    {
      name: 'testCard',
      id: 'testCard',
      uuid: 'test-card',
      template: cardShortcodeTemplate
    },
    {
      template: cardShortcodeTemplate,
      funcMap: shortcode.getDefaultFuncMap(),
      dataProvider: shortcode.getDefaultDataProvider()
    }
  );

  // Original markdown customize with black title color
  const originalMarkdown = `
{{< testCard
title="Test Card"
titleColor="black"
>}}
This is a test card to demonstrate the caching issue.
When the title color is changed, the cached version may not update.
{{< /testCard >}}
  `;

  // Updated markdown customize with red title color
  const updatedMarkdown = `
{{< testCard
title="Test Card"
titleColor="red"
>}}
This is a test card to demonstrate the caching issue.
When the title color is changed, the cached version may not update.
{{< /testCard >}}
  `;

  // Step 1: Render the original customize
  console.log('\n--- STEP 1: First Render (black) ---');
  console.log('Input markdown contains titleColor="black"');
  const originalStepResult = shortcode.stepRender(originalMarkdown);
  const originalRender = shortcode.finalRender(originalStepResult);
  console.log('Output HTML:');
  console.log(originalRender);

  // Now we'll test with and without clearing the cache
  // First, let's try rendering without explicit cache clearing
  console.log('\n--- STEP 2: Second Render (changed to red) WITHOUT cache clearing ---');
  console.log('Input markdown now contains titleColor="red"');
  const updatedStepResult = shortcode.stepRender(updatedMarkdown);
  const updatedRender = shortcode.finalRender(updatedStepResult);
  console.log('Output HTML:');
  console.log(updatedRender);
  
  // Check if the caching issue is visible
  const hasBlackColor = updatedRender.includes('color: black');
  const hasRedColor = updatedRender.includes('color: red');
  
  console.log('\n--- RESULTS WITHOUT CLEARING ---');
  if (hasBlackColor && !hasRedColor) {
    console.log('✓ CACHING ISSUE REPRODUCED: Second render still shows black color despite input changing to red');
  } else if (hasRedColor) {
    console.log('✗ CACHING ISSUE NOT REPRODUCED: Second render correctly shows red color');
  } else {
    console.log('? UNEXPECTED RESULT: Color not found in output');
  }

  // Now test with explicit cache clearing
  console.log('\n--- STEP 3: Render with explicit cache clearing ---');
  const fixedStepResult = shortcode.stepRender(updatedMarkdown);
  const fixedRender = shortcode.finalRender(fixedStepResult);
  console.log('Output HTML:');
  console.log(fixedRender);
  
  const hasRedColorAfterClear = fixedRender.includes('color: red');
  
  if (hasRedColorAfterClear) {
    console.log('✓ CACHE CLEAR WORKS: After clearing cache, render correctly shows red color');
  } else {
    console.log('✗ UNEXPECTED RESULT: Color not updated even after cache clear');
  }
  
  // Save outputs to file for inspection
  const outputPath = path.join(__dirname, 'cache-test-output.txt');
  const outputContent = `
ORIGINAL RENDER (Black):
${originalRender}

UPDATED RENDER WITHOUT CLEARING (Should be Red but may be Black):
${updatedRender}

AFTER CACHE CLEAR (Should be Red):
${fixedRender}
  `;
  
  fs.writeFileSync(outputPath, outputContent, 'utf8');
  console.log(`\nDetailed output saved to ${outputPath}`);
}

// Run the test
try {
  testCacheIssue();
  console.log('Test completed successfully!');
} catch (error) {
  console.error('Error running cache test:', error);
} 