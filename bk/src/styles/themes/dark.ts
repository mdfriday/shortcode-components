import { TailwindThemeConfig } from '../adapters/tailwind/theme';

/**
 * 暗色主题配置
 */
export const darkTheme: Partial<TailwindThemeConfig> = {
  colors: {
    // 主要颜色调整为暗色系
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
    
    // 中性色调整为暗色系
    neutral: {
      50: '#1f2937',
      100: '#374151',
      200: '#4b5563',
      300: '#6b7280',
      400: '#9ca3af',
      500: '#d1d5db',
      600: '#e5e7eb',
      700: '#f3f4f6',
      800: '#f9fafb',
      900: '#ffffff',
    },
    
    // 语义色调整为暗色系
    semantic: {
      success: '#059669', // 更暗的绿色
      warning: '#d97706', // 更暗的黄色
      error: '#dc2626',   // 更暗的红色
      info: '#2563eb',    // 更暗的蓝色
    },
  },
  
  // 其他配置继承自基础主题
}; 