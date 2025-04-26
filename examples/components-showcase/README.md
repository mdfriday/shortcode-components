# Components Showcase

This is a web application that showcases various MDFriday shortcode components. It provides a visual demonstration of how the components look and work.

## Components Showcased

- **CardBanner** - A component for displaying banner cards
- **FormulaFlow** - A component for displaying formula flows
- **FormulaPair** - A component for displaying formula pairs
- **FormulaSingle** - A component for displaying single formula structure
- **RankingFishingCard001** - A component for displaying fishing ranking cards

## Getting Started

Follow these steps to run the application locally:

1. Navigate to the project directory:
   ```bash
   cd examples/components-showcase
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add placeholder images for the examples:
   - Create a directory for images: `mkdir -p public/images`
   - Add placeholder images named:
     - `avatar.png` - A profile image for CardBanner
     - `qiang.png` - A profile image for RankingFishingCard001
     - `totw-25.webp` - A background image for RankingFishingCard001
   
   You can use any images you have available or create placeholder images.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

- `src/index.ts` - Main server file that sets up the Express server
- `src/components/` - Markdown files with examples of each component
- `src/styles/` - CSS styles for the application
- `public/images/` - Static images used in the examples

## Known Issues and Troubleshooting

### Button Component Theme Error

There's a known issue with the Button component theme generation that may cause errors like:

```
TypeError: Cannot read properties of undefined (reading 'disabled')
at ButtonComponent.generateBaseCSS
```

This has been addressed in the showcase application with fallback styles that will be used if theme generation fails. The application should continue to work, although buttons may not have the full styling expected.

### TypeScript Errors

If you encounter TypeScript errors related to missing properties on PageRenderResult, ensure you're using the `--transpile-only` flag with ts-node-dev, which is already configured in the package.json scripts.

### Missing Images

If components appear to be missing images, ensure you've added the placeholder images to the `public/images` directory as mentioned in the setup instructions.

## Available Themes

The application supports the following themes:
- Base
- Bootstrap
- Tailwind

You can switch between themes using the dropdown in the sidebar.

## Development

To add a new component example:
1. Create a new markdown file in `src/components/`
2. Add the component to the sidebar navigation in `src/index.ts`
3. Restart the development server 