// @ts-nocheck
import { jsxOpeningRule, getJSXName } from "../../utils.js";

export const rule = jsxOpeningRule({
  description: "Avoid Context.Provider JSX when the project expects direct context providers.",
  message: "Avoid Context.Provider JSX. Prefer the project-standard context provider API.",
  shouldReport(node) {
    return getJSXName(node.name).endsWith(".Provider");
  },
});
