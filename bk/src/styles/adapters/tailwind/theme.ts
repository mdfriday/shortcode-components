/**
 * Tailwind主题配置
 */
export interface TailwindThemeConfig {
  colors: ColorConfig;
  spacing: SpacingConfig;
  typography: TypographyConfig;
}

/**
 * 颜色配置
 */
export interface ColorConfig {
  // 主要颜色
  primary: {
    light: string;
    DEFAULT: string;
    dark: string;
  };
  // 次要颜色
  secondary: {
    light: string;
    DEFAULT: string;
    dark: string;
  };
  // 强调色
  accent: {
    light: string;
    DEFAULT: string;
    dark: string;
  };
  // 中性色
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  // 语义色
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

/**
 * 间距配置
 */
export interface SpacingConfig {
  // 基础间距单位（以rem为单位）
  unit: number;
  // 间距比例
  scale: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
}

/**
 * 排版配置
 */
export interface TypographyConfig {
  // 字体族
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  // 字体大小（rem）
  fontSize: {
    xs: [size: string, lineHeight: string];
    sm: [size: string, lineHeight: string];
    base: [size: string, lineHeight: string];
    lg: [size: string, lineHeight: string];
    xl: [size: string, lineHeight: string];
    '2xl': [size: string, lineHeight: string];
    '3xl': [size: string, lineHeight: string];
  };
  // 字重
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

/**
 * 默认主题配置
 */
export const defaultTheme: TailwindThemeConfig = {
  colors: {
    primary: {
      light: '#60a5fa',
      DEFAULT: '#3b82f6',
      dark: '#2563eb',
    },
    secondary: {
      light: '#a5b4fc',
      DEFAULT: '#818cf8',
      dark: '#6366f1',
    },
    accent: {
      light: '#f472b6',
      DEFAULT: '#ec4899',
      dark: '#db2777',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  spacing: {
    unit: 0.25, // 1单位 = 0.25rem = 4px
    scale: {
      xs: 1,    // 0.25rem = 4px
      sm: 2,    // 0.5rem = 8px
      md: 4,    // 1rem = 16px
      lg: 6,    // 1.5rem = 24px
      xl: 8,    // 2rem = 32px
      '2xl': 12,// 3rem = 48px
    },
  },
  typography: {
    fontFamily: {
      sans: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ],
      serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      xs: ['0.75rem', '1rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.5rem', '2rem'],
      '3xl': ['1.875rem', '2.25rem'],
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
}; 