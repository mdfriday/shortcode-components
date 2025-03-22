import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ThemeManager } from '../../themes';
import { createDataProvider } from '../dataProvider';

/**
 * 注册网格组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
export function registerGridShortcode(renderer: ShortcodeRenderer, theme: ThemeManager) {
  renderer.registerTemplateShortcode('grid', {
    template: `
      <div class="{{ .classes }}"{{ if .id }} id="{{ .id }}"{{ end }}>
        {{ .content }}
      </div>
    `,
    dataProvider: createDataProvider(theme, {
      componentName: "grid",
      defaultValues: {}
    })
  });
} 