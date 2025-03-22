"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMerge = deepMerge;
exports.mergeThemes = mergeThemes;
exports.mergeThemeBase = mergeThemeBase;
exports.mergeComponents = mergeComponents;
exports.addPrefix = addPrefix;
exports.validateTheme = validateTheme;
/**
 * Check if a value is an object
 * @param item The value to check
 * @returns Whether the value is an object
 */
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
/**
 * Deep merge two objects
 * @param target The target object
 * @param source The source object
 * @returns The merged object
 */
function deepMerge(target, source) {
    // Create a new object to avoid mutating the original
    const result = { ...target };
    // Iterate through source properties
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const sourceValue = source[key];
            const targetValue = target[key];
            // If both values are objects, merge them recursively
            if (isObject(sourceValue) && isObject(targetValue)) {
                result[key] = deepMerge(targetValue, sourceValue);
            }
            else {
                // Otherwise, use the source value
                result[key] = sourceValue;
            }
        }
    }
    return result;
}
/**
 * Merge two jsons
 * @param parent The parent jsons
 * @param child The child jsons
 * @returns The merged jsons
 */
function mergeThemes(parent, child) {
    return {
        ...parent,
        ...child,
        base: mergeThemeBase(parent.base, child.base),
        components: mergeComponents(parent.components, child.components)
    };
}
/**
 * Merge two jsons bases
 * @param parentBase The parent jsons base
 * @param childBase The child jsons base
 * @returns The merged jsons base
 */
function mergeThemeBase(parentBase, childBase) {
    return deepMerge(parentBase, childBase);
}
/**
 * Merge two components objects
 * @param parentComponents The parent components
 * @param childComponents The child components
 * @returns The merged components
 */
function mergeComponents(parentComponents, childComponents) {
    const result = { ...parentComponents };
    Object.entries(childComponents).forEach(([name, component]) => {
        if (result[name]) {
            // Merge component variants
            result[name] = {
                base: component.base || result[name].base,
                variants: deepMerge(result[name].variants, component.variants)
            };
        }
        else {
            result[name] = component;
        }
    });
    return result;
}
/**
 * Add prefix to class names
 * @param classes The class names
 * @param prefix The prefix
 * @returns The prefixed class names
 */
function addPrefix(classes, prefix) {
    if (!prefix)
        return classes;
    return classes.split(' ').map(cls => `${prefix}-${cls}`).join(' ');
}
/**
 * Validate a jsons object
 * @param theme The jsons to validate
 * @returns Whether the jsons is valid
 */
function validateTheme(theme) {
    if (!theme)
        return false;
    if (typeof theme.name !== 'string')
        return false;
    if (theme.mode !== 'light' && theme.mode !== 'dark')
        return false;
    if (!theme.base || typeof theme.base !== 'object')
        return false;
    if (!theme.components || typeof theme.components !== 'object')
        return false;
    return true;
}
