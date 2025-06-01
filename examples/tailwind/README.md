# 多主题 Pokemon 卡片系统

这个项目展示了基于 `tailwind.md` 要求的多主题系统，支持主题 (base, fire, ocean, electric, grass) 和模式 (light, dark) 的组合切换，将原有的 Pokemon.ts 组件迁移到新的主题系统中。

## 🎯 设计理念

### 分层架构
```
Theme 主题风格 (base, fire, ocean, electric, grass)
  ↓
Mode 亮/暗模式 (light, dark)
  ↓
语义化 CSS 变量 (--primary, --background, etc.)
  ↓
Tailwind 语义化类名 (bg-primary, text-foreground, etc.)
```

### 核心特性
- **多主题支持**：5 种主题风格，每种都有独特的色彩基调
- **亮/暗模式**：每个主题都支持 light 和 dark 两种模式
- **语义化类名**：组件使用 `bg-primary`、`text-foreground` 等语义化类名
- **CSS 变量驱动**：通过 CSS 变量统一控制主题颜色
- **实时切换**：支持动态主题和模式切换

## 🚀 快速开始

### 安装依赖
```bash
cd examples/tailwind
npm install
```

### 开发环境
```bash
# 构建 CSS (监听模式)
npm run build-css:watch

# 启动开发服务器 (新终端)
npm run serve
```

### 生产环境构建
```bash
# 构建优化的 CSS
npm run build-css:prod

# 构建 TypeScript
npm run build

# 启动生产服务器
npm start
```

### 快速预览
```bash
# 构建 CSS 文件
npm run build-css

# 直接打开 demo.html (无需服务器)
open demo.html
```

访问 http://localhost:3000 查看完整演示。

## 📁 项目结构

```
examples/tailwind/
├── src/
│   ├── styles/
│   │   ├── themes.css          # 主题 CSS 变量定义
│   │   └── input.css           # Tailwind 输入样式
│   ├── components/
│   │   └── pokemon.ts          # Pokemon 组件实现
│   ├── theme-manager.ts        # 主题管理器
│   └── server.ts              # Express 服务器
├── content/
│   └── index.md               # 主页内容
├── tailwind.config.js         # Tailwind 配置
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 主题系统

### 支持的主题
- **base**: 默认蓝色主题
- **fire**: 火系红色主题  
- **ocean**: 海洋蓝色主题
- **electric**: 电系黄色主题
- **grass**: 草系绿色主题

### 支持的模式
- **light**: 亮色模式
- **dark**: 暗色模式

### CSS 变量定义
每个主题和模式组合都定义了完整的语义化变量：

```css
.theme-fire.light {
  --background: 255 240 240;
  --foreground: 127 29 29;
  --primary: 239 68 68;
  --primary-foreground: 255 255 255;
  /* ... 更多变量 */
}

.theme-fire.dark {
  --background: 31 31 31;
  --foreground: 254 242 242;
  --primary: 255 107 107;
  --primary-foreground: 0 0 0;
  /* ... 更多变量 */
}
```

## 🧩 组件使用

### Pokemon 卡片组件

```markdown
{{< pokemon 
    name="Charizard" 
    theme="fire" 
    mode="dark"
    date="2025.01.15" 
    types="Fire,Flying"
    characterImage="https://example.com/charizard.png"
    subjects="身高,1.7m;体重,90.5kg;特性,猛火"
    statsLabels="HP,攻击,防御,特攻,特防,速度"
    statsValues="HP,15;攻击,16;防御,15;特攻,21;特防,17;速度,20"
    pokeballImage="https://example.com/pokeball.png"
>}}
喷火龙的描述内容...
{{< /pokemon >}}
```

### CTA 表单组件

```markdown
{{< ctaForm 
    title="加入训练师" 
    placeholder="输入邮箱" 
    buttonText="开始冒险"
    theme="ocean" 
    mode="light"
>}}
```

### 参数说明

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| theme | string | 主题名称: base/fire/ocean/electric/grass | base |
| mode | string | 模式: light/dark | light |
| name | string | Pokemon 名称 | - |
| date | string | 日期 | - |
| types | string | 类型，用逗号分隔 | - |
| characterImage | string | 角色图片 URL | - |
| subjects | string | 属性信息，格式: "标签,值;标签,值" | - |
| statsLabels | string | 数据标签，用逗号分隔 | - |
| statsValues | string | 数据值，格式: "标签,值;标签,值" | - |
| pokeballImage | string | 精灵球图片 URL | - |

## 🔧 技术实现

### Tailwind 配置
```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        // ... 更多语义化颜色
      }
    }
  }
}
```

### 主题管理器
```typescript
import { ThemeManager } from './theme-manager';

// 创建主题管理器
const themeManager = new ThemeManager();

// 设置主题
themeManager.setTheme('fire');
themeManager.setMode('dark');

// 或同时设置
themeManager.setThemeConfig({ theme: 'fire', mode: 'dark' });
```

### 组件实现
组件完全使用语义化 Tailwind 类名：

```html
<div class="bg-primary text-primaryForeground">
  <h2 class="text-2xl font-bold text-foreground">标题</h2>
  <div class="bg-surface text-surfaceForeground border border-border rounded-lg p-4">
    <p class="text-mutedForeground">内容</p>
  </div>
</div>
```

## 🔄 从原有系统迁移

### 原有 Pokemon.ts 的改进

1. **简化样式管理**
   - 移除了复杂的自定义 CSS 样式
   - 使用 Tailwind 语义化类名
   - 通过 CSS 变量实现主题切换

2. **统一主题系统**
   - 支持多主题和亮/暗模式组合
   - 所有组件共享同一套变量系统
   - 新增主题只需定义 CSS 变量

3. **提升可维护性**
   - 代码更简洁易读
   - 主题管理更集中
   - 类型安全的主题配置

### 迁移对比

| 特性 | 原有系统 | 新系统 |
|------|----------|--------|
| 主题支持 | 固定颜色变量 | 多主题 + 亮/暗模式 |
| 样式管理 | 自定义 CSS | Tailwind 语义化类名 |
| 主题切换 | 静态 | 动态实时切换 |
| 扩展性 | 需修改 CSS | 只需定义变量 |
| 维护性 | 复杂 | 简洁统一 |

## 🌟 优势特性

### 清晰分层
- **主题/模式分离**：主题决定色彩基调，模式决定明暗
- **语义化设计**：组件无需关心具体颜色值
- **易于扩展**：新增主题或模式非常简单

### 开发友好
- **类型安全**：TypeScript 类型定义
- **实时预览**：主题切换器支持即时预览
- **调试简单**：清晰的变量命名和结构

### 用户体验
- **流畅切换**：CSS 过渡动画
- **响应式设计**：适配各种屏幕尺寸
- **无障碍支持**：语义化标签和颜色对比

## �� 许可证

MIT License 