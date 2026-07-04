// @ts-nocheck
import { simpleNodeRule, isFunctionNode, getCalleeName, visitChildren } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Reserve the use prefix for hooks.",
  message: "Reserve the use prefix for functions that call React hooks.",
  visitors: {
    FunctionDeclaration(node, context) {
      if (node.id?.name && isUseName(node.id.name) && !containsHookCall(node.body)) {
        context.report({ node: node.id, messageId: "default" });
      }
    },
    VariableDeclarator(node, context) {
      if (
        node.id.type === "Identifier" &&
        isUseName(node.id.name) &&
        isFunctionNode(node.init) &&
        !containsHookCall(node.init.body)
      ) {
        context.report({ node: node.id, messageId: "default" });
      }
    },
  },
});

function isUseName(name) {
  return /^use[A-Z0-9]/.test(name);
}

function containsHookCall(node) {
  let found = false;

  if (!node) {
    return false;
  }

  visitChildren(node, (child) => {
    const calleeName = child.type === "CallExpression" ? getCalleeName(child) : undefined;

    if (calleeName && /(^|[.])use[A-Z0-9]/.test(calleeName)) {
      found = true;
    }
  });

  return found;
}
