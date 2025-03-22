"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerButtonShortcode = registerButtonShortcode;
const dataProvider_1 = require("../dataProvider");
/**
 * 注册按钮组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
function registerButtonShortcode(renderer, theme) {
    renderer.registerTemplateShortcode('button', {
        template: `
      <a href="{{ .href }}" class="{{ .classes }}"{{ if .disabled }} disabled{{ end }}>
        {{ .content }}
      </a>
    `,
        dataProvider: (0, dataProvider_1.createDataProvider)(theme, {
            componentName: "button",
            defaultValues: {
                variant: 'primary',
                rounded: 'true',
            },
            additionalProps: ['href']
        })
    });
}
