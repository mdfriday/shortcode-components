"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClassBuilder = void 0;
/**
 * Abstract base class for style builders
 */
class BaseClassBuilder {
    constructor(theme) {
        this.classes = new Set();
        this.componentName = '';
        this.theme = theme;
    }
    withComponent(componentName) {
        this.componentName = componentName;
        return this;
    }
    /**
     * Add style classes based on style props
     * @param props Style props
     */
    style(props) {
        if (!props)
            return this;
        // Process style properties
        this.processStyleProps(props);
        return this;
    }
    /**
     * Add layout classes based on layout props
     * @param props Layout props
     */
    layout(props) {
        if (!props)
            return this;
        // Process layout properties
        this.processLayoutProps(props);
        return this;
    }
    /**
     * Add typography classes based on typography props
     * @param props Typography props
     */
    typography(props) {
        if (!props)
            return this;
        // Process typography properties
        this.processTypographyProps(props);
        return this;
    }
    /**
     * Add animation classes based on animation props
     * @param props Animation props
     */
    animation(props) {
        if (!props)
            return this;
        // Process animation properties
        this.processAnimationProps(props);
        return this;
    }
    /**
     * Add interactive classes based on interactive props
     * @param props Interactive props
     */
    interactive(props) {
        if (!props)
            return this;
        // Process interactive properties
        this.processInteractiveProps(props);
        return this;
    }
    /**
     * Add responsive classes based on responsive props
     * @param props Responsive props
     */
    responsive(props) {
        if (!props)
            return this;
        // Process responsive properties
        this.processResponsiveProps(props);
        return this;
    }
    /**
     * Build the final class string
     */
    build() {
        return Array.from(this.classes).filter(Boolean).join(' ');
    }
    /**
     * Add a class to the set of classes
     * @param className Class name to add
     */
    addClass(className) {
        if (className && className.trim()) {
            this.classes.add(className.trim());
        }
    }
}
exports.BaseClassBuilder = BaseClassBuilder;
