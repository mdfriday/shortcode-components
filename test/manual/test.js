const mdfridayShortcode = require("../../dist/index.js");
console.log(Object.keys(mdfridayShortcode));
const Shortcode = mdfridayShortcode.Shortcode;
const sc = new Shortcode();
console.log(sc);
console.log(typeof sc.registerShortcode);
