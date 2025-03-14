/**
 * 参数验证规则
 */
export interface ParamValidationRule<T = any> {
  // 参数名称
  name: string;
  // 参数类型
  type?: 'string' | 'number' | 'boolean' | 'array';
  // 是否必需
  required?: boolean;
  // 默认值
  default?: T;
  // 可选值列表
  enum?: T[];
  // 自定义验证函数
  validate?: (value: any) => boolean;
  // 转换函数
  transform?: (value: any) => T;
}

/**
 * 参数验证错误
 */
export interface ParamValidationError {
  param: string;
  message: string;
}

/**
 * 参数验证结果
 */
export interface ParamValidationResult<T = any> {
  isValid: boolean;
  value?: T;
  errors?: ParamValidationError[];
}

/**
 * 参数定义
 */
export interface ParamDefinition<T = any> extends ParamValidationRule<T> {
  // 参数描述
  description?: string;
  // 示例值
  example?: T;
} 