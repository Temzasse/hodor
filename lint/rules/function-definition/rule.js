// @ts-nocheck
import { simpleNodeRule, isFunctionNode, isPascalCase, returnsJSX } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Prefer function declarations for React components.",
  message: "Use a function declaration for React components.",
  visitors: {
    VariableDeclarator(node, context) {
      if (
        node.id.type === "Identifier" &&
        isPascalCase(node.id.name) &&
        isFunctionNode(node.init) &&
        returnsJSX(node.init.body)
      ) {
        context.report({ node: node.id, messageId: "default" });
      }
    },
  },
});
