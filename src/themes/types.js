"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseThemeComponent = void 0;
/**
 * Base component implementation
 * Provides common functionality for all components
 */
class BaseThemeComponent {
    constructor(name, variant, parent) {
        this.name = name;
        this.variant = variant;
        this.parent = parent;
    }
    /**
     * Generate base class CSS
     * @param theme The jsons
     * @param prefix Optional prefix for CSS classes
     * @returns The CSS string
     */
    generateBaseCSS(theme, prefix) {
        const baseClass = prefix ? `${prefix}-${this.variant.base}` : this.variant.base;
        return `.${baseClass} {\n  /* Base styles for ${this.name} */\n}\n\n`;
    }
    /**
     * Generate variant class CSS
     * @param theme The jsons
     * @param prefix Optional prefix for CSS classes
     * @returns The CSS string
     */
    generateVariantCSS(theme, prefix) {
        let css = '';
        Object.entries(this.variant.variants).forEach(([variantName, variants]) => {
            Object.entries(variants).forEach(([variantValue, className]) => {
                const variantClass = prefix ? `${prefix}-${className}` : className;
                css += `.${variantClass} {\n  /* Variant styles for ${this.name} ${variantName}=${variantValue} */\n}\n\n`;
            });
        });
        return css;
    }
}
exports.BaseThemeComponent = BaseThemeComponent;
