---
title: CornellNotes001
description: A component for displaying notes in Cornell note-taking format
---

# CornellNotes001 Component

The CornellNotes001 component displays notes in the Cornell note-taking format with three sections: an organize column, a notes column, and a summary section.

## Example

{{< cornellNotes001 
    noteDate="2021.12.06"
    organizeContent="<p>关于</p><p>「学习如何学习」</p><p>拆解成3个问题：</p><p>「为什么」、</p><p>「怎么做」、</p><p>「做什么」</p>"
    notesContent="<p>关于「学习如何学习」</p><p>——《超速学习》学习笔记</p><br><p>"后设学习"的英文是「metalearning」，其前缀「meta」源自于希腊词语，代表「之上」，意思是来事跟其自身有关，或处理的是一种层次较高的抽象概念，在这里，"后设学习"指的是「学习关于学习」这件事。</p><p>具体方法：把你为某个特定计划所做的后设学习研究拆解成三个问题：「为什么」、「怎么做」、「做什么」。</p><p>「为什么」：指的是了解你的学习动机。若你明确知道为何要学这门技术或科目，就可以省下大把时间，把你的计划聚焦在对你而言最重要的事情上。</p><p>「怎么做」：指的是你在学习时将使用的资源、环境与方法。谨慎做出选择，对整体学习成效会有很大帮助。</p><p>「做什么」：指的是为了成功，你需要获得的知识与能力。把事情拆解成概念、事实与程序，能让你标出自己将面对的障碍，以及如何用最好的方法去克服。</p>"
    summaryContent="<p>斯考特·扬在《超速学习》里提到的关于「学习如何学习」，把它们拆解为三个问题：「为什么」、「怎么做」、「做什么」。</p><p>这里的思路让我想到苏格拉底提问法则。对任何事情，要从内向外进行提问，所以当然也包括学习这件事。一般大众思维都是先考虑做什么，而精英思维则先考虑为什么。</p>"
>}} 