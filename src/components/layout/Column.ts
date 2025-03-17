import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ThemeManager } from '../../theme';
import { createDataProvider } from '../dataProvider';

/**
 * 注册列组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
export function registerColumnShortcode(renderer: ShortcodeRenderer, theme: ThemeManager) {
  renderer.registerTemplateShortcode('col', {
    template: `
      <div class="{{ .classes }}"{{ if .id }} id="{{ .id }}"{{ end }}>
        {{ .content }}
      </div>
    `,
    dataProvider: createDataProvider(theme, {
      componentName: "col",
      defaultValues: {},
      additionalProps: []
    })
  });
} 