/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./content/**/*.md",
    "./dist/**/*.html"
  ],
  darkMode: ['class', '[data-mode="dark"]'], // 支持多种模式切换
  theme: {
    extend: {
      colors: {
        // 语义化颜色变量
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        primaryForeground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        secondaryForeground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentForeground: 'rgb(var(--accent-foreground) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surfaceForeground: 'rgb(var(--surface-foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        mutedForeground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
        destructive: 'rgb(var(--destructive) / <alpha-value>)',
        destructiveForeground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        warningForeground: 'rgb(var(--warning-foreground) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        successForeground: 'rgb(var(--success-foreground) / <alpha-value>)',
      },
      boxShadow: {
        'theme': 'var(--shadow)',
      },
      backgroundImage: {
        'theme-gradient': 'var(--gradient)',
      }
    },
  },
  plugins: [],
} 