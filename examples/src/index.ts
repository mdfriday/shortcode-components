import { ThemeManagerImpl, ThemeMode, ButtonComponent, CardComponent, InputComponent, ComponentVariant } from './theme-system';
import bootstrapDarkTheme from './theme-system/themes/bootstrap-dark.json';
import bootstrapLightTheme from './theme-system/themes/bootstrap-light.json';
import tailwindDarkTheme from './theme-system/themes/tailwind-dark.json';
import tailwindLightTheme from './theme-system/themes/tailwind-light.json';
import baseDarkTheme from './theme-system/themes/base-dark.json';
import baseLightTheme from './theme-system/themes/base-light.json';
import './styles/main.css';

// 创建主题管理器实例
const themeManager = new ThemeManagerImpl('theme');

// 预加载主题
const themes = [
  bootstrapDarkTheme,
  bootstrapLightTheme,
  tailwindDarkTheme,
  tailwindLightTheme,
  baseDarkTheme,
  baseLightTheme
];
themeManager.preloadThemes(themes);

// 设置默认主题
themeManager.setCurrentTheme('bootstrap', 'light');

// 获取组件管理器
const componentsManager = themeManager.getComponentsManager();

// 注册自定义组件
// 创建一个自定义按钮组件
const customButtonVariant: ComponentVariant = {
  base: 'button',
  variants: {
    variant: {
      special: 'custom-btn-special'
    },
    size: {
      xl: 'custom-btn-xl'
    }
  }
};

// 创建并注册自定义按钮组件
// const customButton = new ButtonComponent(customButtonVariant, 'custom-button');
// componentsManager.registerComponent(customButton);

// DOM 元素
const themeSelector = document.getElementById('theme-selector') as HTMLSelectElement;
const modeSelector = document.getElementById('mode-selector') as HTMLSelectElement;
const componentsContainer = document.getElementById('components-container') as HTMLDivElement;
const cssOutput = document.getElementById('css-output') as HTMLPreElement;

// 定义组件变体类型
type ButtonVariant = {
  variant: string;
  size: string;
  text: string;
};

type CardVariant = {
  variant: string;
  padding: string;
  text: string;
  shadow?: string;
};

type InputVariant = {
  variant: string;
  size: string;
  placeholder: string;
  error?: string;
};

type ComponentVariants = ButtonVariant | CardVariant | InputVariant;

// 组件定义
interface ComponentDefinition {
  name: string;
  title: string;
  variants: ComponentVariants[];
}

const components: ComponentDefinition[] = [
  {
    name: 'button',
    title: 'Buttons',
    variants: [
      { variant: 'primary', size: 'md', text: 'Primary' },
      { variant: 'secondary', size: 'md', text: 'Secondary' },
      { variant: 'outline', size: 'md', text: 'Outline' },
      { variant: 'primary', size: 'sm', text: 'Small' },
      { variant: 'primary', size: 'md', text: 'Medium' },
      { variant: 'primary', size: 'lg', text: 'Large' }
    ]
  },
  {
    name: 'custom-button',
    title: 'Custom Buttons',
    variants: [
      { variant: 'special', size: 'xl', text: 'Custom Special Button' }
    ]
  },
  {
    name: 'card',
    title: 'Cards',
    variants: [
      { variant: 'default', padding: 'md', text: 'Default Card' },
      { variant: 'primary', padding: 'md', text: 'Primary Card' },
      { variant: 'outline', padding: 'md', text: 'Outline Card' },
      { variant: 'default', padding: 'md', shadow: 'lg', text: 'Card with Shadow' }
    ]
  },
  {
    name: 'input',
    title: 'Inputs',
    variants: [
      { variant: 'default', size: 'md', placeholder: 'Default Input' },
      { variant: 'outline', size: 'md', placeholder: 'Outline Input' },
      { variant: 'filled', size: 'md', placeholder: 'Filled Input' },
      { variant: 'underline', size: 'md', placeholder: 'Underline Input' },
      { variant: 'default', size: 'md', error: 'true', placeholder: 'Error Input' }
    ]
  }
];

// 更新页面主题模式
function updateThemeMode(mode: ThemeMode) {
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// 渲染组件
function renderComponents() {
  componentsContainer.innerHTML = '';
  
  // 首先生成并应用主题系统的 CSS
  const css = themeManager.getAllCSS();
  updateCSSOutput(css);
  
  components.forEach(component => {
    // 创建组件部分
    const section = document.createElement('div');
    section.className = 'component-section';
    
    // 添加标题
    const title = document.createElement('h2');
    title.className = 'component-title';
    title.textContent = component.title;
    section.appendChild(title);
    
    // 创建变体容器
    const variantsContainer = document.createElement('div');
    variantsContainer.className = 'component-variants';
    
    // 渲染每个变体
    component.variants.forEach(variantProps => {
      const variantContainer = document.createElement('div');
      variantContainer.className = 'variant-container';
      
      // 获取组件类名
      const classes = themeManager.getComponentClasses(component.name, variantProps);
      console.log(`Component: ${component.name}, Props:`, variantProps, `Classes: ${classes}`);
      
      // 创建组件元素
      let element;
      if (component.name === 'button' || component.name === 'custom-button') {
        element = document.createElement('button');
        const buttonProps = variantProps as ButtonVariant;
        element.textContent = buttonProps.text || 'Button';
      } else if (component.name === 'card') {
        element = document.createElement('div');
        element.style.width = '200px';
        element.style.height = '100px';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
        const cardProps = variantProps as CardVariant;
        element.textContent = cardProps.text || 'Card';
      } else if (component.name === 'input') {
        element = document.createElement('input');
        const inputProps = variantProps as InputVariant;
        element.setAttribute('placeholder', inputProps.placeholder || 'Input');
        element.style.width = '200px';
      } else {
        element = document.createElement('div');
        element.textContent = 'Component';
      }
      
      // 应用类名
      element.className = classes;
      
      // 添加标签
      const label = document.createElement('div');
      label.className = 'variant-label';
      
      // 创建标签文本
      const variantText = Object.entries(variantProps)
        .filter(([key]) => key !== 'text' && key !== 'placeholder')
        .map(([key, value]) => `${key}="${value}"`)
        .join(', ');
      
      label.textContent = variantText;
      
      // 添加到容器
      variantContainer.appendChild(element);
      variantContainer.appendChild(label);
      variantsContainer.appendChild(variantContainer);
    });
    
    section.appendChild(variantsContainer);
    componentsContainer.appendChild(section);
  });
}

// 更新CSS输出
function updateCSSOutput(css: string) {
  cssOutput.textContent = css;
  
  // 创建或更新样式标签
  let styleTag = document.getElementById('theme-styles') as HTMLStyleElement;
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'theme-styles';
    document.head.appendChild(styleTag);
  }
  
  styleTag.textContent = css;
}

// 主题选择器事件监听
themeSelector.addEventListener('change', () => {
  const theme = themeSelector.value;
  const mode = modeSelector.value as ThemeMode;
  themeManager.setCurrentTheme(theme, mode);
  updateThemeMode(mode);
  renderComponents();
});

// 模式选择器事件监听
modeSelector.addEventListener('change', () => {
  const theme = themeSelector.value;
  const mode = modeSelector.value as ThemeMode;
  themeManager.setCurrentTheme(theme, mode);
  updateThemeMode(mode);
  renderComponents();
});

// 初始化
const initialMode = modeSelector.value as ThemeMode;
updateThemeMode(initialMode);
renderComponents(); 