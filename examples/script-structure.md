# 脚本模式化结构

This is an example of using the ScriptStructure component.

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

## Explanation

The script structure component provides a visual way to present step-by-step content flows for various types of scripts. The component supports:

1. Numbered sections with titles
2. Flow items within each section
3. Optional plus signs between steps
4. Consistent styling with the other formula components

### Component Parameters

#### mdfScriptStructure
- `title`: The title of the formula card
- `brand`: The brand name or author
- `number`: The section number (e.g., "06")
- `name`: The name of the section
- `subtitle`: Optional subtitle for the section (in parentheses)
- `pageNumber`: Optional page number to display at the bottom

#### mdfScriptStructureBlock
- `number`: The block number (displayed in a circle)
- `title`: The title of the specific structure block
- `flowItems`: Pipe-separated list of flow steps/items
- `usePlusSigns`: Set to "true" to show plus signs between flow items

## Additional Examples

You can create different variations:

{{< mdfScriptStructure
    title="[视频脚本结构]"
    brand="CONTENTLAB"
    number="07" 
    name="教学型视频结构"
    pageNumber="5"
>}}
    {{< mdfScriptStructureBlock
        number="1"
        title="基础教学结构"
        flowItems="引起兴趣的问题|解释为什么这很重要|展示简单的解决方案|步骤1详解|步骤2详解|步骤3详解|总结并鼓励行动"
    >}}
    
    {{< mdfScriptStructureBlock
        number="2"
        title="对比型教学结构"
        flowItems="常见错误方法|为什么这个方法不好|介绍更好的方法|展示过程|展示结果对比|总结学习要点"
        usePlusSigns="true"
    >}}
{{< /mdfScriptStructure >}} 