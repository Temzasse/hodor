// @ts-nocheck
import { effectCleanupRule } from "../../utils.js";

export const rule = effectCleanupRule({
  description: "Require abortable fetch work in effects.",
  message: "Make fetch work in effects abortable or move it to a data-fetching layer.",
  setupNames: ["fetch", "globalThis.fetch", "window.fetch"],
  cleanupNames: ["abort"],
});
