import express from 'express';
import path from 'path';
import fs from 'fs';
import { Shortcode } from './shortcode';
import { registerPokemonComponent, registerCtaFormComponent, registerThemeSwitcherComponent } from './components/pokemon';

const app = express();
const port = 3000;

// 初始化 shortcode 系统
function initializeShortcode() {
  const shortcode = new Shortcode();
  
  // 注册组件到 shortcode 系统
  registerPokemonComponent(shortcode.renderer);
  registerCtaFormComponent(shortcode.renderer);
  registerThemeSwitcherComponent(shortcode.renderer);
  
  return shortcode;
}

// 静态文件服务
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/css', express.static(path.join(__dirname, '../dist')));

// 主页路由
app.get('/', (req, res) => {
  try {
    const shortcode = initializeShortcode();
    
    const markdownContent = fs.readFileSync(
      path.join(__dirname, '../content/index.md'), 
      'utf-8'
    );
    
    const renderedContent = shortcode.render(markdownContent);
    
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>多主题 Pokemon 卡片系统</title>
  <link rel="stylesheet" href="/css/output.css">
</head>
<body class="theme-base light min-h-screen bg-background text-foreground" 
      data-theme="base" data-mode="light">
  
  <!-- 主题切换器 -->
  <div class="fixed top-4 right-4 z-50">
    <div class="theme-switcher p-4">
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
      ${renderedContent}
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