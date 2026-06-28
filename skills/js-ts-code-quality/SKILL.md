---
name: js-ts-code-quality
description: Use when writing, editing, reviewing, or refactoring JavaScript, TypeScript, React, JSX, or Vitest code that should be clear, domain-specific, type-safe, robust, accessible, testable, and easy to maintain before linting runs.
---

# JS/TS Code Quality

Use this skill as a pre-lint quality checklist. Prefer direct, domain-specific code that should need minimal cleanup after linting.

## Default Stance

- Prefer boring, explicit code over clever abstractions.
- Prefer domain names over generic names like `data`, `item`, `process`, `handle`, `manager`, or `service`.
- Prefer stepwise clarity over dense expression chains when intermediate names make intent easier to scan.
- Add abstractions only when they remove real duplication, protect invariants, hide unavoidable complexity, or create a reusable domain concept.
- Prefer modules and functions over classes. Use classes only when state, lifecycle, or invariants justify them.
- Allow scoped local mutation when it is clearer or more efficient. Avoid shared mutable state.
- Let formatters handle formatting; do not hand-tune whitespace or sorting as a substitute for clarity.

## Functions And APIs

- Prefer `function` declarations for named functions and exports.
- Use arrow functions for inline callbacks, closures that intentionally capture local state, or lexical `this`.
- Prefer named object parameters for several arguments, optional arguments, same-typed pairs, or boolean-like options.
- Avoid boolean flag arguments; use named options or discriminated values.
- Prefer inline object types for local function parameters. Define named types when reused, exported, recursive, public, or domain-significant.
- Avoid reassigning parameters.
- Keep helpers close to the code they support unless genuinely reusable.
- Avoid tiny one-off helpers when their body is clearer inline at the call site.

Bad:
```ts
type CreateInvoiceInput = {
  customerId: CustomerId;
  items: InvoiceItem[];
  sendReceipt: boolean;
};

const createInvoice = async (input: CreateInvoiceInput) => {
  // ...
};
```

Good:
```ts
async function createInvoice({
  customerId,
  items,
  sendReceipt,
}: {
  customerId: CustomerId;
  items: InvoiceItem[];
  sendReceipt: boolean;
}) {
  // ...
}
```

## TypeScript

- Prefer `type` aliases for object shapes; use `interface` only for declaration merging or library contracts.
- Make invalid states unrepresentable with discriminated unions and precise domain types.
- Avoid optional fields whose validity depends on another field such as `status`.
- Avoid `any`; prefer `unknown` at boundaries and narrow it.
- Avoid `{} as Type`, half-built objects, unsafe assertions, unsafe assignment, unsafe calls, unsafe member access, and unsafe returns.
- Avoid non-null assertions. Narrow values with control flow instead.
- Use `as const`, literal types, and domain-specific types when they make intent precise.
- Prefer `??` and `?.` for nullish values.
- Avoid unnecessary assertions, type arguments, type conversions, constraints, and type parameters.
- Keep template expressions and `+` operands type-safe and intentional.
- Avoid advanced generic/type-level machinery unless it clearly removes real duplication across important APIs.

Bad:
```ts
type Job = {
  status: "queued" | "running" | "failed" | "completed";
  error?: string;
  completedAt?: Date;
};
```

Good:
```ts
type Job =
  | { status: "queued" }
  | { status: "running"; startedAt: Date }
  | { status: "failed"; error: string }
  | { status: "completed"; completedAt: Date };
```

Bad:
```ts
const invoice = {} as Invoice;
invoice.id = createId();
invoice.customerId = customerId;
```

Good:
```ts
const invoice: Invoice = {
  id: createId(),
  customerId,
  status: "draft",
};
```

## Correctness

- Use strict equality and explicit nullish checks.
- Use one absence convention consistently. Prefer `undefined` for optional values unless an external API requires `null`.
- Avoid constant conditions, self-comparisons, impossible branches, duplicate cases, and fallthrough.
- Return from array callbacks that require a return value.
- Do not throw literals; throw `Error` or domain-specific errors.
- Preserve caught errors when rethrowing or wrapping.
- Avoid empty functions, empty blocks, useless catches, useless returns, and dead branches.
- Do not mutate imports, constants, native prototypes, globals, or restricted built-ins.

## Control Flow

- Prefer guard clauses and early returns.
- Avoid `else` after `return`, `throw`, `continue`, or `break`.
- Prefer base indentation for the main path.
- Prefer `switch` when branching across several cases of the same discriminant, especially discriminated unions and enum-like string unions.
- Use `if` for guard clauses, unrelated conditions, range checks, compound predicates, or one to two branches.
- Avoid nested ternaries, negated conditionals, sequence expressions, labels, and `continue`.

Bad:
```ts
function getInvoiceStatus(invoice: Invoice) {
  let status: InvoiceStatus;

  if (invoice.deletedAt) {
    status = "deleted";
  } else if (invoice.paidAt) {
    status = "paid";
  } else {
    status = "open";
  }

  return status;
}
```

Good:
```ts
function getInvoiceStatus(invoice: Invoice): InvoiceStatus {
  if (invoice.deletedAt) {
    return "deleted";
  }

  if (invoice.paidAt) {
    return "paid";
  }

  return "open";
}
```

## Boundaries And Errors

- Validate data from JSON, requests, environment variables, storage, queues, and third-party APIs before passing it into business logic.
- Avoid `JSON.parse(raw) as SomeType`; parse and validate into trusted domain values.
- Catch only when adding useful context, translating at a boundary, logging before rethrowing, or handling expected local recovery.
- Do not swallow errors.
- Comments should explain why, constraints, gotchas, or non-obvious context. Avoid comments that restate the code.

Bad:
```ts
async function handleRequest(request: Request) {
  const body = (await request.json()) as CreateInvoiceRequest;
  return createInvoice(body);
}
```

Good:
```ts
async function handleRequest(request: Request) {
  const body = CreateInvoiceRequestSchema.parse(await request.json());

  return createInvoice({
    customerId: body.customerId,
    items: body.items,
  });
}
```

## Modules

- Prefer named exports over default exports for grepability and refactorability.
- Avoid barrel exports when they hide ownership, encourage broad imports, or create circular dependency risk.
- Avoid circular imports, self-imports, duplicate imports, mutable exports, and ambiguous default/named export patterns.
- Keep module public surfaces small.
- Do not export private helpers only for tests.
- Use type-only imports/exports when a symbol is only used as a type.

Bad:
```ts
export function normalizeInvoice(...) {}
export function calculateLineItem(...) {}
export function applyDiscount(...) {}
export function internalRound(...) {}
```

Good:
```ts
export function calculateInvoiceTotal(invoice: Invoice): Money {
  // private helpers stay private
}
```

## Async And Performance

- Prefer `async`/`await` over promise chains and callback-style promise code.
- Await promises intentionally; do not leave floating promises.
- Avoid sequential awaits unless the later operation depends on the earlier result or ordering matters.
- Use `Promise.all` or `Promise.allSettled` for independent concurrent work.
- Do not use async promise executors.
- Avoid resolving/rejecting the same promise multiple times.
- Return or await promise work consistently; do not hide async behavior.
- Use `return await` only when it improves stack traces or error handling.
- Prefer a clear loop over several chained array passes when it improves readability or avoids unnecessary work.
- Avoid dense `reduce` patterns that rebuild objects or arrays through spreads when a loop with local mutation is clearer.

Bad:
```ts
const activeUsers = users.filter((user) => user.active);
const emails = activeUsers.map((user) => user.email);
const uniqueEmails = [...new Set(emails)];
```

Good:
```ts
const uniqueEmails = new Set<EmailAddress>();

for (const user of users) {
  if (user.active) {
    uniqueEmails.add(user.email);
  }
}
```

## Data Structures And Modern JS

- Use `Set#has` for membership checks.
- Use `Array#at` for negative or end-relative indexing.
- Prefer `for...of`, `.find`, `.some`, `.includes`, and `RegExp#test` when they directly express the operation.
- Prefer `Object.fromEntries`, `structuredClone`, `String#replaceAll`, `String#slice`, and modern DOM APIs when they fit.
- Avoid mutating arrays with reverse/sort/delete unless mutation is explicitly intended.
- Avoid passing function references directly to array callbacks when extra callback arguments could change behavior.
- Prefer explicit `.length` checks over truthy/falsy collection checks.

Bad:
```ts
const selectedUsers = users.filter(Boolean).map(toUserView);
```

Good:
```ts
const selectedUsers = users
  .filter((user): user is User => user !== undefined)
  .map((user) => toUserView(user));
```

## React And JSX

- Use function declarations and named exports for components unless the framework requires otherwise.
- Avoid `React.FC`, `forwardRef`, default memoization, and casual `memo`/`useMemo`/`useCallback`.
- Follow the rules of hooks; keep hooks unconditional and at the top level.
- Treat effects as synchronization with external systems, not ordinary data flow.
- Do not add function references to effect dependency arrays; prefer `useEffectEvent` when needed.
- Use stable keys; avoid array indexes as keys.
- Avoid broad prop spreading except in low-level primitives.
- Prefer explicit JSX booleans, self-closing empty elements, PascalCase components, and clear handler names.
- Avoid `dangerouslySetInnerHTML`; if unavoidable, make sanitization explicit.
- Keep nested component definitions out of render unless there is a deliberate reason.

Bad:
```tsx
const UserRow: React.FC<{ user: User; onSelect(id: string): void }> = ({ user, onSelect }) => {
  return <button onClick={() => onSelect(user.id)}>{user.name}</button>;
};
```

Good:
```tsx
type Props = {
  user: User;
  onSelect({ id }: { id: string }): void;
};

function UserRow({ user, onSelect }: Props) {
  return <button onClick={() => onSelect({ id: user.id })}>{user.name}</button>;
}
```

## Accessibility

- Use semantic HTML before ARIA.
- Provide accessible names for controls, images, iframes, and headings.
- Keep anchors valid and non-empty.
- Match ARIA roles/properties to supported elements.
- Do not hide focusable content from assistive tech.
- Pair click handlers with keyboard access, or use native interactive elements.
- Avoid positive `tabIndex`, access keys, autofocus, and distracting elements.

Bad:
```tsx
<div role="button" onClick={submit}>
  Save
</div>
```

Good:
```tsx
<button type="button" onClick={submit}>
  Save
</button>
```

## Tests

- Prefer behavior-focused tests over mock-verification tests.
- Use mocks to isolate unavoidable external systems or failure modes, not just to assert internal calls.
- Ensure every test asserts something.
- Do not commit focused, disabled, conditional, or commented-out tests.
- Keep test titles unique and clear.
- Prefer precise matchers such as `toBe`, `toStrictEqual`, `toContain`, `toHaveLength`, and comparison matchers.
- Await async expectations and promise assertions.
- Include useful thrown-error messages in rejection/throw tests.

## Before Finishing

- Re-read changed code for avoidable lint cleanup.
- Check for unsafe casts, forgotten awaits, accidental mutation, default exports, broad prop spreads, inaccessible JSX, weak tests, and over-extracted helpers.
- If an exception is deliberate, keep it local and obvious rather than weakening the codebase pattern.
