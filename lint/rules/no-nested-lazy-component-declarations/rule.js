// @ts-nocheck
import { simpleNodeRule, getCalleeName } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Declare lazy components at module scope.",
  message: "Declare React.lazy components at module scope instead of inside another function.",
  visitors: {
    CallExpression(node, context) {
      if (!["lazy", "React.lazy"].includes(getCalleeName(node) ?? "")) {
        return;
      }

      let depth = 0;
      let scope = context.sourceCode.getScope(node);

      while (scope) {
        if (scope.type === "function") {
          depth += 1;
        }

        scope = scope.upper;
      }

      if (depth > 0) {
        context.report({ node, messageId: "default" });
      }
    },
  },
});
