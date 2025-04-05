# 动态注册模板

用户在使用模板的时候，有两种方式：

一种是通过预览模板效果图片，点击选用模板。
一种是对这个模板已经很熟悉了，可以直接在 markdown 文件里写出来，或者拷贝进来。

这两种方式，都只需要我们注册选中的模板就行，而不用预加载所有的模板。

所以我们需要实现按需动态加载的功能。

## 具体实现

### 提供模板注册和管理功能

增强现在的 shortcode.ts ， 我们不再预加载任何 shortcode 。 
而且提供一个注册方法，方便大家注册，而且注册的时候只需要传入模板内容就行，我们会来统一维护注册所需要的功能函数。
当然也支持用户传入自定义的功能函数 funcMap 。 dataProvider 先由我们来提供，因为大部分的模块没有特殊需求。

我们会得到模板数据如下：
{"uuid":"98b64ab7-27a4-48d6-9083-da9ae9af093c","status":"public","namespace":"ShortCode","id":1,"slug":"cardbanner","hash":"","timestamp":1743726576000,"updated":1743726636122,"name":"cardBanner","template":"\u003cstyle\u003e\r\n.cardbanner {\r\n    font-family: Arial, sans-serif;\r\n            padding: 40px;\r\n            background-color: #f5f5f5;\r\n            max-width: 1080px;\r\n            margin: 0 auto;\r\n}\r\n\r\n.cardbanner .header {\r\n   display: flex;\r\n            justify-content: space-between;\r\n            align-items: flex-start;\r\n            margin-bottom: 100px;\r\n}\r\n\r\n.cardbanner .logo {\r\n    font-size: 24px;\r\n    font-weight: bold;\r\n}\r\n\r\n.cardbanner .avatar {\r\n    width: 60px;\r\n            height: 60px;\r\n            font-size: 40px;\r\n            border-radius: 50%; /* 让图片变成圆形 */\r\n            object-fit: cover; /* 确保图片填充整个圆形 */\r\n            display: block;\r\n}\r\n\r\n.cardbanner .main-title {\r\n    font-size: 52px;\r\n            font-weight: bold;\r\n            margin-bottom: 20px;\r\n            line-height: 1.2;\r\n}\r\n\r\n.cardbanner .subtitle {\r\n    font-size: 65px;\r\n            font-weight: bold;\r\n            background: linear-gradient(transparent 60%, #FFB6C1 40%);\r\n            display: inline-block;\r\n            margin-bottom: 15px;\r\n            letter-spacing: 15px;\r\n}\r\n\r\n.cardbanner .description {\r\n    font-size: 23px;\r\n            color: #666;\r\n            margin-bottom: 45px;\r\n}\r\n\r\n.cardbanner .new-label {\r\n    position: relative;\r\n            display: inline-block;\r\n            margin-top: 60px;\r\n            transform: rotate(-10deg);\r\n            width: 100%;\r\n}\r\n\r\n.cardbanner .new-tag {\r\n    background: #4169E1;\r\n            color: white;\r\n            padding: 10px 20px;\r\n            border-radius: 15px;\r\n            position: absolute;  /* 绝对定位 */\r\n            right: 0;  /* 让它紧贴 .new-label 右侧 */\r\n            top: 50%;  /* 垂直居中 */\r\n            transform: translateY(-50%) rotate(30deg);  /* 保持旋转但居中 */\r\n            display: inline-block;\r\n            font-weight: bold;\r\n            font-size: 28px;\r\n            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.cardbanner .new-tag::after {\r\n    content: \"!!\";\r\n    color: white;\r\n    margin-left: 5px;\r\n}\r\n\r\n.cardbanner .footer {\r\n     margin-top: 174px;\r\n            display: flex;\r\n            justify-content: space-between;\r\n            font-size: 20px;\r\n            color: #333;\r\n}\r\n\r\n.cardbanner .footer span {\r\n    margin: 0 10px;\r\n}\r\n\r\n.cardbanner .divider {\r\n    color: #999;\r\n}\r\n      \u003c/style\u003e\r\n      \u003cdiv class=\"cardbanner\"\u003e\r\n        \u003cdiv class=\"header\"\u003e\r\n          \u003cdiv class=\"logo\"\u003e{{ .Get \"logo\" }}\u003c/div\u003e\r\n          \u003cdiv class=\"avatar\"\u003e\r\n           \u003cimg class=\"avatar\" src='{{ .Get \"avatar\" }}' alt=\"头像\"\u003e\r\n          \u003c/div\u003e\r\n        \u003c/div\u003e\r\n\r\n        \u003cdiv class=\"main-title\"\u003e\r\n          {{ .Get \"mainTitle\" }}\r\n        \u003c/div\u003e\r\n\r\n        \u003cdiv class=\"subtitle\"\u003e\r\n          {{ .Get \"subtitle\" }}\r\n        \u003c/div\u003e\r\n\r\n        \u003cdiv class=\"description\"\u003e\r\n          {{ .Get \"description\" }}\r\n        \u003c/div\u003e\r\n\r\n        \u003cdiv class=\"new-label\"\u003e\r\n          \u003cdiv class=\"new-tag\"\u003e{{ .Get \"newTagText\" }}\u003c/div\u003e\r\n        \u003c/div\u003e\r\n\r\n        \u003cdiv class=\"footer\"\u003e\r\n        {{ $topics := split (.Get \"footerContent\") \",\" }}\r\n        {{ range $index, $topic := $topics }}\r\n            {{ if gt $index 0 }} \u003cspan class=\"divider\"\u003e|\u003c/span\u003e {{ end }}\r\n            {{ $topic }}\r\n        {{ end }}\r\n        \u003c/div\u003e\r\n      \u003c/div\u003e","example":"{{\u003c cardBanner\r\n    logo=\"不黑学长\"\r\n    avatar=\"/images/avatar.png\"\r\n    mainTitle=\"让完播率\u003e50% (3/3)\"\r\n    subtitle=\"6种文案公式\"\r\n    description=\"爆款拆解/爆款要素/文案结构\"\r\n    newTagText=\"全新整理\"\r\n    footerContent=\"运营技巧,爆款选题,文案写作,数据复盘\"\r\n/\u003e}}","asset":"/api/uploads/d66e65ad754f15723096c1156d043cbe/2025/04/1743726636150-1.jpg","tags":["xhs","小红书"],"width":1080,"height":1440}

我们需要提供模板的管理功能：

1. 罗列出所有已注册的模板
2. 通过模板名查找模板相关信息，如 id
3. 通过 id 查询是否已经存在，这样就能知道不用再次注册

### 增强渲染功能

还需要拓展现在的 render 方法，要支持分布渲染。

最新的 shortcode-compiler 0.2.4 版本，是支持分布渲染的，样例如下：

```javascript
const { ShortcodeRenderer, PageRenderer } = require('@mdfriday/shortcode-compiler');
const markdownRenderer = require('your-markdown-renderer'); // Your chosen Markdown renderer

// Create Shortcode renderer
const shortcodeRenderer = new ShortcodeRenderer();
// Register your shortcodes...

// Create page renderer
const pageRenderer = new PageRenderer(shortcodeRenderer);

// The first step: Replace Shortcode with placeholder
const content = '# Title\n{{< shortcode >}}Content{{< /shortcode >}}';
const stepOneResult = pageRenderer.render(content, { stepRender: true });

// The second step: Markdown rendering
const htmlContent = markdownRenderer(stepOneResult.content);

// The third step: Final rendering, replace placeholder with actual content
const finalResult = pageRenderer.finalRender(htmlContent);

console.log(finalResult); // Complete correct HTML content
```

需要在 render 的时候指明 stepRender。

为了用户使用方便，不用了解渲染选项的细节，我们可以提供两个渲染方法：

1. 直接渲染，保持现在实现，也就是 render 方法
2. 分步渲染，新增加一个 stepRender 方法，在调用的时候，传入 stepRender 选项，另外还得提供一个 finalRender 来配合使用

#### 渲染缓存

如果渲染的内容一模一样，我们需要提供渲染缓存功能，这样更高效
