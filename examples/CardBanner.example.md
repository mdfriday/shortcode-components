# CardBanner Component Example

## Basic Usage

```
[cardbanner]
```

## Customized Example

```
[cardbanner 
  logo="MDFriday"
  avatar="🚀"
  mainTitle="让转化率>30% (1/2)"
  subtitle="新媒体营销技巧"
  description="内容策略/用户增长/品牌建设"
  newTagText="最新指南"
  footerContent="营销策略 | 内容创作 | 数据分析 | 用户运营"
  backgroundColor="#f0f8ff"
  width="850px"
]
```

## Available Parameters

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| logo | Logo text displayed in the top left | "不黑学长" |
| avatar | Emoji or text for the avatar | "👨‍🎓" |
| mainTitle | Main title of the banner | "让完播率>50% (3/3)" |
| subtitle | Subtitle with highlighted background | "6种文案公式" |
| description | Description text | "爆款拆解/爆款要素/文案结构" |
| newTagText | Text displayed in the "new" tag | "全新整理" |
| footerContent | Footer content with category links | "运营技巧 &#124; 爆款选题 &#124; 文案写作 &#124; 数据复盘" |
| backgroundColor | Background color of the card | "#f5f5f5" |
| width | Width of the card | "800px" |

## Styling

The CardBanner component includes custom styling with:

1. Prominent title and subtitle
2. Highlighted subtitle with gradient underline
3. Rotated "new" tag with shadow
4. Organized footer with category links
5. Clean and modern layout

You can also customize the component with additional styling parameters supported by the theme system:
- textColor
- borderColor
- padding
- margin
- fontFamily
- fontSize
- etc. 