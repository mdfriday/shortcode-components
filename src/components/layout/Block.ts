import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ThemeManager } from '../../theme';

/**
 * 注册块级组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
export function registerBlockShortcode(renderer: ShortcodeRenderer, theme: ThemeManager) {
  renderer.registerTemplateShortcode('block', {
    template: `
      <div class="{{ .classes }}"{{ if .id }} id="{{ .id }}"{{ end }}>
        {{ .content }}
      </div>
    `,
    dataProvider: (params: string[], content?: string) => {
      const getParam = (name: string) => 
        params.find(p => p.startsWith(`${name}=`))
          ?.split('=')[1]
          ?.replace(/^["']|["']$/g, '');
      
      // 布局属性
      const display = getParam('display');
      const gap = getParam('gap');
      const position = getParam('position');
      const padding = getParam('padding');
      const paddingX = getParam('px');
      const paddingY = getParam('py');
      const margin = getParam('margin');
      
      // 样式属性
      const variant = getParam('variant');
      const textColor = getParam('textColor');
      const textAlign = getParam('textAlign');
      const backgroundColor = getParam('backgroundColor');
      const borderColor = getParam('borderColor');
      const size = getParam('size');
      const width = getParam('width');
      const height = getParam('height');
      const border = getParam('border');
      const rounded = getParam('rounded');
      const outline = getParam('outline');
      const shadow = getParam('shadow');
      
      // 响应式属性
      const sm = getParam('sm');
      const md = getParam('md');
      const lg = getParam('lg');
      const xl = getParam('xl');
      const hidden = getParam('hidden');
      const visible = getParam('visible');
      
      // 其他属性
      const id = getParam('id');
      const customClass = getParam('class') || '';

      // 获取组件样式类
      const styles = theme.getComponentClasses("block", {
        // 布局属性
        display,
        gap,
        position,
        padding,
        paddingX,
        paddingY,
        margin,
        
        // 样式属性
        variant,
        textColor,
        textAlign,
        backgroundColor,
        borderColor,
        size,
        width,
        height,
        border,
        rounded,
        outline,
        shadow,
        
        // 响应式属性
        sm,
        md,
        lg,
        xl,
        hidden,
        visible
      });
      
      return {
        id,
        classes: customClass ? `${styles} ${customClass}` : styles,
        content
      };
    }
  });
} 