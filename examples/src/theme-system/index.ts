/**
 * Theme Management System
 * 
 * A system for managing themes in Obsidian notes.
 */

// Export types
export * from './types';

// Export utils
export * from './utils';

// Export components
export * from './components';

// Export theme manager
export { ThemeManagerImpl } from './theme-manager';

// Import for default export
import { ThemeManagerImpl } from './theme-manager';

// Default export
export default {
  ThemeManagerImpl
}; 