---
title: Layout Demo
description: A demo of layout components with theme switching
---

{{< container variant="responsive" size="md" >}}
  {{< grid variant="cols3" size="md" >}}
    {{< flex variant="column" size="md" >}}
      # Section 1
      This is the content for section 1.
      {{< button variant="primary" size="md" href="#" >}}
        Primary Button
      {{< /button >}}
    {{< /flex >}}
    {{< flex variant="column" size="md" >}}
      # Section 2
      This is the content for section 2.
      {{< button variant="secondary" size="md" href="#" >}}
        Secondary Button
      {{< /button >}}
    {{< /flex >}}
    {{< flex variant="column" size="md" >}}
      # Section 3
      This is the content for section 3.
      {{< button variant="outline" size="md" href="#" >}}
        Outline Button
      {{< /button >}}
    {{< /flex >}}
  {{< /grid >}}
{{< /container >}}

{{< container variant="fluid" size="lg" >}}
  {{< grid variant="cols2" size="lg" >}}
    {{< flex variant="column" size="md" >}}
      ## Feature 1
      This is a feature description.
      {{< button variant="ghost" size="sm" href="#" >}}
        Learn More
      {{< /button >}}
    {{< /flex >}}
    {{< flex variant="column" size="md" >}}
      ## Feature 2
      This is another feature description.
      {{< button variant="primary" size="lg" href="#" disabled="true" >}}
        Coming Soon
      {{< /button >}}
    {{< /flex >}}
  {{< /grid >}}
{{< /container >}} 