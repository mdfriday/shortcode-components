import { ComponentThemeConfig } from '../../types/component-theme';
import { StyleDefinition } from '../../types/style';

/**
 * 基础按钮样式
 */
const baseButtonStyle: StyleDefinition = {
  layout: {
    display: 'inline-flex',
    position: 'relative',
  },
  flex: {
    direction: 'row',
    align: 'center',
    justify: 'center',
  },
  spacing: {
    padding: { x: 'md', y: 'sm' },
  },
  typography: {
    fontSize: 'base',
    fontWeight: 'medium',
  },
  border: {
    radius: 'md',
    width: '1',
  },
};

/**
 * 基础卡片样式
 */
const baseCardStyle: StyleDefinition = {
  layout: {
    display: 'flex',
    position: 'relative',
  },
  flex: {
    direction: 'column',
  },
  spacing: {
    padding: 'lg',
  },
  border: {
    radius: 'lg',
  },
};

/**
 * 基础文本样式
 */
const baseTextStyle: StyleDefinition = {
  typography: {
    fontSize: 'base',
    fontWeight: 'normal',
  },
  spacing: {
    margin: { bottom: 'sm' },
  },
};

/**
 * 基础标题样式
 */
const baseHeadingStyle: StyleDefinition = {
  typography: {
    fontWeight: 'bold',
  },
  spacing: {
    margin: { bottom: 'md' },
  },
};

/**
 * 基础容器样式
 */
const baseContainerStyle: StyleDefinition = {
  layout: {
    width: 'full',
    position: 'relative',
  },
  spacing: {
    padding: { x: 'md' },
    margin: { x: 'auto' },
  },
};

/**
 * 基础网格样式
 */
const baseGridStyle: StyleDefinition = {
  layout: {
    display: 'grid',
    width: 'full',
  },
  grid: {
    columns: 12,
    gap: 'md',
  },
};

/**
 * 基础弹性布局样式
 */
const baseFlexStyle: StyleDefinition = {
  layout: {
    display: 'flex',
    width: 'full',
  },
  flex: {
    direction: 'row',
    wrap: 'wrap',
  },
  spacing: {
    gap: 'md',
  },
};

/**
 * 基础特性样式
 */
const baseFeatureStyle: StyleDefinition = {
  layout: {
    display: 'flex',
    position: 'relative',
  },
  flex: {
    direction: 'column',
    align: 'start',
  },
  spacing: {
    padding: 'lg',
    gap: 'md',
  },
};

/**
 * 基础推荐样式
 */
const baseTestimonialStyle: StyleDefinition = {
  layout: {
    display: 'flex',
    position: 'relative',
  },
  flex: {
    direction: 'column',
  },
  spacing: {
    padding: 'xl',
    gap: 'lg',
  },
  border: {
    radius: 'xl',
  },
};

/**
 * 基础组件主题配置
 */
export const baseComponentTheme: ComponentThemeConfig = {
  // 按钮组件
  button: {
    base: baseButtonStyle,
    variants: {
      solid: {
        colors: {
          background: 'primary.DEFAULT',
          text: 'neutral.50',
        },
        states: {
          hover: {
            colors: {
              background: 'primary.dark',
            },
          },
          disabled: {
            colors: {
              background: 'neutral.300',
              text: 'neutral.500',
            },
          },
        },
      },
      outline: {
        colors: {
          text: 'primary.DEFAULT',
          border: 'primary.DEFAULT',
        },
        states: {
          hover: {
            colors: {
              background: 'primary.light',
              text: 'primary.dark',
            },
          },
        },
      },
      ghost: {
        colors: {
          text: 'primary.DEFAULT',
        },
        states: {
          hover: {
            colors: {
              background: 'primary.light',
            },
          },
        },
      },
      link: {
        border: {
          width: '0',
        },
        colors: {
          text: 'primary.DEFAULT',
        },
        states: {
          hover: {
            colors: {
              text: 'primary.dark',
            },
          },
        },
      },
    },
    sizes: {
      xs: {
        typography: { fontSize: 'xs' },
        spacing: { padding: { x: 'sm', y: 'xs' } },
      },
      sm: {
        typography: { fontSize: 'sm' },
        spacing: { padding: { x: 'md', y: 'sm' } },
      },
      md: baseButtonStyle,
      lg: {
        typography: { fontSize: 'lg' },
        spacing: { padding: { x: 'lg', y: 'md' } },
      },
      xl: {
        typography: { fontSize: 'xl' },
        spacing: { padding: { x: 'xl', y: 'lg' } },
      },
    },
  },

  // 卡片组件
  card: {
    base: baseCardStyle,
    variants: {
      elevated: {
        colors: {
          background: 'neutral.50',
        },
        // TODO: 添加阴影配置
      },
      filled: {
        colors: {
          background: 'neutral.100',
        },
      },
      outlined: {
        colors: {
          border: 'neutral.200',
        },
        border: {
          width: '1',
          style: 'solid',
        },
      },
    },
  },

  // 文本组件
  text: {
    base: baseTextStyle,
    variants: {
      primary: {
        colors: {
          text: 'neutral.900',
        },
      },
      secondary: {
        colors: {
          text: 'neutral.600',
        },
      },
      success: {
        colors: {
          text: 'semantic.success',
        },
      },
      error: {
        colors: {
          text: 'semantic.error',
        },
      },
    },
    sizes: {
      sm: { typography: { fontSize: 'sm' } },
      base: baseTextStyle,
      lg: { typography: { fontSize: 'lg' } },
    },
  },

  // 标题组件
  heading: {
    base: baseHeadingStyle,
    variants: {
      h1: { typography: { fontSize: '3xl' } },
      h2: { typography: { fontSize: '2xl' } },
      h3: { typography: { fontSize: 'xl' } },
      h4: { typography: { fontSize: 'lg' } },
      h5: { typography: { fontSize: 'base' } },
      h6: { typography: { fontSize: 'sm' } },
    },
  },

  // 容器组件
  container: {
    base: baseContainerStyle,
    variants: {
      fluid: {
        layout: {
          maxWidth: 'none',
        },
      },
      responsive: {
        responsive: {
          sm: { layout: { maxWidth: '640px' } },
          md: { layout: { maxWidth: '768px' } },
          lg: { layout: { maxWidth: '1024px' } },
          xl: { layout: { maxWidth: '1280px' } },
        },
      },
    },
  },

  // 网格组件
  grid: {
    base: baseGridStyle,
    variants: {
      cols1: { grid: { columns: 1 } },
      cols2: { grid: { columns: 2 } },
      cols3: { grid: { columns: 3 } },
      cols4: { grid: { columns: 4 } },
      cols6: { grid: { columns: 6 } },
      cols12: { grid: { columns: 12 } },
    },
  },

  // 弹性布局组件
  flex: {
    base: baseFlexStyle,
    variants: {
      row: { flex: { direction: 'row' } },
      column: { flex: { direction: 'column' } },
      wrap: { flex: { wrap: 'wrap' } },
      nowrap: { flex: { wrap: 'nowrap' } },
    },
  },

  // 特性组件
  feature: {
    base: baseFeatureStyle,
    variants: {
      default: {},
      centered: {
        flex: {
          align: 'center',
          justify: 'center',
        },
        spacing: {
          padding: 'xl',
        },
      },
      stacked: {
        flex: {
          direction: 'column',
          align: 'center',
        },
        spacing: {
          gap: 'lg',
        },
      },
    },
  },

  // 推荐组件
  testimonial: {
    base: baseTestimonialStyle,
    variants: {
      default: {
        colors: {
          background: 'neutral.50',
        },
      },
      highlighted: {
        colors: {
          background: 'primary.light',
        },
      },
      quoted: {
        colors: {
          background: 'neutral.100',
        },
        typography: {
          fontSize: 'lg',
          fontStyle: 'italic',
        },
      },
    },
  },
}; 