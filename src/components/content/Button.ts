import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ThemeManager } from '../../theme';

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
    dataProvider: (params: string[], content?: string) => {
      const getParam = (name: string) => 
        params.find(p => p.startsWith(`${name}=`))
          ?.split('=')[1]
          ?.replace(/^["']|["']$/g, '');
      
      const variant = getParam('variant') || 'primary';
      const rounded = getParam('rounded') || 'true';
      const href = getParam('href') || '#';
      const disabled = getParam('disabled') === 'true';
      const customClass = getParam('class') || '';


      // 合并基础样式、变体样式和尺寸样式
      const styles = theme.getComponentClasses("button", {
        variant,
        rounded
      })
      
      return {
        href,
        disabled,
        classes: styles,
        content
      };
    }
  });
} 