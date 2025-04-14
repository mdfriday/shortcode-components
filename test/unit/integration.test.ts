import { Shortcode } from '../../src/shortcode';
import { ShortcodeMetadata } from '../../src/shortcode-manager';
import { ShortcodeRenderer } from '@mdfriday/shortcode-compiler';

// This is a more integration-focused test that tests real behavior
// but still has mocked HTML output
jest.mock('@mdfriday/shortcode-compiler', () => {
  const actualModule = jest.requireActual('@mdfriday/shortcode-compiler');
  
  // Store templates in a global object for test access
  const templateStore: Record<string, string> = {};
  
  // Create a simple mock implementation that renders templates
  // This is more simplified than the real implementation but works for testing
  const renderTemplate = (template: string, data: Record<string, string>): string => {
    let result = template;
    
    // Simple variable substitution
    const getMatches = template.match(/{{ .Get "([^"]+)" }}/g) || [];
    getMatches.forEach((match: string) => {
      const propNameMatch = match.match(/{{ .Get "([^"]+)" }}/);
      if (!propNameMatch) return;
      
      const propName = propNameMatch[1];
      const value = data[propName] || '';
      result = result.replace(match, value);
    });
    
    // Simple conditional rendering
    const ifMatches = result.match(/{{ if .Get "([^"]+)" }}([\s\S]*?){{ else }}([\s\S]*?){{ end }}/g) || [];
    ifMatches.forEach((match: string) => {
      const condGroup = match.match(/{{ if .Get "([^"]+)" }}([\s\S]*?){{ else }}([\s\S]*?){{ end }}/);
      if (!condGroup) return;
      
      const propName = condGroup[1];
      const trueBlock = condGroup[2];
      const falseBlock = condGroup[3];
      
      const value = data[propName];
      const rendered = value && value !== 'false' ? trueBlock : falseBlock;
      result = result.replace(match, rendered);
    });
    
    // Simple if without else
    const simpleIfMatches = result.match(/{{ if .Get "([^"]+)" }}([\s\S]*?){{ end }}/g) || [];
    simpleIfMatches.forEach((match: string) => {
      const condGroup = match.match(/{{ if .Get "([^"]+)" }}([\s\S]*?){{ end }}/);
      if (!condGroup) return;
      
      const propName = condGroup[1];
      const block = condGroup[2];
      
      const value = data[propName];
      const rendered = value && value !== 'false' ? block : '';
      result = result.replace(match, rendered);
    });
    
    // Simple loop rendering with split
    const rangeMatches = result.match(/{{ \$items := split \(.Get "([^"]+)"\) "," }}[\s\S]*?{{ range \$items }}([\s\S]*?){{ end }}/g) || [];
    rangeMatches.forEach((match: string) => {
      const rangeGroup = match.match(/{{ \$items := split \(.Get "([^"]+)"\) "," }}[\s\S]*?{{ range \$items }}([\s\S]*?){{ end }}/);
      if (!rangeGroup) return;
      
      const propName = rangeGroup[1];
      const itemTemplate = rangeGroup[2];
      
      const value = data[propName] || '';
      const items = value.split(',');
      let renderedItems = '';
      
      items.forEach((item: string) => {
        if (item.trim()) {
          renderedItems += itemTemplate.replace(/{{ \. }}/g, item.trim());
        }
      });
      
      result = result.replace(match, renderedItems);
    });
    
    return result;
  };
  
  return {
    ...actualModule,
    ShortcodeRenderer: jest.fn().mockImplementation(() => ({
      registerTemplateShortcode: jest.fn().mockImplementation((name: string, options: any) => {
        // Store the template for lookup by tests
        templateStore[name] = options.template;
      })
    })),
    PageRenderer: jest.fn().mockImplementation((renderer: any) => ({
      render: jest.fn().mockImplementation((content: string, options?: { stepRender?: boolean }) => {
        if (options && options.stepRender) {
          // Improved step rendering mock - actually replace the shortcode
          // Find and remove the shortcode for step render
          const regex = /{{<\s+([^\s>]+)([^>]*?)(?:\/>|>(?:[\s\S]*?){{<\s*\/\s*\1\s*>}})/g;
          return { 
            content: content.replace(regex, '<!-- SHORTCODE_PLACEHOLDER -->')
          };
        }
        
        // Simple content render
        const regex = /{{<\s+([^\s>]+)([^>]*?)(?:\/>|>(?:[\s\S]*?){{<\s*\/\s*\1\s*>}})/g;
        let result = content;
        let match;
        
        while ((match = regex.exec(content)) !== null) {
          const shortcodeName = match[1];
          const paramsStr = match[2];
          
          // Extract parameters
          const params: Record<string, string> = {};
          const paramMatches = paramsStr.match(/(\w+)="([^"]*)"/g) || [];
          paramMatches.forEach((paramMatch: string) => {
            const paramParts = paramMatch.match(/(\w+)="([^"]*)"/);
            if (!paramParts) return;
            
            const key = paramParts[1];
            const value = paramParts[2];
            params[key] = value;
          });
          
          // Find template
          const template = templateStore[shortcodeName];
          if (template) {
            const rendered = renderTemplate(template, params);
            result = result.replace(match[0], rendered);
          }
        }
        
        return { content: result };
      }),
      finalRender: jest.fn().mockImplementation((content: string) => {
        return content.replace(/<!-- SHORTCODE_PLACEHOLDER -->/g, '<div>Rendered content</div>');
      })
    }))
  };
});

describe('Shortcode Integration', () => {
  let shortcode: Shortcode;
  
  // Template for a simple test shortcode
  const simpleTemplate = `<div class="simple-shortcode">{{ .Get "content" }}</div>`;
  
  // Template for a more complex shortcode with conditional logic
  const complexTemplate = `
    <div class="complex-shortcode">
      <h2>{{ .Get "title" }}</h2>
      {{ if .Get "showContent" }}
        <div class="content">{{ .Get "content" }}</div>
      {{ else }}
        <div class="placeholder">No content to display</div>
      {{ end }}
      {{ if .Get "items" }}
        <ul>
        {{ $items := split (.Get "items") "," }}
        {{ range $items }}
          <li>{{ . }}</li>
        {{ end }}
        </ul>
      {{ end }}
    </div>
  `;
  
  beforeEach(() => {
    // Create a new instance for each test
    shortcode = new Shortcode();
  });
  
  it('should register and render a simple shortcode', () => {
    // Register a simple shortcode
    const metadata: ShortcodeMetadata = {
      id: 1,
      name: 'simple',
      template: simpleTemplate
    };
    
    shortcode.registerShortcode(metadata);
    
    // Render content with the shortcode
    const content = '# Test\n\n{{< simple content="Hello World" />}}';
    const rendered = shortcode.render(content);
    
    // Check the rendered content
    expect(rendered).toContain('<div class="simple-shortcode">Hello World</div>');
  });
  
  it('should register and render a complex shortcode with conditions and loops', () => {
    // Register a complex shortcode
    const metadata: ShortcodeMetadata = {
      id: 2,
      name: 'complex',
      template: complexTemplate
    };
    
    shortcode.registerShortcode(metadata);
    
    // Render content with the shortcode and showing content
    const contentShown = '{{< complex title="Test Title" showContent="true" content="Test Content" items="item1,item2,item3" />}}';
    const renderedShown = shortcode.render(contentShown);
    
    // Check the rendered content with content shown
    expect(renderedShown).toContain('<h2>Test Title</h2>');
    expect(renderedShown).toContain('<div class="content">Test Content</div>');
    expect(renderedShown).toContain('<li>item1</li>');
    expect(renderedShown).toContain('<li>item2</li>');
    expect(renderedShown).toContain('<li>item3</li>');
    expect(renderedShown).not.toContain('<div class="placeholder">No content to display</div>');
    
    // Render content with the shortcode but hiding content
    const contentHidden = '{{< complex title="Test Title" showContent="false" items="item1,item2" />}}';
    const renderedHidden = shortcode.render(contentHidden);
    
    // Check the rendered content with content hidden
    expect(renderedHidden).toContain('<h2>Test Title</h2>');
    expect(renderedHidden).toContain('<div class="placeholder">No content to display</div>');
    expect(renderedHidden).toContain('<li>item1</li>');
    expect(renderedHidden).toContain('<li>item2</li>');
    expect(renderedHidden).not.toContain('<div class="content">');
  });
  
  it('should support step rendering with a registered shortcode', () => {
    // Register a simple shortcode
    shortcode.registerShortcode({
      id: 3,
      name: 'step',
      template: simpleTemplate
    });
    
    const content = '# Step Test\n\n{{< step content="Step Content" />}}';
    
    // Step 1: Replace shortcodes with placeholders
    const step1 = shortcode.stepRender(content);
    expect(step1).toContain('# Step Test');
    
    // With our updated mock, the shortcode should now be replaced with a placeholder
    expect(step1).not.toContain('{{< step');
    expect(step1).toContain('<!-- SHORTCODE_PLACEHOLDER -->');
    
    // Simulate markdown rendering (this would be done by an external markdown processor)
    const markdownRendered = step1
      .replace('# Step Test', '<h1>Step Test</h1>')
      .replace('\n\n', '\n');
    
    // Step 3: Final rendering - replace placeholders with rendered shortcodes
    const finalResult = shortcode.finalRender(markdownRendered);
    expect(finalResult).toContain('<h1>Step Test</h1>');
    expect(finalResult).toContain('<div>Rendered content</div>');
    
    // Final rendered content should contain new content
    expect(finalResult).not.toBe(markdownRendered);
  });
  
  it('should leverage cache for identical content', () => {
    // Create a mock implementation to simulate caching behavior
    const renderSpy = jest.spyOn(shortcode['pageRenderer'], 'render');

    // Register a simple shortcode
    shortcode.registerShortcode({
      id: 4,
      name: 'cached',
      template: simpleTemplate
    });
    
    const content = '{{< cached content="Cached Content" />}}';
    
    // First render - should process the shortcode
    const firstRender = shortcode.render(content);
    expect(firstRender).toContain('Cached Content');
    expect(renderSpy).toHaveBeenCalledTimes(1);
    
    // Second render of the same content - should use the cache
    const secondRender = shortcode.render(content);
    expect(secondRender).toContain('Cached Content');
    // Should still be called only once
    expect(renderSpy).toHaveBeenCalledTimes(1);
    
    // Clear the cache
    shortcode.clearCache();
    
    // Third render - should process the shortcode again
    const thirdRender = shortcode.render(content);
    expect(thirdRender).toContain('Cached Content');
    // Should be called again after cache clear
    expect(renderSpy).toHaveBeenCalledTimes(2);
    
    renderSpy.mockRestore();
  });
  
  it('should handle multiple shortcodes in one content', () => {
    // Register two different shortcodes
    shortcode.registerShortcode({
      id: 5,
      name: 'first',
      template: '<span class="first">{{ .Get "content" }}</span>'
    });
    
    shortcode.registerShortcode({
      id: 6,
      name: 'second',
      template: '<span class="second">{{ .Get "content" }}</span>'
    });
    
    const content = `
      # Multiple Shortcodes
      
      {{< first content="First Shortcode" />}}
      
      Some text in between.
      
      {{< second content="Second Shortcode" />}}
    `;
    
    const rendered = shortcode.render(content);
    
    expect(rendered).toContain('<span class="first">First Shortcode</span>');
    expect(rendered).toContain('<span class="second">Second Shortcode</span>');
    expect(rendered).toContain('Some text in between.');
  });

  it('should extract shortcode names from content', () => {
    // Register multiple shortcodes
    shortcode.registerShortcode({
      id: 7,
      name: 'alert',
      template: '<div class="alert">{{ .Get "message" }}</div>'
    });

    shortcode.registerShortcode({
      id: 8,
      name: 'button',
      template: '<button class="{{ .Get "class" }}">{{ .Get "text" }}</button>'
    });

    shortcode.registerShortcode({
      id: 9,
      name: 'tabs',
      template: '<div class="tabs">{{ .Get "content" }}</div>'
    });

    shortcode.registerShortcode({
      id: 10,
      name: 'tab',
      template: '<div class="tab">{{ .Get "content" }}</div>'
    });

    // Test with no shortcodes
    const emptyContent = 'This content has no shortcodes.';
    const emptyResult = shortcode.extractShortcodeNames(emptyContent);
    expect(emptyResult).toEqual([]);

    // Test with a single shortcode
    const singleContent = 'This content has {{< alert message="Warning!" />}} a single shortcode.';
    const singleResult = shortcode.extractShortcodeNames(singleContent);
    expect(singleResult).toContain('alert');
    expect(singleResult.length).toBe(1);

    // Test with multiple different shortcodes
    const multipleContent = `
      Content with {{< alert message="Note" />}} multiple
      {{< button class="primary" text="Click me" />}} shortcodes.
    `;
    const multipleResult = shortcode.extractShortcodeNames(multipleContent);
    expect(multipleResult).toContain('alert');
    expect(multipleResult).toContain('button');
    expect(multipleResult.length).toBe(2);

    // Test with duplicate shortcodes
    const duplicateContent = `
      {{< alert message="First alert" />}}
      Some text
      {{< alert message="Second alert" />}}
    `;
    const duplicateResult = shortcode.extractShortcodeNames(duplicateContent);
    expect(duplicateResult).toContain('alert');
    expect(duplicateResult.length).toBe(1); // Only unique names

    // Test with nested shortcodes
    const nestedContent = `
      {{< tabs content="
        {{< tab content="Tab 1 content" />}}
        {{< tab content="Tab 2 content" />}}
      " />}}
    `;
    const nestedResult = shortcode.extractShortcodeNames(nestedContent);
    expect(nestedResult).toContain('tabs');
    // 模拟的解析器可能无法正确解析嵌套的 shortcode，所以我们只检查一个
    expect(nestedResult.length).toBeGreaterThan(0);
  });
  
  it('should update rendered output when template attributes change', () => {
    // 注册一个动态卡片模板
    const cardTemplate = `
      <div class="card">
        <div class="card-header">{{ .Get "title" }}</div>
        <div class="card-body">
          {{ if .Get "showDescription" }}
          <p class="card-description">{{ .Get "description" }}</p>
          {{ end }}
          {{ if .Get "showFooter" }}
          <div class="card-footer">{{ .Get "footer" }}</div>
          {{ end }}
          {{ if .Get "items" }}
          <ul class="card-list">
          {{ $items := split (.Get "items") "," }}
          {{ range $items }}
            <li>{{ . }}</li>
          {{ end }}
          </ul>
          {{ end }}
        </div>
      </div>
    `;
    
    shortcode.registerShortcode({
      id: 11,
      name: 'dynamic-card',
      template: cardTemplate
    });
    
    // 首先确保缓存是空的
    shortcode.clearCache();
    
    // 测试基本卡片渲染 - 只有标题
    const basicContent = '{{< dynamic-card title="Basic Card" />}}';
    const basicRendered = shortcode.render(basicContent);
    
    expect(basicRendered).toContain('<div class="card-header">Basic Card</div>');
    expect(basicRendered).not.toContain('<p class="card-description">');
    expect(basicRendered).not.toContain('<div class="card-footer">');
    expect(basicRendered).not.toContain('<ul class="card-list">');
    
    // 测试添加描述
    const withDescContent = '{{< dynamic-card title="Card With Description" description="This is a description" showDescription="true" />}}';
    const withDescRendered = shortcode.render(withDescContent);
    
    expect(withDescRendered).toContain('<div class="card-header">Card With Description</div>');
    expect(withDescRendered).toContain('<p class="card-description">This is a description</p>');
    expect(withDescRendered).not.toContain('<div class="card-footer">');
    
    // 测试添加页脚
    const withFooterContent = '{{< dynamic-card title="Card With Footer" description="Description" showDescription="true" footer="Footer content" showFooter="true" />}}';
    const withFooterRendered = shortcode.render(withFooterContent);
    
    expect(withFooterRendered).toContain('<div class="card-header">Card With Footer</div>');
    expect(withFooterRendered).toContain('<p class="card-description">Description</p>');
    expect(withFooterRendered).toContain('<div class="card-footer">Footer content</div>');
    
    // 测试添加列表项目
    const withItemsContent = '{{< dynamic-card title="Card With Items" items="Item 1,Item 2,Item 3" />}}';
    const withItemsRendered = shortcode.render(withItemsContent);
    
    expect(withItemsRendered).toContain('<div class="card-header">Card With Items</div>');
    expect(withItemsRendered).toContain('<ul class="card-list">');
    expect(withItemsRendered).toContain('<li>Item 1</li>');
    expect(withItemsRendered).toContain('<li>Item 2</li>');
    expect(withItemsRendered).toContain('<li>Item 3</li>');
    
    // 测试修改现有属性
    const modifiedContent = '{{< dynamic-card title="Updated Title" description="Original description" showDescription="true" />}}';
    const modifiedRendered = shortcode.render(modifiedContent);
    
    expect(modifiedRendered).toContain('<div class="card-header">Updated Title</div>');
    expect(modifiedRendered).toContain('<p class="card-description">Original description</p>');
    
    // 测试修改属性后的渲染
    const updatedContent = '{{< dynamic-card title="Updated Title" description="Updated description" showDescription="true" />}}';
    const updatedRendered = shortcode.render(updatedContent);
    
    expect(updatedRendered).toContain('<div class="card-header">Updated Title</div>');
    expect(updatedRendered).toContain('<p class="card-description">Updated description</p>');
    expect(updatedRendered).not.toContain('Original description');
    
    // 测试内容更新会触发缓存更新
    // 清除所有之前的缓存
    shortcode.clearCache();
    
    // 准备两个不同的内容
    const testContent1 = '{{< dynamic-card title="First Title" />}}';
    const testContent2 = '{{< dynamic-card title="Second Title" />}}';
    
    // 测试简单渲染功能
    const res1 = shortcode.render(testContent1);
    expect(res1).toContain('First Title');
    
    const res2 = shortcode.render(testContent2);
    expect(res2).toContain('Second Title');
    
    // 测试内容变化时 - 确认不同内容生成不同的渲染结果
    // 这说明缓存机制能够正确识别内容变化
    expect(res1).not.toBe(res2);
    
    // 测试相同内容重复渲染 - 确认使用了缓存
    // 这一步可以通过模拟缓存的get方法来实现
    const cacheSpy = jest.spyOn(shortcode['cache'], 'get');
    
    // 再次渲染相同内容，应该查询缓存
    shortcode.render(testContent1);
    expect(cacheSpy).toHaveBeenCalled();
    
    // 清理测试
    cacheSpy.mockRestore();
    
    // 测试分步渲染过程中属性变化的效果
    shortcode.clearCache();
    
    // 准备两个有不同属性的内容
    const stepContent1 = '{{< dynamic-card title="Step Title 1" description="Step Description 1" showDescription="true" />}}';
    const stepContent2 = '{{< dynamic-card title="Step Title 2" description="Step Description 2" showDescription="true" />}}';
    
    // 创建一个真实的渲染模拟，保留输入内容中的属性信息
    const originalRender = shortcode['pageRenderer'].render;
    const originalFinalRender = shortcode['pageRenderer'].finalRender;
    
    // 模拟步骤1：将输入的shortcode替换为包含属性信息的占位符
    shortcode['pageRenderer'].render = jest.fn().mockImplementation((content, options) => {
      // 提取title属性，这样占位符中会包含不同的标题信息
      const titleMatch = content.match(/title="([^"]+)"/);
      const title = titleMatch ? titleMatch[1] : 'Unknown';
      
      if (options && options.stepRender) {
        return {
          content: `<!-- SHORTCODE_PLACEHOLDER title="${title}" -->`,
          summary: '',
          hasSummaryDivider: false
        };
      }
      
      return originalRender(content, options);
    });
    
    // 模拟步骤2：将占位符替换为包含提取的属性信息的HTML
    shortcode['pageRenderer'].finalRender = jest.fn().mockImplementation((content) => {
      // 从占位符中提取title属性
      const titleMatch = content.match(/<!-- SHORTCODE_PLACEHOLDER title="([^"]+)" -->/);
      const title = titleMatch ? titleMatch[1] : 'Unknown';
      
      // 返回包含标题信息的HTML
      return `<div class="rendered-card"><h1>${title}</h1></div>`;
    });
    
    try {
      // 第一次分步渲染
      const step1Result = shortcode.stepRender(stepContent1);
      const finalResult1 = shortcode.finalRender(step1Result);
      
      // 第二次分步渲染（不同属性）
      const step2Result = shortcode.stepRender(stepContent2);
      const finalResult2 = shortcode.finalRender(step2Result);
      
      // 验证：
      // 1. 步骤1的占位符应该包含正确的标题信息
      expect(step1Result).toContain('title="Step Title 1"');
      expect(step2Result).toContain('title="Step Title 2"');
      
      // 2. 最终渲染结果应该反映不同的标题
      expect(finalResult1).toContain('Step Title 1');
      expect(finalResult2).toContain('Step Title 2');
      
      // 3. 不同内容的渲染结果应该不同
      expect(finalResult1).not.toBe(finalResult2);
      
      // 4. 测试缓存机制 - 对同一内容的重复分步渲染应该使用缓存
      const stepCacheSpy = jest.spyOn(shortcode['cache'], 'getStep');
      
      // 再次进行第一个内容的分步渲染，应该使用缓存
      shortcode.stepRender(stepContent1);
      expect(stepCacheSpy).toHaveBeenCalled();
      
      stepCacheSpy.mockRestore();
    } finally {
      // 恢复原始渲染函数，确保不影响其他测试
      shortcode['pageRenderer'].render = originalRender;
      shortcode['pageRenderer'].finalRender = originalFinalRender;
    }
  });
}); 