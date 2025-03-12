import type { AcceptedPlugin } from 'postcss';
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

async function generateTailwindCSS() {
  try {
    const css = `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `;

    const processor = postcss([
      tailwindcss(),
      autoprefixer()
    ]);

    const result = await processor.process(css, {
      from: undefined
    });

    console.log('Generated CSS:', result.css);
    return result.css;
  } catch (error) {
    console.error('Error generating CSS:', error);
    throw error;
  }
}

generateTailwindCSS(); 