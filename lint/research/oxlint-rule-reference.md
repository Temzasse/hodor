# High-Quality Oxlint Rule Picks

These are the non-default Oxlint rules I would seriously consider for Hodor when the goal is to keep AI-written code correct, readable, consistent, and hard to accidentally degrade.

This list intentionally excludes rules that Oxlint already enables by default. It also excludes framework-specific families that are not obviously relevant here, such as Next.js, Vue, Jest, and JSDoc. Vitest is included because this repo uses Vitest.

## Rollout Order

1. Start with `core`, `import`, `oxc`, `promise`, and `unicorn`.
2. Add `react` and `jsx_a11y` for React projects.
3. Add `typescript` once type-aware linting is configured and the codebase is ready for strict type-safety checks.
4. Add `vitest` for test files.

## Already Enabled Here

These are already present in `lint/built-in-taste-rules.js` or the Hodor plugin config and are still part of the desired taste:

- `func-style`
- `import/no-default-export`
- `no-await-in-loop`
- `no-else-return`
- `no-empty`
- `no-useless-catch`
- `oxc/no-accumulating-spread`
- `oxc/no-barrel-file`
- `preserve-caught-error`
- `react/jsx-handler-names`
- `react/jsx-pascal-case`
- `react/jsx-props-no-spreading`
- `typescript/consistent-type-assertions`
- `typescript/consistent-type-definitions`
- `unicorn/no-array-reduce`
- `hodor/no-default-react-memoization`
- `hodor/no-forward-ref`
- `hodor/no-function-deps-in-effect`
- `hodor/no-json-parse-type-assertion`
- `hodor/no-positional-func-args`
- `hodor/no-react-fc`

## Core JavaScript

These are broadly useful guardrails. Most catch real bugs, confusing constructs, or code that tends to age badly.

- `accessor-pairs`
- `array-callback-return`
- `eqeqeq`
- `no-alert`
- `no-array-constructor`
- `no-case-declarations`
- `no-constructor-return`
- `no-empty-function`
- `no-eq-null`
- `no-extra-bind`
- `no-fallthrough`
- `no-loop-func`
- `no-new`
- `no-new-wrappers`
- `no-object-constructor`
- `no-param-reassign`
- `no-promise-executor-return`
- `no-prototype-builtins`
- `no-regex-spaces`
- `no-self-compare`
- `no-sequences`
- `no-shadow`
- `no-throw-literal`
- `no-unmodified-loop-condition`
- `no-unneeded-ternary`
- `no-use-before-define`
- `no-useless-concat`
- `no-useless-constructor`
- `no-useless-return`
- `no-var`
- `prefer-const`
- `prefer-object-has-own`
- `prefer-object-spread`
- `prefer-promise-reject-errors`
- `prefer-regex-literals`
- `prefer-rest-params`
- `prefer-spread`
- `prefer-template`
- `radix`
- `require-await`

## Imports And Architecture

These help prevent dependency tangles and keep module boundaries legible. `import/no-default-export` is already enabled here and should stay enabled.

- `import/consistent-type-specifier-style`
- `import/no-cycle`
- `import/no-duplicates`
- `import/no-empty-named-blocks`
- `import/no-mutable-exports`
- `import/no-named-as-default`
- `import/no-named-as-default-member`
- `import/no-self-import`

## Oxc Rules

These are high-signal correctness, maintainability, or performance checks from Oxlint's own plugin. Several stronger Oxc checks are default-on already, so they are not repeated here.

- `oxc/approx-constant`
- `oxc/branches-sharing-code`
- `oxc/misrefactored-assign-op`
- `oxc/no-const-enum`
- `oxc/no-map-spread`
- `oxc/no-this-in-exported-function`

Already enabled from this family:

- `oxc/no-accumulating-spread`
- `oxc/no-barrel-file`

## Promises

These rules push async code away from implicit chains and toward clearer `async`/`await` flow.

- `promise/always-return`
- `promise/no-multiple-resolved`
- `promise/no-nesting`
- `promise/no-return-wrap`
- `promise/param-names`
- `promise/prefer-await-to-callbacks`
- `promise/prefer-await-to-then`

## TypeScript

This is the highest-value set for AI-generated code, but also the strictest. Many of these need type-aware linting. I would treat this as the main long-term target.

- `typescript/consistent-type-exports`
- `typescript/consistent-type-imports`
- `typescript/no-deprecated`
- `typescript/no-empty-object-type`
- `typescript/no-explicit-any`
- `typescript/no-misused-promises`
- `typescript/no-non-null-asserted-nullish-coalescing`
- `typescript/no-unnecessary-condition`
- `typescript/no-unnecessary-type-arguments`
- `typescript/no-unnecessary-type-assertion`
- `typescript/no-unnecessary-type-conversion`
- `typescript/no-unnecessary-type-parameters`
- `typescript/no-unsafe-argument`
- `typescript/no-unsafe-assignment`
- `typescript/no-unsafe-call`
- `typescript/no-unsafe-enum-comparison`
- `typescript/no-unsafe-member-access`
- `typescript/no-unsafe-return`
- `typescript/no-unsafe-type-assertion`
- `typescript/only-throw-error`
- `typescript/prefer-find`
- `typescript/prefer-for-of`
- `typescript/prefer-function-type`
- `typescript/prefer-nullish-coalescing`
- `typescript/prefer-optional-chain`
- `typescript/prefer-readonly`
- `typescript/prefer-reduce-type-parameter`
- `typescript/prefer-regexp-exec`
- `typescript/promise-function-async`
- `typescript/restrict-plus-operands`
- `typescript/return-await`
- `typescript/strict-boolean-expressions`
- `typescript/switch-exhaustiveness-check`

Already enabled from this family:

- `typescript/consistent-type-assertions`
- `typescript/consistent-type-definitions`

Not repeated because Oxlint already enables them by default, but they are important:

- `typescript/no-floating-promises`
- `typescript/await-thenable`
- `typescript/no-base-to-string`
- `typescript/restrict-template-expressions`
- `typescript/unbound-method`

## React

This set catches hook mistakes, JSX correctness issues, unsafe escape hatches, and readability problems that AI agents commonly introduce.

- `react/button-has-type`
- `react/checked-requires-onchange-or-readonly`
- `react/exhaustive-deps`
- `react/iframe-missing-sandbox`
- `react/jsx-boolean-value`
- `react/jsx-curly-brace-presence`
- `react/jsx-key`
- `react/jsx-no-constructed-context-values`
- `react/jsx-no-duplicate-props`
- `react/jsx-no-target-blank`
- `react/jsx-no-useless-fragment`
- `react/jsx-props-no-spread-multi`
- `react/no-array-index-key`
- `react/no-children-prop`
- `react/no-danger`
- `react/no-danger-with-children`
- `react/no-object-type-as-default-prop`
- `react/no-unknown-property`
- `react/no-unstable-nested-components`
- `react/only-export-components`
- `react/rules-of-hooks`
- `react/self-closing-comp`

Already enabled from this family:

- `react/jsx-handler-names`
- `react/jsx-pascal-case`
- `react/jsx-props-no-spreading`

## JSX Accessibility

I would enable nearly the whole JSX a11y correctness set. Accessibility rules double as semantic HTML rules, so they also improve maintainability and UI quality.

- `jsx_a11y/alt-text`
- `jsx_a11y/anchor-has-content`
- `jsx_a11y/anchor-is-valid`
- `jsx_a11y/aria-activedescendant-has-tabindex`
- `jsx_a11y/aria-props`
- `jsx_a11y/aria-proptypes`
- `jsx_a11y/aria-role`
- `jsx_a11y/aria-unsupported-elements`
- `jsx_a11y/autocomplete-valid`
- `jsx_a11y/click-events-have-key-events`
- `jsx_a11y/control-has-associated-label`
- `jsx_a11y/heading-has-content`
- `jsx_a11y/html-has-lang`
- `jsx_a11y/iframe-has-title`
- `jsx_a11y/img-redundant-alt`
- `jsx_a11y/interactive-supports-focus`
- `jsx_a11y/label-has-associated-control`
- `jsx_a11y/lang`
- `jsx_a11y/media-has-caption`
- `jsx_a11y/mouse-events-have-key-events`
- `jsx_a11y/no-access-key`
- `jsx_a11y/no-aria-hidden-on-focusable`
- `jsx_a11y/no-autofocus`
- `jsx_a11y/no-distracting-elements`
- `jsx_a11y/no-interactive-element-to-noninteractive-role`
- `jsx_a11y/no-noninteractive-element-interactions`
- `jsx_a11y/no-noninteractive-element-to-interactive-role`
- `jsx_a11y/no-noninteractive-tabindex`
- `jsx_a11y/no-redundant-roles`
- `jsx_a11y/no-static-element-interactions`
- `jsx_a11y/prefer-tag-over-role`
- `jsx_a11y/role-has-required-aria-props`
- `jsx_a11y/role-supports-aria-props`
- `jsx_a11y/scope`
- `jsx_a11y/tabindex-no-positive`

## Vitest

These prevent false-positive tests, accidental focused/skipped tests, and vague assertions.

- `vitest/expect-expect`
- `vitest/no-commented-out-tests`
- `vitest/no-conditional-expect`
- `vitest/no-conditional-tests`
- `vitest/no-disabled-tests`
- `vitest/no-focused-tests`
- `vitest/no-identical-title`
- `vitest/no-standalone-expect`
- `vitest/prefer-comparison-matcher`
- `vitest/prefer-equality-matcher`
- `vitest/prefer-expect-resolves`
- `vitest/prefer-expect-type-of`
- `vitest/prefer-strict-equal`
- `vitest/prefer-to-be`
- `vitest/prefer-to-contain`
- `vitest/prefer-to-have-been-called-times`
- `vitest/prefer-to-have-length`
- `vitest/require-to-throw-message`
- `vitest/valid-describe-callback`
- `vitest/valid-expect`
- `vitest/valid-expect-in-promise`
- `vitest/valid-title`

## Unicorn

This is the strict readability and modern-JS set. It is especially good at catching verbose, mutation-heavy, or subtly misleading code that agents often produce.

- `unicorn/consistent-function-scoping`
- `unicorn/error-message`
- `unicorn/explicit-length-check`
- `unicorn/new-for-builtins`
- `unicorn/no-array-callback-reference`
- `unicorn/no-array-for-each`
- `unicorn/no-array-reverse`
- `unicorn/no-array-sort`
- `unicorn/no-instanceof-array`
- `unicorn/no-lonely-if`
- `unicorn/no-negated-condition`
- `unicorn/no-new-buffer`
- `unicorn/no-unreadable-array-destructuring`
- `unicorn/no-useless-promise-resolve-reject`
- `unicorn/no-useless-undefined`
- `unicorn/prefer-add-event-listener`
- `unicorn/prefer-array-find`
- `unicorn/prefer-array-flat`
- `unicorn/prefer-array-flat-map`
- `unicorn/prefer-array-index-of`
- `unicorn/prefer-array-some`
- `unicorn/prefer-at`
- `unicorn/prefer-date-now`
- `unicorn/prefer-includes`
- `unicorn/prefer-math-min-max`
- `unicorn/prefer-math-trunc`
- `unicorn/prefer-modern-dom-apis`
- `unicorn/prefer-native-coercion-functions`
- `unicorn/prefer-negative-index`
- `unicorn/prefer-number-properties`
- `unicorn/prefer-object-from-entries`
- `unicorn/prefer-optional-catch-binding`
- `unicorn/prefer-prototype-methods`
- `unicorn/prefer-query-selector`
- `unicorn/prefer-regexp-test`
- `unicorn/prefer-set-has`
- `unicorn/prefer-string-replace-all`
- `unicorn/prefer-string-slice`
- `unicorn/prefer-structured-clone`
- `unicorn/throw-new-error`

Already enabled from this family:

- `unicorn/no-array-reduce`

Not repeated because Oxlint already enables them by default, but they are important:

- `unicorn/no-unnecessary-await`
- `unicorn/no-useless-length-check`
- `unicorn/no-useless-spread`
- `unicorn/prefer-set-size`
- `unicorn/prefer-string-starts-ends-with`

## Rules I Would Not Enable By Default

These can be valuable, but I would avoid making them baseline until there is a specific local convention:

- `max-lines`, `max-lines-per-function`, `complexity`: useful as review prompts, noisy as hard errors.
- `no-console`: good for app production code, annoying for CLIs, scripts, tests, and debug-heavy development.
- `no-magic-numbers`: too noisy unless configured with project-specific ignores.
- `sort-imports`, `sort-keys`, `sort-vars`: better handled by a formatter/import organizer if desired.
- `unicorn/no-null`: too taste-heavy; TypeScript code often needs to interoperate with APIs that use `null`.
- `react/prefer-function-component`: conflicts with the stronger local `hodor/no-react-fc` taste if interpreted too broadly.
- `import/no-relative-parent-imports`: good for some monorepos, too restrictive for small packages.
- `import/no-unassigned-import`: conflicts with legitimate side-effect imports such as styles or polyfills.
