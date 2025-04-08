const mdfridayShortcode = require("../../dist/index.js");
const Shortcode = mdfridayShortcode.Shortcode;
const sc = new Shortcode();
const result = sc.registerShortcode({id: 1, name: "test", template: "Test {{.content}}", uuid: "123", tags: ["test"]});
console.log("Result:", result);
console.log("All:", sc.getAllShortcodes());
