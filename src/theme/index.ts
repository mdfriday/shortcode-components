/**
 * Theme Management System
 * 
 * A system for managing themes in Obsidian notes.
 */

// Export types
export * from './types';

// Export theme manager
export { ThemeManagerImpl } from './theme-manager';

// Export components
export * from './components';

// Export utils
export * from './utils';

// Export style builder
export * from './style-builder';

// Import for default export
import { ThemeManagerImpl } from './theme-manager';

// Default export
export default {
  ThemeManagerImpl
}; 