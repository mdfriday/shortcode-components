import { ComponentThemeConfig } from '../../types/component-theme';
import { baseComponentTheme } from './base';
import { deepMerge } from '../../utils/deep-merge';

/**
 * 暗色主题组件配置
 */
export const darkComponentTheme: ComponentThemeConfig = deepMerge<ComponentThemeConfig>(baseComponentTheme, {
  // 按钮组件
  button: {
    variants: {
      solid: {
        colors: {
          background: 'primary.DEFAULT',
          text: 'neutral.900',
        },
        states: {
          hover: {
            colors: {
              background: 'primary.light',
            },
          },
          disabled: {
            colors: {
              background: 'neutral.700',
              text: 'neutral.500',
            },
          },
        },
      },
      outline: {
        colors: {
          text: 'primary.light',
          border: 'primary.light',
        },
        states: {
          hover: {
            colors: {
              background: 'primary.dark',
              text: 'primary.light',
            },
          },
        },
      },
      ghost: {
        colors: {
          text: 'primary.light',
        },
        states: {
          hover: {
            colors: {
              background: 'primary.dark',
            },
          },
        },
      },
      link: {
        colors: {
          text: 'primary.light',
        },
        states: {
          hover: {
            colors: {
              text: 'primary.DEFAULT',
            },
          },
        },
      },
    },
  },

  // 卡片组件
  card: {
    variants: {
      elevated: {
        colors: {
          background: 'neutral.800',
        },
      },
      filled: {
        colors: {
          background: 'neutral.900',
        },
      },
      outlined: {
        colors: {
          border: 'neutral.700',
        },
      },
    },
  },

  // 文本组件
  text: {
    variants: {
      primary: {
        colors: {
          text: 'neutral.100',
        },
      },
      secondary: {
        colors: {
          text: 'neutral.400',
        },
      },
    },
  },

  // 标题组件
  heading: {
    base: {
      colors: {
        text: 'neutral.50',
      },
    },
  },

  // 容器组件
  container: baseComponentTheme.container,

  // 网格组件
  grid: baseComponentTheme.grid,

  // 弹性布局组件
  flex: baseComponentTheme.flex,

  // 特性组件
  feature: {
    variants: {
      default: {
        colors: {
          background: 'neutral.900',
        },
      },
      centered: {
        colors: {
          background: 'neutral.800',
        },
      },
    },
  },

  // 推荐组件
  testimonial: {
    variants: {
      default: {
        colors: {
          background: 'neutral.800',
        },
      },
      highlighted: {
        colors: {
          background: 'primary.dark',
        },
      },
      quoted: {
        colors: {
          background: 'neutral.900',
        },
      },
    },
  },
}); 