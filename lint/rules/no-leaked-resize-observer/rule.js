// @ts-nocheck
import { observerCleanupRule } from "../../utils.js";

export const rule = observerCleanupRule({
  description: "Require ResizeObserver cleanup in effects.",
  message: "Disconnect ResizeObserver instances in effect cleanup.",
  observerNames: ["ResizeObserver"],
});
