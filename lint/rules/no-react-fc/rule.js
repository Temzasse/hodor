// @ts-check
import { createRule, getIdentifierName } from "../../utils.js";

export const rule = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer plain function components with typed props instead of React.FC.",
    },
    messages: {
      reactFc:
        "Use a plain function component with typed props instead of React.FC or FunctionComponent.",
    },
  },
  create(context) {
    return {
      TSTypeReference(node) {
        if (isReactFcTypeName(node.typeName)) {
          context.report({ node, messageId: "reactFc" });
        }
      },
    };
  },
});

/**
 * @param {import("@oxlint/plugins").ESTree.Node | undefined} typeName
 */
function isReactFcTypeName(typeName) {
  const name = getIdentifierName(typeName);
  return name
    ? ["FC", "FunctionComponent", "React.FC", "React.FunctionComponent"].includes(name)
    : false;
}
