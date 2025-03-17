import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ThemeManager } from '../../theme';
import { createDataProvider } from '../dataProvider';

/**
 * 注册按钮组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
export function registerButtonShortcode(renderer: ShortcodeRenderer, theme: ThemeManager) {
  renderer.registerTemplateShortcode('button', {
    template: `
      <a href="{{ .href }}" class="{{ .classes }}"{{ if .disabled }} disabled{{ end }}>
        {{ .content }}
      </a>
    `,
    dataProvider: createDataProvider(theme, {
      componentName: "button",
      defaultValues: {
        variant: 'primary',
        rounded: 'true',
      },
      additionalProps: ['href']
    })
  });
} 