// @ts-nocheck
import { effectCleanupRule } from "../../utils.js";

export const rule = effectCleanupRule({
  description: "Require cleanup for event listeners created in effects.",
  message: "Clean up event listeners registered in effects.",
  setupNames: ["addEventListener", "globalThis.addEventListener", "window.addEventListener"],
  cleanupNames: [
    "removeEventListener",
    "globalThis.removeEventListener",
    "window.removeEventListener",
  ],
});
