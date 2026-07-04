// @ts-nocheck
import {
  simpleNodeRule,
  visitChildren,
  isReactComponentSuper,
  getIdentifierName,
} from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Disallow class component state fields that are never read.",
  message: "State field '{{name}}' is never read.",
  visitors: {
    ClassBody(node, context) {
      const owner = node.parent;

      if (
        !owner ||
        (owner.type !== "ClassDeclaration" && owner.type !== "ClassExpression") ||
        !isReactComponentSuper(owner.superClass)
      ) {
        return;
      }

      const stateKeys = new Map();
      const usedKeys = new Set();

      for (const member of node.body ?? []) {
        if (!("key" in member) || getPropertyName(member.key) !== "state" || !("value" in member)) {
          continue;
        }

        const value = member.value;

        if (value?.type !== "ObjectExpression") {
          continue;
        }

        for (const property of value.properties ?? []) {
          if (property.type !== "Property") {
            continue;
          }

          const key = getPropertyName(property.key);

          if (key) {
            stateKeys.set(key, property.key);
          }
        }
      }

      visitChildren(node, (child) => {
        if (
          child.type === "MemberExpression" &&
          !child.computed &&
          child.object.type === "MemberExpression" &&
          getIdentifierName(child.object) === "this.state"
        ) {
          const keyName = getIdentifierName(child.property);

          if (keyName) {
            usedKeys.add(keyName);
          }
        }
      });

      for (const [key, keyNode] of stateKeys) {
        if (!usedKeys.has(key)) {
          context.report({ node: keyNode, messageId: "default", data: { name: key } });
        }
      }
    },
  },
});

function getPropertyName(key) {
  if (key.type === "Identifier" || key.type === "PrivateIdentifier") {
    return key.name;
  }

  if (key.type === "Literal") {
    return String(key.value);
  }
}
