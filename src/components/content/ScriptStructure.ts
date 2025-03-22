import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import {ThemeManager} from '../../theme';

// CSS styles with the component class prefix for isolation
const scriptStructureStyles = `
.mdfScriptStructure-container {
    font-family: Arial, sans-serif;
    padding: 30px 20px 0;
    background-color: #ffffff;
    max-width: 800px;
    margin: 0 auto;
}

.mdfScriptStructure-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.mdfScriptStructure-header-title {
    font-size: 17px;
    color: #333;
}

.mdfScriptStructure-header-logo {
    font-size: 17px;
    font-weight: bold;
}

.mdfScriptStructure-section {
    margin-bottom: 0;
}

.mdfScriptStructure-section-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.mdfScriptStructure-section-number {
    background-color: #FFB6C1;
    color: black;
    padding: 5px 15px;
    font-size: 28px;
    margin-right: 15px;
}

.mdfScriptStructure-section-name {
    font-size: 28px;
    font-weight: bold;
}

.mdfScriptStructure-subtitle {
    font-size: 18px;
    color: #666;
    margin-left: 10px;
}

.mdfScriptStructure-structure-box {
    border: 1px solid #FFD700;
    border-radius: 8px;
    margin: 10px 0;
}

.mdfScriptStructure-flow-item {
    background-color: #FFE4B5;
    margin: 5px auto;
    text-align: center;
    width: fit-content;
    min-width: 150px;
    border-radius: 4px;
}

.mdfScriptStructure-number-circle {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 1px solid #000;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    margin-right: 10px;
}

.mdfScriptStructure-structure-title {
    font-size: 20px;
    font-weight: bold;
    border-bottom: 2px solid #000;
    display: inline-block;
    padding-bottom: 5px;
    margin-bottom: 10px;
}

.mdfScriptStructure-plus-sign {
    display: block;
    text-align: center;
    font-size: 10px;
    color: #666;
    margin: 5px 0;
}

.mdfScriptStructure-page-number {
    text-align: center;
    color: #666;
    margin-top: 20px;
}
`;

/**
 * Register ScriptStructure component shortcodes
 * @param renderer shortcode renderer
 */
export function registerScriptStructureShortcode(renderer: ShortcodeRenderer, theme: ThemeManager) {
    // Register the main mdfScriptStructure shortcode
    renderer.registerTemplateShortcode('mdfScriptStructure', {
        template: `
<style>
${scriptStructureStyles}
</style>
<div class="mdfScriptStructure-container">
    <div class="mdfScriptStructure-header">
        <div class="mdfScriptStructure-header-title">{{ .Get "title" }}</div>
        <div class="mdfScriptStructure-header-logo">{{ .Get "brand" }}</div>
    </div>

    <div class="mdfScriptStructure-section">
        <div class="mdfScriptStructure-section-title">
            <div class="mdfScriptStructure-section-number">{{ .Get "number" }}</div>
            <div class="mdfScriptStructure-section-name">{{ .Get "name" }}</div>
            {{ if .Get "subtitle" }}
            <div class="mdfScriptStructure-subtitle">{{ .Get "subtitle" }}</div>
            {{ end }}
        </div>

        {{ .Inner }}
    </div>

    {{ if .Get "pageNumber" }}
    <div class="mdfScriptStructure-page-number">- {{ .Get "pageNumber" }} -</div>
    {{ end }}
</div>
`,
        funcMap: commonFuncMap,
        dataProvider: (params: string[], content?: string) => {
            return {
                Inner: content
            };
        }
    });

    // Register the structure block shortcode (to be used inside mdfScriptStructure)
    renderer.registerTemplateShortcode('mdfScriptStructureBlock', {
        template: `
<div>
    <div class="mdfScriptStructure-structure-title">
        <span class="mdfScriptStructure-number-circle">{{ .Get "number" }}</span>
        {{ .Get "title" }}
    </div>
    <div class="mdfScriptStructure-structure-box">
        {{ $usePlus := (.Get "usePlusSigns") }}
        {{ range $index, $item := split (.Get "flowItems") "|" }}
        {{ if eq $usePlus "true" }}
        {{ if gt $index 0 }}
        <div class="mdfScriptStructure-plus-sign">+</div>
        {{ end }}
        {{ end }}
        
        <div class="mdfScriptStructure-flow-item">{{ $item }}</div>
        {{ end }}
    </div>
</div>
`,
        funcMap: commonFuncMap,
        dataProvider: (params: string[], content?: string) => {
            return {
                Inner: content
            };
        }
    });
}

const commonFuncMap = new Map<string, (...args: any[]) => any>([
    ['split', (str: string, sep: string) => str.split(sep)],
    ['eq', (a: any, b: any) => a === b],
    ['len', (arr: any[]) => arr.length],
    ['lt', (a: number, b: number) => a < b],
    ['sub', (a: number, b: number) => a - b]
]); 