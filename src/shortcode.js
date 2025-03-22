"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortcode = void 0;
const shortcode_compiler_1 = require("@mdfriday/shortcode-compiler");
const components_1 = require("./components");
const theme_1 = require("./theme");
class Shortcode {
    constructor() {
        this.themeManager = new theme_1.Theme('mdf').manager();
        this.renderer = new shortcode_compiler_1.ShortcodeRenderer();
        // 注册内置 shortcodes
        (0, components_1.registerCardBanner)(this.renderer, this.themeManager);
        (0, components_1.registerFormulaPair)(this.renderer, this.themeManager);
        (0, components_1.registerFormulaSingle)(this.renderer, this.themeManager);
        (0, components_1.registerFormulaFlow)(this.renderer, this.themeManager);
        this.pageRenderer = new shortcode_compiler_1.PageRenderer(this.renderer);
    }
    /**
     * 解析 markdown 并渲染 shortcodes
     */
    render(markdownContent) {
        // 渲染 Markdown 内容
        const renderedContent = this.pageRenderer.render(markdownContent);
        return renderedContent.content;
    }
}
exports.Shortcode = Shortcode;
