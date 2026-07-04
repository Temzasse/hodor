// @ts-nocheck
import { simpleNodeRule } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Avoid rendering raw values through && in JSX.",
  message: "Use an explicit ternary or Boolean(...) guard so raw values cannot leak into JSX.",
  visitors: {
    JSXExpressionContainer(node, context) {
      if (node.expression?.type === "LogicalExpression" && node.expression.operator === "&&") {
        context.report({ node: node.expression, messageId: "default" });
      }
    },
  },
});
