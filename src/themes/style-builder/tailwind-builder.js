"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TailwindStyleBuilderFactory = exports.TailwindClassBuilder = void 0;
const base_builder_1 = require("./base-builder");
/**
 * Tailwind style builder implementation
 */
class TailwindClassBuilder extends base_builder_1.BaseClassBuilder {
    /**
     * Process style properties for Tailwind
     * @param props Style props
     */
    processStyleProps(props) {
        // Handle variant (in Tailwind, we might map this to a color scheme)
        if (props.variant) {
            // Map variant to appropriate Tailwind classes
            switch (props.variant) {
                case 'primary':
                    this.addClass('bg-blue-500 text-white');
                    break;
                case 'secondary':
                    this.addClass('bg-gray-500 text-white');
                    break;
                case 'success':
                    this.addClass('bg-green-500 text-white');
                    break;
                case 'danger':
                    this.addClass('bg-red-500 text-white');
                    break;
                case 'warning':
                    this.addClass('bg-yellow-500 text-black');
                    break;
                case 'info':
                    this.addClass('bg-blue-400 text-white');
                    break;
                default:
                    this.addClass(`bg-${props.variant}-500`);
                    break;
            }
        }
        // Handle text color
        if (props.textColor) {
            this.addClass(`text-${props.textColor}`);
        }
        // Handle background color
        if (props.backgroundColor) {
            this.addClass(`bg-${props.backgroundColor}`);
        }
        // Handle border color
        if (props.borderColor) {
            this.addClass(`border-${props.borderColor}`);
        }
        // Handle size
        if (props.size) {
            switch (props.size) {
                case 'sm':
                    this.addClass('text-sm py-1 px-2');
                    break;
                case 'md':
                    this.addClass('text-base py-2 px-4');
                    break;
                case 'lg':
                    this.addClass('text-lg py-3 px-6');
                    break;
            }
        }
        // Handle width and height
        if (props.width) {
            if (props.width.endsWith('%')) {
                const percentage = props.width.replace('%', '');
                this.addClass(`w-${percentage}/100`);
            }
            else {
                this.addClass(`w-${props.width}`);
            }
        }
        if (props.height) {
            if (props.height.endsWith('%')) {
                const percentage = props.height.replace('%', '');
                this.addClass(`h-${percentage}/100`);
            }
            else {
                this.addClass(`h-${props.height}`);
            }
        }
        // Handle border
        if (props.border === true) {
            this.addClass('border');
        }
        else if (props.border === false) {
            this.addClass('border-0');
        }
        // Handle rounded
        if (props.rounded === true) {
            this.addClass('rounded');
        }
        else if (props.rounded === false) {
            this.addClass('rounded-none');
        }
        // Handle outline
        if (props.outline === true && props.variant) {
            this.addClass(`bg-transparent text-${props.variant}-500 border border-${props.variant}-500`);
        }
        // Handle shadow
        if (props.shadow) {
            switch (props.shadow) {
                case 'none':
                    this.addClass('shadow-none');
                    break;
                case 'sm':
                    this.addClass('shadow-sm');
                    break;
                case 'md':
                    this.addClass('shadow');
                    break;
                case 'lg':
                    this.addClass('shadow-lg');
                    break;
            }
        }
    }
    /**
     * Process layout properties for Tailwind
     * @param props Layout props
     */
    processLayoutProps(props) {
        // Handle display
        if (props.display) {
            this.addClass(props.display);
        }
        // Handle position
        if (props.position) {
            this.addClass(props.position);
        }
        // Handle gap
        if (props.gap !== undefined) {
            this.addClass(`gap-${props.gap}`);
        }
        // Handle padding
        if (props.padding !== undefined) {
            this.addClass(`p-${props.padding}`);
        }
        // Handle margin
        if (props.margin !== undefined) {
            this.addClass(`m-${props.margin}`);
        }
        // Handle grid columns and rows
        if (props.cols !== undefined) {
            this.addClass(`grid-cols-${props.cols}`);
        }
        if (props.rows !== undefined) {
            this.addClass(`grid-rows-${props.rows}`);
        }
    }
    /**
     * Process typography properties for Tailwind
     * @param props Typography props
     */
    processTypographyProps(props) {
        // Handle font family
        if (props.fontFamily) {
            this.addClass(`font-${props.fontFamily}`);
        }
        // Handle font size
        if (props.fontSize) {
            this.addClass(`text-${props.fontSize}`);
        }
        // Handle font weight
        if (props.fontWeight) {
            this.addClass(`font-${props.fontWeight}`);
        }
        // Handle text align
        if (props.textAlign) {
            this.addClass(`text-${props.textAlign}`);
        }
        // Handle line height
        if (props.lineHeight) {
            this.addClass(`leading-${props.lineHeight}`);
        }
        // Handle letter spacing
        if (props.letterSpacing) {
            this.addClass(`tracking-${props.letterSpacing}`);
        }
        // Handle text decoration
        if (props.textDecoration) {
            this.addClass(props.textDecoration);
        }
        // Handle text transform
        if (props.textTransform) {
            this.addClass(props.textTransform);
        }
    }
    /**
     * Process animation properties for Tailwind
     * @param props Animation props
     */
    processAnimationProps(props) {
        // Handle animation
        if (props.animation && props.animation !== 'none') {
            this.addClass(`animate-${props.animation}`);
        }
        // Handle transition
        if (props.transition && props.transition !== 'none') {
            if (props.transition === 'all') {
                this.addClass('transition-all');
            }
            else {
                this.addClass(`transition-${props.transition}`);
            }
        }
        // Handle duration
        if (props.duration) {
            switch (props.duration) {
                case 'fast':
                    this.addClass('duration-150');
                    break;
                case 'normal':
                    this.addClass('duration-300');
                    break;
                case 'slow':
                    this.addClass('duration-500');
                    break;
            }
        }
        // Handle transform properties
        if (props.scale !== undefined) {
            this.addClass(`scale-${props.scale}`);
        }
        if (props.rotate !== undefined) {
            this.addClass(`rotate-${props.rotate}`);
        }
        if (props.translate) {
            this.addClass(`translate-${props.translate}`);
        }
        // Handle delay
        if (props.delay !== undefined) {
            this.addClass(`delay-${props.delay}`);
        }
        // Handle timing
        if (props.timing) {
            switch (props.timing) {
                case 'linear':
                    this.addClass('ease-linear');
                    break;
                case 'ease':
                    this.addClass('ease');
                    break;
                case 'ease-in':
                    this.addClass('ease-in');
                    break;
                case 'ease-out':
                    this.addClass('ease-out');
                    break;
            }
        }
    }
    /**
     * Process interactive properties for Tailwind
     * @param props Interactive props
     */
    processInteractiveProps(props) {
        // Handle cursor
        if (props.cursor) {
            this.addClass(`cursor-${props.cursor}`);
        }
        // Handle hover state
        if (props.hover) {
            if (props.hover.textColor) {
                this.addClass(`hover:text-${props.hover.textColor}`);
            }
            if (props.hover.backgroundColor) {
                this.addClass(`hover:bg-${props.hover.backgroundColor}`);
            }
            if (props.hover.borderColor) {
                this.addClass(`hover:border-${props.hover.borderColor}`);
            }
            // Add more hover properties as needed
        }
        // Handle focus state
        if (props.focus) {
            if (props.focus.textColor) {
                this.addClass(`focus:text-${props.focus.textColor}`);
            }
            if (props.focus.backgroundColor) {
                this.addClass(`focus:bg-${props.focus.backgroundColor}`);
            }
            if (props.focus.borderColor) {
                this.addClass(`focus:border-${props.focus.borderColor}`);
            }
            // Add more focus properties as needed
        }
        // Handle active state
        if (props.active) {
            if (props.active.textColor) {
                this.addClass(`active:text-${props.active.textColor}`);
            }
            if (props.active.backgroundColor) {
                this.addClass(`active:bg-${props.active.backgroundColor}`);
            }
            if (props.active.borderColor) {
                this.addClass(`active:border-${props.active.borderColor}`);
            }
            // Add more active properties as needed
        }
        // Handle disabled state
        if (props.disabled) {
            this.addClass('disabled:opacity-50 disabled:cursor-not-allowed');
        }
    }
    /**
     * Process responsive properties for Tailwind
     * @param props Responsive props
     */
    processResponsiveProps(props) {
        // Handle responsive breakpoints
        const breakpoints = ['sm', 'md', 'lg', 'xl'];
        for (const breakpoint of breakpoints) {
            const breakpointProps = props[breakpoint];
            if (breakpointProps) {
                this.addClass(`${breakpoint}:border`);
                // Add more responsive properties as needed
            }
        }
        // Handle visibility
        if (props.hidden) {
            this.addClass(`${props.hidden}:hidden`);
        }
        if (props.visible) {
            this.addClass(`${props.visible}:block`);
        }
    }
}
exports.TailwindClassBuilder = TailwindClassBuilder;
/**
 * Tailwind style builder factory
 */
class TailwindStyleBuilderFactory {
    constructor(theme) {
        this.theme = theme;
    }
    /**
     * Create a new Tailwind style builder
     */
    createBuilder() {
        return new TailwindClassBuilder(this.theme);
    }
}
exports.TailwindStyleBuilderFactory = TailwindStyleBuilderFactory;
