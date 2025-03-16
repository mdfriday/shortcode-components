import { 
  Style, 
  Layout, 
  Typography, 
  Animation, 
  Interactive, 
  Responsive, 
  ClassBuilder 
} from './types';
import { Theme } from '../types';

/**
 * Abstract base class for style builders
 */
export abstract class BaseClassBuilder implements ClassBuilder {
  protected classes: Set<string> = new Set();
  protected theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  /**
   * Add style classes based on style props
   * @param props Style props
   */
  style(props: Style): this {
    if (!props) return this;
    
    // Process style properties
    this.processStyleProps(props);
    
    return this;
  }

  /**
   * Add layout classes based on layout props
   * @param props Layout props
   */
  layout(props: Layout): this {
    if (!props) return this;
    
    // Process layout properties
    this.processLayoutProps(props);
    
    return this;
  }

  /**
   * Add typography classes based on typography props
   * @param props Typography props
   */
  typography(props: Typography): this {
    if (!props) return this;
    
    // Process typography properties
    this.processTypographyProps(props);
    
    return this;
  }

  /**
   * Add animation classes based on animation props
   * @param props Animation props
   */
  animation(props: Animation): this {
    if (!props) return this;
    
    // Process animation properties
    this.processAnimationProps(props);
    
    return this;
  }

  /**
   * Add interactive classes based on interactive props
   * @param props Interactive props
   */
  interactive(props: Interactive): this {
    if (!props) return this;
    
    // Process interactive properties
    this.processInteractiveProps(props);
    
    return this;
  }

  /**
   * Add responsive classes based on responsive props
   * @param props Responsive props
   */
  responsive(props: Responsive): this {
    if (!props) return this;
    
    // Process responsive properties
    this.processResponsiveProps(props);
    
    return this;
  }

  /**
   * Build the final class string
   */
  build(): string {
    return Array.from(this.classes).filter(Boolean).join(' ');
  }

  /**
   * Add a class to the set of classes
   * @param className Class name to add
   */
  protected addClass(className: string): void {
    if (className && className.trim()) {
      this.classes.add(className.trim());
    }
  }

  /**
   * Process style properties
   * @param props Style props
   */
  protected abstract processStyleProps(props: Style): void;

  /**
   * Process layout properties
   * @param props Layout props
   */
  protected abstract processLayoutProps(props: Layout): void;

  /**
   * Process typography properties
   * @param props Typography props
   */
  protected abstract processTypographyProps(props: Typography): void;

  /**
   * Process animation properties
   * @param props Animation props
   */
  protected abstract processAnimationProps(props: Animation): void;

  /**
   * Process interactive properties
   * @param props Interactive props
   */
  protected abstract processInteractiveProps(props: Interactive): void;

  /**
   * Process responsive properties
   * @param props Responsive props
   */
  protected abstract processResponsiveProps(props: Responsive): void;
} 