# oxlint-preset-hodor

Oxlint plugin for keeping React code clean and consistent. Hodor holds the door against code slop.

## Plugin

Load it in oxlint:

```js
import hodor from "oxlint-preset-hodor";

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

- `hodor/no-react-fc`
- `hodor/no-forward-ref`
- `hodor/no-default-react-memoization`
- `hodor/no-function-deps-in-effect`
- `hodor/no-positional-func-args`

## Verification

```sh
npm run check
npm run typecheck
npm test
```

Rule tests live next to each rule under `lint/rules/<rule-name>/`. Each rule has its
own oxlint config, valid/invalid fixture files, and a Vitest file that runs the real
oxlint CLI through `lint/test-utils/run-oxlint.ts`.
