// @ts-nocheck
import { simpleNodeRule, getIdentifierName } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Require children to be explicit in component props.",
  message: "Declare children explicitly instead of reading implicit props.children.",
  visitors: {
    MemberExpression(node, context) {
      if (getIdentifierName(node) === "props.children") {
        context.report({ node, messageId: "default" });
      }
    },
  },
});
