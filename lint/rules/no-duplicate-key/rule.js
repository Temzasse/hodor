// @ts-nocheck
import { simpleNodeRule, getJSXName } from "../../utils.js";

export const rule = simpleNodeRule({
  description: "Disallow duplicate literal keys in JSX arrays.",
  message: "Duplicate JSX key '{{key}}'. Keys in the same array must be unique.",
  visitors: {
    ArrayExpression(node, context) {
      const seenKeys = new Set();

      for (const element of node.elements ?? []) {
        if (element?.type !== "JSXElement") {
          continue;
        }

        let key;

        for (const attr of element.openingElement.attributes ?? []) {
          if (attr.type !== "JSXAttribute" || getJSXName(attr.name) !== "key") {
            continue;
          }

          if (attr.value?.type === "Literal") {
            key = String(attr.value.value);
          }

          const expression =
            attr.value?.type === "JSXExpressionContainer" ? attr.value.expression : undefined;

          if (expression?.type === "Literal") {
            key = String(expression.value);
          }
        }

        if (!key) {
          continue;
        }

        if (seenKeys.has(key)) {
          context.report({ node: element, messageId: "default", data: { key } });
        }

        seenKeys.add(key);
      }
    },
  },
});
