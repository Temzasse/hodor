// @ts-nocheck

/**
 * @param {{ name: string; rules: Record<string, import("@oxlint/plugins").Rule> }} params
 */
export function createPlugin({ name, rules }) {
  return {
    meta: {
      name,
      version: "0.1.0",
    },
    rules,
    configs: {
      recommended: {
        plugins: [name],
        rules: Object.fromEntries(
          Object.keys(rules).map((ruleName) => [`${name}/${ruleName}`, "error"]),
        ),
      },
    },
  };
}

/**
 * @param {import("@oxlint/plugins").Rule} rule
 * @returns {import("@oxlint/plugins").Rule}
 */
export function createRule(rule) {
  return rule;
}

/**
 * @param {import("@oxlint/plugins").Context} context
 */
export function getSourceCode(context) {
  return context.sourceCode ?? context.getSourceCode();
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node | undefined | null} node
 * @returns {string | undefined}
 */
export function getIdentifierName(node) {
  if (!node) {
    return;
  }

  if (node.type === "Identifier" || node.type === "JSXIdentifier") {
    return node.name;
  }

  if (node.type === "ThisExpression") {
    return "this";
  }

  if (node.type === "MemberExpression" && !node.computed) {
    const objectName = getIdentifierName(node.object);
    const propertyName = getIdentifierName(node.property);
    return objectName && propertyName ? `${objectName}.${propertyName}` : undefined;
  }

  if (node.type === "TSQualifiedName") {
    const leftName = getIdentifierName(node.left);
    const rightName = getIdentifierName(node.right);
    return leftName && rightName ? `${leftName}.${rightName}` : undefined;
  }
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node | undefined | null} node
 * @returns {string | undefined}
 */
export function getCalleeName(node) {
  return node?.type === "CallExpression" ? getIdentifierName(node.callee) : undefined;
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node | undefined | null} node
 */
export function unwrapParameter(node) {
  if (node?.type === "AssignmentPattern") {
    return unwrapParameter(node.left);
  }

  if (node?.type === "TSParameterProperty") {
    return unwrapParameter(node.parameter);
  }

  return node;
}

export function simpleNodeRule({ description, message, visitors }) {
  return createRule({
    meta: {
      type: "problem",
      docs: { description },
      messages: { default: message },
    },
    create(context) {
      return Object.fromEntries(
        Object.entries(visitors).map(([nodeName, visitor]) => [
          nodeName,
          (node) => visitor(node, context),
        ]),
      );
    },
  });
}

export function callNameRule({ description, message, names }) {
  const callNames = new Set(names);

  return simpleNodeRule({
    description,
    message,
    visitors: {
      CallExpression(node, context) {
        const calleeName = getCalleeName(node);

        if (calleeName && callNames.has(calleeName)) {
          context.report({ node, messageId: "default" });
        }
      },
    },
  });
}

export function jsxOpeningRule({ description, message, shouldReport }) {
  return simpleNodeRule({
    description,
    message,
    visitors: {
      JSXOpeningElement(node, context) {
        if (shouldReport(node)) {
          context.report({ node, messageId: "default" });
        }
      },
    },
  });
}

export function implicitSpreadPropRule({ description, message, propName }) {
  return simpleNodeRule({
    description,
    message,
    visitors: {
      JSXSpreadAttribute(node, context) {
        if (spreadContainsProp({ context, node, propName })) {
          context.report({ node, messageId: "default" });
        }
      },
    },
  });
}

export function namingCallRule({ description, message, calleeNames, pattern }) {
  const names = new Set(calleeNames);

  return simpleNodeRule({
    description,
    message,
    visitors: {
      VariableDeclarator(node, context) {
        if (
          node.id.type === "Identifier" &&
          node.init?.type === "CallExpression" &&
          names.has(getCalleeName(node.init) ?? "") &&
          !pattern.test(node.id.name)
        ) {
          context.report({ node: node.id, messageId: "default" });
        }
      },
    },
  });
}

export function effectCleanupRule({ description, message, setupNames, cleanupNames }) {
  const setups = new Set(setupNames);
  const cleanups = new Set(cleanupNames);

  return simpleNodeRule({
    description,
    message,
    visitors: {
      CallExpression(node, context) {
        if (!isUseEffectCall(node)) {
          return;
        }

        const callback = node.arguments?.[0];

        if (!isFunctionNode(callback) || !containsAnyCall(callback.body, setups)) {
          return;
        }

        if (!containsCleanupCall(callback.body, cleanups)) {
          context.report({ node, messageId: "default" });
        }
      },
    },
  });
}

export function observerCleanupRule({ description, message, observerNames }) {
  const observers = new Set(observerNames);

  return simpleNodeRule({
    description,
    message,
    visitors: {
      CallExpression(node, context) {
        if (!isUseEffectCall(node)) {
          return;
        }

        const callback = node.arguments?.[0];

        if (!isFunctionNode(callback) || !containsNewExpression(callback.body, observers)) {
          return;
        }

        if (!containsCleanupCall(callback.body, new Set(["disconnect"]))) {
          context.report({ node, messageId: "default" });
        }
      },
    },
  });
}

export function visitChildren(node, visitor) {
  for (const [key, value] of Object.entries(node)) {
    if (key === "parent" || key === "range" || key === "loc") {
      continue;
    }

    if (!value) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const child of value) {
        visitChild(child, visitor);
      }

      continue;
    }

    visitChild(value, visitor);
  }
}

export function isReactComponentSuper(node) {
  const name = getIdentifierName(node);
  return name
    ? ["Component", "PureComponent", "React.Component", "React.PureComponent"].includes(name)
    : false;
}

export function getJSXName(node) {
  if (node.type === "JSXIdentifier") {
    return node.name;
  }

  if (node.type === "JSXMemberExpression") {
    return `${getJSXName(node.object)}.${getJSXName(node.property)}`;
  }

  if (node.type === "JSXNamespacedName") {
    return `${getJSXName(node.namespace)}:${getJSXName(node.name)}`;
  }

  return "";
}

export function isFunctionNode(node) {
  return (
    node?.type === "FunctionDeclaration" ||
    node?.type === "FunctionExpression" ||
    node?.type === "ArrowFunctionExpression"
  );
}

export function isPascalCase(name) {
  return /^[A-Z]/.test(name);
}

export function returnsJSX(node) {
  let found = false;

  if (!node) {
    return false;
  }

  if (node.type === "JSXElement" || node.type === "JSXFragment") {
    return true;
  }

  visitChild(node, (child) => {
    if (
      (child.type === "ReturnStatement" &&
        (child.argument?.type === "JSXElement" || child.argument?.type === "JSXFragment")) ||
      child.type === "JSXElement" ||
      child.type === "JSXFragment"
    ) {
      found = true;
    }
  });

  return found;
}

function visitChild(value, visitor) {
  if (!isAstNode(value)) {
    return;
  }

  visitor(value);
  visitChildren(value, visitor);
}

function isAstNode(value) {
  return typeof value === "object" && value !== null && "type" in value;
}

function spreadContainsProp({ context, node, propName }) {
  if (node.argument.type === "ObjectExpression") {
    return objectExpressionHasKey({ node: node.argument, propName });
  }

  if (node.argument.type !== "Identifier") {
    return false;
  }

  const variable = findVariable({ context, node: node.argument });
  const definition = variable?.defs.find((def) => def.node.type === "VariableDeclarator")?.node;

  return (
    definition?.type === "VariableDeclarator" &&
    definition.init?.type === "ObjectExpression" &&
    objectExpressionHasKey({ node: definition.init, propName })
  );
}

function objectExpressionHasKey({ node, propName }) {
  return (node.properties ?? []).some((property) => {
    if (property.type !== "Property") {
      return false;
    }

    const keyName = getPropertyName(property.key);
    return keyName === propName;
  });
}

function findVariable({ context, node }) {
  let scope = context.sourceCode.getScope(node);

  while (scope) {
    const variable = scope.set.get(node.name);

    if (variable) {
      return variable;
    }

    scope = scope.upper;
  }
}

function getPropertyName(key) {
  if (key.type === "Identifier" || key.type === "PrivateIdentifier") {
    return key.name;
  }

  if (key.type === "Literal") {
    return String(key.value);
  }
}

function isUseEffectCall(node) {
  return ["useEffect", "React.useEffect"].includes(getCalleeName(node) ?? "");
}

function containsAnyCall(node, names) {
  let found = false;

  if (!node) {
    return false;
  }

  visitChild(node, (child) => {
    if (
      child.type === "CallExpression" &&
      (names.has(getCalleeName(child) ?? "") || names.has(getCallPropertyName(child) ?? ""))
    ) {
      found = true;
    }
  });

  return found;
}

function getCallPropertyName(node) {
  if (node.callee.type !== "MemberExpression" || node.callee.computed) {
    return;
  }

  return getIdentifierName(node.callee.property);
}

function containsNewExpression(node, names) {
  let found = false;

  if (!node) {
    return false;
  }

  visitChild(node, (child) => {
    if (child.type === "NewExpression" && names.has(getIdentifierName(child.callee) ?? "")) {
      found = true;
    }
  });

  return found;
}

function containsCleanupCall(node, cleanupNames) {
  let hasCleanup = false;

  if (!node) {
    return false;
  }

  visitChild(node, (child) => {
    if (!isReturnWithFunction(child)) {
      return;
    }

    if (containsAnyCall(child.argument.body, cleanupNames)) {
      hasCleanup = true;
    }
  });

  return hasCleanup;
}

function isReturnWithFunction(node) {
  return (
    node.type === "ReturnStatement" &&
    (node.argument?.type === "ArrowFunctionExpression" ||
      node.argument?.type === "FunctionExpression")
  );
}
