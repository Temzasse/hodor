// @ts-nocheck
import { simpleNodeRule } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Disallow leaked dollar-template text in JSX.",
  message: "This looks like leaked template syntax in JSX text.",
  visitors: {
    JSXText(node, context) {
      if (node.value.includes("$")) {
        context.report({ node, messageId: "default" });
      }
    },
  },
});
