"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
const themes_1 = require("./themes");
const bootstrap_dark_json_1 = __importDefault(require("./themes/jsons/bootstrap-dark.json"));
const bootstrap_light_json_1 = __importDefault(require("./themes/jsons/bootstrap-light.json"));
const tailwind_dark_json_1 = __importDefault(require("./themes/jsons/tailwind-dark.json"));
const tailwind_light_json_1 = __importDefault(require("./themes/jsons/tailwind-light.json"));
const base_dark_json_1 = __importDefault(require("./themes/jsons/base-dark.json"));
const base_light_json_1 = __importDefault(require("./themes/jsons/base-light.json"));
class Theme {
    constructor(prefix = '') {
        this.themeManager = new themes_1.ThemeManagerImpl(prefix);
        // 预加载主题
        const themes = [
            bootstrap_dark_json_1.default,
            bootstrap_light_json_1.default,
            tailwind_dark_json_1.default,
            tailwind_light_json_1.default,
            base_dark_json_1.default,
            base_light_json_1.default
        ];
        this.themeManager.preloadThemes(themes);
        this.themeManager.setCurrentTheme('bootstrap', 'light');
    }
    manager() {
        return this.themeManager;
    }
}
exports.Theme = Theme;
