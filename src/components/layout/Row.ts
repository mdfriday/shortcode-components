import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ThemeManager } from '../../theme';

/**
 * 注册行组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
export function registerRowShortcode(renderer: ShortcodeRenderer, theme: ThemeManager) {
  renderer.registerTemplateShortcode('row', {
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
      const display = getParam('display') || 'flex';
      const position = getParam('position');
      const gap = getParam('gap');
      const padding = getParam('padding');
      const margin = getParam('margin');
      const justifyContent = getParam('justify') || 'start';
      const alignItems = getParam('align') || 'stretch';
      const wrap = getParam('wrap') || 'nowrap';
      
      // 样式属性
      const variant = getParam('variant');
      const textColor = getParam('textColor');
      const backgroundColor = getParam('backgroundColor');
      const borderColor = getParam('borderColor');
      const width = getParam('width') || '100%';
      const height = getParam('height');
      const border = getParam('border');
      const rounded = getParam('rounded');
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
      const styles = theme.getComponentClasses("row", {
        // 布局属性
        display,
        position,
        gap,
        padding,
        margin,
        justifyContent,
        alignItems,
        wrap,
        
        // 样式属性
        variant,
        textColor,
        backgroundColor,
        borderColor,
        width,
        height,
        border,
        rounded,
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