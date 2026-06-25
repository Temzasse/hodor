# eslint-plugin-codex-taste

ESLint-compatible oxlint plugins for selected rules from the copied Codex React and TypeScript taste skills.

The source skills are copied into `copied-skills/` before plugin code so the rule rationale travels with the implementation.

## Plugins

- `react-taste`: React-specific rules.
- `typescript-taste`: TypeScript-specific rules.

Load one or both in oxlint:

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

The built-in preset is exported as one `rules` object:

- `rules.basic`
- `rules.react`
- `rules.typescript`
- `rules.all`

## Implemented Rules

React:

- `react-taste/no-react-fc`
- `react-taste/no-forward-ref`
- `react-taste/no-default-react-memoization`
- `react-taste/no-function-deps-in-effect`

TypeScript:

- `typescript-taste/no-boolean-flag-parameters`
- `typescript-taste/prefer-named-object-parameters`
- `typescript-taste/no-json-parse-type-assertion`

## Verification

```sh
npm run check
oxlint --config oxlint.config.mjs tests/fixtures
```
