"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardComponent = void 0;
const base_component_1 = require("./base-component");
/**
 * Card component implementation
 */
class CardComponent extends base_component_1.BaseComponent {
    /**
     * Create a new CardComponent
     * @param variant The card variant
     * @param parent Optional parent component name
     */
    constructor(variant, parent) {
        super('card', variant, parent);
    }
    /**
     * Generate base class CSS
     * @param theme The jsons
     * @param prefix Optional prefix for CSS classes
     * @returns The CSS string
     */
    generateBaseCSS(theme, prefix) {
        const baseClass = prefix ? `${prefix}-${this.variant.base}` : this.variant.base;
        let css = `.${baseClass} {\n`;
        // Common card styles
        css += `  display: block;\n`;
        css += `  background-color: ${theme.base.colors.background};\n`;
        css += `  color: ${theme.base.colors.text};\n`;
        css += `  overflow: hidden;\n`;
        css += `  border-radius: ${theme.base.borderRadius.md};\n`;
        css += `}\n\n`;
        return css;
    }
    /**
     * Generate variant class CSS
     * @param theme The jsons
     * @param prefix Optional prefix for CSS classes
     * @returns The CSS string
     */
    generateVariantCSS(theme, prefix) {
        let css = '';
        // Process variants
        Object.entries(this.variant.variants).forEach(([variantName, variants]) => {
            Object.entries(variants).forEach(([variantValue, className]) => {
                const variantClass = prefix ? `${prefix}-${className}` : className;
                css += `.${variantClass} {\n`;
                // Variant-specific styles
                if (variantName === 'variant') {
                    if (variantValue === 'default') {
                        css += `  background-color: ${theme.base.colors.background};\n`;
                        css += `  border: 1px solid ${theme.base.colors.border};\n`;
                    }
                    else if (variantValue === 'primary') {
                        css += `  background-color: ${theme.base.colors.primary};\n`;
                        css += `  color: white;\n`;
                    }
                    else if (variantValue === 'outline') {
                        css += `  background-color: transparent;\n`;
                        css += `  border: 1px solid ${theme.base.colors.border};\n`;
                    }
                    else if (variantValue === 'ghost') {
                        css += `  background-color: transparent;\n`;
                        css += `  border: none;\n`;
                    }
                }
                else if (variantName === 'padding') {
                    if (variantValue === 'none') {
                        css += `  padding: 0;\n`;
                    }
                    else if (variantValue === 'sm') {
                        css += `  padding: ${theme.base.spacing[2]};\n`;
                    }
                    else if (variantValue === 'md') {
                        css += `  padding: ${theme.base.spacing[4]};\n`;
                    }
                    else if (variantValue === 'lg') {
                        css += `  padding: ${theme.base.spacing[6]};\n`;
                    }
                }
                else if (variantName === 'shadow') {
                    if (variantValue === 'none') {
                        css += `  box-shadow: none;\n`;
                    }
                    else if (variantValue === 'sm') {
                        css += `  box-shadow: ${theme.base.shadows.sm};\n`;
                    }
                    else if (variantValue === 'md') {
                        css += `  box-shadow: ${theme.base.shadows.md};\n`;
                    }
                    else if (variantValue === 'lg') {
                        css += `  box-shadow: ${theme.base.shadows.lg};\n`;
                    }
                }
                css += `}\n\n`;
            });
        });
        return css;
    }
}
exports.CardComponent = CardComponent;
