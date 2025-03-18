# Content Components

This directory contains components used for content display and interaction.

## Components

### Button

A customizable button component with various styles and states.

### CardBanner

A stylish card banner component inspired by Chinese social media content cards. This component is perfect for:

- Featured content sections
- Course promotion
- Highlighting key metrics and statistics
- Creating eye-catching headers for blog posts or landing pages

The CardBanner features:
- Clean layout with prominent title and subtitle
- Highlighted subtitle with gradient underline
- Rotated "new" tag with visual emphasis
- Footer with category navigation
- Fully customizable content and styling

See the example usage in `examples/CardBanner.example.md`

## Usage

Import and register components in your application:

```typescript
import { registerButtonShortcode, registerCardBannerShortcode } from '@mdfriday/shortcode-components';

// Register components
registerButtonShortcode(renderer, theme);
registerCardBannerShortcode(renderer, theme);
```

Then use the shortcodes in your content:

```
[button href="https://example.com"]Click me[/button]

[cardbanner 
  logo="Brand" 
  mainTitle="Your Main Title" 
  subtitle="Your Subtitle"
]
``` 