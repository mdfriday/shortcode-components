"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerColumnShortcode = registerColumnShortcode;
const dataProvider_1 = require("../dataProvider");
/**
 * 注册列组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
function registerColumnShortcode(renderer, theme) {
    renderer.registerTemplateShortcode('col', {
        template: `
      <div class="{{ .classes }}"{{ if .id }} id="{{ .id }}"{{ end }}>
        {{ .content }}
      </div>
    `,
        dataProvider: (0, dataProvider_1.createDataProvider)(theme, {
            componentName: "col",
            defaultValues: {},
            additionalProps: []
        })
    });
}
