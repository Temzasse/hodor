# oxlint-config-hodor

ESLint-compatible oxlint plugin for selected rules from the copied Codex React and TypeScript taste skills.

The source skills are copied into `copied-skills/` before plugin code so the rule rationale travels with the implementation.

## Plugin

`hodor` collects all custom rules. Hodor holds the door against code slop.

Load it in oxlint:

```js
import hodor from "oxlint-config-hodor";

export default {
  jsPlugins: [hodor.jsPlugin],
  extends: [hodor.config],
  rules: {
    ...hodor.rules,
  },
};
```

`extends` applies Hodor's built-in plugin list and rules. Oxlint does not currently
merge `jsPlugins` through `extends`, so `jsPlugins` is exported separately to avoid
hardcoding the package specifier in consumer configs.
`hodor.jsPlugin` is the resolved specifier for the package's internal JS plugin.
`hodor.rules` contains the custom `hodor/*` rule key/value pairs for configs that
want to spread, inspect, or override those custom rules explicitly.

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
