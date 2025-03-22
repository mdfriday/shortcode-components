---
title: Layout Demo
description: A demo of layout components with theme switching
---

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
    />}}
    
    {{< mdfScriptStructureBlock
        number="2"
        title="爆款短视频结构"
        flowItems="抛出利益点或者痛点|通过案例或者数据证明这个利益点或者痛点来增加信任|针对目标群体强调看这条视频的重要性|如果不看产生的损失跟后|具体的方法或者解决办法|总结/利他感性的结尾"
        usePlusSigns="true"
    />}}
{{< /mdfScriptStructure >}}

{{< mdfCopywritingFormula
    title="[爆款文案结构公式]"
    brand="BUHEIXUEZHANG"
    pageNumber="3"
>}}
    {{< mdfCopywritingFormulaSection
        number="05"
        title="强化IP结构"
        formulaItems="痛点,用户获得感,IP信任感,解决方案"
        caseTitle="案例解析"
        footerText="价值内容的来源/多去收集与行业相关的知识信息与行业内比较厉害的人的交流或者故事也能成为你知识的载体|注意/千万不要说教式的去表达，内容见好就收（控制时长/预留观众想象与思考的空间）；本身平台就是娱乐性质，知识类内容也要寓教于乐！"
    >}}
        {{< mdfCopywritingFormulaPoint
            number="1"
            title="痛点"
            description="将痛点放到视频开头的好处是，吸引来的都是精准粉丝；所以要思考你的目标群体的真正痛点！"
            examples="如何免F读书还能每个月3000+|年轻人如何不靠打工才能够养活自己"
        />}}
        
        {{< mdfCopywritingFormulaPoint
            number="2"
            title="获得感"
            description="你需要在2秒钟内告诉用户我将会为你提供巨大的价值，例如速成类知识"
            examples="3步教大家快速学习新的赚0技能|5分钟教会你7种减脂做法，简单好吃"
        />}}
        
        {{< mdfCopywritingFormulaPoint
            number="3"
            title="信任感"
            description="强化你将要陈述的内容的可信度，以及你本人的可信度/别人为什么信任你、同时也是为吸引用户看下去的钩子，递进式塑造期待感"
            examples="我曾经帮助2000+学员解决什么问题|曾经获得官方的什么认证/奖项/技能"
        />}}
        
        {{< mdfCopywritingFormulaPoint
            number="4"
            title="解决方案"
            description="价值是前面所有铺垫工作的最终结果，同时也是观众是否点赞关注的重要因素，如果故弄玄虚只会让用户厌烦"
            examples="盘点真正有用的信息|展示卖点1/卖点2/卖点3"
        />}}
    {{< /mdfCopywritingFormulaSection >}}
{{< /mdfCopywritingFormula >}}

{{< cardbanner
    logo="不黑学长"
    avatar="/styles/avatar.png"
    mainTitle="让完播率>50% (3/3)"
    subtitle="6种文案公式"
    description="爆款拆解/爆款要素/文案结构"
    newTagText="全新整理"
    footerContent="运营技巧,爆款选题,文案写作,数据复盘"
/>}}

{{< formulacard
headerTitle="[爆款文案结构公式]"
headerLogo="BUHEIXUEZHANG"
pageNumber="2"
>}}

{{< formula
number="03"
name="FIRE结构"
items="Fact事实+Interpret解读+Reaction反应+Ends结果"
>}}
{{< example number="1" label="Fact/事实" content="最近好多博主都在抱怨流量不如之前了" />}}
{{< example number="2" label="Interpret解读" content="那是因为机制从流量转化效率调整到了曝光转化效率" />}}
{{< example number="3" label="Reaction反应" content="不光短视频，直播间的流量也是一样的结果" />}}
{{< example number="4" label="Ends结果" content="我们需要优化前两秒使用视听语言" />}}
{{< /formula >}}

{{< formula
number="04"
name="RIDE结构"
items="Risk风险+Interest利益+Difference差异+Effect影响"
>}}
{{< example number="1" label="Risk风险" content="消极口头禅会影响运气" />}}
{{< example number="2" label="Interest利益" content="使用积极的口头禅来吸引好运对你最有利" />}}
{{< example number="3" label="Difference差异" content="说我会成功而不是我可能会失败" />}}
{{< example number="4" label="Effect影响" content="积极的口头禅对人的心态和运气有显著影响" />}}
{{< /formula >}}

{{< /formulacard >}}


{{< container >}}

{{< block display="flex" gap="2" textAlign="justify" py="5">}}

{{< button variant="primary" rounded="true" href="#" px="3" >}}Primary{{< /button >}} 
{{< button variant="secondary" rounded="true" href="#" px="3" >}}Secondary{{< /button >}} 
{{< button variant="success" rounded="true" href="#" px="3" >}}Success{{< /button >}} 
{{< button variant="danger" rounded="true" href="#" px="3" >}}Danger{{< /button >}}
{{< button variant="warning" rounded="true" href="#" px="3" >}}Warning{{< /button >}}
{{< button variant="info" rounded="true" href="#" px="3" >}}Info{{< /button >}}
{{< button variant="light" rounded="true" href="#" px="3" >}}Light{{< /button >}}
{{< button variant="dark" rounded="true" href="#" px="3" >}}Dark{{< /button >}}
{{< button variant="link" rounded="true" href="#" px="3" >}}Link{{< /button >}}

{{< /block >}}

{{< grid textAlign="center" >}}
{{< row >}}
{{< col sm="4" >}} col 1 {{< /col >}}
{{< col sm="4" >}} col 2 {{< /col >}}
{{< col sm="4" >}} col 3 {{< /col >}}
{{< /row >}}

{{< row >}}
{{< col sm="3" >}} col 1 {{< /col >}}
{{< col sm="6" >}} col 2 {{< /col >}}
{{< col sm="3" >}} col 3 {{< /col >}}
{{< /row >}}

{{< row >}}
{{< col sm="8" >}}
col 1
{{< row >}}
{{< col sm="6" >}} col 1 {{< /col >}}
{{< col sm="6" >}} col 2 {{< /col >}}
{{< /row >}}{{< /col >}}
{{< col sm="4" >}} col 2 {{< /col >}}
{{< /row >}}
{{< /grid >}}


{{< /container >}}