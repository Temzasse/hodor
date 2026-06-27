// @ts-check
import { createRule, getCalleeName } from "../../utils.js";

export const rule = createRule({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow asserting JSON.parse output directly to a trusted type.",
    },
    messages: {
      unsafeParse:
        "Validate JSON.parse output at the boundary instead of asserting it to a trusted type.",
    },
  },
  create(context) {
    /**
     * @param {import("@oxlint/plugins").ESTree.Node} node
     */
    function checkAssertion(node) {
      if (isTypeAssertionOf({ node, expressionPredicate: isJsonParseCall })) {
        context.report({ node, messageId: "unsafeParse" });
      }
    }

    return {
      TSAsExpression: checkAssertion,
      TSTypeAssertion: checkAssertion,
    };
  },
});

/**
 * @param {{
 *   node: import("@oxlint/plugins").ESTree.Node;
 *   expressionPredicate: (node: import("@oxlint/plugins").ESTree.Node | null | undefined) => boolean;
 * }} params
 */
function isTypeAssertionOf({ node, expressionPredicate }) {
  return (
    (node.type === "TSAsExpression" || node.type === "TSTypeAssertion") &&
    expressionPredicate(node.expression)
  );
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node | undefined | null} node
 */
function isJsonParseCall(node) {
  return node?.type === "CallExpression" && getCalleeName(node) === "JSON.parse";
}
