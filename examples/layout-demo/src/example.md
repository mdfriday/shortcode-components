---
title: Layout Demo
description: A demo of layout components with theme switching
---

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