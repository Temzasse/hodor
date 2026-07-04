// @ts-nocheck
import { simpleNodeRule } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Disallow stray semicolon text in JSX.",
  message: "Remove this stray semicolon from JSX text.",
  visitors: {
    JSXText(node, context) {
      if (node.value.trim() === ";") {
        context.report({ node, messageId: "default" });
      }
    },
  },
});
