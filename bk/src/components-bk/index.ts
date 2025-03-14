import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { lightTheme } from './styles/themes/light';
import { registerSectionShortcode } from './layout/Section';
import { registerContainerShortcode } from './layout/Container';
import { registerGridShortcode } from './layout/Grid';
import { registerFlexShortcode } from './layout/Flex';
import { registerCardShortcode } from './content/Card';
import { registerHeadingShortcode } from './content/Heading';
import { registerTextShortcode } from './content/Text';
import { registerButtonShortcode } from './content/Button';
import { registerFeatureShortcode } from './content/Feature';
import { registerTestimonialShortcode } from './content/Testimonial';

// 创建 shortcode 渲染器实例
const shortcodeRenderer = new ShortcodeRenderer();

// 注册所有组件
registerSectionShortcode(shortcodeRenderer, lightTheme);
registerContainerShortcode(shortcodeRenderer, lightTheme);
registerGridShortcode(shortcodeRenderer, lightTheme);
registerFlexShortcode(shortcodeRenderer, lightTheme);
registerCardShortcode(shortcodeRenderer, lightTheme);
registerHeadingShortcode(shortcodeRenderer, lightTheme);
registerTextShortcode(shortcodeRenderer, lightTheme);
registerButtonShortcode(shortcodeRenderer, lightTheme);
registerFeatureShortcode(shortcodeRenderer, lightTheme);
registerTestimonialShortcode(shortcodeRenderer, lightTheme);

export { shortcodeRenderer, lightTheme }; 