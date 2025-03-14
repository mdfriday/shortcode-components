import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ComponentSize, ComponentVariant } from '../../styles/types/component-theme';
import { Theme } from '../../styles/types/theme';

export interface ButtonParams {
  /**
   * 按钮变体
   * @default 'primary'
   */
  variant?: Extract<ComponentVariant, 'primary' | 'secondary' | 'outline' | 'ghost'>;
  /**
   * 按钮尺寸
   * @default 'md'
   */
  size?: ComponentSize;
  /**
   * 链接地址
   */
  href?: string;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 自定义类名
   */
  class?: string;
  /**
   * 主题配置
   */
  theme?: Theme;
}

/**
 * 注册按钮组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
export function registerButtonShortcode(renderer: ShortcodeRenderer, theme: Theme) {
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
      const size = getParam('size') || 'md';
      const href = getParam('href') || '#';
      const disabled = getParam('disabled') === 'true';
      const customClass = getParam('class') || '';
      
      // 获取按钮组件的主题配置
      const buttonTheme = theme.components.button;
      
      // 合并基础样式、变体样式和尺寸样式
      const styles = [
        // 基础样式类名
        buttonTheme.base && 'button',
        // 变体样式类名
        variant && `button-${variant}`,
        // 尺寸样式类名
        size && `button-${size}`,
        // 禁用状态类名
        disabled && 'button-disabled',
        // 自定义类名
        customClass
      ].filter(Boolean).join(' ');
      
      return {
        href,
        disabled,
        classes: styles,
        content
      };
    }
  });
} 