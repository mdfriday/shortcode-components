/**
 * Theme Management System
 * 
 * A system for managing themes in Obsidian notes.
 */

// Export types
export * from './types';

// Export utilities
export * from './utils';

// Export ThemeManager
export { ThemeManagerImpl } from './theme-manager';

// Default export
import { ThemeManagerImpl } from './theme-manager';
export default ThemeManagerImpl; 