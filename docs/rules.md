# React Taste And TypeScript Taste Oxlint Rules

This package contains custom rules extracted from the copied Codex skills in `copied-skills/`.

The rules are split into two independently loadable oxlint plugins:

- `react-taste`
- `typescript-taste`

Built-in oxlint taste rules are grouped in `src/built-in-taste-rules.js` so they can be applied alongside the custom plugins.

Rules intentionally omitted because oxlint already has built-ins:

- `typescript/consistent-type-definitions` for preferring `type` over `interface`.
- `typescript/consistent-type-assertions` for object literal assertions such as `{} as Foo`.
- `import/no-default-export` for preferring named exports.
- `no-else-return` for avoiding `else` after terminal branches.
- `func-style` for preferring function declarations.
- `oxc/no-barrel-file` for barrel files.
- `react/jsx-handler-names` for `onX` and `handleX` naming.
- `react/jsx-props-no-spreading` for broad JSX prop spreading.
- `react/jsx-pascal-case` for JSX component casing.
- `no-empty`, `no-useless-catch`, and `preserve-caught-error` for empty or useless catch blocks.
- `no-await-in-loop` for sequential awaits in loops.
- `oxc/no-accumulating-spread` and `unicorn/no-array-reduce` for costly or dense object-building reduce patterns.

Implemented custom React rules:

- `react-taste/no-react-fc`
- `react-taste/no-forward-ref`
- `react-taste/no-default-react-memoization`
- `react-taste/no-function-deps-in-effect`

Implemented custom TypeScript rules:

- `typescript-taste/no-boolean-flag-parameters`
- `typescript-taste/prefer-named-object-parameters`
- `typescript-taste/no-json-parse-type-assertion`

Use from `oxlint.config.mjs`:

```js
import { rules as builtInTasteRules } from "./src/built-in-taste-rules.js";

export default {
  jsPlugins: ["./src/react-taste.js", "./src/typescript-taste.js"],
  rules: {
    ...builtInTasteRules.all,
    "react-taste/no-react-fc": "error",
    "typescript-taste/no-json-parse-type-assertion": "error"
  }
};
```
