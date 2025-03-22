# Script Structure Component

The `mdfScriptStructure` component allows you to create structured, visual representations of script templates and content flows. This component is useful for educational content about copywriting, video scripting, and content creation.

## Features

- Clean, visually appealing presentation of script structures
- Support for multiple structure blocks within a single component
- Optional plus sign connectors between flow items
- Consistent styling with other MDFriday formula components
- Responsive design

## Basic Usage

```markdown
{{< mdfScriptStructure
    title="[爆款文案结构公式]"
    brand="BUHEIXUEZHANG"
    number="06"
    name="脚本模式化结构"
    subtitle="(细化版)"
    pageNumber="4"
>}}
    {{< mdfScriptStructureBlock
        number="1"
        title="故事类爆款脚本结构"
        flowItems="猎奇抓眼球的开头|故事的起因|钩子|故事的经过|钩子|故事的高潮|钩子|结果|引出观点|总结观点"
    >}}
    
    {{< mdfScriptStructureBlock
        number="2"
        title="爆款短视频结构"
        flowItems="抛出利益点或者痛点|通过案例或者数据证明这个利益点或者痛点来增加信任|针对目标群体强调看这条视频的重要性|如果不看产生的损失跟后|具体的方法或者解决办法|总结/利他感性的结尾"
        usePlusSigns="true"
    >}}
{{< /mdfScriptStructure >}}
```

## Component Parameters

### mdfScriptStructure

| Parameter | Description | Required |
|-----------|-------------|----------|
| title | The title of the structure card | Yes |
| brand | The brand name or author | Yes |
| number | The section number (e.g., "06") | Yes |
| name | The name of the section | Yes |
| subtitle | Optional subtitle (often in parentheses) | No |
| pageNumber | Optional page number to display at the bottom | No |

### mdfScriptStructureBlock

| Parameter | Description | Required |
|-----------|-------------|----------|
| number | The block number (displayed in a circle) | Yes |
| title | The title of the specific structure block | Yes |
| flowItems | Pipe-separated list of flow steps/items | Yes |
| usePlusSigns | Set to "true" to show plus signs between flow items | No |

## Customization

The component uses predefined styles with proper namespacing to avoid conflicts with the rest of your site. All CSS class names are prefixed with `mdfScriptStructure-` for isolation.

## Examples

### Basic Story Structure

```markdown
{{< mdfScriptStructure
    title="[故事结构模板]"
    brand="STORYCRAFT"
    number="01" 
    name="基础故事结构"
    pageNumber="1"
>}}
    {{< mdfScriptStructureBlock
        number="1"
        title="三幕剧结构"
        flowItems="设置|冲突|解决"
    >}}
{{< /mdfScriptStructure >}}
```

### Complex Educational Structure

```markdown
{{< mdfScriptStructure
    title="[教学内容结构]"
    brand="EDULAB"
    number="03" 
    name="课程设计模板"
    pageNumber="2"
>}}
    {{< mdfScriptStructureBlock
        number="1"
        title="引导式教学"
        flowItems="提出问题|探索可能的解决方案|引导式操作|学生自主操作|巩固练习|总结反思"
    >}}
    
    {{< mdfScriptStructureBlock
        number="2"
        title="技能培训"
        flowItems="展示最终成果|讲解基础知识|示范关键技巧|分步骤练习|学生独立实践|反馈和调整|技能应用"
        usePlusSigns="true"
    >}}
{{< /mdfScriptStructure >}}
``` 