"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRowShortcode = registerRowShortcode;
const dataProvider_1 = require("../dataProvider");
/**
 * 注册行组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
function registerRowShortcode(renderer, theme) {
    renderer.registerTemplateShortcode('row', {
        template: `
      <div class="{{ .classes }}"{{ if .id }} id="{{ .id }}"{{ end }}>
        {{ .content }}
      </div>
    `,
        dataProvider: (0, dataProvider_1.createDataProvider)(theme, {
            componentName: "row",
            defaultValues: {},
            additionalProps: []
        })
    });
}
