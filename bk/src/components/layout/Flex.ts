import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ComponentSize, ComponentVariant } from '../../styles/types/component-theme';
import { Theme } from '../../styles/types/theme';
import { StyleDefinition } from '../../styles/types/style';

export interface FlexParams {
  /**
   * 弹性布局方向变体
   * @default 'row'
   */
  variant?: Extract<ComponentVariant, 'row' | 'column' | 'rowReverse' | 'columnReverse'>;
  /**
   * 间距尺寸
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
 * 注册弹性布局组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
export function registerFlexShortcode(renderer: ShortcodeRenderer, theme: Theme) {
  renderer.registerTemplateShortcode('flex', {
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
      
      const variant = getParam('variant') || 'row';
      const size = getParam('size') || 'md';
      const customClass = getParam('class') || '';
      
      // 获取弹性布局组件的主题配置
      const flexTheme = theme.components.flex;
      
      // 创建样式定义
      const style: StyleDefinition = {
        layout: {
          display: 'flex'
        },
        flex: {
          direction: variant === 'row' ? 'row' :
                    variant === 'column' ? 'column' :
                    variant === 'rowReverse' ? 'row-reverse' : 'column-reverse'
        },
        spacing: {
          gap: flexTheme.padding?.[size] || '1rem'
        }
      };

      // 使用 adapter 生成类名
      const classes = theme.adapter?.convertToClasses(style) || [];

      // 组合所有类名
      const allClasses = [
        'flex',
        `flex-${variant}`,
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