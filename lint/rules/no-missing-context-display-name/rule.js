// @ts-nocheck
import { simpleNodeRule, visitChildren, getIdentifierName, getCalleeName } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Require displayName on React contexts.",
  message: "Set displayName on React contexts so DevTools output is readable.",
  visitors: {
    Program(node, context) {
      const contexts = new Map();
      const displayNames = new Set();

      visitChildren(node, (child) => {
        if (
          child.type === "VariableDeclarator" &&
          child.id.type === "Identifier" &&
          child.init?.type === "CallExpression" &&
          ["createContext", "React.createContext"].includes(getCalleeName(child.init) ?? "")
        ) {
          contexts.set(child.id.name, child.id);
        }

        if (child.type !== "AssignmentExpression") {
          return;
        }

        if (
          child.left.type === "MemberExpression" &&
          !child.left.computed &&
          getIdentifierName(child.left.property) === "displayName"
        ) {
          const objectName = getIdentifierName(child.left.object);

          if (objectName) {
            displayNames.add(objectName);
          }
        }
      });

      for (const [name, id] of contexts) {
        if (!displayNames.has(name)) {
          context.report({ node: id, messageId: "default" });
        }
      }
    },
  },
});
