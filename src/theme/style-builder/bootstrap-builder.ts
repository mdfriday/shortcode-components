import { 
  Style, 
  Layout, 
  Typography, 
  Animation, 
  Interactive, 
  Responsive,
  StyleBuilderFactory,
  ClassBuilder
} from './types';
import { BaseClassBuilder } from './base-builder';
import { Theme } from '../types';

/**
 * Bootstrap style builder implementation
 */
export class BootstrapClassBuilder extends BaseClassBuilder {
  /**
   * Process style properties for Bootstrap
   * @param props Style props
   */
  protected processStyleProps(props: Style): void {
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
    } else if (props.border === false) {
      this.addClass('border-0');
    }

    // Handle rounded
    if (props.rounded === true) {
      this.addClass('rounded');
    } else if (props.rounded === false) {
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
  protected processLayoutProps(props: Layout): void {
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
  protected processTypographyProps(props: Typography): void {
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
      this.addClass(`text-${props.textAlign}`);
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
  protected processAnimationProps(props: Animation): void {
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
  protected processInteractiveProps(props: Interactive): void {
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
  protected processResponsiveProps(props: Responsive): void {
    // Handle responsive breakpoints
    const breakpoints = ['sm', 'md', 'lg', 'xl'] as const;
    
    for (const breakpoint of breakpoints) {
      const breakpointProps = props[breakpoint];
      if (breakpointProps) {
        // Process style properties for this breakpoint
        if (breakpointProps.textColor) {
          this.addClass(`${breakpoint}-text-${breakpointProps.textColor}`);
        }
        if (breakpointProps.backgroundColor) {
          this.addClass(`${breakpoint}-bg-${breakpointProps.backgroundColor}`);
        }
        // Add more responsive properties as needed
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

/**
 * Bootstrap style builder factory
 */
export class BootstrapStyleBuilderFactory implements StyleBuilderFactory {
  private theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  /**
   * Create a new Bootstrap style builder
   */
  createBuilder(): ClassBuilder {
    return new BootstrapClassBuilder(this.theme);
  }
} 