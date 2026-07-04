// @ts-nocheck
import { simpleNodeRule } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Disallow JSX namespace names.",
  message: "Do not use JSX namespace names.",
  visitors: {
    JSXNamespacedName(node, context) {
      context.report({ node, messageId: "default" });
    },
  },
});
