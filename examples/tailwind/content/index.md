# 多主题 Pokemon 卡片系统

这个项目展示了基于 `tailwind.md` 要求的多主题系统，支持主题 (base, fire, ocean, electric, grass) 和模式 (light, dark) 的组合切换。

## 🎯 设计特性

- **多主题支持**：base、fire、ocean、electric、grass 五种主题
- **亮/暗模式**：每个主题都支持 light 和 dark 两种模式
- **语义化类名**：使用 `bg-primary`、`text-foreground` 等语义化 Tailwind 类名
- **CSS 变量驱动**：通过 CSS 变量统一控制主题颜色
- **实时切换**：右上角主题切换器支持实时预览

## 🎨 主题演示

### Base 主题 (默认)

{{< pokemon name="Pikachu" date="2025.01.15" types="Electric" theme="base" mode="light" characterImage="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" subjects="身高,0.4m;体重,6.0kg;特性,静电" statsLabels="HP,攻击,防御,特攻,特防,速度" statsValues="HP,8;攻击,12;防御,8;特攻,10;特防,10;速度,18" pokeballImage="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" >}}
皮卡丘是最受欢迎的宝可梦之一，以其可爱的外表和强大的电系技能而闻名。它的脸颊上有红色的电囊，能够储存电力并释放强力的电击攻击。
{{< /pokemon >}}

### Fire 主题 + Light 模式

{{< pokemon name="Charizard" date="2025.01.15" types="Fire,Flying" theme="fire" mode="light" characterImage="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" subjects="身高,1.7m;体重,90.5kg;特性,猛火" statsLabels="HP,攻击,防御,特攻,特防,速度" statsValues="HP,15;攻击,16;防御,15;特攻,21;特防,17;速度,20" pokeballImage="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" >}}
喷火龙是火系和飞行系的双属性宝可梦，拥有强大的火焰攻击能力。它的火焰温度可以达到极高的程度，能够熔化几乎任何物质。
{{< /pokemon >}}

### Ocean 主题 + Dark 模式

{{< pokemon name="Blastoise" date="2025.01.15" types="Water" theme="ocean" mode="dark" characterImage="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png" subjects="身高,1.6m;体重,85.5kg;特性,激流" statsLabels="HP,攻击,防御,特攻,特防,速度" statsValues="HP,21;攻击,16;防御,20;特攻,17;特防,21;速度,15" pokeballImage="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" >}}
水箭龟是水系宝可梦的代表，背上的炮管可以发射高压水炮。它的防御力极强，是团队中可靠的坦克型宝可梦。
{{< /pokemon >}}

### Electric 主题 + Light 模式

{{< pokemon name="Raichu" date="2025.01.15" types="Electric" theme="electric" mode="light" characterImage="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png" subjects="身高,0.8m;体重,30.0kg;特性,静电" statsLabels="HP,攻击,防御,特攻,特防,速度" statsValues="HP,12;攻击,18;防御,11;特攻,18;特防,16;速度,21" pokeballImage="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" >}}
雷丘是皮卡丘的进化形态，拥有更强大的电系能力。它的尾巴可以作为避雷针，吸收并储存大量的电力。
{{< /pokemon >}}

### Grass 主题 + Dark 模式

{{< pokemon name="Venusaur" date="2025.01.15" types="Grass,Poison" theme="grass" mode="dark" characterImage="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png" subjects="身高,2.0m;体重,100.0kg;特性,茂盛" statsLabels="HP,攻击,防御,特攻,特防,速度" statsValues="HP,16;攻击,16;防御,16;特攻,20;特防,20;速度,16" pokeballImage="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" >}}
妙蛙花是草系和毒系的双属性宝可梦，背上的巨大花朵能够释放迷人的香气和有毒的花粉。它是平衡型的宝可梦，各项能力都很均衡。
{{< /pokemon >}}

## 📝 表单组件演示

### Fire 主题表单

{{< ctaForm title="火系道馆挑战" placeholder="输入训练师邮箱" buttonText="接受挑战" theme="fire" mode="light" >}}

### Ocean 主题暗色表单

{{< ctaForm title="深海探险" placeholder="输入探险者邮箱" buttonText="开始探险" theme="ocean" mode="dark" >}}

## 🔧 使用方式

### 基本语法

```markdown
{{< pokemon name="Pokemon名称" theme="主题名" mode="模式" >}}
描述内容...
{{< /pokemon >}}
```

### 支持的参数

- **theme**: `base` | `fire` | `ocean` | `electric` | `grass`
- **mode**: `light` | `dark`
- **name**: Pokemon 名称
- **date**: 日期
- **types**: 类型 (用逗号分隔)
- **characterImage**: 角色图片 URL
- **subjects**: 属性信息 (格式: "标签,值;标签,值")
- **statsLabels**: 数据标签 (用逗号分隔)
- **statsValues**: 数据值 (格式: "标签,值;标签,值")
- **pokeballImage**: 精灵球图片 URL

### 示例

```markdown
<!-- Fire 主题 + Dark 模式 -->
{{< pokemon name="Charizard" theme="fire" mode="dark" types="Fire,Flying" >}}
强大的火系宝可梦
{{< /pokemon >}}

<!-- Ocean 主题 + Light 模式 -->
{{< pokemon name="Blastoise" theme="ocean" mode="light" types="Water" >}}
可靠的水系宝可梦
{{< /pokemon >}}
```

## 🎯 技术实现

### 主题架构

```
主题层次：
Theme (base/fire/ocean/electric/grass)
  ↓
Mode (light/dark)
  ↓
语义化 CSS 变量 (--primary, --background, etc.)
  ↓
Tailwind 语义化类名 (bg-primary, text-foreground, etc.)
```

### CSS 变量系统

每个主题和模式组合都定义了完整的语义化变量：

```css
.theme-fire.light {
  --primary: 239 68 68;
  --background: 255 240 240;
  --foreground: 127 29 29;
  /* ... */
}

.theme-fire.dark {
  --primary: 255 107 107;
  --background: 31 31 31;
  --foreground: 254 242 242;
  /* ... */
}
```

### 组件实现

组件完全使用语义化 Tailwind 类名：

```html
<div class="bg-primary text-primaryForeground">
  <h2 class="text-foreground">标题</h2>
  <div class="bg-surface text-surfaceForeground border border-border">
    内容区域
  </div>
</div>
```

## 🌟 优势特性

- ✅ **清晰分层**：主题/模式分离，易于扩展
- ✅ **语义化设计**：组件无需关心具体颜色值
- ✅ **实时切换**：支持动态主题和模式切换
- ✅ **完全响应式**：适配各种屏幕尺寸
- ✅ **类型安全**：TypeScript 类型定义
- ✅ **易于维护**：统一的变量管理系统 