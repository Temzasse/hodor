# eslint-plugin-codex-taste

ESLint-compatible oxlint plugin for selected rules from the copied Codex React and TypeScript taste skills.

The source skills are copied into `copied-skills/` before plugin code so the rule rationale travels with the implementation.

## Plugin

`hodor` collects all custom rules. Hodor holds the door against code slop.

Load it in oxlint:

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

The built-in preset is exported as one `rules` object:

- `rules.basic`
- `rules.react`
- `rules.typescript`
- `rules.all`

## Implemented Rules

React:

- `hodor/no-react-fc`
- `hodor/no-forward-ref`
- `hodor/no-default-react-memoization`
- `hodor/no-function-deps-in-effect`

TypeScript:

- `hodor/no-positional-func-args`
- `hodor/no-json-parse-type-assertion`

## Verification

```sh
npm run check
npm run typecheck
npm test
```

Rule tests live next to each rule under `lint/rules/<rule-name>/`. Each rule has its
own oxlint config, valid/invalid fixture files, and a Vitest file that runs the real
oxlint CLI through `lint/test-utils/run-oxlint.ts`.
