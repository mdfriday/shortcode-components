// Example to test FormulaPair shortcodes
import { Shortcode } from '../../src/shortcode';
import * as fs from 'fs';
import * as path from 'path';

// Read the markdown customize from file or use a string directly
const markdownContent = `
{{< mdfFormulaPair
headerTitle="[爆款文案结构公式]"
headerLogo="BUHEIXUEZHANG"
pageNumber="2"
>}}

{{< mdfFormulaPairCard
number="03"
name="FIRE结构"
items="Fact事实+Interpret解读+Reaction反应+Ends结果"
>}}
{{< mdfFormulaPairExample
number="1"
label="Fact/事实"
content="最近好多博主都在抱怨流量不如之前了"
/>}}
{{< mdfFormulaPairExample
number="2"
label="Interpret解读"
content="那是因为机制从流量转化效率调整到了曝光转化效率"
/>}}
{{< mdfFormulaPairExample
number="3"
label="Reaction反应"
content="不光短视频，直播间的流量也是一样的结果"
/>}}
{{< mdfFormulaPairExample
number="4"
label="Ends结果"
content="我们需要优化前两秒使用视听语言"
/>}}

{{< /mdfFormulaPairCard >}}

{{< mdfFormulaPairCard
number="04"
name="RIDE结构"
items="Risk风险+Interest利益+Difference差异+Effect影响"
>}}
{{< mdfFormulaPairExample
number="1"
label="Risk风险"
content="消极口头禅会影响运气"
/>}}
{{< mdfFormulaPairExample
number="2"
label="Interest利益"
content="使用积极的口头禅来吸引好运对你最有利"
/>}}
{{< mdfFormulaPairExample
number="3"
label="Difference差异"
content="说我会成功而不是我可能会失败"
/>}}
{{< mdfFormulaPairExample
number="4"
label="Effect影响"
content="积极的口头禅对人的心态和运气有显著影响"
/>}}
{{< /mdfFormulaPairCard >}}

{{< /mdfFormulaPair >}}
`;

// Get CSS styles from FormulaPair.ts
const formulaPairStyles = `
.mdfFormulaPair-canvas {
    min-width: 540px;
    max-width: 1080px;
}

.mdfFormulaPair-canvas .card {
    font-family: Arial, sans-serif;
    padding: 27px 40px;
    background-color: #ffffff;
    margin: 0 auto;
}

.mdfFormulaPair-canvas .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.mdfFormulaPair-canvas .header-title {
    font-size: 17px;
    color: #333;
}

.mdfFormulaPair-canvas .header-logo {
    font-size: 17px;
    font-weight: bold;
}

.mdfFormulaPair-canvas .section {
    margin-bottom: 25px;
}

.mdfFormulaPair-canvas .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.mdfFormulaPair-canvas .section-number {
    background-color: #FFB6C1;
    color: black;
    padding: 5px 15px;
    font-size: 28px;
    margin-right: 15px;
}

.mdfFormulaPair-canvas .section-name {
    font-size: 28px;
    font-weight: bold;
}

.mdfFormulaPair-canvas .formula {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.mdfFormulaPair-canvas .formula-item {
    display: flex;
    align-items: center;
}

.mdfFormulaPair-canvas .formula-text {
    border-bottom: 1px solid #000;
    padding-bottom: 2px;
}

.mdfFormulaPair-canvas .plus {
    margin: 0 10px;
    font-size: 24px;
}

.mdfFormulaPair-canvas .example-title {
    font-size: 22px;
    margin: 10px 0 10px;
}

.mdfFormulaPair-canvas .example-content {
    margin: 20px 0;
    line-height: 1.8;
    font-size: 13px;
}

.mdfFormulaPair-canvas .label {
    display: inline-block;
    background-color: #87CEEB;
    padding: 2px 8px;
    margin: 0 5px;
    border-radius: 4px;
}

.mdfFormulaPair-canvas .example-item {
    margin: 15px 0;
    display: flex;
    align-items: flex-start;
}

.mdfFormulaPair-canvas .number-circle {
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

.mdfFormulaPair-canvas .dotted-line {
    border-bottom: 1px dotted #999;
    padding-bottom: 5px;
    margin-bottom: 5px;
}

.mdfFormulaPair-canvas .page-number {
    text-align: center;
    color: #666;
}
`;

try {
  console.log('Registering Formula Pair shortcodes...');
  console.log('\n===== APPROACH 2: Using Shortcode with stepRender/finalRender =====');
  
  // Create a new Shortcode instance (using source code version)
  console.log('Creating Shortcode instance from source code...');
  const shortcode = new Shortcode();
  
  // Get the default function map and add the split function
  // const defaultFuncMap = shortcode.getDefaultFuncMap();
  // defaultFuncMap.set('split', (str: string, sep: string) => str.split(sep));
  
  // Register the three shortcodes using the Shortcode.registerShortcode method
  console.log('Registering Formula Pair shortcodes with Shortcode API...');
  
  // 1. Register mdfFormulaPair
  shortcode.registerShortcode(
    {
      name: 'mdfFormulaPair',
      id: 'mdfFormulaPair', 
      uuid: 'mdf-formula-pair',
      template: `
      <style>
        ${formulaPairStyles}
      </style>
      <div class="mdfFormulaPair-canvas">
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
    `
    },
    {
      template: `
      <style>
        ${formulaPairStyles}
      </style>
      <div class="mdfFormulaPair-canvas">
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
      funcMap: shortcode.getDefaultFuncMap(),
      dataProvider: shortcode.getDefaultDataProvider()
    }
  );
  
  // 2. Register mdfFormulaPairCard
  shortcode.registerShortcode(
    {
      name: 'mdfFormulaPairCard',
      id: 'mdfFormulaPairCard',
      uuid: 'mdf-formula-pair-card',
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
      `
    },
    {
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
      funcMap: shortcode.getDefaultFuncMap(),
      dataProvider: shortcode.getDefaultDataProvider()
    }
  );
  
  // 3. Register mdfFormulaPairExample
  shortcode.registerShortcode(
    {
      name: 'mdfFormulaPairExample',
      id: 'mdfFormulaPairExample',
      uuid: 'mdf-formula-pair-example',
      template: `
        <div class="example-item">
          <div class="number-circle">{{ .Get "number" }}</div>
          <div>
            <span class="label">{{ .Get "label" }}</span>
            <span class="dotted-line">{{ .Get "content" }}</span>
          </div>
        </div>
      `
    },
    {
      template: `
        <div class="example-item">
          <div class="number-circle">{{ .Get "number" }}</div>
          <div>
            <span class="label">{{ .Get "label" }}</span>
            <span class="dotted-line">{{ .Get "content" }}</span>
          </div>
        </div>
      `,
      funcMap: shortcode.getDefaultFuncMap(),
      dataProvider: shortcode.getDefaultDataProvider()
    }
  );
  
  // Render the markdown using the two-step process
  console.log('Step 1: Applying stepRender...');
  try {
    const stepResult = shortcode.stepRender(markdownContent);
    console.log('Step rendering completed.', stepResult);
    
    console.log('Step 2: Applying finalRender...');
    const finalResult = shortcode.finalRender(stepResult);
    console.log('Final rendering completed.', finalResult);
    
    // Save the rendered HTML to a file
    const twoStepOutputPath = path.join(__dirname, 'output-twostep.html');
    fs.writeFileSync(twoStepOutputPath, finalResult, 'utf8');
    console.log(`Two-step rendered HTML saved to ${twoStepOutputPath}`);
    
  } catch (error) {
    console.error('Error:', error);
    console.error('Stack:', error.stack);
  }
  
  console.log('\nAll rendering approaches completed!');
  
} catch (error) {
  console.error('Error:', error);
  console.error('Stack:', error.stack);
} 