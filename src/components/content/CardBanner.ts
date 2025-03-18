import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';
import { ThemeManager } from '../../theme';
import { createDataProvider } from '../dataProvider';

// CSS styles for the CardBanner component
const cardBannerStyles = `
.cardbanner {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 40px;
    background-color: #f5f5f5;
    max-width: 800px;
    margin: 0 auto;
}

.cardbanner .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 60px;
}

.cardbanner .logo {
    font-size: 24px;
    font-weight: bold;
}

.cardbanner .avatar {
    width: 50px;
    height: 50px;
    font-size: 40px;
}

.cardbanner .main-title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 1.2;
}

.cardbanner .percentage {
    font-size: 64px;
    font-weight: bold;
    margin: 40px 0;
}

.cardbanner .subtitle {
    font-size: 48px;
    font-weight: bold;
    background: linear-gradient(transparent 60%, #FFB6C1 40%);
    display: inline-block;
    margin-bottom: 20px;
}

.cardbanner .description {
    font-size: 18px;
    color: #666;
    margin-bottom: 40px;
}

.cardbanner .new-label {
    position: relative;
    display: inline-block;
    margin-top: 60px;
    transform: rotate(-10deg);
}

.cardbanner .new-tag {
    background: #4169E1;
    color: white;
    padding: 10px 20px;
    border-radius: 15px;
    position: relative;
    transform: rotate(-10deg);
    display: inline-block;
    font-weight: bold;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
}

.cardbanner .new-tag::after {
    content: "!!";
    color: white;
    margin-left: 5px;
}

.cardbanner .footer {
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    color: #333;
}

.cardbanner .footer span {
    margin: 0 10px;
}

.cardbanner .divider {
    color: #999;
}
`;

/**
 * 注册卡片横幅组件的 shortcode
 * @param renderer shortcode 渲染器
 * @param theme 默认主题配置
 */
export function registerCardBannerShortcode(renderer: ShortcodeRenderer, theme: ThemeManager) {
  renderer.registerTemplateShortcode('cardbanner', {
    template: `
      <style>
        ${cardBannerStyles}
      </style>
      <div class="cardbanner">
        <div class="header">
          <div class="logo">{{ .logo }}</div>
          <div class="avatar">{{ .avatar }}</div>
        </div>

        <div class="main-title">
          {{ .mainTitle }}
        </div>

        <div class="subtitle">
          {{ .subtitle }}
        </div>

        <div class="description">
          {{ .description }}
        </div>

        <div class="new-label">
          <div class="new-tag">{{ .newTagText }}</div>
        </div>

        <div class="footer">
          {{ .footerContent }}
        </div>
      </div>
    `,
    dataProvider: (params: string[], content?: string) => {
      const getParam = (name: string) =>
          params.find(p => p.startsWith(`${name}=`))
              ?.split('=')[1]
              ?.replace(/^["']|["']$/g, '');

      const logo = getParam('logo') || '不黑学长';
      const avatar = getParam('avatar') || '‍🎓';
      const mainTitle = getParam('mainTitle') || '让完播率>50% (3/3)';
      const subtitle = getParam('subtitle') || '6种文案公式';
      const description = getParam('description') || '爆款拆解/爆款要素/文案结构';
      const newTagText = getParam('newTagText') || '全新整理!!';
      const footerContent = getParam('footerContent') || '运营技巧 | 爆款选题 | 方案写作 ｜ 数据复盘';

      return {
        logo,
        avatar,
        mainTitle,
        subtitle,
        description,
        newTagText,
        footerContent,
        content
      };
    }
  });
} 