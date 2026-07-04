// @ts-nocheck
import { simpleNodeRule, isReactComponentSuper } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Prefer function components over React class components.",
  message: "Prefer function components over React class components.",
  visitors: {
    ClassDeclaration: reportReactClassComponent,
    ClassExpression: reportReactClassComponent,
  },
});

function reportReactClassComponent(node, context) {
  if (isReactComponentSuper(node.superClass)) {
    context.report({ node, messageId: "default" });
  }
}
