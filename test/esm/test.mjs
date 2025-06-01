import pkg from "../../dist/index.js";

const {Shortcode} = pkg;
const sc = new Shortcode();
console.log(typeof sc.registerShortcode);
const result = sc.registerShortcode({id: 1, name: "test", template: "Test {{.customize}}", uuid: "123", tags: ["test"]});
console.log("Result:", result);
