// @ts-check
import { createRule, getCalleeName } from "../../utils.js";

export const rule = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Avoid React forwardRef unless an explicit project exception allows it.",
    },
    messages: {
      forwardRef:
        "Avoid forwardRef. Prefer accepting ref as a regular prop when the React version supports it.",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const calleeName = getCalleeName(node);

        if (calleeName && ["forwardRef", "React.forwardRef"].includes(calleeName)) {
          context.report({ node, messageId: "forwardRef" });
        }
      },
    };
  },
});
