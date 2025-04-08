const pkg = require("../../dist/index.js");
console.log("Imported:", Object.keys(pkg));
const {Shortcode} = pkg;
const sc = new Shortcode();
console.log("registerShortcode type:", typeof sc.registerShortcode);
const result = sc.registerShortcode({id: 1, name: "test", template: "Test {{.content}}", uuid: "123", tags: ["test"]});
console.log("Result:", result);
