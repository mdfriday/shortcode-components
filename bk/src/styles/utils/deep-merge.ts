/**
 * 深度合并对象
 * @param target 目标对象
 * @param sources 源对象列表
 * @returns 合并后的对象
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: Array<Partial<T>>
): T {
  if (!sources.length) return target;

  const source = sources.shift();
  if (source === undefined) return target;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }

  return deepMerge(target, ...sources);
}

/**
 * 判断是否为对象
 * @param item 待判断项
 * @returns 是否为对象
 */
function isObject(item: unknown): item is Record<string, any> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
} 