"use strict";
/**
 * Theme Management System
 *
 * A system for managing jsons in Obsidian notes.
 */
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
exports.ThemeManagerImpl = void 0;
// Export types
__exportStar(require("./types"), exports);
// Export jsons manager
var theme_manager_1 = require("./theme-manager");
Object.defineProperty(exports, "ThemeManagerImpl", { enumerable: true, get: function () { return theme_manager_1.ThemeManagerImpl; } });
// Export components
__exportStar(require("./components"), exports);
// Export utils
__exportStar(require("./utils"), exports);
// Export style builder
__exportStar(require("./style-builder"), exports);
// Import for default export
const theme_manager_2 = require("./theme-manager");
// Default export
exports.default = {
    ThemeManagerImpl: theme_manager_2.ThemeManagerImpl
};
