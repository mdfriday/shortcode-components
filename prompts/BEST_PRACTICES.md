# 主题系统最佳实践总结

## 🎯 三层架构严格分离

### 1. 基础令牌层：原子化设计

**原则：只补充 Tailwind 没有的，使用原子化命名**

```css
:root {
  /* ✅ 正确：原子化命名，补充 Tailwind 空隙 */
  --gray-150: #f5f5f5;    /* 介于 gray-100 和 gray-200 之间 */
  --gray-350: #c0c0c0;    /* 介于 gray-300 和 gray-400 之间 */
  --navy-600: #006699;    /* Tailwind 没有的深蓝色 */
  --pink-550: #d6336c;    /* 特定色调 */
  
  /* ❌ 错误：包含使用场景 */
  --newspaper-gray-light: #f5f5f5;
  --header-background-color: #f5f5f5;
  --sidebar-text-color: #333333;
}
```

**基础令牌命名规范：**
- ✅ `--gray-150`, `--blue-550`, `--green-350`
- ✅ `--brand-coral`, `--brand-sage`（品牌特色色）
- ❌ `--primary-color`, `--background-light`
- ❌ `--newspaper-gray`, `--sidebar-color`

### 2. 语义主题层：业务抽象

**原则：使用语义化变量，引用基础令牌和 Tailwind 令牌**

```css
.theme-newspaper {
  /* ✅ 正确：语义化变量，引用基础令牌 */
  --background: var(--gray-150);
  --foreground: theme('colors.gray.800');
  --primary: theme('colors.gray.800');
  --accent: var(--navy-600);
  
  /* ✅ 正确：主题特定的语义变量 */
  --container-bg: var(--gray-350);
  --article-bg: var(--gray-150);
  --link-color: var(--navy-600);
  
  /* ❌ 错误：直接使用颜色值 */
  --background: #f5f5f5;
  --primary: #333333;
}
```

### 3. 组件层：混合使用策略

**原则：基础令牌用类名，语义变量用任意值**

```html
<!-- ✅ 推荐：混合使用策略 -->
<div class="bg-[rgb(var(--container-bg))] p-4">
  <article class="bg-[rgb(var(--article-bg))] p-8">
    <!-- 基础令牌可以直接使用类名 -->
    <span class="text-navy-600 bg-gray-150">
      链接文本
    </span>
    <!-- 语义变量使用任意值语法 -->
    <h1 class="text-[rgb(var(--foreground))]">
      标题
    </h1>
  </article>
</div>
```

## 📋 配置文件策略

### Tailwind 配置中应该定义什么？

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // ✅ 基础原子化令牌
        'gray-150': 'var(--gray-150)',
        'gray-350': 'var(--gray-350)',
        'navy-600': 'var(--navy-600)',
        'pink-550': 'var(--pink-550)',
        
        // ✅ 品牌特色色
        'brand-coral': 'var(--brand-coral)',
        'brand-sage': 'var(--brand-sage)',
        
        // ❌ 不要定义语义变量
        // 'background': 'var(--background)',
        // 'primary': 'var(--primary)',
      }
    }
  }
}
```

**原则：**
- ✅ **基础令牌**：注册到配置文件，享受完整 Tailwind 体验
- ❌ **语义变量**：使用任意值语法，保持配置文件简洁

## 🎨 使用策略对比

| 令牌类型 | 定义位置 | 使用方式 | 示例 |
|---------|----------|----------|------|
| **基础令牌** | `:root` + 配置文件 | 直接类名 | `bg-gray-150` `text-navy-600` |
| **语义变量** | 主题类中 | 任意值语法 | `bg-[rgb(var(--background))]` |

## 🔍 判断标准

### 什么应该是基础令牌？

```css
/* ✅ 基础令牌的特征 */
--gray-150: #f5f5f5;          /* 原子化，补充颜色系统 */
--space-18: 4.5rem;           /* 补充间距系统 */
--font-display: "Inter";      /* 自定义字体 */
--brand-coral: #ff6b6b;       /* 品牌特色色 */
```

### 什么应该是语义变量？

```css
/* ✅ 语义变量的特征 */
--background: var(--gray-150);     /* 组合基础令牌 */
--primary: theme('colors.blue.500'); /* 引用 Tailwind */
--container-bg: var(--gray-350);   /* 主题特定语义 */
```

## 🚀 迁移指南

### 从传统 CSS 迁移

1. **分析原有颜色值**
   ```css
   /* 原始 CSS */
   .container { background: #f5f5f5; }
   .header { color: #333333; }
   ```

2. **创建基础令牌**
   ```css
   :root {
     --gray-150: #f5f5f5;
     /* #333333 使用 Tailwind 的 gray-800 */
   }
   ```

3. **定义语义主题**
   ```css
   .theme-app {
     --container-bg: var(--gray-150);
     --header-color: theme('colors.gray.800');
   }
   ```

4. **更新组件使用**
   ```html
   <div class="bg-[rgb(var(--container-bg))]">
     <h1 class="text-[rgb(var(--header-color))]">标题</h1>
   </div>
   ```

## ❗ 常见错误

### 1. 基础令牌包含语义

```css
/* ❌ 错误 */
--primary-blue: #006699;
--sidebar-background: #f5f5f5;

/* ✅ 正确 */
--navy-600: #006699;
--gray-150: #f5f5f5;
```

### 2. 配置文件定义语义变量

```javascript
/* ❌ 错误 */
colors: {
  'primary': 'var(--primary)',
  'background': 'var(--background)',
}

/* ✅ 正确 */
colors: {
  'navy-600': 'var(--navy-600)',
  'gray-150': 'var(--gray-150)',
}
```

### 3. 混淆使用策略

```html
<!-- ❌ 错误：基础令牌用任意值 -->
<div class="bg-[rgb(var(--gray-150))]">

<!-- ✅ 正确：基础令牌用类名 -->
<div class="bg-gray-150">

<!-- ❌ 错误：语义变量注册到配置 -->
<div class="bg-primary">

<!-- ✅ 正确：语义变量用任意值 -->
<div class="bg-[rgb(var(--primary))]">
```

## 🎯 总结

遵循这些最佳实践，可以构建出既符合 Tailwind 设计哲学，又具备强大主题化能力的现代 CSS 架构：

1. **基础令牌层**：原子化、补充性、可复用
2. **语义主题层**：业务化、组合性、可切换  
3. **组件层**：混合策略、最佳体验、高效开发

这样的架构既保持了 Tailwind 的开发体验，又提供了企业级主题系统的灵活性！ 