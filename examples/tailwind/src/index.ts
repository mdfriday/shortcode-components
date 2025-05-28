/**
 * 多主题 Pokemon 卡片系统入口文件
 */

import { ThemeManager } from './theme-manager';

// 导出主要类和类型
export { ThemeManager };
export type { ThemeName, ThemeMode, ThemeConfig } from './theme-manager';

// 简单的测试函数
export function testThemeSystem() {
  console.log('🚀 多主题 Pokemon 卡片系统');
  console.log('📖 支持的主题:', ['base', 'fire', 'ocean', 'electric', 'grass']);
  console.log('🌓 支持的模式:', ['light', 'dark']);
  console.log('💡 打开 demo.html 查看演示');
  console.log('🌐 运行 "npm run serve" 启动完整服务器');
}

// 主函数
function main() {
  testThemeSystem();
  
  // 如果在浏览器环境中，可以初始化主题管理器
  if (typeof window !== 'undefined') {
    const themeManager = new ThemeManager();
    console.log('✅ 主题管理器已初始化');
    
    // 将主题管理器暴露到全局，方便调试
    (window as any).themeManager = themeManager;
  }
}

// 如果直接运行此文件
if (typeof require !== 'undefined' && require.main === module) {
  main();
}

export default main; 