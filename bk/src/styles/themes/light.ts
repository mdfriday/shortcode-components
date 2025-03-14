import { TailwindThemeConfig } from '../adapters/tailwind/theme';

/**
 * 亮色主题配置
 */
export const lightTheme: Partial<TailwindThemeConfig> = {
  colors: {
    // 主要颜色使用稍微亮一些的色调
    primary: {
      light: '#93c5fd',
      DEFAULT: '#60a5fa',
      dark: '#3b82f6',
    },
    secondary: {
      light: '#c7d2fe',
      DEFAULT: '#a5b4fc',
      dark: '#818cf8',
    },
    accent: {
      light: '#fbcfe8',
      DEFAULT: '#f472b6',
      dark: '#ec4899',
    },
    
    // 中性色调整为亮色系
    neutral: {
      50: '#ffffff',
      100: '#f9fafb',
      200: '#f3f4f6',
      300: '#e5e7eb',
      400: '#d1d5db',
      500: '#9ca3af',
      600: '#6b7280',
      700: '#4b5563',
      800: '#374151',
      900: '#1f2937',
    },
    
    // 语义色调整为亮色系
    semantic: {
      success: '#34d399', // 更亮的绿色
      warning: '#fbbf24', // 更亮的黄色
      error: '#f87171',   // 更亮的红色
      info: '#60a5fa',    // 更亮的蓝色
    },
  },
  
  // 其他配置继承自基础主题
}; 