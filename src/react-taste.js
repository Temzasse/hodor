// @ts-check
import {
  createPlugin,
  createRule,
  getCalleeName,
  getIdentifierName,
  getRuleOptions,
  getSourceCode,
} from "./utils.js";

/**
 * @param {import("@oxlint/plugins").ESTree.Node | undefined} typeName
 */
function isReactFcTypeName(typeName) {
  const name = getIdentifierName(typeName);
  return name
    ? ["FC", "FunctionComponent", "React.FC", "React.FunctionComponent"].includes(name)
    : false;
}

/**
 * @param {import("@oxlint/plugins").ESTree.CallExpression} node
 * @param {string[]} names
 */
function isHookCall(node, names) {
  const calleeName = getCalleeName(node);
  return calleeName ? names.includes(calleeName) : false;
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node | null} init
 */
function isUseCallbackCall(init) {
  const calleeName = init?.type === "CallExpression" ? getCalleeName(init) : undefined;
  return calleeName ? ["useCallback", "React.useCallback"].includes(calleeName) : false;
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node | null} init
 */
function isUseEffectEventCall(init) {
  const calleeName = init?.type === "CallExpression" ? getCalleeName(init) : undefined;
  return calleeName ? ["useEffectEvent", "React.useEffectEvent"].includes(calleeName) : false;
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node | null} init
 */
function isUseStateCall(init) {
  const calleeName = init?.type === "CallExpression" ? getCalleeName(init) : undefined;
  return calleeName ? ["useState", "React.useState"].includes(calleeName) : false;
}

/**
 * @param {import("@oxlint/plugins").Scope} scope
 * @param {string} name
 */
function findVariableInScope(scope, name) {
  /** @type {import("@oxlint/plugins").Scope | null} */
  let currentScope = scope;

  while (currentScope) {
    const variable = currentScope.set.get(name);

    if (variable) {
      return variable;
    }

    currentScope = currentScope.upper;
  }

  return undefined;
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node & { type: "Identifier"; name: string }} node
 * @param {import("@oxlint/plugins").Context} context
 */
function isFunctionLikeIdentifier(node, context) {
  const scope = context.sourceCode.getScope(node);

  if (!scope) {
    return false;
  }

  const variable = findVariableInScope(scope, node.name);

  if (!variable) {
    return false;
  }

  return variable.defs.some((definition) => {
    const definitionNode = definition.node;

    if (definition.type === "FunctionName" && definitionNode.type === "FunctionDeclaration") {
      return true;
    }

    if (definition.type !== "Variable" || definitionNode.type !== "VariableDeclarator") {
      return false;
    }

    const init = definitionNode.init;

    if (init && (init.type === "ArrowFunctionExpression" || init.type === "FunctionExpression")) {
      return true;
    }

    if (isUseCallbackCall(init) || isUseEffectEventCall(init)) {
      return true;
    }

    if (definitionNode.id.type !== "ArrayPattern" || !isUseStateCall(init)) {
      return false;
    }

    const setter = definitionNode.id.elements[1];
    return setter?.type === "Identifier" && setter.name === node.name;
  });
}

/**
 * @param {import("@oxlint/plugins").ESTree.Node | null} node
 * @param {import("@oxlint/plugins").Context} context
 */
function isFunctionLikeDependency(node, context) {
  if (!node) {
    return false;
  }

  if (node.type === "ArrowFunctionExpression" || node.type === "FunctionExpression") {
    return true;
  }

  if (isUseEffectEventCall(node)) {
    return true;
  }

  if (node.type === "Identifier") {
    return isFunctionLikeIdentifier(node, context);
  }

  return false;
}

/**
 * @param {import("@oxlint/plugins").Fixer} fixer
 * @param {import("@oxlint/plugins").SourceCode} sourceCode
 * @param {import("@oxlint/plugins").ESTree.ArrayExpression} arrayNode
 * @param {import("@oxlint/plugins").ESTree.Node} element
 */
function buildRemoveDependencyFix(fixer, sourceCode, arrayNode, element) {
  const elements = arrayNode.elements.filter(Boolean);

  if (elements.length === 1) {
    return fixer.replaceText(arrayNode, "[]");
  }

  const tokenBefore = sourceCode.getTokenBefore(element);
  const tokenAfter = sourceCode.getTokenAfter(element);

  if (tokenAfter && tokenAfter.value === ",") {
    return fixer.removeRange([element.range[0], tokenAfter.range[1]]);
  }

  if (tokenBefore && tokenBefore.value === ",") {
    return fixer.removeRange([tokenBefore.range[0], element.range[1]]);
  }

  return fixer.remove(element);
}

/**
 * @param {import("@oxlint/plugins").Fixer} fixer
 * @param {import("@oxlint/plugins").SourceCode} sourceCode
 */
function buildEnsureUseEffectEventImportFixes(fixer, sourceCode) {
  const program = sourceCode.ast;
  const reactImport = program.body.find(
    (node) =>
      node.type === "ImportDeclaration" &&
      node.source.type === "Literal" &&
      node.source.value === "react",
  );

  if (!reactImport) {
    return [fixer.insertTextBefore(program.body[0], 'import { useEffectEvent } from "react";\n')];
  }

  if (reactImport.type !== "ImportDeclaration") {
    return [];
  }

  const namedSpecifiers = reactImport.specifiers.filter(
    (specifier) => specifier.type === "ImportSpecifier",
  );
  const hasUseEffectEvent = namedSpecifiers.some(
    (specifier) =>
      specifier.imported.type === "Identifier" && specifier.imported.name === "useEffectEvent",
  );

  if (hasUseEffectEvent) {
    return [];
  }

  if (namedSpecifiers.length > 0) {
    const lastNamedSpecifier = namedSpecifiers[namedSpecifiers.length - 1];
    return [fixer.insertTextAfter(lastNamedSpecifier, ", useEffectEvent")];
  }

  const defaultSpecifier = reactImport.specifiers.find(
    (specifier) => specifier.type === "ImportDefaultSpecifier",
  );

  if (defaultSpecifier) {
    return [fixer.insertTextAfter(defaultSpecifier, ", { useEffectEvent }")];
  }

  return [fixer.insertTextAfter(reactImport, '\nimport { useEffectEvent } from "react";')];
}

/**
 * @param {import("@oxlint/plugins").Fixer} fixer
 * @param {import("@oxlint/plugins").SourceCode} sourceCode
 * @param {import("@oxlint/plugins").Context} context
 * @param {import("@oxlint/plugins").ESTree.Node} element
 */
function buildWrapFunctionFixes(fixer, sourceCode, context, element) {
  if (element.type !== "Identifier") {
    return [];
  }

  const scope = context.sourceCode.getScope(element);

  if (!scope) {
    return [];
  }

  const variable = findVariableInScope(scope, element.name);

  if (!variable) {
    return [];
  }

  for (const definition of variable.defs) {
    const definitionNode = definition.node;

    if (definition.type === "FunctionName" && definitionNode.type === "FunctionDeclaration") {
      const functionText = sourceCode.getText(definitionNode);
      return [
        fixer.replaceText(
          definitionNode,
          `const ${element.name} = useEffectEvent(${functionText});`,
        ),
        ...buildEnsureUseEffectEventImportFixes(fixer, sourceCode),
      ];
    }

    if (definition.type !== "Variable" || definitionNode.type !== "VariableDeclarator") {
      continue;
    }

    if (definitionNode.id.type === "ArrayPattern" && isUseStateCall(definitionNode.init)) {
      continue;
    }

    const init = definitionNode.init;

    if (!init || isUseEffectEventCall(init)) {
      continue;
    }

    if (init.type === "ArrowFunctionExpression" || init.type === "FunctionExpression") {
      return [
        fixer.replaceText(init, `useEffectEvent(${sourceCode.getText(init)})`),
        ...buildEnsureUseEffectEventImportFixes(fixer, sourceCode),
      ];
    }

    if (isUseCallbackCall(init)) {
      if (init?.type !== "CallExpression") {
        continue;
      }

      const [callbackArgument] = init.arguments;

      if (!callbackArgument) {
        continue;
      }

      return [
        fixer.replaceText(init, `useEffectEvent(${sourceCode.getText(callbackArgument)})`),
        ...buildEnsureUseEffectEventImportFixes(fixer, sourceCode),
      ];
    }
  }

  return [];
}

const noReactFc = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer plain function components with typed props instead of React.FC.",
    },
    schema: [],
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

const noForwardRef = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Avoid React forwardRef unless an explicit project exception allows it.",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowInFiles: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      forwardRef:
        "Avoid forwardRef. Prefer accepting ref as a regular prop when the React version supports it.",
    },
  },
  create(context) {
    const options = getRuleOptions(context);
    const filename = context.filename ?? context.getFilename?.() ?? "";
    const allowInFiles = Array.isArray(options.allowInFiles) ? options.allowInFiles : [];

    if (
      allowInFiles.some(
        (pattern) => typeof pattern === "string" && new RegExp(pattern).test(filename),
      )
    ) {
      return {};
    }

    return {
      CallExpression(node) {
        const calleeName = getCalleeName(node);

        if (calleeName && ["forwardRef", "React.forwardRef"].includes(calleeName)) {
          context.report({ node, messageId: "forwardRef" });
        }
      },
    };
  },
});

const noDefaultReactMemoization = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Avoid React memoization APIs by default unless a measured need justifies them.",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowedCallees: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      memoization:
        "Avoid {{name}} by default. Keep the code direct unless memoization is measured or required.",
    },
  },
  create(context) {
    const options = getRuleOptions(context);
    const defaultCallees = [
      "useMemo",
      "React.useMemo",
      "useCallback",
      "React.useCallback",
      "memo",
      "React.memo",
    ];
    const allowedCallees = new Set(
      Array.isArray(options.allowedCallees) ? options.allowedCallees : [],
    );

    return {
      CallExpression(node) {
        const calleeName = getCalleeName(node);

        if (calleeName && defaultCallees.includes(calleeName) && !allowedCallees.has(calleeName)) {
          context.report({
            node,
            messageId: "memoization",
            data: { name: calleeName },
          });
        }
      },
    };
  },
});

const noFunctionDepsInEffect = createRule({
  meta: {
    type: "problem",
    docs: {
      description: "Avoid function references in useEffect dependency arrays.",
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          effectHooks: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      functionDependency:
        "Function '{{name}}' in effect deps. Remove it and wrap logic with useEffectEvent or move the logic.",
    },
  },
  create(context) {
    const sourceCode = getSourceCode(context);
    const options = getRuleOptions(context);
    const effectHooks = Array.isArray(options.effectHooks)
      ? options.effectHooks
      : ["useEffect", "React.useEffect"];

    return {
      CallExpression(node) {
        if (!isHookCall(node, effectHooks)) {
          return;
        }

        const dependencies = node.arguments?.[1];

        if (dependencies?.type !== "ArrayExpression") {
          return;
        }

        for (const dependency of dependencies.elements ?? []) {
          if (!dependency) {
            continue;
          }

          if (isFunctionLikeDependency(dependency, context)) {
            context.report({
              node: dependency,
              messageId: "functionDependency",
              data: { name: dependency.type === "Identifier" ? dependency.name : "function" },
              fix(fixer) {
                const fixes = [
                  buildRemoveDependencyFix(fixer, sourceCode, dependencies, dependency),
                ];
                const wrapFixes = buildWrapFunctionFixes(fixer, sourceCode, context, dependency);

                if (wrapFixes.length > 0) {
                  fixes.push(...wrapFixes);
                }

                return fixes;
              },
            });
          }
        }
      },
    };
  },
});

export const rules = {
  "no-react-fc": noReactFc,
  "no-forward-ref": noForwardRef,
  "no-default-react-memoization": noDefaultReactMemoization,
  "no-function-deps-in-effect": noFunctionDepsInEffect,
};

const reactTaste = createPlugin({
  name: "react-taste",
  rules,
});

export default reactTaste;
