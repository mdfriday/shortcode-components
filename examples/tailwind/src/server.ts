import express from 'express';
import path from 'path';
import fs from 'fs';
import { ShortcodeRenderer, PageRenderer } from '@mdfriday/shortcode-compiler';
import { registerPokemonComponent, registerCtaFormComponent, registerThemeSwitcherComponent } from './components/pokemon';

const app = express();
const port = 3000;

// 初始化组件系统
function initializeComponents() {
  const renderer = new ShortcodeRenderer();
  
  // 注册组件
  registerPokemonComponent(renderer);
  registerCtaFormComponent(renderer);
  registerThemeSwitcherComponent(renderer);
  
  return renderer;
}

// 静态文件服务
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// 主页路由
app.get('/', (req, res) => {
  try {
    const renderer = initializeComponents();
    const pageRenderer = new PageRenderer(renderer);
    
    const markdownContent = fs.readFileSync(
      path.join(__dirname, '../content/index.md'), 
      'utf-8'
    );
    
    const result = pageRenderer.render(markdownContent);
    
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>多主题 Pokemon 卡片系统</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    // 配置 Tailwind 以支持我们的自定义颜色
    tailwind.config = {
      darkMode: ['class', '[data-mode="dark"]'],
      theme: {
        extend: {
          colors: {
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
          }
        }
      }
    }
  </script>
  <style>
    /* 主题样式 */
    ${getThemeStyles()}
    
    /* 确保 Tailwind 类名正确应用 */
    .bg-background { background-color: rgb(var(--background)) !important; }
    .text-foreground { color: rgb(var(--foreground)) !important; }
    .bg-primary { background-color: rgb(var(--primary)) !important; }
    .text-primary { color: rgb(var(--primary)) !important; }
    .text-primaryForeground { color: rgb(var(--primary-foreground)) !important; }
    .bg-surface { background-color: rgb(var(--surface)) !important; }
    .text-surfaceForeground { color: rgb(var(--surface-foreground)) !important; }
    .bg-muted { background-color: rgb(var(--muted)) !important; }
    .text-mutedForeground { color: rgb(var(--muted-foreground)) !important; }
    .border-border { border-color: rgb(var(--border)) !important; }
    .bg-accent { background-color: rgb(var(--accent)) !important; }
    .text-accentForeground { color: rgb(var(--accent-foreground)) !important; }
    .shadow-theme { box-shadow: var(--shadow) !important; }
    .bg-input { background-color: rgb(var(--input)) !important; }
    
    /* 过渡动画 */
    * {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
  </style>
</head>
<body class="theme-base light min-h-screen bg-background text-foreground" 
      data-theme="base" data-mode="light">
  
  <!-- 主题切换器 -->
  <div class="fixed top-4 right-4 z-50">
    <div class="bg-surface text-surfaceForeground border border-border rounded-lg p-4 shadow-theme">
      <h3 class="text-sm font-semibold mb-3 text-primary">主题切换</h3>
      
      <div class="space-y-2">
        <div>
          <label class="text-xs text-mutedForeground">主题:</label>
          <select id="theme-select" class="w-full mt-1 px-2 py-1 bg-input text-foreground border border-border rounded text-xs">
            <option value="base">Base</option>
            <option value="fire">Fire</option>
            <option value="ocean">Ocean</option>
            <option value="electric">Electric</option>
            <option value="grass">Grass</option>
          </select>
        </div>
        
        <div>
          <label class="text-xs text-mutedForeground">模式:</label>
          <select id="mode-select" class="w-full mt-1 px-2 py-1 bg-input text-foreground border border-border rounded text-xs">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  
  <div class="container mx-auto px-4 py-8">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-primary mb-4">多主题 Pokemon 卡片系统</h1>
      <p class="text-lg text-mutedForeground">支持多主题 (base, fire, ocean, electric, grass) 和亮/暗模式切换</p>
    </header>
    
    <main class="space-y-8">
      ${result.content}
    </main>
    
    <footer class="text-center mt-16 py-8 border-t border-border">
      <p class="text-mutedForeground">© 2025 MDFriday Multi-Theme System</p>
    </footer>
  </div>
  
  <script>
    // 主题切换逻辑
    (function() {
      const themeSelect = document.getElementById('theme-select');
      const modeSelect = document.getElementById('mode-select');
      
      function updateTheme() {
        const theme = themeSelect.value;
        const mode = modeSelect.value;
        
        console.log('切换主题到:', theme, mode);
        
        // 移除所有主题类
        document.body.className = document.body.className
          .replace(/theme-\\w+/g, '')
          .replace(/\\b(light|dark)\\b/g, '')
          .trim();
        
        // 添加新的主题类
        document.body.classList.add(\`theme-\${theme}\`, mode, 'min-h-screen', 'bg-background', 'text-foreground');
        document.body.setAttribute('data-theme', theme);
        document.body.setAttribute('data-mode', mode);
        
        // 强制重新应用样式
        document.body.style.display = 'none';
        document.body.offsetHeight; // 触发重排
        document.body.style.display = '';
      }
      
      themeSelect.addEventListener('change', updateTheme);
      modeSelect.addEventListener('change', updateTheme);
      
      // 初始化主题
      updateTheme();
    })();
  </script>
</body>
</html>`;
    
    res.send(html);
  } catch (error) {
    console.error('Error rendering page:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 获取主题样式
function getThemeStyles(): string {
  try {
    return fs.readFileSync(path.join(__dirname, 'styles/themes.css'), 'utf-8');
  } catch (error) {
    console.warn('Could not load theme styles:', error);
    return '';
  }
}

app.listen(port, () => {
  console.log(`🚀 多主题 Pokemon 系统运行在 http://localhost:${port}`);
  console.log(`📖 访问 http://localhost:${port} 查看演示`);
  console.log(`🎨 支持的主题: base, fire, ocean, electric, grass`);
  console.log(`🌓 支持的模式: light, dark`);
}); 