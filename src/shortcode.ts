import {ShortcodeRenderer, PageRenderer} from '@mdfriday/shortcode-compiler';
import {registerCardBanner, registerFormulaSingle,
    registerFormulaPair, registerFormulaFlow} from './components';
import {Theme} from './theme';
import {ThemeManager} from "./themes";

export class Shortcode {
    private readonly themeManager: ThemeManager;
    private readonly renderer: ShortcodeRenderer;
    private readonly pageRenderer: PageRenderer;

    constructor() {
        this.themeManager = new Theme('mdf').manager();
        this.renderer = new ShortcodeRenderer();

        // 注册内置 shortcodes
        registerCardBanner(this.renderer, this.themeManager);
        registerFormulaPair(this.renderer, this.themeManager);
        registerFormulaSingle(this.renderer, this.themeManager);
        registerFormulaFlow(this.renderer, this.themeManager);

        this.pageRenderer = new PageRenderer(this.renderer);
    }

    /**
     * 解析 markdown 并渲染 shortcodes
     */
    render(markdownContent: string): string {
        // 渲染 Markdown 内容
        const renderedContent = this.pageRenderer.render(markdownContent);

        return renderedContent.content
    }
}
