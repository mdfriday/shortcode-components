import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ComponentSize, ComponentVariant } from '../../styles/types/component-theme';
import { Theme } from '../../styles/types/theme';
import { StyleDefinition } from '../../styles/types/style';

export interface ContainerParams {
  /**
   * 容器变体
   * @default 'fluid'
   */
  variant?: Extract<ComponentVariant, 'fluid' | 'responsive'>;
  /**
   * 容器尺寸
   * @default 'md'
   */
  size?: ComponentSize;
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
 * 注册容器组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
export function registerContainerShortcode(renderer: ShortcodeRenderer, theme: Theme) {
  renderer.registerTemplateShortcode('container', {
    template: `
      <div class="{{ .classes }}">
        {{ .content }}
      </div>
    `,
    dataProvider: (params: string[], content?: string) => {
      const getParam = (name: string) => 
        params.find(p => p.startsWith(`${name}=`))
          ?.split('=')[1]
          ?.replace(/^["']|["']$/g, '');
      
      const variant = getParam('variant') || 'fluid';
      const size = getParam('size') || 'md';
      const customClass = getParam('class') || '';
      
      // 获取容器组件的主题配置
      const containerTheme = theme.components.container;
      
      // 创建样式定义
      const style: StyleDefinition = {
        layout: {
          display: 'block',
          width: variant === 'fluid' ? '100%' : containerTheme.maxWidth?.[size] || '100%'
        },
        spacing: {
          margin: '0 auto',
          padding: containerTheme.padding?.[size] || '1rem'
        }
      };

      // 使用 adapter 生成类名
      const classes = theme.adapter?.convertToClasses(style) || [];

      // 组合所有类名
      const allClasses = [
        'container',
        `container-${variant}`,
        `container-${size}`,
        ...(classes ? [classes] : []),
        customClass
      ].filter(Boolean).join(' ');

      return {
        classes: allClasses,
        content
      };
    }
  });
} 