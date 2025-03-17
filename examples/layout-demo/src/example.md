---
title: Layout Demo
description: A demo of layout components with theme switching
---

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

{{< grid >}}
{{< row >}}

{{< col >}}
{{< button variant="primary" rounded="true" href="#" >}}
Primary Button
{{< /button >}} 
{{< /col >}}

{{< col >}}
{{< button variant="warning" rounded="true" href="#" >}}
Primary Button
{{< /button >}}
{{< /col >}}

{{< col >}} col {{< /col >}}
{{< col >}} col {{< /col >}}

{{< /row >}}
{{< /grid >}}