import express from 'express';
import { ShortcodeRenderer, PageRenderer } from '@mdfriday/shortcode-compiler';
import * as fs from 'fs';
import * as path from 'path';
import { registerComponents, setCurrentTheme, getGeneratedCSS } from './components';

const app = express();
const port = 3000;

// 创建渲染器实例
const renderer = new ShortcodeRenderer();

// 注册所有组件
registerComponents(renderer);

// 创建页面渲染器
const pageRenderer = new PageRenderer(renderer);

// 基础 HTML 模板
const baseTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <meta name="description" content="{{ description }}">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Tailwind CSS */
        {{ tailwindCSS }}

        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
            color: #111827;
        }

        /* 基础布局样式 */
        .container {
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* 响应式布局 */
        @media (min-width: 640px) {
            .container {
                padding: 0 1.5rem;
            }
        }

        @media (min-width: 1024px) {
            .container {
                padding: 0 2rem;
            }
        }

        /* 导航样式 */
        .nav {
            background-color: white;
            border-bottom: 1px solid #e5e7eb;
            padding: 1rem 0;
            margin-bottom: 2rem;
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-brand {
            font-size: 1.25rem;
            font-weight: bold;
            color: #111827;
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            gap: 1rem;
        }

        .nav-link {
            color: #4b5563;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            transition: background-color 0.2s;
        }

        .nav-link:hover {
            background-color: #f3f4f6;
        }

        .nav-link.active {
            background-color: #e5e7eb;
            color: #111827;
        }

        /* 按钮基础样式 */
        .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            text-decoration: none;
            border-radius: 0.375rem;
            transition: all 0.2s;
            cursor: pointer;
        }

        .button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* 按钮变体 */
        .button-primary {
            background-color: #3b82f6;
            color: white;
        }

        .button-secondary {
            background-color: #6b7280;
            color: white;
        }

        .button-outline {
            border: 1px solid #3b82f6;
            color: #3b82f6;
            background-color: transparent;
        }

        .button-ghost {
            color: #3b82f6;
            background-color: transparent;
        }

        /* 按钮尺寸 */
        .button-sm {
            padding: 0.375rem 0.75rem;
            font-size: 0.875rem;
        }

        .button-md {
            padding: 0.5rem 1rem;
            font-size: 1rem;
        }

        .button-lg {
            padding: 0.75rem 1.5rem;
            font-size: 1.125rem;
        }

        /* 按钮悬停效果 */
        .button-primary:hover:not(:disabled),
        .button-secondary:hover:not(:disabled) {
            opacity: 0.9;
        }

        .button-outline:hover:not(:disabled) {
            background-color: #eff6ff;
        }

        .button-ghost:hover:not(:disabled) {
            background-color: #eff6ff;
        }

        /* 暗色主题样式 */
        body.theme-dark {
            background-color: #111827;
            color: #f9fafb;
        }

        body.theme-dark .nav {
            background-color: #1f2937;
            border-bottom-color: #374151;
        }

        body.theme-dark .nav-brand {
            color: #f9fafb;
        }

        body.theme-dark .nav-link {
            color: #9ca3af;
        }

        body.theme-dark .nav-link:hover {
            background-color: #374151;
        }

        body.theme-dark .nav-link.active {
            background-color: #4b5563;
            color: #f9fafb;
        }

        /* 暗色主题按钮样式 */
        body.theme-dark .button-primary {
            background-color: #2563eb;
        }

        body.theme-dark .button-secondary {
            background-color: #4b5563;
        }

        body.theme-dark .button-outline {
            border-color: #60a5fa;
            color: #60a5fa;
        }

        body.theme-dark .button-ghost {
            color: #60a5fa;
        }

        body.theme-dark .button-outline:hover:not(:disabled) {
            background-color: rgba(37, 99, 235, 0.1);
        }

        body.theme-dark .button-ghost:hover:not(:disabled) {
            background-color: rgba(37, 99, 235, 0.1);
        }
    </style>
</head>
<body class="{{ theme }}">
    <nav class="nav">
        <div class="container nav-container">
            <a href="/" class="nav-brand">Layout Demo</a>
            <div class="nav-links">
                <a href="/?theme=base" class="nav-link{{ theme === 'theme-base' ? ' active' : '' }}">Base Theme</a>
                <a href="/?theme=light" class="nav-link{{ theme === 'theme-light' ? ' active' : '' }}">Light Theme</a>
                <a href="/?theme=dark" class="nav-link{{ theme === 'theme-dark' ? ' active' : '' }}">Dark Theme</a>
            </div>
        </div>
    </nav>
    <div class="container">
        {{ content }}
    </div>
</body>
</html>
`;

// 渲染页面函数
async function renderPage(filePath: string, theme: string = 'base'): Promise<string> {
    // 设置当前主题
    await setCurrentTheme(theme);

    // 读取 Markdown 文件内容
    const content = fs.readFileSync(filePath, 'utf-8');

    // 渲染 Markdown 内容
    const renderedContent = pageRenderer.render(content).content;

    // 获取生成的 CSS
    const tailwindCSS = await getGeneratedCSS();

    // 替换模板变量
    return baseTemplate
        .replace('{{ title }}', 'Layout Demo')
        .replace('{{ description }}', 'A demo of layout components')
        .replace('{{ theme }}', `theme-${theme}`)
        .replace('{{ tailwindCSS }}', tailwindCSS)
        .replace('{{ content }}', renderedContent);
}

// 设置路由
app.get('/', async (req, res) => {
    try {
        const theme = req.query.theme as string || 'base';
        const html = await renderPage(path.join(__dirname, 'example.md'), theme);
        res.send(html);
    } catch (error) {
        console.error('Error rendering page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 