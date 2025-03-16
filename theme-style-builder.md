# Theme System Styles Builder

为不同的组件提供一致的样式 classes 构建流程

## 定义组件属性接口

interface Style {
// 颜色相关
variant?: string;
textColor?: string;
backgroundColor?: string;
borderColor?: string;

// 尺寸相关
size?: 'sm' | 'md' | 'lg';
width?: string;
height?: string;

// 边框相关
border?: boolean;
rounded?: boolean;
outline?: boolean;

// 阴影
shadow?: 'none' | 'sm' | 'md' | 'lg';
}

interface Layout {
// 显示方式
display?: 'block' | 'inline' | 'flex' | 'grid' | 'none';

// 定位
position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

// 间距
gap?: number;
padding?: number;
margin?: number;

// 尺寸
cols?: number;
rows?: number;
}

interface Typography {
// 字体
fontFamily?: 'sans' | 'serif' | 'mono';
fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
fontWeight?: 'normal' | 'medium' | 'bold';

// 文本对齐
textAlign?: 'left' | 'center' | 'right' | 'justify';

// 行高
lineHeight?: 'none' | 'tight' | 'normal' | 'relaxed';

// 字间距
letterSpacing?: 'tight' | 'normal' | 'wide';

// 文本装饰
textDecoration?: 'underline' | 'line-through' | 'none';

// 文本转换
textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
}

interface Animation {
// 动画
animation?: 'none' | 'spin' | 'ping' | 'pulse' | 'bounce';

// 过渡
transition?: 'none' | 'all' | 'colors' | 'opacity' | 'shadow';
duration?: 'fast' | 'normal' | 'slow';

// 变换
scale?: number;
rotate?: number;
translate?: string;

// 动画时机
delay?: number;
timing?: 'linear' | 'ease' | 'ease-in' | 'ease-out';
}

interface Interactive {
// 鼠标
cursor?: 'pointer' | 'default' | 'not-allowed';

// 悬停状态
hover?: Partial<Style>;

// 焦点状态
focus?: Partial<Style>;

// 激活状态
active?: Partial<Style>;

// 禁用状态
disabled?: boolean;
}

interface Responsive {
// 断点
sm?: Partial<Style>;
md?: Partial<Style>;
lg?: Partial<Style>;
xl?: Partial<Style>;

// 可见性
hidden?: 'sm' | 'md' | 'lg' | 'xl';
visible?: 'sm' | 'md' | 'lg' | 'xl';
}

## 定义 StyleBuilder ， 用于统一构建流程

每个 Theme 都要实现自己的 StyleBuilder ， 如 bootstrap, tailwind ， 组装起来的 classes 是不一样的。

interface ClassBuilder {
style(props: Style): this;
layout(props: Layout): this;
typography(props: Typography): this;
animation(props: Animation): this;
interactive(props: Interactive): this;
responsive(props: Responsive): this;
build(): string;
}

样例：

// Bootstrap 类生成器
class BsClassBuilder implements ClassBuilder {
private classes: Set<string> = new Set();

private styleBuilder: StyleBuilder;
private layoutBuilder: LayoutBuilder;
private typographyBuilder: TypographyBuilder;
private animationBuilder: AnimationBuilder;
private interactiveBuilder: interactiveBuilder;
private responsiveBuilder: responsiveBuilder;


style(props: Style): this;
layout(props: Layout): this;
typography(props: Typography): this;
animation(props: Animation): this;
interactive(props: Interactive): this;
responsive(props: Responsive): this;

// 构建最终类名
build(): string {

// if builder not empty
this.styleBuilder.build();
this.layoutBuilder.build();
this.typographyBuilder.build();
this.animationBuilder.build();
this.interactiveBuilder.build();
this.responsiveBuilder.build();

return Array.from(this.classes).join(' ');
}
}


// 布局构建器样例
class LayoutBuilder {
private classes: Set<string> = new Set();
constructor(private props: Layout) {}

build(): string {
 - 如果 props display 不为空，且为 grid ， 调用构建 grid 方法，累加类名

return this.classes
}

// 网格系统
grid() {
this.classes.add('d-grid');
return this;
}
...
}

## 使用示例

// 使用示例
const builder = new BsClassBuilder();

// 生成网格布局类
const gridClasses = builder
.layout(props: Layout)
.build();

// 结果: "d-grid ..."
