import { ThemeManager } from '../types/theme-manager';
import { baseTheme } from './base';
import { lightTheme } from './light';
import { darkTheme } from './dark';

/**
 * 注册基础主题
 */
export function registerBaseThemes(themeManager: ThemeManager): void {
  // 注册基础主题
  themeManager.registerTheme({
    name: 'base',
    config: baseTheme,
    description: '基础主题，包含所有主题共享的基础样式',
    tags: ['base', 'foundation']
  });

  // 注册亮色主题
  themeManager.registerTheme({
    name: 'light',
    config: lightTheme,
    description: '默认亮色主题',
    tags: ['light', 'default'],
    extends: 'base'
  });

  // 注册暗色主题
  themeManager.registerTheme({
    name: 'dark',
    config: darkTheme,
    description: '默认暗色主题',
    tags: ['dark'],
    extends: 'base'
  });
}

// 导出所有主题配置
export { baseTheme, lightTheme, darkTheme }; 