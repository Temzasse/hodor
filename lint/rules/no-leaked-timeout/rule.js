// @ts-nocheck
import { effectCleanupRule } from "../../utils.js";

export const rule = effectCleanupRule({
  description: "Require cleanup for timeouts created in effects.",
  message: "Clear timeouts created in effects.",
  setupNames: ["setTimeout", "globalThis.setTimeout", "window.setTimeout"],
  cleanupNames: ["clearTimeout", "globalThis.clearTimeout", "window.clearTimeout"],
});
