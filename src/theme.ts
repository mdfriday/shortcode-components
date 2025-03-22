import {ThemeManager, ThemeManagerImpl} from './themes';
import bootstrapDarkTheme from './themes/jsons/bootstrap-dark.json';
import bootstrapLightTheme from './themes/jsons/bootstrap-light.json';
import tailwindDarkTheme from './themes/jsons/tailwind-dark.json';
import tailwindLightTheme from './themes/jsons/tailwind-light.json';
import baseDarkTheme from './themes/jsons/base-dark.json';
import baseLightTheme from './themes/jsons/base-light.json';

export class Theme {
    private readonly themeManager: ThemeManager;

    constructor(prefix: string = '') {
        this.themeManager = new ThemeManagerImpl(prefix);

        // 预加载主题
        const themes = [
            bootstrapDarkTheme,
            bootstrapLightTheme,
            tailwindDarkTheme,
            tailwindLightTheme,
            baseDarkTheme,
            baseLightTheme
        ];

        this.themeManager.preloadThemes(themes);
        this.themeManager.setCurrentTheme('bootstrap', 'light');
    }

    manager(): ThemeManager {
        return this.themeManager
    }
}
