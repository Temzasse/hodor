// @ts-nocheck
import { jsxOpeningRule, getJSXName } from "../../utils.js";

export const rule = jsxOpeningRule({
  description: "Place JSX key before spreads.",
  message: "Place key before prop spreads so spread props cannot hide key behavior.",
  shouldReport(node) {
    let hasSpread = false;

    for (const attr of node.attributes ?? []) {
      if (attr.type === "JSXSpreadAttribute") {
        hasSpread = true;
        continue;
      }

      if (hasSpread && attr.type === "JSXAttribute" && getJSXName(attr.name) === "key") {
        return true;
      }
    }

    return false;
  },
});
