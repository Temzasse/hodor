// @ts-nocheck
import { simpleNodeRule, getIdentifierName, visitChildren } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Use the setState updater argument instead of reading this.state.",
  message: "Use the setState updater argument instead of reading this.state.",
  visitors: {
    CallExpression(node, context) {
      if (
        node.callee.type !== "MemberExpression" ||
        getIdentifierName(node.callee) !== "this.setState"
      ) {
        return;
      }

      let readsThisState = false;

      if (node.arguments?.[0]) {
        visitChildren(node.arguments[0], (child) => {
          if (child.type === "MemberExpression" && getIdentifierName(child) === "this.state") {
            readsThisState = true;
          }
        });
      }

      if (readsThisState) {
        context.report({ node, messageId: "default" });
      }
    },
  },
});
