"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapStyleBuilderFactory = exports.BootstrapClassBuilder = void 0;
const base_builder_1 = require("./base-builder");
/**
 * Bootstrap style builder implementation
 */
class BootstrapClassBuilder extends base_builder_1.BaseClassBuilder {
    /**
     * Process style properties for Bootstrap
     * @param props Style props
     */
    processStyleProps(props) {
        // Handle variant
        if (props.variant) {
            this.addClass(`btn-${props.variant}`);
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
            this.addClass(`btn-${props.size}`);
        }
        // Handle width and height
        if (props.width) {
            this.addClass(`w-${props.width}`);
        }
        if (props.height) {
            this.addClass(`h-${props.height}`);
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
            this.addClass('rounded-pill');
        }
        else if (props.rounded === false) {
            this.addClass('rounded-0');
        }
        // Handle outline
        if (props.outline === true && props.variant) {
            this.addClass(`btn-outline-${props.variant}`);
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
     * Process layout properties for Bootstrap
     * @param props Layout props
     */
    processLayoutProps(props) {
        // Handle display
        if (props.display) {
            this.addClass(`d-${props.display}`);
        }
        // Handle position
        if (props.position) {
            this.addClass(`position-${props.position}`);
        }
        // Handle gap
        if (props.gap !== undefined) {
            this.addClass(`gap-${props.gap}`);
        }
        // Handle padding
        if (props.padding !== undefined) {
            this.addClass(`p-${props.padding}`);
        }
        if (props.paddingX !== undefined) {
            this.addClass(`px-${props.paddingX}`);
        }
        if (props.paddingY !== undefined) {
            this.addClass(`py-${props.paddingY}`);
        }
        // Handle margin
        if (props.margin !== undefined) {
            this.addClass(`m-${props.margin}`);
        }
        // Handle grid columns and rows
        if (props.cols !== undefined) {
            this.addClass(`row-cols-${props.cols}`);
        }
        if (props.rows !== undefined) {
            this.addClass(`row-span-${props.rows}`);
        }
    }
    /**
     * Process typography properties for Bootstrap
     * @param props Typography props
     */
    processTypographyProps(props) {
        // Handle font family
        if (props.fontFamily) {
            this.addClass(`font-${props.fontFamily}`);
        }
        // Handle font size
        if (props.fontSize) {
            this.addClass(`fs-${props.fontSize}`);
        }
        // Handle font weight
        if (props.fontWeight) {
            this.addClass(`fw-${props.fontWeight}`);
        }
        // Handle text align
        if (props.textAlign) {
            if (this.componentName === 'block' && props.textAlign === 'justify') {
                this.addClass('justify-content-center');
            }
            else {
                this.addClass(`text-${props.textAlign}`);
            }
        }
        // Handle line height
        if (props.lineHeight) {
            this.addClass(`lh-${props.lineHeight}`);
        }
        // Handle letter spacing
        if (props.letterSpacing) {
            this.addClass(`ls-${props.letterSpacing}`);
        }
        // Handle text decoration
        if (props.textDecoration) {
            this.addClass(`text-decoration-${props.textDecoration}`);
        }
        // Handle text transform
        if (props.textTransform) {
            this.addClass(`text-${props.textTransform}`);
        }
    }
    /**
     * Process animation properties for Bootstrap
     * @param props Animation props
     */
    processAnimationProps(props) {
        // Handle animation
        if (props.animation && props.animation !== 'none') {
            this.addClass(`animation-${props.animation}`);
        }
        // Handle transition
        if (props.transition && props.transition !== 'none') {
            this.addClass(`transition-${props.transition}`);
        }
        // Handle duration
        if (props.duration) {
            this.addClass(`duration-${props.duration}`);
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
            this.addClass(`timing-${props.timing}`);
        }
    }
    /**
     * Process interactive properties for Bootstrap
     * @param props Interactive props
     */
    processInteractiveProps(props) {
        // Handle cursor
        if (props.cursor) {
            this.addClass(`cursor-${props.cursor}`);
        }
        // Handle hover state
        if (props.hover) {
            // In Bootstrap, we'd typically use :hover in CSS
            // But we can add some hover classes if needed
            if (props.hover.textColor) {
                this.addClass(`hover-text-${props.hover.textColor}`);
            }
            if (props.hover.backgroundColor) {
                this.addClass(`hover-bg-${props.hover.backgroundColor}`);
            }
        }
        // Handle focus state
        if (props.focus) {
            // Similar to hover, focus is typically handled in CSS
            if (props.focus.textColor) {
                this.addClass(`focus-text-${props.focus.textColor}`);
            }
            if (props.focus.backgroundColor) {
                this.addClass(`focus-bg-${props.focus.backgroundColor}`);
            }
        }
        // Handle active state
        if (props.active) {
            // Similar to hover and focus
            if (props.active.textColor) {
                this.addClass(`active-text-${props.active.textColor}`);
            }
            if (props.active.backgroundColor) {
                this.addClass(`active-bg-${props.active.backgroundColor}`);
            }
        }
        // Handle disabled state
        if (props.disabled) {
            this.addClass('disabled');
        }
    }
    /**
     * Process responsive properties for Bootstrap
     * @param props Responsive props
     */
    processResponsiveProps(props) {
        // Handle responsive breakpoints
        const breakpoints = ['sm', 'md', 'lg', 'xl'];
        for (const breakpoint of breakpoints) {
            const bpSize = props[breakpoint];
            if (bpSize) {
                this.addClass(`col-${breakpoint}-${bpSize}`);
            }
        }
        // Handle visibility
        if (props.hidden) {
            this.addClass(`d-${props.hidden}-none`);
        }
        if (props.visible) {
            this.addClass(`d-${props.visible}-block`);
        }
    }
}
exports.BootstrapClassBuilder = BootstrapClassBuilder;
/**
 * Bootstrap style builder factory
 */
class BootstrapStyleBuilderFactory {
    constructor(theme) {
        this.theme = theme;
    }
    /**
     * Create a new Bootstrap style builder
     */
    createBuilder() {
        return new BootstrapClassBuilder(this.theme);
    }
}
exports.BootstrapStyleBuilderFactory = BootstrapStyleBuilderFactory;
