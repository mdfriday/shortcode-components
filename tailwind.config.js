/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-', // 这里设置前缀
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 禁用默认样式重置
  }
} 