import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ComponentSize, ComponentVariant } from '../../styles/types/component-theme';
import { Theme } from '../../styles/types/theme';
import { StyleDefinition } from '../../styles/types/style';

export interface GridParams {
  /**
   * 网格列数变体
   * @default 'cols12'
   */
  variant?: Extract<ComponentVariant, 'cols12' | 'cols6' | 'cols4' | 'cols3' | 'cols2'>;
  /**
   * 网格间距尺寸
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
 * 注册网格组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
export function registerGridShortcode(renderer: ShortcodeRenderer, theme: Theme) {
  renderer.registerTemplateShortcode('grid', {
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
      
      const variant = getParam('variant') || 'cols12';
      const size = getParam('size') || 'md';
      const customClass = getParam('class') || '';
      
      // 获取网格组件的主题配置
      const gridTheme = theme.components.grid;
      
      // 创建样式定义
      const style: StyleDefinition = {
        layout: {
          display: 'grid'
        },
        grid: {
          columns: variant === 'cols12' ? 12 : 
                  variant === 'cols6' ? 6 :
                  variant === 'cols4' ? 4 :
                  variant === 'cols3' ? 3 : 2
        },
        spacing: {
          gap: gridTheme.padding?.[size] || '1rem'
        }
      };

      // 使用 adapter 生成类名
      const classes = theme.adapter?.convertToClasses(style) || [];

      // 组合所有类名
      const allClasses = [
        'grid',
        `grid-${variant}`,
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