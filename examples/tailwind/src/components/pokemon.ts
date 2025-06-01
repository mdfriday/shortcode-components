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
 * 使用语义化 Tailwind 类名和多主题系统
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
    
    <!-- 头部区域 -->
    <div class="bg-primary text-primaryForeground p-6 relative">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold">{{ .Get "name" }}</h2>
        <span class="text-sm opacity-90">{{ .Get "date" }}</span>
      </div>
      
      <!-- Pokemon 图片 -->
      {{ if .Get "characterImage" }}
      <div class="flex justify-center mb-4">
        <img src="{{ .Get "characterImage" }}" 
             alt="{{ .Get "name" }}" 
             class="w-32 h-32 object-contain drop-shadow-lg">
      </div>
      {{ end }}
      
      <!-- 类型标签 -->
      {{ if .Get "types" }}
      <div class="flex flex-wrap gap-2 justify-center">
        {{ $types := split (.Get "types") "," }}
        {{ range $type := $types }}
          <span class="bg-accent text-accentForeground px-3 py-1 rounded-full text-sm font-medium">
            {{ $type }}
          </span>
        {{ end }}
      </div>
      {{ end }}
    </div>
    
    <!-- 内容区域 -->
    <div class="bg-surface text-surfaceForeground p-6">
      
      <!-- 属性信息 -->
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
            <div class="text-center">
              <div class="bg-muted text-mutedForeground px-2 py-1 rounded text-xs">
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
      
      <!-- 描述内容 -->
      <div class="bg-muted text-mutedForeground rounded-lg p-4 mb-6">
        <p class="text-sm leading-relaxed">{{ .Inner }}</p>
      </div>
      
      <!-- 基础数据 -->
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
            <div class="flex items-center gap-3">
              <div class="text-xs w-12 text-right font-medium">{{ $label }}</div>
              <div class="text-xs w-8 text-center font-bold">{{ $statValue }}</div>
              <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div class="bg-primary h-full rounded-full transition-all duration-700 ease-out" 
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
    
    <!-- 装饰性精灵球 -->
    {{ if .Get "pokeballImage" }}
    <div class="absolute bottom-4 right-4 opacity-20">
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
 */
export function registerCtaFormComponent(renderer: ShortcodeRenderer) {
  renderer.registerTemplateShortcode('ctaForm', {
    template: `
<div class="max-w-md mx-auto {{ .Get "class" | default "" }}"
     {{ if .Get "style" }}style="{{ .Get "style" }}"{{ end }}>
  
  <!-- 主题容器 - 每个表单独立主题 -->
  {{ $themeConfig := parseTheme (.Get "theme") (.Get "mode") }}
  <div class="theme-{{ $themeConfig.theme }} {{ $themeConfig.mode }}" 
       data-theme="{{ $themeConfig.theme }}" 
       data-mode="{{ $themeConfig.mode }}">
    
    <div class="bg-surface text-surfaceForeground rounded-lg p-6 shadow-theme border border-border">
      
      <h2 class="text-2xl font-bold text-center mb-6 text-primary">
        {{ .Get "title" }}
      </h2>
      
      <form class="space-y-4">
        <input type="email" 
               placeholder="{{ .Get "placeholder" }}" 
               class="w-full px-4 py-3 bg-input text-foreground border border-border rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                      transition-all duration-200">
        
        <button type="submit" 
                class="w-full bg-primary text-primaryForeground px-4 py-3 rounded-lg 
                       font-medium transition-all duration-200 
                       hover:opacity-90 hover:shadow-lg transform hover:scale-[1.02]
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
 */
export function registerThemeSwitcherComponent(renderer: ShortcodeRenderer) {
  renderer.registerTemplateShortcode('themeSwitcher', {
    template: `
<div class="fixed top-4 right-4 z-50">
  <div class="theme-switcher p-4">
    <h3 class="text-sm font-semibold mb-3 text-primary">主题切换</h3>
    
    <div class="space-y-2">
      <div>
        <label class="text-xs text-mutedForeground">主题:</label>
        <select id="theme-select" class="w-full mt-1 px-2 py-1 bg-input text-foreground border border-border rounded text-xs">
          <option value="base">Base</option>
          <option value="fire">Fire</option>
          <option value="ocean">Ocean</option>
          <option value="electric">Electric</option>
          <option value="grass">Grass</option>
        </select>
      </div>
      
      <div>
        <label class="text-xs text-mutedForeground">模式:</label>
        <select id="mode-select" class="w-full mt-1 px-2 py-1 bg-input text-foreground border border-border rounded text-xs">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
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