import { ThemeManagerImpl } from './theme-manager';
import { ThemeMode } from './types';
import exampleThemes from './example-theme.json';

// Create a theme manager with a prefix for CSS classes
const themeManager = new ThemeManagerImpl('obs-theme');

// Preload themes from JSON
themeManager.preloadThemes(exampleThemes);

// Set the current theme
themeManager.setCurrentTheme('tailwind', 'light');

// Get component classes
const buttonClasses = themeManager.getComponentClasses('button', {
  variant: 'primary',
  size: 'md'
});

console.log('Button classes:', buttonClasses);
// Output: obs-theme-inline-flex obs-theme-items-center obs-theme-justify-center obs-theme-font-medium obs-theme-transition-colors obs-theme-focus:outline-none obs-theme-focus:ring-2 obs-theme-focus:ring-offset-2 obs-theme-bg-primary obs-theme-text-white obs-theme-hover:bg-primary-dark obs-theme-focus:ring-primary obs-theme-px-4 obs-theme-py-2 obs-theme-text-base obs-theme-rounded-md

// Get all CSS for the current theme
const css = themeManager.getAllCSS();
console.log('CSS:', css);
// Output: CSS variables and component styles with the obs-theme prefix

// Switch to dark mode
themeManager.setCurrentTheme('tailwind', 'dark');

// Get component classes again
const darkButtonClasses = themeManager.getComponentClasses('button', {
  variant: 'outline',
  size: 'sm'
});

console.log('Dark mode button classes:', darkButtonClasses);
// Output: obs-theme-inline-flex obs-theme-items-center obs-theme-justify-center obs-theme-font-medium obs-theme-transition-colors obs-theme-focus:outline-none obs-theme-focus:ring-2 obs-theme-focus:ring-offset-2 obs-theme-focus:ring-offset-gray-900 obs-theme-border obs-theme-border-gray-600 obs-theme-text-gray-300 obs-theme-bg-transparent obs-theme-hover:bg-gray-800 obs-theme-px-3 obs-theme-py-1.5 obs-theme-text-sm obs-theme-rounded-md

// Switch to bootstrap theme
themeManager.setCurrentTheme('bootstrap', 'light');

// Get component classes for bootstrap
const bootstrapButtonClasses = themeManager.getComponentClasses('button', {
  variant: 'primary',
  size: 'lg'
});

console.log('Bootstrap button classes:', bootstrapButtonClasses);
// Output: obs-theme-d-inline-block obs-theme-font-weight-400 obs-theme-text-center obs-theme-align-middle obs-theme-user-select-none obs-theme-border obs-theme-transition obs-theme-btn-primary obs-theme-bg-primary obs-theme-text-white obs-theme-border-primary obs-theme-btn-lg obs-theme-py-3 obs-theme-px-4 obs-theme-font-size-lg obs-theme-rounded

// Example of how to use in an Obsidian component
function renderButton(props: { variant: string; size: string; theme: string; mode: string }) {
  const { variant, size, theme, mode } = props;
  
  // Set the theme
  themeManager.setCurrentTheme(theme, mode as ThemeMode);
  
  // Get the classes
  const classes = themeManager.getComponentClasses('button', { variant, size });
  
  // Return the HTML
  return `<button class="${classes}">Button</button>`;
}

// Example of how to get all CSS for a preview
function getPreviewCSS() {
  return themeManager.getAllCSS();
}

// Example of parsing a shortcode
function parseShortcode(shortcode: string) {
  // Example shortcode: {{< button variant="primary" theme="tailwind" >}}
  const match = shortcode.match(/{{< (\w+) (.+) >}}/);
  
  if (!match) return null;
  
  const [, componentName, propsString] = match;
  const props: Record<string, string> = {};
  
  // Parse props
  const propMatches = propsString.matchAll(/(\w+)="([^"]+)"/g);
  for (const propMatch of propMatches) {
    const [, propName, propValue] = propMatch;
    props[propName] = propValue;
  }
  
  // Extract theme and mode
  const theme = props.theme || 'tailwind';
  const mode = props.mode || 'light';
  
  // Remove theme and mode from props
  delete props.theme;
  delete props.mode;
  
  // Set the theme
  themeManager.setCurrentTheme(theme, mode as ThemeMode);
  
  // Get the classes
  const classes = themeManager.getComponentClasses(componentName, props);
  
  // Return the HTML
  return `<${componentName} class="${classes}">${props.text || ''}</${componentName}>`;
} 