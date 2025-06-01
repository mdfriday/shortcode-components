/**
 * 🏗️ 重构后的多主题 Pokemon 卡片系统入口文件
 * 基于 Tailwind 基础令牌的优化架构
 */

import { ThemeManager } from './theme-manager';

// 导出主要类和类型
export { ThemeManager };
export type { ThemeName, ThemeMode, ThemeConfig } from './theme-manager';

// 🎯 创建全局主题管理器实例
export const themeManager = new ThemeManager();

// 简单的测试函数
export function testThemeSystem() {
  console.log('🚀 重构后的多主题 Pokemon 卡片系统');
  console.log('🎯 基于 Tailwind 基础令牌的优化架构');
  console.log('📖 支持的主题:', themeManager.getAvailableThemes());
  console.log('🌓 支持的模式:', themeManager.getAvailableModes());
  console.log('🎨 当前主题配置:', themeManager.getCurrentTheme());
  console.log('💡 打开 demo.html 查看演示');
  console.log('🌐 运行 "npm run serve" 启动完整服务器');
}

// 主函数
function main() {
  testThemeSystem();
  
  // 如果在浏览器环境中，初始化主题系统
  if (typeof window !== 'undefined') {
    console.log('✅ 主题管理器已初始化');
    console.log('🎛️ 使用 themeManager.setTheme("fire") 切换主题');
    console.log('🌓 使用 themeManager.toggleMode() 切换明暗模式');
    
    // 将主题管理器暴露到全局，方便调试
    (window as any).themeManager = themeManager;
    
    // 监听主题变化事件
    document.addEventListener('themechange', (e: any) => {
      console.log('🎨 主题已切换:', e.detail);
    });
  }
}

// 如果直接运行此文件
if (typeof require !== 'undefined' && require.main === module) {
  main();
}

export default main; 