// @ts-nocheck
import { effectCleanupRule } from "../../utils.js";

export const rule = effectCleanupRule({
  description: "Require cleanup for intervals created in effects.",
  message: "Clear intervals created in effects.",
  setupNames: ["setInterval", "globalThis.setInterval", "window.setInterval"],
  cleanupNames: ["clearInterval", "globalThis.clearInterval", "window.clearInterval"],
});
