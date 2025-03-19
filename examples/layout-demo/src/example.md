---
title: Layout Demo
description: A demo of layout components with theme switching
---

{{< cardbanner
logo="不黑学长"
avatar="/styles/avatar.png"
mainTitle="让完播率 50% 3/3"
subtitle="6种文案公式"
description="爆款拆解/爆款要素/文案结构"
newTagText="全新整理"
footerContent="运营技巧,爆款选题,文案写作,数据复盘"
/>}}

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