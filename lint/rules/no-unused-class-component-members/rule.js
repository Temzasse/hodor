// @ts-nocheck
import {
  simpleNodeRule,
  visitChildren,
  isReactComponentSuper,
  getIdentifierName,
} from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Disallow unused class component members.",
  message: "Class component member '{{name}}' is never used.",
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

      const memberNames = new Map();
      const usedNames = new Set();
      const lifecycleNames = new Set([
        "constructor",
        "render",
        "componentDidMount",
        "componentDidUpdate",
        "componentWillUnmount",
        "componentDidCatch",
        "getSnapshotBeforeUpdate",
        "shouldComponentUpdate",
        "componentWillMount",
        "componentWillReceiveProps",
        "componentWillUpdate",
      ]);

      for (const member of node.body ?? []) {
        if (!("key" in member)) {
          continue;
        }

        let name;

        if (member.key.type === "Identifier" || member.key.type === "PrivateIdentifier") {
          name = member.key.name;
        }

        if (member.key.type === "Literal") {
          name = String(member.key.value);
        }

        if (!name || lifecycleNames.has(name)) {
          continue;
        }

        memberNames.set(name, member);
      }

      visitChildren(node, (child) => {
        if (child.type === "MemberExpression" && !child.computed) {
          const name = getIdentifierName(child.property);

          if (child.object.type === "ThisExpression" && name) {
            usedNames.add(name);
          }
        }
      });

      for (const [name, member] of memberNames) {
        if (!usedNames.has(name)) {
          context.report({ node: member, messageId: "default", data: { name } });
        }
      }
    },
  },
});
