import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';

/**
 * 解析主题参数，返回有效的主题配置
 */
function parseTheme(theme?: string, mode?: string) {
  const validThemes = ['base', 'fire', 'ocean', 'electric', 'grass'];
  const validModes = ['light', 'dark'];
  
  return {
    theme: validThemes.includes(theme || '') ? theme : 'base',
    mode: validModes.includes(mode || '') ? mode : 'light'
  };
}

/**
 * 注册 Pokemon 卡片组件
 * 🎯 使用基于 Tailwind 基础令牌的语义化类名和多主题系统
 */
export function registerPokemonComponent(renderer: ShortcodeRenderer) {
  renderer.registerTemplateShortcode('pokemon', {
    template: `
<div class="pokemon-card max-w-md mx-auto overflow-hidden {{ .Get "class" | default "" }}"
     {{ if .Get "style" }}style="{{ .Get "style" }}"{{ end }}>
  
  <!-- 主题容器 - 每个卡片独立主题 -->
  {{ $themeConfig := parseTheme (.Get "theme") (.Get "mode") }}
  <div class="theme-{{ $themeConfig.theme }} {{ $themeConfig.mode }}" 
       data-theme="{{ $themeConfig.theme }}" 
       data-mode="{{ $themeConfig.mode }}">
    
    <!-- 头部区域 - 使用标准化 Tailwind 类名 -->
    <div class="bg-primary text-primary-foreground p-6 relative rounded-t-lg">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold">{{ .Get "name" }}</h2>
        <span class="text-sm opacity-90">{{ .Get "date" }}</span>
      </div>
      
      <!-- Pokemon 图片 -->
      {{ if .Get "characterImage" }}
      <div class="flex justify-center mb-4">
        <img src="{{ .Get "characterImage" }}" 
             alt="{{ .Get "name" }}" 
             class="w-32 h-32 object-contain drop-shadow-lg transition-transform duration-300 hover:scale-110">
      </div>
      {{ end }}
      
      <!-- 类型标签 - 使用 Tailwind 间距和动画 -->
      {{ if .Get "types" }}
      <div class="flex flex-wrap gap-2 justify-center">
        {{ $types := split (.Get "types") "," }}
        {{ range $type := $types }}
          <span class="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium
                       transition-all duration-200 hover:shadow-md hover:scale-105">
            {{ $type }}
          </span>
        {{ end }}
      </div>
      {{ end }}
    </div>
    
    <!-- 内容区域 - 使用标准化语义类名 -->
    <div class="bg-surface text-surface-foreground p-6">
      
      <!-- 属性信息 - 使用 Tailwind 网格系统 -->
      {{ if .Get "subjects" }}
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-primary mb-3 text-center">
          {{ .Get "subjectTitle" | default "属性" }}
        </h3>
        <div class="grid grid-cols-3 gap-4">
          {{ $subjects := split (.Get "subjects") ";" }}
          {{ range $subject := $subjects }}
            {{ if $subject }}
            {{ $parts := split $subject "," }}
            {{ if ge (len $parts) 2 }}
            <div class="text-center group">
              <div class="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs 
                          transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                {{ index $parts 0 }}
              </div>
              <div class="font-medium mt-1 text-sm">{{ index $parts 1 }}</div>
            </div>
            {{ end }}
            {{ end }}
          {{ end }}
        </div>
      </div>
      {{ end }}
      
      <!-- 描述内容 - 使用 Tailwind 排版 -->
      <div class="bg-muted text-muted-foreground rounded-lg p-4 mb-6 
                  border border-border transition-all duration-200 hover:shadow-sm">
        <p class="text-sm leading-relaxed">{{ .Inner }}</p>
      </div>
      
      <!-- 基础数据 - 使用 Tailwind 进度条样式 -->
      {{ if .Get "statsValues" }}
      <div>
        <h3 class="text-lg font-semibold text-primary mb-3 text-center">
          {{ .Get "statsTitle" | default "基础数据" }}
        </h3>
        <div class="space-y-3">
          {{ $labels := split (.Get "statsLabels") "," }}
          {{ $values := split (.Get "statsValues") ";" }}
          {{ range $index, $value := $values }}
            {{ if $value }}
            {{ $parts := split $value "," }}
            {{ if and (ge (len $parts) 2) (lt $index (len $labels)) }}
            {{ $label := index $labels $index }}
            {{ $statValue := index $parts 1 }}
            {{ $percentage := mul (div (float $statValue) 21) 100 }}
            <div class="flex items-center gap-3 group">
              <div class="text-xs w-12 text-right font-medium text-muted-foreground">{{ $label }}</div>
              <div class="text-xs w-8 text-center font-bold text-foreground 
                          transition-colors duration-200 group-hover:text-primary">{{ $statValue }}</div>
              <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden border border-border">
                <div class="bg-primary h-full rounded-full transition-all duration-700 ease-out 
                            group-hover:bg-accent" 
                     style="width: {{ $percentage }}%"></div>
              </div>
            </div>
            {{ end }}
            {{ end }}
          {{ end }}
        </div>
      </div>
      {{ end }}
    </div>
    
    <!-- 装饰性精灵球 - 添加 Tailwind 动画效果 -->
    {{ if .Get "pokeballImage" }}
    <div class="absolute bottom-4 right-4 opacity-20 transition-all duration-300 hover:opacity-40 hover:rotate-12">
      <img src="{{ .Get "pokeballImage" }}" alt="Pokeball" class="w-12 h-12">
    </div>
    {{ end }}
    
  </div>
</div>
    `,
    funcMap: new Map<string, (...args: any[]) => any>([
      ['split', (str: string | undefined | null, sep: string) => {
        if (!str || typeof str !== 'string') return [];
        return str.split(sep);
      }],
      ['default', (value: any, defaultValue: any) => value || defaultValue],
      ['div', (a: number, b: number) => a / b],
      ['mul', (a: number, b: number) => a * b],
      ['float', (str: string) => parseFloat(str)],
      ['len', (arr: any[]) => Array.isArray(arr) ? arr.length : 0],
      ['ge', (a: number, b: number) => a >= b],
      ['lt', (a: number, b: number) => a < b],
      ['and', (...args: any[]) => args.every(Boolean)],
      ['index', (arr: any[], i: number) => Array.isArray(arr) && i >= 0 && i < arr.length ? arr[i] : ''],
      ['parseTheme', parseTheme]
    ]),
    dataProvider: (params: string[], content?: string) => ({ Inner: content })
  });
}

/**
 * 注册 CTA 表单组件
 * 🎯 使用标准化 Tailwind 语义类名
 */
export function registerCtaFormComponent(renderer: ShortcodeRenderer) {
  renderer.registerTemplateShortcode('ctaForm', {
    template: `
<div class="cta-form max-w-md mx-auto {{ .Get "class" | default "" }}"
     {{ if .Get "style" }}style="{{ .Get "style" }}"{{ end }}>
  
  <!-- 主题容器 - 每个表单独立主题 -->
  {{ $themeConfig := parseTheme (.Get "theme") (.Get "mode") }}
  <div class="theme-{{ $themeConfig.theme }} {{ $themeConfig.mode }}" 
       data-theme="{{ $themeConfig.theme }}" 
       data-mode="{{ $themeConfig.mode }}">
    
    <div class="bg-surface text-surface-foreground rounded-lg p-6 shadow-theme border border-border
                transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      
      <h2 class="text-2xl font-bold text-center mb-6 text-primary
                 transition-colors duration-200 hover:text-accent">
        {{ .Get "title" }}
      </h2>
      
      <form class="space-y-4">
        <input type="email" 
               placeholder="{{ .Get "placeholder" }}" 
               class="w-full px-4 py-3 bg-input text-foreground border border-border rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                      transition-all duration-200 placeholder:text-muted-foreground
                      hover:border-primary/50">
        
        <button type="submit" 
                class="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg 
                       font-medium transition-all duration-200 
                       hover:bg-accent hover:text-accent-foreground hover:shadow-lg 
                       transform hover:scale-[1.02] active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          {{ .Get "buttonText" }}
        </button>
      </form>
      
    </div>
  </div>
</div>
    `,
    funcMap: new Map<string, (...args: any[]) => any>([
      ['default', (value: any, defaultValue: any) => value || defaultValue],
      ['parseTheme', parseTheme]
    ])
  });
}

/**
 * 注册主题切换器组件
 * 🎯 使用现代化的切换器界面
 */
export function registerThemeSwitcherComponent(renderer: ShortcodeRenderer) {
  renderer.registerTemplateShortcode('themeSwitcher', {
    template: `
<div class="fixed top-4 right-4 z-50">
  <div class="theme-switcher bg-surface/80 backdrop-blur-sm text-surface-foreground 
              rounded-lg border border-border shadow-theme p-4
              transition-all duration-300 hover:shadow-lg hover:bg-surface">
    <h3 class="text-sm font-semibold mb-3 text-primary flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"></path>
      </svg>
      主题切换
    </h3>
    
    <div class="space-y-3">
      <div>
        <label class="text-xs text-muted-foreground font-medium block mb-1">主题风格:</label>
        <select id="theme-select" 
                class="w-full px-3 py-2 bg-input text-foreground border border-border rounded-md text-xs
                       focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                       transition-all duration-200 hover:border-primary/50">
          <option value="base">🔷 Base</option>
          <option value="fire">🔥 Fire</option>
          <option value="ocean">🌊 Ocean</option>
          <option value="electric">⚡ Electric</option>
          <option value="grass">🌿 Grass</option>
        </select>
      </div>
      
      <div>
        <label class="text-xs text-muted-foreground font-medium block mb-1">显示模式:</label>
        <select id="mode-select" 
                class="w-full px-3 py-2 bg-input text-foreground border border-border rounded-md text-xs
                       focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                       transition-all duration-200 hover:border-primary/50">
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
        </select>
      </div>
    </div>
  </div>
</div>
    `,
    funcMap: new Map<string, (...args: any[]) => any>([
      ['default', (value: any, defaultValue: any) => value || defaultValue]
    ])
  });
} 