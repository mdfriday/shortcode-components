import express from 'express';
import {ShortcodeRenderer, PageRenderer} from '@mdfriday/shortcode-compiler';
import * as fs from 'fs';
import * as path from 'path';
import {ThemeManagerImpl} from '../../../src/themes';
import bootstrapDarkTheme from '../../../src/themes/jsons/bootstrap-dark.json';
import bootstrapLightTheme from '../../../src/themes/jsons/bootstrap-light.json';
import tailwindDarkTheme from '../../../src/themes/jsons/tailwind-dark.json';
import tailwindLightTheme from '../../../src/themes/jsons/tailwind-light.json';
import baseDarkTheme from '../../../src/themes/jsons/base-dark.json';
import baseLightTheme from '../../../src/themes/jsons/base-light.json';

// Import component registration functions
import {registerButtonShortcode} from "../../../src/components/customize/Button";
import {registerCardBanner} from "../../../src/components/customize/CardBanner";
import {registerFormulaPair} from "../../../src/components/customize/FormulaPair";
import {registerFormulaSingle} from "../../../src/components/customize/FormulaSingle";
import {registerFormulaFlow} from "../../../src/components/customize/FormulaFlow";
import {registerRankingFishingCard001} from "../../../src/components/customize/RankingFishingCard001";
import {registerMasterPoster001} from "../../../src/components/customize/MasterPoster001";
import {registerToyotaA3Template001} from "../../../src/components/customize/ToyotaA3Template001";
import {registerCornellNotes001} from "../../../src/components/customize/CornellNotes001";
import {registerMcKinseyMethod001} from "../../../src/components/customize/McKinseyMethod001";
import {registerStorytellingInfoCard001} from "../../../src/components/customize/Storytelling-InfoCard-001";
import {registerGridShortcode} from "../../../src/components/layout/Grid";
import {registerRowShortcode} from "../../../src/components/layout/Row";
import {registerColumnShortcode} from "../../../src/components/layout/Column";
import {registerBlockShortcode} from "../../../src/components/layout/Block";
import {registerContainerShortcode} from "../../../src/components/layout/Container";

// Create theme manager instance
const themeManager = new ThemeManagerImpl('');

// Preload themes
const themes = [
    bootstrapDarkTheme,
    bootstrapLightTheme,
    tailwindDarkTheme,
    tailwindLightTheme,
    baseDarkTheme,
    baseLightTheme
];
themeManager.preloadThemes(themes);

// Set default theme
themeManager.setCurrentTheme('bootstrap', 'light');

const app = express();
const port = 3000;

// Set static file directories
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Create renderer instance
const renderer = new ShortcodeRenderer();

// Register all components
registerButtonShortcode(renderer, themeManager);
registerCardBanner(renderer, themeManager);
registerFormulaPair(renderer, themeManager);
registerFormulaSingle(renderer, themeManager);
registerFormulaFlow(renderer, themeManager);
registerRankingFishingCard001(renderer, themeManager);
registerMasterPoster001(renderer, themeManager);
registerToyotaA3Template001(renderer, themeManager);
registerCornellNotes001(renderer, themeManager);
registerMcKinseyMethod001(renderer, themeManager);
registerStorytellingInfoCard001(renderer, themeManager);
registerGridShortcode(renderer, themeManager);
registerRowShortcode(renderer, themeManager);
registerColumnShortcode(renderer, themeManager);
registerBlockShortcode(renderer, themeManager);
registerContainerShortcode(renderer, themeManager);

// Create page renderer
const pageRenderer = new PageRenderer(renderer);

// Base HTML template
const baseTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <meta name="description" content="{{ description }}">
    <link rel="stylesheet" href="/styles/main.css">
    <style>
        /* Tailwind CSS */
        {{ tailwindCSS }}
    </style>
</head>
<body class="{{ theme }}">
    <div class="sidebar">
        <h1>组件展示</h1>
        <div class="theme-switcher">
            <label for="theme-select">主题:</label>
            <select id="theme-select" onchange="window.location.href='?component={{ component }}&theme='+this.value">
                <option value="base" {{ baseSelected }}>Base</option>
                <option value="bootstrap" {{ bootstrapSelected }}>Bootstrap</option>
                <option value="tailwind" {{ tailwindSelected }}>Tailwind</option>
            </select>
        </div>
        <ul>
            <li><a href="/?component=index" class="{{ indexActive }}">首页</a></li>
            <li><a href="/?component=cardbanner" class="{{ cardbannerActive }}">CardBanner</a></li>
            <li><a href="/?component=formulaflow" class="{{ formulaflowActive }}">FormulaFlow</a></li>
            <li><a href="/?component=formulapair" class="{{ formulapairActive }}">FormulaPair</a></li>
            <li><a href="/?component=formulasingle" class="{{ formulasingleActive }}">FormulaSingle</a></li>
            <li><a href="/?component=rankingfishingcard" class="{{ rankingfishingcardActive }}">RankingFishingCard</a></li>
            <li><a href="/?component=masterposter" class="{{ masterposterActive }}">MasterPoster</a></li>
            <li><a href="/?component=toyotaa3template" class="{{ toyotaa3templateActive }}">ToyotaA3Template</a></li>
            <li><a href="/?component=cornellnotes" class="{{ cornellnotesActive }}">CornellNotes</a></li>
            <li><a href="/?component=mckinseymethod" class="{{ mckinseyMethodActive }}">McKinseyMethod</a></li>
            <li><a href="/?component=storytellinginfocard" class="{{ storytellinginfocardActive }}">StorytellingInfoCard</a></li>
        </ul>
    </div>
    <div class="content">
        {{ content }}
    </div>
</body>
</html>
`;

// Helper function to check if a file exists
function fileExists(filePath: string): boolean {
    try {
        return fs.statSync(filePath).isFile();
    } catch (error) {
        return false;
    }
}

// Render page function
async function renderPage(component: string, theme: string = 'base'): Promise<string> {
    // Determine which component to render
    const componentFile = component === 'index' ? 'index' : component;
    const filePath = path.join(__dirname, `components/${componentFile}.md`);
    
    // Check if file exists, otherwise use index
    const markdownPath = fileExists(filePath) ? filePath : path.join(__dirname, 'components/index.md');
    
    // Read markdown customize
    const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

    // Extract frontmatter metadata (title and description)
    const frontmatterMatch = markdownContent.match(/^---\n([\s\S]*?)\n---/);
    let title = 'Components Showcase';
    let description = 'A showcase of MDFriday shortcode components';
    
    if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const titleMatch = frontmatter.match(/title:\s*(.+)/);
        const descMatch = frontmatter.match(/description:\s*(.+)/);
        
        if (titleMatch) title = titleMatch[1].trim();
        if (descMatch) description = descMatch[1].trim();
    }

    // Render markdown customize
    const renderedContent = pageRenderer.render(markdownContent);

    // Get generated Tailwind CSS with error handling
    let tailwindCSS = '';
    try {
        tailwindCSS = await themeManager.getAllCSS();
    } catch (error) {
        console.warn('Error generating theme CSS - using fallback styles', error);
        // Provide basic fallback CSS for buttons
        tailwindCSS = `
            .btn { 
                display: inline-block; 
                padding: 0.375rem 0.75rem; 
                font-size: 1rem; 
                font-weight: 400; 
                line-height: 1.5; 
                text-align: center; 
                text-decoration: none; 
                vertical-align: middle; 
                cursor: pointer; 
                border: 1px solid transparent; 
                border-radius: 0.25rem; 
            }
            .btn-primary { background-color: #0d6efd; color: #fff; }
            .btn-secondary { background-color: #6c757d; color: #fff; }
            .btn-success { background-color: #198754; color: #fff; }
            .btn-danger { background-color: #dc3545; color: #fff; }
            .btn-warning { background-color: #ffc107; color: #000; }
            .btn-info { background-color: #0dcaf0; color: #000; }
            .btn-light { background-color: #f8f9fa; color: #000; }
            .btn-dark { background-color: #212529; color: #fff; }
            .btn-link { color: #0d6efd; text-decoration: underline; }
            .rounded-pill { border-radius: 50rem; }
        `;
    }

    // Set active states
    const activeStates: Record<string, string> = {
        indexActive: '',
        cardbannerActive: '',
        formulaflowActive: '',
        formulapairActive: '',
        formulasingleActive: '',
        rankingfishingcardActive: '',
        masterposterActive: '',
        toyotaa3templateActive: '',
        cornellnotesActive: '',
        mckinseyMethodActive: '',
        storytellinginfocardActive: ''
    };
    
    // Set the active component
    const activeKey = `${component === 'index' ? 'index' : component}Active`;
    if (activeStates.hasOwnProperty(activeKey)) {
        activeStates[activeKey] = 'active';
    }

    // Set theme selection
    const themeStates = {
        baseSelected: theme === 'base' ? 'selected' : '',
        bootstrapSelected: theme === 'bootstrap' ? 'selected' : '',
        tailwindSelected: theme === 'tailwind' ? 'selected' : ''
    };

    // Replace template variables
    let result = baseTemplate
        .replace('{{ title }}', title)
        .replace('{{ description }}', description)
        .replace('{{ theme }}', `theme-${theme}`)
        .replace('{{ tailwindCSS }}', tailwindCSS)
        .replace('{{ component }}', component);

    // Replace active states
    for (const [key, value] of Object.entries(activeStates)) {
        result = result.replace(`{{ ${key} }}`, value);
    }

    // Replace theme states
    for (const [key, value] of Object.entries(themeStates)) {
        result = result.replace(`{{ ${key} }}`, value);
    }

    // Replace customize
    if (renderedContent && renderedContent.content) {
        result = result.replace('{{ content }}', `<div class="component-preview">${renderedContent.content}</div>`);
    } else {
        result = result.replace('{{ content }}', '<div class="component-preview">No customize to display</div>');
    }

    return result;
}

// Route handling
app.get('/', async (req, res) => {
    try {
        const component = (req.query.component as string) || 'index';
        const theme = (req.query.theme as string) || 'base';
        
        // Set the current theme
        try {
            themeManager.setCurrentTheme(theme, 'light');
        } catch (error) {
            console.warn(`Error setting theme ${theme}:`, error);
            // Continue with default theme if there's an error
        }
        
        const html = await renderPage(component, theme);
        res.send(html);
    } catch (error) {
        console.error('Rendering error:', error);
        
        // Send a user-friendly error page
        const errorHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error - Components Showcase</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                    line-height: 1.6;
                }
                .error-container {
                    background-color: #fff3f3;
                    border-left: 5px solid #e74c3c;
                    padding: 20px;
                    margin: 20px 0;
                }
                h1 {
                    color: #e74c3c;
                }
                pre {
                    background-color: #f8f8f8;
                    padding: 15px;
                    border-radius: 5px;
                    overflow-x: auto;
                }
                a {
                    color: #3498db;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <h1>Oops! Something went wrong</h1>
            <div class="error-container">
                <p>The application encountered an error while trying to render the page.</p>
                <p>This might be due to:</p>
                <ul>
                    <li>Missing image files in the public/images directory</li>
                    <li>Theme configuration issues</li>
                    <li>Component rendering problems</li>
                </ul>
            </div>
            <p>Please check the console for more detailed error information.</p>
            <p><a href="/">Return to homepage</a></p>
            <h2>Technical Details</h2>
            <pre>${error instanceof Error ? error.stack || error.message : String(error)}</pre>
        </body>
        </html>
        `;
        
        res.status(500).send(errorHtml);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 