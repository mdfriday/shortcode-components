import { Shortcode } from '../src';

// Create a new Shortcode instance with a cache size of 50 items
const shortcode = new Shortcode(50);

// Example template data that would come from an API or user input
const cardBannerTemplate = {
  "uuid": "98b64ab7-27a4-48d6-9083-da9ae9af093c",
  "status": "public",
  "namespace": "ShortCode",
  "id": 1,
  "slug": "cardbanner",
  "hash": "",
  "timestamp": 1743726576000,
  "updated": 1743726636122,
  "name": "cardBanner",
  "template": `<style>
.cardbanner {
    font-family: Arial, sans-serif;
            padding: 40px;
            background-color: #f5f5f5;
            max-width: 1080px;
            margin: 0 auto;
}

.cardbanner .header {
   display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 100px;
}

.cardbanner .logo {
    font-size: 24px;
    font-weight: bold;
}

.cardbanner .avatar {
    width: 60px;
            height: 60px;
            font-size: 40px;
            border-radius: 50%; /* 让图片变成圆形 */
            object-fit: cover; /* 确保图片填充整个圆形 */
            display: block;
}

.cardbanner .main-title {
    font-size: 52px;
            font-weight: bold;
            margin-bottom: 20px;
            line-height: 1.2;
}

.cardbanner .subtitle {
    font-size: 65px;
            font-weight: bold;
            background: linear-gradient(transparent 60%, #FFB6C1 40%);
            display: inline-block;
            margin-bottom: 15px;
            letter-spacing: 15px;
}

.cardbanner .description {
    font-size: 23px;
            color: #666;
            margin-bottom: 45px;
}

.cardbanner .new-label {
    position: relative;
            display: inline-block;
            margin-top: 60px;
            transform: rotate(-10deg);
            width: 100%;
}

.cardbanner .new-tag {
    background: #4169E1;
            color: white;
            padding: 10px 20px;
            border-radius: 15px;
            position: absolute;  /* 绝对定位 */
            right: 0;  /* 让它紧贴 .new-label 右侧 */
            top: 50%;  /* 垂直居中 */
            transform: translateY(-50%) rotate(30deg);  /* 保持旋转但居中 */
            display: inline-block;
            font-weight: bold;
            font-size: 28px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.cardbanner .new-tag::after {
    content: "!!";
    color: white;
    margin-left: 5px;
}

.cardbanner .footer {
     margin-top: 174px;
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            color: #333;
}

.cardbanner .footer span {
    margin: 0 10px;
}

.cardbanner .divider {
    color: #999;
}
      </style>
      <div class="cardbanner">
        <div class="header">
          <div class="logo">{{ .Get "logo" }}</div>
          <div class="avatar">
           <img class="avatar" src='{{ .Get "avatar" }}' alt="头像">
          </div>
        </div>

        <div class="main-title">
          {{ .Get "mainTitle" }}
        </div>

        <div class="subtitle">
          {{ .Get "subtitle" }}
        </div>

        <div class="description">
          {{ .Get "description" }}
        </div>

        <div class="new-label">
          <div class="new-tag">{{ .Get "newTagText" }}</div>
        </div>

        <div class="footer">
        {{ $topics := split (.Get "footerContent") "," }}
        {{ range $index, $topic := $topics }}
            {{ if gt $index 0 }} <span class="divider">|</span> {{ end }}
            {{ $topic }}
        {{ end }}
        </div>
      </div>`,
  "example": `{{< cardBanner
    logo="不黑学长"
    avatar="/images/avatar.png"
    mainTitle="让完播率>50% (3/3)"
    subtitle="6种文案公式"
    description="爆款拆解/爆款要素/文案结构"
    newTagText="全新整理"
    footerContent="运营技巧,爆款选题,文案写作,数据复盘"
/>}}`,
  "asset": "/api/uploads/d66e65ad754f15723096c1156d043cbe/2025/04/1743726636150-1.jpg",
  "tags": ["xhs", "小红书"],
  "width": 1080,
  "height": 1440
};

// Define custom function map for the shortcode if needed
const customFuncMap = new Map<string, (...args: any[]) => any>([
  ['split', (str: string, sep: string) => str.split(sep)]
]);

// Define a custom data provider if needed
const customDataProvider = (params: string[], content?: string) => {
  return {
    content,
    // Additional data manipulation can be done here if necessary
  };
};

// Check if shortcode is already registered
if (!shortcode.existsById(cardBannerTemplate.id)) {
  // Register the shortcode
  const registered = shortcode.registerShortcode(cardBannerTemplate, {
    funcMap: customFuncMap,
    dataProvider: customDataProvider
  });
  
  console.log(`Shortcode '${cardBannerTemplate.name}' registration ${registered ? 'successful' : 'failed'}`);
} else {
  console.log(`Shortcode '${cardBannerTemplate.name}' already registered`);
}

// Example content that uses the shortcode
const markdownContent = `# Dynamic Shortcode Example

Let's try using our dynamically registered shortcode:

{{< cardBanner
    logo="不黑学长"
    avatar="/images/avatar.png"
    mainTitle="让完播率>50% (3/3)"
    subtitle="6种文案公式"
    description="爆款拆解/爆款要素/文案结构"
    newTagText="全新整理"
    footerContent="运营技巧,爆款选题,文案写作,数据复盘"
/>}}

The above shortcode should render nicely!
`;

// Example 1: Render directly
console.log("EXAMPLE 1: Direct Rendering");
const renderedContent = shortcode.render(markdownContent);
console.log(renderedContent);

// Example 2: Step rendering (for integration with a markdown renderer)
console.log("\nEXAMPLE 2: Step Rendering");
console.log("Step 1: Replace shortcodes with placeholders");
const stepOneResult = shortcode.stepRender(markdownContent);
console.log(stepOneResult);

// This would typically be where you render markdown with your chosen markdown renderer
// For example:
// const htmlContent = yourMarkdownRenderer(stepOneResult);
const simulatedHtmlContent = `<h1>Dynamic Shortcode Example</h1>
<p>Let's try using our dynamically registered shortcode:</p>
<!-- SHORTCODE_PLACEHOLDER_0 -->
<p>The above shortcode should render nicely!</p>`;

console.log("\nStep 2: Markdown rendering (simulated)");
console.log(simulatedHtmlContent);

console.log("\nStep 3: Final rendering (replace placeholders with rendered shortcodes)");
const finalResult = shortcode.finalRender(simulatedHtmlContent);
console.log(finalResult);

// Example of caching in action
console.log("\nEXAMPLE 3: Caching Example");
console.time("First render");
shortcode.render(markdownContent);
console.timeEnd("First render");

console.time("Second render (from cache)");
shortcode.render(markdownContent);
console.timeEnd("Second render (from cache)");

// Clear cache example
shortcode.clearCache();
console.log("Cache cleared");

console.time("Third render (after cache clear)");
shortcode.render(markdownContent);
console.timeEnd("Third render (after cache clear)"); 