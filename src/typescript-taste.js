// @ts-check
import {
  createPlugin,
  createRule,
  getCalleeName,
  getIdentifierName,
  getRuleOptions,
  getSourceCode,
  getTypeNode,
  isBooleanLiteral,
  unwrapParameter,
} from "./utils.js";

/**
 * @typedef {import("@oxlint/plugins").ESTree.Function | import("@oxlint/plugins").ESTree.ArrowFunctionExpression} FunctionLikeNode
 * @typedef {import("@oxlint/plugins").ESTree.Node & { optional?: boolean; parameter?: import("@oxlint/plugins").ESTree.Node; typeAnnotation?: { typeAnnotation?: import("@oxlint/plugins").ESTree.Node | null } | null }} ParameterLikeNode
 */

/**
 * @param {import("@oxlint/plugins").ESTree.Node | undefined | null} node
 */
function isObjectParameter(node) {
  return node?.type === "ObjectPattern";
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node | undefined | null} node
 * @returns {boolean}
 */
function isOptionalParameter(node) {
  if (!node) {
    return false;
  }

  const parameter = /** @type {ParameterLikeNode} */ (node);

  if (parameter.optional || node.type === "AssignmentPattern") {
    return true;
  }

  return node.type === "TSParameterProperty" && isOptionalParameter(parameter.parameter);
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node | undefined | null} typeNode
 */
function isBooleanTypeNode(typeNode) {
  if (!typeNode) {
    return false;
  }

  if (
    typeNode.type === "TSBooleanKeyword" ||
    (typeNode.type === "TSLiteralType" && isBooleanLiteral(typeNode.literal))
  ) {
    return true;
  }

  if (typeNode.type === "TSUnionType") {
    return typeNode.types.some(isBooleanTypeNode);
  }

  return false;
}

/**
 * @param {{ parameter: import("@oxlint/plugins").ESTree.Node; sourceCode: import("@oxlint/plugins").SourceCode }} params
 * @returns {string | undefined}
 */
function normalizedTypeName({ parameter, sourceCode }) {
  const typeNode = getTypeNode(parameter);

  if (!typeNode) {
    return undefined;
  }

  switch (typeNode.type) {
    case "TSStringKeyword":
      return "string";
    case "TSNumberKeyword":
      return "number";
    case "TSBooleanKeyword":
      return "boolean";
    case "TSBigIntKeyword":
      return "bigint";
    case "TSSymbolKeyword":
      return "symbol";
    case "TSTypeReference":
      return getIdentifierName(typeNode.typeName);
    case "TSArrayType":
      return `${
        normalizedTypeName({
          parameter: /** @type {import("@oxlint/plugins").ESTree.Node} */ ({
            type: "Identifier",
            name: "element",
            range: typeNode.elementType.range,
            loc: typeNode.elementType.loc,
            typeAnnotation: { typeAnnotation: typeNode.elementType },
          }),
          sourceCode,
        }) ?? "array"
      }[]`;
    default:
      return sourceCode.getText(typeNode).replace(/\s+/g, " ");
  }
}

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

const noBooleanFlagParameters = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow boolean flag parameters and optionally raw boolean call arguments.",
    },
    schema: [
      {
        type: "object",
        properties: {
          checkCallArguments: { type: "boolean" },
          ignoredCallees: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      parameter:
        "Avoid boolean flag parameter '{{name}}'. Use a named options object or discriminated value.",
      argument:
        "Avoid raw boolean positional argument. Use a named options object or a clearer discriminated value.",
    },
  },
  create(context) {
    const options = getRuleOptions(context);
    const ignoredCallees = new Set(
      Array.isArray(options.ignoredCallees) ? options.ignoredCallees : [],
    );

    /** @param {FunctionLikeNode} node */
    function checkFunction(node) {
      for (const parameter of node.params ?? []) {
        const unwrapped = unwrapParameter(parameter);
        const hasBooleanDefault =
          parameter.type === "AssignmentPattern" && isBooleanLiteral(parameter.right);

        if (isBooleanTypeNode(getTypeNode(parameter)) || hasBooleanDefault) {
          context.report({
            node: unwrapped ?? parameter,
            messageId: "parameter",
            data: { name: unwrapped?.type === "Identifier" ? unwrapped.name : "parameter" },
          });
        }
      }
    }

    /** @type {import("@oxlint/plugins").Visitor} */
    const visitors = {
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      ArrowFunctionExpression: checkFunction,
    };

    if (options.checkCallArguments) {
      /**
       * @param {import("@oxlint/plugins").ESTree.CallExpression} node
       */
      visitors.CallExpression = function checkCallExpression(node) {
        const calleeName = getCalleeName(node);

        if (calleeName && ignoredCallees.has(calleeName)) {
          return;
        }

        for (const argument of node.arguments ?? []) {
          if (isBooleanLiteral(argument)) {
            context.report({ node: argument, messageId: "argument" });
          }
        }
      };
    }

    return visitors;
  },
});

const preferNamedObjectParameters = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer one named object parameter for risky positional signatures.",
    },
    schema: [
      {
        type: "object",
        properties: {
          maxPositionalParameters: { type: "number" },
          checkSameTypedPairs: { type: "boolean" },
          checkOptionalParameters: { type: "boolean" },
          checkBooleanParameters: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooMany: "Prefer a named object parameter instead of {{count}} positional parameters.",
      sameTyped: "Prefer a named object parameter for adjacent same-typed parameters.",
      optional:
        "Prefer a named object parameter when a positional parameter is optional or defaulted.",
      boolean: "Prefer a named object parameter instead of a positional boolean option.",
    },
  },
  create(context) {
    const sourceCode = getSourceCode(context);
    const options = getRuleOptions(context);
    const maxPositionalParameters =
      typeof options.maxPositionalParameters === "number" ? options.maxPositionalParameters : 2;
    const checkSameTypedPairs =
      typeof options.checkSameTypedPairs === "boolean" ? options.checkSameTypedPairs : true;
    const checkOptionalParameters =
      typeof options.checkOptionalParameters === "boolean" ? options.checkOptionalParameters : true;
    const checkBooleanParameters =
      typeof options.checkBooleanParameters === "boolean" ? options.checkBooleanParameters : true;

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

      if (parameters.length > maxPositionalParameters) {
        context.report({
          node,
          messageId: "tooMany",
          data: { count: String(parameters.length) },
        });
        return;
      }

      if (
        checkBooleanParameters &&
        parameters.some((parameter) => isBooleanTypeNode(getTypeNode(parameter)))
      ) {
        context.report({ node, messageId: "boolean" });
        return;
      }

      if (checkOptionalParameters && parameters.some(isOptionalParameter)) {
        context.report({ node, messageId: "optional" });
        return;
      }

      if (checkSameTypedPairs && parameters.length === 2) {
        const [firstType, secondType] = parameters.map((parameter) =>
          normalizedTypeName({ parameter, sourceCode }),
        );

        if (firstType && firstType === secondType) {
          context.report({ node, messageId: "sameTyped" });
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

const noJsonParseTypeAssertion = createRule({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow asserting JSON.parse output directly to a trusted type.",
    },
    schema: [],
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

export const rules = {
  "no-boolean-flag-parameters": noBooleanFlagParameters,
  "prefer-named-object-parameters": preferNamedObjectParameters,
  "no-json-parse-type-assertion": noJsonParseTypeAssertion,
};

const typescriptTaste = createPlugin({
  name: "typescript-taste",
  rules,
});

export default typescriptTaste;
