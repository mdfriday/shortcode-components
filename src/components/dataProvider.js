"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParam = void 0;
exports.createDataProvider = createDataProvider;
/**
 * Parameter extraction helper
 * @param params Array of parameter strings in format "name=value"
 * @param name Parameter name to extract
 * @returns The extracted parameter value or undefined
 */
const getParam = (params, name) => params.find(p => p.startsWith(`${name}=`))
    ?.split('=')[1]
    ?.replace(/^["']|["']$/g, '');
exports.getParam = getParam;
/**
 * Creates a common data provider function for shortcode components
 * @param theme Theme manager instance
 * @param options Component options
 * @returns Data provider function
 */
function createDataProvider(theme, options) {
    const { componentName, defaultValues = {}, additionalProps = [] } = options;
    return (params, content) => {
        // Common properties
        const id = (0, exports.getParam)(params, 'id');
        const customClass = (0, exports.getParam)(params, 'class') || '';
        // Style properties
        const variant = (0, exports.getParam)(params, 'variant') || defaultValues.variant;
        const textColor = (0, exports.getParam)(params, 'textColor') || defaultValues.textColor;
        const backgroundColor = (0, exports.getParam)(params, 'backgroundColor') || defaultValues.backgroundColor;
        const borderColor = (0, exports.getParam)(params, 'borderColor') || defaultValues.borderColor;
        const size = (0, exports.getParam)(params, 'size') || defaultValues.size;
        const width = (0, exports.getParam)(params, 'width') || defaultValues.width;
        const height = (0, exports.getParam)(params, 'height') || defaultValues.height;
        const border = (0, exports.getParam)(params, 'border') || defaultValues.border;
        const rounded = (0, exports.getParam)(params, 'rounded') || defaultValues.rounded;
        const outline = (0, exports.getParam)(params, 'outline') || defaultValues.outline;
        const shadow = (0, exports.getParam)(params, 'shadow') || defaultValues.shadow;
        // Layout properties
        const display = (0, exports.getParam)(params, 'display') || defaultValues.display;
        const position = (0, exports.getParam)(params, 'position') || defaultValues.position;
        const gap = (0, exports.getParam)(params, 'gap') || defaultValues.gap;
        const padding = (0, exports.getParam)(params, 'padding') || defaultValues.padding;
        const paddingX = (0, exports.getParam)(params, 'px') || defaultValues.paddingX;
        const paddingY = (0, exports.getParam)(params, 'py') || defaultValues.paddingY;
        const margin = (0, exports.getParam)(params, 'margin') || defaultValues.margin;
        const cols = (0, exports.getParam)(params, 'cols') || defaultValues.cols;
        const rows = (0, exports.getParam)(params, 'rows') || defaultValues.rows;
        // Typography properties
        const fontFamily = (0, exports.getParam)(params, 'fontFamily') || defaultValues.fontFamily;
        const fontSize = (0, exports.getParam)(params, 'fontSize') || defaultValues.fontSize;
        const fontWeight = (0, exports.getParam)(params, 'fontWeight') || defaultValues.fontWeight;
        const textAlign = (0, exports.getParam)(params, 'textAlign') || defaultValues.textAlign;
        const lineHeight = (0, exports.getParam)(params, 'lineHeight') || defaultValues.lineHeight;
        const letterSpacing = (0, exports.getParam)(params, 'letterSpacing') || defaultValues.letterSpacing;
        const textDecoration = (0, exports.getParam)(params, 'textDecoration') || defaultValues.textDecoration;
        const textTransform = (0, exports.getParam)(params, 'textTransform') || defaultValues.textTransform;
        // Animation properties
        const animation = (0, exports.getParam)(params, 'animation') || defaultValues.animation;
        const transition = (0, exports.getParam)(params, 'transition') || defaultValues.transition;
        const duration = (0, exports.getParam)(params, 'duration') || defaultValues.duration;
        const scale = (0, exports.getParam)(params, 'scale') || defaultValues.scale;
        const rotate = (0, exports.getParam)(params, 'rotate') || defaultValues.rotate;
        const translate = (0, exports.getParam)(params, 'translate') || defaultValues.translate;
        const delay = (0, exports.getParam)(params, 'delay') || defaultValues.delay;
        const timing = (0, exports.getParam)(params, 'timing') || defaultValues.timing;
        // Interactive properties
        const cursor = (0, exports.getParam)(params, 'cursor') || defaultValues.cursor;
        const disabled = (0, exports.getParam)(params, 'disabled') === 'true' || defaultValues.disabled;
        // Responsive properties
        const sm = (0, exports.getParam)(params, 'sm') || defaultValues.sm;
        const md = (0, exports.getParam)(params, 'md') || defaultValues.md;
        const lg = (0, exports.getParam)(params, 'lg') || defaultValues.lg;
        const xl = (0, exports.getParam)(params, 'xl') || defaultValues.xl;
        const hidden = (0, exports.getParam)(params, 'hidden') || defaultValues.hidden;
        const visible = (0, exports.getParam)(params, 'visible') || defaultValues.visible;
        // Additional custom properties
        const additionalData = {};
        additionalProps.forEach(propName => {
            additionalData[propName] = (0, exports.getParam)(params, propName) || defaultValues[propName];
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
