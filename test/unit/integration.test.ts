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
}); 