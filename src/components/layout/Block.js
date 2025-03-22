"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBlockShortcode = registerBlockShortcode;
const dataProvider_1 = require("../dataProvider");
/**
 * 注册块级组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
function registerBlockShortcode(renderer, theme) {
    renderer.registerTemplateShortcode('block', {
        template: `
      <div class="{{ .classes }}"{{ if .id }} id="{{ .id }}"{{ end }}>
        {{ .content }}
      </div>
    `,
        dataProvider: (0, dataProvider_1.createDataProvider)(theme, {
            componentName: "block",
            defaultValues: {
            // No specific defaults needed for block
            }
        })
    });
}
