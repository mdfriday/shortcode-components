"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputComponent = exports.CardComponent = exports.ButtonComponent = exports.BaseComponent = exports.ThemeComponentsRegistry = void 0;
const base_component_1 = require("./base-component");
const button_1 = require("./button");
const card_1 = require("./card");
const input_1 = require("./input");
/**
 * Components registry implementation
 */
class ThemeComponentsRegistry {
    /**
     * Create a new ThemeComponentsRegistry
     */
    constructor() {
        /**
         * Map of components, keyed by name
         */
        this.components = {};
        // Register default components
        this.registerDefaultComponents();
    }
    /**
     * Register a component
     * @param component The component to register
     */
    registerComponent(component) {
        this.components[component.name] = component;
    }
    /**
     * Get a component by name
     * @param name The component name
     * @returns The component
     */
    getComponent(name) {
        const component = this.components[name];
        if (!component) {
            throw new Error(`Component ${name} not found`);
        }
        return component;
    }
    /**
     * Get all components
     * @returns All components
     */
    getAllComponents() {
        return Object.values(this.components);
    }
    /**
     * Generate CSS for all components
     * @param theme The jsons
     * @param prefix Optional prefix for CSS classes
     * @returns The CSS string
     */
    generateAllComponentsCSS(theme, prefix) {
        let css = '';
        // Generate CSS for each component
        for (const component of this.getAllComponents()) {
            const componentCSS = component.generateCSS(theme, prefix);
            // 只添加非空的 CSS
            if (componentCSS.trim() !== '') {
                css += componentCSS;
            }
        }
        return css;
    }
    /**
     * Register default components
     */
    registerDefaultComponents() {
        // Create default variants for components with proper base class names
        const buttonVariant = {
            base: 'btn',
            variants: {
                variant: {
                    primary: 'btn-primary',
                    secondary: 'btn-secondary',
                    outline: 'btn-outline',
                    ghost: 'btn-ghost',
                    success: 'btn-success',
                    danger: 'btn-danger',
                    warning: 'btn-warning',
                    info: 'btn-info'
                },
                size: {
                    xs: 'btn-xs',
                    sm: 'btn-sm',
                    md: 'btn-md',
                    lg: 'btn-lg',
                    xl: 'btn-xl'
                },
                rounded: {
                    'true': 'btn-rounded',
                    'false': ''
                },
                disabled: {
                    'true': 'btn-disabled',
                    'false': ''
                }
            }
        };
        const cardVariant = {
            base: 'card',
            variants: {
                variant: {
                    default: 'card-default',
                    primary: 'card-primary',
                    secondary: 'card-secondary',
                    outline: 'card-outline',
                    ghost: 'card-ghost'
                },
                padding: {
                    none: 'card-padding-none',
                    sm: 'card-padding-sm',
                    md: 'card-padding-md',
                    lg: 'card-padding-lg'
                },
                shadow: {
                    none: 'card-shadow-none',
                    sm: 'card-shadow-sm',
                    md: 'card-shadow-md',
                    lg: 'card-shadow-lg'
                }
            }
        };
        const inputVariant = {
            base: 'input',
            variants: {
                variant: {
                    default: 'input-default',
                    outline: 'input-outline',
                    filled: 'input-filled',
                    underline: 'input-underline'
                },
                size: {
                    sm: 'input-sm',
                    md: 'input-md',
                    lg: 'input-lg'
                },
                disabled: {
                    'true': 'input-disabled',
                    'false': ''
                },
                error: {
                    'true': 'input-error',
                    'false': ''
                }
            }
        };
        // Register default components
        this.registerComponent(new button_1.ButtonComponent(buttonVariant));
        this.registerComponent(new card_1.CardComponent(cardVariant));
        this.registerComponent(new input_1.InputComponent(inputVariant));
    }
    /**
     * Create a component from a jsons component variant
     * @param name The component name
     * @param variant The component variant
     * @returns The component
     */
    createComponentFromVariant(name, variant) {
        switch (name) {
            case 'button':
                return new button_1.ButtonComponent(variant);
            case 'card':
                return new card_1.CardComponent(variant);
            case 'input':
                return new input_1.InputComponent(variant);
            default:
                // Use base component for unknown components
                return new base_component_1.BaseComponent(name, variant);
        }
    }
}
exports.ThemeComponentsRegistry = ThemeComponentsRegistry;
// Export all components
var base_component_2 = require("./base-component");
Object.defineProperty(exports, "BaseComponent", { enumerable: true, get: function () { return base_component_2.BaseComponent; } });
var button_2 = require("./button");
Object.defineProperty(exports, "ButtonComponent", { enumerable: true, get: function () { return button_2.ButtonComponent; } });
var card_2 = require("./card");
Object.defineProperty(exports, "CardComponent", { enumerable: true, get: function () { return card_2.CardComponent; } });
var input_2 = require("./input");
Object.defineProperty(exports, "InputComponent", { enumerable: true, get: function () { return input_2.InputComponent; } });
