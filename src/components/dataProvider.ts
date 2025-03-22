import { ThemeManager } from '../themes';
import { Style, Layout, Typography, Animation, Interactive, Responsive } from '../themes/style-builder/types';

/**
 * Parameter extraction helper
 * @param params Array of parameter strings in format "name=value"
 * @param name Parameter name to extract
 * @returns The extracted parameter value or undefined
 */
export const getParam = (params: string[], name: string) => 
  params.find(p => p.startsWith(`${name}=`))
    ?.split('=')[1]
    ?.replace(/^["']|["']$/g, '');

/**
 * Common data provider interface
 */
export interface CommonDataProviderOptions {
  componentName: string;
  defaultValues?: Record<string, any>;
  additionalProps?: string[];
}

/**
 * Creates a common data provider function for shortcode components
 * @param theme Theme manager instance
 * @param options Component options
 * @returns Data provider function
 */
export function createDataProvider(theme: ThemeManager, options: CommonDataProviderOptions) {
  const { componentName, defaultValues = {}, additionalProps = [] } = options;
  
  return (params: string[], content?: string) => {
    // Common properties
    const id = getParam(params, 'id');
    const customClass = getParam(params, 'class') || '';
    
    // Style properties
    const variant = getParam(params, 'variant') || defaultValues.variant;
    const textColor = getParam(params, 'textColor') || defaultValues.textColor;
    const backgroundColor = getParam(params, 'backgroundColor') || defaultValues.backgroundColor;
    const borderColor = getParam(params, 'borderColor') || defaultValues.borderColor;
    const size = getParam(params, 'size') || defaultValues.size;
    const width = getParam(params, 'width') || defaultValues.width;
    const height = getParam(params, 'height') || defaultValues.height;
    const border = getParam(params, 'border') || defaultValues.border;
    const rounded = getParam(params, 'rounded') || defaultValues.rounded;
    const outline = getParam(params, 'outline') || defaultValues.outline;
    const shadow = getParam(params, 'shadow') || defaultValues.shadow;
    
    // Layout properties
    const display = getParam(params, 'display') || defaultValues.display;
    const position = getParam(params, 'position') || defaultValues.position;
    const gap = getParam(params, 'gap') || defaultValues.gap;
    const padding = getParam(params, 'padding') || defaultValues.padding;
    const paddingX = getParam(params, 'px') || defaultValues.paddingX;
    const paddingY = getParam(params, 'py') || defaultValues.paddingY;
    const margin = getParam(params, 'margin') || defaultValues.margin;
    const cols = getParam(params, 'cols') || defaultValues.cols;
    const rows = getParam(params, 'rows') || defaultValues.rows;
    
    // Typography properties
    const fontFamily = getParam(params, 'fontFamily') || defaultValues.fontFamily;
    const fontSize = getParam(params, 'fontSize') || defaultValues.fontSize;
    const fontWeight = getParam(params, 'fontWeight') || defaultValues.fontWeight;
    const textAlign = getParam(params, 'textAlign') || defaultValues.textAlign;
    const lineHeight = getParam(params, 'lineHeight') || defaultValues.lineHeight;
    const letterSpacing = getParam(params, 'letterSpacing') || defaultValues.letterSpacing;
    const textDecoration = getParam(params, 'textDecoration') || defaultValues.textDecoration;
    const textTransform = getParam(params, 'textTransform') || defaultValues.textTransform;
    
    // Animation properties
    const animation = getParam(params, 'animation') || defaultValues.animation;
    const transition = getParam(params, 'transition') || defaultValues.transition;
    const duration = getParam(params, 'duration') || defaultValues.duration;
    const scale = getParam(params, 'scale') || defaultValues.scale;
    const rotate = getParam(params, 'rotate') || defaultValues.rotate;
    const translate = getParam(params, 'translate') || defaultValues.translate;
    const delay = getParam(params, 'delay') || defaultValues.delay;
    const timing = getParam(params, 'timing') || defaultValues.timing;
    
    // Interactive properties
    const cursor = getParam(params, 'cursor') || defaultValues.cursor;
    const disabled = getParam(params, 'disabled') === 'true' || defaultValues.disabled;
    
    // Responsive properties
    const sm = getParam(params, 'sm') || defaultValues.sm;
    const md = getParam(params, 'md') || defaultValues.md;
    const lg = getParam(params, 'lg') || defaultValues.lg;
    const xl = getParam(params, 'xl') || defaultValues.xl;
    const hidden = getParam(params, 'hidden') || defaultValues.hidden;
    const visible = getParam(params, 'visible') || defaultValues.visible;
    
    // Additional custom properties
    const additionalData: Record<string, any> = {};
    additionalProps.forEach(propName => {
      additionalData[propName] = getParam(params, propName) || defaultValues[propName];
    });
    
    // Get component styles
    const styles = theme.getComponentClasses(componentName, {
      // Style properties
      variant,
      textColor,
      backgroundColor,
      borderColor,
      size,
      width,
      height,
      border,
      rounded,
      outline,
      shadow,
      
      // Layout properties
      display,
      position,
      gap,
      padding,
      paddingX,
      paddingY,
      margin,
      cols,
      rows,
      
      // Typography properties
      fontFamily,
      fontSize,
      fontWeight,
      textAlign,
      lineHeight,
      letterSpacing,
      textDecoration,
      textTransform,
      
      // Animation properties
      animation,
      transition,
      duration,
      scale,
      rotate,
      translate,
      delay,
      timing,
      
      // Interactive properties
      cursor,
      disabled,
      
      // Responsive properties
      sm,
      md,
      lg,
      xl,
      hidden,
      visible,
      
      // Additional properties from component-specific options
      ...additionalData
    });
    
    return {
      id,
      classes: customClass ? `${styles} ${customClass}` : styles,
      content,
      disabled,
      ...additionalData
    };
  };
} 