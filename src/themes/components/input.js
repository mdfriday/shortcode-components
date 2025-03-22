"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputComponent = void 0;
const base_component_1 = require("./base-component");
/**
 * Input component implementation
 */
class InputComponent extends base_component_1.BaseComponent {
    /**
     * Create a new InputComponent
     * @param variant The input variant
     * @param parent Optional parent component name
     */
    constructor(variant, parent) {
        super('input', variant, parent);
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
        // Common input styles
        css += `  display: block;\n`;
        css += `  width: 100%;\n`;
        css += `  font-family: ${theme.base.typography.fontFamily.sans};\n`;
        css += `  color: ${theme.base.colors.text};\n`;
        css += `  background-color: ${theme.base.colors.background};\n`;
        css += `  transition: ${theme.base.transitions.default || 'all 0.2s ease-in-out'};\n`;
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
                        css += `  border: 1px solid ${theme.base.colors.border};\n`;
                        css += `  border-radius: ${theme.base.borderRadius.default};\n`;
                    }
                    else if (variantValue === 'outline') {
                        css += `  border: 1px solid ${theme.base.colors.border};\n`;
                        css += `  border-radius: ${theme.base.borderRadius.default};\n`;
                        css += `  background-color: transparent;\n`;
                    }
                    else if (variantValue === 'filled') {
                        css += `  border: 1px solid transparent;\n`;
                        css += `  border-radius: ${theme.base.borderRadius.default};\n`;
                        css += `  background-color: rgba(0, 0, 0, 0.05);\n`;
                    }
                    else if (variantValue === 'underline') {
                        css += `  border: none;\n`;
                        css += `  border-bottom: 1px solid ${theme.base.colors.border};\n`;
                        css += `  border-radius: 0;\n`;
                        css += `  background-color: transparent;\n`;
                    }
                }
                else if (variantName === 'size') {
                    if (variantValue === 'sm') {
                        css += `  padding: 0.25rem 0.5rem;\n`;
                        css += `  font-size: ${theme.base.fontSize.sm};\n`;
                    }
                    else if (variantValue === 'md') {
                        css += `  padding: 0.5rem 0.75rem;\n`;
                        css += `  font-size: ${theme.base.fontSize.base};\n`;
                    }
                    else if (variantValue === 'lg') {
                        css += `  padding: 0.75rem 1rem;\n`;
                        css += `  font-size: ${theme.base.fontSize.lg};\n`;
                    }
                }
                else if (variantName === 'disabled') {
                    if (variantValue === 'true') {
                        css += `  opacity: 0.6;\n`;
                        css += `  cursor: not-allowed;\n`;
                    }
                }
                else if (variantName === 'error') {
                    if (variantValue === 'true') {
                        css += `  border-color: ${theme.base.colors.danger};\n`;
                    }
                }
                css += `}\n\n`;
            });
        });
        // Add focus states
        this.addFocusStates(css, theme, prefix);
        return css;
    }
    /**
     * Add focus states
     * @param css The CSS string
     * @param theme The jsons
     * @param prefix Optional prefix for CSS classes
     */
    addFocusStates(css, theme, prefix) {
        let result = css;
        // Default input focus
        const defaultClass = prefix ? `${prefix}-input-default` : 'input-default';
        result += `.${defaultClass}:focus {\n`;
        result += `  outline: none;\n`;
        result += `  border-color: ${theme.base.colors.primary};\n`;
        result += `  box-shadow: 0 0 0 2px ${this.transparentize(theme.base.colors.primary, 0.2)};\n`;
        result += `}\n\n`;
        // Outline input focus
        const outlineClass = prefix ? `${prefix}-input-outline` : 'input-outline';
        result += `.${outlineClass}:focus {\n`;
        result += `  outline: none;\n`;
        result += `  border-color: ${theme.base.colors.primary};\n`;
        result += `  box-shadow: 0 0 0 2px ${this.transparentize(theme.base.colors.primary, 0.2)};\n`;
        result += `}\n\n`;
        // Filled input focus
        const filledClass = prefix ? `${prefix}-input-filled` : 'input-filled';
        result += `.${filledClass}:focus {\n`;
        result += `  outline: none;\n`;
        result += `  background-color: rgba(0, 0, 0, 0.1);\n`;
        result += `}\n\n`;
        // Underline input focus
        const underlineClass = prefix ? `${prefix}-input-underline` : 'input-underline';
        result += `.${underlineClass}:focus {\n`;
        result += `  outline: none;\n`;
        result += `  border-bottom-color: ${theme.base.colors.primary};\n`;
        result += `}\n\n`;
        return result;
    }
    /**
     * Make a color transparent
     * @param color The color
     * @param opacity The opacity
     * @returns The transparent color
     */
    transparentize(color, opacity) {
        // This is a simple implementation
        // In a real-world scenario, you would use a color library
        return `rgba(0, 0, 0, ${opacity})`;
    }
}
exports.InputComponent = InputComponent;
