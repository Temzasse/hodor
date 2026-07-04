// @ts-nocheck
import { simpleNodeRule, visitChildren, isPascalCase } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Disallow props that are declared but never read.",
  message: "Prop '{{name}}' is declared but never read.",
  visitors: {
    FunctionDeclaration: reportUnusedProps,
    FunctionExpression: reportUnusedProps,
    ArrowFunctionExpression: reportUnusedProps,
  },
});

function reportUnusedProps(node, context) {
  const isNamedComponent =
    (node.type === "FunctionDeclaration" || node.type === "FunctionExpression") &&
    node.id?.name &&
    isPascalCase(node.id.name);
  const isVariableComponent =
    node.parent?.type === "VariableDeclarator" &&
    node.parent.id.type === "Identifier" &&
    isPascalCase(node.parent.id.name);

  if (!isNamedComponent && !isVariableComponent) {
    return;
  }

  const parameter = node.params?.[0];

  if (parameter?.type !== "ObjectPattern") {
    return;
  }

  const propNames = new Map();

  for (const property of parameter.properties ?? []) {
    if (property.type !== "Property") {
      continue;
    }

    let propName;

    if (property.key.type === "Identifier" || property.key.type === "PrivateIdentifier") {
      propName = property.key.name;
    }

    if (property.key.type === "Literal") {
      propName = String(property.key.value);
    }

    const localName = property.value.type === "Identifier" ? property.value.name : undefined;

    if (propName && localName) {
      propNames.set(propName, { localName, node: property });
    }
  }

  const usedLocals = new Set();

  visitChildren(node.body, (child) => {
    if (child.type === "Identifier") {
      usedLocals.add(child.name);
    }
  });

  for (const [propName, prop] of propNames) {
    if (!usedLocals.has(prop.localName)) {
      context.report({ node: prop.node, messageId: "default", data: { name: propName } });
    }
  }
}
