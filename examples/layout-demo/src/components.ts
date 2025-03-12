import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { registerContainerShortcode, registerGridShortcode, registerFlexShortcode } from '../../../src/components/layout';
import { registerButtonShortcode } from '../../../src/components/content/Button';
import { Theme } from '../../../src/styles/types/theme';
import { baseTheme, lightTheme, darkTheme } from '../../../src/styles/themes';
import { baseComponentTheme } from '../../../src/styles/themes/components/base';
import { darkComponentTheme } from '../../../src/styles/themes/components/dark';
import { ThemeManager, ThemeManagerOptions } from '../../../src/styles/types/theme-manager';
import { DefaultThemeManager } from '../../../src/styles/core/theme-manager';
import { TailwindAdapter } from '../../../src/styles/adapters/tailwind';

// 创建 Tailwind 适配器
const tailwindAdapter = new TailwindAdapter({
    jit: true,
    prefix: 'tw-'
});

// 创建主题管理器
const themeManager = new DefaultThemeManager({
    defaultTheme: 'base',
    storageKey: 'layout-demo-theme'
});

// 设置 Tailwind 适配器
themeManager.setAdapter(tailwindAdapter);

// 注册主题
themeManager.registerTheme({
    name: 'base',
    config: {
        ...baseTheme,
        components: baseComponentTheme
    },
    description: '基础主题'
});

themeManager.registerTheme({
    name: 'light',
    config: {
        ...lightTheme,
        components: baseComponentTheme
    },
    description: '亮色主题',
    extends: 'base'
});

themeManager.registerTheme({
    name: 'dark',
    config: {
        ...darkTheme,
        components: darkComponentTheme
    },
    description: '暗色主题',
    extends: 'base'
});

// 设置当前主题
export async function setCurrentTheme(theme: string) {
    await themeManager.switchTheme(theme);
}

// 获取当前主题
export function getCurrentTheme(): Theme {
    const config = themeManager.getCurrentThemeConfig();
    if (!config) {
        throw new Error('No theme configured');
    }
    return {
        name: config.name,
        description: config.description || '',
        components: config.components,
        adapter: tailwindAdapter
    };
}

// 获取生成的 Tailwind CSS
export async function getGeneratedCSS(): Promise<string> {
    return await tailwindAdapter.generateCSS();
}

// 注册所有组件
export function registerComponents(renderer: ShortcodeRenderer) {
    // 获取当前主题
    const theme = getCurrentTheme();

    // 注册组件
    registerContainerShortcode(renderer, theme);
    registerGridShortcode(renderer, theme);
    registerFlexShortcode(renderer, theme);
    registerButtonShortcode(renderer, theme);
} 