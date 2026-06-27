// @ts-check
import { createRule, getCalleeName } from "../../utils.js";

const defaultCallees = [
  "useMemo",
  "React.useMemo",
  "useCallback",
  "React.useCallback",
  "memo",
  "React.memo",
];

export const rule = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Avoid React memoization APIs by default unless a measured need justifies them.",
    },
    messages: {
      memoization:
        "Avoid {{name}} by default. Keep the code direct unless memoization is measured or required.",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const calleeName = getCalleeName(node);

        if (calleeName && defaultCallees.includes(calleeName)) {
          context.report({
            node,
            messageId: "memoization",
            data: { name: calleeName },
          });
        }
      },
    };
  },
});
