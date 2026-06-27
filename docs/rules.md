# Hodor Oxlint Rules

This package contains custom rules extracted from the copied Codex skills in `copied-skills/`.

The rules are collected into one oxlint plugin named `hodor`.

Built-in oxlint taste rules are grouped in `lint/built-in-taste-rules.js` so they can be applied alongside the custom plugin.

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

- `hodor/no-react-fc`
- `hodor/no-forward-ref`
- `hodor/no-default-react-memoization`
- `hodor/no-function-deps-in-effect`

Implemented custom TypeScript rules:

- `hodor/no-positional-func-args`
- `hodor/no-json-parse-type-assertion`

Use from `oxlint.config.mjs`:

```js
import { rules as builtInTasteRules } from "./lint/built-in-taste-rules.js";

export default {
  jsPlugins: ["./lint/hodor.js"],
  rules: {
    ...builtInTasteRules.all,
    "hodor/no-react-fc": "error",
    "hodor/no-json-parse-type-assertion": "error"
  }
};
```
