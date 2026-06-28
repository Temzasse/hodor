// @ts-check
import { createRule, unwrapParameter } from "../../utils.js";

/**
 * @typedef {import("@oxlint/plugins").ESTree.Function | import("@oxlint/plugins").ESTree.ArrowFunctionExpression} FunctionLikeNode
 * @typedef {import("@oxlint/plugins").ESTree.Node & { typeAnnotation?: { typeAnnotation?: import("@oxlint/plugins").ESTree.Node | null } | null }} TypeAnnotatedNode
 */

export const rule = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow risky positional function parameter signatures at function creation sites.",
    },
    messages: {
      tooMany: "Prefer a named object parameter instead of {{count}} positional parameters.",
      sameType:
        "Prefer a named object parameter for two positional parameters with the same {{type}} type.",
    },
  },
  create(context) {
    /** @param {FunctionLikeNode} node */
    function checkFunction(node) {
      const parameters = node.params ?? [];

      if (
        parameters.length === 0 ||
        parameters.some((parameter) => parameter.type === "RestElement")
      ) {
        return;
      }

      if (parameters.length === 1 && isObjectParameter(unwrapParameter(parameters[0]))) {
        return;
      }

      if (parameters.length > 2) {
        context.report({
          node,
          messageId: "tooMany",
          data: { count: String(parameters.length) },
        });
        return;
      }

      if (parameters.length === 2) {
        const [firstType, secondType] = parameters.map((parameter) =>
          getPrimitiveParameterType(parameter),
        );

        if (firstType && firstType === secondType) {
          context.report({
            node,
            messageId: "sameType",
            data: { type: firstType },
          });
        }
      }
    }

    return {
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      ArrowFunctionExpression: checkFunction,
    };
  },
});

/**
 * @param {import("@oxlint/plugins").ESTree.Node | undefined | null} node
 */
function isObjectParameter(node) {
  return node?.type === "ObjectPattern";
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node} parameter
 */
function getPrimitiveParameterType(parameter) {
  const unwrapped = /** @type {TypeAnnotatedNode | undefined | null} */ (
    unwrapParameter(parameter)
  );
  const typeNode = unwrapped?.typeAnnotation?.typeAnnotation;

  if (typeNode) {
    return getPrimitiveTypeNodeName(typeNode);
  }

  if (parameter.type === "AssignmentPattern") {
    return getPrimitiveLiteralTypeName(parameter.right);
  }
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node} typeNode
 */
function getPrimitiveTypeNodeName(typeNode) {
  switch (typeNode.type) {
    case "TSStringKeyword":
      return "string";
    case "TSNumberKeyword":
      return "number";
    case "TSBooleanKeyword":
      return "boolean";
  }
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node} node
 */
function getPrimitiveLiteralTypeName(node) {
  return node.type === "Literal" && ["string", "number", "boolean"].includes(typeof node.value)
    ? typeof node.value
    : undefined;
}
