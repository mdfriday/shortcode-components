# 主题管理系统示例

这个示例项目展示了主题管理系统的功能和用法。您可以在浏览器中查看不同主题和组件样式的效果。

## 功能

- 切换不同的主题（Tailwind、Bootstrap）
- 切换明暗模式
- 查看不同组件的样式变体
- 实时查看生成的CSS

## 运行示例

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

这将自动打开浏览器并访问 `http://localhost:9000`。

### 构建生产版本

```bash
npm run build
```

构建后的文件将位于 `dist` 目录中。

## 项目结构

- `src/theme-system/` - 主题管理系统的核心代码
- `src/components/` - 示例组件
- `src/styles/` - 全局样式
- `src/index.ts` - 应用入口
- `src/index.html` - HTML模板

## 自定义

您可以通过修改 `src/index.ts` 文件中的 `components` 数组来添加或修改组件变体。

```typescript
const components = [
  {
    name: 'button',
    title: 'Buttons',
    variants: [
      { variant: 'primary', size: 'md', text: 'Primary' },
      // 添加更多变体...
    ]
  },
  // 添加更多组件...
];
``` 