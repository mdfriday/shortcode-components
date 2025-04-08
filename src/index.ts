import { Shortcode } from "./shortcode";
import { ShortcodeManager, ShortcodeMetadata, ShortcodeTemplateOptions } from "./shortcode-manager";
import { ShortcodeCache, RenderResult } from "./shortcode-cache";

// Named exports for ES modules
export { Shortcode, ShortcodeManager, ShortcodeMetadata, ShortcodeTemplateOptions, ShortcodeCache, RenderResult };

// Default export for better CommonJS compatibility
const defaultExport = { 
  Shortcode, 
  ShortcodeManager, 
  ShortcodeMetadata: {} as ShortcodeMetadata, 
  ShortcodeCache, 
  RenderResult: {} as RenderResult 
};

export default defaultExport;
