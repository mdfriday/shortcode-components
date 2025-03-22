# Markdown 渲染服务

这是一个基于 TypeScript 和 Express 的 Web 服务，用于渲染使用 Shortcode 服务的 Markdown 文件。

## 功能特点

- 左侧展示 Markdown 文件列表
- 右侧展示选中文件的渲染结果
- 响应式设计，适配不同设备
- 使用 Shortcode 服务解析和渲染 Markdown 内容

## 安装依赖

在项目目录下运行以下命令安装依赖：

```bash
cd examples/formular
npm install
```

## 编译项目

```bash
npm run build
```

## 运行服务器

```bash
npm start
```

服务器将在 http://localhost:3001 上运行。

## 开发模式

要在开发模式下运行服务器（支持热重载），请运行：

```bash
npm run dev
```

## 项目结构

- `/src` - 包含服务器源代码和 Markdown 文件
- `/public` - 包含静态资源（CSS、JavaScript）
- `/views` - 包含 EJS 模板
- `/dist` - 编译后的 JavaScript 文件（运行 build 后生成）

## 技术栈

- TypeScript
- Express.js
- EJS 模板引擎
- Shortcode 服务 