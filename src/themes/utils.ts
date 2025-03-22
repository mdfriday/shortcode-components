import { Theme, ThemeBase } from './types';

/**
 * Check if a value is an object
 * @param item The value to check
 * @returns Whether the value is an object
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects
 * @param target The target object
 * @param source The source object
 * @returns The merged object
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  // Create a new object to avoid mutating the original
  const result: Record<string, any> = { ...target };

  // Iterate through source properties
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      // If both values are objects, merge them recursively
      if (isObject(sourceValue) && isObject(targetValue)) {
        result[key] = deepMerge(targetValue, sourceValue as any);
      } else {
        // Otherwise, use the source value
        result[key] = sourceValue;
      }
    }
  }

  return result as T;
}

/**
 * Merge two jsons
 * @param parent The parent jsons
 * @param child The child jsons
 * @returns The merged jsons
 */
export function mergeThemes(parent: Theme, child: Theme): Theme {
  return {
    ...parent,
    ...child,
    base: mergeThemeBase(parent.base, child.base as ThemeBase),
    components: mergeComponents(parent.components, child.components)
  };
}

/**
 * Merge two jsons bases
 * @param parentBase The parent jsons base
 * @param childBase The child jsons base
 * @returns The merged jsons base
 */
export function mergeThemeBase(parentBase: ThemeBase, childBase: Partial<ThemeBase>): ThemeBase {
  return deepMerge(parentBase, childBase);
}

/**
 * Merge two components objects
 * @param parentComponents The parent components
 * @param childComponents The child components
 * @returns The merged components
 */
export function mergeComponents(
  parentComponents: Record<string, any>,
  childComponents: Record<string, any>
): Record<string, any> {
  const result = { ...parentComponents };
  
  Object.entries(childComponents).forEach(([name, component]) => {
    if (result[name]) {
      // Merge component variants
      result[name] = {
        base: component.base || result[name].base,
        variants: deepMerge(result[name].variants, component.variants)
      };
    } else {
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
export function addPrefix(classes: string, prefix: string): string {
  if (!prefix) return classes;
  return classes.split(' ').map(cls => `${prefix}-${cls}`).join(' ');
}

/**
 * Validate a jsons object
 * @param theme The jsons to validate
 * @returns Whether the jsons is valid
 */
export function validateTheme(theme: any): boolean {
  if (!theme) return false;
  if (typeof theme.name !== 'string') return false;
  if (theme.mode !== 'light' && theme.mode !== 'dark') return false;
  if (!theme.base || typeof theme.base !== 'object') return false;
  if (!theme.components || typeof theme.components !== 'object') return false;
  
  return true;
} 