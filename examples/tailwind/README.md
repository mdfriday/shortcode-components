# 🏗️ 重构后的多主题 Pokemon 卡片系统

这个项目展示了基于 **Tailwind 基础令牌** 的优化主题系统，充分利用 Tailwind CSS 的设计令牌，避免重复定义已有的设计系统。支持主题 (base, fire, ocean, electric, grass) 和模式 (light, dark) 的组合切换。

## 🎯 重构亮点

### 🔧 基于 Tailwind 基础令牌
- **充分利用 Tailwind 设计系统**：使用 `theme('colors.blue.500')` 等 Tailwind 函数
- **避免重复定义**：不再硬编码颜色值，直接引用 Tailwind 的色彩系统
- **标准化类名**：使用 `primary-foreground` 而不是 `primaryForeground`
- **语义化变量**：通过 CSS 变量映射到 Tailwind 令牌

### 🎨 优化的分层架构
```
Tailwind 基础令牌 (colors.blue.500, spacing.4, etc.)
  ↓
语义化 CSS 变量 (--primary, --background, etc.)
  ↓
Tailwind 语义化类名 (bg-primary, text-foreground, etc.)
  ↓
组件实现 (Pokemon 卡片, CTA 表单, 主题切换器)
```

### 🚀 核心特性
- **5 种主题风格**：base, fire, ocean, electric, grass
- **亮/暗模式**：每个主题都支持 light 和 dark 两种模式
- **实时切换**：支持动态主题和模式切换
- **类型安全**：TypeScript 类型定义和验证
- **性能优化**：基于 Tailwind 的高效 CSS 生成

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
│   │   └── input.css             # 基于 Tailwind 令牌的主题定义
│   ├── components/
│   │   └── pokemon.ts            # 重构后的 Pokemon 组件
│   ├── theme-manager.ts          # 优化的主题管理器
│   └── index.ts                  # 入口文件
├── content/
│   └── index.md                  # 主页内容
├── tailwind.config.js            # 优化的 Tailwind 配置
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 主题系统架构

### 支持的主题
- **base**: 默认蓝色主题 (基于 Tailwind 蓝色和灰色系)
- **fire**: 火系红色主题 (基于 Tailwind 红色系)
- **ocean**: 海洋蓝色主题 (基于 Tailwind 蓝色系)
- **electric**: 电系黄色主题 (基于 Tailwind 黄色系)
- **grass**: 草系绿色主题 (基于 Tailwind 绿色系)

### 支持的模式
- **light**: 亮色模式
- **dark**: 暗色模式

### 🎯 基于 Tailwind 令牌的 CSS 变量定义
```css
.theme-fire {
  /* 直接使用 Tailwind 令牌 */
  --background: theme('colors.red.50');
  --foreground: theme('colors.red.900');
  --primary: theme('colors.red.500');
  --primary-foreground: theme('colors.white');
  --shadow: theme('boxShadow.md');
  /* ... 更多变量 */
}

.theme-fire.dark {
  /* 暗色模式使用对应的暗色令牌 */
  --background: theme('colors.red.950');
  --foreground: theme('colors.red.50');
  --primary: theme('colors.red.400');
  --shadow: theme('boxShadow.lg');
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

### 主题切换器

```markdown
{{< themeSwitcher >}}
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

### 🎯 优化的 Tailwind 配置
```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        // 使用嵌套对象结构，支持 DEFAULT 和 foreground
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        // 利用 Tailwind 基础令牌作为后备
        boxShadow: {
          'theme': 'var(--shadow, theme("boxShadow.md"))',
        },
        // ... 更多语义化颜色
      }
    }
  }
}
```

### 🎨 主题管理器
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

### 🧩 组件实现
组件完全使用标准化 Tailwind 语义化类名：

```html
<div class="bg-primary text-primary-foreground">
  <h2 class="text-2xl font-bold text-foreground">标题</h2>
  <div class="bg-surface text-surface-foreground border border-border rounded-lg p-4">
    <p class="text-muted-foreground">内容</p>
  </div>
</div>
```

## 🔄 重构对比

### 重构前 vs 重构后

| 特性 | 重构前 | 重构后 |
|------|--------|--------|
| 颜色定义 | 硬编码 RGB 值 | 基于 Tailwind 令牌 |
| 类名格式 | `primaryForeground` | `primary-foreground` |
| 样式管理 | 自定义 CSS + @apply | 直接使用语义化类名 |
| 主题扩展 | 需修改多处 CSS | 只需定义 CSS 变量 |
| 维护性 | 复杂，容易出错 | 简洁，类型安全 |
| 性能 | 自定义样式较多 | 充分利用 Tailwind 优化 |

### 🎯 重构优势

1. **减少重复代码**：不再重复定义 Tailwind 已有的颜色
2. **提升一致性**：所有颜色都基于 Tailwind 设计系统
3. **增强可维护性**：修改主题只需调整 CSS 变量
4. **改善开发体验**：标准化类名，更好的 IDE 支持
5. **优化性能**：更小的 CSS 文件，更好的缓存

## 🌟 最佳实践

### 清晰分层
- **Tailwind 令牌层**：基础设计令牌
- **语义变量层**：主题相关的 CSS 变量
- **组件层**：使用语义化类名的组件

### 开发友好
- **类型安全**：TypeScript 类型定义
- **实时预览**：支持热重载的开发环境
- **调试工具**：浏览器控制台中的主题管理器

### 扩展性
- **新增主题**：只需定义新的 CSS 变量
- **自定义组件**：遵循相同的语义化类名规范
- **第三方集成**：兼容其他 Tailwind 插件

## 📚 相关资源

- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [CSS 自定义属性 (变量)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [设计令牌最佳实践](https://spectrum.adobe.com/page/design-tokens/)

---

🎨 **享受基于 Tailwind 基础令牌的优雅主题系统！** 