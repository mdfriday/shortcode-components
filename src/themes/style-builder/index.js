"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleBuilderRegistry = void 0;
__exportStar(require("./types"), exports);
__exportStar(require("./base-builder"), exports);
__exportStar(require("./bootstrap-builder"), exports);
__exportStar(require("./tailwind-builder"), exports);
const bootstrap_builder_1 = require("./bootstrap-builder");
const tailwind_builder_1 = require("./tailwind-builder");
/**
 * Style builder factory registry
 */
class StyleBuilderRegistry {
    /**
     * Register a new style builder factory
     * @param name Factory name
     * @param factory Factory function
     */
    static registerFactory(name, factory) {
        StyleBuilderRegistry.factories[name] = factory;
    }
    /**
     * Get a style builder factory by name
     * @param name Factory name
     * @param theme Theme to use
     * @returns Style builder factory
     */
    static getFactory(name, theme) {
        const factoryFn = StyleBuilderRegistry.factories[name];
        if (!factoryFn) {
            throw new Error(`Style builder factory not found: ${name}`);
        }
        return factoryFn(theme);
    }
    /**
     * Check if a style builder factory exists
     * @param name Factory name
     * @returns True if the factory exists
     */
    static hasFactory(name) {
        return !!StyleBuilderRegistry.factories[name];
    }
}
exports.StyleBuilderRegistry = StyleBuilderRegistry;
StyleBuilderRegistry.factories = {
    bootstrap: (theme) => new bootstrap_builder_1.BootstrapStyleBuilderFactory(theme),
    tailwind: (theme) => new tailwind_builder_1.TailwindStyleBuilderFactory(theme)
};
