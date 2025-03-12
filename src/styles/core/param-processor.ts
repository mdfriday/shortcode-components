import { ParamValidationRule, ParamValidationResult, ParamValidationError } from '../types/params';

export class ParamProcessor {
  /**
   * 从短代码参数字符串中提取参数值
   * @param params 短代码参数数组
   * @param name 参数名称
   */
  static extractParam(params: string[], name: string): string | undefined {
    const param = params.find(p => p.startsWith(`${name}=`));
    if (!param) return undefined;
    
    const value = param.split('=')[1];
    return value ? value.replace(/^["']|["']$/g, '') : undefined;
  }

  /**
   * 验证并处理参数
   * @param params 短代码参数数组
   * @param rules 验证规则
   */
  static processParams<T extends Record<string, any>>(
    params: string[],
    rules: Record<keyof T, ParamValidationRule>
  ): ParamValidationResult<T> {
    const result: Partial<T> = {};
    const errors: ParamValidationError[] = [];

    for (const [key, rule] of Object.entries(rules)) {
      const value = this.extractParam(params, rule.name);
      const validationResult = this.validateParam(value, rule);

      if (!validationResult.isValid) {
        errors.push(...(validationResult.errors || []));
      } else if (validationResult.value !== undefined) {
        result[key as keyof T] = validationResult.value;
      }
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true, value: result as T };
  }

  /**
   * 验证单个参数
   * @param value 参数值
   * @param rule 验证规则
   */
  private static validateParam<T>(
    value: string | undefined,
    rule: ParamValidationRule<T>
  ): ParamValidationResult<T> {
    // 处理必需参数
    if (rule.required && value === undefined) {
      return {
        isValid: false,
        errors: [{ param: rule.name, message: `Parameter "${rule.name}" is required` }]
      };
    }

    // 如果值为空且有默认值，使用默认值
    if (value === undefined && rule.default !== undefined) {
      return { isValid: true, value: rule.default };
    }

    // 如果值为空且不是必需的，返回有效
    if (value === undefined && !rule.required) {
      return { isValid: true };
    }

    // 类型转换和验证
    let convertedValue: any = value;
    if (rule.type) {
      try {
        convertedValue = this.convertValue(value!, rule.type);
      } catch (error) {
        return {
          isValid: false,
          errors: [{ param: rule.name, message: `Invalid type for parameter "${rule.name}", expected ${rule.type}` }]
        };
      }
    }

    // 枚举值验证
    if (rule.enum && !rule.enum.includes(convertedValue)) {
      return {
        isValid: false,
        errors: [{ param: rule.name, message: `Value "${value}" is not allowed for parameter "${rule.name}"` }]
      };
    }

    // 自定义验证
    if (rule.validate && !rule.validate(convertedValue)) {
      return {
        isValid: false,
        errors: [{ param: rule.name, message: `Validation failed for parameter "${rule.name}"` }]
      };
    }

    // 值转换
    if (rule.transform) {
      try {
        convertedValue = rule.transform(convertedValue);
      } catch (error) {
        return {
          isValid: false,
          errors: [{ param: rule.name, message: `Transform failed for parameter "${rule.name}"` }]
        };
      }
    }

    return { isValid: true, value: convertedValue };
  }

  /**
   * 转换值类型
   * @param value 原始值
   * @param type 目标类型
   */
  private static convertValue(value: string, type: 'string' | 'number' | 'boolean' | 'array'): any {
    switch (type) {
      case 'string':
        return value;
      case 'number':
        const num = Number(value);
        if (isNaN(num)) throw new Error('Invalid number');
        return num;
      case 'boolean':
        if (value.toLowerCase() === 'true') return true;
        if (value.toLowerCase() === 'false') return false;
        throw new Error('Invalid boolean');
      case 'array':
        return value.split(',').map(v => v.trim());
      default:
        return value;
    }
  }
} 