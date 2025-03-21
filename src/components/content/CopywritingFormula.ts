import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import {ThemeManager} from '../../theme';

// CSS styles with the component class prefix for isolation
const copywritingFormulaStyles = `
.mdfCopywritingFormula-container {
    max-width: 1280px;
    margin: 0 auto;
    overflow-x: hidden;
    font-family: 'Microsoft YaHei', Arial, sans-serif;
    line-height: 1.4;
    font-size: 16px;
}

.mdfCopywritingFormula-container * {
    box-sizing: border-box;
}

.mdfCopywritingFormula-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #e0e0e0;
}

.mdfCopywritingFormula-header h1 {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
}

.mdfCopywritingFormula-header .brand {
    font-size: 20px;
    font-weight: bold;
}

.mdfCopywritingFormula-main-title {
    background-color: #f9f0f3;
    padding: 10px 15px;
    display: flex;
    align-items: center;
}

.mdfCopywritingFormula-main-title .mdfCopywritingFormula-number {
    font-size: 36px;
    font-weight: bold;
    color: #e79cb0;
    margin-right: 10px;
}

.mdfCopywritingFormula-main-title h2 {
    font-size: 28px;
    font-weight: bold;
    margin: 0;
}

.mdfCopywritingFormula-formula {
    background-color: #f9f9f9;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.mdfCopywritingFormula-formula-item {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    position: relative;
    margin: 5px;
}

.mdfCopywritingFormula-formula-item:after {
    content: "+";
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
}

.mdfCopywritingFormula-formula-item:last-child:after {
    display: none;
}

.mdfCopywritingFormula-formula-item span {
    display: block;
    border-bottom: 2px solid #000;
    padding-bottom: 3px;
    white-space: nowrap;
}

.mdfCopywritingFormula-case-analysis {
    padding: 10px 15px;
}

.mdfCopywritingFormula-case-analysis h3 {
    font-size: 24px;
    font-weight: bold;
    margin: 10px 0;
}

.mdfCopywritingFormula-point {
    display: flex;
}

.mdfCopywritingFormula-point-number {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    min-width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #000;
    border-radius: 50%;
    flex-shrink: 0;
}

.mdfCopywritingFormula-point-content {
    flex: 1;
}

.mdfCopywritingFormula-point-title {
    font-size: 18px;
    font-weight: bold;
    background-color: #b8e2f2;
    padding: 3px 10px;
    margin-bottom: 5px;
    display: inline-block;
}

.mdfCopywritingFormula-point-text {
    display: flex;
    flex-direction: column;
}

.mdfCopywritingFormula-point-description {
    margin-bottom: 5px;
    font-size: 14px;
}

.mdfCopywritingFormula-point-example {
    font-size: 14px;
    background-color: rgba(231, 156, 176, 0.1);
    padding: 5px;
    border-left: 3px solid #e79cb0;
}

.mdfCopywritingFormula-footer {
    font-size: 14px;
    padding: 10px 15px;
    margin-top: 10px;
    background-color: #f9f9f9;
}

.mdfCopywritingFormula-footer p {
    margin: 5px 0;
}

.mdfCopywritingFormula-page-number {
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
    color: #888;
}

/* Desktop Styles */
@media (min-width: 480px) {
    .mdfCopywritingFormula-container {
        font-size: 18px;
    }
    
    .mdfCopywritingFormula-header {
        padding: 30px 30px 0;
    }
    
    .mdfCopywritingFormula-header h1 {
        font-size: 17px;
    }
    
    .mdfCopywritingFormula-header .brand {
        font-size: 17px;
    }
    
    .mdfCopywritingFormula-main-title {
        padding: 10px 30px;
    }
    
    .mdfCopywritingFormula-main-title .mdfCopywritingFormula-number {
        font-size: 28px;
        margin-right: 15px;
    }
    
    .mdfCopywritingFormula-main-title h2 {
        font-size: 28px;
    }
    
    .mdfCopywritingFormula-formula {
        padding: 10px 30px;
    }
    
    .mdfCopywritingFormula-formula-item {
        font-size: 20px;
        margin: 0 10px;
    }
    
    .mdfCopywritingFormula-formula-item:after {
        right: -15px;
    }
    
    .mdfCopywritingFormula-case-analysis {
        padding: 0 30px;
    }
    
    .mdfCopywritingFormula-case-analysis h3 {
        font-size: 22px;
        margin-bottom: 10px;
        margin-top: 0;
    }
    
    .mdfCopywritingFormula-point-number {
        font-size: 13px;
        margin-right: 15px;
        width: 30px;
        height: 30px;
    }
    
    .mdfCopywritingFormula-point-title {
        font-size: 16px;
        padding: 5px 15px;
        margin-bottom: 10px;
    }
    
    .mdfCopywritingFormula-point-text {
        flex-direction: row;
    }
    
    .mdfCopywritingFormula-point-description {
        flex: 1;
        margin-right: 20px;
        font-size: 14px;
    }
    
    .mdfCopywritingFormula-point-example {
        flex: 1;
        font-size: 14px;
        background-color: transparent;
        padding: 0;
        border-left: none;
    }
    
    .mdfCopywritingFormula-footer {
        font-size: 13px;
        padding: 1px 30px;
        margin-top: 0;
    }
    
    .mdfCopywritingFormula-page-number {
        font-size: 16px;
    }
}
`;

/**
 * Register CopywritingFormula component shortcodes
 * @param renderer shortcode renderer
 */
export function registerCopywritingFormulaShortcode(renderer: ShortcodeRenderer, theme: ThemeManager) {
    // Register the main mdfCopywritingFormula shortcode
    renderer.registerTemplateShortcode('mdfCopywritingFormula', {
        template: `
<style>
${copywritingFormulaStyles}
</style>
<div class="mdfCopywritingFormula-container">
    <div class="mdfCopywritingFormula-header">
        <h1>{{ .Get "title" }}</h1>
        <div class="mdfCopywritingFormula-brand">{{ .Get "brand" }}</div>
    </div>
    
    {{ .Inner }}
    
    {{ if .Get "pageNumber" }}
    <div class="mdfCopywritingFormula-page-number">— {{ .Get "pageNumber" }} —</div>
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

    // Register the formula section shortcode (to be used inside mdfCopywritingFormula)
    renderer.registerTemplateShortcode('mdfCopywritingFormulaSection', {
        template: `
<div class="mdfCopywritingFormula-main-title">
    <div class="mdfCopywritingFormula-number">{{ .Get "number" }}</div>
    <h2>{{ .Get "title" }}</h2>
</div>

<div class="mdfCopywritingFormula-formula">
    {{ range $index, $item := split (.Get "formulaItems") "," }}
    <div class="mdfCopywritingFormula-formula-item"><span>{{ $item }}</span></div>
    {{ end }}
</div>

<div class="mdfCopywritingFormula-case-analysis">
    <h3>{{ .Get "caseTitle" }}</h3>
    {{ .Inner }}
</div>

{{ if .Get "footerText" }}
<div class="mdfCopywritingFormula-footer">
    {{ range $index, $text := split (.Get "footerText") "|" }}
    <p>{{ $text }}</p>
    {{ end }}
</div>
{{ end }}
`,
        funcMap: commonFuncMap,
        dataProvider: (params: string[], content?: string) => {
            return {
                Inner: content
            };
        }
    });

    // Register the point shortcode (to be used inside mdfCopywritingFormulaSection)
    renderer.registerTemplateShortcode('mdfCopywritingFormulaPoint', {
        template: `
<div class="mdfCopywritingFormula-point">
    <div class="mdfCopywritingFormula-point-number">{{ .Get "number" }}</div>
    <div class="mdfCopywritingFormula-point-content">
        <div class="mdfCopywritingFormula-point-title">{{ .Get "title" }}</div>
        <div class="mdfCopywritingFormula-point-text">
            <div class="mdfCopywritingFormula-point-description">
                {{ .Get "description" }}
            </div>
            <div class="mdfCopywritingFormula-point-example">
                {{ range $index, $example := split (.Get "examples") "|" }}
                {{ $example }}
                {{ end }}
            </div>
        </div>
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
    ['len', (arr: any[]) => arr.length],
    ['lt', (a: number, b: number) => a < b],
    ['sub', (a: number, b: number) => a - b]
]); 