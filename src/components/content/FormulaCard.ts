import {ShortcodeRenderer} from '@mdfriday/shortcode-compiler';
import {ThemeManager} from '../../theme';

// CSS styles for the FormulaCard component
const formulaCardStyles = `
.formulacard-canvas {
    min-width: 540px;
    max-width: 1080px;
}

.formulacard-canvas .card {
    font-family: Arial, sans-serif;
    padding: 27px 40px;
    background-color: #ffffff;
    margin: 0 auto;
}

.formulacard-canvas .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.formulacard-canvas .header-title {
    font-size: 17px;
    color: #333;
}

.formulacard-canvas .header-logo {
    font-size: 17px;
    font-weight: bold;
}

.formulacard-canvas .section {
    margin-bottom: 25px;
}

.formulacard-canvas .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.formulacard-canvas .section-number {
    background-color: #FFB6C1;
    color: black;
    padding: 5px 15px;
    font-size: 28px;
    margin-right: 15px;
}

.formulacard-canvas .section-name {
    font-size: 28px;
    font-weight: bold;
}

.formulacard-canvas .formula {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.formulacard-canvas .formula-item {
    display: flex;
    align-items: center;
}

.formulacard-canvas .formula-text {
    border-bottom: 1px solid #000;
    padding-bottom: 2px;
}

.formulacard-canvas .plus {
    margin: 0 10px;
    font-size: 24px;
}

.formulacard-canvas .example-title {
    font-size: 22px;
    margin: 10px 0 10px;
}

.formulacard-canvas .example-content {
    margin: 20px 0;
    line-height: 1.8;
    font-size: 13px;
}

.formulacard-canvas .label {
    display: inline-block;
    background-color: #87CEEB;
    padding: 2px 8px;
    margin: 0 5px;
    border-radius: 4px;
}

.formulacard-canvas .example-item {
    margin: 15px 0;
    display: flex;
    align-items: flex-start;
}

.formulacard-canvas .number-circle {
    min-width: 24px;
    height: 24px;
    border: 1px solid #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    margin-top: 3px;
}

.formulacard-canvas .dotted-line {
    border-bottom: 1px dotted #999;
    padding-bottom: 5px;
    margin-bottom: 5px;
}

.formulacard-canvas .page-number {
    text-align: center;
    color: #666;
}
`;

/**
 * Register FormulaCard component shortcode
 * @param renderer shortcode renderer
 * @param theme default theme configuration
 */
export function registerFormulaCardShortcode(renderer: ShortcodeRenderer, theme: ThemeManager) {
    // Register the main formulacard shortcode
    renderer.registerTemplateShortcode('formulacard', {
        template: `
      <style>
        ${formulaCardStyles}
      </style>
      <div class="formulacard-canvas">
        <div class="card">
          <div class="header">
            <div class="header-title">{{ .Get "headerTitle" }}</div>
            <div class="header-logo">{{ .Get "headerLogo" }}</div>
          </div>

          {{ .Inner }}

          {{ if .Get "pageNumber" }}
          <div class="page-number">- {{ .Get "pageNumber" }} -</div>
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

    // Register the formula section shortcode (to be used inside formulacard)
    renderer.registerTemplateShortcode('formula', {
        template: `
        <div class="section">
          <div class="section-title">
            <div class="section-number">{{ .Get "number" }}</div>
            <div class="section-name">{{ .Get "name" }}</div>
          </div>

          <div class="formula">
            {{ $formulaItems := split (.Get "items") "+" }}
            {{ range $itemIndex, $item := $formulaItems }}
              
              {{ if gt $itemIndex 0 }}
              <span class="plus">+</span>
              {{ end }}
               <div class="formula-item">
                <span class="formula-text">{{ $item }}</span>
              </div>

            {{ end }}
            
          </div>

          <div class="example-title">案例解析</div>
          
          <div class="example-content">
            {{ .Inner }}
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

    // Register the example shortcode (to be used inside formula)
    renderer.registerTemplateShortcode('example', {
        template: `
        <div class="example-item">
          <div class="number-circle">{{ .Get "number" }}</div>
          <div>
            <span class="label">{{ .Get "label" }}</span>
            <span class="dotted-line">{{ .Get "content" }}</span>
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
    ['split', (str: string, sep: string) => str.split(sep)]
]); 