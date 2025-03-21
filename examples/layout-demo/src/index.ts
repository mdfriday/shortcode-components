import express from 'express';
import {ShortcodeRenderer, PageRenderer} from '@mdfriday/shortcode-compiler';
import * as fs from 'fs';
import * as path from 'path';
import {ThemeManagerImpl} from '../../../src/theme';
import bootstrapDarkTheme from '../../../src/theme/themes/bootstrap-dark.json';
import bootstrapLightTheme from '../../../src/theme/themes/bootstrap-light.json';
import tailwindDarkTheme from '../../../src/theme/themes/tailwind-dark.json';
import tailwindLightTheme from '../../../src/theme/themes/tailwind-light.json';
import baseDarkTheme from '../../../src/theme/themes/base-dark.json';
import baseLightTheme from '../../../src/theme/themes/base-light.json';
import {registerButtonShortcode} from "../../../src/components/content/Button";
import {registerCardBannerShortcode} from "../../../src/components/content/CardBanner";
import {registerFormulaCardShortcode} from "../../../src/components/content/FormulaCard";
import {registerGridShortcode} from "../../../src/components/layout/Grid";
import {registerRowShortcode} from "../../../src/components/layout/Row";
import {registerColumnShortcode} from "../../../src/components/layout/Column";
import {registerBlockShortcode} from "../../../src/components/layout/Block";
import {registerContainerShortcode} from "../../../src/components/layout/Container";
// 创建主题管理器实例
const themeManager = new ThemeManagerImpl('');

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

const app = express();
const port = 3000;

// 设置静态文件目录，使styles目录可以通过/styles路径访问
app.use('/styles', express.static(path.join(__dirname, 'styles')));

// 创建渲染器实例
const renderer = new ShortcodeRenderer();

// 注册所有组件
registerButtonShortcode(renderer, themeManager);
registerCardBannerShortcode(renderer, themeManager);
registerFormulaCardShortcode(renderer, themeManager);
registerGridShortcode(renderer, themeManager);
registerRowShortcode(renderer, themeManager);
registerColumnShortcode(renderer, themeManager);
registerBlockShortcode(renderer, themeManager);
registerContainerShortcode(renderer, themeManager);

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
    <link rel="stylesheet" href="/styles/bootstrap.css">
    <style>
        /* Tailwind CSS */
        {{ tailwindCSS }}
    </style>
    <style>
    .col {
    padding-top: .75rem;
    padding-bottom: .75rem;
    background-color: rgba(112.520718, 44.062154, 249.437846, .15);
    border: 1px solid rgba(112.520718, 44.062154, 249.437846, .3);
    }
    </style>
</head>
<body class="{{ theme }}">
    <div>
        {{ content }}
    </div>
</body>
</html>
`;

// 渲染页面函数
async function renderPage(filePath: string, theme: string = 'base'): Promise<string> {
    // 读取示例 Markdown 文件
    const markdownContent = fs.readFileSync(filePath, 'utf-8');

    // 渲染 Markdown 内容
    const renderedContent = pageRenderer.render(markdownContent);

    // 获取生成的 Tailwind CSS
    const tailwindCSS = await themeManager.getAllCSS();

    // 替换模板变量
    let result = baseTemplate
        .replace('{{ title }}', 'Layout Demo')
        .replace('{{ description }}', 'A demo of layout components')
        .replace('{{ theme }}', `theme-${theme}`)
        .replace('{{ tailwindCSS }}', tailwindCSS);

    // 替换内容（确保 renderedContent.content 是字符串）
    if (renderedContent && renderedContent.content) {
        result = result.replace('{{ content }}', renderedContent.content);
    } else {
        result = result.replace('{{ content }}', '');
    }

    return result;
}

// 路由处理
app.get('/', async (req, res) => {
    try {
        const theme = (req.query.theme as string) || 'base';
        const html = await renderPage(path.join(__dirname, 'example.md'), theme);
        res.send(html);
    } catch (error) {
        console.error('Rendering error:', error);
        res.status(500).send('Error rendering page');
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 