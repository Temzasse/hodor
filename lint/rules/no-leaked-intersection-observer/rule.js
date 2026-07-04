// @ts-nocheck
import { observerCleanupRule } from "../../utils.js";

export const rule = observerCleanupRule({
  description: "Require IntersectionObserver cleanup in effects.",
  message: "Disconnect IntersectionObserver instances in effect cleanup.",
  observerNames: ["IntersectionObserver"],
});
