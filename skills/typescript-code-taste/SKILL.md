---
name: typescript-code-taste
description: Use when writing, reviewing, or refactoring TypeScript code to match a taste for clean, domain-specific, strongly typed, low-indirection code with pragmatic performance and maintainability defaults.
---

# TypeScript Code Taste

Use this skill when writing, reviewing, or refactoring TypeScript. Optimize for code that is clean, readable, domain-specific, strongly typed, and not needlessly abstract.

## Core Preferences

- Prefer boring, direct code over clever or generic abstractions.
- Prefer domain-specific names over generic technical names like `data`, `item`, `process`, `handle`, `manager`, or `service`.
- Prefer stepwise clarity over dense expression chains when intermediate names make intent easier to scan.
- Introduce abstractions only when they remove real duplication, protect invariants, hide unavoidable complexity, or create a genuinely reusable concept.
- Prefer local clarity at the call site over extraction that only adds navigation.
- Allow local mutation when it is scoped, clearer, or more efficient. Avoid shared mutable state.
- Prefer modules and functions over classes. Use classes only when state, lifecycle, or invariants justify them.

## Function Shape

- Prefer `function` declarations for named functions, including exported functions.
- Use arrow functions for inline callbacks, closures that intentionally capture local state, or cases where lexical `this` is required.
- Prefer named object parameters for functions with several parameters, optional parameters, same-typed adjacent parameters, or boolean-like options.
- Avoid boolean flag arguments. Replace them with named options or discriminated values.
- Prefer inline object types for function parameters when the shape is local to one function.
- Define a named type only when it is reused, exported, recursive, part of a public API, complex enough to deserve a domain name, or needed at multiple call sites.

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

## Types and State

- Prefer `type` aliases over `interface` for object shapes.
- Use `interface` only when declaration merging or a framework/library API specifically requires it.
- Make invalid states unrepresentable with discriminated unions and precise domain types.
- Avoid optional fields whose validity depends on another field such as `status`.
- Avoid `{} as SomeType`, half-built objects, and type assertions that bypass construction.
- Avoid advanced generic/type-level machinery unless it clearly removes real duplication across important APIs.
- Prefer boring, domain-named types over clever reusable type utilities.

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
invoice.items = items;
```

Good:
```ts
const invoice: Invoice = {
  id: createId(),
  customerId,
  items,
  status: "draft",
};
```

## Control Flow

- Prefer early returns when a branch is a terminal decision.
- Avoid `else` after `return`, `throw`, `continue`, or `break`.
- Prefer guard clauses and base indentation for the main path.
- Prefer `switch` when branching across several cases of the same discriminant, especially discriminated unions and enum-like string unions.
- Use `if` for guard clauses, unrelated conditions, range checks, compound predicates, or one to two branches.

Bad:
```ts
function getInvoiceStatus(invoice: Invoice) {
  let status: InvoiceStatus;

  if (invoice.deletedAt) {
    status = "deleted";
  } else if (invoice.paidAt) {
    status = "paid";
  } else if (invoice.dueDate < new Date()) {
    status = "overdue";
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

  if (invoice.dueDate < new Date()) {
    return "overdue";
  }

  return "open";
}
```

## Boundaries and Errors

- Validate external data at boundaries before passing it into business logic.
- Treat data from JSON, requests, environment variables, storage, queues, and third-party APIs as untrusted.
- Avoid `JSON.parse(raw) as SomeType`; parse and validate into trusted domain types.
- Use exceptions for failures, but do not swallow errors.
- Catch only when adding useful context, translating at a boundary, logging before rethrowing, or handling an expected local recovery.

Bad:
```ts
async function handleRequest(request: Request) {
  const body = await request.json();

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

## Modules and Exports

- Prefer named exports over default exports for grepability and refactorability.
- Avoid barrel exports when they hide ownership, encourage broad imports, or create circular dependency risk.
- Keep module public surfaces small.
- Do not export private helpers only so tests can reach them.
- Prefer testing observable behavior through public APIs over testing internal implementation details.

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

## Helpers and Abstractions

- Avoid tiny one-off helper functions when their body is clearer inline at the call site.
- A helper should earn its name by being reused, genuinely generic, domain-significant, or by hiding unavoidable complexity.
- Inline simple predicates and expressions when extraction only adds indirection.
- Generic helpers such as `sleep`, `roundToDecimal`, or small reusable utilities are fine when they are actually shared.

Bad:
```ts
function isPaid(invoice: Invoice) {
  return invoice.status === "paid";
}

function getPaidInvoices(invoices: Invoice[]) {
  return invoices.filter(isPaid);
}
```

Good:
```ts
function getPaidInvoices(invoices: Invoice[]) {
  return invoices.filter((invoice) => invoice.status === "paid");
}
```

## Async and Performance

- Prefer structured concurrency for independent async work.
- Use `Promise.all` or `Promise.allSettled` when operations can run concurrently and the failure semantics are intentional.
- Avoid sequential awaits unless the later operation depends on the earlier result or ordering matters.
- Prefer a single clear loop over several chained array passes when it improves readability or avoids unnecessary work.
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

## Nullish Values and Destructuring

- Use one absence convention consistently. Prefer `undefined` for missing optional values unless an external API requires `null`.
- Avoid mixing `null` and `undefined` for the same concept.
- Destructure when it reduces local repetition.
- Avoid wide destructuring that detaches fields from their domain object and makes code harder to understand.

Bad:
```ts
type User = {
  email?: string | null;
};
```

Good:
```ts
type User = {
  email?: string;
};
```

## Tests and Comments

- Prefer behavior-focused tests over mock-verification tests.
- Use mocks when they isolate unavoidable external systems or failure modes, not just to assert internal calls.
- Do not export private helpers solely for tests.
- Comments should explain why, constraints, gotchas, or non-obvious context.
- Avoid comments that restate what the code already says.

Bad:
```ts
// Check if invoice is paid
if (invoice.status === "paid") {
  // ...
}
```

Good:
```ts
// Stripe can send duplicate paid events, so this branch must be idempotent.
if (invoice.status === "paid") {
  // ...
}
```

## Lint Rule Candidates

Good candidates for hard lint rules:

- Prefer `type` over `interface`, with explicit allowlists.
- Prefer named exports over default exports.
- Disallow boolean flag arguments.
- Prefer named object parameters for risky signatures.
- Disallow `catch {}` and useless catch blocks.
- Disallow `JSON.parse(...) as SomeType`.
- Disallow `{} as SomeType`.
- Disallow `else` after terminal branches.
- Prefer `function` declarations for named module-scope functions.
- Flag sequential awaits that could be `Promise.all`.
- Restrict barrel imports or exports.

Good candidates for review-level or ast-grep smell rules:

- Single-use one-line helpers.
- Wrapper functions or classes that only forward arguments.
- Non-exported parameter types used by only one function.
- Optional fields coupled to status-like discriminants.
- Three or more `if` branches comparing the same discriminant to literals.
- Dense object-building `reduce` with spreads.
- Wide destructuring from domain objects.
- Tests that assert only collaborator calls.
