/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./customize/**/*.md",
    "./dist/**/*.html",
    "./*.html"  // 包含根目录的 HTML 文件
  ],
  safelist: [
    // 确保主题类始终被包含
    'theme-base',
    'light',
    'dark'
  ],
  darkMode: ['class', '[data-mode="dark"]'], // 支持多种模式切换
  theme: {
    extend: {
      fontFamily: {
        // 扩展字体族
        'note': ['AvenirNext-Regular', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji'],
        'newspaper': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji'],
        'mono-code': ['Menlo-Regular', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      colors: {
        // 🎯 只扩展 Tailwind 真正没有的基础令牌
        'brand-coral': 'var(--brand-coral)',
        'brand-sage': 'var(--brand-sage)', 
        'brand-cream': 'var(--brand-cream)',
        'brand-teal': 'var(--brand-teal)',
        // 补充 Tailwind 灰色系的空隙
        'gray-150': 'var(--gray-150)',
        'gray-350': 'var(--gray-350)',
        // 特定色值
        'navy-600': 'var(--navy-600)',
        'pink-550': 'var(--pink-550)',
      },
      boxShadow: {
        // 利用 CSS 变量
        'theme': 'var(--shadow)',
      },
      backgroundImage: {
        // 利用 CSS 变量
        'theme-gradient': 'var(--gradient)',
      }
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        // 确保主题类被强制包含
        '.theme-base': {},
      })
    }
  ],
} 