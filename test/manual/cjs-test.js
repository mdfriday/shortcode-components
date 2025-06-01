const pkg = require("../../dist/index.js");
console.log("Imported:", Object.keys(pkg));
const {Shortcode} = pkg;
const sc = new Shortcode();
console.log("registerShortcode type:", typeof sc.registerShortcode);
console.log("extractShortcodeNames type:", typeof sc.extractShortcodeNames);
const result = sc.registerShortcode({id: 1, name: "test", template: "Test {{.customize}}", uuid: "123", tags: ["test"]});
console.log("Result:", result);

// Test extractShortcodeNames functionality
try {
  const markdown = "This is customize with a {{< shortcode param=\"value\" >}} embedded in it.";
  const shortcodeNames = sc.extractShortcodeNames(markdown);
  console.log("Extracted shortcode names:", shortcodeNames);
} catch (error) {
  console.error("Error testing extractShortcodeNames:", error);
}
