---
title: StorytellingInfoCard001
description: A customizable Pokemon-style card component for storytelling and habit tracking
---

# StorytellingInfoCard001 Component

The StorytellingInfoCard001 component displays information in a Pokemon-style card layout, perfect for tracking habits, learning progress, or other gamified educational purposes. It features customizable themes, stats visualization, and content sections.

## Example

{{< storytellingInfoCard001
    theme="electric"
    name="Pikachu"
    date="2025.05.14"
    characterImage="/images/Pikachu.svg"
    types="Electric,Fast,Quick"
    subjectTitle="学科完成时间"
    subjects="语文,19:00 - 19:30;数学,19:00 - 19:30;英语,19:00 - 19:30"
    statsTitle="21天习惯养成计划"
    statsLabels="HP,ATK,DEF,SATK,SDEF,SPD"
    statsValues="HP,05;ATK,10;DEF,15;SATK,12;SDEF,08;SPD,20"
    pokeballImage="/images/pokeball-bg.svg"
>}}
今天完成的比较顺利。因为有提前在学校把会做的先做完，不会做的再寻求帮助。而且把难的先完成，后面就越来越快。
{{</storytellingInfoCard001>}}

## Water Theme Example

{{< storytellingInfoCard001
    theme="water"
    name="Squirtle"
    date="2025.05.15"
    characterImage="/images/Pikachu.svg"
    types="Water"
    subjectTitle="学科完成时间"
    subjects="语文,19:00 - 19:30;数学,19:00 - 19:30;英语,19:00 - 19:30"
    statsTitle="21天习惯养成计划"
    statsLabels="HP,ATK,DEF,SATK,SDEF,SPD"
    statsValues="HP,8;ATK,6;DEF,18;SATK,7;SDEF,15;SPD,5"
    pokeballImage="/images/pokeball-bg.svg"
>}}
今天完成的比较顺利。因为有提前在学校把会做的先做完，不会做的再寻求帮助。而且把难的先完成，后面就越来越快。
{{</storytellingInfoCard001>}}

## Custom Theme Example

{{< storytellingInfoCard001
    theme="rock"
    name="Dark Theme"
    date="2025.05.16"
    characterImage="/images/Pikachu.svg"
    types="Custom"
    subjectTitle="学科完成时间"
    subjects="语文,19:00 - 19:30;数学,19:00 - 19:30;英语,19:00 - 19:30"
    statsTitle="21天习惯养成计划"
    statsLabels="HP,ATK,DEF,SATK,SDEF,SPD"
    statsValues="HP,10;ATK,10;DEF,10;SATK,10;SDEF,10;SPD,10"
    pokeballImage="/images/pokeball-bg.svg"
    customThemeColor="#9c27b0"
>}}
今天完成的比较顺利。因为有提前在学校把会做的先做完，不会做的再寻求帮助。而且把难的先完成，后面就越来越快。
{{</storytellingInfoCard001>}} 