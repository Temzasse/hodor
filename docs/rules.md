# Hodor Oxlint Rules

This package contains custom rules extracted from the copied Codex skills in `copied-skills/`.

The custom rules are collected into one oxlint plugin named `hodor`.

Selected Oxlint rules are grouped in `lint/built-in-taste-rules.js` so they can be applied alongside the custom plugin.

`rules.all` is the strict default preset. It includes:

- Oxlint rules that are currently default-on, pinned explicitly in case upstream defaults change.
- Selected non-default Oxlint rules for correctness, readability, robustness, performance, React, accessibility, TypeScript, Vitest, and modern JavaScript style.
- Custom `hodor/*` rules.

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
import hodor from "oxlint-config-hodor";

export default {
  jsPlugins: [hodor.jsPlugin],
  extends: [hodor.config],
  rules: {
    ...hodor.rules,
  },
};
```

`extends` applies the built-in plugin list and rules. `hodor.jsPlugin` is set
separately because Oxlint does not currently merge JS plugins through `extends`.
`hodor.jsPlugin` is the resolved specifier for the package's internal JS plugin.
`hodor.rules` contains the custom `hodor/*` rule key/value pairs for consumers that
want to spread or override those rules explicitly.
