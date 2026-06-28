# Oxlint Rule Triage Reference

Generated on 2026-06-27 from the official Oxlint rules index and per-rule Markdown pages.

Source index: https://oxc.rs/docs/guide/usage/linter/rules.html

Rules: 838. Defaults: 113. Rules with implemented fixes or suggestions: 308. Type-aware rules: 59.

Use the empty checkbox on each rule as a triage marker for the Hodor oxlint plugin. The examples are intentionally compact: first official flagged snippet, first official accepted snippet, or a coverage note when the rule page does not provide examples.

## Contents

- [eslint (184)](#eslint)
- [import (33)](#import)
- [jest (60)](#jest)
- [jsdoc (22)](#jsdoc)
- [jsx_a11y (36)](#jsx_a11y)
- [nextjs (21)](#nextjs)
- [node (9)](#node)
- [oxc (26)](#oxc)
- [promise (16)](#promise)
- [react (63)](#react)
- [react_perf (4)](#react_perf)
- [typescript (110)](#typescript)
- [unicorn (136)](#unicorn)
- [vitest (72)](#vitest)
- [vue (46)](#vue)

## eslint

### pedantic

#### [ ] `eslint/accessor-pairs`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/accessor-pairs.html
- What it does: Enforces getter/setter pairs in objects and classes.
- Covers: It's a common mistake in JavaScript to create an object with just a setter for a property but never have a corresponding getter defined for it. Without a getter, you cannot read the property, so it ends up not being used.

Flagged example:

```js
var o = {
  set a(value) {
    this.val = value;
  },
};

class C {
  set a(value) {
    this.val = value;
  }
// ...
```

Accepted example:

```js
var o = {
  set a(value) {
    this.val = value;
  },
  get a() {
    return this.val;
  },
};

class C {
// ...
```

#### [ ] `eslint/array-callback-return`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/array-callback-return.html
- What it does: Enforce return statements in callbacks of array methods.
- Covers: Array has several methods for filtering, mapping, and folding. If we forget to write return statement in a callback of those, it's probably a mistake. If you don't want to use a return or don't need the returned results, consider using .forEach instead.

Flagged example:

```javascript
let foo = [1, 2, 3, 4];
foo.map((a) => {
  console.log(a);
});
```

Accepted example:

```javascript
let foo = [1, 2, 3, 4];
foo.map((a) => {
  console.log(a);
  return a;
});
```

#### [ ] `eslint/eqeqeq`

- Category: pedantic
- Default: no
- Fix: conditional dangerous auto-fix
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/eqeqeq.html
- What it does: Requires the use of the === and !== operators, disallowing the use of == and !=.
- Covers: Using non-strict equality operators leads to unexpected behavior due to type coercion, which can cause hard-to-find bugs.

Flagged example:

```js
/* eqeqeq: "error" */

if (x == 42) {
}
if ("" == text) {
}
if (obj.getStuff() != undefined) {
}
```

Accepted example:

```js
/* eqeqeq: "error" */

if (x === 42) {
}
if ("" === text) {
}
if (obj.getStuff() !== undefined) {
}
```

#### [ ] `eslint/max-classes-per-file`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-classes-per-file.html
- What it does: Enforce a maximum number of classes per file.
- Covers: Files containing multiple classes can often result in a less navigable and poorly structured codebase. Best practice is to keep each file limited to a single responsibility.

Flagged example:

```javascript
class Foo {}
class Bar {}
```

Accepted example:

```js
function foo() {
  var bar = 1;
  let baz = 2;
  const qux = 3;
}
```

#### [ ] `eslint/max-depth`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-depth.html
- What it does: Enforce a maximum depth that blocks can be nested. This rule helps to limit the complexity of nested blocks, improving readability and maintainability by ensuring that code does not become too deeply nested.
- Covers: Many developers consider code difficult to read if blocks are nested beyond a certain depth. Excessive nesting can make it harder to follow the flow of the code, increasing cognitive load and making maintenance more error-prone. By enforcing a maximum block depth, this rule encourages cleaner, more readable code.

Flagged example:

```js
function foo() {
  for (;;) { // Nested 1 deep
    while (true) { // Nested 2 deep
      if (true) { // Nested 3 deep
        if (true) { // Nested 4 deep }
      }
    }
  }
}
```

Accepted example:

```js
function foo() {
  for (;;) { // Nested 1 deep
    while (true) { // Nested 2 deep
      if (true) { // Nested 3 deep }
    }
  }
}
```

#### [ ] `eslint/max-lines`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-lines.html
- What it does: Enforce a maximum number of lines per file.
- Covers: Some people consider large files a code smell. Large files tend to do a lot of things and can make it hard following what's going. While there is not an objective maximum number of lines considered acceptable in a file, most people would agree it should not be in the thousands. Recommendations usually range from 100 to 500 lines.

Example signal: Covers max lines concerns.

#### [ ] `eslint/max-lines-per-function`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-lines-per-function.html
- What it does: Enforce a maximum number of lines of code in a function. This rule ensures that functions do not exceed a specified line count, promoting smaller, more focused functions that are easier to maintain and understand.
- Covers: Some people consider large functions a code smell. Large functions tend to do a lot of things and can make it hard to follow what's going on. Many coding style guides dictate a limit to the number of lines that a function can comprise of. This rule can help enforce that style.

Flagged example:

```js
/* { "eslint/max-lines-per-function": ["error", 2] } */
function foo() {
  const x = 0;
}

/* { "eslint/max-lines-per-function": ["error", 4] } */
function foo() {
  // a comment followed by a blank line

  const x = 0;
// ...
```

Accepted example:

```js
/* { "eslint/max-lines-per-function": ["error", 3] } */
function foo() {
  const x = 0;
}

/* { "eslint/max-lines-per-function": ["error", 5] } */
function foo() {
  // a comment followed by a blank line

  const x = 0;
// ...
```

#### [ ] `eslint/max-nested-callbacks`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-nested-callbacks.html
- What it does: Enforce a maximum depth that callbacks can be nested. This rule helps to limit the complexity of callback nesting, ensuring that callbacks do not become too deeply nested, improving code readability and maintainability.
- Covers: Many JavaScript libraries use the callback pattern to manage asynchronous operations. A program of any complexity will most likely need to manage several asynchronous operations at various levels of concurrency. A common pitfall is nesting callbacks excessively, making code harder to read and understand.

Flagged example:

```js
foo1(function () {
  foo2(function () {
    foo3(function () {
      foo4(function () {
        // ...
      });
    });
  });
});
```

Accepted example:

```js
foo1(handleFoo1);

function handleFoo1() {
  foo2(handleFoo2);
}

function handleFoo2() {
  foo3(handleFoo3);
}

// ...
```

#### [ ] `eslint/no-array-constructor`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-array-constructor.html
- What it does: Disallows creating arrays with the Array constructor.
- Covers: Use of the Array constructor to construct a new array is generally discouraged in favor of array literal notation because of the single-argument pitfall and because the Array global may be redefined. The exception is when the Array constructor is used to intentionally create sparse arrays of a specified size by giving the constructor a single numeric argument.

Flagged example:

```javascript
let arr = new Array();
```

Accepted example:

```javascript
let arr = [];
let arr2 = Array.from(iterable);
let arr3 = new Array(9);
```

#### [ ] `eslint/no-case-declarations`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-case-declarations.html
- What it does: Disallow lexical declarations in case clauses.
- Covers: The reason is that the lexical declaration is visible in the entire switch block but it only gets initialized when it is assigned, which will only happen if the case where it is defined is reached.

Flagged example:

```javascript
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {}
    break;
// ...
```

Accepted example:

```javascript
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
// ...
```

#### [ ] `eslint/no-constructor-return`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constructor-return.html
- What it does: Disallow returning a value from a constructor.
- Covers: In JavaScript, returning a value in the constructor of a class may be a mistake. Forbidding this pattern prevents mistakes resulting from unfamiliarity with the language or a copy-paste error.

Flagged example:

```js
class C {
  constructor() {
    return 42;
  }
}
```

Accepted example:

```js
class C {
  constructor() {
    this.value = 42;
  }
}
```

#### [ ] `eslint/no-else-return`

- Category: pedantic
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.9.10
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-else-return.html
- What it does: Disallow else blocks after return statements in if statements.
- Covers: If an if block contains a return statement, the else block becomes unnecessary. Its contents can be placed outside of the block.

Flagged example:

```javascript
function foo1() {
  if (x) {
    return y;
  } else {
    return z;
  }
}

function foo2() {
  if (x) {
// ...
```

Accepted example:

```javascript
function foo1() {
  if (x) {
    return y;
  }

  return z;
}

function foo2() {
  if (x) {
// ...
```

#### [ ] `eslint/no-fallthrough`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-fallthrough.html
- What it does: Disallow fallthrough of case statements
- Covers: The switch statement in JavaScript is one of the more error-prone constructs of the language thanks in part to the ability to "fall through" from one case to the next. For example:

Flagged example:

```js
switch (foo) {
  case 1:
    doSomething();

  case 2:
    doSomething();
}
```

Accepted example:

```js
switch (foo) {
  case 1:
    doSomething();
    break;

  case 2:
    doSomething();
}

function bar(foo) {
// ...
```

#### [ ] `eslint/no-inline-comments`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.34.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-inline-comments.html
- What it does: Disallows comments on the same line as code.
- Covers: Comments placed at the end of a line of code can make code harder to read. They can easily be missed when scanning vertically, and they make lines longer. Moving comments to their own lines makes them more prominent and reduces line length.

Flagged example:

```js
var a = 1; // inline comment
var b = 2; /* another inline comment */
```

Accepted example:

```js
// comment on its own line
var a = 1;

/* block comment on its own line */
var b = 2;
```

#### [ ] `eslint/no-inner-declarations`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-inner-declarations.html
- What it does: Disallow variable or function declarations in nested blocks.
- Covers: A variable declaration is permitted anywhere a statement can go, even nested deeply inside other blocks. This is often undesirable due to variable hoisting, and moving declarations to the root of the program or function body can increase clarity. Note that block bindings (let, const) are not hoisted and therefore they are not affected by this rule.

Flagged example:

```javascript
if (test) {
  function doSomethingElse() {}
}
```

Accepted example:

```javascript
function doSomethingElse() {}
if (test) {
  // your code here
}
```

#### [ ] `eslint/no-lonely-if`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.16.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-lonely-if.html
- What it does: Disallow if statements as the only statement in else blocks.
- Covers: When an if statement is the only statement in an else block, it is often clearer to use an else if instead.

Flagged example:

```js
if (condition) {
  // ...
} else {
  if (anotherCondition) {
    // ...
  }
}
```

Accepted example:

```js
if (condition) {
  // ...
} else if (anotherCondition) {
  // ...
}
```

#### [ ] `eslint/no-loop-func`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-loop-func.html
- What it does: Disallows function declarations and expressions inside loop statements when they reference variables declared in the outer scope that may change across iterations.
- Covers: Writing functions within loops tends to result in errors due to the way closures work in JavaScript. Functions capture variables by reference, not by value. When using var, which is function-scoped, all iterations share the same variable binding, leading to unexpected behavior.

Flagged example:

```js
for (var i = 0; i < 10; i++) {
  funcs[i] = function () {
    return i;
  };
}
```

Accepted example:

```js
for (let i = 0; i < 10; i++) {
  funcs[i] = function () {
    return i;
  };
}
```

#### [ ] `eslint/no-negated-condition`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-negated-condition.html
- What it does: Disallow negated conditions.
- Covers: Negated conditions are more difficult to understand. Code can be made more readable by inverting the condition.

Flagged example:

```javascript
if (!a) {
  doSomethingC();
} else {
  doSomethingB();
}

!a ? doSomethingC() : doSomethingB();
```

Accepted example:

```javascript
if (a) {
  doSomethingB();
} else {
  doSomethingC();
}

a ? doSomethingB() : doSomethingC();
```

#### [ ] `eslint/no-new-wrappers`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.10
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-wrappers.html
- What it does: Disallow new operators with the String, Number, and Boolean objects.
- Covers: The first problem is that primitive wrapper objects are, in fact, objects. That means typeof will return "object" instead of "string", "number", or "boolean". The second problem comes with boolean objects. Every object is truthy, that means an instance of Boolean always resolves to true even when its actual value is false.

Flagged example:

```js
var stringObject = new String("Hello world");
var numberObject = new Number(33);
var booleanObject = new Boolean(false);
var symbolObject = new Symbol("foo"); // symbol is not a constructor
```

Accepted example:

```js
var stringObject = "Hello world";
var stringObject2 = String(value);
var numberObject = Number(value);
var booleanObject = Boolean(value);
var symbolObject = Symbol("foo");
```

#### [ ] `eslint/no-object-constructor`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.13.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-object-constructor.html
- What it does: Disallow calls to the Object constructor without an argument.
- Covers: Use of the Object constructor to construct a new empty object is generally discouraged in favor of object literal notation because of conciseness and because the Object global may be redefined. The exception is when the Object constructor is used to intentionally wrap a specified value which is passed as an argument.

Flagged example:

```js
Object();
new Object();
```

Accepted example:

```js
Object("foo");
const obj = { a: 1, b: 2 };
const isObject = (value) => value === Object(value);
const createObject = (Object) => new Object();
```

#### [ ] `eslint/no-promise-executor-return`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-promise-executor-return.html
- What it does: Disallow returning values from Promise executor functions.
- Covers: The new Promise constructor accepts an executor function as an argument, which has resolve and reject parameters that can be used to control the state of the created Promise.

Flagged example:

```javascript
new Promise((resolve, reject) => {
  if (someCondition) {
    return defaultResult;
  }
  getSomething((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
// ...
```

Accepted example:

```javascript
new Promise((resolve, reject) => {
  if (someCondition) {
    resolve(defaultResult);
    return;
  }
  getSomething((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
// ...
```

#### [ ] `eslint/no-prototype-builtins`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-prototype-builtins.html
- What it does: Disallow calling some Object.prototype methods directly on objects.
- Covers: In ECMAScript 5.1, Object.create was added, which enables the creation of objects with a specified \[\[Prototype]]. Object.create(null) is a common pattern used to create objects that will be used as a Map. This can lead to errors when it is assumed that objects will have properties from Object.prototype. This rule prevents calling some Object.prototype methods directly from an object. Additionally, objects can have properties that shadow the builtins on Object.prototype, potentially causing unintended behavior or denial-of-service security vulnerabilities. For example, it would be unsafe for a webserver to parse JSON input from a client and call hasOwnProperty directly on the resulting object, because a malicious client could send a JSON value like {"hasOwnProperty": 1} and cause the server to crash.

Flagged example:

```javascript
var hasBarProperty = foo.hasOwnProperty("bar");
var isPrototypeOfBar = foo.isPrototypeOf(bar);
var barIsEnumerable = foo.propertyIsEnumerable("bar");
```

Accepted example:

```javascript
var hasBarProperty = foo.hasOwnProperty("bar");
var isPrototypeOfBar = foo.isPrototypeOf(bar);
var barIsEnumerable = foo.propertyIsEnumerable("bar");
```

#### [ ] `eslint/no-redeclare`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-redeclare.html
- What it does: This rule disallows redeclaring variables within the same scope, ensuring that each variable is declared only once. It helps avoid confusion and unintended behavior in code.
- Covers: Redeclaring variables in the same scope can lead to unexpected behavior, overwriting existing values, and making the code harder to understand and maintain.

Flagged example:

```javascript
var a = 3;
var a = 10;
```

Accepted example:

```javascript
var a = 3;
a = 10;
```

#### [ ] `eslint/no-self-compare`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-self-compare.html
- What it does: Disallow comparisons where both sides are exactly the same.
- Covers: Comparing a variable against itself is usually an error, either a typo or refactoring error. It is confusing to the reader and may potentially introduce a runtime error.

Flagged example:

```javascript
var x = 10;
if (x === x) {
  x = 20;
}
```

Accepted example:

```javascript
var x = 10;
if (x === x) {
  x = 20;
}
```

#### [ ] `eslint/no-throw-literal`

- Category: pedantic
- Default: no
- Fix: conditional suggestion
- Type-aware: no
- Added: 0.9.10
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-throw-literal.html
- What it does: Disallows throwing literals or non-Error objects as exceptions.
- Covers: It is considered good practice to only throw the Error object itself or an object using the Error object as base objects for user-defined exceptions. The fundamental benefit of Error objects is that they automatically keep track of where they were built and originated.

Flagged example:

```js
throw "error";

throw 0;

throw undefined;

throw null;

var err = new Error();
throw "an " + err;
// ...
```

Accepted example:

```js
throw new Error();

throw new Error("error");

var e = new Error("error");
throw e;

try {
  throw new Error("error");
} catch (e) {
// ...
```

#### [ ] `eslint/no-useless-return`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.32.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-return.html
- What it does: Disallows redundant return statements.
- Covers: A return; statement with nothing after it is redundant, and has no effect on the runtime behavior of a function. This can be confusing, so it's better to disallow these redundant statements.

Flagged example:

```js
function foo() {
  return;
}

function bar() {
  doSomething();
  return;
}

function baz() {
// ...
```

Accepted example:

```js
function foo() {
  return 5;
}

function bar() {
  if (condition) {
    return;
  }
  doSomething();
}
// ...
```

#### [ ] `eslint/no-warning-comments`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.24.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-warning-comments.html
- What it does: Disallows warning comments such as TODO, FIXME, XXX in code.
- Covers: Developers often add comments like TODO or FIXME to mark incomplete work or areas that need attention. While useful during development, these comments can indicate unfinished code that shouldn't be shipped to production. This rule helps catch such comments before they make it into production code.

Flagged example:

```javascript
// TODO: implement this feature
function doSomething() {}

// FIXME: this is broken
const x = 1;

/* XXX: hack */
let y = 2;
```

Accepted example:

```javascript
// This is a regular comment
function doSomething() {}

// Note: This explains something
const x = 1;
```

#### [ ] `eslint/radix`

- Category: pedantic
- Default: no
- Fix: conditional dangerous auto-fix
- Type-aware: no
- Added: 0.3.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/radix.html
- What it does: Enforce the consistent use of the radix argument when using parseInt(), which specifies what base to use for parsing the number.
- Covers: Using the parseInt() function without specifying the radix can lead to unexpected results.

Flagged example:

```javascript
let num = parseInt("071"); // 57
```

Accepted example:

```javascript
let num = parseInt("071", 10); // 71
```

#### [ ] `eslint/require-await`

- Category: pedantic
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-await.html
- What it does: Disallow async functions which have no await expression.
- Covers: Asynchronous functions in JavaScript behave differently than other functions in two important ways:

Flagged example:

```js
async function foo() {
  doSomething();
}
```

Accepted example:

```js
async function foo() {
  await doSomething();
}
```

#### [ ] `eslint/require-unicode-regexp`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.63.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-unicode-regexp.html
- What it does: Enforce the use of u or v flag on regular expressions.
- Covers: RegExp u flag has two effects:

Flagged example:

```js
const a = /aaa/;
const b = /bbb/gi;
const c = new RegExp("ccc");
const d = new RegExp("ddd", "gi");
```

Accepted example:

```js
const a = /aaa/u;
const b = /bbb/giu;
const c = new RegExp("ccc", "u");
const d = new RegExp("ddd", "giu");

const e = /aaa/v;
const f = /bbb/giv;
const g = new RegExp("ccc", "v");
const h = new RegExp("ddd", "gv");

// ...
```

#### [ ] `eslint/sort-vars`

- Category: pedantic
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.9.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-vars.html
- What it does: Enforce sorting of variable declarations within the same block.
- Covers: When declaring multiple variables within the same block, sorting variable names can make it easier to find necessary variables at a later time.

Flagged example:

```js
var b, a;
var a, B, c;
```

Accepted example:

```js
var a, b, c, d;
var B, a, c;
```

#### [ ] `eslint/symbol-description`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/symbol-description.html
- What it does: Require symbol descriptions.
- Covers: The Symbol function may have an optional description.

Flagged example:

```javascript
var foo = Symbol();
```

Accepted example:

```javascript
var foo = Symbol("some description");
```

### style

#### [ ] `eslint/arrow-body-style`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/arrow-body-style.html
- What it does: This rule can enforce or disallow the use of braces around arrow function body. Arrow functions can use either:
- Covers: Inconsistent use of block vs. concise bodies makes code harder to read. Concise bodies are limited to a single expression, whose value is implicitly returned.

Flagged example:

```js
/* arrow-body-style: ["error", "never"] */

/* ✘ Bad: */
const foo = () => {
  return 0;
};
```

Accepted example:

```js
/* arrow-body-style: ["error", "never"] */

/* ✔ Good: */
const foo = () => 0;
const bar = () => ({ foo: 0 });
```

#### [ ] `eslint/capitalized-comments`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.34.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/capitalized-comments.html
- What it does: Enforces or disallows capitalization of the first letter of a comment.
- Covers: Inconsistent capitalization of comments can make code harder to read. This rule helps enforce a consistent style across the codebase.

Flagged example:

```js
// lowercase comment
/* lowercase block comment */
```

Accepted example:

```js
// Capitalized comment
/* Capitalized block comment */
// 123 - comments starting with non-letters are ignored
```

#### [ ] `eslint/curly`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.15.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/curly.html
- What it does: This rule enforces the use of curly braces {} for all control statements (if, else, for, while, do, with). It ensures that all blocks are enclosed in curly braces to improve code clarity and maintainability.
- Covers: Omitting curly braces can reduce code readability and increase the likelihood of errors, especially in deeply nested or indented code. It can also lead to bugs if additional statements are added later without properly enclosing them in braces. Using curly braces consistently makes the code safer and easier to modify.

Flagged example:

```js
/* curly: ["error", "all"] */

if (foo) foo++;
while (bar) bar--;
do foo();
while (bar);
```

Accepted example:

```js
/* curly: ["error", "all"] */

if (foo) {
  foo++;
}
while (bar) {
  bar--;
}
do {
  foo();
// ...
```

#### [ ] `eslint/default-case-last`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-case-last.html
- What it does: Requires the default clause in switch statements to be the last one.
- Covers: By convention and for readability, the default clause should be the last one in a switch. While it is legal to place it before or between case clauses, doing so is confusing and may lead to unexpected "fall-through" behavior.

Flagged example:

```js
/* default-case-last: "error" */

switch (foo) {
  default:
    bar();
    break;
  case "a":
    baz();
    break;
}
// ...
```

Accepted example:

```js
/* default-case-last: "error" */

switch (foo) {
  case 1:
    bar();
    break;
  case 2:
    qux();
    break;
  default:
// ...
```

#### [ ] `eslint/default-param-last`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-param-last.html
- What it does: Requires default parameters in functions to be the last ones.
- Covers: Placing default parameters last allows function calls to omit optional trailing arguments, which improves readability and consistency. This rule applies equally to JavaScript and TypeScript functions.

Flagged example:

```js
/* default-param-last: "error" */

function f(a = 0, b) {}
function f(a, b = 0, c) {}
function createUser(isAdmin = false, id) {}
createUser(undefined, "tabby");
```

Accepted example:

```js
/* default-param-last: "error" */

function f(a, b = 0) {}
function f(a = 0, b = 0) {}
function createUser(id, isAdmin = false) {}
createUser("tabby");
```

#### [ ] `eslint/func-name-matching`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.62.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-name-matching.html
- What it does: Requires function expression names to match the variable or property names they are assigned to, or disallows such matches with "never".
- Covers: Matching names keep stack traces and source code easier to connect. If a project prefers distinct names, the "never" option enforces that convention consistently.

Flagged example:

```js
/*eslint func-name-matching: "error"*/

let foo = function bar() {};
foo = function bar() {};
const obj = { foo: function bar() {} };
obj.foo = function bar() {};
obj["foo"] = function bar() {};

class C {
  foo = function bar() {};
// ...
```

Accepted example:

```js
/*eslint func-name-matching: "error"*/
// equivalent to /*eslint func-name-matching: ["error", "always"]*/

const foo = function foo() {};
const foo1 = function () {};
const foo2 = () => {};
foo = function foo() {};

const obj = { foo: function foo() {} };
obj.foo = function foo() {};
// ...
```

#### [ ] `eslint/func-names`

- Category: style
- Default: no
- Fix: conditional fix or suggestion
- Type-aware: no
- Added: 0.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-names.html
- What it does: Require or disallow named function expressions.
- Covers: Leaving the name off a function will cause <anonymous> to appear in stack traces of errors thrown in it or any function called within it. This makes it more difficult to find where an error is thrown. Providing an explicit name also improves readability and consistency.

Flagged example:

```js
/* func-names: ["error", "always"] */

Foo.prototype.bar = function () {};
const cat = { meow: function () {} };
(function () {
  /* ... */
})();
export default function () {}
```

Accepted example:

```js
/* func-names: ["error", "always"] */

Foo.prototype.bar = function bar() {};
const cat = { meow() {} };
(function bar() {
  /* ... */
})();
export default function foo() {}
```

#### [ ] `eslint/func-style`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.15.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-style.html
- What it does: Enforce the consistent use of either function declarations or expressions assigned to variables.
- Covers: This rule enforces a particular type of function style, either function declarations or expressions assigned to variables. You can specify which you prefer in the configuration.

Flagged example:

```js
/* func-style: ["error", "expression"] */

function foo() {
  // ...
}
```

Accepted example:

```js
/* func-style: ["error", "expression"] */
var foo = function () {
  // ...
};
```

#### [ ] `eslint/grouped-accessor-pairs`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.15.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/grouped-accessor-pairs.html
- What it does: Require grouped accessor pairs in object literals and classes.
- Covers: While it is allowed to define the pair for a getter or a setter anywhere in an object or class definition, it's considered a best practice to group accessor functions for the same property.

Flagged example:

```js
const foo = {
  get a() {
    return this.val;
  },
  b: 1,
  set a(value) {
    this.val = value;
  },
};
```

Accepted example:

```js
const foo = {
  get a() {
    return this.val;
  },
  set a(value) {
    this.val = value;
  },
  b: 1,
};
```

#### [ ] `eslint/guard-for-in`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/guard-for-in.html
- What it does: Require for-in loops to include an if statement.
- Covers: Looping over objects with a for in loop will include properties that are inherited through the prototype chain. Using a for in loop without filtering the results in the loop can lead to unexpected items in your for loop which can then lead to unexpected behaviour.

Flagged example:

```javascript
for (key in foo) {
  doSomething(key);
}
```

Accepted example:

```javascript
for (key in foo) {
  if (Object.hasOwn(foo, key)) {
    doSomething(key);
  }
}
```

#### [ ] `eslint/id-length`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-length.html
- What it does: Enforce a minimum and/or maximum identifier length convention by counting the graphemes for a given identifier.
- Covers: Very short identifier names like e, x, \_t or very long ones like hashGeneratorResultOutputContainerObject can make code harder to read and potentially less maintainable. To prevent this, one may enforce a minimum and/or maximum identifier length.

Flagged example:

```js
/* id-length: "error" */ // default is minimum 2-chars ({ "min": 2 })

const x = 5;
obj.e = document.body;
const foo = function (e) {};
try {
  dangerousStuff();
} catch (e) {
  // ignore as many do
}
// ...
```

Accepted example:

```js
/* id-length: "error" */ // default is minimum 2-chars ({ "min": 2 })

const num = 5;
function _f() {
  return 42;
}
function _func() {
  return 42;
}
obj.el = document.body;
// ...
```

#### [ ] `eslint/id-match`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.66.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-match.html
- What it does: Enforces a naming convention for identifiers by requiring each checked name to match a configured regular expression.
- Covers: Inconsistent identifier names make code harder to read and maintain.

Flagged example:

```js
/* id-match: ["error", "^[^_]+$"] */
var first_name = "John";

/* id-match: ["error", "^[^_]+$", { "properties": true }] */
obj.first_name = "John";
```

Accepted example:

```js
/* id-match: ["error", "^[^_]+$"] */
var firstName = "John";

/* id-match: ["error", "^[^_]+$", { "ignoreDestructuring": true }] */
const { first_name } = user;
```

#### [ ] `eslint/init-declarations`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/init-declarations.html
- What it does: Require or disallow initialization in variable declarations.
- Covers: In JavaScript, variables can be assigned during declaration, or at any point afterwards using an assignment statement. For example, in the following code, foo is initialized during declaration, while bar is initialized later.

Flagged example:

```js
/* init-declarations: ["error", "always"] */
function foo() {
  var bar;
  let baz;
}
```

Accepted example:

```js
/* init-declarations: ["error", "always"] */
function foo() {
  var bar;
  let baz;
}
```

#### [ ] `eslint/logical-assignment-operators`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.63.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/logical-assignment-operators.html
- What it does: This rule requires or disallows logical assignment operator shorthand.
- Covers: ES2021 introduces the assignment operator shorthand for the logical operators ||, && and ??. Before, this was only allowed for mathematical operations such as + or * (see the rule operator-assignment). The shorthand can be used if the assignment target and the left expression of a logical expression are the same. For example a = a || b can be shortened to a ||= b.

Flagged example:

```js
a = a || b;
a = a && b;
a = a ?? b;
a || (a = b);
a && (a = b);
a ?? (a = b);
a = a || b || c;
a = a && b && c;
a = a ?? b ?? c;
```

Accepted example:

```js
a = b;
a += b;
a ||= b;
a = b || c;
a || (b = c);
if (a) a = b;
a = a || b || c;
```

#### [ ] `eslint/max-params`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-params.html
- What it does: Enforce a maximum number of parameters in function definitions which by default is three.
- Covers: Functions that take numerous parameters can be difficult to read and write because it requires the memorization of what each parameter is, its type, and the order they should appear in. As a result, many coders adhere to a convention that caps the number of parameters a function can take.

Flagged example:

```javascript
function foo(bar, baz, qux, qxx) {
  doSomething();
}
```

Accepted example:

```javascript
function foo(bar, baz, qux) {
  doSomething();
}
```

#### [ ] `eslint/max-statements`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.35.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-statements.html
- What it does: Enforce a maximum number of statements in a function. This rule ensures that functions do not exceed a specified statements count, promoting smaller, more focused functions that are easier to maintain and understand.
- Covers: Some people consider large functions a code smell. Large functions tend to do a lot of things and can make it hard to follow what's going on. This rule can help avoid large functions.

Flagged example:

```js
function foo() {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
// ...
```

Accepted example:

```js
function foo() {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
// ...
```

#### [ ] `eslint/new-cap`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.15.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/new-cap.html
- What it does: This rule requires constructor names to begin with a capital letter.
- Covers: The new operator in JavaScript creates a new instance of a particular type of object. That type of object is represented by a constructor function. Since constructor functions are just regular functions, the only defining characteristic is that new is being used as part of the call. Native JavaScript functions begin with an uppercase letter to distinguish those functions that are to be used as constructors from functions that are not. Many style guides recommend following this pattern to more easily determine which functions are to be used as constructors.

Flagged example:

```js
function foo(arg) {
  return Boolean(arg);
}
```

Accepted example:

```js
/* new-cap: ["error", { "newIsCap": true }] */

var friend = new Person();
```

#### [ ] `eslint/no-continue`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-continue.html
- What it does: Disallow continue statements.
- Covers: The continue statement terminates execution of the statements in the current iteration of the current or labeled loop, and continues execution of the loop with the next iteration. When used incorrectly it makes code less testable, less readable and less maintainable. Structured control flow statements such as if should be used instead.

Flagged example:

```javascript
var sum = 0,
  i;

for (i = 0; i < 10; i++) {
  if (i >= 5) {
    continue;
  }

  sum += i;
}
```

Accepted example:

```javascript
var sum = 0,
  i;
for (i = 0; i < 10; i++) {
  if (i < 5) {
    sum += i;
  }
}
```

#### [ ] `eslint/no-duplicate-imports`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.13.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-duplicate-imports.html
- What it does: Disallow duplicate module imports.
- Covers: Using a single import statement per module will make the code clearer because you can see everything being imported from that module on one line.

Flagged example:

```js
import { merge } from "module";
import something from "another-module";
import { find } from "module";
```

Accepted example:

```js
import { merge, find } from "module";
import something from "another-module";
```

#### [ ] `eslint/no-extra-label`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.15.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-label.html
- What it does: Disallow unnecessary labels.
- Covers: If a loop contains no nested loops or switches, labeling the loop is unnecessary.

Flagged example:

```js
A: while (a) {
  break A;
}

B: for (let i = 0; i < 10; ++i) {
  break B;
}

C: switch (a) {
  case 0:
// ...
```

Accepted example:

```js
while (a) {
  break;
}

for (let i = 0; i < 10; ++i) {
  break;
}

switch (a) {
  case 0:
// ...
```

#### [ ] `eslint/no-implicit-coercion`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implicit-coercion.html
- What it does: Disallow shorthand type conversions using operators like !!, unary +, and "" +.
- Covers: Implicit type coercions using operators can be less clear than using explicit type conversion functions like Boolean(), Number(), and String(). Using explicit conversions makes the intent clearer and the code more readable.

Flagged example:

```javascript
var b = !!foo;
var n = +foo;
var s = "" + foo;
```

Accepted example:

```javascript
var b = Boolean(foo);
var n = Number(foo);
var s = String(foo);
```

#### [ ] `eslint/no-label-var`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.6.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-label-var.html
- What it does: Disallow labels that share a name with a variable.
- Covers: This rule aims to create clearer code by disallowing the bad practice of creating a label that shares a name with a variable that is in scope.

Flagged example:

```js
var x = foo;
function bar() {
  x: for (;;) {
    break x;
  }
}
```

Accepted example:

```js
// The variable that has the same name as the label is not in scope.

function foo() {
  var q = t;
}

function bar() {
  q: for (;;) {
    break q;
  }
// ...
```

#### [ ] `eslint/no-labels`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-labels.html
- What it does: Disallow labeled statements.
- Covers: Labeled statements in JavaScript are used in conjunction with break and continue to control flow around multiple loops. For example:

Flagged example:

```js
label: while (true) {
  // ...
}

label: while (true) {
  break label;
}

label: while (true) {
  continue label;
// ...
```

Accepted example:

```js
var f = {
  label: "foo",
};

while (true) {
  break;
}

while (true) {
  continue;
// ...
```

#### [ ] `eslint/no-lone-blocks`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.6
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-lone-blocks.html
- What it does: Disallows unnecessary standalone block statements.
- Covers: Standalone blocks can be confusing as they do not provide any meaningful purpose when used unnecessarily. They may introduce extra nesting, reducing code readability, and can mislead readers about scope or intent.

Flagged example:

```js
{
  var x = 1;
}
```

Accepted example:

```js
if (condition) {
  var x = 1;
}

{
  let x = 1; // Used to create a valid block scope.
}
```

#### [ ] `eslint/no-magic-numbers`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.9.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-magic-numbers.html
- What it does: This rule aims to make code more readable and refactoring easier by ensuring that special numbers are declared as constants to make their meaning explicit. The current implementation does not support BigInt numbers inside array indexes.
- Covers: 'Magic numbers' are numbers that occur multiple times in code without an explicit meaning. They should preferably be replaced by named constants.

Flagged example:

```javascript
var dutyFreePrice = 100;
var finalPrice = dutyFreePrice + dutyFreePrice * 0.25;
```

Accepted example:

```javascript
/*typescript no-magic-numbers: ["error", { "ignore": [1] }]*/
var data = ["foo", "bar", "baz"];
var dataLast = data.length && data[data.length - 1];
```

#### [ ] `eslint/no-multi-assign`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-multi-assign.html
- What it does: Disallow use of chained assignment expressions.
- Covers: Chaining the assignment of variables can lead to unexpected results and be difficult to read.

Flagged example:

```js
var a = (b = c = 5);

const foo = (bar = "baz");

let d = (e = f);

class Foo {
  a = (b = 10);
}

// ...
```

Accepted example:

```js
var a = 5;
var b = 5;
var c = 5;

const foo = "baz";
const bar = "baz";

let d = c;
let e = c;

// ...
```

#### [ ] `eslint/no-multi-str`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.5.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-multi-str.html
- What it does: Disallow multiline strings.
- Covers: Some consider this to be a bad practice as it was an undocumented feature of JavaScript that was only formalized later.

Flagged example:

```javascript
var x =
  "Line 1 \
 Line 2";
```

Accepted example:

```javascript
var x =
  "Line 1 \
 Line 2";
```

#### [ ] `eslint/no-nested-ternary`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-nested-ternary.html
- What it does: Disallow nested ternary expressions.
- Covers: Nested ternary expressions make code harder to read and understand. Nesting of these expressions can lead to complex logic that is difficult to understand.

Flagged example:

```js
const result = condition1 ? (condition2 ? "a" : "b") : "c";
```

Accepted example:

```js
let result;
if (condition1) {
  result = condition2 ? "a" : "b";
} else {
  result = "c";
}
```

#### [ ] `eslint/no-new-func`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-func.html
- What it does: Disallow new operators with the Function object.
- Covers: Using new Function or Function can lead to code that is difficult to understand and maintain. It can introduce security risks similar to those associated with eval because it generates a new function from a string of code, which can be a vector for injection attacks. Additionally, it impacts performance negatively as these functions are not optimized by the JavaScript engine.

Flagged example:

```js
var x = new Function("a", "b", "return a + b");
var x = Function("a", "b", "return a + b");
var x = Function.call(null, "a", "b", "return a + b");
var x = Function.apply(null, ["a", "b", "return a + b"]);
var x = Function.bind(null, "a", "b", "return a + b")();
var f = Function.bind(null, "a", "b", "return a + b");
```

Accepted example:

```js
let x = function (a, b) {
  return a + b;
};
```

#### [ ] `eslint/no-return-assign`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.10
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-return-assign.html
- What it does: Disallows assignment operators in return statements.
- Covers: Assignment is allowed by js in return expressions, but usually, an expression with only one equal sign is intended to be a comparison. However, because of the missing equal sign, this turns to assignment, which is valid js code Because of this ambiguity, it's considered a best practice to not use assignment in return statements.

Flagged example:

```js
() => (a = b);
function x() {
  return (a = b);
}
```

Accepted example:

```js
() => (a = b);
function x() {
  var result = (a = b);
  return result;
}
```

#### [ ] `eslint/no-script-url`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-script-url.html
- What it does: Disallow javascript: URLs.
- Covers: Using javascript: URLs is considered by some as a form of eval. Code passed in javascript: URLs must be parsed and evaluated by the browser in the same way that eval is processed. This can lead to security and performance issues.

Flagged example:

```javascript
location.href = "javascript:void(0)";

location.href = `javascript:void(0)`;
```

Accepted example:

```javascript
location.href = "javascript:void(0)";

location.href = `javascript:void(0)`;
```

#### [ ] `eslint/no-template-curly-in-string`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-template-curly-in-string.html
- What it does: Disallow template literal placeholder syntax in regular strings. This rule ensures that expressions like ${variable} are only used within template literals, avoiding incorrect usage in regular strings.
- Covers: ECMAScript 6 allows programmers to create strings containing variables or expressions using template literals. This is done by embedding expressions like ${variable} between backticks. If regular quotes (' or ") are used with template literal syntax, it results in the literal string "${variable}" instead of evaluating the expression. This rule helps to avoid this mistake, ensuring that expressions are correctly evaluated inside template literals.

Flagged example:

```javascript
"Hello ${name}!";
"Hello ${name}!";
"Time: ${12 * 60 * 60 * 1000}";
```

Accepted example:

```javascript
`Hello ${name}!`;
`Time: ${12 * 60 * 60 * 1000}`;
templateFunction`Hello ${name}`;
```

#### [ ] `eslint/no-ternary`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-ternary.html
- What it does: Disallow ternary operators.
- Covers: The ternary operator is used to conditionally assign a value to a variable. Some believe that the use of ternary operators leads to unclear code.

Flagged example:

```javascript
var foo = isBar ? baz : qux;
```

Accepted example:

```javascript
let foo;

if (isBar) {
  foo = baz;
} else {
  foo = qux;
}
```

#### [ ] `eslint/no-useless-computed-key`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 1.16.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-computed-key.html
- What it does: Disallow unnecessary computed property keys in objects and classes.
- Covers: It's unnecessary to use computed properties with literals such as:

Flagged example:

```js
const a = { ["0"]: 0 };
const b = { ["0+1,234"]: 0 };
const c = { [0]: 0 };
const e = { ["x"]() {} };

class Foo {
  ["foo"] = "bar";
  [0]() {}
  static ["foo"] = "bar";
  get ["b"]() {}
// ...
```

Accepted example:

```js
const a = { a: 0 };
const b = { 0: 0 };
const c = { x() {} };
const e = { "0+1,234": 0 };

class Foo {
  foo = "bar";
  0() {}
  a() {}
  static foo = "bar";
// ...
```

#### [ ] `eslint/object-shorthand`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/object-shorthand.html
- What it does: Require or disallow method and property shorthand syntax for object literals
- Covers: Stylistic preference

Example signal: Covers object shorthand concerns.

#### [ ] `eslint/operator-assignment`

- Category: style
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.15.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/operator-assignment.html
- What it does: This rule requires or disallows assignment operator shorthand where possible. It encourages the use of shorthand assignment operators like +=, -=, *=, /=, etc. to make the code more concise and readable.
- Covers: JavaScript provides shorthand operators that combine variable assignment and simple mathematical operations. Failing to use these shorthand operators can lead to unnecessarily verbose code and can be seen as a missed opportunity for clarity and simplicity.

Flagged example:

```js
x = x + y;
x = y * x;
x[0] = x[0] / y;
x.y = x.y << z;
```

Accepted example:

```js
x = y;
x += y;
x = y * z;
x = x * y * z;
x[0] /= y;
x[foo()] = x[foo()] % 2;
x = y + x; // `+` is not always commutative (e.g. x = "abc")
```

#### [ ] `eslint/prefer-arrow-callback`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.65.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-arrow-callback.html
- What it does: Requires using arrow functions for callbacks.
- Covers: Arrow functions are generally better suited for callbacks because they:

Flagged example:

```js
foo(function (a) {
  return a;
});
foo(
  function () {
    return this.a;
  }.bind(this),
);
```

Accepted example:

```js
foo((a) => a);
foo(function* () {
  yield;
});
foo(function () {
  this;
});
foo(function bar() {
  bar();
});
```

#### [ ] `eslint/prefer-const`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 1.43.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-const.html
- What it does: Requires const declarations for variables that are never reassigned after their initial declaration.
- Covers: If a variable is never reassigned, using the const declaration is better. const declaration tells readers, "this variable is never reassigned," reducing cognitive load and improving maintainability.

Flagged example:

```js
let a = 3;
console.log(a);

let b;
b = 0;
console.log(b);

for (let i in [1, 2, 3]) {
  console.log(i);
}
```

Accepted example:

```js
const a = 0;

let a;
a = 0;
a = 1;

let a;
if (true) {
  a = 0;
}
// ...
```

#### [ ] `eslint/prefer-destructuring`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 1.10.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-destructuring.html
- What it does: Require destructuring from arrays and/or objects.
- Covers: With JavaScript ES2015, a new syntax was added for creating variables from an array index or object property, called destructuring. This rule enforces usage of destructuring instead of accessing a property through a member expression.

Flagged example:

```js
// With `array` enabled
const foo = array[0];
bar.baz = array[0];
// With `object` enabled
const qux = object.qux;
const quux = object["quux"];
```

Accepted example:

```js
// With `array` enabled
const [foo] = array;
const arr = array[someIndex];
[bar.baz] = array;

// With `object` enabled
const { baz } = object;
const obj = object.bar;
```

#### [ ] `eslint/prefer-exponentiation-operator`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-exponentiation-operator.html
- What it does: Disallow the use of Math.pow in favor of the ** operator.
- Covers: Introduced in ES2016, the infix exponentiation operator ** is an alternative for the standard Math.pow function. Infix notation is considered to be more readable and thus more preferable than the function notation.

Flagged example:

```javascript
Math.pow(a, b);
```

Accepted example:

```javascript
a ** b;
```

#### [ ] `eslint/prefer-named-capture-group`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.68.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-named-capture-group.html
- What it does: Enforces the use of named capture groups in regular expressions.
- Covers: Unnamed capturing groups ((...)) are referenced only by position, which makes the regex harder to read and maintain. When the pattern changes, index-based references silently break. Named groups ((?<name>...)) make the intent explicit and allow references by name (e.g. match.groups.year), which is more robust.

Flagged example:

```js
const re = /([0-9]{4})-([0-9]{2})/;
const match = re.exec(str);
const year = match[1]; // fragile index
```

Accepted example:

```js
const re = /(?<year>[0-9]{4})-(?<month>[0-9]{2})/;
const match = re.exec(str);
const year = match.groups.year; // explicit name

// Non-capturing groups are always fine
const parts = /(?:[0-9]{4})/;
```

#### [ ] `eslint/prefer-numeric-literals`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-numeric-literals.html
- What it does: Disallow parseInt() and Number.parseInt() in favor of binary, octal, and hexadecimal literals.
- Covers: The parseInt() and Number.parseInt() functions can be used to turn binary, octal, and hexadecimal strings into integers. As binary, octal, and hexadecimal literals are supported in ES2015, this rule encourages use of those numeric literals instead of parseInt() or Number.parseInt().

Flagged example:

```javascript
parseInt("111110111", 2) === 503;
parseInt(`111110111`, 2) === 503;
parseInt("767", 8) === 503;
parseInt("1F7", 16) === 503;
Number.parseInt("111110111", 2) === 503;
Number.parseInt("767", 8) === 503;
Number.parseInt("1F7", 16) === 503;
```

Accepted example:

```javascript
parseInt("111110111", 2) === 503;
parseInt(`111110111`, 2) === 503;
parseInt("767", 8) === 503;
parseInt("1F7", 16) === 503;
Number.parseInt("111110111", 2) === 503;
Number.parseInt("767", 8) === 503;
Number.parseInt("1F7", 16) === 503;
```

#### [ ] `eslint/prefer-object-has-own`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.11.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-object-has-own.html
- What it does: Disallow use of Object.prototype.hasOwnProperty.call() and prefer use of Object.hasOwn()
- Covers: It is very common to write code like:

Flagged example:

```js
Object.prototype.hasOwnProperty.call(obj, "a");
Object.hasOwnProperty.call(obj, "a");
({}).hasOwnProperty.call(obj, "a");
const hasProperty = Object.prototype.hasOwnProperty.call(object, property);
```

Accepted example:

```js
Object.hasOwn(obj, "a");
const hasProperty = Object.hasOwn(object, property);
```

#### [ ] `eslint/prefer-object-spread`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.15.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-object-spread.html
- What it does: Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead.
- Covers: When Object.assign is called using an object literal as the first argument, this rule requires using the object spread syntax instead. This rule also warns on cases where an Object.assign call is made using a single argument that is an object literal, in this case, the Object.assign call is not needed.

Flagged example:

```js
Object.assign({}, foo);

Object.assign({}, { foo: "bar" });

Object.assign({ foo: "bar" }, baz);

Object.assign({}, baz, { foo: "bar" });

Object.assign({}, { ...baz });

// ...
```

Accepted example:

```js
({ ...foo });

({ ...baz, foo: "bar" });

// Any Object.assign call without an object literal as the first argument
Object.assign(foo, { bar: baz });

Object.assign(foo, bar);

Object.assign(foo, { bar, baz });
// ...
```

#### [ ] `eslint/prefer-promise-reject-errors`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-promise-reject-errors.html
- What it does: Require using Error objects as Promise rejection reasons.
- Covers: It is considered good practice to only pass instances of the built-in Error object to the reject() function for user-defined errors in Promises. Error objects automatically store a stack trace, which can be used to debug an error by determining where it came from. If a Promise is rejected with a non-Error value, it can be difficult to determine where the rejection occurred.

Flagged example:

```js
Promise.reject("something bad happened");

Promise.reject(5);

Promise.reject();

new Promise(function (resolve, reject) {
  reject("something bad happened");
});

// ...
```

Accepted example:

```js
Promise.reject(new Error("something bad happened"));

Promise.reject(new TypeError("something bad happened"));

new Promise(function (resolve, reject) {
  reject(new Error("something bad happened"));
});

var foo = getUnknownValue();
Promise.reject(foo);
```

#### [ ] `eslint/prefer-regex-literals`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.64.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-regex-literals.html
- What it does: Disallow use of the RegExp constructor in favor of regular expression literals.
- Covers: There are two ways to create a regular expression:

Flagged example:

```js
new RegExp("abc");
new RegExp("abc", "u");
RegExp("abc");
RegExp("abc", "u");
new RegExp("\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d");
RegExp(`^\\d\\.$`);
new RegExp(String.raw`^\d\.$`);
```

Accepted example:

```js
/abc/;
/abc/u;
/\d\d\.\d\d\.\d\d\d\d/;
/^\d\.$/;
// RegExp constructor is allowed for dynamically generated regular expressions
new RegExp(pattern);
RegExp("abc", flags);
new RegExp(prefix + "abc");
RegExp(`${prefix}abc`);
new RegExp(String.raw`^\d\. ${suffix}`);
```

#### [ ] `eslint/prefer-rest-params`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-rest-params.html
- What it does: Disallows the use of the arguments object and instead enforces the use of rest parameters.
- Covers: The arguments object does not have methods from Array.prototype, making it inconvenient for array-like operations. Using rest parameters provides a more intuitive and efficient way to handle variadic arguments.

Flagged example:

```javascript
function foo() {
  console.log(arguments);
}

function foo(action) {
  var args = Array.prototype.slice.call(arguments, 1);
  action.apply(null, args);
}

function foo(action) {
// ...
```

Accepted example:

```javascript
function foo(...args) {
  console.log(args);
}

function foo(action, ...args) {
  action.apply(null, args); // Or use `action(...args)` (related to `prefer-spread` rule).
}

// Note: Implicit `arguments` can be shadowed.
function foo(arguments) {
// ...
```

#### [ ] `eslint/prefer-spread`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.17
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-spread.html
- What it does: Require spread operators instead of .apply()
- Covers: Before ES2015, one must use Function.prototype.apply() to call variadic functions.

Flagged example:

```javascript
foo.apply(undefined, args);
foo.apply(null, args);
obj.foo.apply(obj, args);
```

Accepted example:

```javascript
// Using spread syntax
foo(...args);
obj.foo(...args);

// The `this` binding is different.
foo.apply(obj, args);
obj.foo.apply(null, args);
obj.foo.apply(otherObj, args);

// The argument list is not variadic.
// ...
```

#### [ ] `eslint/prefer-template`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-template.html
- What it does: Require template literals instead of string concatenation.
- Covers: In ES2015 (ES6), we can use template literals instead of string concatenation.

Flagged example:

```js
const str = "Hello, " + name + "!";
const str1 = "Time: " + 12 * 60 * 60 * 1000;
```

Accepted example:

```js
const str = "Hello World!";
const str2 = `Time: ${12 * 60 * 60 * 1000}`;
const str4 = "Hello, " + "World!";
```

#### [ ] `eslint/sort-imports`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.4.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-imports.html
- What it does: This rule checks all import declarations and verifies that all imports are first sorted by the used member syntax and then alphabetically by the first member or alias name.
- Covers: Consistent import sorting can be useful for readability and maintainability of code.

Flagged example:

```javascript
import { b, a, c } from "foo.js";

import d from "foo.js";
import e from "bar.js";
```

Accepted example:

```javascript
import { b, a, c } from "foo.js";

import d from "foo.js";
import e from "bar.js";
```

#### [ ] `eslint/sort-keys`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.9.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-keys.html
- What it does: When declaring multiple properties, sorting property names alphabetically makes it easier to find and/or diff necessary properties at a later time.
- Covers: Unsorted property keys can make the code harder to read and maintain.

Flagged example:

```js
let myObj = {
  c: 1,
  a: 2,
};
```

Accepted example:

```js
let myObj = {
  a: 2,
  c: 1,
};
```

#### [ ] `eslint/vars-on-top`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/vars-on-top.html
- What it does: Enforces that all var declarations are placed at the top of their containing scope.
- Covers: In JavaScript, var declarations are hoisted to the top of their containing scope. Placing var declarations at the top explicitly improves code readability and maintainability by making the scope of variables clear.

Flagged example:

```js
function doSomething() {
  if (true) {
    var first = true;
  }
  var second;
}

function doSomethingElse() {
  for (var i = 0; i < 10; i++) {}
}
// ...
```

Accepted example:

```js
function doSomething() {
  var first;
  var second;
  if (true) {
    first = true;
  }
}

function doSomethingElse() {
  var i;
// ...
```

#### [ ] `eslint/yoda`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.14.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/yoda.html
- What it does: Require or disallow "Yoda" conditions. This rule aims to enforce consistent style of conditions which compare a variable to a literal value.
- Covers: Yoda conditions are so named because the literal value of the condition comes first while the variable comes second. For example, the following is a Yoda condition:

Flagged example:

```js
if ("red" === color) {
  // ...
}
if (`red` === color) {
  // ...
}
if (`red` === `${color}`) {
  // ...
}

// ...
```

Accepted example:

```js
if (5 & value) {
  // ...
}

if (value === "red") {
  // ...
}

if (value === `red`) {
  // ...
// ...
```

### suspicious

#### [ ] `eslint/block-scoped-var`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.16.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/block-scoped-var.html
- What it does: Enforces that variables are both declared and used within the same block scope. This rule prevents accidental use of variables outside their intended block, mimicking C-style block scoping in JavaScript.
- Covers: JavaScript's var declarations are hoisted to the top of their enclosing function, which can cause variables declared in a block (e.g., inside an if or for) to be accessible outside of it. This can lead to hard-to-find bugs. By enforcing block scoping, this rule helps avoid hoisting issues and aligns more closely with how other languages treat block variables.

Flagged example:

```js
/* block-scoped-var: "error" */

function doIf() {
  if (true) {
    var build = true;
  }
  console.log(build);
}

function doLoop() {
// ...
```

Accepted example:

```js
/* block-scoped-var: "error" */

function doIf() {
  var build;
  if (true) {
    build = true;
  }
  console.log(build);
}

// ...
```

#### [ ] `eslint/no-extend-native`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extend-native.html
- What it does: Prevents extending native global objects such as Object, String, or Array with new properties.
- Covers: Extending native objects can cause unexpected behavior and conflicts with other code.

Flagged example:

```js
Object.prototype.p = 0;
Object.defineProperty(Array.prototype, "p", { value: 0 });
```

Accepted example:

```js
x.prototype.p = 0;
Object.defineProperty(x.prototype, "p", { value: 0 });
```

#### [ ] `eslint/no-extra-bind`

- Category: suspicious
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.1.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-bind.html
- What it does: Disallow unnecessary calls to .bind().
- Covers: This rule is aimed at avoiding the unnecessary use of bind() and as such will warn whenever an immediately-invoked function expression (IIFE) is using bind() and doesn't have an appropriate this value. This rule won't flag usage of bind() that includes function argument binding.

Flagged example:

```js
const x = function () {
  foo();
}.bind(bar);

const z = (() => {
  this.foo();
}).bind(this);
```

Accepted example:

```js
const x = function () {
  this.foo();
}.bind(bar);
const y = function (a) {
  return a + 1;
}.bind(foo, bar);
```

#### [ ] `eslint/no-implied-eval`

- Category: suspicious
- Default: yes
- Fix: none
- Type-aware: no
- Added: 1.66.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implied-eval.html
- What it does: Disallows passing strings to setTimeout(), setInterval(), and execScript().
- Covers: Passing a string to these APIs evaluates the string as JavaScript source text at runtime. This has many of the same security, readability, and performance problems as eval(). Pass a function instead.

Flagged example:

```js
setTimeout("alert('Hi!')", 100);
setInterval("doWork()", 1000);
window.setTimeout("doWork()", 100);
```

Accepted example:

```js
setTimeout(() => alert("Hi!"), 100);
setInterval(doWork, 1000);
window.setTimeout(doWork, 100);
```

#### [ ] `eslint/no-new`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new.html
- What it does: Disallow new operators outside of assignments or comparisons.
- Covers: Calling new without assigning or comparing it the reference is thrown away and in many cases the constructor can be replaced with a function.

Flagged example:

```javascript
new Person();

() => {
  new Date();
};
```

Accepted example:

```javascript
var a = new Date()(() => new Date());
```

#### [ ] `eslint/no-shadow`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.48.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-shadow.html
- What it does: Disallows variable declarations from shadowing variables declared in the outer scope.
- Covers: Shadowing is the process by which a local variable shares the same name as a variable in its containing scope. This can cause confusion, as it may be unclear which variable is being referenced, and can lead to bugs that are difficult to diagnose.

Flagged example:

```js
var x = 1;
function foo() {
  var x = 2; // x shadows the outer x
}
```

Accepted example:

```js
var x = 1;
function foo() {
  var y = 2; // different name, no shadowing
}
```

#### [ ] `eslint/no-underscore-dangle`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.62.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-underscore-dangle.html
- What it does: Disallows dangling underscores in identifiers.
- Covers: There is a long history of using _ as a prefix or suffix for private members in JavaScript. It is however recommended to use the formal private class feature introduced in ES2022. See <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements> for more information.

Flagged example:

```js
let foo_;
const __proto__ = {};
foo._bar();
```

Accepted example:

```js
const _ = require("underscore");
const obj = _.contains(items, item);
obj.__proto__ = {};
const file = __filename;
function foo(_bar) {}
const bar = { onClick(_bar) {} };
const baz = (_bar) => {};
```

#### [ ] `eslint/no-unexpected-multiline`

- Category: suspicious
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.9.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unexpected-multiline.html
- What it does: In most cases, semicolons are not required in JavaScript in order for code to be parsed and executed as expected. Typically this occurs because semicolons are automatically inserted based on a fixed set of rules. This rule exists to detect those cases where a semicolon is NOT inserted automatically, and may be parsed differently than expected.
- Covers: Code that has unexpected newlines may be parsed and executed differently than what the developer intended. This can lead to bugs that are difficult to track down.

Flagged example:

```js
var a = b(x || y).doSomething();

var a = b[(a, b, c)].forEach(doSomething);

let x = (function () {})`hello`;

foo / bar / g.test(baz);
```

Accepted example:

```js
var a = b;
(x || y).doSomething();

var a = b;
[a, b, c].forEach(doSomething);

let x = function () {};
`hello`;

foo;
// ...
```

#### [ ] `eslint/no-unmodified-loop-condition`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.48.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unmodified-loop-condition.html
- What it does: Disallow references in loop conditions that are never modified within the loop.
- Covers: A loop condition that depends on values that never change within the loop body can cause infinite loops or logic bugs.

Flagged example:

```js
let done = false;
while (!done) {
  work();
}
```

Accepted example:

```js
let done = false;
while (!done) {
  done = checkDone();
}
```

#### [ ] `eslint/no-unneeded-ternary`

- Category: suspicious
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.15.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unneeded-ternary.html
- What it does: Disallow ternary operators when simpler alternatives exist.
- Covers: It's a common mistake in JavaScript to use a conditional expression to select between two Boolean values instead of using ! to convert the test to a Boolean.

Flagged example:

```js
const isYes = answer === 1 ? true : false;
const isNo = answer === 1 ? false : true;

foo(bar ? bar : 1);
```

Accepted example:

```js
const isYes = answer === 1;
const isNo = answer !== 1;

foo(bar || 1);
```

#### [ ] `eslint/no-useless-concat`

- Category: suspicious
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-concat.html
- What it does: Disallow unnecessary concatenation of literals or template literals.
- Covers: It's unnecessary to concatenate two strings together when they could be combined into a single literal.

Flagged example:

```javascript
var foo = "a" + "b";
```

Accepted example:

```javascript
var foo = "a" + bar;

// When the string concatenation is multiline
var foo = "a" + "b" + "c";
```

#### [ ] `eslint/no-useless-constructor`

- Category: suspicious
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.4.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-constructor.html
- What it does: Disallow constructors that can be safely removed without changing how the class works.
- Covers: ES2015 provides a default class constructor if one is not specified. As such, it is unnecessary to provide an empty constructor or one that simply delegates into its parent class.

Flagged example:

```javascript
class A {
  constructor() {}
}

class B extends A {
  constructor(...args) {
    super(...args);
  }
}
```

Accepted example:

```javascript
class A {}

class B {
  constructor() {
    doSomething();
  }
}

class C extends A {
  constructor() {
// ...
```

#### [ ] `eslint/preserve-caught-error`

- Category: suspicious
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 1.16.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/preserve-caught-error.html
- What it does: Enforces that when re-throwing an error in a catch block, the original error is preserved using the 'cause' property.
- Covers: Re-throwing an error without preserving the original error loses important debugging information and makes it harder to trace the root cause of issues.

Flagged example:

```js
try {
  doSomething();
} catch (err) {
  throw new Error("Something failed");
}
```

Accepted example:

```js
try {
  doSomething();
} catch (err) {
  throw new Error("Something failed", { cause: err });
}
```

### restriction

#### [ ] `eslint/class-methods-use-this`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.16.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/class-methods-use-this.html
- What it does: Enforce that class methods utilize this.
- Covers: For class methods that do not use this, you should consider converting them to static methods. This is not always possible or desirable, but it can help clarify that the method does not rely on instance state.

Flagged example:

```js
class A {
  foo() {
    console.log("Hello World");
  }
}
```

Accepted example:

```js
class A {
  foo() {
    this.bar = "Hello World"; // OK, this is used
  }
}

class B {
  constructor() {
    // OK. constructor is exempt
  }
// ...
```

#### [ ] `eslint/complexity`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.37.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/complexity.html
- What it does: Enforces a maximum cyclomatic complexity in a program, which is the number of linearly independent paths in a program.
- Covers: Having high code complexity reduces code readability. This rule aims to make the code easier to follow by reducing the number of branches in the program.

Flagged example:

```js
function foo() {
  if (foo1) {
    return x1; // 1st path
  } else if (foo2) {
    return x2; // 2nd path
  } else {
    return x3; // 3rd path
  }
}

// ...
```

Accepted example:

```js
// This example is taken directly from ESLint documentation
function foo() {
  // this function has complexity = 1
  class C {
    x = a + b; // this initializer has complexity = 1
    y = c || d; // this initializer has complexity = 2
    z = e && f; // this initializer has complexity = 2

    static p = g || h; // this initializer has complexity = 2
    static q = i ? j : k; // this initializer has complexity = 2
// ...
```

#### [ ] `eslint/default-case`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-case.html
- What it does: Enforces that all switch statements include a default case, unless explicitly marked with a configured comment.
- Covers: Without a default case, it is unclear whether the omission was intentional or an oversight. Adding a default or a special comment makes the code more explicit and reduces mistakes.

Flagged example:

```js
switch (foo) {
  case 1:
    break;
}
```

Accepted example:

```js
switch (a) {
  case 1:
    break;
  default:
    break;
}

switch (a) {
  case 1:
    break;
// ...
```

#### [ ] `eslint/no-alert`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-alert.html
- What it does: Disallow the use of alert, confirm, and prompt.
- Covers: JavaScript's alert, confirm, and prompt functions are widely considered to be obtrusive as UI elements and should be replaced by a more appropriate custom UI implementation. Furthermore, alert is often used while debugging code, which should be removed before deployment to production.

Flagged example:

```js
alert("here!");

confirm("Are you sure?");

prompt("What's your name?", "John Doe");
```

Accepted example:

```js
customAlert("Something happened!");

customConfirm("Are you sure?");

customPrompt("Who are you?");

function foo() {
  var alert = myCustomLib.customAlert;
  alert();
}
```

#### [ ] `eslint/no-bitwise`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-bitwise.html
- What it does: Disallow bitwise operators.
- Covers: The use of bitwise operators in JavaScript is very rare and often & or | is simply a mistyped && or ||, which will lead to unexpected behavior.

Flagged example:

```javascript
var x = y | z;
```

Accepted example:

```javascript
var x = y || z;
```

#### [ ] `eslint/no-console`

- Category: restriction
- Default: no
- Fix: conditional suggestion
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-console.html
- What it does: Disallow the use of console.
- Covers: In JavaScript that is designed to be executed in the browser, it's considered a best practice to avoid using methods on console. Such messages are considered to be for debugging purposes and therefore not suitable to ship to the client. In general, calls using console should be stripped before being pushed to production.

Flagged example:

```javascript
console.log("Log a debug level message.");
console.warn("Log a warn level message.");
console.error("Log an error level message.");
console.log = foo();
```

Accepted example:

```javascript
// custom console
Console.log("Hello world!");
```

#### [ ] `eslint/no-div-regex`

- Category: restriction
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-div-regex.html
- What it does: Disallow equal signs explicitly at the beginning of regular expressions.
- Covers: Characters /= at the beginning of a regular expression literal can be confused with a division assignment operator.

Flagged example:

```javascript
function bar() {
  return /=foo/;
}
```

Accepted example:

```javascript
function bar() {
  return /[=]foo/;
}
```

#### [ ] `eslint/no-empty`

- Category: restriction
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty.html
- What it does: Disallows empty block statements.
- Covers: Empty block statements, while not technically errors, usually occur due to refactoring that wasn't completed. They can cause confusion when reading code.

Flagged example:

```javascript
if (condition) {
}
```

Accepted example:

```javascript
if (condition) {
  throw new Error("condition should be false");
}
```

#### [ ] `eslint/no-empty-function`

- Category: restriction
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.3.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-function.html
- What it does: Disallows the usage of empty functions.
- Covers: Empty functions can reduce readability because readers need to guess whether it's intentional or not. So writing a clear comment for empty functions is a good practice.

Flagged example:

```typescript
function foo() {}

const bar = () => {};

class Foo {
  constructor();
  someMethod() {}
  set bar(value) {}
}
```

Accepted example:

```typescript
function foo() {
  // do nothing
}

function foo() {
  return;
}
const add = (a, b) => a + b;

class Foo {
// ...
```

#### [ ] `eslint/no-eq-null`

- Category: restriction
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-eq-null.html
- What it does: Disallow null comparisons without type-checking operators.
- Covers: Comparing to null without a type-checking operator (== or !=), can have unintended results as the comparison will evaluate to true when comparing to not just a null, but also an undefined value.

Flagged example:

```js
if (foo == null) {
  bar();
}
if (baz != null) {
  bar();
}
```

Accepted example:

```js
if (foo === null) {
  bar();
}

if (baz !== null) {
  bar();
}

if (bang === undefined) {
  bar();
// ...
```

#### [ ] `eslint/no-implicit-globals`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.65.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implicit-globals.html
- What it does: Disallows declarations in the global scope, global variable leaks, and writes or redeclarations of read-only globals.
- Covers: Browser scripts share a global scope. Top-level var and function declarations, and assignments to undeclared variables in sloppy mode, create globals that can collide with other scripts.

Flagged example:

```js
var foo = 1;
function bar() {}
baz = 1;
```

Accepted example:

```js
window.foo = 1;
(function () {
  var bar = 1;
})();
```

#### [ ] `eslint/no-param-reassign`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-param-reassign.html
- What it does: Disallow reassigning function parameters or, optionally, their properties.
- Covers: Reassigning parameters can lead to unexpected behavior, especially when relying on the original arguments passed into the function. Mutating parameter properties can be similarly surprising and harder to reason about.

Example signal: Flags param reassign patterns in eslint code.

#### [ ] `eslint/no-plusplus`

- Category: restriction
- Default: no
- Fix: conditional suggestion
- Type-aware: no
- Added: 0.9.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-plusplus.html
- What it does: Disallow the unary operators ++ and --.
- Covers: Because the unary ++ and -- operators are subject to automatic semicolon insertion, differences in whitespace can change the semantics of source code. For example, these two code blocks are not equivalent:

Flagged example:

```js
var x = 0;
x++;
var y = 0;
y--;
for (let i = 0; i < l; i++) {
  doSomething(i);
}
```

Accepted example:

```js
var x = 0;
x += 1;
var y = 0;
y -= 1;
for (let i = 0; i < l; i += 1) {
  doSomething(i);
}
```

#### [ ] `eslint/no-proto`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-proto.html
- What it does: Disallow the use of the __proto__ property.
- Covers: The __proto__ property has been deprecated as of ECMAScript 3.1 and shouldn't be used in new code. Use Object.getPrototypeOf and Object.setPrototypeOf instead.

Flagged example:

```javascript
var a = obj.__proto__;

var a = obj["__proto__"];

obj.__proto__ = b;

obj["__proto__"] = b;
```

Accepted example:

```javascript
var a = obj.__proto__;

var a = obj["__proto__"];

obj.__proto__ = b;

obj["__proto__"] = b;
```

#### [ ] `eslint/no-regex-spaces`

- Category: restriction
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-regex-spaces.html
- What it does: Disallow 2+ consecutive spaces in regular expressions.
- Covers: In a regular expression, it is hard to tell how many spaces are intended to be matched. It is better to use only one space and then specify how many spaces are expected using a quantifier.

Flagged example:

```javascript
var re = /foo   bar/;
```

Accepted example:

```javascript
var re = /foo   bar/;
```

#### [ ] `eslint/no-restricted-globals`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-globals.html
- What it does: Specify global variable names that should not be used in your application.
- Covers: Disallowing usage of specific global variables can be useful if you want to allow a set of global variables by enabling an environment, but still want to disallow some of those.

Example signal: Flags restricted globals patterns in eslint code.

#### [ ] `eslint/no-restricted-imports`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-imports.html
- What it does: This rule allows you to specify imports that you don't want to use in your application. It applies to static imports only, not dynamic ones.
- Covers: Some imports might not make sense in a particular environment. For example, Node.js' fs module would not make sense in an environment that didn't have a file system.

Flagged example:

```js
/* no-restricted-imports: ["error", "disallowed-import"] */

import foo from "disallowed-import";
export * from "disallowed-import";
```

Accepted example:

```js
/* no-restricted-imports: ["error", "fs"] */

import crypto from "crypto";
export * from "bar";
```

#### [ ] `eslint/no-restricted-properties`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.63.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-properties.html
- What it does: This rule allows you to disallow access to certain properties on certain objects.
- Covers: Certain properties on objects may be disallowed in a codebase. This is useful for deprecating an API or restricting usage of a module's methods. For example, you may want to disallow using describe.only when using Mocha or telling people to use Object.assign instead of \_.extend.

Flagged example:

```js
/* no-restricted-properties: ["error", { "object": "JSON", "property": "parse" }] */

JSON.parse('{ "json": "here" }'); // 'JSON.parse' is restricted from being used.
```

Accepted example:

```js
/* no-restricted-properties: ["error", { "object": "JSON", "property": "parse" }] */

JSON.stringify({ json: "here" });
```

#### [ ] `eslint/no-sequences`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-sequences.html
- What it does: Disallows the use of the comma operator.
- Covers: The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand. However, this frequently obscures side effects, and its use is often an accident.

Flagged example:

```javascript
((foo = doSomething()), val);

(0, eval("doSomething();"));

// Arrow function body needs double parentheses
const fn = () => (doSomething(), val);

// with allowInParentheses: false
foo = (doSomething(), val);
```

Accepted example:

```javascript
foo = (doSomething(), val);

(0, eval)("doSomething();");

// Single extra parentheses is enough for conditions
do {} while ((doSomething(), !!test));

for (i = 0, j = 10; i < j; i++, j--) {}

// Arrow function body needs double parentheses
// ...
```

#### [ ] `eslint/no-undefined`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.5.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-undefined.html
- What it does: Disallow the use of undefined as an identifier.
- Covers: Using undefined directly can lead to bugs, since it can be shadowed or overwritten in JavaScript. It's safer and more intentional to use null or rely on implicit undefined (e.g., missing return) to avoid accidental issues.

Flagged example:

```javascript
var foo = undefined;

var undefined = "foo";

if (foo === undefined) {
  // ...
}

function baz(undefined) {
  // ...
// ...
```

Accepted example:

```javascript
var foo = void 0;

var Undefined = "foo";

if (typeof foo === "undefined") {
  // ...
}

global.undefined = "foo";

// ...
```

#### [ ] `eslint/no-use-before-define`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-use-before-define.html
- What it does: Disallows using variables before they are defined.
- Covers: Referencing identifiers before their declarations can hide bugs and make code order-dependent and difficult to reason about.

Flagged example:

```ts
new A();
var A = class {};
```

Accepted example:

```ts
var A = class {};
new A();
```

#### [ ] `eslint/no-var`

- Category: restriction
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-var.html
- What it does: ECMAScript 2015 allows programmers to create variables with block scope instead of function scope using the let and const keywords. Block scope is common in many other programming languages and helps programmers avoid mistakes.
- Covers: Using var in an ES2015 environment triggers this error

Flagged example:

```javascript
var x = "y";
var CONFIG = {};
```

Accepted example:

```javascript
let x = "y";
const CONFIG = {};
```

#### [ ] `eslint/no-void`

- Category: restriction
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.2.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-void.html
- What it does: Disallows the use of the void operator.
- Covers: The void operator is often used to get undefined, but this is unnecessary because undefined can be used directly instead.

Flagged example:

```ts
void 0;
var foo = void 0;
```

Accepted example:

```ts
"var foo = bar()";
"foo.void()";
"foo.void = bar";
```

#### [ ] `eslint/unicode-bom`

- Category: restriction
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.3.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/unicode-bom.html
- What it does: Require or disallow Unicode byte order mark (BOM)
- Covers: The Unicode Byte Order Mark (BOM) is used to specify whether code units are big endian or little endian. That is, whether the most significant or least significant bytes come first. UTF-8 does not require a BOM because byte ordering does not matter when characters are a single byte. Since UTF-8 is the dominant encoding of the web, we make "never" the default option.

Flagged example:

```javascript
var a = 123;
```

Accepted example:

```javascript
var a = 123;
```

### correctness

#### [ ] `eslint/constructor-super`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/constructor-super.html
- What it does: Requires super() calls in constructors of derived classes and disallows super() calls in constructors of non-derived classes.
- Covers: In JavaScript, calling super() in the constructor of a derived class (a class that extends another class) is required. Failing to do so will result in a ReferenceError at runtime. Conversely, calling super() in a non-derived class is a syntax error.

Flagged example:

```js
// Missing super() call
class A extends B {
    constructor() { }
}

// super() in non-derived class
class A {
    constructor() {
        super();
    }
// ...
```

Accepted example:

```js
// Proper super() call in derived class
class A extends B {
  constructor() {
    super();
  }
}

// No super() in non-derived class
class A {
  constructor() {}
// ...
```

#### [ ] `eslint/for-direction`

- Category: correctness
- Default: yes
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/for-direction.html
- What it does: Disallow for loops where the update clause moves the counter in the wrong direction, preventing the loop from reaching its stop condition.
- Covers: A for loop with a stop condition that can never be reached will run infinitely. While infinite loops can be intentional, they are usually written as while loops. More often, an infinite for loop is a bug.

Flagged example:

```js
/* for-direction: "error" */

for (var i = 0; i < 10; i--) {}

for (var i = 10; i >= 0; i++) {}

for (var i = 0; i > 10; i++) {}

for (var i = 0; 10 > i; i--) {}

// ...
```

Accepted example:

```js
/* for-direction: "error" */

for (var i = 0; i < 10; i++) {}

for (var i = 0; 10 > i; i++) {
  // with counter "i" on the right
}

for (let i = 10; i >= 0; i += this.step) {
  // direction unknown
// ...
```

#### [ ] `eslint/getter-return`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/getter-return.html
- What it does: Requires all getters to have a return statement.
- Covers: Getters should always return a value. If they don't, it's probably a mistake.

Flagged example:

```javascript
class Person {
  get name() {
    // no return
  }
}

const obj = {
  get foo() {
    // object getter are also checked
  },
// ...
```

Accepted example:

```javascript
class Person {
  get name() {
    return this._name;
  }
}
```

#### [ ] `eslint/no-async-promise-executor`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-async-promise-executor.html
- What it does: Disallow using an async function as a Promise executor.
- Covers: The new Promise constructor accepts an executor function as an argument, which has resolve and reject parameters that can be used to control the state of the created Promise. For example:

Flagged example:

```javascript
const foo = new Promise(async (resolve, reject) => {
  readFile("foo.txt", function (err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

// ...
```

Accepted example:

```javascript
const foo = new Promise((resolve, reject) => {
  readFile("foo.txt", function (err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

// ...
```

#### [ ] `eslint/no-caller`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-caller.html
- What it does: Disallow the use of arguments.caller or arguments.callee.
- Covers: The use of arguments.caller and arguments.callee make several code optimizations impossible. They have been deprecated in JavaScript, and their use is forbidden while in strict mode.

Flagged example:

```js
function foo(n) {
  if (n <= 0) {
    return;
  }

  arguments.callee(n - 1);
}

[1, 2, 3, 4, 5].map(function (n) {
  return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
// ...
```

Accepted example:

```js
function foo(n) {
  if (n <= 0) {
    return;
  }

  foo(n - 1);
}

[1, 2, 3, 4, 5].map(function factorial(n) {
  return !(n > 1) ? 1 : factorial(n - 1) * n;
// ...
```

#### [ ] `eslint/no-class-assign`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-class-assign.html
- What it does: Disallow reassigning class variables.
- Covers: ClassDeclaration creates a variable that can be re-assigned, but the re-assignment is a mistake in most cases.

Flagged example:

```javascript
class A {}
A = 0;
```

Accepted example:

```javascript
let A = class A {};
A = 0; // A is a variable.
```

#### [ ] `eslint/no-compare-neg-zero`

- Category: correctness
- Default: yes
- Fix: conditional fix or suggestion
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-compare-neg-zero.html
- What it does: Disallow comparing against -0
- Covers: The rule should warn against code that tries to compare against -0, since that will not work as intended. That is, code like x === -0 will pass for both +0 and -0. The author probably intended Object.is(x, -0).

Flagged example:

```javascript
if (x === -0) {
  // doSomething()...
}
```

Accepted example:

```javascript
if (x === 0) {
  // doSomething()...
}
```

#### [ ] `eslint/no-cond-assign`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-cond-assign.html
- What it does: Disallow assignment operators in conditional expressions.
- Covers: In conditional statements, it is very easy to mistype a comparison operator (such as ==) as an assignment operator (such as =).

Flagged example:

```js
// Check the user's job title
if ((user.jobTitle = "manager")) {
  // user.jobTitle is now incorrect
}
```

Accepted example:

```js
// Check the user's job title
if (user.jobTitle === "manager") {
  // correctly compared `jobTitle`
}
```

#### [ ] `eslint/no-const-assign`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-const-assign.html
- What it does: Disallow reassigning const variables.
- Covers: We cannot modify variables that are declared using the const keyword, as it will raise a runtime error.

Flagged example:

```js
const a = 0;
a = 1;

const b = 0;
b += 1;
```

Accepted example:

```js
const a = 0;
console.log(a);

var b = 0;
b += 1;
```

#### [ ] `eslint/no-constant-binary-expression`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constant-binary-expression.html
- What it does: Disallow expressions where the operation doesn't affect the value.
- Covers: Comparisons which will always evaluate to true or false and logical expressions (||, &&, ??) which either always short-circuit or never short-circuit are both likely indications of programmer error.

Flagged example:

```javascript
// One might think this would evaluate as `a + (b ?? c)`:
const x = a + b ?? c;

// But it actually evaluates as `(a + b) ?? c`. Since `a + b` can never be null,
// the `?? c` has no effect.

// Programmers coming from a language where objects are compared by value might expect this to work:
const isEmpty = x === [];

// However, this will always result in `isEmpty` being `false`.
```

Accepted example:

```javascript
const x = a + (b ?? c);

const isEmpty = x.length === 0;
```

#### [ ] `eslint/no-constant-condition`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constant-condition.html
- What it does: Disallow constant expressions in conditions.
- Covers: A constant expression (for example, a literal) as a test condition might be a typo or development trigger for a specific behavior.

Flagged example:

```js
if (false) {
  doSomethingUnfinished();
}

if (new Boolean(x)) {
  doSomethingAlways();
}
if ((x ||= true)) {
  doSomethingAlways();
}
// ...
```

Accepted example:

```js
if (x === 0) {
  doSomething();
}

while (typeof x === "undefined") {
  doSomething();
}
```

#### [ ] `eslint/no-control-regex`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-control-regex.html
- What it does: Disallows control characters and some escape sequences that match control characters in regular expressions.
- Covers: Control characters are special, invisible characters in the ASCII range 0-31. These characters are rarely used in JavaScript strings so a regular expression containing elements that explicitly match these characters is most likely a mistake.

Flagged example:

```javascript
var pattern1 = /\x00/;
var pattern2 = /\x0C/;
var pattern3 = /\x1F/;
var pattern4 = /\u000C/;
var pattern5 = /\u{C}/u;
var pattern6 = new RegExp("\x0C"); // raw U+000C character in the pattern
var pattern7 = new RegExp("\\x0C"); // \x0C pattern
```

Accepted example:

```javascript
var pattern1 = /\x20/;
var pattern2 = /\u0020/;
var pattern3 = /\u{20}/u;
var pattern4 = /\t/;
var pattern5 = /\n/;
var pattern6 = new RegExp("\x20");
var pattern7 = new RegExp("\\t");
var pattern8 = new RegExp("\\n");
```

#### [ ] `eslint/no-debugger`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-debugger.html
- What it does: Checks for usage of the debugger statement.
- Covers: debugger statements do not affect functionality when a debugger isn't attached. They're most commonly an accidental debugging leftover.

Flagged example:

```javascript
async function main() {
  const data = await getData();
  const result = complexCalculation(data);
  debugger;
}
```

Accepted example:

```javascript
async function main() {
  const data = await getData();
  const result = complexCalculation(data);
}
```

#### [ ] `eslint/no-delete-var`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-delete-var.html
- What it does: The purpose of the delete operator is to remove a property from an object.
- Covers: Using the delete operator on a variable might lead to unexpected behavior.

Flagged example:

```javascript
var x;
delete x;
```

Accepted example:

```javascript
var x;

var y;
delete y.prop;
```

#### [ ] `eslint/no-dupe-class-members`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-class-members.html
- What it does: Disallow duplicate class members.
- Covers: If there are declarations of the same name in class members, the last declaration overwrites other declarations silently. It can cause unexpected behaviors.

Flagged example:

```javascript
class A {
  foo() {
    console.log("foo");
  }
  foo = 123;
}
let a = new A();
a.foo(); // Uncaught TypeError: a.foo is not a function
```

Accepted example:

```javascript
class A {
  foo() {
    console.log("foo");
  }
}
let a = new A();
a.foo();
```

#### [ ] `eslint/no-dupe-else-if`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-else-if.html
- What it does: Disallow duplicate conditions in if-else-if chains.
- Covers: if-else-if chains are commonly used when there is a need to execute only one branch (or at most one branch) out of several possible branches, based on certain conditions. Two identical test conditions in the same chain are almost always a mistake in the code. Unless there are side effects in the expressions, a duplicate will evaluate to the same true or false value as the identical expression earlier in the chain, meaning that its branch can never execute.

Flagged example:

```javascript
if (a) {
  foo();
} else if (b) {
  bar();
} else if (b) {
  baz();
}
```

Accepted example:

```javascript
if (a) {
  foo();
} else if (b) {
  bar();
} else if (c) {
  baz();
}
```

#### [ ] `eslint/no-dupe-keys`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-keys.html
- What it does: Disallow duplicate keys in object literals.
- Covers: Multiple properties with the same key in object literals can cause unexpected behavior in your application.

Flagged example:

```js
var foo = {
  bar: "baz",
  bar: "qux",
};

var foo = {
  bar: "baz",
  bar: "qux",
};

// ...
```

Accepted example:

```js
var foo = {
  bar: "baz",
  qux: "qux",
};
```

#### [ ] `eslint/no-duplicate-case`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-duplicate-case.html
- What it does: Disallow duplicate case labels.
- Covers: If a switch statement has duplicate test expressions in case clauses, it is likely that a programmer copied a case clause but forgot to change the test expression.

Flagged example:

```js
var a = 1,
  one = 1;
switch (a) {
  case 1:
    break;
  case 2:
    break;
  case 1: // duplicate test expression
    break;
  default:
// ...
```

Accepted example:

```js
var a = 1,
  one = 1;
switch (a) {
  case 1:
    break;
  case 2:
    break;
  default:
    break;
}
// ...
```

#### [ ] `eslint/no-empty-character-class`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-character-class.html
- What it does: Disallow empty character classes in regular expressions.
- Covers: Because empty character classes in regular expressions do not match anything, they might be typing mistakes.

Flagged example:

```javascript
var foo = /^abc[]/;
```

Accepted example:

```javascript
var foo = /^abc/;
var foo2 = /^abc[123]/;
```

#### [ ] `eslint/no-empty-pattern`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-pattern.html
- What it does: Disallow empty destructuring patterns.
- Covers: When using destructuring, it's possible to create a pattern that has no effect. This happens when empty curly braces are used to the right of an embedded object destructuring pattern, such as:

Example signal: Flags empty pattern patterns in eslint code.

#### [ ] `eslint/no-empty-static-block`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-static-block.html
- What it does: Disallow empty static blocks.
- Covers: Empty block statements, while not technically errors, usually occur due to refactoring that wasn't completed. They can cause confusion when reading code.

Flagged example:

```js
class Foo {
  static {}
}
```

Accepted example:

```js
class Foo {
  static {
    // blocks with comments are allowed
  }
}
class Bar {
  static {
    doSomething();
  }
}
```

#### [ ] `eslint/no-eval`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-eval.html
- What it does: Disallows referencing the eval function. This rule is aimed at preventing potentially dangerous, unnecessary, and slow code by disallowing the use of the eval() function.
- Covers: JavaScript's eval() function is potentially dangerous and is often misused. Using eval() on untrusted code can open a program up to several different injection attacks. The use of eval() in most contexts can be substituted for a better, safer alternative approach to solving the problem, such as using JSON.parse() or Function constructors in safer ways.

Flagged example:

```js
const obj = { x: "foo" },
  key = "x",
  value = eval("obj." + key);

(0, eval)("const a = 0");

const foo = eval;
foo("const a = 0");

this.eval("const a = 0");
```

Accepted example:

```js
const obj = { x: "foo" },
  key = "x",
  value = obj[key];

class A {
  foo() {
    this.eval("const a = 0");
  }

  eval() {}
// ...
```

#### [ ] `eslint/no-ex-assign`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-ex-assign.html
- What it does: Disallow reassigning exceptions in catch clauses.
- Covers: If a catch clause in a try statement accidentally (or purposely) assigns another value to the exception parameter, it is impossible to refer to the error from that point on. Since there is no arguments object to offer alternative access to this data, assignment of the parameter is absolutely destructive.

Flagged example:

```javascript
try {
  // code
} catch (e) {
  e = 10;
}
```

Accepted example:

```javascript
try {
  // code
} catch (e) {
  let val = 10;
}
```

#### [ ] `eslint/no-extra-boolean-cast`

- Category: correctness
- Default: yes
- Fix: conditional fix or suggestion
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-boolean-cast.html
- What it does: This rule disallows unnecessary boolean casts.
- Covers: In contexts such as an if statement's test where the result of the expression will already be coerced to a Boolean, casting to a Boolean via double negation (!!) or a Boolean call is unnecessary.

Flagged example:

```javascript
var foo = !!!bar;
var foo = Boolean(!!bar);

if (!!foo) {
}
if (Boolean(foo)) {
}

// with "enforceForInnerExpressions" option enabled
if (!!foo || bar) {
// ...
```

Accepted example:

```javascript
var foo = !bar;
var foo = Boolean(bar);

if (foo) {
}
if (foo) {
}

// with "enforceForInnerExpressions" option enabled
if (foo || bar) {
// ...
```

#### [ ] `eslint/no-func-assign`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-func-assign.html
- What it does: Disallow reassigning function declarations.
- Covers: Overwriting/reassigning a function written as a FunctionDeclaration is often indicative of a mistake or issue.

Flagged example:

```javascript
function foo() {}
foo = bar;
```

Accepted example:

```javascript
let foo = function () {};
foo = bar;
```

#### [ ] `eslint/no-global-assign`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-global-assign.html
- What it does: Disallow modifications to read-only global variables.
- Covers: In almost all cases, you don't want to assign a value to these global variables as doing so could result in losing access to important functionality.

Flagged example:

```javascript
Object = null;
```

Accepted example:

```javascript
Object = null;
```

#### [ ] `eslint/no-import-assign`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-import-assign.html
- What it does: Disallow assigning to imported bindings.
- Covers: The updates of imported bindings by ES Modules cause runtime errors.

Flagged example:

```javascript
import mod, { named } from "./mod.mjs";
import * as mod_ns from "./mod.mjs";

mod = 1; // ERROR: 'mod' is readonly.
named = 2; // ERROR: 'named' is readonly.
mod_ns.named = 3; // ERROR: The members of 'mod_ns' are readonly.
mod_ns = {}; // ERROR: 'mod_ns' is readonly.
// Can't extend 'mod_ns'
Object.assign(mod_ns, { foo: "foo" }); // ERROR: The members of 'mod_ns' are readonly.
```

Accepted example:

```javascript
import mod, { named } from "./mod.mjs";
import * as mod_ns from "./mod.mjs";

mod = 1; // ERROR: 'mod' is readonly.
named = 2; // ERROR: 'named' is readonly.
mod_ns.named = 3; // ERROR: The members of 'mod_ns' are readonly.
mod_ns = {}; // ERROR: 'mod_ns' is readonly.
// Can't extend 'mod_ns'
Object.assign(mod_ns, { foo: "foo" }); // ERROR: The members of 'mod_ns' are readonly.
```

#### [ ] `eslint/no-invalid-regexp`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.9.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-invalid-regexp.html
- What it does: Disallow invalid regular expression strings in RegExp constructors.
- Covers: An invalid pattern in a regular expression literal is a SyntaxError when the code is parsed, but an invalid string in RegExp constructors throws a SyntaxError only when the code is executed.

Flagged example:

```js
RegExp("[");
RegExp(".", "z");
new RegExp("\\");
```

Accepted example:

```js
RegExp(".");
new RegExp();
this.RegExp("[");
```

#### [ ] `eslint/no-irregular-whitespace`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-irregular-whitespace.html
- What it does: Disallows the use of irregular whitespace characters in the code.
- Covers: Irregular whitespace characters are invisible to most editors and can cause unexpected behavior, making code harder to debug and maintain. They can also cause issues with code formatting and parsing.

Flagged example:

```javascript
// Contains irregular whitespace characters (invisible)
function example() {
  var foo = "bar"; // irregular whitespace before 'bar'
}
```

Accepted example:

```javascript
function example() {
  var foo = "bar"; // regular spaces only
}
```

#### [ ] `eslint/no-iterator`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: no
- Added: 0.2.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-iterator.html
- What it does: Disallow the use of the __iterator__ property.
- Covers: The __iterator__ property was a SpiderMonkey extension to JavaScript that could be used to create custom iterators that are compatible with JavaScript's for in and for each constructs. However, this property is now obsolete, so it should not be used. Here's an example of how this used to work:

Flagged example:

```javascript
Foo.prototype.__iterator__ = function () {
  return new FooIterator(this);
};

foo.__iterator__ = function () {};

foo["__iterator__"] = function () {};
```

Accepted example:

```js
const __iterator__ = 42; // not using the __iterator__ property

Foo.prototype[Symbol.iterator] = function () {
  return new FooIterator(this);
};
```

#### [ ] `eslint/no-loss-of-precision`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-loss-of-precision.html
- What it does: Disallow precision loss in numeric literals.
- Covers: It can lead to unexpected results in certain situations. For example, when performing mathematical operations.

Flagged example:

```javascript
var x = 2e999;
```

Accepted example:

```javascript
var x = 12345;
```

#### [ ] `eslint/no-misleading-character-class`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: no
- Added: 1.17.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-misleading-character-class.html
- What it does: This rule reports regular expressions which include multiple code point characters in character class syntax. This includes:
- Covers: Unicode includes characters which are made by multiple code points. RegExp character class syntax (/[abc]/) cannot handle characters which are made by multiple code points as a character; those characters will be dissolved to each code point. For example, ❇️ is made by ❇ (U+2747) and VARIATION SELECTOR-16 (U+FE0F). If this character is in a RegExp character class, it will match either ❇ (U+2747) or VARIATION SELECTOR-16 (U+FE0F) rather than ❇️.

Example signal: Flags misleading character class patterns in eslint code.

#### [ ] `eslint/no-new-native-nonconstructor`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.3.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-native-nonconstructor.html
- What it does: Disallow new operators with global non-constructor functions (Symbol, BigInt).
- Covers: Both new Symbol and new BigInt throw a type error because they are functions and not classes. It is easy to make this mistake by assuming the uppercase letters indicate classes.

Flagged example:

```js
// throws a TypeError
let foo = new Symbol("foo");

// throws a TypeError
let result = new BigInt(9007199254740991);
```

Accepted example:

```js
let foo = Symbol("foo");

let result = BigInt(9007199254740991);
```

#### [ ] `eslint/no-nonoctal-decimal-escape`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: no
- Added: 0.2.10
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-nonoctal-decimal-escape.html
- What it does: Disallow \8 and \9 escape sequences in string literals.
- Covers: ECMAScript specification treats \8 and \9 in string literals as a legacy feature

Flagged example:

```javascript
let x = "\8";
let y = "\9";
```

Accepted example:

```javascript
let x = "8";
let y = "\\9";
```

#### [ ] `eslint/no-obj-calls`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-obj-calls.html
- What it does: Disallow calling some global objects as functions.
- Covers: Some global objects are not intended to be called as functions. Calling them as functions will usually result in a TypeError being thrown.

Flagged example:

```javascript
let math = Math();
let newMath = new Math();

let json = JSON();
let newJson = new JSON();

let atomics = Atomics();
let newAtomics = new Atomics();

let intl = Intl();
// ...
```

Accepted example:

```javascript
let area = (r) => 2 * Math.PI * r * r;
let object = JSON.parse("{}");
let first = Atomics.load(sharedArray, 0);
let segmenterFrom = Intl.Segmenter("fr", { granularity: "word" });
```

#### [ ] `eslint/no-self-assign`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-self-assign.html
- What it does: Disallow assignments where both sides are exactly the same.
- Covers: Self assignments have no effect, so probably those are an error due to incomplete refactoring. Those indicate that what you should do is still remaining.

Flagged example:

```javascript
foo = foo;

[a, b] = [a, b];
[a, ...b] = [x, ...b];

({ a, b } = { a, x });

foo &&= foo;
foo ||= foo;
foo ??= foo;
```

Accepted example:

```javascript
foo = bar;
[a, b] = [b, a];

// This pattern is warned by the `no-use-before-define` rule.
let foo = foo;

// The default values have an effect.
[foo = 1] = [foo];

// This ignores if there is a function call.
// ...
```

#### [ ] `eslint/no-setter-return`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-setter-return.html
- What it does: Setters cannot return values.
- Covers: While returning a value from a setter does not produce an error, the returned value is being ignored. Therefore, returning a value from a setter is either unnecessary or a possible error, since the returned value cannot be used.

Flagged example:

```javascript
class URL {
  set origin() {
    return true;
  }
}
```

Accepted example:

```javascript
class URL {
  set origin() {
    return true;
  }
}
```

#### [ ] `eslint/no-shadow-restricted-names`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-shadow-restricted-names.html
- What it does: Disallows the redefining of global variables such as undefined, NaN, Infinity, eval, globalThis and arguments.
- Covers: Value properties of the Global Object NaN, Infinity, undefined, globalThis as well as the strict mode restricted identifiers eval and arguments are considered to be restricted names in JavaScript. Defining them to mean something else can have unintended consequences and confuse others reading the code. For example, there's nothing preventing you from writing:

Flagged example:

```javascript
function NaN() {}

!function (Infinity) {};

var undefined = 5;

try {
} catch (eval) {}

const globalThis = "foo";
```

Accepted example:

```javascript
var Object;

function f(a, b) {}

// Exception: `undefined` may be shadowed if the variable is never assigned a value.
var undefined;
```

#### [ ] `eslint/no-sparse-arrays`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-sparse-arrays.html
- What it does: Disallow sparse arrays.
- Covers: Take the following example:

Flagged example:

```javascript
var items = [, ,];
```

Accepted example:

```javascript
var items = [];
```

#### [ ] `eslint/no-this-before-super`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.2.6
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-this-before-super.html
- What it does: Requires calling super() before using this or super.
- Covers: In the constructor of derived classes, if this/super are used before super() calls, it raises a ReferenceError.

Flagged example:

```javascript
class A1 extends B {
  constructor() {
    // super() needs to be called first
    this.a = 0;
    super();
  }
}
```

Accepted example:

```javascript
class A1 extends B {
  constructor() {
    // super() needs to be called first
    this.a = 0;
    super();
  }
}
```

#### [ ] `eslint/no-unassigned-vars`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 1.10.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unassigned-vars.html
- What it does: Disallow let or var variables that are read but never assigned.
- Covers: This rule flags let or var declarations that are never assigned a value but are still read or used in the code. Since these variables will always be undefined, their usage is likely a programming mistake.

Flagged example:

```js
let status;
if (status === "ready") {
  console.log("Ready!");
}
```

Accepted example:

```js
let message = "hello";
console.log(message);

let user;
user = getUser();
console.log(user.name);
```

#### [ ] `eslint/no-unreachable`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.4.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unreachable.html
- What it does: Disallow unreachable code after return, throw, continue, and break statements.
- Covers: Unreachable code after a return, throw, continue, or break statement can never be run.

Flagged example:

```ts
function foo() {
  return 2;
  console.log("this will never be executed");
}
```

Accepted example:

```ts
function foo() {
  console.log("this will be executed");
  return 2;
}
```

#### [ ] `eslint/no-unsafe-finally`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-finally.html
- What it does: Disallow control flow statements in finally blocks.
- Covers: JavaScript suspends the control flow statements of try and catch blocks until the execution of a finally block finishes.

Flagged example:

```javascript
// We expect this function to return 1;
(() => {
  try {
    return 1; // 1 is returned but suspended until finally block ends
  } catch (err) {
    return 2;
  } finally {
    return 3; // 3 is returned before 1, which we did not expect
  }
})();
// ...
```

Accepted example:

```javascript
// We expect this function to return 1;
(() => {
  try {
    return 1; // 1 is returned but suspended until finally block ends
  } catch (err) {
    return 2;
  } finally {
    return 3; // 3 is returned before 1, which we did not expect
  }
})();
// ...
```

#### [ ] `eslint/no-unsafe-negation`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-negation.html
- What it does: Disallows negating the left operand of relational operators to prevent logical errors caused by misunderstanding operator precedence or accidental use of negation.
- Covers: Negating the left operand of relational operators can result in unexpected behavior due to operator precedence, leading to logical errors. For instance, !a in b may be interpreted as (!a) in b instead of !(a in b), which is not the intended logic.

Flagged example:

```javascript
if (!key in object) {}

if (!obj instanceof Ctor) {}
```

Accepted example:

```javascript
if (!(key in object)) {}

if (!(obj instanceof Ctor)) {}
```

#### [ ] `eslint/no-unsafe-optional-chaining`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-optional-chaining.html
- What it does: Disallow use of optional chaining in contexts where the undefined value is not allowed.
- Covers: The optional chaining (?.) expression can short-circuit with a return value of undefined. Therefore, treating an evaluated optional chaining expression as a function, object, number, etc., can cause TypeError or unexpected results. For example:

Flagged example:

```javascript
var obj = undefined;
1 in obj?.foo; // TypeError
with (obj?.foo); // TypeError
for (bar of obj?.foo); // TypeError
bar instanceof obj?.foo; // TypeError
const { bar } = obj?.foo; // TypeError
```

Accepted example:

```javascript
var obj = undefined;
1 in obj?.foo; // TypeError
with (obj?.foo); // TypeError
for (bar of obj?.foo); // TypeError
bar instanceof obj?.foo; // TypeError
const { bar } = obj?.foo; // TypeError
```

#### [ ] `eslint/no-unused-expressions`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.14.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-expressions.html
- What it does: This rule disallows unused expressions.
- Covers: Unused expressions are usually a mistake. They can be a symptom of a bug or a misunderstanding of the code.

Flagged example:

```ts
Set<number>;
1 as number;
window!;
```

Accepted example:

```ts
const foo = new Set<number>();
```

#### [ ] `eslint/no-unused-labels`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-labels.html
- What it does: Disallow unused labels.
- Covers: Labels that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring.

Flagged example:

```javascript
OUTER_LOOP: for (const student of students) {
  if (checkScores(student.scores)) {
    continue;
  }
  doSomething(student);
}
```

Accepted example:

```javascript
for (const student of students) {
  if (checkScores(student.scores)) {
    continue;
  }
  doSomething(student);
}
```

#### [ ] `eslint/no-unused-private-class-members`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-private-class-members.html
- What it does: Disallow unused private class members.
- Covers: Private class members that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such class members take up space in the code and can lead to confusion by readers.

Flagged example:

```javascript
class A {
  #unusedMember = 5;
}

class B {
  #usedOnlyInWrite = 5;
  method() {
    this.#usedOnlyInWrite = 42;
  }
}
// ...
```

Accepted example:

```javascript
class A {
  #usedMember = 42;
  method() {
    return this.#usedMember;
  }
}

class B {
  #usedMethod() {
    return 42;
// ...
```

#### [ ] `eslint/no-unused-vars`

- Category: correctness
- Default: yes
- Fix: conditional_dangerous_fix_or_suggestion
- Type-aware: no
- Added: 0.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-vars.html
- What it does: Disallows variable declarations, imports, or type declarations that are not used in code.
- Covers: Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such variables take up space in the code and can lead to confusion by readers.

Flagged example:

```javascript
/* no-unused-vars: "error" */
/* if you have `some_unused_var` defined as a global in .oxlintrc.json */

// It checks variables you have defined as global
some_unused_var = 42;

var x;

// Write-only variables are not considered as used.
var y = 10;
// ...
```

Accepted example:

```js
/* no-unused-vars: "error" */

var x = 10;
alert(x);

// foo is considered used here
myFunc(
  function foo() {
    // ...
  }.bind(this),
// ...
```

#### [ ] `eslint/no-useless-backreference`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.16.10
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-backreference.html
- What it does: Disallows backreferences in regular expressions that will always be ignored because the capture group they refer to has not matched and cannot match at the time the backreference is evaluated.
- Covers: Useless backreferences can lead to confusing or misleading regular expressions. They may give the impression that a group's value is being reused, but due to the structure of the pattern (e.g., order of evaluation, disjunctions, or negative lookarounds), the group has not matched anything - so the reference always resolves to an empty string. This is almost always a mistake and makes patterns harder to understand and maintain.

Flagged example:

```js
/\1(a)/; // backreference appears before group
/(a|\1b)/; // group and reference are in different alternatives
/(?<=\1(a))b/; // backreference used before group in lookbehind
/\1(?!(a))/; // group is inside negative lookahead
/(a\1)/; // backreference is inside its own group
```

Accepted example:

```js
/(a)\1/; // valid - backreference follows completed group
/(?<name>a)\k<name>/; // named group used properly
/(?:a|(b))\1/; // backreference only used when group matches
```

#### [ ] `eslint/no-useless-catch`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-catch.html
- What it does: Disallow unnecessary catch clauses.
- Covers: A catch clause that only rethrows the original error is redundant, and has no effect on the runtime behavior of the program. These redundant clauses can be a source of confusion and code bloat, so it's better to disallow these unnecessary catch clauses.

Flagged example:

```javascript
try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
}
```

Accepted example:

```javascript
doSomethingThatMightThrow();
```

#### [ ] `eslint/no-useless-escape`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-escape.html
- What it does: Disallow unnecessary escape characters.
- Covers: Escaping characters unnecessarily has no effect on the behavior of strings or regexes, and can make code harder to read and understand by adding unnecessary complexity. This applies to string literals, template literals, and regular expressions.

Flagged example:

```javascript
"\'";
'\"';
"\#";
"\e";
`\"`;
`\"${foo}\"`;
`\#{foo}`;
/\!/;
/\@/;
/[\[]/;
// ...
```

Accepted example:

```javascript
"\"";
'\'';
"\x12";
"\u00a9";
"\371";
"xs\u2111";
`\``;
`\${${foo}}`;
`$\{${foo}}`;
/\\/g;
// ...
```

#### [ ] `eslint/no-useless-rename`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-rename.html
- What it does: Disallow renaming import, export, and destructured assignments to the same name.
- Covers: It is unnecessary to rename a variable to the same name.

Flagged example:

```javascript
import { foo as foo } from "foo";
const { bar: bar } = obj;
export { baz as baz };
```

Accepted example:

```javascript
import { foo } from "foo";
const { bar: renamed } = obj;
export { baz };
```

#### [ ] `eslint/no-with`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-with.html
- What it does: Disallow with statements.
- Covers: The with statement is potentially problematic because it adds members of an object to the current scope, making it impossible to tell what a variable inside the block actually refers to.

Flagged example:

```javascript
with (point) {
  r = Math.sqrt(x * x + y * y); // is r a member of point?
}
```

Accepted example:

```javascript
with (point) {
  r = Math.sqrt(x * x + y * y); // is r a member of point?
}
```

#### [ ] `eslint/require-yield`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-yield.html
- What it does: This rule generates warnings for generator functions that do not have the yield keyword.
- Covers: Probably a mistake.

Flagged example:

```javascript
function* foo() {
  return 10;
}
```

Accepted example:

```javascript
function* foo() {
  return 10;
}
```

#### [ ] `eslint/use-isnan`

- Category: correctness
- Default: yes
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/use-isnan.html
- What it does: Disallows checking against NaN without using isNaN() call.
- Covers: In JavaScript, NaN is a special value of the Number type. It's used to represent any of the "not-a-number" values represented by the double-precision 64-bit format as specified by the IEEE Standard for Binary Floating-Point Arithmetic.

Flagged example:

```javascript
foo == NaN;
foo === NaN;
foo <= NaN;
foo > NaN;
```

Accepted example:

```javascript
foo == NaN;
foo === NaN;
foo <= NaN;
foo > NaN;
```

#### [ ] `eslint/valid-typeof`

- Category: correctness
- Default: yes
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/valid-typeof.html
- What it does: Enforce comparing typeof expressions against valid strings.
- Covers: For a vast majority of use cases, the result of the typeof operator is one of the following string literals: "undefined", "object", "boolean", "number", "string", "function", "symbol", and "bigint". It is usually a typing mistake to compare the result of a typeof operator to other string literals.

Flagged example:

```js
typeof foo === "strnig";
typeof foo == "undefimed";
typeof bar != "nunber"; // spellchecker:disable-line
typeof bar !== "fucntion"; // spellchecker:disable-line
```

Accepted example:

```js
typeof foo === "string";
typeof bar == "undefined";
typeof foo === baz;
typeof bar === typeof qux;
```

### perf

#### [ ] `eslint/no-await-in-loop`

- Category: perf
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-await-in-loop.html
- What it does: This rule disallows the use of await within loop bodies. (for, for-in, for-of, while, do-while).
- Covers: It potentially indicates that the async operations are not being effectively parallelized. Instead, they are being run in series, which can lead to poorer performance.

Flagged example:

```javascript
async function bad() {
  for (const user of users) {
    const userRecord = await getUserRecord(user);
  }
}
```

Accepted example:

```javascript
async function good() {
  await Promise.all(users.map((user) => getUserRecord(user)));
}
```

#### [ ] `eslint/no-useless-call`

- Category: perf
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-call.html
- What it does: Disallow unnecessary calls to .call() and .apply()
- Covers: Function.prototype.call() and Function.prototype.apply() are slower than the normal function invocation.

Flagged example:

```js
// These are the same as `foo(1, 2, 3);`
foo.call(undefined, 1, 2, 3);
foo.apply(undefined, [1, 2, 3]);
foo.call(null, 1, 2, 3);
foo.apply(null, [1, 2, 3]);

// These are the same as `obj.foo(1, 2, 3);`
obj.foo.call(obj, 1, 2, 3);
obj.foo.apply(obj, [1, 2, 3]);
```

Accepted example:

```js
// The `this` binding is different.
foo.call(obj, 1, 2, 3);
foo.apply(obj, [1, 2, 3]);
obj.foo.call(null, 1, 2, 3);
obj.foo.apply(null, [1, 2, 3]);
obj.foo.call(otherObj, 1, 2, 3);
obj.foo.apply(otherObj, [1, 2, 3]);

// The argument list is variadic.
// Those are warned by the `prefer-spread` rule.
// ...
```

### nursery

#### [ ] `eslint/no-restricted-exports`

- Category: nursery
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-exports.html
- What it does: This rule disallows specified names from being used as exported names.
- Covers: In a project, certain names may be disallowed from being used as exported names for various reasons.

Example signal: Flags restricted exports patterns in eslint code.

#### [ ] `eslint/no-undef`

- Category: nursery
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-undef.html
- What it does: Disallow the use of undeclared variables.
- Covers: It is most likely a potential ReferenceError caused by a misspelling of a variable or parameter name.

Flagged example:

```javascript
var foo = someFunction();
var bar = a + 1;
```

Accepted example:

```javascript
var foo = someFunction();
var bar = a + 1;
```

#### [ ] `eslint/no-useless-assignment`

- Category: nursery
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-assignment.html
- What it does: Flags assignments where the newly assigned value is never read afterward (a "dead store"). This helps catch wasted work or accidental mistakes.
- Covers: Dead stores add noise and can hide real bugs (e.g., you meant to use that value or wrote to the wrong variable). Removing them improves clarity and performance.

Flagged example:

```js
function fn1() {
  let v = "used";
  doSomething(v);
  v = "unused"; // assigned but never read
}

function fn2() {
  let v = "used";
  if (condition) {
    v = "unused"; // early return; this write is never observed
// ...
```

Accepted example:

```js
function fn1() {
  let v = "used";
  doSomething(v);
  v = "used-2";
  doSomething(v); // the reassigned value is read
}

function fn2() {
  let v = "used";
  if (condition) {
// ...
```

## import

### style

#### [ ] `import/consistent-type-specifier-style`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.16.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/consistent-type-specifier-style.html
- What it does: Enforces or bans the use of inline type-only markers for named imports.
- Covers: Mixing top-level import type { Foo } from 'foo' with inline { type Bar } forces readers to mentally switch contexts when scanning your imports. Enforcing one style makes it immediately obvious which imports are types and which are value imports.

Flagged example:

```typescript
import { type Foo } from "Foo";
import Foo, { type Bar } from "Foo";
```

Accepted example:

```typescript
import { type Foo } from "Foo";
import Foo, { type Bar } from "Foo";
```

#### [ ] `import/exports-last`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/exports-last.html
- What it does: This rule enforces that all exports are declared at the bottom of the file. This rule will report any export declarations that comes before any non-export statements.
- Covers: Exports scattered throughout the file can lead to poor code readability and increase the cost of locating the export quickly

Flagged example:

```js
const bool = true;
export const foo = "bar";
const str = "foo";
```

Accepted example:

```js
const arr = ["bar"];
export const bool = true;
export const str = "foo";
export function func() {
  console.log("Hello World");
}
```

#### [ ] `import/first`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.11.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/first.html
- What it does: Forbids any non-import statements before imports except directives.
- Covers: Notably, imports are hoisted, which means the imported modules will be evaluated before any of the statements interspersed between them. Keeping all imports together at the top of the file may prevent surprises resulting from this part of the spec

Flagged example:

```js
import { x } from "./foo";
export { x };
import { y } from "./bar";
```

Accepted example:

```js
import { x } from "./foo";
import { y } from "./bar";
export { x, y };
```

#### [ ] `import/group-exports`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.16.6
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/group-exports.html
- What it does: Reports when named exports are not grouped together in a single export declaration or when multiple assignments to CommonJS module.exports or exports object are present in a single file.
- Covers: An export declaration or module.exports assignment can appear anywhere in the code. By requiring a single export declaration all your exports will remain at one place, making it easier to see what exports a module provides.

Flagged example:

```js
export const first = true;
export const second = true;
```

Accepted example:

```js
const first = true;
const second = true;
export { first, second };
```

#### [ ] `import/newline-after-import`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.66.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/newline-after-import.html
- What it does: Enforces having one or more empty lines after the last top-level import statement or require call.
- Covers: Without a blank line, import/require declarations blend into the following logic, which hurts readability and makes changes harder to scan. A blank line clearly separates dependencies from implementation.

Flagged example:

```js
import * as foo from "foo";
const FOO = "BAR";
```

Accepted example:

```js
import defaultExport from "./foo";

const FOO = "BAR";
```

#### [ ] `import/no-anonymous-default-export`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-anonymous-default-export.html
- What it does: Reports if a module's default export is unnamed. This includes several types of unnamed data types; literals, object expressions, arrays, anonymous functions, arrow functions, and anonymous class declarations.
- Covers: Ensuring that default exports are named helps improve the grepability of the codebase by encouraging the re-use of the same identifier for the module's default export at its declaration site and at its import sites.

Flagged example:

```js
export default [];
export default () => {};
export default class {};
export default function() {};
export default foo(bar);
export default 123;
export default {};
export default new Foo();
export default `foo`;
export default /^123/;
```

Accepted example:

```js
const foo = 123;
export default foo;
export default function foo() {};
export default class MyClass {};
export default function foo() {};
export default foo(bar);
/* import/no-anonymous-default-export: ["error", { "allowLiteral": true }] */
export default 123;
/* import/no-anonymous-default-export: ["error", { "allowArray": true }] */
export default []
// ...
```

#### [ ] `import/no-duplicates`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-duplicates.html
- What it does: Reports if a resolved path is imported more than once in the same module. This helps avoid unnecessary duplicate imports and keeps the code clean.
- Covers: Importing the same module multiple times can lead to redundancy and unnecessary complexity. It also affects maintainability, as it might confuse developers and result in inconsistent usage of imports across the code.

Flagged example:

```javascript
import { foo } from "./module";
import { bar } from "./module";

import a from "./module";
import { b } from "./module";
```

Accepted example:

```typescript
import { foo, bar } from "./module";

import * as a from "foo"; // separate statements for namespace imports
import { b } from "foo";

import { c } from "foo"; // separate type imports, unless
import type { d } from "foo"; // `prefer-inline` is true
```

#### [ ] `import/no-mutable-exports`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-mutable-exports.html
- What it does: Forbids the use of mutable exports with var or let.
- Covers: In general, we should always export constants

Flagged example:

```js
export let count = 2;
export var count = 3;

let count = 4;
export { count };
```

Accepted example:

```js
export const count = 1;
export function getCount() {}
export class Counter {}
```

#### [ ] `import/no-named-default`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-default.html
- What it does: Reports use of a default export as a locally named import.
- Covers: Rationale: the syntax exists to import default exports expressively, let's use it.

Flagged example:

```js
// message: Using exported name 'bar' as identifier for default export.
import { default as foo } from "./foo.js";
import { default as foo, bar } from "./foo.js";
```

Accepted example:

```js
import foo from "./foo.js";
import foo, { bar } from "./foo.js";
```

#### [ ] `import/no-named-export`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.19.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-export.html
- What it does: Prohibit named exports.
- Covers: Named exports require strict identifier matching and can lead to fragile imports, while default exports enforce a single, consistent module entry point.

Flagged example:

```js
export const foo = "foo";

const bar = "bar";
export { bar };
```

Accepted example:

```js
export default 'bar';

const foo = 'foo';
export { foo as default }
```

#### [ ] `import/no-namespace`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-namespace.html
- What it does: Enforce a convention of not using namespaced (a.k.a. "wildcard" \*) imports.
- Covers: Namespaced imports, while sometimes used, are generally considered less ideal in modern JavaScript development for several reasons:

Flagged example:

```js
import * as user from "user-lib";

import some, * as user from "./user";
```

Accepted example:

```js
import { getUserName, isUser } from "user-lib";

import user from "user-lib";
import defaultExport, { isUser } from "./user";
```

#### [ ] `import/no-nodejs-modules`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.43.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-nodejs-modules.html
- What it does: Forbid the use of Node.js builtin modules. Can be useful for client-side web projects that do not have access to those modules.
- Covers: Node.js builtins (e.g. fs, path, crypto) are not available in browsers, so importing them in client bundles causes runtime failures or forces bundlers to inject heavy polyfills/shims. This increases bundle size, can leak server-only logic to the client, and may hide environment mismatches until production.

Flagged example:

```js
import fs from "fs";
import path from "path";

var fs = require("fs");
var path = require("path");
```

Accepted example:

```js
import _ from "lodash";
import foo from "foo";
import foo from "./foo";

var _ = require("lodash");
var foo = require("foo");
var foo = require("./foo");

/* import/no-nodejs-modules: ["error", {"allow": ["path"]}] */
import path from "path";
```

#### [ ] `import/prefer-default-export`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/prefer-default-export.html
- What it does: Checks whether there is a default export.
- Covers: This rule exists to standardize module exports by preferring default exports when a module only has one export, enhancing readability, maintainability.

Flagged example:

```js
export const foo = "foo";
```

Accepted example:

```js
export const foo = "foo";
const bar = "bar";
export default bar;
```

### correctness

#### [ ] `import/default`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/default.html
- What it does: If a default import is requested, this rule will report if there is no default export in the imported module.
- Covers: Using a default import when there is no default export can lead to confusion and runtime errors. It can make the code harder to understand and maintain, as it may suggest that a module has a default export when it does not, leading to unexpected behavior.

Flagged example:

```javascript
// ./bar.js
export function bar() {
  return null;
}

// ./foo.js
import bar from "./bar"; // no default export found in ./bar
```

Accepted example:

```javascript
// ./bar.js
export default function bar() {
  return null;
}

// ./foo.js
import { bar } from "./bar"; // correct usage of named import
```

#### [ ] `import/namespace`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/namespace.html
- What it does: Enforces names exist at the time they are dereferenced, when imported as a full namespace (i.e. import * as foo from './foo'; foo.bar(); will report if bar is not exported by ./foo.). Will report at the import declaration if there are no exported names found. Also, will report for computed references (i.e. foo["bar"]()). Reports on assignment to a member of an imported namespace.
- Covers: Dereferencing a name that does not exist can lead to runtime errors and unexpected behavior in your code. It makes the code less reliable and harder to maintain, as it may not be clear which names are valid. This rule helps ensure that all referenced names are defined, improving the clarity and robustness of your code.

Flagged example:

```javascript
// ./qux.js
import * as foo from "./foo";
foo.notExported(); // Error: notExported is not exported

// Assignment to a member of an imported namespace
foo.bar = "new value"; // Error: bar cannot be reassigned

// Computed reference to a non-existent export
const method = "notExported";
foo[method](); // Error: notExported does not exist
```

Accepted example:

```javascript
// ./baz.js
import * as foo from "./foo";
console.log(foo.bar); // Valid: bar is exported

// Computed reference
const method = "bar";
foo[method](); // Valid: method refers to an exported function
```

### nursery

#### [ ] `import/export`

- Category: nursery
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.21
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/export.html
- What it does: Reports funny business with exports, like repeated exports of names or defaults.
- Covers: Having multiple exports of the same name can lead to ambiguity and confusion in the codebase. It makes it difficult to track which export is being used and can result in runtime errors if the wrong export is referenced.

Flagged example:

```javascript
let foo;
export { foo }; // Multiple exports of name 'foo'.
export * from "./export-all"; // Conflicts if export-all.js also exports foo
```

Accepted example:

```javascript
let foo;
export { foo as foo1 }; // Renamed export to avoid conflict
export * from "./export-all"; // No conflict if export-all.js also exports foo
```

#### [ ] `import/named`

- Category: nursery
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/named.html
- What it does: Verifies that all named imports are part of the set of named exports in the referenced module.
- Covers: Importing or exporting names that do not exist in the referenced module can lead to runtime errors and confusion. It may suggest that certain functionality is available when it is not, making the code harder to maintain and understand. This rule helps ensure that your code accurately reflects the available exports, improving reliability.

Flagged example:

```js
// ./baz.js
import { notFoo } from "./foo";

// re-export
export { notFoo as defNotBar } from "./foo";

// will follow 'jsnext:main', if available
import { dontCreateStore } from "redux";
```

Accepted example:

```js
// ./bar.js
import { foo } from "./foo";

// re-export
export { foo as bar } from "./foo";

// node_modules without jsnext:main are not analyzed by default
// (import/ignore setting)
import { SomeNonsenseThatDoesntExist } from "react";
```

### restriction

#### [ ] `import/extensions`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/extensions.html
- What it does: Some file resolve algorithms allow you to omit the file extension within the import source path. For example the node resolver (which does not yet support ESM/import) can resolve ./foo/bar to the absolute path /User/someone/foo/bar.js because the .js extension is resolved automatically by default in CJS. Depending on the resolver you can configure more extensions to get resolved automatically. In order to provide a consistent use of file extensions across your code base, this rule can enforce or disallow the use of certain file extensions.
- Covers: ESM-based file resolve algorithms (e.g., the one that Vite provides) recommend specifying the file extension to improve performance. Without extensions, the bundler must check for various possible file extensions, which can slow down the build process on large projects. In addition, common ESM environments (such as browsers and Node.js) typically require fully specified relative imports, which means extensionless imports are not supported there.

Flagged example:

```js
import foo from "./foo";
import bar from "./bar";
import Component from "./Component";
import foo from "@/foo";
```

Accepted example:

```js
import foo from "./foo.js";
import bar from "./bar.json";
import Component from "./Component.jsx";
import * as path from "path";
import foo from "@/foo.js";
```

#### [ ] `import/no-amd`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-amd.html
- What it does: Forbids the use of AMD require and define calls.
- Covers: AMD (Asynchronous Module Definition) is an older module format that is less common in modern JavaScript development, especially with the widespread use of ES modules and CommonJS in Node.js. AMD introduces unnecessary complexity and is often considered outdated. This rule enforces the use of more modern module systems to improve maintainability and consistency across the codebase.

Flagged example:

```javascript
require([a, b], function () {});
```

Accepted example:

```javascript
require("../name");
require(`../name`);
```

#### [ ] `import/no-commonjs`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.11.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-commonjs.html
- What it does: Forbids the use of CommonJS require calls. Also forbids module.exports and exports.*.
- Covers: ESM modules or Typescript uses import and export syntax instead of CommonJS syntax. This rule enforces the use of more modern module systems to improve maintainability and consistency across the codebase.

Flagged example:

```js
var mod = require("fs");

var exports = (module.exports = {});

exports.sayHello = function () {
  return "Hello";
};

module.exports = "Hola";
```

Accepted example:

```js
var a = b && require("c");

if (typeof window !== "undefined") {
  require("somelib");
}

var fs = null;
try {
  fs = require("fs");
} catch (error) {}
```

#### [ ] `import/no-cycle`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-cycle.html
- What it does: Disallow cyclic dependencies. The rule ensures that there is no resolvable path back to this module via its dependencies.
- Covers: Dependency cycles lead to confusing architectures where bugs become hard to find. It is common to import an undefined value that is caused by a cyclic dependency.

Flagged example:

```javascript
// dep-b.js
import "./dep-a.js";
export function b() {
  /* ... */
}
```

Accepted example:

```javascript
// dep-b.js
export function b() {
  /* ... */
}
```

#### [ ] `import/no-default-export`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-default-export.html
- What it does: Disallow modules from having default exports.
- Covers: Default exports can lead to confusion, as the name of the imported value can vary based on how it's imported. This can make refactoring and auto-imports less reliable.

Flagged example:

```javascript
export default 'bar';

const foo = 'foo';
export { foo as default }
```

Accepted example:

```javascript
export const foo = "foo";
export const bar = "bar";
```

#### [ ] `import/no-dynamic-require`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-dynamic-require.html
- What it does: Forbids imports that use an expression for the module argument. This includes dynamically resolved paths in require or import statements.
- Covers: Using expressions that are resolved at runtime in import statements makes it difficult to determine where the module is being imported from. This can complicate code navigation and hinder static analysis tools, which rely on predictable module paths for linting, bundling, and other optimizations.

Flagged example:

```javascript
require(name);
require(`../${name}`);
```

Accepted example:

```javascript
require("../name");
require(`../name`);
```

#### [ ] `import/no-relative-parent-imports`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.43.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-relative-parent-imports.html
- What it does: Forbids importing modules from parent directories using relative paths.
- Covers: This restriction enforces tree-like folder structures instead of complex graph-like structures, making large codebases easier to maintain. Dependencies flow in one direction (parent to child), which clarifies module relationships.

Flagged example:

```javascript
import foo from "../bar";
import foo from "../../utils/helper";
const baz = require("../config");
export { qux } from "../shared";
```

Accepted example:

```javascript
import foo from "lodash";
import a from "./lib/a";
import b from "./b";
```

#### [ ] `import/no-webpack-loader-syntax`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-webpack-loader-syntax.html
- What it does: Forbids using Webpack loader syntax directly in import or require statements.
- Covers: This loader syntax is non-standard, so it couples the code to Webpack. The recommended way to specify Webpack loader configuration is in a Webpack configuration file.

Flagged example:

```javascript
import myModule from "my-loader!my-module";
import theme from "style!css!./theme.css";

var myModule = require("my-loader!./my-module");
var theme = require("style!css!./theme.css");
```

Accepted example:

```javascript
import myModule from "./my-module";
import theme from "./theme.css";

var myModule = require("./my-module");
var theme = require("./theme.css");
```

#### [ ] `import/unambiguous`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.11.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/unambiguous.html
- What it does: Warn if a module could be mistakenly parsed as a script instead of as a pure ES module.
- Covers: For ESM-only environments, ambiguous files may lead to unexpected results and problems.

Flagged example:

```js
function x() {}

(function x() {
  return 42;
})();
```

Accepted example:

```js
import "foo";
function x() {
  return 42;
}

export function x() {
  return 42;
}

(function x() {
// ...
```

### pedantic

#### [ ] `import/max-dependencies`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.5.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/max-dependencies.html
- What it does: Forbid modules to have too many dependencies (import statements only).
- Covers: This is a useful rule because a module with too many dependencies is a code smell, and usually indicates the module is doing too much and/or should be broken up into smaller modules.

Flagged example:

```javascript
import a from "./a";
import b from "./b";
import c from "./c"; // Too many dependencies: 3 (max: 2)
```

Accepted example:

```javascript
import a from "./a";
import b from "./b"; // Allowed: 2 dependencies (max: 2)
```

### suspicious

#### [ ] `import/no-absolute-path`

- Category: suspicious
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.15.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-absolute-path.html
- What it does: Forbid the import of modules using absolute paths.
- Covers: Node.js allows the import of modules using an absolute path such as /home/xyz/file.js. That is a bad practice as it ties the code using it to your computer, and therefore makes it unusable in packages distributed on npm for instance.

Flagged example:

```js
import f from "/foo";
import f from "/some/path";
var f = require("/foo");
var f = require("/some/path");
```

Accepted example:

```js
import _ from "lodash";
import foo from "foo";
import foo from "./foo";

var _ = require("lodash");
var foo = require("foo");
var foo = require("./foo");
```

#### [ ] `import/no-empty-named-blocks`

- Category: suspicious
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.16.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-empty-named-blocks.html
- What it does: Enforces that named import blocks are not empty.
- Covers: Empty named imports serve no practical purpose and often result from accidental deletions or tool-generated code.

Flagged example:

```js
import {} from "mod";
import Default from "mod";
```

Accepted example:

```js
import { mod } from "mod";
import Default, { mod } from "mod";
```

#### [ ] `import/no-named-as-default`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-as-default.html
- What it does: Reports use of an exported name as the locally imported name of a default export. This happens when an imported default export is assigned a name that conflicts with a named export from the same module.
- Covers: Using a named export's identifier for a default export can cause confusion and errors in understanding which value is being imported. It also reduces code clarity, making it harder for other developers to understand the intended imports.

Flagged example:

```javascript
// Invalid: using exported name 'bar' as the identifier for default export.
import bar from "./foo.js";
```

Accepted example:

```javascript
// Valid: correctly importing default export with a non-conflicting name.
import foo from "./foo.js";
```

#### [ ] `import/no-named-as-default-member`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-as-default-member.html
- What it does: Reports the use of an exported name (named export) as a property on the default export. This occurs when trying to access a named export through the default export, which is incorrect.
- Covers: Accessing a named export via the default export is incorrect and will not work as expected. Named exports should be imported directly, while default exports are accessed without properties. This mistake can lead to runtime errors or undefined behavior.

Flagged example:

```javascript
// ./foo.js
import foo from "./bar";
const bar = foo.bar; // Incorrect: trying to access named export via default
```

Accepted example:

```javascript
// ./foo.js
import { bar } from "./bar"; // Correct: accessing named export directly
```

#### [ ] `import/no-self-import`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-self-import.html
- What it does: Forbids a module from importing itself. This can sometimes happen accidentally, especially during refactoring.
- Covers: Importing a module into itself creates a circular dependency, which can cause runtime issues, including infinite loops, unresolved imports, or undefined values.

Flagged example:

```javascript
// foo.js
import foo from "./foo.js"; // Incorrect: module imports itself
const foo = require("./foo"); // Incorrect: module imports itself
```

Accepted example:

```javascript
// foo.js
import bar from "./bar.js"; // Correct: module imports another module
```

#### [ ] `import/no-unassigned-import`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.16.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/import/no-unassigned-import.html
- What it does: This rule aims to remove modules with side-effects by reporting when a module is imported but not assigned.
- Covers: With both CommonJS' require and the ES modules' import syntax, it is possible to import a module but not to use its result. This can be done explicitly by not assigning the module to a variable. Doing so can mean either of the following things:

Flagged example:

```js
import "should";
require("should");
```

Accepted example:

```js
import _ from "foo";
import _, { foo } from "foo";
import _, { foo as bar } from "foo";
const _ = require("foo");
const { foo } = require("foo");
const { foo: bar } = require("foo");
bar(require("foo"));
```

## jest

### style

#### [ ] `jest/consistent-test-it`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.5.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/consistent-test-it.html
- What it does: Jest allows you to choose how you want to define your tests, using the it or the test keywords, with multiple permutations for each:
- Covers: It's a good practice to be consistent in your test suite, so that all tests are written in the same way.

Example signal: Covers consistent test it concerns.

#### [ ] `jest/max-expects`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/max-expects.html
- What it does: This rule enforces a maximum number of expect() calls in a single test.
- Covers: Tests with many different assertions are likely mixing multiple objectives. It is generally better to have a single objective per test to ensure that when a test fails, the problem is easy to identify.

Flagged example:

```javascript
test("should not pass", () => {
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
});

it("should not pass", () => {
// ...
```

Accepted example:

```javascript
test("should not pass", () => {
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
});

it("should not pass", () => {
// ...
```

#### [ ] `jest/max-nested-describe`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/max-nested-describe.html
- What it does: This rule enforces a maximum depth to nested describe() calls.
- Covers: Nesting describe() blocks too deeply can make the test suite hard to read and understand.

Flagged example:

```javascript
describe("foo", () => {
  describe("bar", () => {
    describe("baz", () => {
      describe("qux", () => {
        describe("quxx", () => {
          describe("too many", () => {
            it("should get something", () => {
              expect(getSomething()).toBe("Something");
            });
          });
// ...
```

Accepted example:

```ts
describe("foo", () => {
  describe("bar", () => {
    it("should get something", () => {
      expect(getSomething()).toBe("Something");
    });
  });
  describe("qux", () => {
    it("should get something", () => {
      expect(getSomething()).toBe("Something");
    });
// ...
```

#### [ ] `jest/no-alias-methods`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-alias-methods.html
- What it does: Enforces Jest's canonical matcher names instead of aliases.
- Covers: Jest matcher aliases are deprecated and are going to be removed in the next major version of Jest. See jestjs/jest#13164 for more.

Flagged example:

```javascript
expect(a).toBeCalled();
expect(a).toBeCalledTimes();
expect(a).toBeCalledWith();
expect(a).lastCalledWith();
expect(a).nthCalledWith();
expect(a).toReturn();
expect(a).toReturnTimes();
expect(a).toReturnWith();
expect(a).lastReturnedWith();
expect(a).nthReturnedWith();
// ...
```

Accepted example:

```javascript
expect(a).toHaveBeenCalled();
expect(a).toHaveBeenCalledTimes();
expect(a).toHaveBeenCalledWith();
expect(a).toHaveBeenLastCalledWith();
expect(a).toHaveBeenNthCalledWith();
expect(a).toHaveReturned();
expect(a).toHaveReturnedTimes();
expect(a).toHaveReturnedWith();
expect(a).toHaveLastReturnedWith();
expect(a).toHaveNthReturnedWith();
// ...
```

#### [ ] `jest/no-confusing-set-timeout`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-confusing-set-timeout.html
- What it does: Disallow confusing usages of jest.setTimeout.
- Covers: being called anywhere other than in global scope being called multiple times * being called after other Jest functions like hooks, describe, test, or it

Example signal: Flags confusing set timeout patterns in jest code.

#### [ ] `jest/no-deprecated-functions`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-deprecated-functions.html
- What it does: Over the years Jest has accrued some debt in the form of functions that have either been renamed for clarity, or replaced with more powerful APIs.
- Covers: While typically these deprecated functions are kept in the codebase for a number of majors, eventually they are removed completely.

Flagged example:

```javascript
jest.resetModuleRegistry; // since Jest 15
jest.addMatchers; // since Jest 17
```

Accepted example:

```javascript
jest.resetModuleRegistry; // since Jest 15
jest.addMatchers; // since Jest 17
```

#### [ ] `jest/no-done-callback`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-done-callback.html
- What it does: This rule checks the function parameter of hooks & tests for use of the done argument, suggesting you return a promise instead.
- Covers: When calling asynchronous code in hooks and tests, jest needs to know when the asynchronous work is complete to progress the current run. Originally the most common pattern to achieve this was to use callbacks:

Flagged example:

```javascript
beforeEach((done) => {
  // ...
});

test("myFunction()", (done) => {
  // ...
});

test("myFunction()", function (done) {
  // ...
// ...
```

Accepted example:

```javascript
beforeEach((done) => {
  // ...
});

test("myFunction()", (done) => {
  // ...
});

test("myFunction()", function (done) {
  // ...
// ...
```

#### [ ] `jest/no-duplicate-hooks`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-duplicate-hooks.html
- What it does: Disallows duplicate hooks in describe blocks.
- Covers: Having duplicate hooks in a describe block can lead to confusion and unexpected behavior. When multiple hooks of the same type exist, they all execute in order, which can make it difficult to understand the test setup flow and may result in redundant or conflicting operations. This makes tests harder to maintain and debug.

Flagged example:

```javascript
describe("foo", () => {
  beforeEach(() => {
    // some setup
  });
  beforeEach(() => {
    // some setup
  });
  test("foo_test", () => {
    // some test
  });
// ...
```

Accepted example:

```javascript
describe("foo", () => {
  beforeEach(() => {
    // some setup
  });
  test("foo_test", () => {
    // some test
  });
});

// Nested describe scenario
// ...
```

#### [ ] `jest/no-hooks`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-hooks.html
- What it does: Disallows Jest setup and teardown hooks, such as beforeAll.
- Covers: Jest provides global functions for setup and teardown tasks, which are called before/after each test case and each test suite. The use of these hooks promotes shared state between tests.

Flagged example:

```javascript
function setupFoo(options) {
  /* ... */
}
function setupBar(options) {
  /* ... */
}

describe("foo", () => {
  let foo;
  beforeEach(() => {
// ...
```

Accepted example:

```javascript
function setupFoo(options) {
  /* ... */
}
function setupBar(options) {
  /* ... */
}

describe("foo", () => {
  let foo;
  beforeEach(() => {
// ...
```

#### [ ] `jest/no-identical-title`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-identical-title.html
- What it does: This rule looks at the title of every test and test suite. It will report when two test suites or two test cases at the same level of a test suite have the same title.
- Covers: Having identical titles for two different tests or test suites may create confusion. For example, when a test with the same title as another test in the same test suite fails, it is harder to know which one failed and thus harder to fix.

Flagged example:

```javascript
describe("baz", () => {
  //...
});

describe("baz", () => {
  // Has the same title as a previous test suite
  // ...
});
```

Accepted example:

```javascript
describe("baz", () => {
  //...
});

describe("baz", () => {
  // Has the same title as a previous test suite
  // ...
});
```

#### [ ] `jest/no-interpolation-in-snapshots`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-interpolation-in-snapshots.html
- What it does: Prevents the use of string interpolations in snapshots.
- Covers: Interpolation prevents snapshots from being updated. Instead, properties should be overloaded with a matcher by using property matchers.

Flagged example:

```javascript
expect(something).toMatchInlineSnapshot(
  `Object {
    property: ${interpolated}
  }`,
);

expect(something).toMatchInlineSnapshot(
  { other: expect.any(Number) },
  `Object {
    other: Any<Number>,
// ...
```

Accepted example:

```javascript
expect(something).toMatchInlineSnapshot(
  `Object {
    property: ${interpolated}
  }`,
);

expect(something).toMatchInlineSnapshot(
  { other: expect.any(Number) },
  `Object {
    other: Any<Number>,
// ...
```

#### [ ] `jest/no-jasmine-globals`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-jasmine-globals.html
- What it does: This rule reports on any usage of Jasmine globals, which are not ported to Jest, and suggests alternatives from Jest's own API.
- Covers: When migrating from Jasmine to Jest, relying on Jasmine-specific globals creates compatibility issues and prevents taking advantage of Jest's improved testing features and better error reporting.

Flagged example:

```javascript
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
test("my test", () => {
  pending();
});
test("my test", () => {
  jasmine.createSpy();
});
```

Accepted example:

```javascript
jest.setTimeout(5000);
test("my test", () => {
  // Use test.skip() instead of pending()
});
test.skip("my test", () => {
  // Skipped test
});
test("my test", () => {
  jest.fn(); // Use jest.fn() instead of jasmine.createSpy()
});
```

#### [ ] `jest/no-large-snapshots`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-large-snapshots.html
- What it does: Disallow large snapshots.
- Covers: When using Jest's snapshot capability one should be mindful of the size of created snapshots. As a general best practice snapshots should be limited in size in order to be more manageable and reviewable. A stored snapshot is only as good as its review and as such keeping it short, sweet, and readable is important to allow for thorough reviews.

Flagged example:

```javascript
exports[`a large snapshot 1`] = `
line 1
line 2
line 3
line 4
line 5
line 6
line 7
line 8
line 9
// ...
```

Accepted example:

```javascript
exports[`a large snapshot 1`] = `
line 1
line 2
line 3
line 4
line 5
line 6
line 7
line 8
line 9
// ...
```

#### [ ] `jest/no-mocks-import`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-mocks-import.html
- What it does: This rule reports imports from a path containing a __mocks__ component.
- Covers: Manually importing mocks from a __mocks__ directory can lead to unexpected behavior and breaks Jest's automatic mocking system. Jest is designed to automatically resolve and use mocks from __mocks__ directories when jest.mock() is called. Directly importing from these directories bypasses Jest's module resolution system and can cause inconsistencies between test and production environments.

Flagged example:

```ts
import thing from "./__mocks__/index";
require("./__mocks__/index");
```

Accepted example:

```ts
import thing from "thing";
require("thing");
```

#### [ ] `jest/no-restricted-jest-methods`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-restricted-jest-methods.html
- What it does: Restrict the use of specific jest and vi methods.
- Covers: Certain Jest or Vitest methods may be deprecated, discouraged in specific contexts, or incompatible with your testing environment. Restricting them helps maintain consistent and reliable test practices.

Flagged example:

```javascript
jest.useFakeTimers();
it("calls the callback after 1 second via advanceTimersByTime", () => {
  // ...

  jest.advanceTimersByTime(1000);

  // ...
});

test("plays video", () => {
// ...
```

Accepted example:

```javascript
jest.useFakeTimers();
it("calls the callback after 1 second via advanceTimersByTime", () => {
  // ...

  jest.advanceTimersByTime(1000);

  // ...
});

test("plays video", () => {
// ...
```

#### [ ] `jest/no-restricted-matchers`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-restricted-matchers.html
- What it does: Ban specific matchers & modifiers from being used, and can suggest alternatives.
- Covers: Some matchers or modifiers might be discouraged in your codebase for various reasons: they might be deprecated, cause confusion, have performance implications, or there might be better alternatives available. This rule allows you to enforce consistent testing patterns by restricting certain Jest matchers and providing guidance on preferred alternatives.

Flagged example:

```javascript
it("is false", () => {
  // if this has a modifier (i.e. `not.toBeFalsy`), it would be considered fine
  expect(a).toBeFalsy();
});

it("resolves", async () => {
  // all uses of this modifier are disallowed, regardless of matcher
  await expect(myPromise()).resolves.toBe(true);
});

// ...
```

Accepted example:

```javascript
it("is false", () => {
  // if this has a modifier (i.e. `not.toBeFalsy`), it would be considered fine
  expect(a).toBeFalsy();
});

it("resolves", async () => {
  // all uses of this modifier are disallowed, regardless of matcher
  await expect(myPromise()).resolves.toBe(true);
});

// ...
```

#### [ ] `jest/no-test-prefixes`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-test-prefixes.html
- What it does: Require using .only and .skip over f and x.
- Covers: Jest allows you to choose how you want to define focused and skipped tests, with multiple permutations for each:

Flagged example:

```javascript
fit("foo"); // invalid
fdescribe("foo"); // invalid
xit("foo"); // invalid
xtest("foo"); // invalid
xdescribe("foo"); // invalid
```

Accepted example:

```javascript
fit("foo"); // invalid
fdescribe("foo"); // invalid
xit("foo"); // invalid
xtest("foo"); // invalid
xdescribe("foo"); // invalid
```

#### [ ] `jest/no-test-return-statement`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-test-return-statement.html
- What it does: Disallow explicitly returning from tests.
- Covers: Tests in Jest should be void and not return values. If you are returning Promises then you should update the test to use async/await.

Flagged example:

```javascript
test("one", () => {
  return expect(1).toBe(1);
});
```

Accepted example:

```javascript
test("one", () => {
  expect(1).toBe(1);
});
```

#### [ ] `jest/no-unneeded-async-expect-function`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.39.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-unneeded-async-expect-function.html
- What it does: Disallows unnecessary async function wrapper for expected promises.
- Covers: When the only statement inside an async wrapper is await someCall(), the call should be passed directly to expect instead. This makes the test code more concise and easier to read.

Flagged example:

```js
await expect(async () => {
  await doSomethingAsync();
}).rejects.toThrow();

await expect(async () => await doSomethingAsync()).rejects.toThrow();
```

Accepted example:

```js
await expect(doSomethingAsync()).rejects.toThrow();
```

#### [ ] `jest/no-untyped-mock-factory`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.2.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-untyped-mock-factory.html
- What it does: This rule triggers a warning if mock() or doMock() is used without a generic type parameter or return type.
- Covers: By default, jest.mock and jest.doMock allow any type to be returned by a mock factory. A generic type parameter can be used to enforce that the factory returns an object with the same shape as the original module, or some other strict type. Requiring a type makes it easier to use TypeScript to catch changes needed in test mocks when the source module changes.

Flagged example:

```typescript
jest.mock("../moduleName", () => {
  return jest.fn(() => 42);
});

jest.mock("./module", () => ({
  ...jest.requireActual("./module"),
  foo: jest.fn(),
}));

jest.mock("random-num", () => {
// ...
```

Accepted example:

```typescript
// Uses typeof import()
jest.mock<typeof import("../moduleName")>("../moduleName", () => {
  return jest.fn(() => 42);
});

jest.mock<typeof import("./module")>("./module", () => ({
  ...jest.requireActual("./module"),
  foo: jest.fn(),
}));

// ...
```

#### [ ] `jest/padding-around-after-all-blocks`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/padding-around-after-all-blocks.html
- What it does: This rule enforces a line of padding before and after 1 or more afterAll statements.
- Covers: Inconsistent formatting of code can make the code more difficult to read and follow. This rule helps ensure that afterAll blocks are visually separated from the rest of the code, making them easier to identify while looking through test files.

Flagged example:

```js
const thing = 123;
afterAll(() => {});
```

Accepted example:

```js
const thing = 123;

afterAll(() => {});
```

#### [ ] `jest/padding-around-test-blocks`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.13.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/padding-around-test-blocks.html
- What it does: This rule enforces a line of padding before and after 1 or more test/it statements.
- Covers: Inconsistent formatting of code can make the code more difficult to read and follow. This rule helps ensure that test blocks are visually separated from the rest of the code, making them easier to identify while looking through test files.

Flagged example:

```js
const thing = 123;
test("foo", () => {});
test("bar", () => {});
```

Accepted example:

```js
const thing = 123;

test("foo", () => {});

test("bar", () => {});
```

#### [ ] `jest/prefer-called-with`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-called-with.html
- What it does: Suggest using toBeCalledWith() or toHaveBeenCalledWith()
- Covers: When testing function calls, it's often more valuable to assert both that a function was called AND what arguments it was called with. Using toBeCalled() or toHaveBeenCalled() only verifies the function was invoked, but doesn't validate the arguments, potentially missing bugs where functions are called with incorrect parameters.

Flagged example:

```javascript
expect(someFunction).toBeCalled();
expect(someFunction).toHaveBeenCalled();
```

Accepted example:

```javascript
expect(noArgsFunction).toBeCalledWith();
expect(roughArgsFunction).toBeCalledWith(expect.anything(), expect.any(Date));
expect(anyArgsFunction).toBeCalledTimes(1);
expect(uncalledFunction).not.toBeCalled();
```

#### [ ] `jest/prefer-comparison-matcher`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-comparison-matcher.html
- What it does: This rule checks for comparisons in tests that could be replaced with one of the following built-in comparison matchers:
- Covers: Using generic matchers like toBe(true) with comparison expressions makes tests less readable and provides less helpful error messages when they fail. Jest's specific comparison matchers offer clearer intent and better error output that shows the actual values being compared.

Flagged example:

```js
expect(x > 5).toBe(true);
expect(x < 7).not.toEqual(true);
expect(x <= y).toStrictEqual(true);
```

Accepted example:

```js
expect(x).toBeGreaterThan(5);
expect(x).not.toBeLessThanOrEqual(7);
expect(x).toBeLessThanOrEqual(y);
// special case - see below
expect(x < "Carl").toBe(true);
```

#### [ ] `jest/prefer-each`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-each.html
- What it does: This rule enforces using each rather than manual loops.
- Covers: Manual loops for tests can be less readable and more error-prone. Using each provides a clearer and more concise way to run parameterized tests, improving readability and maintainability.

Flagged example:

```js
for (const item of items) {
  describe(item, () => {
    expect(item).toBe("foo");
  });
}
```

Accepted example:

```js
describe.each(items)("item", (item) => {
  expect(item).toBe("foo");
});
```

#### [ ] `jest/prefer-ending-with-an-expect`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.60.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-ending-with-an-expect.html
- What it does: Enforces that test blocks end with an assertion (expect or a configured assertion function).
- Covers: A test that doesn't end with an assertion may be performing side effects or setup after its last check, which makes the test harder to understand and can hide failures. Ending with an assertion ensures the test's final action is verifying behavior.

Flagged example:

```js
it("lets me change the selected option", () => {
  const container = render(MySelect, {
    props: { options: [1, 2, 3], selected: 1 },
  });

  expect(container).toBeDefined();
  expect(container.toHTML()).toContain('<option value="1" selected>');

  container.setProp("selected", 2);
});
```

Accepted example:

```js
it("lets me change the selected option", () => {
  const container = render(MySelect, {
    props: { options: [1, 2, 3], selected: 1 },
  });

  expect(container).toBeDefined();
  expect(container.toHTML()).toContain('<option value="1" selected>');

  container.setProp("selected", 2);

// ...
```

#### [ ] `jest/prefer-equality-matcher`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.2.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-equality-matcher.html
- What it does: Jest has built-in matchers for expecting equality, which allow for more readable tests and error messages if an expectation fails.
- Covers: Testing equality expressions with generic matchers like toBe(true) makes tests harder to read and understand. When tests fail, the error messages are less helpful because they don't show what the actual values were. Using specific equality matchers provides clearer test intent and better debugging information.

Flagged example:

```javascript
expect(x === 5).toBe(true);
expect(name === "Carl").not.toEqual(true);
expect(myObj !== thatObj).toStrictEqual(true);
```

Accepted example:

```javascript
expect(x).toBe(5);
expect(name).not.toEqual("Carl");
expect(myObj).toStrictEqual(thatObj);
```

#### [ ] `jest/prefer-expect-assertions`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.62.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-expect-assertions.html
- What it does: Enforces that every test has either expect.assertions(<number>) or expect.hasAssertions() as its first expression.
- Covers: Without explicit assertion counts, tests with asynchronous code, callbacks, or loops may pass even if some expect calls are never reached, silently hiding bugs.

Flagged example:

```javascript
test("no assertions", () => {
  // ...
});
test("assertions not first", () => {
  expect(true).toBe(true);
  // ...
});
```

Accepted example:

```javascript
test("with assertion count", () => {
  expect.assertions(1);
  expect(true).toBe(true);
});
test("with hasAssertions", () => {
  expect.hasAssertions();
  expect(true).toBe(true);
});
```

#### [ ] `jest/prefer-expect-resolves`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-expect-resolves.html
- What it does: Prefer await expect(...).resolves over expect(await ...) when testing promises.
- Covers: When working with promises, there are two primary ways you can test the resolved value:

Flagged example:

```javascript
it("passes", async () => {
  expect(await someValue()).toBe(true);
});
it("is true", async () => {
  const myPromise = Promise.resolve(true);
  expect(await myPromise).toBe(true);
});
```

Accepted example:

```javascript
it("passes", async () => {
  await expect(someValue()).resolves.toBe(true);
});
it("is true", async () => {
  const myPromise = Promise.resolve(true);

  await expect(myPromise).resolves.toBe(true);
});
it("errors", async () => {
  await expect(Promise.reject(new Error("oh noes!"))).rejects.toThrowError("oh noes!");
// ...
```

#### [ ] `jest/prefer-hooks-in-order`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.6.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-hooks-in-order.html
- What it does: Ensures that hooks are in the order that they are called in.
- Covers: While hooks can be setup in any order, they're always called by jest in this specific order:

Flagged example:

```javascript
describe("foo", () => {
  beforeEach(() => {
    seedMyDatabase();
  });
  beforeAll(() => {
    createMyDatabase();
  });
  it("accepts this input", () => {
    // ...
  });
// ...
```

Accepted example:

```javascript
describe("foo", () => {
  beforeAll(() => {
    createMyDatabase();
  });
  beforeEach(() => {
    seedMyDatabase();
  });
  it("accepts this input", () => {
    // ...
  });
// ...
```

#### [ ] `jest/prefer-hooks-on-top`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-hooks-on-top.html
- What it does: While hooks can be setup anywhere in a test file, they are always called in a specific order, which means it can be confusing if they're intermixed with test cases.
- Covers: When hooks are mixed with test cases, it becomes harder to understand the test setup and execution order. This can lead to confusion about which hooks apply to which tests and when they run. Grouping hooks at the top of each describe block makes the test structure clearer and more maintainable.

Flagged example:

```javascript
describe("foo", () => {
  beforeEach(() => {
    seedMyDatabase();
  });

  it("accepts this input", () => {
    // ...
  });

  beforeAll(() => {
// ...
```

Accepted example:

```javascript
describe("foo", () => {
  beforeAll(() => {
    createMyDatabase();
  });

  beforeEach(() => {
    seedMyDatabase();
  });

  afterAll(() => {
// ...
```

#### [ ] `jest/prefer-importing-jest-globals`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.60.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-importing-jest-globals.html
- What it does: Prefer importing Jest globals (describe, test, expect, etc.) from @jest/globals rather than relying on ambient globals.
- Covers: Using global Jest functions without explicit imports makes dependencies implicit and can cause issues with type checking, editor tooling, and when migrating between test runners.

Flagged example:

```javascript
describe("suite", () => {
  test("foo");
  expect(true).toBeDefined();
});
```

Accepted example:

```javascript
import { describe, expect, test } from "@jest/globals";
describe("suite", () => {
  test("foo");
  expect(true).toBeDefined();
});
```

#### [ ] `jest/prefer-jest-mocked`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.5.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-jest-mocked.html
- What it does: When working with mocks of functions using Jest, it's recommended to use the jest.mocked() helper function to properly type the mocked functions. This rule enforces the use of jest.mocked() for better type safety and readability.
- Covers: Using type assertions like fn as jest.Mock is a less safe approach than using jest.mocked(). The jest.mocked() helper provides better type safety by preserving the original function signature while adding mock capabilities. It also makes the code more readable and explicit about mocking intentions.

Flagged example:

```typescript
(foo as jest.Mock).mockReturnValue(1);
const mock = (foo as jest.Mock).mockReturnValue(1);
(foo as unknown as jest.Mock).mockReturnValue(1);
(Obj.foo as jest.Mock).mockReturnValue(1);
([].foo as jest.Mock).mockReturnValue(1);
```

Accepted example:

```typescript
jest.mocked(foo).mockReturnValue(1);
const mock = jest.mocked(foo).mockReturnValue(1);
jest.mocked(Obj.foo).mockReturnValue(1);
jest.mocked([].foo).mockReturnValue(1);
```

#### [ ] `jest/prefer-lowercase-title`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.15.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-lowercase-title.html
- What it does: Enforce it, test, describe, and bench to have descriptions that begin with a lowercase letter. This provides more readable test failures.
- Covers: Lowercase messages for test failures generally result in more grammatically correct failure messages when you have a test failure.

Flagged example:

```javascript
it("Adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

Accepted example:

```javascript
it("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

#### [ ] `jest/prefer-mock-promise-shorthand`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.2.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-mock-promise-shorthand.html
- What it does: When working with mocks of functions that return promises, Jest provides some API sugar functions to reduce the amount of boilerplate you have to write. These methods should be preferred when possible.
- Covers: Using generic mock functions like mockImplementation(() => Promise.resolve()) or mockReturnValue(Promise.reject()) is more verbose and less readable than Jest's specialized promise shorthands. The shorthand methods like mockResolvedValue() and mockRejectedValue() are more expressive and make the test intent clearer.

Flagged example:

```javascript
jest.fn().mockImplementation(() => Promise.resolve(123));
jest.spyOn(fs.promises, "readFile").mockReturnValue(Promise.reject(new Error("oh noes!")));

myFunction
  .mockReturnValueOnce(Promise.resolve(42))
  .mockImplementationOnce(() => Promise.resolve(42))
  .mockReturnValue(Promise.reject(new Error("too many calls!")));
```

Accepted example:

```javascript
jest.fn().mockResolvedValue(123);
jest.spyOn(fs.promises, "readFile").mockRejectedValue(new Error("oh noes!"));

myFunction
  .mockResolvedValueOnce(42)
  .mockResolvedValueOnce(42)
  .mockRejectedValue(new Error("too many calls!"));
```

#### [ ] `jest/prefer-mock-return-shorthand`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-mock-return-shorthand.html
- What it does: When working with mocks of functions that return simple values, Jest provides some API sugar functions to reduce the amount of boilerplate you have to write.
- Covers: Not using Jest's API sugar functions adds unnecessary boilerplate and makes tests harder to read. These helpers clearly express intent and reduce errors, keeping tests simple and maintainable.

Flagged example:

```js
jest.fn().mockImplementation(() => "hello world");

jest
  .spyOn(fs.promises, "readFile")
  .mockImplementationOnce(() => Promise.reject(new Error("oh noes!")));

myFunction
  .mockImplementationOnce(() => 42)
  .mockImplementationOnce(() => Promise.resolve(42))
  .mockReturnValue(0);
```

Accepted example:

```js
jest.fn().mockResolvedValue(123);

jest.spyOn(fs.promises, "readFile").mockReturnValue(Promise.reject(new Error("oh noes!")));
jest.spyOn(fs.promises, "readFile").mockRejectedValue(new Error("oh noes!"));

jest.spyOn(fs, "readFileSync").mockImplementationOnce(() => {
  throw new Error("oh noes!");
});

myFunction.mockResolvedValueOnce(42).mockResolvedValueOnce(42).mockReturnValue(0);
```

#### [ ] `jest/prefer-spy-on`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-spy-on.html
- What it does: When mocking a function by overwriting a property you have to manually restore the original implementation when cleaning up. When using jest.spyOn() Jest keeps track of changes, and they can be restored with jest.restoreAllMocks(), mockFn.mockRestore() or by setting restoreMocks to true in the Jest config.
- Covers: Directly overwriting properties with mock functions can lead to cleanup issues and test isolation problems. When you manually assign a mock to a property, you're responsible for restoring the original implementation, which is easy to forget and can cause tests to interfere with each other. Using jest.spyOn() provides automatic cleanup capabilities and makes your tests more reliable.

Flagged example:

```javascript
Date.now = jest.fn();
Date.now = jest.fn(() => 10);
```

Accepted example:

```javascript
jest.spyOn(Date, "now");
jest.spyOn(Date, "now").mockImplementation(() => 10);
```

#### [ ] `jest/prefer-strict-equal`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-strict-equal.html
- What it does: This rule triggers a warning if toEqual() is used to assert equality.
- Covers: The toEqual() matcher performs a deep equality check but ignores undefined values in objects and arrays. This can lead to false positives where tests pass when they should fail. toStrictEqual() provides more accurate comparison by checking for undefined values.

Flagged example:

```javascript
expect({ a: "a", b: undefined }).toEqual({ a: "a" });
```

Accepted example:

```javascript
expect({ a: "a", b: undefined }).toStrictEqual({ a: "a" });
```

#### [ ] `jest/prefer-to-be`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-to-be.html
- What it does: Recommends using toBe matcher for primitive literals and specific matchers for null, undefined, and NaN.
- Covers: When asserting against primitive literals such as numbers and strings, the equality matchers all operate the same, but read slightly differently in code.

Flagged example:

```javascript
expect(value).not.toEqual(5);
expect(getMessage()).toStrictEqual("hello world");
expect(loadMessage()).resolves.toEqual("hello world");
```

Accepted example:

```javascript
expect(value).not.toBe(5);
expect(getMessage()).toBe("hello world");
expect(loadMessage()).resolves.toBe("hello world");
expect(didError).not.toBe(true);
expect(catchError()).toStrictEqual({ message: "oh noes!" });
```

#### [ ] `jest/prefer-to-contain`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-to-contain.html
- What it does: In order to have a better failure message, toContain() should be used upon asserting expectations on an array containing an object.
- Covers: This rule triggers a warning if toBe(), toEqual() or toStrictEqual() is used to assert object inclusion in an array

Flagged example:

```javascript
expect(a.includes(b)).toBe(true);
expect(a.includes(b)).not.toBe(true);
expect(a.includes(b)).toBe(false);
expect(a.includes(b)).toEqual(true);
expect(a.includes(b)).toStrictEqual(true);
```

Accepted example:

```javascript
expect(a).toContain(b);
expect(a).not.toContain(b);
```

#### [ ] `jest/prefer-to-have-been-called`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.34.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-to-have-been-called.html
- What it does: Suggests using toHaveBeenCalled() or not.toHaveBeenCalled() over toHaveBeenCalledTimes(0) or toBeCalledTimes(0).
- Covers: toHaveBeenCalled() is more explicit and readable than toHaveBeenCalledTimes(0).

Flagged example:

```js
expect(mock).toHaveBeenCalledTimes(0);
expect(mock).toBeCalledTimes(0);
expect(mock).not.toHaveBeenCalledTimes(0);
```

Accepted example:

```js
expect(mock).not.toHaveBeenCalled();
expect(mock).toHaveBeenCalled();
expect(mock).toHaveBeenCalledTimes(1);
```

#### [ ] `jest/prefer-to-have-been-called-times`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.34.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-to-have-been-called-times.html
- What it does: In order to have a better failure message, toHaveBeenCalledTimes should be used instead of directly checking the length of mock.calls.
- Covers: This rule triggers a warning if toHaveLength is used to assert the number of times a mock is called.

Flagged example:

```js
expect(someFunction.mock.calls).toHaveLength(1);
expect(someFunction.mock.calls).toHaveLength(0);
expect(someFunction.mock.calls).not.toHaveLength(1);
```

Accepted example:

```js
expect(someFunction).toHaveBeenCalledTimes(1);
expect(someFunction).toHaveBeenCalledTimes(0);
expect(someFunction).not.toHaveBeenCalledTimes(0);
expect(uncalledFunction).not.toBeCalled();
expect(method.mock.calls[0][0]).toStrictEqual(value);
```

#### [ ] `jest/prefer-to-have-length`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-to-have-length.html
- What it does: In order to have a better failure message, toHaveLength() should be used upon asserting expectations on objects length property.
- Covers: This rule triggers a warning if toBe(), toEqual() or toStrictEqual() is used to assert objects length property.

Flagged example:

```javascript
expect(files["length"]).toBe(1);
expect(files["length"]).toBe(1);
expect(files["length"])["not"].toBe(1);
```

Accepted example:

```javascript
expect(files).toHaveLength(1);
```

#### [ ] `jest/prefer-todo`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-todo.html
- What it does: When test cases are empty then it is better to mark them as test.todo as it will be highlighted in the summary output.
- Covers: This rule triggers a warning if empty test cases are used without 'test.todo'.

Flagged example:

```javascript
test("i need to write this test"); // invalid
test("i need to write this test", () => {}); // invalid
test.skip("i need to write this test", () => {}); // invalid
```

Accepted example:

```javascript
test.todo("i need to write this test");
```

#### [ ] `jest/require-hook`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/require-hook.html
- What it does: This rule flags any expression that is either at the toplevel of a test file or directly within the body of a describe, except for the following:
- Covers: Having setup and teardown code outside of hooks can lead to unpredictable test behavior. Code that runs at the top level executes when the test file is loaded, not when tests run, which can cause issues with test isolation and make tests dependent on execution order. Using proper hooks like beforeEach, beforeAll, afterEach, and afterAll ensures that setup and teardown code runs at the correct time and maintains test isolation.

Flagged example:

```javascript
import { database, isCity } from "../database";
import { Logger } from "../../../src/Logger";
import { loadCities } from "../api";

jest.mock("../api");

const initializeCityDatabase = () => {
  database.addCity("Vienna");
  database.addCity("San Juan");
  database.addCity("Wellington");
// ...
```

Accepted example:

```javascript
import { database, isCity } from "../database";
import { Logger } from "../../../src/Logger";
import { loadCities } from "../api";

jest.mock("../api");
const initializeCityDatabase = () => {
  database.addCity("Vienna");
  database.addCity("San Juan");
  database.addCity("Wellington");
};
// ...
```

#### [ ] `jest/require-top-level-describe`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/require-top-level-describe.html
- What it does: Requires test cases and hooks to be inside a top-level describe block.
- Covers: Having tests and hooks organized within describe blocks provides better structure and grouping for test suites. It makes test output more readable and helps with test organization, especially in larger codebases.

Flagged example:

```javascript
// Above a describe block
test("my test", () => {});
describe("test suite", () => {
  it("test", () => {});
});

// Below a describe block
describe("test suite", () => {});
test("my test", () => {});

// ...
```

Accepted example:

```javascript
// Above a describe block
// In a describe block
describe("test suite", () => {
  test("my test", () => {});
});

// In a nested describe block
describe("test suite", () => {
  test("my test", () => {});
  describe("another test suite", () => {
// ...
```

### correctness

#### [ ] `jest/expect-expect`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/expect-expect.html
- What it does: This rule triggers when there is no call made to expect in a test, ensure that there is at least one expect call made in a test.
- Covers: People may forget to add assertions.

Flagged example:

```javascript
it("should be a test", () => {
  console.log("no assertion");
});
test("should assert something", () => {});
```

Accepted example:

```javascript
it("should be a test", () => {
  console.log("no assertion");
});
test("should assert something", () => {});
```

#### [ ] `jest/no-conditional-expect`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-conditional-expect.html
- What it does: This rule prevents the use of expect in conditional blocks, such as if and catch. This includes using expect in callbacks to functions named catch, which are assumed to be promises.
- Covers: Jest only considers a test to have failed if it throws an error, meaning if calls to assertion functions like expect occur in conditional code such as a catch statement, tests can end up passing but not actually test anything. Additionally, conditionals tend to make tests more brittle and complex, as they increase the amount of mental thinking needed to understand what is actually being tested.

Flagged example:

```js
it("foo", () => {
  doTest && expect(1).toBe(2);
});

it("bar", () => {
  if (!skipTest) {
    expect(1).toEqual(2);
  }
});

// ...
```

Accepted example:

```js
it("foo", () => {
  expect(!value).toBe(false);
});

function getValue() {
  if (process.env.FAIL) {
    return 1;
  }
  return 2;
}
// ...
```

#### [ ] `jest/no-disabled-tests`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-disabled-tests.html
- What it does: This rule raises a warning about disabled tests.
- Covers: Jest has a feature that allows you to temporarily mark tests as disabled. This feature is often helpful while debugging or to create placeholders for future tests. Before committing changes we may want to check that all tests are running.

Example signal: Flags disabled tests patterns in jest code.

#### [ ] `jest/no-export`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-export.html
- What it does: Prevents using exports if a file has one or more tests in it.
- Covers: This rule aims to eliminate duplicate runs of tests by exporting things from test files. If you import from a test file, then all the tests in that file will be run in each imported instance. so bottom line, don't export from a test, but instead move helper functions into a separate file when they need to be shared across tests.

Flagged example:

```javascript
export function myHelper() {}
describe("a test", () => {
  expect(1).toBe(1);
});
```

Accepted example:

```javascript
export function myHelper() {}
describe("a test", () => {
  expect(1).toBe(1);
});
```

#### [ ] `jest/no-focused-tests`

- Category: correctness
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-focused-tests.html
- What it does: This rule reminds you to remove .only from your tests by raising a warning whenever you are using the exclusivity feature.
- Covers: Jest has a feature that allows you to focus tests by appending .only or prepending f to a test-suite or a test-case. This feature is really helpful to debug a failing test, so you don't have to execute all of your tests. After you have fixed your test and before committing the changes you have to remove .only to ensure all tests are executed on your build system.

Flagged example:

```javascript
describe.only("foo", () => {});
it.only("foo", () => {});
describe["only"]("bar", () => {});
it["only"]("bar", () => {});
test.only("foo", () => {});
test["only"]("bar", () => {});
fdescribe("foo", () => {});
fit("foo", () => {});
fit.each`
  table
// ...
```

Accepted example:

```javascript
describe.only("foo", () => {});
it.only("foo", () => {});
describe["only"]("bar", () => {});
it["only"]("bar", () => {});
test.only("foo", () => {});
test["only"]("bar", () => {});
fdescribe("foo", () => {});
fit("foo", () => {});
fit.each`
  table
// ...
```

#### [ ] `jest/no-standalone-expect`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-standalone-expect.html
- What it does: Prevents expect statements outside of a test or it block. An expect within a helper function (but outside of a test or it block) will not trigger this rule.
- Covers: expect statements outside of test blocks will not be executed by the Jest test runner, which means they won't actually test anything. This can lead to false confidence in test coverage and may hide bugs that would otherwise be caught by proper testing.

Flagged example:

```javascript
describe("a test", () => {
  expect(1).toBe(1);
});
```

Accepted example:

```javascript
describe("a test", () => {
  expect(1).toBe(1);
});
```

#### [ ] `jest/prefer-snapshot-hint`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/prefer-snapshot-hint.html
- What it does: Enforces including a hint string with snapshot matchers (toMatchSnapshot and toThrowErrorMatchingSnapshot).
- Covers: Auto-numbered snapshot names are fragile - adding or reordering assertions shifts all subsequent numbers, causing unrelated snapshots to appear changed and obscuring real differences in code review.

Flagged example:

```js
const snapshotOutput = ({ stdout, stderr }) => {
  expect(stdout).toMatchSnapshot();
  expect(stderr).toMatchSnapshot();
};

describe("cli", () => {
  describe("--version flag", () => {
    it("prints the version", async () => {
      snapshotOutput(await runCli(["--version"]));
    });
// ...
```

Accepted example:

```js
const snapshotOutput = ({ stdout, stderr }, hints) => {
  expect(stdout).toMatchSnapshot({}, `stdout: ${hints.stdout}`);
  expect(stderr).toMatchSnapshot({}, `stderr: ${hints.stderr}`);
};

describe("cli", () => {
  describe("--version flag", () => {
    it("prints the version", async () => {
      snapshotOutput(await runCli(["--version"]), {
        stdout: "version string",
// ...
```

#### [ ] `jest/require-to-throw-message`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/require-to-throw-message.html
- What it does: This rule triggers a warning if toThrow() or toThrowError() is used without an error message.
- Covers: Using toThrow() or toThrowError() without specifying an expected error message makes tests less specific and harder to debug. When a test only checks that an error was thrown but not what kind of error, it can pass even when the wrong error is thrown, potentially hiding bugs. Providing an expected error message or error type makes tests more precise and helps catch regressions more effectively.

Flagged example:

```javascript
test("all the things", async () => {
  expect(() => a()).toThrow();
  expect(() => a()).toThrowError();
  await expect(a()).rejects.toThrow();
  await expect(a()).rejects.toThrowError();
});
```

Accepted example:

```javascript
test("all the things", async () => {
  expect(() => a()).toThrow("a");
  expect(() => a()).toThrowError("a");
  await expect(a()).rejects.toThrow("a");
  await expect(a()).rejects.toThrowError("a");
});
```

#### [ ] `jest/valid-describe-callback`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/valid-describe-callback.html
- What it does: This rule validates that the second parameter of a describe() function is a callback function. This callback function:
- Covers: Using an improper describe() callback function can lead to unexpected test errors.

Flagged example:

```javascript
// Async callback functions are not allowed
describe("myFunction()", async () => {
  // ...
});

// Callback function parameters are not allowed
describe("myFunction()", (done) => {
  // ...
});

// ...
```

Accepted example:

```javascript
// Async callback functions are not allowed
describe("myFunction()", async () => {
  // ...
});

// Callback function parameters are not allowed
describe("myFunction()", (done) => {
  // ...
});

// ...
```

#### [ ] `jest/valid-expect`

- Category: correctness
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/valid-expect.html
- What it does: Checks that expect() is called correctly.
- Covers: expect() is a function that is used to assert values in tests. It should be called with a single argument, which is the value to be tested. If you call expect() with no arguments, or with more than one argument, it will not work as expected.

Flagged example:

```javascript
expect();
expect("something");
expect(true).toBeDefined;
expect(Promise.resolve("Hi!")).resolves.toBe("Hi!");
```

Accepted example:

```javascript
expect("something").toEqual("something");
expect(true).toBeDefined();
expect(Promise.resolve("Hi!")).resolves.toBe("Hi!");
```

#### [ ] `jest/valid-expect-in-promise`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.60.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/valid-expect-in-promise.html
- What it does: Ensures that expect calls inside promise chains (.then(), .catch(), .finally()) are properly awaited or returned from the test.
- Covers: When expect is called inside a promise callback that is not awaited or returned, the test may pass even if the assertion fails because the test completes before the promise resolves. This leads to silently passing tests with broken assertions.

Flagged example:

```javascript
test("promise test", async () => {
  something().then((value) => {
    expect(value).toBe("red");
  });
});

test("promises test", () => {
  const onePromise = something().then((value) => {
    expect(value).toBe("red");
  });
// ...
```

Accepted example:

```javascript
test("promise test", async () => {
  await something().then((value) => {
    expect(value).toBe("red");
  });
});

test("promises test", () => {
  const onePromise = something().then((value) => {
    expect(value).toBe("red");
  });
// ...
```

#### [ ] `jest/valid-title`

- Category: correctness
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/valid-title.html
- What it does: Checks that the titles of Jest and Vitest blocks are valid.
- Covers: Titles that are not valid can be misleading and make it harder to understand the purpose of the test.

Flagged example:

```javascript
describe("", () => {});
describe("foo", () => {
  it("", () => {});
});
it("", () => {});
test("", () => {});
xdescribe("", () => {});
xit("", () => {});
xtest("", () => {});
```

Accepted example:

```javascript
describe("foo", () => {});
it("bar", () => {});
test("baz", () => {});
```

### suspicious

#### [ ] `jest/no-commented-out-tests`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-commented-out-tests.html
- What it does: This rule raises a warning about commented-out tests. It's similar to the no-disabled-tests rule.
- Covers: You may forget to uncomment some tests. This rule raises a warning about commented-out tests.

Flagged example:

```javascript
// describe('foo', () => {});
// it('foo', () => {});
// test('foo', () => {});

// describe.skip('foo', () => {});
// it.skip('foo', () => {});
// test.skip('foo', () => {});
```

Accepted example:

```javascript
// describe('foo', () => {});
// it('foo', () => {});
// test('foo', () => {});

// describe.skip('foo', () => {});
// it.skip('foo', () => {});
// test.skip('foo', () => {});
```

### pedantic

#### [ ] `jest/no-conditional-in-test`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.8.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jest/no-conditional-in-test.html
- What it does: Disallow conditional statements in tests.
- Covers: Conditional statements in tests can make the test harder to read and understand. It is better to have a single test case per test function.

Flagged example:

```js
it("foo", () => {
  if (true) {
    doTheThing();
  }
});

it("bar", () => {
  switch (mode) {
    case "none":
      generateNone();
// ...
```

Accepted example:

```js
describe("my tests", () => {
  if (true) {
    it("foo", () => {
      doTheThing();
    });
  }
});

beforeEach(() => {
  switch (mode) {
// ...
```

## jsdoc

### restriction

#### [ ] `jsdoc/check-access`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/check-access.html
- What it does: Checks that @access tags use one of the following values:
- Covers: It is important to have a consistent way of specifying access levels in JSDoc comments. Using invalid or multiple access level tags creates confusion about the intended visibility of documented elements and can lead to inconsistencies in API documentation generation. Mixing different access tags or using invalid values makes the documentation unclear and potentially misleading.

Flagged example:

```javascript
/** @access private @public */

/** @access invalidlevel */
```

Accepted example:

```javascript
/** @access private */

/** @private */
```

#### [ ] `jsdoc/empty-tags`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.2.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/empty-tags.html
- What it does: Expects the following tags to be empty of any content:
- Covers: The void tags should be empty.

Flagged example:

```javascript
/** @async foo */

/** @private bar */
```

Accepted example:

```javascript
/** @async */

/** @private */
```

### correctness

#### [ ] `jsdoc/check-property-names`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.2.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/check-property-names.html
- What it does: Ensures that property names in JSDoc are not duplicated on the same block and that nested properties have defined roots.
- Covers: @property tags with the same name can be confusing and may indicate a mistake.

Flagged example:

```javascript
/**
 * @typedef {object} state
 * @property {number} foo
 * @property {string} foo
 */

/**
 * @typedef {object} state
 * @property {number} foo.bar
 */
```

Accepted example:

```javascript
/**
 * @typedef {object} state
 * @property {number} foo
 */

/**
 * @typedef {object} state
 * @property {object} foo
 * @property {number} foo.bar
 */
```

#### [ ] `jsdoc/check-tag-names`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.3.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/check-tag-names.html
- What it does: Reports invalid block tag names. Additionally checks for tag names that are redundant when using a type checker such as TypeScript.
- Covers: Using invalid tags can lead to confusion and make the documentation harder to read.

Flagged example:

```javascript
/** @Param */
/** @foo */

/**
 * This is redundant when typed.
 * @type {string}
 */
```

Accepted example:

```javascript
/** @param */
```

#### [ ] `jsdoc/implements-on-classes`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/implements-on-classes.html
- What it does: Reports an issue with any non-constructor function using @implements.
- Covers: Constructor functions should be whether marked with @class, @constructs, or being a class constructor.

Flagged example:

```javascript
/**
 * @implements {SomeClass}
 */
function quux() {}
```

Accepted example:

```javascript
class Foo {
  /**
   * @implements {SomeClass}
   */
  constructor() {}
}
/**
 * @implements {SomeClass}
 * @class
 */
// ...
```

#### [ ] `jsdoc/no-defaults`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.3.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/no-defaults.html
- What it does: This rule reports defaults being used on the relevant portion of @param or @default. It also optionally reports the presence of the square-bracketed optional arguments at all.
- Covers: The rule is intended to prevent the indication of defaults on tags where this would be redundant with ES2015 default parameters.

Flagged example:

```javascript
/** @param {number} [foo="7"] */
function quux(foo) {}
```

Accepted example:

```javascript
/** @param {number} foo */
function quux(foo) {}

/** @param foo */
function quux(foo) {}
```

#### [ ] `jsdoc/require-property`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.2.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-property.html
- What it does: Requires that all @typedef and @namespace tags have @property tags when their type is a plain object, Object, or PlainObject.
- Covers: Object type should have properties defined.

Flagged example:

```javascript
/**
 * @typedef {Object} SomeTypedef
 */

/**
 * @namespace {Object} SomeNamespace
 */
```

Accepted example:

```javascript
/**
 * @typedef {Object} SomeTypedef
 * @property {SomeType} propName Prop description
 */

/**
 * @typedef {object} Foo
 * @property someProp
 */
```

#### [ ] `jsdoc/require-property-description`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-property-description.html
- What it does: Requires that all @property tags have descriptions.
- Covers: The description of a property should be documented.

Flagged example:

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property {number} foo
 */
```

Accepted example:

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property {number} foo Foo.
 */
```

#### [ ] `jsdoc/require-property-name`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-property-name.html
- What it does: Requires that all @property tags have names.
- Covers: The name of a property type should be documented.

Flagged example:

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property {number}
 */
```

Accepted example:

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property {number} foo
 */
```

#### [ ] `jsdoc/require-property-type`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-property-type.html
- What it does: Requires that each @property tag has a type value (within curly brackets).
- Covers: The type of a property should be documented.

Flagged example:

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property foo
 */
```

Accepted example:

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property {number} foo
 */
```

#### [ ] `jsdoc/require-yields`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-yields.html
- What it does: Requires that yields are documented. Will also report if multiple @yields tags are present.
- Covers: The rule is intended to prevent the omission of @yields tags when they are necessary.

Flagged example:

```javascript
function* quux(foo) {
  yield foo;
}

/**
 * @yields {undefined}
 * @yields {void}
 */
function* quux(foo) {}
```

Accepted example:

```javascript
/** * @yields Foo */
function* quux(foo) {
  yield foo;
}
```

### pedantic

#### [ ] `jsdoc/require-param`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.4.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-param.html
- What it does: Requires that all function parameters are documented with JSDoc @param tags.
- Covers: The rule is aimed at enforcing code quality and maintainability by requiring that all function parameters are documented.

Flagged example:

```javascript
/** @param foo */
function quux(foo, bar) {}
```

Accepted example:

```javascript
/** @param foo */
function quux(foo) {}
```

#### [ ] `jsdoc/require-param-description`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.4.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-param-description.html
- What it does: Requires that each @param tag has a description value.
- Covers: The description of a param should be documented.

Flagged example:

```javascript
/** @param foo */
function quux(foo) {}
```

Accepted example:

```javascript
/** @param foo Foo. */
function quux(foo) {}
```

#### [ ] `jsdoc/require-param-name`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-param-name.html
- What it does: Requires that all @param tags have names.
- Covers: The name of a param should be documented.

Flagged example:

```javascript
/** @param {SomeType} */
function quux(foo) {}
```

Accepted example:

```javascript
/** @param {SomeType} foo */
function quux(foo) {}
```

#### [ ] `jsdoc/require-param-type`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.4.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-param-type.html
- What it does: Requires that each @param tag has a type value (within curly brackets).
- Covers: The type of a parameter should be documented.

Flagged example:

```javascript
/** @param foo */
function quux(foo) {}
```

Accepted example:

```javascript
/** @param {SomeType} foo */
function quux(foo) {}
```

#### [ ] `jsdoc/require-returns`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-returns.html
- What it does: Requires that return statements are documented. Will also report if multiple @returns tags are present.
- Covers: The rule is intended to prevent the omission of @returns tag when necessary.

Flagged example:

```javascript
/** Foo. */
function quux() {
  return foo;
}

/**
 * @returns Foo!
 * @returns Foo?
 */
function quux() {
// ...
```

Accepted example:

```javascript
/** @returns Foo. */
function quux() {
  return foo;
}
```

#### [ ] `jsdoc/require-returns-description`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-returns-description.html
- What it does: Requires that the @returns tag has a description value. The error will not be reported if the return value is void or undefined or if it is Promise<void> or Promise<undefined>.
- Covers: A @returns tag should have a description value.

Flagged example:

```javascript
/** @returns */
function quux(foo) {}
```

Accepted example:

```javascript
/** @returns Foo. */
function quux(foo) {}
```

#### [ ] `jsdoc/require-returns-type`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-returns-type.html
- What it does: Requires that the @returns tag has a type value (in curly brackets).
- Covers: A @returns tag should have a type value.

Flagged example:

```javascript
/** @returns */
function quux(foo) {}
```

Accepted example:

```javascript
/** @returns {string} */
function quux(foo) {}
```

#### [ ] `jsdoc/require-throws-type`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.65.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-throws-type.html
- What it does: Requires a type on the @throws tag.
- Covers: A @throws tag should document the type of error that may be thrown.

Flagged example:

```js
/** @throws */
function quux() {
  throw new Error("error");
}
```

Accepted example:

```js
/** @throws {Error} */
function quux() {
  throw new Error("error");
}
```

#### [ ] `jsdoc/require-yields-type`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.65.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-yields-type.html
- What it does: Requires a type on the @yields tag.
- Covers: A @yields tag should document the type yielded by the generator.

Flagged example:

```js
/** @yields */
function* quux() {}
```

Accepted example:

```js
/** @yields {string} */
function* quux() {}
```

### style

#### [ ] `jsdoc/require-throws-description`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.65.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-throws-description.html
- What it does: Requires a description for @throws tags.
- Covers: A @throws tag should explain the condition or reason an error may be thrown.

Flagged example:

```js
/**
 * @throws {Error}
 */
function quux() {
  throw new Error("error");
}
```

Accepted example:

```js
/**
 * @throws {Error} Has a description
 */
function quux() {
  throw new Error("error");
}
```

#### [ ] `jsdoc/require-yields-description`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.68.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-yields-description.html
- What it does: Requires a description for @yields tags.
- Covers: A @yields tag should explain what the generator yields.

Flagged example:

```js
/**
 * @yields {string}
 */
function* quux() {
  yield "value";
}
```

Accepted example:

```js
/**
 * @yields {string} The next value.
 */
function* quux() {
  yield "value";
}
```

## jsx_a11y

### correctness

#### [ ] `jsx_a11y/alt-text`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/alt-text.html
- What it does: Enforce that all elements that require alternative text have meaningful information to relay back to the end user.
- Covers: Alternative text is a critical component of accessibility for screen reader users, enabling them to understand the content and function of an element. Missing or inadequate alt text makes content inaccessible to users who rely on assistive technologies.

Flagged example:

```jsx
<img src="flower.jpg" />
<img src="flower.jpg" alt="" />
<object />
<area />
```

Accepted example:

```jsx
<img src="flower.jpg" alt="A close-up of a white daisy" />
<img src="decorative.jpg" alt="" role="presentation" />
<object aria-label="Interactive chart" />
<area alt="Navigation link" />
```

#### [ ] `jsx_a11y/anchor-has-content`

- Category: correctness
- Default: no
- Fix: conditional suggestion
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-has-content.html
- What it does: Enforce that anchors have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the aria-hidden prop.
- Covers: Anchor elements without content can be confusing for users relying on screen readers to understand.

Flagged example:

```jsx
<a />
<a><TextWrapper aria-hidden /></a>
```

Accepted example:

```jsx
<a>Anchor Content!</a>
<a><TextWrapper /></a>
<a dangerouslySetInnerHTML={{ __html: 'foo' }} />
<a title='foo' />
<a aria-label='foo' />
```

#### [ ] `jsx_a11y/anchor-is-valid`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-is-valid.html
- What it does: The HTML <a> element, with a valid href attribute, is formally defined as representing a hyperlink. That is, a link between one HTML document and another, or between one location inside an HTML document and another location inside the same document.
- Covers: There are many reasons why an anchor should not have logic and have a correct href attribute:

Example signal: Covers anchor is valid concerns.

#### [ ] `jsx_a11y/aria-activedescendant-has-tabindex`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-activedescendant-has-tabindex.html
- What it does: Enforce elements with aria-activedescendant are tabbable.
- Covers: Elements with aria-activedescendant must be tabbable for users to navigate to them using keyboard input. Without proper tabindex, screen reader users cannot access the element through keyboard navigation, making the functionality inaccessible.

Flagged example:

```jsx
const Bad = <div aria-activedescendant={someID} />;
```

Accepted example:

```jsx
const Good = (
  <>
    <CustomComponent />
    <CustomComponent aria-activedescendant={someID} />
    <CustomComponent aria-activedescendant={someID} tabIndex={0} />
    <CustomComponent aria-activedescendant={someID} tabIndex={-1} />
    <div />
    <input />
    <div tabIndex={0} />
    <div aria-activedescendant={someID} tabIndex={0} />
// ...
```

#### [ ] `jsx_a11y/aria-props`

- Category: correctness
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.22
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-props.html
- What it does: Enforces that elements do not use invalid ARIA attributes.
- Covers: Using invalid ARIA attributes can mislead screen readers and other assistive technologies. It may cause the accessibility features of the website to fail, making it difficult for users with disabilities to use the site effectively.

Flagged example:

```jsx
<input aria-labeledby="address_label" />
```

Accepted example:

```jsx
<input aria-labelledby="address_label" />
```

#### [ ] `jsx_a11y/aria-proptypes`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.36.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-proptypes.html
- What it does: Enforces that elements do not use invalid ARIA state and property values.
- Covers: Using invalid ARIA state and property values can mislead screen readers and other assistive technologies. It may cause the accessibility features of the website to fail, making it difficult for users with disabilities to use the site effectively.

Flagged example:

```jsx
<div aria-level="yes" />
<div aria-relevant="additions removalss" />
```

Accepted example:

```jsx
<div aria-label="foo" />
<div aria-labelledby="foo bar" />
<div aria-checked={false} />
<div aria-invalid="grammar" />
```

#### [ ] `jsx_a11y/aria-role`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-role.html
- What it does: Elements with ARIA roles must use a valid, non-abstract ARIA role. A reference to role definitions can be found at WAI-ARIA site.
- Covers: The intent of this Success Criterion is to ensure that Assistive Technologies (AT) can gather information about, activate (or set) and keep up to date on the status of user interface controls in the content(such as screen readers, screen magnifiers, and speech recognition software, used by people with disabilities).

Flagged example:

```jsx
<div role="datepicker"></div> <!-- Bad: "datepicker" is not an ARIA role -->
<div role="range"></div>      <!-- Bad: "range" is an _abstract_ ARIA role -->
<div role=""></div>           <!-- Bad: An empty ARIA role is not allowed -->
<Foo role={role}></Foo>       <!-- Bad: ignoreNonDOM is set to false or not set -->
```

Accepted example:

```jsx
<div role="button"></div>     <!-- Good: "button" is a valid ARIA role -->
<div role={role}></div>       <!-- Good: role is a variable & cannot be determined until runtime. -->
<div></div>                   <!-- Good: No ARIA role -->
<Foo role={role}></Foo>       <!-- Good: ignoreNonDOM is set to true -->
```

#### [ ] `jsx_a11y/aria-unsupported-elements`

- Category: correctness
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-unsupported-elements.html
- What it does: Enforces that reserved DOM elements do not contain ARIA roles, states, or properties.
- Covers: Certain reserved DOM elements do not support ARIA roles, states and properties. This is often because they are not visible, for example meta, html, script, style. Adding ARIA attributes to these elements is meaningless and can create confusion for screen readers.

Flagged example:

```jsx
<meta charset="UTF-8" aria-hidden="false" />
```

Accepted example:

```jsx
<meta charset="UTF-8" />
```

#### [ ] `jsx_a11y/autocomplete-valid`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/autocomplete-valid.html
- What it does: Enforces that an element's autocomplete attribute must be a valid value.
- Covers: Incorrectly using the autocomplete attribute may decrease the accessibility of the website for users.

Flagged example:

```jsx
<input autocomplete="invalid-value" />
```

Accepted example:

```jsx
<input autocomplete="name" />
```

#### [ ] `jsx_a11y/click-events-have-key-events`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/click-events-have-key-events.html
- What it does: Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress.
- Covers: Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screen reader users. This does not apply for interactive or hidden elements.

Flagged example:

```jsx
<div onClick={() => void 0} />
```

Accepted example:

```jsx
<div onClick={() => void 0} onKeyDown={() => void 0} />
```

#### [ ] `jsx_a11y/control-has-associated-label`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.65.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/control-has-associated-label.html
- What it does: Enforce that a control (an interactive element) has a text label.
- Covers: An interactive element (such as a <button>) without an accessible text label makes it difficult or impossible for users of assistive technologies to understand the purpose of the control.

Flagged example:

```jsx
<button />
<a href="/path" />
<th />
<div role="button" />
<div role="checkbox" />
```

Accepted example:

```jsx
<button>Save</button>
<button aria-label="Save" />
<label>Name <input type="text" /></label>
<a href="/path">Learn more</a>
<th>Column Header</th>
<div role="button">Submit</div>
<div role="checkbox" aria-labelledby="label_id" />
```

#### [ ] `jsx_a11y/heading-has-content`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/heading-has-content.html
- What it does: Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the aria-hidden prop.
- Covers: Screen readers alert users to the presence of a heading tag. If the heading is empty or the text cannot be accessed, this could either confuse users or even prevent them from accessing information on the page's structure.

Flagged example:

```jsx
<h1 />
```

Accepted example:

```jsx
<h1>Foo</h1>
```

#### [ ] `jsx_a11y/html-has-lang`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/html-has-lang.html
- What it does: Ensures that every HTML document has a lang attribute.
- Covers: If the language of a webpage is not specified, the screen reader assumes the default language set by the user. Language settings become an issue for users who speak multiple languages and access website in more than one language.

Flagged example:

```jsx
<html />
```

Accepted example:

```jsx
<html lang="en" />
```

#### [ ] `jsx_a11y/iframe-has-title`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/iframe-has-title.html
- What it does: Enforce iframe elements have a title attribute.
- Covers: Screen reader users rely on a iframe title to describe the contents of the iframe. Navigating through iframe and iframe elements quickly becomes difficult and confusing for users of this technology if the markup does not contain a title attribute.

Flagged example:

```jsx
<iframe />
<iframe {...props} />
<iframe title="" />
<iframe title={''} />
<iframe title={``} />
<iframe title={undefined} />
<iframe title={false} />
<iframe title={true} />
<iframe title={42} />
```

Accepted example:

```jsx
<iframe title="This is a unique title" />
<iframe title={uniqueTitle} />
```

#### [ ] `jsx_a11y/img-redundant-alt`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/img-redundant-alt.html
- What it does: Enforce that img alt attributes do not contain redundant words like "image", "picture", or "photo".
- Covers: Screen readers already announce img elements as an image, so there is no need to use words such as "image", "photo", or "picture" in the alt text. This creates redundant information for users of assistive technologies and makes the alt text less concise and useful.

Flagged example:

```jsx
<img src="foo" alt="Photo of foo being weird." />
<img src="bar" alt="Image of me at a bar!" />
<img src="baz" alt="Picture of baz fixing a bug." />
```

Accepted example:

```jsx
<img src="foo" alt="Foo eating a sandwich." />
<img src="bar" aria-hidden alt="Picture of me taking a photo of an image" /> // Will pass because it is hidden.
<img src="baz" alt={`Baz taking a ${photo}`} /> // This is valid since photo is a variable name.
```

#### [ ] `jsx_a11y/interactive-supports-focus`

- Category: correctness
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.63.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/interactive-supports-focus.html
- What it does: Enforce that elements with interactive roles and interaction handlers (mouse or key press) must be focusable.
- Covers: Elements that handle user interaction (e.g., onClick) but are not natively focusable (like <div> or <span>) must be made focusable so that keyboard-only users and assistive technology users can reach and activate them.

Flagged example:

```jsx
<span onClick={submitForm} role="button">Submit</span>
<a onClick={showNextPage} role="button">Next page</a>
```

Accepted example:

```jsx
<div aria-hidden onClick={() => void 0} />
<span onClick={doSomething} tabIndex={0} role="button">Click me!</span>
<span onClick={doSomething} tabIndex={-1} role="menuitem">Click me too!</span>
<a href="javascript:void(0);" onClick={doSomething}>Click ALL the things!</a>
<button onClick={doSomething}>Click the button :)</button>
```

#### [ ] `jsx_a11y/label-has-associated-control`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/label-has-associated-control.html
- What it does: Enforce that a label tag has a text label and an associated control.
- Covers: A form label that either isn't properly associated with a form control (such as an <input>), or doesn't contain accessible text, hinders accessibility for users using assistive technologies such as screen readers. The user may not have enough information to understand the purpose of the form control.

Flagged example:

```jsx
function Foo(props) {
    return <label {...props} />
}

<input type="text" />
<label>Surname</label>
```

Accepted example:

```jsx
function Foo(props) {
  const { htmlFor, ...otherProps } = props;

  return <label htmlFor={htmlFor} {...otherProps} />;
}

<label>
  <input type="text" />
  Surname
</label>;
```

#### [ ] `jsx_a11y/lang`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/lang.html
- What it does: The lang prop on the <html> element must be a valid IETF BCP 47 language tag.
- Covers: If the language of a webpage is not specified as valid, the screen reader assumes the default language set by the user. Language settings become an issue for users who speak multiple languages and access website in more than one language.

Flagged example:

```jsx
<html>
<html lang="foo">
```

Accepted example:

```jsx
<html lang="en">
<html lang="en-US">
```

#### [ ] `jsx_a11y/media-has-caption`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/media-has-caption.html
- What it does: Checks if <audio> and <video> elements have a <track> element for captions. This ensures media content is accessible to all users, including those with hearing impairments.
- Covers: Without captions, audio and video content is not accessible to users who are deaf or hard of hearing. Captions are also useful for users in noisy environments or where audio is not available.

Flagged example:

```jsx
<audio></audio>
<video></video>
```

Accepted example:

```jsx
<audio><track kind="captions" src="caption_file.vtt" /></audio>
<video><track kind="captions" src="caption_file.vtt" /></video>
```

#### [ ] `jsx_a11y/mouse-events-have-key-events`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/mouse-events-have-key-events.html
- What it does: Enforce onMouseOver/onMouseOut are accompanied by onFocus/onBlur.
- Covers: Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screen reader users.

Flagged example:

```jsx
<div onMouseOver={() => void 0} />
```

Accepted example:

```jsx
<div onMouseOver={() => void 0} onFocus={() => void 0} />
```

#### [ ] `jsx_a11y/no-access-key`

- Category: correctness
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.21
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-access-key.html
- What it does: Enforces that the accessKey prop is not used on any element to avoid complications with keyboard commands used by a screen reader.
- Covers: Access keys are HTML attributes that allow web developers to assign keyboard shortcuts to elements. Inconsistencies between keyboard shortcuts and keyboard commands used by screen readers and keyboard-only users create accessibility complications so to avoid complications, access keys should not be used.

Flagged example:

```jsx
<div accessKey="h" />
```

Accepted example:

```jsx
<div />
```

#### [ ] `jsx_a11y/no-aria-hidden-on-focusable`

- Category: correctness
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.22
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-aria-hidden-on-focusable.html
- What it does: Enforces that aria-hidden="true" is not set on focusable elements.
- Covers: aria-hidden="true" on focusable elements can lead to confusion or unexpected behavior for screen reader users.

Flagged example:

```jsx
<div aria-hidden="true" tabIndex="0" />
```

Accepted example:

```jsx
<div aria-hidden="true" />
```

#### [ ] `jsx_a11y/no-autofocus`

- Category: correctness
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-autofocus.html
- What it does: Enforce that autoFocus prop is not used on elements.
- Covers: Autofocusing elements can cause usability issues for sighted and non-sighted users alike. It can be disorienting when focus is shifted without user input and can interfere with assistive technologies. Users should control when and where focus moves on a page.

Flagged example:

```jsx
<div autoFocus />
<div autoFocus="true" />
<div autoFocus="false" />
<div autoFocus={undefined} />
```

Accepted example:

```jsx
<div />
<dialog><input autoFocus /></dialog>
<div role="dialog"><input autoFocus /></div>
<div popover><input autoFocus /></div>
```

#### [ ] `jsx_a11y/no-distracting-elements`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.22
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-distracting-elements.html
- What it does: Enforces that no distracting elements are used.
- Covers: Elements that can be visually distracting can cause accessibility issues with visually impaired users. Such elements are most likely deprecated, and should be avoided. By default, <marquee> and <blink> elements are visually distracting and can trigger vestibular disorders.

Flagged example:

```jsx
<marquee />
<marquee {...props} />
<marquee lang={undefined} />
<blink />
<blink {...props} />
<blink foo={undefined} />
```

Accepted example:

```jsx
<div />
<Marquee />
<Blink />
```

#### [ ] `jsx_a11y/no-interactive-element-to-noninteractive-role`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.65.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-interactive-element-to-noninteractive-role.html
- What it does: Interactive HTML elements indicate controls in the user interface. Interactive elements include <a href>, <button>, <input>, <select>, <textarea>.
- Covers: Using a non-interactive role on an interactive element can confuse assistive technology users.

Flagged example:

```jsx
<button role="img">Save</button>
```

Accepted example:

```jsx
<div role="img">
  <button>Save</button>
</div>
```

#### [ ] `jsx_a11y/no-noninteractive-element-interactions`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.65.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-interactions.html
- What it does: Prevents non-interactive HTML elements and elements with non-interactive ARIA roles from being assigned mouse or keyboard event handlers.
- Covers: Non-interactive elements such as <main>, <h1>, <p>, <img>, <li>, <ul>, and <ol> represent content or containers. Adding interaction handlers to them can make the UI difficult or impossible to operate with assistive technology.

Flagged example:

```jsx
<li onClick={() => {}} />
<div role="listitem" onKeyDown={() => {}} />
```

Accepted example:

```jsx
<button onClick={() => {}} />
<div role="button" onClick={() => {}} />
<div onClick={() => {}} role="presentation" />
```

#### [ ] `jsx_a11y/no-noninteractive-element-to-interactive-role`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.64.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-to-interactive-role.html
- What it does: Non-interactive HTML elements indicate content and containers in the user interface. Non-interactive elements include <main>, <area>, <h1> (through <h6>), <p>, <img>, <li>, <ul>, and <ol>.
- Covers: Overriding the semantic meaning of non-interactive elements with interactive roles creates confusion for assistive technology users. The element lacks the expected keyboard interaction patterns and focus management that interactive elements provide.

Flagged example:

```jsx
<h1 role="button">Click me</h1>
<li role="link">Navigate</li>
<article role="button">Submit</article>
```

Accepted example:

```jsx
<button>Click me</button>
<a href="/page">Navigate</a>
<div role="button">Submit</div>
<ul role="menu"><li role="menuitem">Item</li></ul>
```

#### [ ] `jsx_a11y/no-noninteractive-tabindex`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-tabindex.html
- What it does: This rule checks that non-interactive elements don't have a tabIndex which would make them interactive via keyboard navigation.
- Covers: Tab key navigation should be limited to elements on the page that can be interacted with. Thus it is not necessary to add a tabindex to items in an unordered list, for example, to make them navigable through assistive technology.

Flagged example:

```jsx
<div tabIndex="0" />
<div role="article" tabIndex="0" />
<article tabIndex="0" />
<article tabIndex={0} />
```

Accepted example:

```jsx
<div />
<MyButton tabIndex={0} />
<button />
<button tabIndex="0" />
<button tabIndex={0} />
<div />
<div tabIndex="-1" />
<div role="button" tabIndex="0" />
<div role="article" tabIndex="-1" />
<article tabIndex="-1" />
```

#### [ ] `jsx_a11y/no-redundant-roles`

- Category: correctness
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-redundant-roles.html
- What it does: Enforces that code does not include a redundant role property, in the case that it's identical to the implicit role property of the element type.
- Covers: Redundant roles can lead to confusion and verbosity in the codebase.

Flagged example:

```jsx
<button role="button"></button>
```

Accepted example:

```jsx
<button></button>
```

#### [ ] `jsx_a11y/no-static-element-interactions`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.37.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-static-element-interactions.html
- What it does: Enforces that static HTML elements with event handlers must have appropriate ARIA roles.
- Covers: Static HTML elements do not have semantic meaning in accessibility contexts. When these elements receive click or keyboard event handlers, they must declare a role to indicate their interactive purpose to assistive technologies.

Flagged example:

```jsx
<div onClick={() => {}} />
<span onKeyDown={handleKeyDown} />
```

Accepted example:

```jsx
<button onClick={() => {}} />
<div onClick={() => {}} role="button" />
<input type="text" onClick={() => {}} />
```

#### [ ] `jsx_a11y/prefer-tag-over-role`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/prefer-tag-over-role.html
- What it does: Enforces using semantic HTML tags over role attribute.
- Covers: Using semantic HTML tags can improve accessibility and readability of the code.

Flagged example:

```jsx
<div role="button" />
```

Accepted example:

```jsx
<button />
```

#### [ ] `jsx_a11y/role-has-required-aria-props`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/role-has-required-aria-props.html
- What it does: Enforces that elements with ARIA roles must have all required attributes for that role.
- Covers: Certain ARIA roles require specific attributes to express necessary semantics for assistive technology.

Flagged example:

```jsx
<div role="checkbox" />
```

Accepted example:

```jsx
<div role="checkbox" aria-checked="false" />
```

#### [ ] `jsx_a11y/role-supports-aria-props`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/role-supports-aria-props.html
- What it does: Enforce that elements with explicit or implicit roles defined contain only aria-* properties supported by that role. Many ARIA attributes (states and properties) can only be used on elements with particular roles. Some elements have implicit roles, such as <a href="#" />, which will resolve to role="link".
- Covers: Using ARIA attributes that are inconsistent with the element's role can cause problems for assistive technologies and their ability to understand or engage with the content of a page.

Flagged example:

```jsx
<ul role="radiogroup" "aria-labelledby"="foo">
    <li aria-required tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
    <li aria-required tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
    <li aria-required tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>
</ul>
```

Accepted example:

```jsx
<ul role="radiogroup" aria-required "aria-labelledby"="foo">
    <li tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
    <li tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
    <li tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>
</ul>
```

#### [ ] `jsx_a11y/scope`

- Category: correctness
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/scope.html
- What it does: The scope prop should be used only on <th> elements.
- Covers: The scope attribute makes table navigation much easier for screen reader users, provided that it is used correctly. Incorrectly used, scope can make table navigation much harder and less efficient. A screen reader operates under the assumption that a table has a header and that this header specifies a scope. Because of the way screen readers function, having an accurate header makes viewing a table far more accessible and more efficient for people who use the device.

Flagged example:

```jsx
<div scope />
```

Accepted example:

```jsx
<th scope="col" />
<th scope={scope} />
```

#### [ ] `jsx_a11y/tabindex-no-positive`

- Category: correctness
- Default: no
- Fix: dangerous suggestion
- Type-aware: no
- Added: 0.0.21
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/tabindex-no-positive.html
- What it does: Enforces that positive values for the tabIndex attribute are not used in JSX.
- Covers: Using tabIndex values greater than 0 can make navigation and interaction difficult for keyboard and assistive technology users, disrupting the logical order of content.

Flagged example:

```jsx
<span tabIndex="1">foo</span>
```

Accepted example:

```jsx
<span tabIndex="0">foo</span>
<span tabIndex="-1">bar</span>
```

### restriction

#### [ ] `jsx_a11y/anchor-ambiguous-text`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.13.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-ambiguous-text.html
- What it does: Inspects anchor link text for the use of ambiguous words.
- Covers: Screen readers users rely on link text for context, ambiguous words such as "click here" do not provide enough context.

Flagged example:

```jsx
<a>link</a>
<a>click here</a>
```

Accepted example:

```jsx
<a>read this tutorial</a>
<a aria-label="oxc linter documentation">click here</a>
```

## nextjs

### correctness

#### [ ] `nextjs/google-font-display`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/google-font-display.html
- What it does: Enforce font-display behavior with Google Fonts.
- Covers: Specifying display=optional minimizes the risk of invisible text or layout shift. If swapping to the custom font after it has loaded is important to you, then use display=swap instead.

Flagged example:

```jsx
import Head from "next/head";

export default Test = () => {
  return (
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Krona+One" rel="stylesheet" />
    </Head>
  );
};
```

Accepted example:

```jsx
import Head from "next/head";

export default Test = () => {
  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional"
        rel="stylesheet"
      />
    </Head>
// ...
```

#### [ ] `nextjs/google-font-preconnect`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/google-font-preconnect.html
- What it does: Enforces the presence of rel="preconnect" when using Google Fonts via <link> tags.
- Covers: When using Google Fonts, it's recommended to include a preconnect resource hint to establish early connections to the required origin. Without preconnect, the browser needs to perform DNS lookups, TCP handshakes, and TLS negotiations before it can download the font files, which can delay font loading and impact performance.

Flagged example:

```javascript
<link href="https://fonts.gstatic.com" />
<link rel="preload" href="https://fonts.gstatic.com" />
```

Accepted example:

```javascript
<link rel="preconnect" href="https://fonts.gstatic.com" />
```

#### [ ] `nextjs/inline-script-id`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/inline-script-id.html
- What it does: Enforces that all next/script components with inline content or dangerouslySetInnerHTML must have an id prop.
- Covers: Next.js requires a unique id prop for inline scripts to properly deduplicate them during page renders. Without an id, the same inline script might be executed multiple times, leading to unexpected behavior or performance issues. This is particularly important for scripts that modify global state or perform one-time initializations.

Flagged example:

```javascript
import Script from 'next/script';

export default function Page() {
  return (
    <Script>
      {`console.log('Hello world');`}
    </Script>
  );
}

// ...
```

Accepted example:

```javascript
import Script from 'next/script';

export default function Page() {
  return (
    <Script id="my-script">
      {`console.log('Hello world');`}
    </Script>
  );
}

// ...
```

#### [ ] `nextjs/next-script-for-ga`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/next-script-for-ga.html
- What it does: Enforces the use of the next/script component when implementing Google Analytics in Next.js applications, instead of using regular <script> tags.
- Covers: Using regular <script> tags for Google Analytics can lead to several issues:

Flagged example:

```jsx
// Using regular script tag with GA source
<script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

// Using inline script for GA initialization
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
// ...
```

Accepted example:

```jsx
import Script from 'next/script'

// Using next/script for GA source
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="lazyOnload"
/>

// Using next/script for GA initialization
<Script id="google-analytics">
// ...
```

#### [ ] `nextjs/no-assign-module-variable`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-assign-module-variable.html
- What it does: Prevents the assignment or declaration of variables named module in Next.js applications.
- Covers: The variable name module is reserved in Next.js for internal use and module system functionality. Declaring your own module variable can conflict with Next.js's internal module system, lead to unexpected behavior in your application, and cause issues with code splitting and hot module replacement.

Flagged example:

```javascript
// Declaring module variable
let module = {};

// Using module in variable declaration
const module = {
  exports: {},
};

// Assigning to module
module = { id: "my-module" };
```

Accepted example:

```javascript
// Use a different variable name
let myModule = {};

// Use a more descriptive name
const customModule = {
  exports: {},
};

// Access actual module object (when available)
console.log(module.exports);
```

#### [ ] `nextjs/no-async-client-component`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-async-client-component.html
- What it does: Prevents the use of async functions for client components in Next.js applications. This rule checks for any async function that:
- Covers: Using async functions for client components can cause hydration mismatches between server and client, can break component rendering lifecycle, and can lead to unexpected behavior with React's concurrent features.

Flagged example:

```javascript
"use client"

// Async component with default export
export default async function MyComponent() {
  return <></>
}

// Async component with named export
async function MyComponent() {
  return <></>
// ...
```

Accepted example:

```javascript
"use client"

// Regular synchronous component
export default function MyComponent() {
  return <></>
}

// Handling async operations in effects
export default function MyComponent() {
  useEffect(() => {
// ...
```

#### [ ] `nextjs/no-before-interactive-script-outside-document`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-before-interactive-script-outside-document.html
- What it does: Prevents the usage of next/script's beforeInteractive strategy outside of pages/_document.js. This rule ensures that scripts with the beforeInteractive loading strategy are only used in the document component where they are most effective.
- Covers: The beforeInteractive strategy is specifically designed to load scripts before any page hydration occurs, which is only guaranteed to work correctly when placed in pages/_document.js. Using it elsewhere:

Flagged example:

```jsx
// pages/index.js
import Script from "next/script";

export default function HomePage() {
  return (
    <div>
      <Script
        src="https://example.com/script.js"
        strategy="beforeInteractive" // ❌ Wrong placement
      />
// ...
```

Accepted example:

```jsx
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
// ...
```

#### [ ] `nextjs/no-css-tags`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-css-tags.html
- What it does: Prevents manual inclusion of stylesheets using <link> tags in Next.js applications. This rule checks for <link> tags with rel="stylesheet" that reference local CSS files.
- Covers: Next.js handles CSS imports automatically through its built-in CSS support. Manual stylesheet inclusion bypasses Next.js's built-in CSS optimization, prevents proper code splitting and optimization of styles, and may cause Flash of Unstyled Content (FOUC). This also breaks automatic CSS hot reloading during development.

Flagged example:

```jsx
// Manually including local CSS file
<link href="/_next/static/css/styles.css" rel="stylesheet" />

// In pages/_document.js
<Head>
  <link href="css/my-styles.css" rel="stylesheet" />
</Head>
```

Accepted example:

```jsx
// Importing CSS file directly
import '../styles/global.css'

// Using CSS Modules
import styles from './Button.module.css'

// Using external stylesheets (allowed)
<link
  href="https://fonts.googleapis.com/css?family=Open+Sans"
  rel="stylesheet"
// ...
```

#### [ ] `nextjs/no-document-import-in-page`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-document-import-in-page.html
- What it does: Prevent importing next/document outside of pages/_document.js.
- Covers: Importing next/document outside of pages/_document.js can cause unexpected issues in your Next.js application.

Flagged example:

```jsx
// `components/MyDocument.jsx`
import Document from "next/document";

class MyDocument extends Document {
  //...
}

export default MyDocument;
```

Accepted example:

```jsx
// `pages/_document.jsx`
import Document from "next/document";

class MyDocument extends Document {
  //...
}

export default MyDocument;
```

#### [ ] `nextjs/no-duplicate-head`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-duplicate-head.html
- What it does: Prevent duplicate usage of <Head> in pages/_document.js.
- Covers: This can cause unexpected behavior in your application.

Flagged example:

```jsx
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  static async getInitialProps(ctx) {}
  render() {
    return (
      <Html>
        <Head />
        <Head />
        <body>
          <Main />
// ...
```

Accepted example:

```jsx
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  static async getInitialProps(ctx) {}
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
// ...
```

#### [ ] `nextjs/no-head-element`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-head-element.html
- What it does: Prevents the usage of the native <head> element inside a Next.js application.
- Covers: A <head> element can cause unexpected behavior in a Next.js application. Use Next.js' built-in next/head component instead.

Flagged example:

```jsx
function Index() {
  return (
    <>
      <head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
    </>
  );
}
// ...
```

Accepted example:

```jsx
import Head from "next/head";

function Index() {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>
// ...
```

#### [ ] `nextjs/no-head-import-in-document`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-head-import-in-document.html
- What it does: Prevents the usage of next/head inside a Next.js document.
- Covers: Importing next/head inside pages/_document.js can cause unexpected issues in your Next.js application.

Flagged example:

```jsx
import Document, { Html, Main, NextScript } from "next/document";
import Head from "next/head";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    //...
  }

  render() {
    return (
// ...
```

Accepted example:

```jsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    //...
  }

  render() {
    return (
      <Html>
// ...
```

#### [ ] `nextjs/no-html-link-for-pages`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-html-link-for-pages.html
- What it does: Prevents the usage of <a> elements to navigate between Next.js pages.
- Covers: Using <a> elements for internal navigation in Next.js applications can cause:

Flagged example:

```jsx
function HomePage() {
  return (
    <div>
      <a href="/about">About Us</a>
      <a href="/contact">Contact</a>
    </div>
  );
}
```

Accepted example:

```jsx
import Link from "next/link";

function HomePage() {
  return (
    <div>
      <Link href="/about">About Us</Link>
      <Link href="/contact">Contact</Link>
    </div>
  );
}
```

#### [ ] `nextjs/no-img-element`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-img-element.html
- What it does: Prevent the usage of the <img> element due to slower LCP and higher bandwidth.
- Covers: <img> elements are not optimized for performance and can result in slower LCP and higher bandwidth. Using <Image /> from next/image will automatically optimize images and serve them as static assets.

Flagged example:

```javascript
export function MyComponent() {
  return (
    <div>
      <img src="/test.png" alt="Test picture" />
    </div>
  );
}
```

Accepted example:

```javascript
import Image from "next/image";
import testImage from "./test.png";
export function MyComponent() {
  return (
    <div>
      <Image src={testImage} alt="Test picture" />
    </div>
  );
}
```

#### [ ] `nextjs/no-page-custom-font`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-page-custom-font.html
- What it does: Prevent page-only custom fonts.
- Covers: The custom font you're adding was added to a page - this only adds the font to the specific page and not the entire application. The custom font you're adding was added to a separate component within pages/_document.js - this disables automatic font optimization.

Flagged example:

```jsx
// pages/index.jsx
import Head from "next/head";
function IndexPage() {
  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap"
        rel="stylesheet"
      />
    </Head>
// ...
```

Accepted example:

```jsx
// pages/_document.jsx
import NextDocument, { Html, Head } from "next/document";
class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap"
            rel="stylesheet"
// ...
```

#### [ ] `nextjs/no-script-component-in-head`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-script-component-in-head.html
- What it does: Prevent usage of next/script in next/head component.
- Covers: The next/script component should not be used in a next/head component. Instead move the <Script /> component outside of <Head> instead.

Flagged example:

```jsx
import Script from "next/script";
import Head from "next/head";

export default function Index() {
  return (
    <Head>
      <title>Next.js</title>
      <Script src="/my-script.js" />
    </Head>
  );
// ...
```

Accepted example:

```jsx
import Script from "next/script";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Next.js</title>
      </Head>
      <Script src="/my-script.js" />
// ...
```

#### [ ] `nextjs/no-styled-jsx-in-document`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-styled-jsx-in-document.html
- What it does: Prevent usage of styled-jsx in pages/_document.js.
- Covers: Custom CSS like styled-jsx is not allowed in a Custom Document.

Flagged example:

```javascript
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
// ...
```

Accepted example:

```javascript
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
// ...
```

#### [ ] `nextjs/no-sync-scripts`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-sync-scripts.html
- What it does: Prevent the use of synchronous <script> tags in Next.js applications. Require any <script> tag with a src attribute to also have either the async or defer attribute.
- Covers: Synchronous scripts can block the page rendering and negatively impact performance. In Next.js applications, it's recommended to use async or defer attributes to load scripts asynchronously, which improves page load times and user experience.

Flagged example:

```javascript
// Synchronous script without async/defer
<script src="https://example.com/script.js"></script>

// Dynamic src without async/defer
<script src={dynamicSrc}></script>
```

Accepted example:

```javascript
// Script with async attribute
<script src="https://example.com/script.js" async></script>

// Script with defer attribute
<script src="https://example.com/script.js" defer></script>

// Script with spread props (allowed as it might include async/defer)
<script {...props}></script>
```

#### [ ] `nextjs/no-title-in-document-head`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-title-in-document-head.html
- What it does: Prevent usage of <title> with Head component from next/document.
- Covers: A <title> element should only be used for any <head> code that is common for all pages. Title tags should be defined at the page-level using next/head instead.

Flagged example:

```javascript
import { Head } from "next/document";

export function Home() {
  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
    </div>
  );
// ...
```

Accepted example:

```javascript
import Head from "next/head";

export function Home() {
  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
    </div>
  );
// ...
```

#### [ ] `nextjs/no-typos`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.2.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-typos.html
- What it does: Detects common typos in Next.js data fetching function names.
- Covers: Next.js will not call incorrectly named data fetching functions, causing pages to render without expected data.

Flagged example:

```javascript
export default function Page() {
  return <div></div>;
}
export async function getServurSideProps() {}
```

Accepted example:

```javascript
export default function Page() {
  return <div></div>;
}
export async function getServerSideProps() {}
```

#### [ ] `nextjs/no-unwanted-polyfillio`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-unwanted-polyfillio.html
- What it does: Prevent use of unsafe polyfill.io domains and duplicate polyfills.
- Covers: Security Risk: The domains cdn.polyfill.io and polyfill.io were compromised in a supply chain attack in 2024, where the domain was acquired by a malicious actor and began injecting harmful code into websites. Over 380,000+ websites were affected. These domains should not be used under any circumstances.

Flagged example:

```javascript
// Security risk - compromised domain
<script src='https://cdn.polyfill.io/v2/polyfill.min.js'></script>
<script src='https://polyfill.io/v3/polyfill.min.js'></script>

// Duplicate polyfills
<script src='https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=Array.prototype.copyWithin'></script>
<script src='https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=WeakSet%2CPromise'></script>
```

Accepted example:

```javascript
// Security risk - compromised domain
<script src='https://cdn.polyfill.io/v2/polyfill.min.js'></script>
<script src='https://polyfill.io/v3/polyfill.min.js'></script>

// Duplicate polyfills
<script src='https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=Array.prototype.copyWithin'></script>
<script src='https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=WeakSet%2CPromise'></script>
```

## node

### style

#### [ ] `node/callback-return`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/node/callback-return.html
- What it does: Require return statements after callbacks.
- Covers: This rule is aimed at ensuring that callbacks used outside of the main function block are always part-of or immediately preceding a return statement. This rule decides what is a callback based on the name of the function being called.

Flagged example:

```js
function done(err) {
  if (err) {
    callback(err);
  }
  callback();
}
```

Accepted example:

```js
function done(err) {
  if (err) {
    return callback(err);
  }
  callback();
}
```

#### [ ] `node/global-require`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.36.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/node/global-require.html
- What it does: Require require() calls to be placed at top-level module scope.
- Covers: In Node.js, module dependencies are included using the require() function, such as:

Flagged example:

```js
// calling require() inside of a function is not allowed
function readFile(filename, callback) {
  var fs = require("fs");
  fs.readFile(filename, callback);
}

// conditional requires like this are also not allowed
if (DEBUG) {
  require("debug");
}
// ...
```

Accepted example:

```js
// all these variations of require() are ok
require("x");
var y = require("y");
var z;
z = require("z").initialize();

// requiring a module and using it in a function is ok
var fs = require("fs");
function readFile(filename, callback) {
  fs.readFile(filename, callback);
// ...
```

#### [ ] `node/no-exports-assign`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.9.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/node/no-exports-assign.html
- What it does: Disallows assignment to exports.
- Covers: Directly using exports = {} can lead to confusion and potential bugs because it reassigns the exports object, which may break module exports. It is more predictable and clearer to use module.exports directly or in conjunction with exports.

Flagged example:

```js
exports = {};
```

Accepted example:

```js
module.exports.foo = 1;
exports.bar = 2;
module.exports = {};

// allows `exports = {}` if along with `module.exports =`
module.exports = exports = {};
exports = module.exports = {};
```

#### [ ] `node/no-mixed-requires`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: next
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/node/no-mixed-requires.html
- What it does: Disallows require calls to be mixed with regular variable declarations.
- Covers: In the Node.js community it is often customary to separate initializations with calls to require modules from other variable declarations, sometimes also grouping them by the type of module.

Flagged example:

```js
var fs = require("fs"),
  i = 0;

var async = require("async"),
  debug = require("diagnostics").someFunction("my-module"),
  eslint = require("eslint");
```

Accepted example:

```js
var eventEmitter = require("events").EventEmitter,
  myUtils = require("./utils"),
  util = require("util"),
  bar = require(getBarModuleName());

var foo = 42,
  bar = "baz";
```

#### [ ] `node/no-sync`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: next
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/node/no-sync.html
- What it does: Disallows synchronous methods from being called in Node.js code.
- Covers: In Node.js, most I/O is done through asynchronous methods. However, there are often synchronous versions of the asynchronous methods. For example, fs.exists() and fs.existsSync(). In some contexts, using synchronous operations is okay (if, as with ESLint, you are writing a command line utility). However, in other contexts the use of synchronous operations is considered a bad practice that should be avoided.

Flagged example:

```js
fs.existsSync(somePath);

function foo() {
  var contents = fs.readFileSync(somePath).toString();
}
```

Accepted example:

```js
obj.sync();

async(function () {
  // ...
});
```

### restriction

#### [ ] `node/handle-callback-err`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.56.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/node/handle-callback-err.html
- What it does: This rule expects that when you're using the callback pattern in Node.js you'll handle the error.
- Covers: In Node.js, a common pattern for dealing with asynchronous behavior is called the callback pattern. This pattern expects an Error object or null as the first argument of the callback. Forgetting to handle these errors can lead to some really strange behavior in your application.

Flagged example:

```js
function loadData(err, data) {
  doSomething();
}
```

Accepted example:

```js
function loadData(err, data) {
  if (err) {
    console.log(err.stack);
  }
  doSomething();
}

function generateError(err) {
  if (err) {
  }
// ...
```

#### [ ] `node/no-new-require`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.10.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/node/no-new-require.html
- What it does: Warn about calling new on require.
- Covers: The require function is used to include modules and might return a constructor. As this is not always the case this can be confusing.

Flagged example:

```js
var appHeader = new require("app-header");
```

Accepted example:

```js
var AppHeader = require("app-header");
var appHeader = new AppHeader();
```

#### [ ] `node/no-path-concat`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/node/no-path-concat.html
- What it does: Disallows string concatenation with __dirname and __filename.
- Covers: In Node.js, the __dirname and __filename global variables contain the directory path and the file path of the currently executing script file, respectively. Sometimes, developers try to use these variables to create paths to other files, such as:

Flagged example:

```js
const fullPath1 = __dirname + "/foo.js";
const fullPath2 = __filename + "/foo.js";
const fullPath3 = `${__dirname}/foo.js`;
const fullPath4 = `${__filename}/foo.js`;
```

Accepted example:

```js
const fullPath1 = path.join(__dirname, "foo.js");
const fullPath2 = path.join(__filename, "foo.js");
const fullPath3 = __dirname + ".js";
const fullPath4 = __filename + ".map";
const fullPath5 = `${__dirname}_foo.js`;
const fullPath6 = `${__filename}.test.js`;
```

#### [ ] `node/no-process-env`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.23.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/node/no-process-env.html
- What it does: Disallows use of process.env.
- Covers: Directly reading process.env can lead to implicit runtime configuration, make code harder to test, and bypass configuration validation.

Flagged example:

```js
if (process.env.NODE_ENV === "development") {
  // ...
}
```

Accepted example:

```js
import config from "./config";

if (config.env === "development") {
  //...
}
```

## oxc

### suspicious

#### [ ] `oxc/approx-constant`

- Category: suspicious
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/approx-constant.html
- What it does: Disallows the use of approximate constants, instead preferring the use of the constants in the Math object.
- Covers: Approximate constants are not as accurate as the constants in the Math object. Using the Math constants improves code readability and accuracy. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Math for more information.

Flagged example:

```javascript
let log10e = 0.434294;
```

Accepted example:

```javascript
let log10e = Math.LOG10E;
```

#### [ ] `oxc/misrefactored-assign-op`

- Category: suspicious
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/misrefactored-assign-op.html
- What it does: https://rust-lang.github.io/rust-clippy/master/#/misrefactored\_assign\_op
- Covers: Most likely these are bugs where one meant to write a op= b.

Flagged example:

```javascript
a += a + b;
a -= a - b;
```

Accepted example:

```javascript
a += b;
a -= b;
```

#### [ ] `oxc/no-async-endpoint-handlers`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-async-endpoint-handlers.html
- What it does: Disallows the use of async functions as Express endpoint handlers.
- Covers: Before v5, Express will not automatically handle Promise rejections from handler functions with your application's error handler. You must instead explicitly pass the rejected promise to next().

Flagged example:

```js
const app = express();
app.get("/", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

const router = express.Router();
router.use(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  req.user = user;
// ...
```

Accepted example:

```js
const app = express();
// not async
app.use((req, res, next) => {
  req.receivedAt = Date.now();
});

app.get("/", (req, res, next) => {
  fs.readFile("/file-does-not-exist", (err, data) => {
    if (err) {
      next(err); // Pass errors to Express.
// ...
```

#### [ ] `oxc/no-this-in-exported-function`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-this-in-exported-function.html
- What it does: Disallows the use of this in exported functions.
- Covers: In most bundlers, the value of this is not preserved for exported functions. When a function is exported and imported in another module, this typically becomes undefined instead of the module namespace object. This can lead to unexpected runtime errors or incorrect behavior.

Flagged example:

```javascript
export function foo() {
  console.log(this);
}

export default function bar() {
  this.something();
}

function baz() {
  const self = this;
// ...
```

Accepted example:

```javascript
function foo() {
  console.log(this);
}

export const bar = () => {
  console.log(this);
};
```

### correctness

#### [ ] `oxc/bad-array-method-on-arguments`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-array-method-on-arguments.html
- What it does: This rule applies when an array method is called on the arguments object itself.
- Covers: The arguments object is not an array, but an array-like object. It should be converted to a real array before calling an array method. Otherwise, a TypeError exception will be thrown because of the non-existent method.

Flagged example:

```javascript
function add(x, y) {
  return x + y;
}
function sum() {
  return arguments.reduce(add, 0);
}
```

Accepted example:

```javascript
function add(x, y) {
  return x + y;
}

function sum(...args) {
  return args.reduce(add, 0);
}
```

#### [ ] `oxc/bad-char-at-comparison`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.22
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-char-at-comparison.html
- What it does: This rule warns when the return value of the charAt method is used to compare a string of length greater than 1.
- Covers: The charAt method returns a string of length 1. If the return value is compared with a string of length greater than 1, the comparison will always be false.

Flagged example:

```javascript
a.charAt(4) === "a2";
a.charAt(4) === "/n";
```

Accepted example:

```javascript
a.charAt(4) === "a";
a.charAt(4) === "\n";
```

#### [ ] `oxc/bad-comparison-sequence`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-comparison-sequence.html
- What it does: This rule applies when the comparison operator is applied two or more times in a row.
- Covers: Because comparison operator is a binary operator, it is impossible to compare three or more operands at once. If comparison operator is used to compare three or more operands, only the first two operands are compared and the rest is compared with its result of boolean type.

Flagged example:

```javascript
if ((a == b) == c) {
  console.log("a, b, and c are the same");
}
```

Accepted example:

```javascript
if (a == b && b == c) {
  console.log("a, b, and c are the same");
}
```

#### [ ] `oxc/bad-min-max-func`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-min-max-func.html
- What it does: Checks whether the clamp function Math.min(Math.max(x, y), z) always evaluates to a constant result because the arguments are in the wrong order.
- Covers: The Math.min(Math.max(x, y), z) function is used to clamp a value between two other values. If the arguments are in the wrong order, the function will always evaluate to a constant result.

Flagged example:

```javascript
Math.min(Math.max(100, x), 0);
Math.max(1000, Math.min(0, z));
```

Accepted example:

```javascript
Math.max(0, Math.min(100, x));
Math.min(1000, Math.max(0, z));
```

#### [ ] `oxc/bad-object-literal-comparison`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-object-literal-comparison.html
- What it does: Checks for comparisons between object and array literals.
- Covers: Comparing a variable to an object or array literal will always return false as object and array literals are never equal to each other.

Flagged example:

```javascript
if (x === {}) {
}
if (arr !== []) {
}
```

Accepted example:

```javascript
if (typeof x === "object" && Object.keys(x).length === 0) {
}
if (Array.isArray(x) && x.length === 0) {
}
```

#### [ ] `oxc/bad-replace-all-arg`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.22
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-replace-all-arg.html
- What it does: This rule warns when the replaceAll method is called with a regular expression that does not have the global flag (g).
- Covers: The replaceAll method replaces all occurrences of a string with another string. If the global flag (g) is not used in the regular expression, only the first occurrence of the string will be replaced.

Flagged example:

```javascript
withSpaces.replaceAll(/\s+/, ",");
```

Accepted example:

```javascript
withSpaces.replaceAll(/\s+/g, ",");
```

#### [ ] `oxc/const-comparisons`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.22
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/const-comparisons.html
- What it does: Checks for redundant or logically impossible comparisons. This includes:
- Covers: Such comparisons can lead to confusing or incorrect logic in the program. In many cases:

Flagged example:

```javascript
status_code <= 400 && status_code > 500;
status_code < 200 && status_code <= 299;
status_code > 500 && status_code >= 500;
a < a; // Always false
a >= a; // Always true
```

Accepted example:

```javascript
status_code >= 400 && status_code < 500;
500 <= status_code && 600 > status_code;
500 <= status_code && status_code <= 600;
a < b;
a <= b;
```

#### [ ] `oxc/double-comparisons`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: no
- Added: 0.0.22
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/double-comparisons.html
- What it does: This rule checks for double comparisons in logical expressions.
- Covers: Redundant comparisons can be confusing and make code harder to understand.

Flagged example:

```javascript
x === y || x < y;
x < y || x === y;
```

Accepted example:

```javascript
x <= y;
x >= y;
```

#### [ ] `oxc/erasing-op`

- Category: correctness
- Default: yes
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/erasing-op.html
- What it does: Checks for erasing operations, e.g., x * 0.
- Covers: The whole expression can be replaced by zero. This is most likely not the intended outcome and should probably be corrected.

Flagged example:

```javascript
let x = 1;
let y = x * 0;
```

Accepted example:

```javascript
let x = 1;
let y = 0;
```

#### [ ] `oxc/missing-throw`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/missing-throw.html
- What it does: Checks whether the throw keyword is missing in front of a new expression.
- Covers: The throw keyword is required in front of a new expression to throw an error. Omitting it is usually a mistake.

Flagged example:

```javascript
function foo() {
  throw Error();
}
const foo = () => {
  new Error();
};
```

Accepted example:

```javascript
function foo() {
  throw new Error();
}
const foo = () => {
  throw new Error();
};
```

#### [ ] `oxc/number-arg-out-of-range`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/number-arg-out-of-range.html
- What it does: Checks whether the radix or precision arguments of number-related functions exceed the limit.
- Covers: The radix argument of Number.prototype.toString should be between 2 and 36. The precision argument of Number.prototype.toFixed and Number.prototype.toExponential should be between 0 and 20. The precision argument of Number.prototype.toPrecision should be between 1 and 21.

Flagged example:

```javascript
var x = 42;
var s_radix_64 = x.toString(64);
var s = x.toString(1);
```

Accepted example:

```javascript
var x = 42;
var s_radix_16 = x.toString(16);
```

#### [ ] `oxc/only-used-in-recursion`

- Category: correctness
- Default: yes
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/only-used-in-recursion.html
- What it does: Checks for arguments that are only used in recursion with no side-effects.
- Covers: Supplying an argument that is only used in recursive calls is likely a mistake.

Flagged example:

```ts
function test(onlyUsedInRecursion) {
  return test(onlyUsedInRecursion);
}
```

Accepted example:

```ts
function f(a: number): number {
  if (a == 0) {
    return 1;
  } else {
    return f(a - 1);
  }
}
```

#### [ ] `oxc/uninvoked-array-callback`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/uninvoked-array-callback.html
- What it does: This rule applies when an Array function has a callback argument used for an array with empty slots.
- Covers: When the Array constructor is called with a single number argument, an array with the specified number of empty slots (not actual undefined values) is constructed. If a callback function is passed to the function of this array, the callback function is never invoked because the array has no actual elements.

Flagged example:

```javascript
const list = new Array(5).map((_) => createElement());
```

Accepted example:

```javascript
const list = new Array(5).fill().map((_) => createElement());
```

### restriction

#### [ ] `oxc/bad-bitwise-operator`

- Category: restriction
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-bitwise-operator.html
- What it does: This rule applies when bitwise operators are used where logical operators are expected.
- Covers: Bitwise operators have different results from logical operators and a TypeError exception may be thrown because short-circuit evaluation is not applied. (In short-circuit evaluation, right operand evaluation is skipped according to left operand value, e.g. x is false in x && y.)

Flagged example:

```javascript
if (obj & obj.prop) {
  console.log(obj.prop);
}
options = options | {};
input |= "";
```

Accepted example:

```javascript
if (obj && obj.prop) {
  console.log(obj.prop);
}
options = options || {};
input ||= "";
```

#### [ ] `oxc/no-async-await`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-async-await.html
- What it does: Disallows the use of async/await.
- Covers: This rule is useful for environments that don't support async/await syntax, or when you want to enforce the use of promises or other asynchronous patterns instead. It can also be used to maintain consistency in codebases that use alternative async patterns.

Flagged example:

```javascript
async function foo() {
  await bar();
  return baz();
}
```

Accepted example:

```javascript
async function foo() {
  await bar();
  return baz();
}
```

#### [ ] `oxc/no-barrel-file`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-barrel-file.html
- What it does: Disallow the use of barrel files where the file contains export * statements, and the total number of modules exceeds a threshold.
- Covers: Barrel files that re-export many modules can significantly slow down applications and bundlers. When a barrel file exports a large number of modules, importing from it forces the runtime or bundler to process all the exported modules, even if only a few are actually used. This leads to slower startup times and larger bundle sizes.

Example signal: Flags barrel file patterns in oxc code.

#### [ ] `oxc/no-const-enum`

- Category: restriction
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-const-enum.html
- What it does: Disallow TypeScript const enum
- Covers: Const enums are enums that should be inlined at use sites. Const enums are not supported by bundlers and are incompatible with the isolatedModules mode. Their use can lead to import nonexistent values (because const enums are erased).

Flagged example:

```ts
const enum Color {
  Red,
  Green,
  Blue,
}
```

Accepted example:

```ts
const enum Color {
  Red,
  Green,
  Blue,
}
```

#### [ ] `oxc/no-optional-chaining`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.5.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-optional-chaining.html
- What it does: Disallow optional chaining.
- Covers: You may want to use this rule if you need to maintain compatibility with older environments. However, optional chaining has been supported in all major browsers since 2020 and is generally safe to use today.

Flagged example:

```javascript
const foo = obj?.foo;
obj.fn?.();
```

Accepted example:

```javascript
const foo = obj?.foo;
obj.fn?.();
```

#### [ ] `oxc/no-rest-spread-properties`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-rest-spread-properties.html
- What it does: Disallow Object Rest/Spread Properties.
- Covers: Object rest/spread properties are a relatively new JavaScript feature that may not be supported in all target environments. If you need to support older browsers or JavaScript engines that don't support these features, using them can cause runtime errors. This rule helps maintain compatibility with older environments by preventing the use of these modern syntax features.

Flagged example:

```javascript
let { x, ...y } = z;
let z = { x, ...y };
```

Accepted example:

```javascript
let { x, ...y } = z;
let z = { x, ...y };
```

### pedantic

#### [ ] `oxc/branches-sharing-code`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.22.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/branches-sharing-code.html
- What it does: Checks if the if and else blocks contain shared code that can be moved out of the blocks.
- Covers: Duplicate code is less maintainable. Extracting common code from branches makes the code more DRY (Don't Repeat Yourself) and easier to maintain.

Flagged example:

```javascript
if (condition) {
  console.log("Hello");
  return 13;
} else {
  console.log("Hello");
  return 42;
}

if (condition) {
  doSomething();
// ...
```

Accepted example:

```javascript
console.log("Hello");
if (condition) {
  return 13;
} else {
  return 42;
}

if (condition) {
  doSomething();
} else {
// ...
```

### perf

#### [ ] `oxc/no-accumulating-spread`

- Category: perf
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-accumulating-spread.html
- What it does: Prevents using object or array spreads on accumulators in Array.prototype.reduce() and in loops.
- Covers: Object and array spreads create a new object or array on each iteration. In the worst case, they also cause O(n) copies (both memory and time complexity). When used on an accumulator, this can lead to O(n^2) memory complexity and O(n^2) time complexity.

Flagged example:

```javascript
arr.reduce((acc, x) => ({ ...acc, [x]: fn(x) }), {});
Object.keys(obj).reduce((acc, el) => ({ ...acc, [el]: fn(el) }), {});

let foo = [];
for (let i = 0; i < 10; i++) {
  foo = [...foo, i];
}
```

Accepted example:

```javascript
function fn(x) {
  // ...
}

arr.reduce((acc, x) => acc.push(fn(x)), []);
Object.keys(obj).reduce((acc, el) => {
  acc[el] = fn(el);
}, {});
// spreading non-accumulators should be avoided if possible, but is not
// banned by this rule
// ...
```

#### [ ] `oxc/no-map-spread`

- Category: perf
- Default: no
- Fix: conditional suggestion
- Type-aware: no
- Added: 0.11.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-map-spread.html
- What it does: Disallow the use of object or array spreads in Array.prototype.map and Array.prototype.flatMap to add properties/elements to array items.
- Covers: Spreading is commonly used to add properties to objects in an array or to combine several objects together. Unfortunately, spreads incur a re-allocation for a new object, plus O(n) memory copies.

Flagged example:

```js
const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
const arr2 = arr.map((obj) => ({ ...obj, b: obj.a * 2 }));
```

Accepted example:

```ts
const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
arr.map((obj) => Object.assign(obj, { b: obj.a * 2 }));

// instance properties are ignored
class UsersDb {
  #users = [];
  public get users() {
    // clone users, providing caller with their own deep(ish) copy.
    return this.#users.map((user) => ({ ...user }));
  }
// ...
```

## promise

### suspicious

#### [ ] `promise/always-return`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.13.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/always-return.html
- What it does: Require returning inside each then() to create readable and reusable Promise chains. We also allow someone to throw inside a then() which is essentially the same as return Promise.reject().
- Covers: Broken Promise Chain. Inside the first then() callback, a function is called but not returned. This causes the next then() in the chain to execute immediately without waiting for the called function to complete.

Flagged example:

```javascript
myPromise.then(function (val) {});
myPromise.then(() => {
  doSomething();
});
myPromise.then((b) => {
  if (b) {
    return "yes";
  } else {
    forgotToReturn();
  }
// ...
```

Accepted example:

```javascript
myPromise.then((val) => val * 2);
myPromise.then(function (val) {
  return val * 2;
});
myPromise.then(doSomething); // could be either
myPromise.then((b) => {
  if (b) {
    return "yes";
  } else {
    return "no";
// ...
```

#### [ ] `promise/no-multiple-resolved`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.19.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/no-multiple-resolved.html
- What it does: This rule warns of paths that resolve multiple times in executor functions of Promise constructors.
- Covers: Multiple resolve/reject calls:

Flagged example:

```javascript
new Promise((resolve, reject) => {
  fn((error, value) => {
    if (error) {
      reject(error);
    }

    resolve(value); // Both `reject` and `resolve` may be called.
  });
});
```

Accepted example:

```javascript
new Promise((resolve, reject) => {
  fn((error, value) => {
    if (error) {
      reject(error);
    } else {
      resolve(value);
    }
  });
});
```

#### [ ] `promise/no-promise-in-callback`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.13.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/no-promise-in-callback.html
- What it does: Disallows the use of Promises within error-first callback functions.
- Covers: Mixing Promises and callbacks can lead to unclear and inconsistent code. Promises and callbacks are different patterns for handling asynchronous code. Mixing them makes the logic flow harder to follow and complicates error handling, as callbacks rely on an error-first pattern, while Promises use catch.

Flagged example:

```js
doSomething((err, val) => {
  if (err) console.error(err);
  else doSomethingElse(val).then(console.log);
});
```

Accepted example:

```js
promisify(doSomething)().then(doSomethingElse).then(console.log).catch(console.error);
```

### style

#### [ ] `promise/avoid-new`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.6.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/avoid-new.html
- What it does: Disallow creating promises with new Promise().
- Covers: Many cases that use new Promise() could be refactored to use an async function. async is considered more idiomatic in modern JavaScript.

Flagged example:

```javascript
function foo() {
  return new Promise((resolve, reject) => {
    /* ... */
  });
}
```

Accepted example:

```javascript
async function foo() {
  // ...
}
const bar = await Promise.all([baz(), bang()]);
```

#### [ ] `promise/no-nesting`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.15.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/no-nesting.html
- What it does: Disallow nested then() or catch() statements.
- Covers: Nesting promises makes code harder to read and understand.

Flagged example:

```javascript
doThing().then(() => a.then());

doThing().then(function () {
  a.then();
});

doThing().then(() => {
  b.catch();
});

// ...
```

Accepted example:

```javascript
doThing().then(() => 4);

doThing().then(function () {
  return 4;
});

doThing().catch(() => 4);
```

#### [ ] `promise/no-return-wrap`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.15.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/no-return-wrap.html
- What it does: Prevents unnecessary wrapping of return values in promises with either Promise.resolve or Promise.reject.
- Covers: It is unnecessary to use Promise.resolve and Promise.reject for converting raw values to promises in the return statements of then and catch callbacks. Using these operations to convert raw values to promises is unnecessary as simply returning the raw value for the success case and throwing the raw error value in the failure case have the same effect. This is why some take the opinion that returning values such as Promise.resolve(1) or Promise.reject(err) is syntactic noise.

Flagged example:

```js
myPromise().then(() => Promise.resolve(4));
myPromise().then(function () {
  return Promise.resolve(4);
});

myPromise().then(() => Promise.reject("err"));
myPromise().then(function () {
  return Promise.reject("err");
});
```

Accepted example:

```js
myPromise().then(() => 4);
myPromise().then(function () {
  return 4;
});

myPromise().then(() => throw "err");
myPromise().then(function () {
  throw "err";
});
```

#### [ ] `promise/param-names`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.6.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/param-names.html
- What it does: Enforce standard parameter names for Promise constructors.
- Covers: Ensures that new Promise() is instantiated with the parameter names resolve, reject to avoid confusion with order such as reject, resolve. The Promise constructor uses the RevealingConstructor pattern. Using the same parameter names as the language specification makes code more uniform and easier to understand.

Flagged example:

```javascript
new Promise(function (reject, resolve) {
  /* ... */
}); // incorrect order
new Promise(function (ok, fail) {
  /* ... */
}); // non-standard parameter names
```

Accepted example:

```javascript
new Promise(function (resolve, reject) {});
```

#### [ ] `promise/prefer-await-to-callbacks`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.10
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-await-to-callbacks.html
- What it does: The rule encourages the use of async/await for handling asynchronous code instead of traditional callback functions. async/await, introduced in ES2017, provides a clearer and more concise syntax for writing asynchronous code, making it easier to read and maintain.
- Covers: Using callbacks can lead to complex, nested structures known as "callback hell," which make code difficult to read and maintain. Additionally, error handling can become cumbersome with callbacks, whereas async/await allows for more straightforward try/catch blocks for managing errors.

Flagged example:

```js
cb();
callback();
doSomething(arg, (err) => {});
function doSomethingElse(cb) {}
```

Accepted example:

```js
await doSomething(arg);
async function doSomethingElse() {}
function* generator() {
  yield yieldValue((err) => {});
}
eventEmitter.on("error", (err) => {});
```

#### [ ] `promise/prefer-await-to-then`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.7.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-await-to-then.html
- What it does: Prefer await to then()/catch()/finally() for reading Promise values.
- Covers: Async/await syntax can be seen as more readable.

Flagged example:

```javascript
function foo() {
  hey.then((x) => {});
}
```

Accepted example:

```javascript
async function hi() {
  await thing();
}
```

#### [ ] `promise/prefer-catch`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.15.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-catch.html
- What it does: Prefer catch to then(a, b) and then(null, b). This rule disallows the passing of an argument into the second parameter of then calls for handling promise errors.
- Covers: A then call with two arguments can make it more difficult to recognize that a catch error handler is present. Another issue with using the second argument in then calls is that the ordering of promise error handling is less obvious.

Flagged example:

```js
prom.then(fn1, fn2);

prom.then(null, fn2);
```

Accepted example:

```js
prom.catch(fn2).then(fn1);

prom.catch(fn2);
```

### restriction

#### [ ] `promise/catch-or-return`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/catch-or-return.html
- What it does: Ensure that each time a then() is applied to a promise, a catch() must be applied as well. Exceptions are made for promises returned from a function.
- Covers: Not catching errors in a promise can cause hard to debug problems or missing handling of error conditions. In the worst case, unhandled promise rejections can cause your application to crash.

Flagged example:

```javascript
myPromise.then(doSomething);
myPromise.then(doSomething, catchErrors); // catch() may be a little better
```

Accepted example:

```javascript
myPromise.then(doSomething).catch(errors);
function doSomethingElse() {
  return myPromise.then(doSomething);
}
const arrowFunc = () => myPromise.then(doSomething);
```

#### [ ] `promise/spec-only`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/spec-only.html
- What it does: Disallow use of non-standard Promise static methods.
- Covers: Non-standard Promises may cost more maintenance work.

Flagged example:

```js
Promise.done();
```

Accepted example:

```js
Promise.resolve();
```

### correctness

#### [ ] `promise/no-callback-in-promise`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.10.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/no-callback-in-promise.html
- What it does: Disallows calling a callback function (cb()) inside a Promise.prototype.then() or Promise.prototype.catch().
- Covers: Directly invoking a callback inside a then() or catch() method can lead to unexpected behavior, such as the callback being called multiple times. Additionally, mixing the callback and promise paradigms in this way can make the code confusing and harder to maintain.

Flagged example:

```js
function callback(err, data) {
  console.log("Callback got called with:", err, data);
  throw new Error("My error");
}

Promise.resolve()
  .then(() => callback(null, "data"))
  .catch((err) => callback(err.message, null));
```

Accepted example:

```js
Promise.resolve()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
```

#### [ ] `promise/no-new-statics`

- Category: correctness
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.6.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/no-new-statics.html
- What it does: Disallows calling new on static Promise methods.
- Covers: Calling a static Promise method with new is invalid and will result in a TypeError at runtime.

Flagged example:

```javascript
const x = new Promise.resolve(value);
```

Accepted example:

```javascript
const x = Promise.resolve(value);
```

#### [ ] `promise/valid-params`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.7.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/valid-params.html
- What it does: Enforces the proper number of arguments are passed to Promise functions.
- Covers: Calling a Promise function with the incorrect number of arguments can lead to unexpected behavior or hard to spot bugs.

Flagged example:

```javascript
Promise.resolve(1, 2);
```

Accepted example:

```javascript
Promise.resolve(1);
```

### nursery

#### [ ] `promise/no-return-in-finally`

- Category: nursery
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.7.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/promise/no-return-in-finally.html
- What it does: Disallow return statements in a finally() callback of a promise.
- Covers: Disallow return statements inside a callback passed to finally(), since nothing would consume what's returned.

Flagged example:

```javascript
myPromise.finally(function (val) {
  return val;
});
```

Accepted example:

```javascript
Promise.resolve(1).finally(() => {
  console.log(2);
});
```

## react

### restriction

#### [ ] `react/button-has-type`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/button-has-type.html
- What it does: Enforces an explicit type attribute for all HTML button elements.
- Covers: The default value of type attribute for button HTML element is "submit" which is often not the desired behavior and may lead to unexpected page reloads.

Flagged example:

```jsx
<button />
<button type="foo" />
```

Accepted example:

```jsx
<button type="button" />
<button type="submit" />
```

#### [ ] `react/forbid-component-props`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.62.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-component-props.html
- What it does: This rule prevents passing of props to components. This rule only applies to Components (e.g. <Foo />) and not DOM nodes (e.g. <div />). By default this rule prevents passing of props that add lots of complexity (className, style) to Components. The list of forbidden props can be customized with the forbid option.
- Covers: This rule checks all JSX elements and verifies that no forbidden props are used on components. This rule is off by default.

Flagged example:

```jsx
<Hello className='foo' />
<Hello style={{color: 'red'}} />
```

Accepted example:

```jsx
<Hello name='Joe' />
<div className='foo' />
<div style={{color: 'red'}} />
```

#### [ ] `react/forbid-dom-props`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.24.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-dom-props.html
- What it does: This rule prevents passing of props to elements. This rule only applies to DOM Nodes (e.g. <div />) and not Components (e.g. <Component />). The list of forbidden props can be customized with the forbid option.
- Covers: This rule checks all JSX elements and verifies that no forbidden props are used on DOM Nodes. This rule is off by default.

Flagged example:

```jsx
// [1, { "forbid": ["id"] }]
<div id='Joe' />

// [1, { "forbid": ["style"] }]
<div style={{color: 'red'}} />
```

Accepted example:

```jsx
// [1, { "forbid": ["id"] }]
<Hello id='foo' />

// [1, { "forbid": ["id"] }]
<Hello id={{color: 'red'}} />
```

#### [ ] `react/forbid-elements`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.16.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-elements.html
- What it does: Allows you to configure a list of forbidden elements and to specify their desired replacements.
- Covers: You may want to forbid usage of certain elements in favor of others, e.g. forbid all <div /> and use <Box /> instead.

Flagged example:

```jsx
// ["error", { "forbid": ["button"] }]
<button />;
React.createElement("button");

// ["error", { "forbid": ["Modal"] }]
<Modal />;
React.createElement(Modal);

// ["error", { "forbid": ["Namespaced.Element"] }]
<Namespaced.Element />;
// ...
```

Accepted example:

```jsx
// ["error", { "forbid": ["button"] }]
<Button />

// ["error", { "forbid": [{ "element": "button" }] }]
<Button />
```

#### [ ] `react/jsx-filename-extension`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.15.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-filename-extension.html
- What it does: Enforces consistent use of the .jsx file extension.
- Covers: Some bundlers or parsers need to know by the file extension that it contains JSX in order to properly handle the files.

Flagged example:

```jsx
// filename: MyComponent.js
function MyComponent() {
  return <div />;
}
```

Accepted example:

```jsx
// filename: MyComponent.jsx
function MyComponent() {
  return <div />;
}
```

#### [ ] `react/jsx-no-literals`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.70.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-literals.html
- What it does: Disallows usage of unwrapped string literals inside JSX, such as text children of a JSX element or string-valued props.
- Covers: Hard-coded string literals in JSX make it difficult to support internationalization (i18n). By requiring literals to be wrapped in a JSX expression container (for example, a call to a translation function), this rule helps ensure all user-facing text flows through a single, auditable mechanism rather than being scattered as inline strings throughout the markup.

Flagged example:

```jsx
<div>Hello world</div>
```

Accepted example:

```jsx
<div>{"Hello world"}</div>
```

#### [ ] `react/no-clone-element`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.53.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-clone-element.html
- What it does: Prevents the usage of React.cloneElement, which is considered an anti-pattern in React.
- Covers: It is recommended not to use React.cloneElement because it can lead to code that is harder to follow and understand. It is generally uncommon and fragile, and there are various alternatives recommended by the React documentation.

Flagged example:

```jsx
import { cloneElement } from "react";

function List({ children }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isHighlighted: index === selectedIndex,
        }),
// ...
```

Accepted example:

```jsx
// Using a map with a `renderItem` function prop instead.
function List({ items, renderItem }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {items.map((item, index) => {
        const isHighlighted = index === selectedIndex;
        return renderItem(item, isHighlighted);
      })}
    </div>
// ...
```

#### [ ] `react/no-danger`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger.html
- What it does: This rule prevents the use of dangerouslySetInnerHTML prop.
- Covers: dangerouslySetInnerHTML is a way to inject HTML into your React component. This is dangerous because it can easily lead to XSS vulnerabilities.

Flagged example:

```jsx
import React from "react";

const Hello = <div dangerouslySetInnerHTML={{ __html: "Hello World" }}></div>;
```

Accepted example:

```jsx
import React from "react";

const Hello = <div>Hello World</div>;
```

#### [ ] `react/no-multi-comp`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.43.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-multi-comp.html
- What it does: Prevents multiple React components from being defined in the same file.
- Covers: Declaring multiple components in a single file can make it harder to navigate and maintain the codebase. Each component should ideally be in its own file for better organization and reusability.

Flagged example:

```jsx
function Foo({ name }) {
  return <div>Hello {name}</div>;
}

function Bar({ name }) {
  return <div>Hello again {name}</div>;
}
```

Accepted example:

```jsx
function Foo({ name }) {
  return <div>Hello {name}</div>;
}
```

#### [ ] `react/no-react-children`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.53.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-react-children.html
- What it does: Disallows the usage of React.Children, as it is considered a bad practice.
- Covers: Using React.Children is discouraged by the React documentation. It is an uncommon pattern and can lead to fragile code.

Flagged example:

```jsx
import { Children } from "react";

Children.toArray(children);
Children.map(children, (child) => <div>{child}</div>);
Children.only(children);
Children.count(children);
Children.forEach(children, (child, index) => {});
```

Accepted example:

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

#### [ ] `react/no-unknown-property`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-unknown-property.html
- What it does: Disallow usage of unknown DOM properties.
- Covers: DOM properties should only be used if they are valid for a given HTML element.

Flagged example:

```jsx
// Unknown properties
const Hello = <div class="hello">Hello World</div>;
const Alphabet = <div abc="something">Alphabet</div>;

// Invalid aria-* attribute
const IconButton = <div aria-foo="bar" />;
```

Accepted example:

```jsx
// Unknown properties
const Hello = <div className="hello">Hello World</div>;
const Alphabet = <div>Alphabet</div>;

// Invalid aria-* attribute
const IconButton = <div aria-label="bar" />;
```

#### [ ] `react/only-export-components`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.23.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/only-export-components.html
- What it does: Ensures that modules only export React components (and related HMR-safe items) so that Fast Refresh (a.k.a. hot reloading) can safely preserve component state. Concretely, it validates the shape of your module's exports and common entrypoints (e.g. createRoot(...).render(<App />)) to match what integrations like react-refresh expect.
- Covers: Fast Refresh can only reliably retain state if a module exports components and avoids patterns that confuse the refresh runtime. Problematic patterns (like export *, anonymous default functions, exporting arrays of JSX, or mixing non-component exports in unsupported ways) can cause:

Flagged example:

```jsx
// 1) Mixing util exports with components in unsupported ways
export const foo = () => {}; // util, not a component
export const Bar = () => <></>; // component
```

Accepted example:

```jsx
// Named or default component exports are fine
export default function Foo() {
  return null;
}
```

#### [ ] `react/prefer-function-component`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-function-component.html
- What it does: Enforces that React components are written as function components instead of class components.
- Covers: Function components are simpler, easier to read, and support React hooks. Class components are a legacy pattern that is discouraged in modern React.

Flagged example:

```jsx
class Foo extends React.Component {
  render() {
    return <div>{this.props.foo}</div>;
  }
}

class Bar extends React.PureComponent {
  render() {
    return <div>{this.props.bar}</div>;
  }
// ...
```

Accepted example:

```jsx
const Foo = function (props) {
  return <div>{props.foo}</div>;
};

const Bar = ({ bar }) => <div>{bar}</div>;
```

### pedantic

#### [ ] `react/checked-requires-onchange-or-readonly`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/checked-requires-onchange-or-readonly.html
- What it does: This rule enforces onChange or readOnly attribute for checked property of input elements. It also warns when checked and defaultChecked properties are used together.
- Covers: checked should generally always be used with one of onChange or readOnly.

Flagged example:

```jsx
<input type="checkbox" checked />
<input type="checkbox" checked defaultChecked />
<input type="radio" checked defaultChecked />

React.createElement('input', { checked: false });
React.createElement('input', { type: 'checkbox', checked: true });
React.createElement('input', { type: 'checkbox', checked: true, defaultChecked: true });
```

Accepted example:

```jsx
<input type="checkbox" checked onChange={() => {}} />
<input type="checkbox" checked readOnly />
<input type="checkbox" checked onChange readOnly />
<input type="checkbox" defaultChecked />

React.createElement('input', { type: 'checkbox', checked: true, onChange() {} });
React.createElement('input', { type: 'checkbox', checked: true, readOnly: true });
React.createElement('input', { type: 'checkbox', checked: true, onChange() {}, readOnly: true });
React.createElement('input', { type: 'checkbox', defaultChecked: true });
```

#### [ ] `react/display-name`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.42.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/display-name.html
- What it does: Enforces that React components have a displayName property.
- Covers: React DevTools uses displayName to show component names in the component tree. Without displayName, components will show up as "Unknown" in DevTools.

Flagged example:

```jsx
const MyComponent = () => <div>Hello</div>;
```

Accepted example:

```jsx
const MyComponent = () => <div>Hello</div>;
MyComponent.displayName = "MyComponent";
```

#### [ ] `react/jsx-no-target-blank`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.2.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-target-blank.html
- What it does: This rule aims to prevent user-generated link hrefs and form actions from creating security vulnerabilities by requiring rel='noreferrer' for external link hrefs and form actions, and optionally any dynamically generated link hrefs and form actions.
- Covers: When creating a JSX element that has an a tag, it is often desired to have the link open in a new tab using the target='_blank' attribute. Using this attribute unaccompanied by rel='noreferrer', however, is a severe security vulnerability (see [noreferrer docs] and [noopener docs] for more details). This rules requires that you accompany target='_blank' attributes with rel='noreferrer'.

Flagged example:

```jsx
var Hello = <a target="_blank" href="https://example.com/"></a>;
var Hello = <a target="_blank" href={dynamicLink}></a>;
```

Accepted example:

```jsx
/// correct
var Hello = <p target="_blank"></p>;
var Hello = <a target="_blank" rel="noreferrer" href="https://example.com"></a>;
var Hello = <a target="_blank" rel="noopener noreferrer" href="https://example.com"></a>;
var Hello = <a target="_blank" href="relative/path/in/the/host"></a>;
var Hello = <a target="_blank" href="/absolute/path/in/the/host"></a>;
var Hello = <a></a>;
```

#### [ ] `react/jsx-no-useless-fragment`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-useless-fragment.html
- What it does: Disallow unnecessary fragments.
- Covers: Fragments are a useful tool when you need to group multiple children without adding a node to the DOM tree. However, sometimes you might end up with a fragment with a single child. When this child is an element, string, or expression, it's not necessary to use a fragment.

Flagged example:

```jsx
<>foo</>
<div><>foo</></div>
```

Accepted example:

```jsx
<>foo <div></div></>
<div>foo</div>
```

#### [ ] `react/no-unescaped-entities`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-unescaped-entities.html
- What it does: This rule prevents characters that you may have meant as JSX escape characters from being accidentally injected as a text node in JSX statements.
- Covers: JSX escape characters are used to inject characters into JSX statements that would otherwise be interpreted as code.

Example signal: Flags unescaped entities patterns in react code.

#### [ ] `react/rules-of-hooks`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/rules-of-hooks.html
- What it does: Enforces the Rules of Hooks, ensuring that React Hooks are only called in valid contexts and in the correct order.
- Covers: React Hooks must follow specific rules to ensure they work correctly:

Flagged example:

```javascript
// Don't call Hooks inside loops, conditions, or nested functions
function BadComponent() {
  if (condition) {
    const [state, setState] = useState(); // ❌ Hook in condition
  }

  for (let i = 0; i < 10; i++) {
    useEffect(() => {}); // ❌ Hook in loop
  }
}
// ...
```

Accepted example:

```javascript
// ✅ Call Hooks at the top level of a React component
function GoodComponent() {
  const [state, setState] = useState();

  useEffect(() => {
    // Effect logic here
  });

  return <div>{state}</div>;
}
// ...
```

### correctness

#### [ ] `react/exhaustive-deps`

- Category: correctness
- Default: no
- Fix: fixable_dangerous_fix_or_suggestion
- Type-aware: no
- Added: 0.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-deps.html
- What it does: Verifies the list of dependencies for Hooks like useEffect and similar.
- Covers: React Hooks like useEffect and similar require a list of dependencies to be passed as an argument. This list is used to determine when the effect should be re-run. If the list is missing or incomplete, the effect may run more often than necessary, or not at all.

Flagged example:

```javascript
function MyComponent(props) {
  useEffect(() => {
    console.log(props.foo);
  }, []);
  // `props` is missing from the dependencies array
  return <div />;
}
```

Accepted example:

```javascript
function MyComponent(props) {
  useEffect(() => {
    console.log(props.foo);
  }, [props]);
  return <div />;
}
```

#### [ ] `react/forward-ref-uses-ref`

- Category: correctness
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.16.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/forward-ref-uses-ref.html
- What it does: Requires that components wrapped with forwardRef must have a ref parameter. Omitting the ref argument is usually a bug, and components not using ref don't need to be wrapped by forwardRef.
- Covers: Omitting the ref argument makes the forwardRef wrapper unnecessary, and can lead to confusion.

Flagged example:

```jsx
var React = require("react");

var Component = React.forwardRef((props) => <div />);
```

Accepted example:

```jsx
var React = require("react");

var Component = React.forwardRef((props, ref) => <div ref={ref} />);

var Component = React.forwardRef((props, ref) => <div />);

function Component(props) {
  return <div />;
}
```

#### [ ] `react/jsx-key`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-key.html
- What it does: Enforce key prop for elements in an array.
- Covers: React requires a key prop for elements in an array to help identify which items have changed, are added, or are removed.

Flagged example:

```jsx
[1, 2, 3].map((x) => <App />);
[1, 2, 3]?.map((x) => <ListItem />);
```

Accepted example:

```jsx
[1, 2, 3].map((x) => <App key={x} />);
[1, 2, 3]?.map((x) => <ListItem key={x} />);
```

#### [ ] `react/jsx-no-duplicate-props`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-duplicate-props.html
- What it does: This rule prevents duplicate props in JSX elements.
- Covers: Having duplicate props in a JSX element is most likely a mistake. Creating JSX elements with duplicate props can cause unexpected behavior in your application.

Flagged example:

```jsx
<App a a />;
<App foo={2} bar baz foo={3} />;
```

Accepted example:

```jsx
<App a />;
<App bar baz foo={3} />;
```

#### [ ] `react/jsx-no-undef`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-undef.html
- What it does: Disallow undeclared variables in JSX.
- Covers: It is most likely a potential ReferenceError caused by a misspelling of a variable or parameter name.

Flagged example:

```jsx
const A = () => <App />;
const C = <B />;
```

Accepted example:

```jsx
const A = () => <App />;
const C = <B />;
```

#### [ ] `react/jsx-props-no-spread-multi`

- Category: correctness
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.7.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spread-multi.html
- What it does: Enforces that any unique expression is only spread once.
- Covers: Generally spreading the same expression twice is an indicator of a mistake since any attribute between the spreads may be overridden when the intent was not to. Even when that is not the case this will lead to unnecessary computations being performed.

Flagged example:

```jsx
<App {...props} myAttr="1" {...props} />
```

Accepted example:

```jsx
<App myAttr="1" {...props} />
<App {...props} myAttr="1" />
```

#### [ ] `react/no-children-prop`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-children-prop.html
- What it does: Checks that children are not passed using a prop.
- Covers: Children should always be actual children, not passed in as a prop. When using JSX, the children should be nested between the opening and closing tags. When not using JSX, the children should be passed as additional arguments to React.createElement.

Flagged example:

```jsx
<div children='Children' />

<MyComponent children={<AnotherComponent />} />
<MyComponent children={['Child 1', 'Child 2']} />
React.createElement("div", { children: 'Children' })
```

Accepted example:

```jsx
<div>Children</div>
<MyComponent>Children</MyComponent>

<MyComponent>
  <span>Child 1</span>
  <span>Child 2</span>
</MyComponent>

React.createElement("div", {}, 'Children')
React.createElement("div", 'Child 1', 'Child 2')
```

#### [ ] `react/no-danger-with-children`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.6
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger-with-children.html
- What it does: Disallows DOM elements from using both children and dangerouslySetInnerHTML properties.
- Covers: React will throw a warning if this rule is ignored and both children and dangerouslySetInnerHTML are used.

Flagged example:

```jsx
<div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>;
React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children");
```

Accepted example:

```jsx
<div>Children</div>
<div dangerouslySetInnerHTML={{ __html: "HTML" }} />
```

#### [ ] `react/no-did-mount-set-state`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.36.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-did-mount-set-state.html
- What it does: Disallows using setState in the componentDidMount lifecycle method.
- Covers: Updating the state after a component mount will trigger a second render() call and can lead to property/layout thrashing. This can cause performance issues and unexpected behavior.

Flagged example:

```jsx
var Hello = createReactClass({
  componentDidMount: function () {
    this.setState({
      name: this.props.name.toUpperCase(),
    });
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});
```

Accepted example:

```jsx
var Hello = createReactClass({
  componentDidMount: function () {
    this.onMount(function callback(newName) {
      this.setState({
        name: newName,
      });
    });
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
// ...
```

#### [ ] `react/no-did-update-set-state`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.62.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-did-update-set-state.html
- What it does: Disallow usage of setState in componentDidUpdate.
- Covers: Updating the state after a component update will trigger a second render() call and can lead to property/layout thrashing.

Flagged example:

```jsx
var Hello = createReactClass({
  componentDidUpdate: function () {
    this.setState({
      name: this.props.name.toUpperCase(),
    });
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});
```

Accepted example:

```jsx
var Hello = createReactClass({
  componentDidUpdate: function () {
    this.props.onUpdate();
  },
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
```

#### [ ] `react/no-direct-mutation-state`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-direct-mutation-state.html
- What it does: This rule forbids the direct mutation of this.state in React components.
- Covers: React components should never mutate this.state directly, as calling setState() afterwards may replace the mutation you made.

Flagged example:

```jsx
var Hello = createReactClass({
  componentDidMount: function () {
    this.state.name = this.props.name.toUpperCase();
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});

class Hello extends React.Component {
// ...
```

Accepted example:

```jsx
var Hello = createReactClass({
  componentDidMount: function() {
    this.setState({
      name: this.props.name.toUpperCase();
    });
  },
  render: function() {
    return <div>Hello {this.state.name}</div>;
  }
});
// ...
```

#### [ ] `react/no-find-dom-node`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-find-dom-node.html
- What it does: This rule disallows the use of findDOMNode, which was deprecated in 2018 and removed in React 19.
- Covers: findDOMNode is an escape hatch used to access the underlying DOM node. In most cases, use of this escape hatch is discouraged because it pierces the component abstraction. It has been deprecated for years, and was removed from React entirely in React 19.

Flagged example:

```jsx
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView();
  }
  render() {
    return <div />;
  }
}
```

Accepted example:

```jsx
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView();
  }
  render() {
    return <div />;
  }
}
```

#### [ ] `react/no-is-mounted`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-is-mounted.html
- What it does: This rule prevents using isMounted in class components.
- Covers: isMounted is an anti-pattern, and is not available when using classes or function components.

Flagged example:

```jsx
class Hello extends React.Component {
  someMethod() {
    if (!this.isMounted()) {
      return;
    }
  }
  render() {
    return <div onClick={this.someMethod.bind(this)}>Hello</div>;
  }
}
```

Accepted example:

```jsx
class Hello extends React.Component {
  someMethod() {
    if (!this.isMounted()) {
      return;
    }
  }
  render() {
    return <div onClick={this.someMethod.bind(this)}>Hello</div>;
  }
}
```

#### [ ] `react/no-render-return-value`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-render-return-value.html
- What it does: This rule will warn you if you try to use the ReactDOM.render() return value.
- Covers: Using the return value from ReactDOM.render() is a legacy feature and should not be used.

Flagged example:

```jsx
var inst = ReactDOM.render(<App />, document.body);
function render() {
  return ReactDOM.render(<App />, document.body);
}
```

Accepted example:

```jsx
ReactDOM.render(<App />, document.body);
```

#### [ ] `react/no-string-refs`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-string-refs.html
- What it does: This rule prevents using the deprecated behavior of string literals in ref attributes.
- Covers: Using string literals in ref attributes has been deprecated since React 16.3.0.

Flagged example:

```jsx
var Hello = createReactClass({
  render: function () {
    return <div ref="hello">Hello, world.</div>;
  },
});

var Hello = createReactClass({
  componentDidMount: function () {
    var component = this.refs.hello;
    // ...do something with component
// ...
```

Accepted example:

```jsx
var Hello = createReactClass({
  componentDidMount: function () {
    var component = this.hello;
    // ...do something with component
  },
  render() {
    return (
      <div
        ref={(c) => {
          this.hello = c;
// ...
```

#### [ ] `react/no-this-in-sfc`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.37.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-this-in-sfc.html
- What it does: Prevents using this in stateless functional components.
- Covers: In React, stateless functional components (SFCs) receive props and context as function parameters, not through this. Using this in an SFC typically indicates a mistake when converting from class components or unfamiliarity with the two component styles.

Flagged example:

```jsx
function Foo(props) {
  return <div>{this.props.bar}</div>;
}

function Foo(props) {
  const { bar } = this.props;
  return <div>{bar}</div>;
}

const Foo = (props) => (this.props.foo ? <span>{props.bar}</span> : null);
```

Accepted example:

```jsx
function Foo(props) {
  return <div>{props.bar}</div>;
}

function Foo({ bar }) {
  return <div>{bar}</div>;
}

class Foo extends React.Component {
  render() {
// ...
```

#### [ ] `react/no-unsafe`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.35.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-unsafe.html
- What it does: This rule identifies and restricts the use of unsafe React lifecycle methods.
- Covers: Certain lifecycle methods (componentWillMount, componentWillReceiveProps, and componentWillUpdate) are considered unsafe and have been deprecated since React 16.9. They are frequently misused and cause problems in async rendering. Using their UNSAFE_ prefixed versions or the deprecated names themselves should be avoided.

Flagged example:

```jsx
// By default, UNSAFE_ prefixed methods are flagged
class Foo extends React.Component {
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillReceiveProps() {}
  UNSAFE_componentWillUpdate() {}
}

// With checkAliases: true, non-prefixed versions are also flagged
class Bar extends React.Component {
  componentWillMount() {}
// ...
```

Accepted example:

```jsx
class Foo extends React.Component {
  componentDidMount() {}
  componentDidUpdate() {}
  render() {}
}
```

#### [ ] `react/no-will-update-set-state`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.37.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-will-update-set-state.html
- What it does: Disallows using setState in the componentWillUpdate lifecycle method.
- Covers: Updating the state during the component update step can lead to indeterminate component state and is not allowed. This can cause unexpected behavior and bugs in your React application.

Flagged example:

```jsx
var Hello = createReactClass({
  componentWillUpdate: function () {
    this.setState({
      name: this.props.name.toUpperCase(),
    });
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});
```

Accepted example:

```jsx
var Hello = createReactClass({
  componentWillUpdate: function () {
    this.props.prepareHandler();
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});
```

#### [ ] `react/void-dom-elements-no-children`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/void-dom-elements-no-children.html
- What it does: Disallow void DOM elements (e.g. <img />, <br />) from receiving children.
- Covers: There are some HTML elements that are only self-closing (e.g. img, br, hr). These are collectively known as void DOM elements. This rule checks that children are not passed to void DOM elements.

Flagged example:

```jsx
<br>Children</br>
<br children='Children' />
<br dangerouslySetInnerHTML={{ __html: 'HTML' }} />
React.createElement('br', undefined, 'Children')
React.createElement('br', { children: 'Children' })
React.createElement('br', { dangerouslySetInnerHTML: { __html: 'HTML' } })
```

Accepted example:

```jsx
<div>Children</div>
<div children='Children' />
<div dangerouslySetInnerHTML={{ __html: 'HTML' }} />
React.createElement('div', undefined, 'Children')
React.createElement('div', { children: 'Children' })
React.createElement('div', { dangerouslySetInnerHTML: { __html: 'HTML' } })
```

### style

#### [ ] `react/hook-use-state`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/hook-use-state.html
- What it does: Ensure destructuring and symmetric naming of useState hook value and setter variables.
- Covers: This rule checks whether the value and setter variables destructured from a React.useState() call are named symmetrically

Flagged example:

```jsx
import React from "react";
export default function useColor() {
  // useState call is not destructured into value + setter pair
  const useStateResult = React.useState();
  return useStateResult;
}
```

Accepted example:

```jsx
import React from "react";
export default function useColor() {
  // useState call is destructured into value + setter pair whose identifiers
  // follow the [thing, setThing] naming convention
  const [color, setColor] = React.useState();
  return [color, setColor];
}
```

#### [ ] `react/jsx-boolean-value`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-boolean-value.html
- What it does: Enforce a consistent boolean attribute style in your code.
- Covers: In JSX, you can set a boolean attribute to true or omit it. This rule will enforce a consistent style for boolean attributes.

Flagged example:

```jsx
const Hello = <Hello personal={true} />;
```

Accepted example:

```jsx
const Hello = <Hello personal />;

const Foo = <Foo isSomething={false} />;
```

#### [ ] `react/jsx-curly-brace-presence`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-curly-brace-presence.html
- What it does: Disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX expressions on literals in JSX children or attributes.
- Covers: Using different styles for your JSX code can make it harder to read and less consistent.

Flagged example:

```jsx
<App>Hello world</App>;
<App prop="Hello world">{"Hello world"}</App>;
```

Accepted example:

```jsx
<App>Hello world</App>;
<App prop="Hello world">{"Hello world"}</App>;
```

#### [ ] `react/jsx-fragments`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-fragments.html
- What it does: Enforces the shorthand or standard form for React Fragments.
- Covers: Makes code using fragments more consistent one way or the other.

Example signal: Covers jsx fragments concerns.

#### [ ] `react/jsx-handler-names`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.13.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-handler-names.html
- What it does: Ensures that any component or prop methods used to handle events are correctly prefixed.
- Covers: Inconsistent naming of event handlers and props can reduce code readability and maintainability.

Flagged example:

```jsx
<MyComponent handleChange={this.handleChange} />
<MyComponent onChange={this.componentChanged} />
```

Accepted example:

```jsx
<MyComponent onChange={this.handleChange} />
<MyComponent onChange={this.props.onFoo} />
```

#### [ ] `react/jsx-max-depth`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.36.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-max-depth.html
- What it does: Enforces a maximum depth for nested JSX elements and fragments.
- Covers: Excessively nested JSX makes components harder to read and maintain.

Flagged example:

```jsx
const Component = () => (
  <div>
    <div>
      <div>
        <span />
      </div>
    </div>
  </div>
);
```

Accepted example:

```jsx
const Component = () => (
  <div>
    <div>
      <span />
    </div>
  </div>
);
```

#### [ ] `react/jsx-pascal-case`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.19.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-pascal-case.html
- What it does: Enforce PascalCase for user-defined JSX components.
- Covers: It enforces coding style that user-defined JSX components are defined and referenced in PascalCase. Note that since React's JSX uses the upper vs. lower case convention to distinguish between local component classes and HTML tags this rule will not warn on components that start with a lower case letter.

Flagged example:

```jsx
<Test_component />
<TEST_COMPONENT />
```

Accepted example:

```jsx
<div />

<TestComponent />

<TestComponent>
    <div />
</TestComponent>

<CSSTransitionGroup />
```

#### [ ] `react/jsx-props-no-spreading`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spreading.html
- What it does: Disallow JSX prop spreading.
- Covers: Enforces that there is no spreading for any JSX attribute. This enhances readability of code by being more explicit about what props are received by the component. It is also good for maintainability by avoiding passing unintentional extra props and allowing react to emit warnings when invalid HTML props are passed to HTML elements.

Flagged example:

```jsx
<App {...props} />
<MyCustomComponent {...props} some_other_prop={some_other_prop} />
<img {...props} />
```

Accepted example:

```jsx
const {src, alt} = props;
const {one_prop, two_prop} = otherProps;
<MyCustomComponent one_prop={one_prop} two_prop={two_prop} />
<img src={src} alt={alt} />
```

#### [ ] `react/no-redundant-should-component-update`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-redundant-should-component-update.html
- What it does: Disallow usage of shouldComponentUpdate when extending React.PureComponent.
- Covers: React.PureComponent automatically implements shouldComponentUpdate with a shallow prop and state comparison. Defining shouldComponentUpdate in a class that extends React.PureComponent is redundant and defeats the purpose of using React.PureComponent. If you need custom comparison logic, extend React.Component instead.

Flagged example:

```jsx
class Foo extends React.PureComponent {
  shouldComponentUpdate() {
    // do check
  }

  render() {
    return <div>Radical!</div>;
  }
}

// ...
```

Accepted example:

```jsx
class Foo extends React.Component {
  shouldComponentUpdate() {
    // do check
  }

  render() {
    return <div>Radical!</div>;
  }
}

// ...
```

#### [ ] `react/no-set-state`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.5.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-set-state.html
- What it does: Disallow the usage of this.setState in React components.
- Covers: When using an architecture that separates your application state from your UI components (e.g. Flux), it may be desirable to forbid the use of local component state. This rule is especially helpful in read-only applications (that don't use forms), since local component state should rarely be necessary in such cases.

Flagged example:

```jsx
var Hello = createReactClass({
  getInitialState: function () {
    return {
      name: this.props.name,
    };
  },
  handleClick: function () {
    this.setState({
      name: this.props.name.toUpperCase(),
    });
// ...
```

Accepted example:

```jsx
var Hello = createReactClass({
  getInitialState: function () {
    return {
      name: this.props.name,
    };
  },
  handleClick: function () {
    this.setState({
      name: this.props.name.toUpperCase(),
    });
// ...
```

#### [ ] `react/prefer-es6-class`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.5.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-es6-class.html
- What it does: React offers you two ways to create traditional components: using the create-react-class package or the newer ES2015 class system.
- Covers: This rule enforces a consistent React class style.

Flagged example:

```jsx
var Hello = createReactClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
```

Accepted example:

```jsx
var Hello = createReactClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
```

#### [ ] `react/self-closing-comp`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.9.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/self-closing-comp.html
- What it does: Detects components without children which can be self-closed to avoid unnecessary extra closing tags.
- Covers: Components without children don't need explicit closing tags. Using self-closing syntax makes code more concise and reduces visual clutter. It also follows common React and JSX conventions for empty elements.

Flagged example:

```jsx
const elem = <Component linter="oxlint"></Component>;
const dom_elem = <div id="oxlint"></div>;
const welem = <div id="oxlint"></div>;
```

Accepted example:

```jsx
const elem = <Component linter="oxlint" />;
const welem = <Component linter="oxlint"> </Component>;
const dom_elem = <div id="oxlint" />;
```

#### [ ] `react/state-in-constructor`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.26.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/state-in-constructor.html
- What it does: Enforces the state initialization style to be either in a constructor or with a class property.
- Covers: Inconsistent state initialization styles can make the codebase harder to maintain and understand. This rule enforces a consistent pattern across React class components.

Flagged example:

```jsx
class Foo extends React.Component {
  state = { bar: 0 };
  render() {
    return <div>Foo</div>;
  }
}
```

Accepted example:

```jsx
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bar: 0 };
  }
  render() {
    return <div>Foo</div>;
  }
}
```

### suspicious

#### [ ] `react/iframe-missing-sandbox`

- Category: suspicious
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.10.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/iframe-missing-sandbox.html
- What it does: Enforce the sandbox attribute on iframe elements.
- Covers: The sandbox attribute enables an extra set of restrictions for the content in the iframe. Using sandbox attribute is considered a good security practice. To learn more about sandboxing, see MDN's documentation on the sandbox attribute.

Flagged example:

```jsx
<iframe />;
<iframe sandbox="invalid-value" />;
<iframe sandbox="allow-same-origin allow-scripts" />;
```

Accepted example:

```jsx
<iframe sandbox="" />;
<iframe sandbox="allow-origin" />;
```

#### [ ] `react/jsx-no-comment-textnodes`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-comment-textnodes.html
- What it does: This rule prevents comment strings (e.g. beginning with // or /*) from being accidentally injected as a text node in JSX statements.
- Covers: In JSX, any text node that is not wrapped in curly braces is considered a literal string to be rendered. This can lead to unexpected behavior when the text contains a comment.

Flagged example:

```jsx
const Hello = () => {
  return <div>// empty div</div>;
};

const Hello = () => {
  return <div>/* empty div */</div>;
};
```

Accepted example:

```jsx
const Hello = () => {
  return <div>{/* empty div */}</div>;
};
```

#### [ ] `react/jsx-no-script-url`

- Category: suspicious
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.13.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-script-url.html
- What it does: Disallow usage of javascript: URLs.
- Covers: URLs starting with javascript: are a dangerous attack surface because it's easy to accidentally include unsanitized output in a tag like <a href> and create a security hole.

Flagged example:

```jsx
<a href="javascript:void(0)">Test</a>
```

Accepted example:

```jsx
<Foo test="javascript:void(0)" />
```

#### [ ] `react/no-namespace`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.15.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-namespace.html
- What it does: Enforce that namespaces are not used in React elements.
- Covers: Namespaces in React elements, such as svg:circle, are not supported by React.

Flagged example:

```jsx
<ns:TestComponent />
<Ns:TestComponent />
```

Accepted example:

```jsx
<TestComponent />
<testComponent />
```

#### [ ] `react/no-unstable-nested-components`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.66.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-unstable-nested-components.html
- What it does: Disallows defining React components inside other components.
- Covers: React compares element types by reference during reconciliation. A component defined during render gets a new identity on every render, so React remounts the entire nested subtree and destroys its DOM nodes and state.

Flagged example:

```jsx
function Component() {
  function UnstableNestedComponent() {
    return <div />;
  }

  return <UnstableNestedComponent />;
}
```

Accepted example:

```jsx
function StableComponent() {
  return <div />;
}

function Component() {
  return <StableComponent />;
}
```

#### [ ] `react/react-in-jsx-scope`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.20
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/react-in-jsx-scope.html
- What it does: Enforces that React is imported and in-scope when using JSX syntax.
- Covers: When using JSX, <a /> expands to React.createElement("a"). Therefore the React variable must be in scope.

Flagged example:

```jsx
const a = <a />;
```

Accepted example:

```jsx
import React from "react";
const a = <a />;
```

#### [ ] `react/style-prop-object`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.11.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/style-prop-object.html
- What it does: Require that the value of the prop style be an object or a variable that is an object.
- Covers: The style prop expects an object mapping from style properties to values when using JSX.

Flagged example:

```jsx
<div style="color: 'red'" />
<div style={true} />
<Hello style={true} />
const styles = true;
<div style={styles} />

React.createElement("div", { style: "color: 'red'" });
React.createElement("div", { style: true });
React.createElement("Hello", { style: true });
const styles = true;
// ...
```

Accepted example:

```jsx
<div style={{ color: "red" }} />
<Hello style={{ color: "red" }} />
const styles = { color: "red" };
<div style={styles} />

React.createElement("div", { style: { color: 'red' }});
React.createElement("Hello", { style: { color: 'red' }});
const styles = { height: '100px' };
React.createElement("div", { style: styles });
```

### perf

#### [ ] `react/jsx-no-constructed-context-values`

- Category: perf
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.48.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-constructed-context-values.html
- What it does: Disallows JSX context provider values that cause needless re-renders.
- Covers: React Context and all its child nodes and Consumers are re-rendered whenever the value prop changes. Because each JavaScript object carries its own identity, things like object expressions ({foo: 'bar'}) or function expressions get a new identity on every render. This makes the context think it has gotten a new object and can cause needless re-renders and unintended consequences.

Flagged example:

```jsx
return <SomeContext.Provider value={{ foo: "bar" }}>...</SomeContext.Provider>;
```

Accepted example:

```jsx
const foo = useMemo(() => ({ foo: "bar" }), []);
return <SomeContext.Provider value={foo}>...</SomeContext.Provider>;
```

#### [ ] `react/no-array-index-key`

- Category: perf
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.13.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-array-index-key.html
- What it does: Warn if an element uses an Array index in its key.
- Covers: It's a bad idea to use the array index since it doesn't uniquely identify your elements. In cases where the array is sorted or an element is added to the beginning of the array, the index will be changed even though the element representing that index may be the same. This results in unnecessary renders.

Flagged example:

```jsx
things.map((thing, index) => <Hello key={index} />);
```

Accepted example:

```jsx
things.map((thing, index) => <Hello key={thing.id} />);
```

#### [ ] `react/no-object-type-as-default-prop`

- Category: perf
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.66.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/no-object-type-as-default-prop.html
- What it does: Disallows using object, array, function, class, regex, JSX, or new-constructed values as default values for destructured React component props.
- Covers: Default values of destructured parameters are evaluated on every render. When the default is an object literal, array literal, function expression, class expression, regular expression, new expression, or JSX element, a new reference is created on every render. Passing that fresh reference to child components or hook dependency arrays defeats memoization and causes unnecessary re-renders.

Flagged example:

```jsx
function Foo({ items = [] }) {
  return <List items={items} />;
}

const Bar = ({ config = {} }) => <div data-config={config} />;

function Baz({ onClick = () => {} }) {
  return <button onClick={onClick} />;
}
```

Accepted example:

```jsx
const DEFAULT_ITEMS = [];
function Foo({ items = DEFAULT_ITEMS }) {
  return <List items={items} />;
}

const Bar = ({ name = "world" }) => <div>{name}</div>;

function Baz({ onClick }) {
  return <button onClick={onClick} />;
}
```

### nursery

#### [ ] `react/react-compiler`

- Category: nursery
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.70.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/react-compiler.html
- What it does: Runs the React Compiler's analysis in lint-only mode and reports code that violates the Rules of React - for example calling hooks conditionally, calling setState during render, accessing refs during render, or mutating props and state.
- Covers: Code that breaks the Rules of React can behave unpredictably at runtime (stale UI, infinite re-render loops, lost state) and prevents React Compiler from optimizing the component. Following these rules keeps components correct and allows them to be automatically memoized.

Flagged example:

```jsx
function Component(props) {
  if (props.cond) {
    useState(0); // hooks may not be called conditionally
  }
  return <div>{props.text}</div>;
}
```

Accepted example:

```jsx
function Component(props) {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(state + 1)}>{props.text}</button>;
}
```

#### [ ] `react/require-render-return`

- Category: nursery
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react/require-render-return.html
- What it does: Require render methods in ES5 and ES2015 React components to return a value.
- Covers: When writing the render method in a component it is easy to forget to return the JSX content. This rule will warn if the return statement is missing.

Flagged example:

```jsx
var Hello = createReactClass({
  render() {
    <div>Hello</div>;
  },
});

class Hello extends React.Component {
  render() {
    <div>Hello</div>;
  }
// ...
```

Accepted example:

```jsx
var Hello = createReactClass({
  render() {
    return <div>Hello</div>;
  },
});

class Hello extends React.Component {
  render() {
    return <div>Hello</div>;
  }
// ...
```

## react_perf

### perf

#### [ ] `react_perf/jsx-no-jsx-as-prop`

- Category: perf
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-jsx-as-prop.html
- What it does: Prevent JSX elements that are local to the current method from being used as values of JSX props.
- Covers: Using locally defined JSX elements as values for props can lead to unintentional re-renders and performance issues. Every time the parent renders, a new instance of the JSX element is created, causing unnecessary re-renders of child components. This also leads to harder-to-maintain code as the component's props are not passed consistently.

Flagged example:

```jsx
<Item jsx={<SubItem />} />
<Item jsx={this.props.jsx || <SubItem />} />
<Item jsx={this.props.jsx ? this.props.jsx : <SubItem />} />
```

Accepted example:

```jsx
<Item callback={this.props.jsx} />
```

#### [ ] `react_perf/jsx-no-new-array-as-prop`

- Category: perf
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-array-as-prop.html
- What it does: Prevent arrays that are local to the current method from being used as values of JSX props.
- Covers: Using locally defined arrays as values for props can lead to unintentional re-renders and performance issues. Every time the parent component renders, a new instance of the Array is created, causing unnecessary re-renders of child components. This also leads to harder-to-maintain code as the component's props are not passed consistently.

Flagged example:

```jsx
<Item list={[]} />
<Item list={new Array()} />
<Item list={Array()} />
<Item list={this.props.list || []} />
<Item list={this.props.list ? this.props.list : []} />
```

Accepted example:

```jsx
<Item list={this.props.list} />
```

#### [ ] `react_perf/jsx-no-new-function-as-prop`

- Category: perf
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-function-as-prop.html
- What it does: Prevent functions that are local to the current method from being used as values of JSX props.
- Covers: Using locally defined functions as values for props can lead to unintentional re-renders and performance issues. Every time the parent component renders, a new instance of the function is created, causing unnecessary re-renders of child components. This also leads to harder-to-maintain code as the component's props are not passed consistently.

Flagged example:

```jsx
<Item callback={new Function(...)} />
<Item callback={this.props.callback || function() {}} />
```

Accepted example:

```jsx
<Item callback={this.props.callback} />
```

#### [ ] `react_perf/jsx-no-new-object-as-prop`

- Category: perf
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-object-as-prop.html
- What it does: Prevent objects that are local to the current method from being used as values of JSX props.
- Covers: Using locally defined objects as values for props can lead to unintentional re-renders and performance issues. Every time the parent component renders, a new instance of the Object is created, causing unnecessary re-renders of child components. This also leads to harder-to-maintain code as the component's props are not passed consistently.

Flagged example:

```jsx
<Item config={{}} />
<Item config={new Object()} />
<Item config={Object()} />
<Item config={this.props.config || {}} />
<Item config={this.props.config ? this.props.config : {}} />
<div style={{display: 'none'}} />
```

Accepted example:

```jsx
<Item config={staticConfig} />
```

## typescript

### style

#### [ ] `typescript/adjacent-overload-signatures`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/adjacent-overload-signatures.html
- What it does: Require that function overload signatures be consecutive.
- Covers: Function overload signatures represent multiple ways a function can be called, potentially with different return types. It's typical for an interface or type alias describing a function to place all overload signatures next to each other. If Signatures placed elsewhere in the type are easier to be missed by future developers reading the code.

Flagged example:

```typescript
declare namespace Foo {
  export function foo(s: string): void;
  export function foo(n: number): void;
  export function bar(): void;
  export function foo(sn: string | number): void;
}

type Foo = {
  foo(s: string): void;
  foo(n: number): void;
// ...
```

Accepted example:

```typescript
declare namespace Foo {
  export function foo(s: string): void;
  export function foo(n: number): void;
  export function bar(): void;
  export function foo(sn: string | number): void;
}

type Foo = {
  foo(s: string): void;
  foo(n: number): void;
// ...
```

#### [ ] `typescript/array-type`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/array-type.html
- What it does: Require consistently using either T[] or Array<T> for arrays.
- Covers: Using the Array type directly is not idiomatic. Instead, use the array type T[] or Array<T>.

Flagged example:

```typescript
const arr: Array<number> = new Array<number>();
const readonlyArr: ReadonlyArray<number> = [1, 2, 3];
```

Accepted example:

```typescript
const arr: number[] = new Array<number>();
const readonlyArr: readonly number[] = [1, 2, 3];
```

#### [ ] `typescript/ban-tslint-comment`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-tslint-comment.html
- What it does: This rule disallows tslint:<rule-flag> comments.
- Covers: Useful when migrating from TSLint to ESLint. Once TSLint has been removed, this rule helps locate TSLint annotations

Flagged example:

```ts
// tslint:disable-next-line
someCode();
```

Accepted example:

```ts
someCode();
```

#### [ ] `typescript/class-literal-property-style`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.47.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/class-literal-property-style.html
- What it does: Enforces a consistent style for exposing literal values on classes.
- Covers: Mixing readonly fields and trivial literal getters for the same kind of value makes class APIs inconsistent and harder to scan.

Flagged example:

```ts
class C {
  get name() {
    return "oxc";
  }
}
```

Accepted example:

```ts
class C {
  readonly name = "oxc";
}
```

#### [ ] `typescript/consistent-generic-constructors`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.14.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-generic-constructors.html
- What it does: When constructing a generic class, you can specify the type arguments on either the left-hand side (as a type annotation) or the right-hand side (as part of the constructor call).
- Covers: Inconsistent usage of generic constructors can make the code harder to read and maintain.

Flagged example:

```ts
const a: Foo<string> = new Foo();
const a = new Foo<string>(); // prefer type annotation
```

Accepted example:

```ts
const a = new Foo<string>();
const a: Foo<string> = new Foo(); // prefer type annotation
```

#### [ ] `typescript/consistent-indexed-object-style`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-indexed-object-style.html
- What it does: Choose between requiring either Record type or indexed signature types.
- Covers: Inconsistent style for indexed object types can harm readability in a project.

Flagged example:

```ts
interface Foo {
  [key: string]: unknown;
}
type Foo = {
  [key: string]: unknown;
};
```

Accepted example:

```ts
type Foo = Record<string, unknown>;
```

#### [ ] `typescript/consistent-type-assertions`

- Category: style
- Default: no
- Fix: conditional fix or suggestion
- Type-aware: no
- Added: 1.44.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-assertions.html
- What it does: Enforce consistent usage of TypeScript type assertions.
- Covers: Mixing assertion styles (as vs angle-bracket) makes code harder to read and maintain. In some codebases, type assertions are banned in favor of safer alternatives like type annotations or satisfies.

Flagged example:

```ts
const value = <Foo>bar;
```

Accepted example:

```ts
const value = bar as Foo;
```

#### [ ] `typescript/consistent-type-definitions`

- Category: style
- Default: no
- Fix: conditional dangerous auto-fix
- Type-aware: no
- Added: 0.2.17
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-definitions.html
- What it does: Enforce type definitions to consistently use either interface or type.
- Covers: TypeScript provides two common ways to define an object type: interface and type. The two are generally very similar, and can often be used interchangeably. Using the same type declaration style consistently helps with code readability.

Flagged example:

```typescript
type T = { x: number };
```

Accepted example:

```typescript
type T = string;
type Foo = string | {};

interface T {
  x: number;
}
```

#### [ ] `typescript/consistent-type-exports`

- Category: style
- Default: no
- Fix: none
- Type-aware: yes
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-exports.html
- What it does: Enforce using export type for exports that are only used as types.
- Covers: Mixing type-only exports with value exports without export type makes module intent harder to read and can cause unnecessary runtime export surface.

Flagged example:

```ts
type Foo = { bar: string };
export { Foo };

export { TypeOnly, value } from "./mod";
```

Accepted example:

```ts
type Foo = { bar: string };
export type { Foo };

export type { TypeOnly } from "./mod";
export { value } from "./mod";
```

#### [ ] `typescript/consistent-type-imports`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.5.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-imports.html
- What it does: Enforce consistent usage of type imports.
- Covers: Inconsistent usage of type imports can make the code harder to read and understand.

Flagged example:

```ts
import { Foo } from "Foo";
type T = Foo;

type S = import("Foo");
```

Accepted example:

```ts
import type { Foo } from "Foo";
```

#### [ ] `typescript/dot-notation`

- Category: style
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/dot-notation.html
- What it does: Enforce dot notation whenever property access can be written safely as obj.prop.
- Covers: Dot notation is generally more readable and concise than bracket notation for static property names.

Flagged example:

```ts
obj["name"];
foo["bar"];
```

Accepted example:

```ts
obj.name;
foo.bar;

obj[key];
obj["not-an-identifier"];
```

#### [ ] `typescript/method-signature-style`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.68.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/method-signature-style.html
- What it does: Enforce using a particular method signature syntax.
- Covers: TypeScript provides two ways to define an object/interface function property:

Flagged example:

```ts
interface T1 {
  func(arg: string): number;
}
type T2 = {
  func(arg: boolean): void;
};
interface T3 {
  func(arg: number): void;
  func(arg: string): void;
  func(arg: boolean): void;
// ...
```

Accepted example:

```ts
interface T1 {
  func: (arg: string) => number;
}
type T2 = {
  func: (arg: boolean) => void;
};
// this is equivalent to the overload
interface T3 {
  func: ((arg: number) => void) & ((arg: string) => void) & ((arg: boolean) => void);
}
```

#### [ ] `typescript/no-empty-interface`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.6
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-empty-interface.html
- What it does: Disallow the declaration of empty interfaces.
- Covers: An empty interface in TypeScript does very little: any non-nullable value is assignable to {}. Using an empty interface is often a sign of programmer error, such as misunderstanding the concept of {} or forgetting to fill in fields. This rule aims to ensure that only meaningful interfaces are declared in the code.

Flagged example:

```ts
interface Foo {}
interface Bar extends Foo {}
```

Accepted example:

```ts
interface Foo {
  member: string;
}
interface Bar extends Foo {
  member: string;
}
```

#### [ ] `typescript/no-inferrable-types`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.14.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-inferrable-types.html
- What it does: Disallow explicit type declarations for variables or parameters initialized to a number, string, or boolean.
- Covers: Explicitly typing variables or parameters that are initialized to a literal value is unnecessary because TypeScript can infer the type from the value.

Flagged example:

```ts
const a: number = 5;
const b: string = "foo";
const c: boolean = true;
const fn = (a: number = 5, b: boolean = true, c: string = "foo") => {};
```

Accepted example:

```ts
const a = 5;
const b = "foo";
const c = true;
const fn = (a = 5, b = true, c = "foo") => {};
```

#### [ ] `typescript/no-unnecessary-qualifier`

- Category: style
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-qualifier.html
- What it does: Disallow namespace qualifiers when the referenced name is already in scope.
- Covers: Redundant qualifiers add noise and make type references harder to read.

Flagged example:

```ts
namespace A {
  export type B = number;
  const value: A.B = 1;
}
```

Accepted example:

```ts
namespace A {
  export type B = number;
  const value: B = 1;
}
```

#### [ ] `typescript/parameter-properties`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.48.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/parameter-properties.html
- What it does: Requires or disallows parameter properties in class constructors.
- Covers: Mixing parameter properties and class property declarations can make class style inconsistent and harder to maintain.

Flagged example:

```ts
class Foo {
  constructor(private name: string) {}
}
```

Accepted example:

```ts
class Foo {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

#### [ ] `typescript/prefer-find`

- Category: style
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-find.html
- What it does: Prefer .find(...) over .filter(...)[0] for retrieving a single element.
- Covers: .filter(...)[0] builds an intermediate array and is less clear about intent. .find(...) directly expresses that only the first matching element is needed.

Flagged example:

```ts
const first = list.filter((item) => item.active)[0];
```

Accepted example:

```ts
const first = list.find((item) => item.active);
```

#### [ ] `typescript/prefer-for-of`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.2.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-for-of.html
- What it does: Enforces the use of a for...of loop instead of a for loop with simple iteration.
- Covers: Using a for loop with a simple iteration over an array can be replaced with a more concise and readable for...of loop. for...of loops are easier to read and less error-prone, as they eliminate the need for an index variable and manual array access.

Flagged example:

```typescript
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

Accepted example:

```typescript
for (const item of arr) {
  console.log(item);
}
```

#### [ ] `typescript/prefer-function-type`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.2.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-function-type.html
- What it does: Enforce using function types instead of interfaces with call signatures.
- Covers: TypeScript allows for two common ways to declare a type for a function:

Flagged example:

```typescript
interface Example {
  (): string;
}

function foo(example: { (): number }): number {
  return example();
}

interface ReturnsSelf {
  (arg: string): this;
// ...
```

Accepted example:

```typescript
type Example = () => string;

function foo(example: () => number): number {
  return example();
}

// Returns the function itself, not the `this` argument
type ReturnsSelf = (arg: string) => ReturnsSelf;

// Multiple properties are allowed
// ...
```

#### [ ] `typescript/prefer-readonly`

- Category: style
- Default: no
- Fix: none
- Type-aware: yes
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-readonly.html
- What it does: Require class members that are never reassigned to be marked readonly.
- Covers: Members that never change should be declared readonly to make class invariants explicit and prevent accidental mutation.

Flagged example:

```ts
class Counter {
  private value = 0;

  getValue() {
    return this.value;
  }
}
```

Accepted example:

```ts
class Counter {
  private readonly value = 0;

  getValue() {
    return this.value;
  }
}
```

#### [ ] `typescript/prefer-reduce-type-parameter`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-reduce-type-parameter.html
- What it does: This rule prefers using a type parameter for the accumulator in Array#reduce() instead of casting.
- Covers: Array#reduce() can be called with a generic type parameter to specify the type of the accumulator. This is preferred over casting the result because it provides better type safety and is more explicit about the intended type.

Flagged example:

```ts
const numbers = [1, 2, 3];

// Casting the result
const sum = numbers.reduce((acc, val) => acc + val, 0) as number;

// Using type assertion on accumulator
const result = [1, 2, 3].reduce((acc: string[], curr) => {
  acc.push(curr.toString());
  return acc;
}, [] as string[]);
```

Accepted example:

```ts
const numbers = [1, 2, 3];

// Using type parameter
const sum = numbers.reduce<number>((acc, val) => acc + val, 0);

// Type parameter for complex types
const result = [1, 2, 3].reduce<string[]>((acc, curr) => {
  acc.push(curr.toString());
  return acc;
}, []);
// ...
```

#### [ ] `typescript/prefer-regexp-exec`

- Category: style
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-regexp-exec.html
- What it does: Prefer RegExp#exec() over String#match() when extracting a regex match.
- Covers: exec() is more explicit about matching with a regular expression and avoids the overloaded behavior of String#match().

Flagged example:

```ts
const text = "value";
text.match(/v/);
```

Accepted example:

```ts
const text = "value";
/v/.exec(text);
```

#### [ ] `typescript/prefer-return-this-type`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-return-this-type.html
- What it does: This rule enforces using this types for return types when possible.
- Covers: Classes that have methods which return the instance itself should use this as the return type instead of the class name. This provides better type safety for inheritance, as the return type will be the actual subclass type rather than the base class type.

Flagged example:

```ts
class Builder {
  private value: string = "";

  setValue(value: string): Builder {
    // Should return 'this'
    this.value = value;
    return this;
  }

  build(): string {
// ...
```

Accepted example:

```ts
class Builder {
  private value: string = "";

  setValue(value: string): this {
    this.value = value;
    return this;
  }

  build(): string {
    return this.value;
// ...
```

#### [ ] `typescript/prefer-string-starts-ends-with`

- Category: style
- Default: yes
- Fix: none
- Type-aware: yes
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-string-starts-ends-with.html
- What it does: Prefer startsWith and endsWith over manual string boundary checks.
- Covers: Boundary checks written with slice, indexOf, regex anchors, or manual indexing are harder to read and maintain than startsWith/endsWith.

Flagged example:

```ts
value.slice(0, 3) === "foo";
value.slice(-3) === "bar";
```

Accepted example:

```ts
value.startsWith("foo");
value.endsWith("bar");
```

#### [ ] `typescript/unified-signatures`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.48.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/unified-signatures.html
- What it does: Disallow overload signatures that can be unified into one.
- Covers: Duplicate overload signatures that only differ by a single type, or by an optional/rest parameter, are harder to maintain and read than a single unified signature.

Flagged example:

```ts
function f(a: number): void;
function f(a: string): void;
```

Accepted example:

```ts
function f(a: number | string): void;
```

### correctness

#### [ ] `typescript/await-thenable`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/await-thenable.html
- What it does: This rule disallows awaiting a value that is not a Thenable.
- Covers: While it is valid JavaScript to await a non-Promise-like value (it will resolve immediately), this practice can be confusing for readers who are not aware of this behavior. It can also be a sign of a programmer error, such as forgetting to add parentheses to call a function that returns a Promise.

Flagged example:

```javascript
await 12;
await (() => {});

// non-Promise values
await Math.random;
await { then() {} };

// this is not a Promise - it's a function that returns a Promise
declare const getPromise: () => Promise<string>;
await getPromise;
```

Accepted example:

```javascript
await Promise.resolve('value');
await Promise.reject(new Error());

// Promise-like values
await {
  then(onfulfilled, onrejected) {
    onfulfilled('value');
  },
};

// ...
```

#### [ ] `typescript/no-array-delete`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-array-delete.html
- What it does: This rule disallows using the delete operator on array values.
- Covers: When using the delete operator on an array, the element is not actually removed, but instead the array slot is turned into undefined. This is usually not the intended behavior. Instead, you should use methods like Array.prototype.splice() to properly remove elements from an array.

Flagged example:

```ts
declare const arr: number[];
delete arr[0];
```

Accepted example:

```ts
declare const arr: number[];
arr.splice(0, 1);

// or with a filter
const filteredArr = arr.filter((_, index) => index !== 0);

// delete on object is allowed
declare const obj: { a?: number };
delete obj.a;
```

#### [ ] `typescript/no-base-to-string`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-base-to-string.html
- What it does: This rule requires toString() and toLocaleString() calls to only be called on objects which provide useful information when stringified.
- Covers: JavaScript's toString() method returns '\[object Object]' on plain objects, which is not useful information. This rule prevents toString() and toLocaleString() from being called on objects that return less useful strings.

Flagged example:

```ts
// These will evaluate to '[object Object]'
({}).toString();
({ foo: "bar" }).toString();
({ foo: "bar" }).toLocaleString();

// This will evaluate to 'Symbol()'
Symbol("foo").toString();
```

Accepted example:

```ts
const someString = "Hello world";
someString.toString();

const someNumber = 42;
someNumber.toString();

const someBoolean = true;
someBoolean.toString();

class CustomToString {
// ...
```

#### [ ] `typescript/no-duplicate-enum-values`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-duplicate-enum-values.html
- What it does: Disallow duplicate enum member values.
- Covers: Although TypeScript supports duplicate enum member values, people usually expect members to have unique values within the same enum. Duplicate values can lead to bugs that are hard to track down.

Flagged example:

```ts
enum E {
  A = 0,
  B = 0,
}
```

Accepted example:

```ts
enum E {
  A = 0,
  B = 1,
}
```

#### [ ] `typescript/no-duplicate-type-constituents`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-duplicate-type-constituents.html
- What it does: This rule disallows duplicate constituents of union or intersection types.
- Covers: Duplicate constituents in union and intersection types serve no purpose and can make code harder to read. They are likely a mistake.

Flagged example:

```ts
type T1 = "A" | "A";

type T2 = A | A | B;

type T3 = { a: string } & { a: string };

type T4 = [A, A];

type T5 = "foo" | "bar" | "foo";
```

Accepted example:

```ts
type T1 = "A" | "B";

type T2 = A | B | C;

type T3 = { a: string } & { b: string };

type T4 = [A, B];

type T5 = "foo" | "bar" | "baz";
```

#### [ ] `typescript/no-extra-non-null-assertion`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.6
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-extra-non-null-assertion.html
- What it does: Disallow extra non-null assertions.
- Covers: The ! non-null assertion operator in TypeScript is used to assert that a value's type does not include null or undefined. Using the operator any more than once on a single value does nothing.

Flagged example:

```ts
const foo: { bar: number } | null = null;
const bar = foo!!!.bar;
```

Accepted example:

```ts
const foo: { bar: number } | null = null;
const bar = foo!.bar;
```

#### [ ] `typescript/no-floating-promises`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: yes
- Added: 1.11.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-floating-promises.html
- What it does: This rule disallows "floating" Promises in TypeScript code, which is a Promise that is created without any code to handle its resolution or rejection.
- Covers: Floating Promises can cause several issues, such as improperly sequenced operations, ignored Promise rejections, and more.

Flagged example:

```ts
const promise = new Promise((resolve, reject) => resolve("value"));
promise;

async function returnsPromise() {
  return "value";
}
returnsPromise().then(() => {});

Promise.reject("value").catch();

// ...
```

Accepted example:

```ts
const promise = new Promise((resolve, reject) => resolve("value"));
await promise;

async function returnsPromise() {
  return "value";
}

void returnsPromise();

returnsPromise().then(
// ...
```

#### [ ] `typescript/no-for-in-array`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-for-in-array.html
- What it does: This rule disallows iterating over an array with a for-in loop.
- Covers: A for-in loop iterates over the enumerable properties of an object, which includes the array indices, but also includes any enumerable properties added to the array prototype or the array instance. This is almost never what you want when iterating over an array.

Flagged example:

```ts
const arr = [1, 2, 3];

for (const i in arr) {
  console.log(arr[i]);
}

for (const i in arr) {
  console.log(i, arr[i]);
}
```

Accepted example:

```ts
const arr = [1, 2, 3];

// Use for-of to iterate over array values
for (const value of arr) {
  console.log(value);
}

// Use regular for loop with index
for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]);
// ...
```

#### [ ] `typescript/no-implied-eval`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-implied-eval.html
- What it does: This rule disallows the use of eval-like methods.
- Covers: It's considered a good practice to avoid using eval() in JavaScript. There are security and performance implications involved with doing so, which is why many linters recommend disallowing eval(). However, there are some other ways to pass a string and have it interpreted as JavaScript code that have similar concerns.

Flagged example:

```ts
setTimeout('alert("Hi!");', 100);

setInterval('alert("Hi!");', 100);

setImmediate('alert("Hi!")');

window.setTimeout("count = 5", 10);

window.setInterval("foo = bar", 10);

// ...
```

Accepted example:

```ts
setTimeout(() => {
  alert("Hi!");
}, 100);

setInterval(() => {
  alert("Hi!");
}, 100);

setImmediate(() => {
  alert("Hi!");
// ...
```

#### [ ] `typescript/no-meaningless-void-operator`

- Category: correctness
- Default: yes
- Fix: fixable_safe_fix_or_suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-meaningless-void-operator.html
- What it does: This rule disallows the void operator when its argument is already of type void or undefined.
- Covers: The void operator is useful when you want to execute an expression and force it to evaluate to undefined. However, using void on expressions that are already of type void or undefined is meaningless and adds unnecessary complexity to the code.

Flagged example:

```ts
function foo(): void {
  return;
}

void foo(); // meaningless, foo() already returns void

void undefined; // meaningless, undefined is already undefined

async function bar() {
  void (await somePromise); // meaningless if somePromise resolves to void
// ...
```

Accepted example:

```ts
function getValue(): number {
  return 42;
}

void getValue(); // meaningful, converts number to void

void console.log("hello"); // meaningful, console.log returns undefined but we want to be explicit

function processData() {
  // some processing
// ...
```

#### [ ] `typescript/no-misused-new`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-new.html
- What it does: Enforces valid definitions of new and constructor. This rule prevents classes from defining a method named new, interfaces from defining a method named constructor, and interfaces from defining a construct signature that returns the interface itself.
- Covers: JavaScript classes may define a constructor method that runs when a class instance is newly created.

Flagged example:

```typescript
declare class C {
  new(): C;
}
```

Accepted example:

```typescript
declare class C {
  constructor();
}
```

#### [ ] `typescript/no-misused-spread`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-spread.html
- What it does: This rule disallows spreading syntax in places where it doesn't make sense or could cause runtime errors.
- Covers: The spread operator can be misused in ways that might not be immediately obvious but can cause runtime errors or unexpected behavior. This rule helps catch common misuses.

Flagged example:

```ts
// Spreading a non-iterable value in an array
const num = 42;
const arr = [...num]; // Runtime error: num is not iterable

// Spreading a Promise in an array
const promise = Promise.resolve([1, 2, 3]);
const arr2 = [...promise]; // Runtime error: Promise is not iterable

// Spreading non-object in object literal
const str = "hello";
// ...
```

Accepted example:

```ts
// Spreading arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

// Spreading objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };

// Spreading resolved Promise
const promise = Promise.resolve([1, 2, 3]);
// ...
```

#### [ ] `typescript/no-non-null-asserted-optional-chain`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: no
- Added: 0.0.6
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-asserted-optional-chain.html
- What it does: Disallow non-null assertions after an optional chain expression.
- Covers: By design, optional chain expressions (?.) provide undefined as the expression's value, if the object being accessed is null or undefined, instead of throwing an error. Using a non-null assertion (!) to assert the result of an optional chain expression is contradictory and likely wrong, as it indicates the code is both expecting the value to be potentially null or undefined and non-null at the same time.

Flagged example:

```ts
foo?.bar!;
foo?.bar()!;
```

Accepted example:

```ts
foo?.bar;
foo.bar!;
```

#### [ ] `typescript/no-redundant-type-constituents`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-redundant-type-constituents.html
- What it does: This rule disallows type constituents of unions and intersections that are redundant.
- Covers: Some constituents of union and intersection types can be redundant due to TypeScript's type system rules. These redundant constituents don't add any value and can make types harder to read and understand.

Flagged example:

```ts
// unknown is redundant in unions
type T1 = string | unknown;

// any is redundant in unions
type T2 = string | any;

// never is redundant in unions
type T3 = string | never;

// Literal types that are wider than other types
// ...
```

Accepted example:

```ts
type T1 = string | number;

type T2 = "hello" | "world";

type T3 = { a: string } | { b: number };

// unknown in intersections is meaningful
type T4 = string & unknown;

// never in intersections is meaningful
// ...
```

#### [ ] `typescript/no-this-alias`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-this-alias.html
- What it does: Disallow aliasing of this.
- Covers: Assigning a variable to this instead of properly using arrow lambdas may be a symptom of pre-ES2015 practices or not managing scope well.

Flagged example:

```js
const self = this;

setTimeout(function () {
  self.doWork();
});
```

Accepted example:

```js
setTimeout(() => {
  this.doWork();
});
```

#### [ ] `typescript/no-unnecessary-parameter-property-assignment`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: no
- Added: 0.15.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-parameter-property-assignment.html
- What it does: Prevents unnecessary assignment of parameter properties.
- Covers: Constructor parameters marked with one of the visibility modifiers public, private, protected, or readonly are automatically initialized. Providing an explicit assignment is unnecessary and can be removed.

Flagged example:

```js
class Foo {
  constructor(public name: unknown) {
    this.name = name;
  }
}
```

Accepted example:

```js
class Foo {
  constructor(public name: unknown) {}
}
```

#### [ ] `typescript/no-unsafe-declaration-merging`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-declaration-merging.html
- What it does: Disallow unsafe declaration merging.
- Covers: Declaration merging between classes and interfaces is unsafe. The TypeScript compiler doesn't check whether properties are initialized, which can lead to TypeScript not detecting code that will cause runtime errors.

Flagged example:

```ts
interface Foo {}
class Foo {}
```

Accepted example:

```ts
interface Foo {}
class Bar {}
```

#### [ ] `typescript/no-unsafe-unary-minus`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-unary-minus.html
- What it does: This rule disallows using the unary minus operator on a value which is not of type 'number' | 'bigint'.
- Covers: The unary minus operator should only be used on numeric values. Using it on other types can lead to unexpected behavior due to JavaScript's type coercion rules.

Flagged example:

```ts
declare const value: any;
const result1 = -value; // unsafe on any

declare const str: string;
const result2 = -str; // unsafe on string

declare const bool: boolean;
const result3 = -bool; // unsafe on boolean

declare const obj: object;
// ...
```

Accepted example:

```ts
declare const num: number;
const result1 = -num; // safe

declare const bigint: bigint;
const result2 = -bigint; // safe

const literal = -42; // safe

const bigintLiteral = -42n; // safe

// ...
```

#### [ ] `typescript/no-useless-default-assignment`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: yes
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-useless-default-assignment.html
- What it does: Disallow default assignments that can never be used.
- Covers: A default assignment is redundant when the value can never be undefined. This adds runtime logic and noise without changing behavior.

Flagged example:

```ts
[1, 2, 3].map((a = 0) => a + 1);
```

Accepted example:

```ts
[1, 2, 3].map((a) => a + 1);
```

#### [ ] `typescript/no-useless-empty-export`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: no
- Added: 0.4.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-useless-empty-export.html
- What it does: Disallow empty exports that don't change anything in a module file.
- Covers: An empty export {} statement is sometimes useful in TypeScript code to turn a file that would otherwise be a script file into a module file. Per the TypeScript Handbook Modules page:

Flagged example:

```ts
export const value = "Hello, world!";
export {};
```

Accepted example:

```ts
export const value = "Hello, world!";
```

#### [ ] `typescript/no-wrapper-object-types`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: no
- Added: 0.8.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-wrapper-object-types.html
- What it does: Disallow the use of wrapper object types.
- Covers: Wrapper object types are types that are defined in the global scope and are not primitive types. These types are not recommended to be used in TypeScript code.

Flagged example:

```ts
let myBigInt: BigInt;
let myBoolean: Boolean;
let myNumber: Number;
let myString: String;
let mySymbol: Symbol;

let myObject: Object = "allowed by TypeScript";
```

Accepted example:

```ts
let myBigint: bigint;
let myBoolean: boolean;
let myNumber: number;
let myString: string;
let mySymbol: symbol;

let myObject: object = "Type 'string' is not assignable to type 'object'.";
```

#### [ ] `typescript/prefer-as-const`

- Category: correctness
- Default: yes
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-as-const.html
- What it does: Enforce the use of as const over literal types.
- Covers: There are two common ways to tell TypeScript that a literal value should be interpreted as its literal type (e.g. 2) rather than general primitive type (e.g. number);

Flagged example:

```ts
let bar: 2 = 2;
let foo = { bar: "baz" as "baz" };
```

Accepted example:

```ts
let foo = "bar";
let foo = "bar" as const;
let foo: "bar" = "bar" as const;
let bar = "bar" as string;
let foo = { bar: "baz" };
```

#### [ ] `typescript/prefer-namespace-keyword`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: no
- Added: 0.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-namespace-keyword.html
- What it does: This rule reports when the module keyword is used instead of namespace. This rule does not report on the use of TypeScript module declarations to describe external APIs (declare module 'foo' {}).
- Covers: Namespaces are an outdated way to organize TypeScript code. ES2015 module syntax is now preferred (import/export). For projects still using custom modules / namespaces, it's preferred to refer to them as namespaces.

Flagged example:

```typescript
module Example {}
```

Accepted example:

```typescript
namespace Example {}
```

#### [ ] `typescript/require-array-sort-compare`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/require-array-sort-compare.html
- What it does: This rule requires Array#sort() to be called with a comparison function.
- Covers: When Array#sort() is called without a comparison function, it converts elements to strings and sorts them lexicographically. This often leads to unexpected results, especially with numbers where [1, 10, 2].sort() returns [1, 10, 2] instead of [1, 2, 10].

Flagged example:

```ts
const numbers = [3, 1, 4, 1, 5];
numbers.sort(); // Lexicographic sort, not numeric

const mixedArray = ["10", "2", "1"];
mixedArray.sort(); // Might be intended, but explicit compareFn is clearer

[3, 1, 4].sort(); // Will sort as strings: ['1', '3', '4']
```

Accepted example:

```ts
const numbers = [3, 1, 4, 1, 5];

// Numeric sort
numbers.sort((a, b) => a - b);

// Reverse numeric sort
numbers.sort((a, b) => b - a);

// String sort (explicit)
const strings = ["banana", "apple", "cherry"];
// ...
```

#### [ ] `typescript/restrict-template-expressions`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/restrict-template-expressions.html
- What it does: This rule restricts the types allowed in template literal expressions.
- Covers: Template literals will call toString() on the interpolated values. Some types don't have meaningful string representations (like objects that become "[object Object]") or may not have a toString method at all. This rule helps ensure that only appropriate types are used in template expressions.

Flagged example:

```ts
declare const obj: object;
declare const sym: symbol;
declare const fn: () => void;
declare const arr: unknown[];

// Objects become "[object Object]"
const str1 = `Value: ${obj}`;

// Symbols might not be what you expect
const str2 = `Symbol: ${sym}`;
// ...
```

Accepted example:

```ts
declare const str: string;
declare const num: number;
declare const bool: boolean;
declare const obj: object;

// Safe types
const result1 = `String: ${str}`;
const result2 = `Number: ${num}`;
const result3 = `Boolean: ${bool}`;

// ...
```

#### [ ] `typescript/triple-slash-reference`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/triple-slash-reference.html
- What it does: Disallow certain triple slash directives in favor of ES module import declarations.
- Covers: Use of triple-slash reference type directives is generally discouraged in favor of ECMAScript Module imports.

Flagged example:

```ts
/// <reference lib="code" />
globalThis.value;
```

Accepted example:

```ts
/// <reference lib="code" />
globalThis.value;
```

#### [ ] `typescript/unbound-method`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/unbound-method.html
- What it does: This rule enforces that unbound methods are called with their expected scope.
- Covers: When you extract a method from an object and call it separately, the this context is lost. This can lead to runtime errors or unexpected behavior, especially with methods that rely on this to access instance properties or other methods.

Flagged example:

```ts
class MyClass {
  private value = 42;

  getValue() {
    return this.value;
  }

  processValue() {
    return this.value * 2;
  }
// ...
```

Accepted example:

```ts
class MyClass {
  private value = 42;

  getValue() {
    return this.value;
  }

  processValue() {
    return this.value * 2;
  }
// ...
```

### pedantic

#### [ ] `typescript/ban-ts-comment`

- Category: pedantic
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-ts-comment.html
- What it does: This rule lets you set which directive comments you want to allow in your codebase.
- Covers: Using TypeScript directives to suppress TypeScript compiler errors reduces the effectiveness of TypeScript overall.

Flagged example:

```ts
if (false) {
  // @ts-ignore: Unreachable code error
  console.log("hello");
}
```

Accepted example:

```ts
if (false) {
  // @ts-ignore: Unreachable code error
  console.log("hello");
}
```

#### [ ] `typescript/ban-types`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-types.html
- What it does: This rule bans specific types and can suggest alternatives. Note that it does not ban the corresponding runtime objects from being used.
- Covers: Some built-in types have aliases, while some types are considered dangerous or harmful. It's often a good idea to ban certain types to help with consistency and safety.

Flagged example:

```typescript
let foo: String = "foo";

let bar: Boolean = true;
```

Accepted example:

```typescript
let foo: string = "foo";

let bar: boolean = true;
```

#### [ ] `typescript/no-confusing-void-expression`

- Category: pedantic
- Default: no
- Fix: fixable_safe_fix_or_suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-confusing-void-expression.html
- What it does: This rule forbids using void expressions in confusing locations such as arrow function returns.
- Covers: The void operator is useful when you want to execute an expression while evaluating to undefined. However, it can be confusing when used in places where the return value is meaningful, particularly in arrow functions and conditional expressions.

Flagged example:

```ts
// arrow function returning void expression
const foo = () => void bar();

// conditional expression
const result = condition ? void foo() : bar();

// void in conditional
if (void foo()) {
  // ...
}
```

Accepted example:

```ts
// proper use of void
void foo();

// explicit return statement
const foo = () => {
  bar();
  return;
};

// statement expression
// ...
```

#### [ ] `typescript/no-deprecated`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.26.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-deprecated.html
- What it does: Disallow using code marked as @deprecated.
- Covers: The JSDoc @deprecated tag can be used to document some piece of code being deprecated. It's best to avoid using code marked as deprecated. This rule reports on any references to code marked as @deprecated.

Flagged example:

```ts
/** @deprecated Use apiV2 instead. */
declare function apiV1(): Promise<string>;
declare function apiV2(): Promise<string>;

await apiV1(); // Using deprecated function

import { parse } from "node:url";
// 'parse' is deprecated. Use the WHATWG URL API instead.
const url = parse("/foo");
```

Accepted example:

```ts
/** @deprecated Use apiV2 instead. */
declare function apiV1(): Promise<string>;
declare function apiV2(): Promise<string>;

await apiV2(); // Using non-deprecated function

// Modern Node.js API, uses `new URL()`
const url2 = new URL("/foo", "http://www.example.com");
```

#### [ ] `typescript/no-misused-promises`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.11.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-promises.html
- What it does: This rule forbids providing Promises to logical locations such as if statements in places where the TypeScript compiler allows them but they are not handled properly. These situations can often arise due to a missing await keyword or just a misunderstanding of the way async functions are handled/awaited.
- Covers: Misused promises can cause crashes or other unexpected behavior, unless there are possibly some global unhandled promise handlers registered.

Flagged example:

```ts
// Promises in conditionals:
const promise = Promise.resolve("value");
if (promise) {
  // Do something
}

// Promises where `void` return was expected:
[1, 2, 3].forEach(async (value) => {
  await fetch(`/${value}`);
});
// ...
```

Accepted example:

```ts
// Awaiting the Promise to get its value in a conditional:
const promise = Promise.resolve("value");
if (await promise) {
  // Do something
}

// Using a `for-of` with `await` inside (instead of `forEach`):
for (const value of [1, 2, 3]) {
  await fetch(`/${value}`);
}
// ...
```

#### [ ] `typescript/no-mixed-enums`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-mixed-enums.html
- What it does: This rule disallows enums from having both string and numeric members.
- Covers: TypeScript enums can have string, numeric, or computed members. Having mixed string and numeric members in the same enum can lead to confusion and unexpected runtime behavior due to how TypeScript compiles enums.

Flagged example:

```ts
enum Status {
  Open = 1,
  Closed = "closed",
}

enum Direction {
  Up = "up",
  Down = 2,
  Left = "left",
  Right = 4,
// ...
```

Accepted example:

```ts
// All numeric
enum Status {
  Open = 1,
  Closed = 2,
}

// All string
enum Direction {
  Up = "up",
  Down = "down",
// ...
```

#### [ ] `typescript/no-unsafe-argument`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-argument.html
- What it does: This rule disallows calling a function with an argument which is typed as any.
- Covers: The any type in TypeScript is a dangerous "escape hatch" from the type system. Using any disables most type checking rules and is generally unsafe. When you pass a value typed as any to a function, you lose type safety for that function call.

Flagged example:

```ts
declare const anyValue: any;

function takesString(str: string): void {
  console.log(str.length);
}

takesString(anyValue); // unsafe

declare function takesNumber(num: number): number;
const result = takesNumber(anyValue); // unsafe
```

Accepted example:

```ts
declare const stringValue: string;
declare const numberValue: number;
declare const unknownValue: unknown;

function takesString(str: string): void {
  console.log(str.length);
}

takesString(stringValue); // safe

// ...
```

#### [ ] `typescript/no-unsafe-assignment`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-assignment.html
- What it does: This rule disallows assigning a value with type any to variables and properties.
- Covers: The any type in TypeScript disables type checking and can lead to runtime errors. When you assign an any value to a typed variable, you're essentially bypassing TypeScript's type safety without any guarantees about the actual value.

Flagged example:

```ts
declare const anyValue: any;

const str: string = anyValue; // unsafe assignment

let num: number;
num = anyValue; // unsafe assignment

const obj = {
  prop: anyValue as any, // unsafe assignment
};
// ...
```

Accepted example:

```ts
declare const stringValue: string;
declare const numberValue: number;
declare const unknownValue: unknown;

const str: string = stringValue; // safe

let num: number;
num = numberValue; // safe

// Use type guards with unknown
// ...
```

#### [ ] `typescript/no-unsafe-call`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-call.html
- What it does: This rule disallows calling a value with type any.
- Covers: The any type in TypeScript disables type checking. When you call a value typed as any, TypeScript cannot verify that it's actually a function, what parameters it expects, or what it returns. This can lead to runtime errors.

Flagged example:

```ts
declare const anyValue: any;

anyValue(); // unsafe call

anyValue(1, 2, 3); // unsafe call

const result = anyValue("hello"); // unsafe call

// Chained unsafe calls
anyValue().then().catch(); // unsafe
```

Accepted example:

```ts
declare const fn: () => void;
declare const fnWithParams: (a: number, b: string) => boolean;
declare const unknownValue: unknown;

fn(); // safe

const result = fnWithParams(1, "hello"); // safe

// Type guard for unknown
if (typeof unknownValue === "function") {
// ...
```

#### [ ] `typescript/no-unsafe-function-type`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.11.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-function-type.html
- What it does: Disallow using the unsafe built-in Function type.
- Covers: TypeScript's built-in Function type allows being called with any number of arguments and returns type any. Function also allows classes or plain objects that happen to possess all properties of the Function class. It's generally better to specify function parameters and return types with the function type syntax.

Flagged example:

```ts
let noParametersOrReturn: Function;
noParametersOrReturn = () => {};

let stringToNumber: Function;
stringToNumber = (text: string) => text.length;

let identity: Function;
identity = (value) => value;
```

Accepted example:

```ts
let noParametersOrReturn: () => void;
noParametersOrReturn = () => {};

let stringToNumber: (text: string) => number;
stringToNumber = (text) => text.length;

let identity: <T>(value: T) => T;
identity = (value) => value;
```

#### [ ] `typescript/no-unsafe-member-access`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-member-access.html
- What it does: This rule disallows member access on a value with type any.
- Covers: The any type in TypeScript disables type checking. When you access a member (property or method) on a value typed as any, TypeScript cannot verify that the member exists or what type it has. This can lead to runtime errors.

Flagged example:

```ts
declare const anyValue: any;

anyValue.foo; // unsafe member access

anyValue.bar.baz; // unsafe nested member access

anyValue["key"]; // unsafe computed member access

const result = anyValue.method(); // unsafe method access
```

Accepted example:

```ts
declare const obj: { foo: string; bar: { baz: number } };
declare const unknownValue: unknown;

obj.foo; // safe

obj.bar.baz; // safe

obj["foo"]; // safe

// Type guard for unknown
// ...
```

#### [ ] `typescript/no-unsafe-return`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-return.html
- What it does: This rule disallows returning a value with type any from a function.
- Covers: The any type in TypeScript disables type checking. When you return a value typed as any from a function, you're essentially passing the type-safety problem to the caller without providing any guarantees about what the function actually returns.

Flagged example:

```ts
declare const anyValue: any;

function getString(): string {
  return anyValue; // unsafe return
}

const getNumber = (): number => anyValue; // unsafe return

function processData(): { name: string; age: number } {
  return anyValue; // unsafe return
// ...
```

Accepted example:

```ts
declare const stringValue: string;
declare const numberValue: number;
declare const unknownValue: unknown;

function getString(): string {
  return stringValue; // safe
}

const getNumber = (): number => numberValue; // safe

// ...
```

#### [ ] `typescript/only-throw-error`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/only-throw-error.html
- What it does: This rule disallows throwing non-Error values.
- Covers: It's considered good practice to only throw Error objects (or subclasses of Error). This is because Error objects automatically capture a stack trace, which is useful for debugging. Additionally, some tools and environments expect thrown values to be Error objects.

Flagged example:

```ts
throw "error"; // throwing string

throw 42; // throwing number

throw true; // throwing boolean

throw { message: "error" }; // throwing plain object

throw null; // throwing null

// ...
```

Accepted example:

```ts
throw new Error("Something went wrong");

throw new TypeError("Invalid type");

throw new RangeError("Value out of range");

// Custom Error subclasses
class CustomError extends Error {
  constructor(message: string) {
    super(message);
// ...
```

#### [ ] `typescript/prefer-enum-initializers`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.3.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-enum-initializers.html
- What it does: Require each enum member value to be explicitly initialized.
- Covers: In projects where the value of enum members are important, allowing implicit values for enums can cause bugs if enums are modified over time.

Flagged example:

```typescript
// wrong, the value of `Close` is not constant
enum Status {
  Open = 1,
  Close,
}
```

Accepted example:

```typescript
enum Status {
  Open = 1,
  Close = 2,
}
```

#### [ ] `typescript/prefer-includes`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: yes
- Added: 1.29.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-includes.html
- What it does: Enforce using .includes() instead of .indexOf() !== -1 or /regex/.test().
- Covers: .includes() is more readable and expressive than checking .indexOf() !== -1. It clearly communicates the intent to check for the presence of a value. Additionally, for simple string searches, .includes() is often preferred over regex .test() for better performance and clarity.

Flagged example:

```ts
// Using indexOf
const str = "hello world";
if (str.indexOf("world") !== -1) {
  console.log("found");
}

if (str.indexOf("world") != -1) {
  console.log("found");
}

// ...
```

Accepted example:

```ts
// Using includes for strings
const str = "hello world";
if (str.includes("world")) {
  console.log("found");
}

// Using includes for arrays
const arr = [1, 2, 3];
if (arr.includes(2)) {
  console.log("found");
// ...
```

#### [ ] `typescript/prefer-nullish-coalescing`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: yes
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-nullish-coalescing.html
- What it does: Enforce using the nullish coalescing operator (??) instead of logical OR (||) or conditional expressions when the left operand might be null or undefined.
- Covers: The || operator returns the right-hand side when the left-hand side is any falsy value (false, 0, '', null, undefined, NaN). This can lead to unexpected behavior when you only want to provide a default for null or undefined.

Flagged example:

```ts
declare const x: string | null;

// Using || when ?? would be more appropriate
const foo = x || "default";

// Ternary that could use ??
const bar = x !== null && x !== undefined ? x : "default";
const baz = x != null ? x : "default";

// If statement that could use ??
// ...
```

Accepted example:

```ts
declare const x: string | null;

// Using nullish coalescing
const foo = x ?? "default";

// || is fine when you want falsy behavior
declare const y: string;
const bar = y || "default";

// Boolean coercion (can be ignored with ignoreBooleanCoercion)
// ...
```

#### [ ] `typescript/prefer-promise-reject-errors`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-promise-reject-errors.html
- What it does: This rule enforces passing an Error object to Promise.reject().
- Covers: It's considered good practice to only reject promises with Error objects. This is because Error objects automatically capture a stack trace, which is useful for debugging. Additionally, some tools and environments expect rejection reasons to be Error objects.

Flagged example:

```ts
Promise.reject("error"); // rejecting with string

Promise.reject(42); // rejecting with number

Promise.reject(true); // rejecting with boolean

Promise.reject({ message: "error" }); // rejecting with plain object

Promise.reject(null); // rejecting with null

// ...
```

Accepted example:

```ts
Promise.reject(new Error("Something went wrong"));

Promise.reject(new TypeError("Invalid type"));

Promise.reject(new RangeError("Value out of range"));

// Custom Error subclasses
class CustomError extends Error {
  constructor(message: string) {
    super(message);
// ...
```

#### [ ] `typescript/prefer-readonly-parameter-types`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-readonly-parameter-types.html
- What it does: Require function and method parameters to use readonly-compatible types.
- Covers: Mutable parameter types make accidental mutation easier and weaken function contracts. Readonly parameter types communicate intent and improve API safety.

Flagged example:

```ts
function update(items: string[]) {
  items.push("x");
}

function consume(obj: { value: string }) {
  obj.value = obj.value.trim();
}
```

Accepted example:

```ts
function update(items: readonly string[]) {
  return items.length;
}

function consume(obj: Readonly<{ value: string }>) {
  return obj.value;
}
```

#### [ ] `typescript/prefer-ts-expect-error`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.11
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-ts-expect-error.html
- What it does: Enforce using @ts-expect-error over @ts-ignore.
- Covers: TypeScript allows you to suppress all errors on a line by placing a comment starting with @ts-ignore or @ts-expect-error immediately before the erroring line. The two directives work the same, except @ts-expect-error causes a type error if placed before a line that's not erroring in the first place.

Flagged example:

```ts
// @ts-ignore
const str: string = 1;

/**
 * Explaining comment
 *
 * @ts-ignore */
const multiLine: number = "value";
```

Accepted example:

```ts
/**
 * Explaining comment
 *
 * @ts-expect-error */
const multiLine: number = "value";
```

#### [ ] `typescript/related-getter-setter-pairs`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/related-getter-setter-pairs.html
- What it does: This rule enforces that getters and setters for the same property are defined together and have related types.
- Covers: When you define a getter and setter for the same property, they should typically be defined together and work with compatible types. Having mismatched types or defining them separately can lead to confusion and potential runtime errors.

Flagged example:

```ts
class Example {
  // Getter and setter with incompatible types
  get value(): string {
    return this._value.toString();
  }

  set value(val: number) {
    // Incompatible with getter
    this._value = val;
  }
// ...
```

Accepted example:

```ts
class Example {
  // Getter and setter with compatible types
  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
  }

// ...
```

#### [ ] `typescript/require-await`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/require-await.html
- What it does: This rule disallows async functions which do not have an await expression.
- Covers: Async functions that don't use await are usually a mistake. They return a Promise unnecessarily and can often be converted to regular functions. This can improve performance and make the code clearer.

Flagged example:

```ts
// Async function without await
async function fetchData() {
  return fetch("/api/data");
}

// Async arrow function without await
const processData = async () => {
  return someData.map((x) => x * 2);
};

// ...
```

Accepted example:

```ts
// Async function with await
async function fetchData() {
  const response = await fetch("/api/data");
  return response.json();
}

// Regular function returning Promise
function fetchDataSync() {
  return fetch("/api/data");
}
// ...
```

#### [ ] `typescript/restrict-plus-operands`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/restrict-plus-operands.html
- What it does: This rule requires both operands of addition to be the same type and be number, string, or any.
- Covers: JavaScript's + operator can be used for both numeric addition and string concatenation. When the operands are of different types, JavaScript's type coercion rules can lead to unexpected results. This rule helps prevent these issues by requiring both operands to be of compatible types.

Flagged example:

```ts
declare const num: number;
declare const str: string;
declare const bool: boolean;
declare const obj: object;

// Mixed types
const result1 = num + str; // number + string
const result2 = str + bool; // string + boolean
const result3 = num + bool; // number + boolean
const result4 = obj + str; // object + string
// ...
```

Accepted example:

```ts
declare const num1: number;
declare const num2: number;
declare const str1: string;
declare const str2: string;

// Same types
const sum = num1 + num2; // number + number
const concat = str1 + str2; // string + string

// Explicit conversions
// ...
```

#### [ ] `typescript/return-await`

- Category: pedantic
- Default: no
- Fix: fixable_safe_fix_or_suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/return-await.html
- What it does: This rule enforces consistent returning of awaited values from async functions.
- Covers: There are different patterns for returning awaited values from async functions. Sometimes you want to await before returning (to handle errors in the current function), and sometimes you want to return the Promise directly (for better performance). This rule helps enforce consistency.

Flagged example:

```ts
// If configured to require await:
async function fetchData() {
  return fetch("/api/data"); // Should be: return await fetch('/api/data');
}

async function processData() {
  return someAsyncOperation(); // Should be: return await someAsyncOperation();
}

// If configured to disallow unnecessary await:
// ...
```

Accepted example:

```ts
// When await is required for error handling:
async function fetchData() {
  try {
    return await fetch("/api/data");
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

// ...
```

#### [ ] `typescript/strict-boolean-expressions`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: yes
- Added: 1.25.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/strict-boolean-expressions.html
- What it does: Disallow certain types in boolean expressions.
- Covers: Forbids usage of non-boolean types in expressions where a boolean is expected. boolean and never types are always allowed. Additional types which are considered safe in a boolean context can be configured via options.

Flagged example:

```ts
const str = "hello";
if (str) {
  console.log("string");
}

const num = 42;
if (num) {
  console.log("number");
}

// ...
```

Accepted example:

```ts
const str = "hello";
if (str !== "") {
  console.log("string");
}

const num = 42;
if (num !== 0) {
  console.log("number");
}

// ...
```

#### [ ] `typescript/strict-void-return`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: yes
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/strict-void-return.html
- What it does: Disallow returning non-void values where a void return is expected.
- Covers: Returning values from void contexts can hide logic errors and make callback APIs behave unexpectedly.

Flagged example:

```ts
declare function run(cb: () => void): void;

run(() => "value");
run(async () => 123);
```

Accepted example:

```ts
declare function run(cb: () => void): void;

run(() => {
  doWork();
});

run(() => undefined);
```

#### [ ] `typescript/switch-exhaustiveness-check`

- Category: pedantic
- Default: no
- Fix: conditional suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/switch-exhaustiveness-check.html
- What it does: This rule requires switch statements to be exhaustive when switching on union types.
- Covers: When switching on a union type, it's important to handle all possible cases to avoid runtime errors. TypeScript can help ensure exhaustiveness, but only if the switch statement is properly structured with a default case that TypeScript can analyze.

Flagged example:

```ts
type Status = "pending" | "approved" | "rejected";

function handleStatus(status: Status) {
  switch (status) {
    case "pending":
      return "Waiting for approval";
    case "approved":
      return "Request approved";
    // Missing 'rejected' case
  }
// ...
```

Accepted example:

```ts
type Status = "pending" | "approved" | "rejected";

function handleStatus(status: Status) {
  switch (status) {
    case "pending":
      return "Waiting for approval";
    case "approved":
      return "Request approved";
    case "rejected":
      return "Request rejected";
// ...
```

### suspicious

#### [ ] `typescript/consistent-return`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: yes
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-return.html
- What it does: Enforce consistent return behavior in functions.
- Covers: Mixing value-returning and non-value-returning code paths makes control flow harder to reason about and frequently indicates a bug.

Flagged example:

```ts
function maybe(flag: boolean): number {
  if (flag) {
    return 1;
  }
  return;
}
```

Accepted example:

```ts
function maybe(flag: boolean): number {
  if (flag) {
    return 1;
  }
  return 0;
}
```

#### [ ] `typescript/no-confusing-non-null-assertion`

- Category: suspicious
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.6.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-confusing-non-null-assertion.html
- What it does: Disallow non-null assertion in locations that may be confusing.
- Covers: Using a non-null assertion (!) next to an assign or equals check (= or == or ===) creates code that is confusing as it looks similar to a not equals check (!= !==).

Flagged example:

```ts
a! == b; // a non-null assertions(`!`) and an equals test(`==`)
a !== b; // not equals test(`!==`)
a! === b; // a non-null assertions(`!`) and an triple equals test(`===`)
```

Accepted example:

```ts
a == b;
a !== b;
a === b;
```

#### [ ] `typescript/no-extraneous-class`

- Category: suspicious
- Default: no
- Fix: dangerous suggestion
- Type-aware: no
- Added: 0.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-extraneous-class.html
- What it does: This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace. This rule also reports classes that have only a constructor and no fields. Those classes can generally be replaced with a standalone function.
- Covers: Users who come from a OOP paradigm may wrap their utility functions in an extra class, instead of putting them at the top level of an ECMAScript module. Doing so is generally unnecessary in JavaScript and TypeScript projects.

Flagged example:

```ts
class StaticConstants {
  static readonly version = 42;

  static isProduction() {
    return process.env.NODE_ENV === "production";
  }
}

class HelloWorldLogger {
  constructor() {
// ...
```

Accepted example:

```ts
const version = 42;
const isProduction = () => process.env.NODE_ENV === "production";
```

#### [ ] `typescript/no-unnecessary-boolean-literal-compare`

- Category: suspicious
- Default: no
- Fix: possible, not implemented
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-boolean-literal-compare.html
- What it does: This rule disallows unnecessary equality comparisons with boolean literals.
- Covers: Comparing boolean values to boolean literals is unnecessary when the comparison can be eliminated. These comparisons make code more verbose without adding value.

Flagged example:

```ts
declare const someCondition: boolean;

if (someCondition === true) {
  // ...
}

if (someCondition === false) {
  // ...
}

// ...
```

Accepted example:

```ts
declare const someCondition: boolean;

if (someCondition) {
  // ...
}

if (!someCondition) {
  // ...
}

// ...
```

#### [ ] `typescript/no-unnecessary-template-expression`

- Category: suspicious
- Default: no
- Fix: auto-fix
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-template-expression.html
- What it does: Disallows unnecessary template expressions (interpolations) that can be simplified.
- Covers: Template literals with substitution expressions that are unnecessary add complexity without providing any benefit. Static string literal expressions or expressions that are already strings can be simplified.

Flagged example:

```ts
// Static values can be incorporated into the surrounding template
const ab1 = `${"a"}${"b"}`;
const ab2 = `a${"b"}`;

const stringWithNumber = `${"1 + 1 = "}${2}`;
const stringWithBoolean = `${"true is "}${true}`;

// Expressions that are already strings can be rewritten without a template
const text = "a";
const wrappedText = `${text}`;
// ...
```

Accepted example:

```ts
// Static values incorporated into the template
const ab1 = `ab`;

// Template with non-trivial interpolation
const name = "world";
const greeting = `Hello ${name}!`;

// Template with expression
const result = `Result: ${1 + 2}`;

// ...
```

#### [ ] `typescript/no-unnecessary-type-arguments`

- Category: suspicious
- Default: no
- Fix: auto-fix
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-arguments.html
- What it does: This rule disallows type arguments that are identical to the default type parameter.
- Covers: Explicit type arguments that are the same as their default values are unnecessary and add visual noise to the code. TypeScript will infer these types automatically.

Flagged example:

```ts
function identity<T = string>(arg: T): T {
  return arg;
}

// Unnecessary type argument - string is the default
const result = identity<string>("hello");

interface Container<T = number> {
  value: T;
}
// ...
```

Accepted example:

```ts
function identity<T = string>(arg: T): T {
  return arg;
}

// Using default type
const result1 = identity("hello");

// Using different type
const result2 = identity<number>(42);

// ...
```

#### [ ] `typescript/no-unnecessary-type-assertion`

- Category: suspicious
- Default: no
- Fix: auto-fix
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-assertion.html
- What it does: This rule disallows type assertions that do not change the type of an expression.
- Covers: Type assertions that don't actually change the type of an expression are unnecessary and can be safely removed. They add visual noise without providing any benefit and may indicate confusion about TypeScript's type system.

Flagged example:

```ts
const str: string = "hello";
const redundant = str as string; // unnecessary, str is already string

function getString(): string {
  return "hello";
}
const result = getString() as string; // unnecessary, getString() already returns string

const num = 42;
const alsoRedundant = num as 42; // unnecessary if TypeScript can infer literal type
// ...
```

Accepted example:

```ts
const unknown: unknown = "hello";
const str = unknown as string; // necessary to narrow type

const element = document.getElementById("myElement") as HTMLInputElement; // necessary for specific element type

const obj = { name: "John" };
const name = obj.name as const; // necessary for literal type

// No assertion needed
const str2: string = "hello";
// ...
```

#### [ ] `typescript/no-unnecessary-type-constraint`

- Category: suspicious
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.6
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-constraint.html
- What it does: Disallow unnecessary constraints on generic types.
- Covers: Generic type parameters (<T>) in TypeScript may be "constrained" with an extends keyword. When no extends is provided, type parameters default a constraint to unknown. It is therefore redundant to extend from any or unknown.

Flagged example:

```typescript
interface FooAny<T extends any> {}
interface FooUnknown<T extends unknown> {}

type BarAny<T extends any> = {};
type BarUnknown<T extends unknown> = {};

const QuuxAny = <T extends any>() => {};

function QuuzAny<T extends any>() {}
```

Accepted example:

```typescript
interface Foo<T> {}

type Bar<T> = {};

const Quux = <T>() => {};

function Quuz<T>() {}
```

#### [ ] `typescript/no-unnecessary-type-conversion`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-conversion.html
- What it does: Disallow unnecessary type conversion expressions.
- Covers: Type conversions that do not change a value's type or runtime behavior add noise and can obscure intent.

Flagged example:

```ts
const value = String("asdf");
```

Accepted example:

```ts
const value = "asdf";
```

#### [ ] `typescript/no-unnecessary-type-parameters`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-parameters.html
- What it does: Disallow type parameters that are declared but not meaningfully used.
- Covers: Unnecessary type parameters make signatures noisier and harder to understand, and they often hide opportunities to simplify APIs.

Flagged example:

```ts
function parseYAML<T>(input: string): T {
  return input as any as T;
}
```

Accepted example:

```ts
function parseYAML(input: string): unknown {
  return input;
}

function identity<T>(value: T): T {
  return value;
}
```

#### [ ] `typescript/no-unsafe-enum-comparison`

- Category: suspicious
- Default: no
- Fix: suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-enum-comparison.html
- What it does: This rule disallows comparing an enum value with a non-enum value.
- Covers: Enum values should only be compared with other values of the same enum type or their underlying literal values in a type-safe manner. Comparing enums with unrelated values can lead to unexpected behavior and defeats the purpose of using enums for type safety.

Flagged example:

```ts
enum Status {
  Open = "open",
  Closed = "closed",
}

enum Color {
  Red = "red",
  Blue = "blue",
}

// ...
```

Accepted example:

```ts
enum Status {
  Open = "open",
  Closed = "closed",
}

declare const status: Status;

// Comparing with same enum values
if (status === Status.Open) {
} // safe
// ...
```

#### [ ] `typescript/no-unsafe-type-assertion`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-type-assertion.html
- What it does: Disallows unsafe type assertions that narrow a type.
- Covers: Type assertions that narrow a type bypass TypeScript's type-checking and can lead to runtime errors. Type assertions that broaden a type are safe because TypeScript essentially knows less about a type. Instead of using type assertions to narrow a type, it's better to rely on type guards, which help avoid potential runtime errors caused by unsafe type assertions.

Flagged example:

```ts
function f() {
  return Math.random() < 0.5 ? 42 : "oops";
}
const z = f() as number;

const items = [1, "2", 3, "4"];
const number = items[0] as number;
```

Accepted example:

```ts
function f() {
  return Math.random() < 0.5 ? 42 : "oops";
}
const z = f() as number | string | boolean;

const items = [1, "2", 3, "4"];
const number = items[0] as number | string | undefined;
```

### restriction

#### [ ] `typescript/explicit-function-return-type`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-function-return-type.html
- What it does: This rule enforces that functions have an explicit return type annotation.
- Covers: Explicit return types make it clearer what type is returned by a function. Making the type returned by a function obvious allows the reader to infer what the function does and how it can be used from a quick glance.

Flagged example:

```ts
// Should indicate that no value is returned (void)
function test() {
  return;
}

// Should indicate that a number is returned
var fn = function () {
  return 1;
};

// ...
```

Accepted example:

```ts
// No return value should be expected (void)
function test(): void {
  return;
}

// A return value of type number
var fn = function (): number {
  return 1;
};

// ...
```

#### [ ] `typescript/explicit-member-accessibility`

- Category: restriction
- Default: no
- Fix: conditional fix or suggestion
- Type-aware: no
- Added: 1.61.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-member-accessibility.html
- What it does: Require explicit accessibility modifiers on class properties and methods.
- Covers: TypeScript allows placing explicit public, protected, and private accessibility modifiers in front of class members. The modifiers exist solely in the type system and serve to describe who is allowed to access those members.

Flagged example:

```ts
class Animal {
  constructor(name: string) {}
  animalName: string;
  get name(): string {
    return this.animalName;
  }
}
```

Accepted example:

```ts
class Animal {
  public constructor(name: string) {}
  private animalName: string;
  public get name(): string {
    return this.animalName;
  }
}
```

#### [ ] `typescript/explicit-module-boundary-types`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.9.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-module-boundary-types.html
- What it does: Require explicit return and argument types on exported functions' and classes' public class methods.
- Covers: Explicit types for function return values and arguments makes it clear to any calling code what is the module boundary's input and output. Adding explicit type annotations for those types can help improve code readability. It can also improve TypeScript type checking performance on larger codebases.

Flagged example:

```ts
// Should indicate that no value is returned (void)
export function test() {
  return;
}

// Should indicate that a string is returned
export var arrowFn = () => "test";

// All arguments should be typed
export var arrowFn = (arg): string => `test ${arg}`;
// ...
```

Accepted example:

```ts
// A function with no return value (void)
export function test(): void {
  return;
}

// A return value of type string
export var arrowFn = (): string => "test";

// All arguments should be typed
export var arrowFn = (arg: string): string => `test ${arg}`;
// ...
```

#### [ ] `typescript/no-dynamic-delete`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.5.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-dynamic-delete.html
- What it does: Disallow using the delete operator on computed key expressions.
- Covers: Deleting dynamically computed keys can be dangerous and in some cases not well optimized. Using the delete operator on keys that aren't runtime constants could be a sign that you're using the wrong data structures. Consider using a Map or Set if you're using an object as a key-value collection.

Flagged example:

```ts
const container: { [i: string]: 0 } = {};
delete container["aa" + "b"];
```

Accepted example:

```ts
const container: { [i: string]: 0 } = {};
delete container.aab;
```

#### [ ] `typescript/no-empty-object-type`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-empty-object-type.html
- What it does: To avoid confusion around the {} type allowing any non-nullish value, this rule bans usage of the {} type. That includes interfaces and object type aliases with no fields.
- Covers: The {}, or "empty object" type in TypeScript is a common source of confusion for developers unfamiliar with TypeScript's structural typing. {} represents any non-nullish value, including literals like 0 and "". Often, developers writing {} actually mean either:

Flagged example:

```ts
let anyObject: {};
let anyValue: {};
interface AnyObjectA {}
interface AnyValueA {}
type AnyObjectB = {};
type AnyValueB = {};
```

Accepted example:

```ts
let anyObject: object;
let anyValue: unknown;
type AnyObjectA = object;
type AnyValueA = unknown;
type AnyObjectB = object;
type AnyValueB = unknown;
let objectWith: { property: boolean };
interface InterfaceWith {
  property: boolean;
}
// ...
```

#### [ ] `typescript/no-explicit-any`

- Category: restriction
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-explicit-any.html
- What it does: Disallows explicit use of the any type.
- Covers: The any type in TypeScript is a dangerous "escape hatch" from the type system. Using any disables many type checking rules and is generally best used only as a last resort or when prototyping code. This rule reports on explicit uses of the any keyword as a type annotation.

Flagged example:

```typescript
const age: any = "seventeen";
const ages: any[] = ["seventeen"];
const ages: Array<any> = ["seventeen"];
function greet(): any {}
function greet(): any[] {}
function greet(): Array<any> {}
function greet(): Array<Array<any>> {}
function greet(param: Array<any>): string {}
function greet(param: Array<any>): Array<any> {}
```

Accepted example:

```typescript
const age: number = 17;
const ages: number[] = [17];
const ages: Array<number> = [17];
function greet(): string {}
function greet(): string[] {}
function greet(): Array<string> {}
function greet(): Array<Array<string>> {}
function greet(param: Array<string>): string {}
function greet(param: Array<string>): Array<string> {}
```

#### [ ] `typescript/no-import-type-side-effects`

- Category: restriction
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.5.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-import-type-side-effects.html
- What it does: Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers.
- Covers: The --verbatimModuleSyntax compiler option causes TypeScript to do simple and predictable transpilation on import declarations. Namely, it completely removes import declarations with a top-level type qualifier, and it removes any import specifiers with an inline type qualifier.

Flagged example:

```ts
import { type A } from "mod";
import { type A as AA } from "mod";
import { type A, type B } from "mod";
import { type A as AA, type B as BB } from "mod";
```

Accepted example:

```ts
import type { A } from "mod";
import type { A as AA } from "mod";
import type { A, B } from "mod";
import type { A as AA, B as BB } from "mod";
```

#### [ ] `typescript/no-invalid-void-type`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.47.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-invalid-void-type.html
- What it does: Disallow void type usage outside return types and configured generic contexts.
- Covers: In TypeScript, void is primarily meaningful in return positions. Using void in other type locations (parameters, properties, aliases, and most unions) is usually confusing and often indicates a mistaken type design.

Flagged example:

```ts
function takeVoid(arg: void) {}
type Alias = void;
type Union = string | void;
```

Accepted example:

```ts
function f(): void {}
type P = Promise<void>;
type U = void | never;
```

#### [ ] `typescript/no-namespace`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-namespace.html
- What it does: Disallow TypeScript namespaces.
- Covers: TypeScript historically allowed a form of code organization called "custom modules" (module Example {}), later renamed to "namespaces" (namespace Example). Namespaces are an outdated way to organize TypeScript code. ES2015 module syntax is now preferred (import/export).

Flagged example:

```typescript
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
```

Accepted example:

```typescript
declare module "foo" {}
// anything inside a d.ts file
```

#### [ ] `typescript/no-non-null-asserted-nullish-coalescing`

- Category: restriction
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.5.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-asserted-nullish-coalescing.html
- What it does: Disallow non-null assertions in the left operand of a nullish coalescing operator.
- Covers: The ?? nullish coalescing runtime operator allows providing a default value when dealing with null or undefined. Using a ! non-null assertion type operator in the left operand of a nullish coalescing operator is redundant, and likely a sign of programmer error or confusion over the two operators.

Flagged example:

```ts
foo! ?? bar;
foo.bazz! ?? bar;
foo!.bazz! ?? bar;
foo()! ?? bar;

let x!: string;
x! ?? "";

let x: string;
x = foo();
// ...
```

Accepted example:

```ts
foo ?? bar;
foo ?? bar!;
foo!.bazz ?? bar;
foo!.bazz ?? bar!;
foo() ?? bar;
```

#### [ ] `typescript/no-non-null-assertion`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.5.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-assertion.html
- What it does: Disallow non-null assertions using the ! postfix operator.
- Covers: TypeScript's ! non-null assertion operator asserts to the type system that an expression is non-nullable, as in not null or undefined. Using assertions to tell the type system new information is often a sign that code is not fully type-safe. It's generally better to structure program logic so that TypeScript understands when values may be nullable.

Flagged example:

```ts
x!;
x!.y;
x.y!;
```

Accepted example:

```ts
x;
x?.y;
x.y;
```

#### [ ] `typescript/no-require-imports`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.13.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-require-imports.html
- What it does: Forbids the use of CommonJS require calls.
- Covers: require imports, while functional in Node.js and older JavaScript environments, are generally considered less desirable than ES modules (import) for several key reasons in modern JavaScript development:

Flagged example:

```ts
const lib1 = require("lib1");
const { lib2 } = require("lib2");
import lib3 = require("lib3");
```

Accepted example:

```ts
import * as lib1 from "lib1";
import { lib2 } from "lib2";
import * as lib3 from "lib3";
```

#### [ ] `typescript/no-restricted-types`

- Category: restriction
- Default: no
- Fix: fixable_safe_fix_or_suggestion
- Type-aware: no
- Added: 1.31.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-restricted-types.html
- What it does: Disallow certain types from being used.
- Covers: Some built-in types have aliases, while some types are considered dangerous or harmful. It's often a good idea to ban certain types to help with consistency and safety.

Flagged example:

```ts
let value: Foo;
```

Accepted example:

```ts
let value: Bar;
```

#### [ ] `typescript/no-var-requires`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-var-requires.html
- What it does: Disallow require statements except in import statements.
- Covers: In other words, the use of forms such as var foo = require("foo") are banned. Instead use ES module imports or import foo = require("foo") imports.

Example signal: Flags var requires patterns in typescript code.

#### [ ] `typescript/non-nullable-type-assertion-style`

- Category: restriction
- Default: no
- Fix: suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/non-nullable-type-assertion-style.html
- What it does: This rule prefers a non-null assertion over an explicit type cast for non-nullable types.
- Covers: When you know that a value cannot be null or undefined, you can use either a non-null assertion (!) or a type assertion (as Type). The non-null assertion is more concise and clearly communicates the intent that you're asserting the value is not null/undefined.

Flagged example:

```ts
declare const value: string | null;

// Type assertion when non-null assertion would be clearer
const result1 = value as string;

declare const maybe: number | undefined;
const result2 = maybe as number;

// In function calls
function takesString(s: string) {
// ...
```

Accepted example:

```ts
declare const value: string | null;

// Non-null assertion for non-nullable types
const result1 = value!;

declare const maybe: number | undefined;
const result2 = maybe!;

// In function calls
function takesString(s: string) {
// ...
```

#### [ ] `typescript/prefer-literal-enum-member`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-literal-enum-member.html
- What it does: Explicit enum values must only be literal values (string, number, boolean, etc.).
- Covers: TypeScript allows the value of an enum member to be many different kinds of valid JavaScript expressions. However, because enums create their own scope whereby each enum member becomes a variable in that scope, developers are often surprised at the resultant values.

Flagged example:

```ts
const imOutside = 2;
const b = 2;
enum Foo {
  outer = imOutside,
  a = 1,
  b = a,
  c = b,
}
```

Accepted example:

```ts
const imOutside = 2;
const b = 2;
enum Foo {
  outer = imOutside,
  a = 1,
  b = a,
  c = b,
}
```

#### [ ] `typescript/promise-function-async`

- Category: restriction
- Default: no
- Fix: conditional auto-fix
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/promise-function-async.html
- What it does: This rule requires any function or method that returns a Promise to be marked as async.
- Covers: Functions that return Promises should typically be marked as async to make their asynchronous nature clear and to enable the use of await within them. This makes the code more readable and helps prevent common mistakes with Promise handling.

Flagged example:

```ts
// Function returning Promise without async
function fetchData(): Promise<string> {
  return fetch("/api/data").then((res) => res.text());
}

// Method returning Promise without async
class DataService {
  getData(): Promise<any> {
    return fetch("/api/data").then((res) => res.json());
  }
// ...
```

Accepted example:

```ts
// Async function
async function fetchData(): Promise<string> {
  const response = await fetch("/api/data");
  return response.text();
}

// Async method
class DataService {
  async getData(): Promise<any> {
    const response = await fetch("/api/data");
// ...
```

#### [ ] `typescript/use-unknown-in-catch-callback-variable`

- Category: restriction
- Default: no
- Fix: suggestion
- Type-aware: yes
- Added: 1.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/use-unknown-in-catch-callback-variable.html
- What it does: This rule enforces using unknown for catch clause variables instead of any.
- Covers: In TypeScript 4.0+, catch clause variables can be typed as unknown instead of any. Using unknown is safer because it forces you to perform type checking before using the error, preventing potential runtime errors.

Flagged example:

```ts
try {
  somethingRisky();
} catch (error: any) {
  // Should use 'unknown'
  console.log(error.message); // Unsafe access
  error.someMethod(); // Unsafe call
}

// Default catch variable is 'any' in older TypeScript
try {
// ...
```

Accepted example:

```ts
try {
  somethingRisky();
} catch (error: unknown) {
  // Type guard for Error objects
  if (error instanceof Error) {
    console.log(error.message); // Safe access
    console.log(error.stack);
  } else {
    console.log("Unknown error:", error);
  }
// ...
```

### nursery

#### [ ] `typescript/no-unnecessary-condition`

- Category: nursery
- Default: no
- Fix: none
- Type-aware: yes
- Added: 1.48.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-condition.html
- What it does: Disallow conditions that are always truthy, always falsy, or always nullish based on TypeScript's type information.
- Covers: Conditions with no possible runtime variation make code harder to read and can hide logic errors. They often leave dead branches and suggest that the declared types do not match the intended behavior.

Flagged example:

```ts
declare const value: null;
if (value) {
  doWork();
}

const items: string[] = [];
if (items) {
  doWork();
}

// ...
```

Accepted example:

```ts
declare const maybeUser: User | undefined;
if (maybeUser) {
  doWork(maybeUser);
}

const items: string[] = [];
if (items.length > 0) {
  doWork();
}

// ...
```

#### [ ] `typescript/prefer-optional-chain`

- Category: nursery
- Default: no
- Fix: fixable_dangerous_fix_or_suggestion
- Type-aware: yes
- Added: 1.39.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-optional-chain.html
- What it does: Enforce using concise optional chain expressions instead of chained logical AND operators, negated logical OR operators, or empty objects.
- Covers: TypeScript 3.7 introduced optional chaining (?.) which provides a more concise and readable way to access properties on potentially nullish values. Using optional chaining instead of logical AND chains (&&) or other patterns improves code clarity.

Flagged example:

```ts
foo && foo.bar;
foo && foo.bar && foo.bar.baz;
foo && foo["bar"];
foo && foo.bar && foo.bar.baz && foo.bar.baz.buzz;
foo && foo.bar && foo.bar.baz.buzz;
foo && foo.bar.baz && foo.bar.baz.buzz;
(foo || {}).bar;
```

Accepted example:

```ts
foo?.bar;
foo?.bar?.baz;
foo?.["bar"];
foo?.bar?.baz?.buzz;
foo?.bar?.baz.buzz;
foo?.bar.baz?.buzz;
foo?.bar;
```

## unicorn

### style

#### [ ] `unicorn/catch-error-name`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/catch-error-name.html
- What it does: This rule enforces consistent and descriptive naming for error variables in catch statements, preventing the use of vague names like badName or _ when the error is used.
- Covers: Using non-descriptive names like badName or _ makes the code harder to read and understand, especially when debugging. It's important to use clear, consistent names to represent errors.

Flagged example:

```javascript
try {
} catch (badName) {}

// `_` is not allowed if it's used
try {
} catch (_) {
  console.log(_);
}

promise.catch((badName) => {});
// ...
```

Accepted example:

```javascript
try {
} catch (error) {}

// `_` is allowed if it's not used
try {
} catch (_) {
  console.log(123);
}

promise.catch((error) => {});
// ...
```

#### [ ] `unicorn/consistent-date-clone`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.15.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-date-clone.html
- What it does: The Date constructor can clone a Date object directly when passed as an argument, making timestamp conversion unnecessary. This rule enforces the use of the direct Date cloning instead of using .getTime() for conversion.
- Covers: Using .getTime() to convert a Date object to a timestamp and then back to a Date is redundant and unnecessary. Simply passing the Date object to the Date constructor is cleaner and more efficient.

Flagged example:

```js
new Date(date.getTime());
```

Accepted example:

```js
new Date(date);
```

#### [ ] `unicorn/consistent-existence-index-check`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-existence-index-check.html
- What it does: Enforce consistent style for element existence checks with indexOf(), lastIndexOf(), findIndex(), and findLastIndex(). This ensures that comparisons are performed in a standard and clear way.
- Covers: This rule is meant to enforce a specific style and improve code clarity. Using inconsistent comparison styles (e.g., index < 0, index >= 0) can make the intention behind the code unclear, especially in large codebases.

Flagged example:

```javascript
const index = foo.indexOf("bar");
if (index < 0) {
}

const index = foo.indexOf("bar");
if (index >= 0) {
}
```

Accepted example:

```javascript
const index = foo.indexOf("bar");
if (index === -1) {
}

const index = foo.indexOf("bar");
if (index !== -1) {
}
```

#### [ ] `unicorn/consistent-template-literal-escape`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.60.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-template-literal-escape.html
- What it does: Enforce consistent style for escaping ${ in template literals.
- Covers: Using \${ instead of ${ can improve readability and prevent confusion.

Flagged example:

```js
const foo = `$\{a}`;
```

Accepted example:

```js
const foo = `\${a}`;
```

#### [ ] `unicorn/custom-error-definition`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.57.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/custom-error-definition.html
- What it does: Enforces the only valid way of Error subclassing. It works with any super class that ends in Error.
- Covers: Incorrectly defined custom errors can lead to unexpected behavior when catching and identifying errors. Missing super() calls, wrong name property values, or non-standard class names make error handling unreliable.

Flagged example:

```js
class CustomError extends Error {
  constructor(message) {
    super(message);
    // The `this.message` assignment is useless as it's already set via the `super()` call.
    this.message = message;
    this.name = "CustomError";
  }
}

class CustomError extends Error {
// ...
```

Accepted example:

```js
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

class CustomError extends Error {
  constructor() {
    super("My custom error");
// ...
```

#### [ ] `unicorn/empty-brace-spaces`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/empty-brace-spaces.html
- What it does: Removes the extra spaces or new line characters inside a pair of braces that does not contain additional code. This ensures that braces are clean and do not contain unnecessary spaces or newlines.
- Covers: Extra spaces inside braces can negatively impact the readability of the code. Keeping braces clean and free of unnecessary characters improves consistency and makes the code easier to understand and maintain.

Flagged example:

```javascript
const a = {  };
class A {
}
```

Accepted example:

```javascript
const a = {};
class A {}
```

#### [ ] `unicorn/error-message`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/error-message.html
- What it does: Enforces providing a message when creating built-in Error objects to improve readability and debugging.
- Covers: Throwing an Error without a message, like throw new Error(), provides no context on what went wrong, making debugging harder. A clear error message improves code clarity and helps developers quickly identify issues.

Flagged example:

```javascript
throw Error();
throw new TypeError();
```

Accepted example:

```javascript
throw new Error("Unexpected token");
throw new TypeError("Number expected");
```

#### [ ] `unicorn/filename-case`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/filename-case.html
- What it does: Enforces a consistent case style for filenames to improve project organization and maintainability. By default, kebab-case is enforced, but other styles can be configured.
- Covers: Inconsistent file naming conventions make it harder to locate files, navigate projects, and enforce consistency across a codebase. Standardizing naming conventions improves readability, reduces cognitive overhead, and aligns with best practices in large-scale development.

Example signal: Covers filename case concerns.

#### [ ] `unicorn/max-nested-calls`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: next
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/max-nested-calls.html
- What it does: Limit the depth of nested calls.
- Covers: Deeply nested calls make code hard to read. Extracting intermediate results into named variables improves readability.

Flagged example:

```js
foo(bar(baz(qux())));
```

Accepted example:

```js
const value = baz(qux());
foo(bar(value));

// Fluent chains are ignored.
query().filter().map().toArray();
```

#### [ ] `unicorn/no-array-method-this-argument`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.16.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-method-this-argument.html
- What it does: Disallows the use of the thisArg parameter in array iteration methods such as map, filter, some, every, and similar.
- Covers: The thisArg parameter makes code harder to understand and reason about. Instead, prefer arrow functions or bind explicitly in a clearer way. Arrow functions inherit this from the lexical scope, which is more intuitive and less error-prone.

Flagged example:

```js
array.map(function (x) {
  return x + this.y;
}, this);
array.filter(function (x) {
  return x !== this.value;
}, this);
```

Accepted example:

```js
array.map((x) => x + this.y);
array.filter((x) => x !== this.value);
const self = this;
array.map(function (x) {
  return x + self.y;
});
```

#### [ ] `unicorn/no-await-expression-member`

- Category: style
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-await-expression-member.html
- What it does: Disallows member access from await expressions.
- Covers: When accessing a member from an await expression, the await expression has to be parenthesized, which is not readable.

Flagged example:

```javascript
async function bad() {
  const secondElement = (await getArray())[1];
}
```

Accepted example:

```javascript
async function good() {
  const [, secondElement] = await getArray();
}
```

#### [ ] `unicorn/no-console-spaces`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-console-spaces.html
- What it does: Disallows leading/trailing space inside console.log() and similar methods.
- Covers: The console.log() method and similar methods join the parameters with a space so adding a leading/trailing space to a parameter, results in two spaces being added.

Flagged example:

```javascript
console.log("abc ", "def");
```

Accepted example:

```javascript
console.log("abc", "def");
```

#### [ ] `unicorn/no-nested-ternary`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-nested-ternary.html
- What it does: Disallow deeply nested ternary expressions.
- Covers: Nesting ternary expressions can make code more difficult to understand.

Flagged example:

```javascript
const foo = i > 5 ? (i < 100 ? true : false) : true;
const foo = i > 5 ? true : i < 100 ? true : i < 1000 ? true : false;
```

Accepted example:

```javascript
const foo = i > 5 ? (i < 100 ? true : false) : true;
const foo = i > 5 ? (i < 100 ? true : false) : i < 100 ? true : false;
```

#### [ ] `unicorn/no-null`

- Category: style
- Default: no
- Fix: conditional dangerous auto-fix
- Type-aware: no
- Added: 0.0.21
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-null.html
- What it does: Disallow the use of the null literal, to encourage using undefined instead.
- Covers: There are some reasons for using undefined instead of null.

Flagged example:

```javascript
let foo = null;
```

Accepted example:

```javascript
let foo;
```

#### [ ] `unicorn/no-unreadable-array-destructuring`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unreadable-array-destructuring.html
- What it does: Disallows destructuring values from an array in ways that are difficult to read.
- Covers: Destructuring can be very useful, but it can also make some code harder to read. This rule prevents ignoring consecutive values (e.g. let [,,foo] = array) when destructuring from an array.

Flagged example:

```javascript
const [, , foo] = parts;
const [, , ...rest] = parts;
```

Accepted example:

```javascript
const [foo] = parts;
const foo = parts[3];
const rest = parts.slice(2);

// One is fine
const [, foo] = parts;
```

#### [ ] `unicorn/no-useless-collection-argument`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.28.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-collection-argument.html
- What it does: Disallow useless values or fallbacks in Set, Map, WeakSet, or WeakMap.
- Covers: It is unnecessary to pass an empty array or empty string when constructing a Set, Map, WeakSet, or WeakMap, since they accept nullish values.

Flagged example:

```js
const set = new Set([]);
const set = new Set("");
```

Accepted example:

```js
const set = new Set();
```

#### [ ] `unicorn/no-zero-fractions`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-zero-fractions.html
- What it does: Prevents the use of zero fractions.
- Covers: There is no difference in JavaScript between, for example, 1, 1.0 and 1., so prefer the former for consistency and brevity.

Flagged example:

```javascript
const foo = 1.0;
const foo = -1.0;
const foo = 123_456.000_000;
```

Accepted example:

```javascript
const foo = 1;
const foo = -1;
const foo = 123456;
const foo = 1.1;
```

#### [ ] `unicorn/number-literal-case`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/number-literal-case.html
- What it does: This rule enforces proper case for numeric literals.
- Covers: When both an identifier and a numeric literal are in lower case, it can be hard to differentiate between them.

Flagged example:

```javascript
const foo = 0XFF;
const foo = 0xff;
const foo = 0Xff;
const foo = 0Xffn;

const foo = 0B10;
const foo = 0B10n;

const foo = 0O76;
const foo = 0O76n;
// ...
```

Accepted example:

```javascript
const foo = 0xFF;
const foo = 0b10;
const foo = 0o76;
const foo = 0xFFn;
const foo = 2e+5;
```

#### [ ] `unicorn/numeric-separators-style`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/numeric-separators-style.html
- What it does: Enforces a convention of grouping digits using numeric separators.
- Covers: A long series of digits can be difficult to read, and it can be difficult to determine the value of the number at a glance. Breaking up the digits with numeric separators (_) can greatly improve readability.

Flagged example:

```javascript
const invalid = [1_23_4444, 1_234.56789, 0xab_c_d_ef, 0b10_00_1111, 0o1_0_44_21, 1_294_28771_2n];
```

Accepted example:

```javascript
const valid = [1_234_567, 1_234.567_89, 0xab_cd_ef, 0b1000_1111, 0o10_4421, 1_294_287_712n];
```

#### [ ] `unicorn/prefer-array-index-of`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.16.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-index-of.html
- What it does: Enforces using indexOf or lastIndexOf instead of findIndex or findLastIndex when the callback is a simple strict equality comparison.
- Covers: Using findIndex(x => x === value) is unnecessarily verbose when indexOf(value) accomplishes the same thing more concisely and clearly. It also avoids the overhead of creating a callback function.

Flagged example:

```js
values.findIndex((x) => x === "foo");
values.findLastIndex((x) => x === "bar");
```

Accepted example:

```js
values.indexOf("foo");
values.lastIndexOf("bar");
```

#### [ ] `unicorn/prefer-bigint-literals`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.30.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-bigint-literals.html
- What it does: Requires using BigInt literals (e.g. 123n) instead of calling the BigInt() constructor with literal arguments such as numbers or numeric strings
- Covers: Using BigInt(…) with literal values is unnecessarily verbose and less idiomatic than using a BigInt literal.

Flagged example:

```js
BigInt(0);
BigInt(123);
BigInt(0xff);
BigInt(1e3);
BigInt("42");
BigInt("0x10");
```

Accepted example:

```js
0n;
123n;
0xffn;
1000n;
// Non-integer, dynamic, or non-literal input:
BigInt(x);
BigInt("not-a-number");
BigInt("1.23");
```

#### [ ] `unicorn/prefer-class-fields`

- Category: style
- Default: no
- Fix: conditional fix or suggestion
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-class-fields.html
- What it does: Prefers class field declarations over this assignments in constructors for static values.
- Covers: Class field declarations are more readable and less error-prone than assigning static values to this in the constructor. Using class fields keeps the constructor cleaner and makes the intent clearer.

Flagged example:

```ts
class Foo {
  constructor() {
    this.bar = 1;
  }
}

class MyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MyError";
// ...
```

Accepted example:

```js
class Foo {
  bar = 1;
}

class MyError extends Error {
  name = "MyError";
}

class Foo {
  foo = "bar";
// ...
```

#### [ ] `unicorn/prefer-classlist-toggle`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-classlist-toggle.html
- What it does: Prefers the use of element.classList.toggle(className, condition) over conditional add/remove patterns.
- Covers: The toggle() method is more concise and expressive than using conditional logic to switch between add() and remove().

Flagged example:

```javascript
if (condition) {
  element.classList.add("className");
} else {
  element.classList.remove("className");
}

condition ? element.classList.add("className") : element.classList.remove("className");

element.classList[condition ? "add" : "remove"]("className");
```

Accepted example:

```javascript
element.classList.toggle("className", condition);
```

#### [ ] `unicorn/prefer-default-parameters`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-default-parameters.html
- What it does: Instead of reassigning a function parameter, default parameters should be used. The foo = foo || 123 statement evaluates to 123 when foo is falsy, possibly leading to confusing behavior, whereas default parameters only apply when passed an undefined value. This rule only reports reassignments to literal values.
- Covers: Using default parameters makes it clear that a parameter has a default value, improving code readability and maintainability.

Flagged example:

```js
function abc(foo) {
  foo = foo || "bar";
}

function abc(foo) {
  const bar = foo || "bar";
}
```

Accepted example:

```js
function abc(foo = "bar") {}

function abc(bar = "bar") {}

function abc(foo) {
  foo = foo || bar();
}
```

#### [ ] `unicorn/prefer-dom-node-text-content`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.21
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-text-content.html
- What it does: Enforces the use of .textContent over .innerText for DOM nodes.
- Covers: There are some disadvantages of using .innerText.

Flagged example:

```javascript
const text = foo.innerText;
```

Accepted example:

```javascript
const text = foo.textContent;
```

#### [ ] `unicorn/prefer-export-from`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.70.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-export-from.html
- What it does: When re-exporting from a module, it's unnecessary to import and then export. It can be done in a single export…from declaration. This rule encourages using direct re-export syntax (export ... from) instead of importing and then exporting. It helps reduce boilerplate code and keeps the module scope clean by avoiding unnecessary local bindings.
- Covers: Separating re-exports into import and export statements is discouraged because it unnecessarily pollutes the current module's scope and adds redundant boilerplate code.

Flagged example:

```js
import defaultExport from "./foo.js";
export default defaultExport;
```

Accepted example:

```js
export { default } from "./foo.js";
```

#### [ ] `unicorn/prefer-global-this`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.16.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-global-this.html
- What it does: Enforces the use of globalThis instead of environment‑specific global object aliases (window, self, or global).
- Covers: Portability - window is only defined in browser main threads, self is used in Web Workers, and global is Node‑specific. Choosing the wrong alias causes runtime crashes when the code is executed outside of its original environment.

Flagged example:

```js
// Browser‑only
window.alert("Hi");

// Node‑only
if (typeof global.Buffer !== "undefined") {
}

// Web Worker‑only
self.postMessage("done");
```

Accepted example:

```js
globalThis.alert("Hi");

if (typeof globalThis.Buffer !== "undefined") {
}

globalThis.postMessage("done");
```

#### [ ] `unicorn/prefer-includes`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-includes.html
- What it does: Prefer includes() over indexOf() when checking for existence/non-existence. All built-ins have .includes() in addition to .indexOf().
- Covers: The .includes() method is more readable and less error-prone than .indexOf().

Flagged example:

```javascript
if (str.indexOf("foo") !== -1) {
}
```

Accepted example:

```javascript
if (str.includes("foo")) {
}
```

#### [ ] `unicorn/prefer-keyboard-event-key`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.33.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-keyboard-event-key.html
- What it does: Enforces the use of KeyboardEvent#key over KeyboardEvent#keyCode, which is deprecated.
- Covers: The keyCode, which, and charCode properties are deprecated and should be avoided in favor of the key property.

Flagged example:

```js
window.addEventListener("keydown", (event) => {
  if (event.keyCode === 8) {
    console.log("Backspace was pressed");
  }
});

window.addEventListener("keydown", (event) => {
  console.log(event.keyCode);
});
```

Accepted example:

```js
window.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    console.log("Backspace was pressed");
  }
});

window.addEventListener("click", (event) => {
  console.log(event.key);
});
```

#### [ ] `unicorn/prefer-logical-operator-over-ternary`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-logical-operator-over-ternary.html
- What it does: This rule finds ternary expressions that can be simplified to a logical operator.
- Covers: Using a logical operator is shorter and simpler than a ternary expression.

Flagged example:

```javascript
const foo = bar ? bar : baz;
console.log(foo ? foo : bar);
```

Accepted example:

```javascript
const foo = bar || baz;
console.log(foo ?? bar);
```

#### [ ] `unicorn/prefer-modern-dom-apis`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.20
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-modern-dom-apis.html
- What it does: Enforces the use of:
- Covers: There are some advantages of using the newer DOM APIs, like:

Flagged example:

```javascript
oldChildNode.replaceWith(newChildNode);
```

Accepted example:

```javascript
parentNode.replaceChild(newChildNode, oldChildNode);
```

#### [ ] `unicorn/prefer-negative-index`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.13.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-negative-index.html
- What it does: Prefer using a negative index over .length - index when possible.
- Covers: Using a negative index with at or slice is generally more readable and concise than using .length - index.

Flagged example:

```js
foo.slice(foo.length - 2, foo.length - 1);
foo.at(foo.length - 1);
```

Accepted example:

```js
foo.slice(-2, -1);
foo.at(-1);
```

#### [ ] `unicorn/prefer-object-from-entries`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.16.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-object-from-entries.html
- What it does: Encourages using Object.fromEntries when converting an array of key-value pairs into an object.
- Covers: Manually constructing objects from key-value pairs using reduce or forEach is more verbose, error-prone, and harder to understand. The Object.fromEntries method is clearer, more declarative, and built for exactly this purpose.

Flagged example:

```js
const result = pairs.reduce((obj, [key, value]) => {
  obj[key] = value;
  return obj;
}, {});

const result = {};
pairs.forEach(([key, value]) => {
  result[key] = value;
});
```

Accepted example:

```js
const result = Object.fromEntries(pairs);
```

#### [ ] `unicorn/prefer-optional-catch-binding`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.17
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-optional-catch-binding.html
- What it does: Prefers omitting the catch binding parameter if it is unused.
- Covers: It is unnecessary to bind the error to a variable if it is not used.

Flagged example:

```javascript
try {
  // ...
} catch (e) {}
```

Accepted example:

```javascript
try {
  // ...
} catch {}
```

#### [ ] `unicorn/prefer-reflect-apply`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-reflect-apply.html
- What it does: Disallows the use of Function.prototype.apply() and suggests using Reflect.apply() instead.
- Covers: Reflect.apply() is arguably less verbose and easier to understand. In addition, when you accept arbitrary methods, it's not safe to assume .apply() exists or is not overridden.

Flagged example:

```javascript
foo.apply(null, [42]);
```

Accepted example:

```javascript
Reflect.apply(foo, null);
```

#### [ ] `unicorn/prefer-response-static-json`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.29.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-response-static-json.html
- What it does: Enforces the use of Response.json() over new Response(JSON.stringify()).
- Covers: Response.json() is a more concise and semantically clear way to create JSON responses. It automatically sets the correct Content-Type header (application/json) and handles serialization, making the code more maintainable and less error-prone.

Flagged example:

```javascript
const response = new Response(JSON.stringify(data));
const response = new Response(JSON.stringify(data), { status: 200 });
```

Accepted example:

```javascript
const response = Response.json(data);
const response = Response.json(data, { status: 200 });
```

#### [ ] `unicorn/prefer-spread`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.17
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-spread.html
- What it does: Enforces the use of the spread operator (...) over outdated patterns.
- Covers: Using the spread operator is more concise and readable.

Flagged example:

```javascript
const foo = Array.from(set);
const foo = Array.from(new Set([1, 2]));
```

Accepted example:

```javascript
[...set].map(() => {});
Array.from(...argumentsArray);
```

#### [ ] `unicorn/prefer-string-raw`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.12.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-raw.html
- What it does: Prefers use of String.raw to avoid escaping \.
- Covers: Excessive backslashes can make string values less readable which can be avoided by using String.raw.

Flagged example:

```javascript
const file = "C:\\windows\\style\\path\\to\\file.js";
const regexp = new RegExp("foo\\.bar");
```

Accepted example:

```javascript
const file = String.raw`C:\windows\style\path\to\file.js`;
const regexp = new RegExp(String.raw`foo\.bar`);
```

#### [ ] `unicorn/prefer-string-trim-start-end`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-trim-start-end.html
- What it does: String#trimLeft() and String#trimRight() are aliases of String#trimStart() and String#trimEnd(). This is to ensure consistency and use direction-independent wording.
- Covers: The trimLeft and trimRight names are confusing and inconsistent with the rest of the language.

Flagged example:

```javascript
str.trimLeft();
str.trimRight();
```

Accepted example:

```javascript
str.trimStart();
str.trimEnd();
```

#### [ ] `unicorn/prefer-structured-clone`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.9.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-structured-clone.html
- What it does: Prefer using structuredClone to create a deep clone.
- Covers: structuredClone is the modern way to create a deep clone of a value.

Flagged example:

```js
const clone = JSON.parse(JSON.stringify(foo));

const clone = _.cloneDeep(foo);
```

Accepted example:

```js
const clone = structuredClone(foo);
```

#### [ ] `unicorn/prefer-ternary`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.50.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-ternary.html
- What it does: Prefers ternary expressions over simple if/else statements.
- Covers: Simple if/else branches for the same operation are often shorter and clearer when expressed as a ternary.

Flagged example:

```js
if (test) {
  return a;
} else {
  return b;
}
```

Accepted example:

```js
return test ? a : b;
```

#### [ ] `unicorn/relative-url-style`

- Category: style
- Default: no
- Fix: fixable_safe_fix_or_suggestion
- Type-aware: no
- Added: 1.44.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/relative-url-style.html
- What it does: Enforce consistent relative URL style.
- Covers: When using a relative URL in new URL(), the URL should either never or always use the ./ prefix consistently.

Flagged example:

```js
new URL("./foo", base);
```

Accepted example:

```js
new URL("foo", base);
```

#### [ ] `unicorn/require-array-join-separator`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-array-join-separator.html
- What it does: Enforce using the separator argument with Array#join().
- Covers: It's better to make it clear what the separator is when calling Array#join(), instead of relying on the default comma (',') separator.

Flagged example:

```javascript
foo.join();
```

Accepted example:

```javascript
foo.join(",");
```

#### [ ] `unicorn/require-module-attributes`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.35.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-module-attributes.html
- What it does: This rule enforces a non-empty attribute list in import/export statements and import() expressions.
- Covers: Import attributes are meant to provide metadata about how a module should be loaded (e.g., with { type: "json" }). An empty attribute object provides no information and should be removed.

Flagged example:

```js
import foo from "foo" with {};

export { foo } from "foo" with {};

const foo = await import("foo", {});

const foo = await import("foo", { with: {} });
```

Accepted example:

```js
import foo from "foo";

export { foo } from "foo";

const foo = await import("foo");

const foo = await import("foo");
```

#### [ ] `unicorn/switch-case-braces`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/switch-case-braces.html
- What it does: Requires empty switch cases to omit braces, while non-empty cases must use braces. This reduces visual clutter for empty cases and enforces proper scoping for non-empty ones.
- Covers: Using braces unnecessarily for empty cases adds visual noise, while omitting braces in non-empty cases can lead to scoping issues.

Flagged example:

```javascript
switch (num) {
  case 1: {
  }
  case 2:
    console.log("Case 2");
    break;
}
```

Accepted example:

```javascript
switch (num) {
  case 1:
  case 2: {
    console.log("Case 2");
    break;
  }
}
```

#### [ ] `unicorn/switch-case-break-position`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/switch-case-break-position.html
- What it does: Enforce consistent break/return/continue/throw position in case clauses.
- Covers: Enforce that terminating statements (break, return, continue, throw) appear inside the block statement of a case clause, not after it. This can happen when refactoring - for example, removing an if wrapper but leaving the break outside the braces.

Flagged example:

```js
switch (foo) {
  case 1:
    {
      doStuff();
    }
    break;
}
```

Accepted example:

```js
switch (foo) {
  case 1: {
    doStuff();
    break;
  }
}
```

#### [ ] `unicorn/text-encoding-identifier-case`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/text-encoding-identifier-case.html
- What it does: This rule enforces consistent casing for text encoding identifiers, specifically:
- Covers: Inconsistent casing of encoding identifiers reduces code readability and can lead to subtle confusion across a codebase. Although casing is not strictly enforced by ECMAScript or Node.js, using lowercase is the conventional and widely recognized style.

Flagged example:

```javascript
import fs from "node:fs/promises";
async function bad() {
  await fs.readFile(file, "UTF-8");
  await fs.readFile(file, "ASCII");
  const string = buffer.toString("utf-8");
}
```

Accepted example:

```javascript
import fs from "node:fs/promises";
async function good() {
  await fs.readFile(file, "utf8");
  await fs.readFile(file, "ascii");
  const string = buffer.toString("utf8");
}
```

#### [ ] `unicorn/throw-new-error`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/throw-new-error.html
- What it does: This rule makes sure you always use new when throwing an error.
- Covers: In JavaScript, omitting new (e.g., throw Error('message')) is allowed, but it does not properly initialize the error object. This can lead to missing stack traces or incorrect prototype chains. Using new makes the intent clear, ensures consistent behavior, and helps avoid subtle bugs.

Flagged example:

```javascript
throw Error("🦄");
throw TypeError("unicorn");
throw lib.TypeError("unicorn");
const e = Error("message");
```

Accepted example:

```javascript
throw new Error("🦄");
throw new TypeError("unicorn");
throw new lib.TypeError("unicorn");
const e = new Error("message");
```

### pedantic

#### [ ] `unicorn/consistent-assert`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.16.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-assert.html
- What it does: Enforces consistent usage of the assert module.
- Covers: Inconsistent usage of the assert module can make code harder to follow and understand.

Flagged example:

```js
import assert from "node:assert";

assert(divide(10, 2) === 5);
```

Accepted example:

```js
import assert from "node:assert";

assert.ok(divide(10, 2) === 5);
```

#### [ ] `unicorn/consistent-empty-array-spread`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.10.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-empty-array-spread.html
- What it does: When spreading a ternary in an array, we can use both [] and '' as fallbacks, but it's better to have consistent types in both branches.
- Covers: Having consistent types in both branches makes the code easier to read and understand.

Flagged example:

```javascript
const array = [a, ...(foo ? [b, c] : "")];

const array = [a, ...(foo ? "bc" : [])];
```

Accepted example:

```javascript
const array = [a, ...(foo ? [b, c] : [])];

const array = [a, ...(foo ? "bc" : "")];
```

#### [ ] `unicorn/escape-case`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/escape-case.html
- What it does: Enforces defining escape sequence values with uppercase characters rather than lowercase ones. This promotes readability by making the escaped value more distinguishable from the identifier.
- Covers: Using lowercase characters in escape sequences makes them less readable and harder to distinguish from surrounding code. Most style guides recommend uppercase for consistency and clarity.

Flagged example:

```javascript
const foo = "\xa9";
const foo = "\ud834";
const foo = "\u{1d306}";
const foo = "\ca";
```

Accepted example:

```javascript
const foo = "\xA9";
const foo = "\uD834";
const foo = "\u{1D306}";
const foo = "\cA";
```

#### [ ] `unicorn/explicit-length-check`

- Category: pedantic
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/explicit-length-check.html
- What it does: Enforce explicitly comparing the length or size property of a value.
- Covers: Using the explicit length or size properties can help make code clearer and easier to understand, as it avoids relying on implicit truthy/falsy evaluations.

Flagged example:

```javascript
const isEmpty = foo.length == 0;
const isEmpty = foo.length < 1;
const isEmpty = 0 === foo.length;
const isEmpty = 0 == foo.length;
const isEmpty = 1 > foo.length;

const isEmpty = !foo.length;
const isEmpty = !(foo.length > 0);
const isEmptySet = !foo.size;
```

Accepted example:

```javascript
const isEmpty = foo.length === 0;

if (foo.length > 0 || bar.length > 0) {
}

const unicorn = foo.length > 0 ? 1 : 2;
```

#### [ ] `unicorn/new-for-builtins`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/new-for-builtins.html
- What it does: Enforces the use of new for the following builtins: Object, Array, ArrayBuffer, BigInt64Array, BigUint64Array, DataView, Date, Error, Float32Array, Float64Array, Function, Int8Array, Int16Array, Int32Array, Map, WeakMap, Set, WeakSet, Promise, RegExp, Uint8Array, Uint16Array, Uint32Array, Uint8ClampedArray, SharedArrayBuffer, Proxy, WeakRef, FinalizationRegistry.
- Covers: Using new inconsistently can cause confusion. Constructors like Array and RegExp should always use new to ensure the expected instance type. Meanwhile, String, Number, Boolean, Symbol, and BigInt should not use new, as they create object wrappers instead of primitive values.

Flagged example:

```javascript
const foo = new String("hello world");
const bar = Array(1, 2, 3);
```

Accepted example:

```javascript
const foo = String("hello world");
const bar = new Array(1, 2, 3);
```

#### [ ] `unicorn/no-array-callback-reference`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.19.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-callback-reference.html
- What it does: Prevents passing a function reference directly to iterator methods.
- Covers: Passing functions to iterator methods can cause issues when the function is changed without realizing that the iterator passes 2 more parameters to it (index and array). This can lead to unexpected behavior when the function signature changes.

Flagged example:

```js
const foo = array.map(callback);
array.forEach(callback);
const result = array.filter(lib.method);
```

Accepted example:

```js
const foo = array.map((element) => callback(element));
array.forEach((element) => {
  callback(element);
});
const result = array.filter((element) => lib.method(element));

// Built-in functions are allowed
const foo = array.map(String);
const bar = array.filter(Boolean);
```

#### [ ] `unicorn/no-hex-escape`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-hex-escape.html
- What it does: Enforces a convention of using Unicode escapes instead of hexadecimal escapes for consistency and clarity.
- Covers: Using hexadecimal escapes can be less readable and harder to understand when compared to Unicode escapes.

Flagged example:

```javascript
const foo = "\x1B";
const foo = `\x1B${bar}`;
```

Accepted example:

```javascript
const foo = "\u001B";
const foo = `\u001B${bar}`;
```

#### [ ] `unicorn/no-immediate-mutation`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.35.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-immediate-mutation.html
- What it does: Disallows mutating a variable immediately after initialization.
- Covers: When you initialize a variable and immediately mutate it, it's cleaner to include the mutation in the initialization. This makes the code more readable and reduces the number of statements.

Flagged example:

```js
const array = [1, 2];
array.push(3);

const object = { foo: 1 };
object.bar = 2;

const set = new Set([1, 2]);
set.add(3);

const map = new Map([["foo", 1]]);
// ...
```

Accepted example:

```js
const array = [1, 2, 3];

const object = { foo: 1, bar: 2 };

const set = new Set([1, 2, 3]);

const map = new Map([
  ["foo", 1],
  ["bar", 2],
]);
```

#### [ ] `unicorn/no-instanceof-array`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-instanceof-array.html
- What it does: Require Array.isArray() instead of instanceof Array.
- Covers: The instanceof Array check doesn't work across realms/contexts. For example, frames/windows in browsers or the vm module in Node.js.

Flagged example:

```javascript
array instanceof Array;
[1, 2, 3] instanceof Array;
```

Accepted example:

```javascript
Array.isArray(array);
Array.isArray([1, 2, 3]);
```

#### [ ] `unicorn/no-lonely-if`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-lonely-if.html
- What it does: Disallow if statements as the only statement in if blocks without else.
- Covers: It can be confusing to have an if statement without an else clause as the only statement in an if block.

Flagged example:

```javascript
if (foo) {
  if (bar) {
  }
}
if (foo) if (bar) baz();
```

Accepted example:

```javascript
if (foo && bar) {
}
if (foo && bar) baz();
```

#### [ ] `unicorn/no-negated-condition`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-negated-condition.html
- What it does: Disallow negated conditions.
- Covers: Negated conditions are more difficult to understand. Code can be made more readable by inverting the condition.

Flagged example:

```javascript
if (!a) {
  doSomethingC();
} else {
  doSomethingB();
}

!a ? doSomethingC() : doSomethingB();
```

Accepted example:

```javascript
if (a) {
  doSomethingB();
} else {
  doSomethingC();
}

a ? doSomethingB() : doSomethingC();
```

#### [ ] `unicorn/no-negation-in-equality-check`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.5.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-negation-in-equality-check.html
- What it does: Disallow negated expressions on the left of (in)equality checks.
- Covers: A negated expression on the left of an (in)equality check is likely a mistake from trying to negate the whole condition.

Flagged example:

```javascript
if (!foo === bar) {
}

if (!foo !== bar) {
}
```

Accepted example:

```javascript
if (foo !== bar) {
}

if (!(foo === bar)) {
}
```

#### [ ] `unicorn/no-new-buffer`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-new-buffer.html
- What it does: Disallows the deprecated new Buffer() constructor.
- Covers: Enforces the use of Buffer.from and Buffer.alloc() instead of new Buffer(), which has been deprecated since Node.js 4.

Flagged example:

```javascript
const buffer = new Buffer(10);
```

Accepted example:

```javascript
const buffer = Buffer.alloc(10);
```

#### [ ] `unicorn/no-object-as-default-parameter`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-object-as-default-parameter.html
- What it does: Disallow the use of an object literal as a default value for a parameter.
- Covers: Default parameters should not be passed to a function through an object literal. The foo = {a: false} parameter works fine if only used with one option. As soon as additional options are added, you risk replacing the whole foo = {a: false, b: true} object when passing only one option: {a: true}. For this reason, object destructuring should be used instead.

Flagged example:

```javascript
function foo(foo = { a: false }) {}
```

Accepted example:

```javascript
function foo({ a = false } = {}) {}
```

#### [ ] `unicorn/no-static-only-class`

- Category: pedantic
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-static-only-class.html
- What it does: Disallow class declarations that exclusively contain static members.
- Covers: A class with only static members should just be defined as an object instead.

Flagged example:

```javascript
class A {
  static a() {}
}
```

Accepted example:

```javascript
class A {
  static a() {}

  constructor() {}
}
```

#### [ ] `unicorn/no-this-assignment`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-this-assignment.html
- What it does: Disallow assigning this to a variable.
- Covers: Assigning this to a variable is unnecessary and confusing.

Flagged example:

```javascript
const foo = this;
class Bar {
  method() {
    foo.baz();
  }
}

new Bar().method();
```

Accepted example:

```javascript
class Bar {
  constructor(fooInstance) {
    this.fooInstance = fooInstance;
  }
  method() {
    this.fooInstance.baz();
  }
}

new Bar(this).method();
```

#### [ ] `unicorn/no-typeof-undefined`

- Category: pedantic
- Default: no
- Fix: fixable_safe_fix_or_suggestion
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-typeof-undefined.html
- What it does: Disallow typeof comparisons with undefined.
- Covers: Checking if a value is undefined by using typeof value === 'undefined' is needlessly verbose. It's generally better to compare against undefined directly. The only time typeof is needed is when a global variable potentially does not exists, in which case, using globalThis.value === undefined may be better.

Flagged example:

```javascript
typeof foo === "undefined";
```

Accepted example:

```javascript
foo === undefined;
```

#### [ ] `unicorn/no-unnecessary-array-flat-depth`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.16.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-array-flat-depth.html
- What it does: Disallows passing 1 to Array.prototype.flat.
- Covers: Passing 1 is unnecessary.

Flagged example:

```js
foo.flat(1);
```

Accepted example:

```js
foo.flat();
```

#### [ ] `unicorn/no-unnecessary-array-splice-count`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-array-splice-count.html
- What it does: Disallows passing .length or Infinity as the deleteCount or skipCount argument of Array#splice() or Array#toSpliced().
- Covers: When calling Array#splice(start, deleteCount) or Array#toSpliced(start, skipCount), omitting the deleteCount or skipCount argument will delete or skip all elements after start. Using .length or Infinity is unnecessary and makes the code more verbose.

Flagged example:

```js
array.splice(1, array.length);
array.splice(1, Infinity);
array.splice(1, Number.POSITIVE_INFINITY);
array.toSpliced(1, array.length);
```

Accepted example:

```js
array.splice(1);
array.toSpliced(1);
```

#### [ ] `unicorn/no-unnecessary-slice-end`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.16.10
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-slice-end.html
- What it does: Disallows unnecessarily passing a second argument to slice(...), for cases where it would not change the result.
- Covers: When using .slice(...) without a second argument, the second argument defaults to the object's length. As such, passing the length explicitly

Flagged example:

```js
const foo = string.slice(1, string.length);
const foo = string.slice(1, Infinity);
const foo = string.slice(1, Number.POSITIVE_INFINITY);
```

Accepted example:

```js
const foo = string.slice(1);
```

#### [ ] `unicorn/no-unreadable-iife`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unreadable-iife.html
- What it does: This rule disallows IIFEs with a parenthesized arrow function body.
- Covers: IIFEs with a parenthesized arrow function body are unreadable.

Flagged example:

```javascript
const foo = ((bar) => (bar ? bar.baz : baz))(getBar());

const foo = ((bar, baz) => ({ bar, baz }))(bar, baz);
```

Accepted example:

```javascript
const bar = getBar();
const foo = bar ? bar.baz : baz;

const getBaz = (bar) => (bar ? bar.baz : baz);
const foo = getBaz(getBar());

const foo = ((bar) => {
  return bar ? bar.baz : baz;
})(getBar());
```

#### [ ] `unicorn/no-useless-promise-resolve-reject`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-promise-resolve-reject.html
- What it does: Disallows returning values wrapped in Promise.resolve or Promise.reject in an async function or a Promise#then/catch/finally callback.
- Covers: Wrapping a return value in Promise.resolve in an async function or a Promise#then/catch/finally callback is unnecessary as all return values in async functions and promise callback functions are already wrapped in a Promise.

Flagged example:

```javascript
async () => Promise.resolve(bar);
```

Accepted example:

```javascript
async () => bar;
```

#### [ ] `unicorn/no-useless-switch-case`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-switch-case.html
- What it does: Disallows useless default cases in switch statements.
- Covers: An empty case before the last default case is useless, as the default case will catch it regardless.

Flagged example:

```javascript
switch (foo) {
  case 1:
  default:
    handleDefaultCase();
    break;
}
```

Accepted example:

```javascript
switch (foo) {
  case 1:
  case 2:
    handleCase1And2();
    break;
}
```

#### [ ] `unicorn/no-useless-undefined`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.6.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-undefined.html
- What it does: Prevents usage of undefined in cases where it would be useless.
- Covers: undefined is the default value for new variables, parameters, return statements, etc, so specifying undefined in these cases is pointless.

Flagged example:

```javascript
let foo = undefined;
const noop = () => undefined;
```

Accepted example:

```javascript
let foo;
const noop = () => {};
```

#### [ ] `unicorn/prefer-array-flat`

- Category: pedantic
- Default: no
- Fix: conditional dangerous auto-fix
- Type-aware: no
- Added: 0.0.20
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-flat.html
- What it does: Prefers Array#flat() over legacy techniques to flatten arrays.
- Covers: ES2019 introduced a new method Array#flat() that flatten arrays.

Flagged example:

```javascript
const foo = array.flatMap((x) => x);
const foo = array.reduce((a, b) => a.concat(b), []);
const foo = array.reduce((a, b) => [...a, ...b], []);
const foo = [].concat(maybeArray);
const foo = [].concat(...array);
const foo = [].concat.apply([], array);
const foo = Array.prototype.concat.apply([], array);
const foo = Array.prototype.concat.call([], maybeArray);
const foo = Array.prototype.concat.call([], ...array);
```

Accepted example:

```javascript
const foo = array.flat();
const foo = [maybeArray].flat();
```

#### [ ] `unicorn/prefer-array-some`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-some.html
- What it does: Prefers using Array#some() over Array#find(), Array#findLast() with comparing to undefined, or Array#findIndex(), Array#findLastIndex() and a non-zero length check on the result of Array#filter()
- Covers: Using .some() is more idiomatic and easier to read.

Flagged example:

```javascript
const foo = array.find(fn) ? bar : baz;
const foo = array.findLast((elem) => hasRole(elem)) !== null;
foo.findIndex(bar) < 0;
foo.findIndex((element) => element.bar === 1) !== -1;
foo.findLastIndex((element) => element.bar === 1) !== -1;
array.filter(fn).length === 0;
```

Accepted example:

```javascript
const foo = array.some(fn) ? bar : baz;
foo.some((element) => element.bar === 1);
!array.some(fn);
```

#### [ ] `unicorn/prefer-at`

- Category: pedantic
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-at.html
- What it does: Prefer the Array#at() and String#at() methods for index access.
- Covers: The .at() method is more readable and consistent for accessing elements by index, especially for negative indices which access elements from the end of the array or string.

Flagged example:

```js
const foo = array[array.length - 1];
const foo = array.slice(-1)[0];
const foo = string.charAt(string.length - 1);
```

Accepted example:

```js
const foo = array.at(-1);
const foo = array.at(-5);
const foo = string.at(-1);
```

#### [ ] `unicorn/prefer-blob-reading-methods`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-blob-reading-methods.html
- What it does: Recommends using Blob#text() and Blob#arrayBuffer() over FileReader#readAsText() and FileReader#readAsArrayBuffer().
- Covers: FileReader predates promises, and the newer Blob#arrayBuffer() and Blob#text() methods are much cleaner and easier to use.

Flagged example:

```javascript
async function bad() {
  const arrayBuffer = await new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      resolve(fileReader.result);
    });
    fileReader.addEventListener("error", () => {
      reject(fileReader.error);
    });
    fileReader.readAsArrayBuffer(blob);
// ...
```

Accepted example:

```javascript
async function good() {
  const arrayBuffer = await blob.arrayBuffer();
}
```

#### [ ] `unicorn/prefer-code-point`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-code-point.html
- What it does: Prefer usage of String#codePointAt over String#charCodeAt. Prefer usage of String.fromCodePoint over String.fromCharCode.
- Covers: Unicode is better supported in String#codePointAt() and String.fromCodePoint().

Flagged example:

```javascript
"🦄".charCodeAt(0);
String.fromCharCode(0x1f984);
```

Accepted example:

```javascript
"🦄".codePointAt(0);
String.fromCodePoint(0x1f984);
```

#### [ ] `unicorn/prefer-date-now`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-date-now.html
- What it does: Prefers use of Date.now() over new Date().getTime() or new Date().valueOf().
- Covers: Using Date.now() is shorter and nicer than new Date().getTime(), and avoids unnecessary instantiation of Date objects.

Flagged example:

```javascript
const ts = new Date().getTime();
const ts = new Date().valueOf();
```

Accepted example:

```javascript
const ts = Date.now();
```

#### [ ] `unicorn/prefer-dom-node-append`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-append.html
- What it does: Enforces the use of, for example, document.body.append(div); over document.body.appendChild(div); for DOM nodes.
- Covers: There are some advantages of using Node#append(), like the ability to append multiple nodes and to append both DOMString and DOM node objects.

Flagged example:

```javascript
foo.appendChild(bar);
```

Accepted example:

```javascript
foo.append(bar);
```

#### [ ] `unicorn/prefer-dom-node-dataset`

- Category: pedantic
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-dataset.html
- What it does: Use .dataset on DOM elements over getAttribute(…), .setAttribute(…), .removeAttribute(…) and .hasAttribute(…).
- Covers: The dataset property is a map of strings that contains all the data-* attributes from the element. It is a convenient way to access all of them at once.

Flagged example:

```javascript
element.setAttribute("data-unicorn", "🦄");
```

Accepted example:

```javascript
element.dataset.unicorn = "🦄";
```

#### [ ] `unicorn/prefer-dom-node-remove`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-remove.html
- What it does: Prefers the use of child.remove() over parentNode.removeChild(child).
- Covers: The DOM function Node#remove() is preferred over the indirect removal of an object with Node#removeChild().

Flagged example:

```javascript
parentNode.removeChild(childNode);
```

Accepted example:

```javascript
childNode.remove();
```

#### [ ] `unicorn/prefer-event-target`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-event-target.html
- What it does: Prefers EventTarget over EventEmitter.
- Covers: While EventEmitter is only available in Node.js, EventTarget is also available in Deno and browsers.

Flagged example:

```javascript
class Foo extends EventEmitter {}
```

Accepted example:

```javascript
class Foo extends OtherClass {}
```

#### [ ] `unicorn/prefer-import-meta-properties`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-import-meta-properties.html
- What it does: Prefer import.meta.{dirname,filename} over legacy techniques for getting file paths.
- Covers: Starting with Node.js 20.11, import.meta.dirname and import.meta.filename have been introduced in ES modules. import.meta.filename is equivalent to url.fileURLToPath(import.meta.url). import.meta.dirname is equivalent to path.dirname(import.meta.filename). This rule replaces legacy patterns with import.meta.dirname and import.meta.filename.

Flagged example:

```js
import path from "node:path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileURLToPath(import.meta.url));
const dirname = path.dirname(import.meta.filename);
const dirname = fileURLToPath(new URL(".", import.meta.url));
```

Accepted example:

```js
const filename = import.meta.filename;
const dirname = import.meta.dirname;
```

#### [ ] `unicorn/prefer-math-min-max`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.10.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-math-min-max.html
- What it does: Prefers use of Math.min() and Math.max() instead of ternary expressions when performing simple comparisons.
- Covers: Using Math.min() and Math.max() for simple comparisons is more concise, easier to understand, and less prone to errors than ternary expressions. They clearly express the intent to find the minimum or maximum value.

Flagged example:

```javascript
height > 50 ? 50 : height;
height > 50 ? height : 50;
```

Accepted example:

```javascript
Math.min(height, 50);
Math.max(height, 50);
```

#### [ ] `unicorn/prefer-math-trunc`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-math-trunc.html
- What it does: Prefers use of Math.trunc() instead of bitwise operations for clarity and more reliable results.
- Covers: Using bitwise operations to truncate numbers is not clear and do not work in some cases.

Flagged example:

```javascript
const foo = 1.1 | 0;
```

Accepted example:

```javascript
const foo = Math.trunc(1.1);
```

#### [ ] `unicorn/prefer-native-coercion-functions`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-native-coercion-functions.html
- What it does: Prefers built-in functions over custom ones with the same functionality.
- Covers: If a function is equivalent to String, Number, BigInt, Boolean, or Symbol, you should use the built-in one directly. Wrapping the built-in in a function is moot.

Flagged example:

```javascript
const foo = (v) => String(v);
foo(1);
const foo = (v) => Number(v);
array.some((v) => /* comment */ v);
```

Accepted example:

```javascript
String(1);
Number(1);
array.some(Boolean);
```

#### [ ] `unicorn/prefer-number-coercion`

- Category: pedantic
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: next
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-number-coercion.html
- What it does: Prefer Number() over parseFloat() and base-10 parseInt().
- Covers: parseFloat() and parseInt() parse numeric prefixes and ignore trailing text. Number() parses the full input, which better matches intent when coercing values.

Flagged example:

```javascript
const value = parseFloat(input);
const integer = parseInt(input, 10);
```

Accepted example:

```javascript
const value = Number(input);
const integer = Math.trunc(Number(input));
```

#### [ ] `unicorn/prefer-prototype-methods`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.21
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-prototype-methods.html
- What it does: This rule prefers borrowing methods from the prototype instead of the instance.
- Covers: "Borrowing" a method from an instance of Array or Object is less clear than getting it from the corresponding prototype.

Flagged example:

```javascript
const array = [].slice.apply(bar);
const type = {}.toString.call(foo);
Reflect.apply([].forEach, arrayLike, [callback]);
```

Accepted example:

```javascript
const array = Array.prototype.slice.apply(bar);
const type = Object.prototype.toString.call(foo);
Reflect.apply(Array.prototype.forEach, arrayLike, [callback]);
const maxValue = Math.max.apply(Math, numbers);
```

#### [ ] `unicorn/prefer-query-selector`

- Category: pedantic
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-query-selector.html
- What it does: Prefer .querySelector() over .getElementById(). And prefer .querySelectorAll() over .getElementsByClassName(), .getElementsByTagName(), and .getElementsByName().
- Covers: Using .querySelector() and .querySelectorAll() is more flexible and allows for more specific selectors. It's better to use the same method to query DOM elements. This helps keep consistency and it lends itself to future improvements (e.g. more specific selectors).

Flagged example:

```javascript
document.getElementById("foo");
document.getElementsByClassName("foo bar");
document.getElementsByTagName("main");
document.getElementsByClassName(fn());
document.getElementsByName("foo");
```

Accepted example:

```javascript
document.querySelector("#foo");
document.querySelector(".bar");
document.querySelector("main #foo .bar");
document.querySelectorAll(".foo.bar");
document.querySelectorAll("li a");
document.querySelector("li").querySelectorAll("a");
```

#### [ ] `unicorn/prefer-regexp-test`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-regexp-test.html
- What it does: Prefers RegExp#test() over String#match() and String#exec().
- Covers: When you want to know whether a pattern is found in a string, use RegExp#test() instead of String#match() or RegExp#exec(), as it exclusively returns a boolean and therefore is more efficient.

Flagged example:

```javascript
if (string.match(/unicorn/)) {
}
if (/unicorn/.exec(string)) {
}
```

Accepted example:

```javascript
if (/unicorn/.test(string)) {
}
Boolean(string.match(/unicorn/));
```

#### [ ] `unicorn/prefer-single-call`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.70.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-single-call.html
- What it does: Enforces combining multiple Array#{push,unshift}(), Element#classList.{add,remove}(), and importScripts() into a single call.
- Covers: Calling the same variadic method on the same receiver multiple times consecutively can be merged into a single call, which is more concise and can be marginally more performant.

Flagged example:

```javascript
foo.push(1);
foo.push(2);

foo.unshift(1);
foo.unshift(2);

element.classList.add("foo");
element.classList.add("bar");

importScripts("foo.js");
// ...
```

Accepted example:

```javascript
foo.push(1, 2);

foo.unshift(2, 1);

element.classList.add("foo", "bar");

importScripts("foo.js", "bar.js");
```

#### [ ] `unicorn/prefer-string-replace-all`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-replace-all.html
- What it does: Prefers String#replaceAll() over String#replace() when using a regex with the global flag.
- Covers: The String#replaceAll() method is both faster and safer as you don't have to use a regex and remember to escape it if the string is not a literal. And when used with a regex, it makes the intent clearer.

Flagged example:

```js
foo.replace(/a/g, bar);
```

Accepted example:

```js
foo.replace(/a/, bar);
foo.replaceAll("a", bar);
foo.replaceAll(/a|b/g, bar);

const pattern = "not-a-regexp";
foo.replace(pattern, bar);
```

#### [ ] `unicorn/prefer-string-slice`

- Category: pedantic
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-slice.html
- What it does: Prefer String#slice() over String#substr() and String#substring().
- Covers: String#substr() and String#substring() are the two lesser known legacy ways to slice a string. It's better to use String#slice() as it's a more popular option with clearer behavior that has a consistent Array counterpart.

Flagged example:

```javascript
"foo".substr(1, 2);
```

Accepted example:

```javascript
"foo".slice(1, 2);
```

#### [ ] `unicorn/prefer-top-level-await`

- Category: pedantic
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-top-level-await.html
- What it does: Prefer top-level await over top-level promises and async function calls.
- Covers: Top-level await is more readable and can prevent unhandled rejections.

Flagged example:

```js
(async () => {
  await run();
})();

run().catch((error) => {
  console.error(error);
});
```

Accepted example:

```js
await run();

try {
  await run();
} catch (error) {
  console.error(error);
}
```

#### [ ] `unicorn/prefer-type-error`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-type-error.html
- What it does: Enforce throwing a TypeError instead of a generic Error after a type checking if-statement.
- Covers: Throwing a TypeError instead of a generic Error after a type checking if-statement is more specific and helps to catch bugs.

Flagged example:

```javascript
if (Array.isArray(foo)) {
  throw new Error("Expected foo to be an array");
}
```

Accepted example:

```javascript
if (Array.isArray(foo)) {
  throw new TypeError("Expected foo to be an array");
}
```

#### [ ] `unicorn/require-number-to-fixed-digits-argument`

- Category: pedantic
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-number-to-fixed-digits-argument.html
- What it does: Enforce using the digits argument with Number#toFixed().
- Covers: It's better to make it clear what the value of the digits argument is when calling Number#toFixed(), instead of relying on the default value of 0.

Flagged example:

```javascript
number.toFixed();
```

Accepted example:

```javascript
number.toFixed(0);
number.toFixed(2);
```

### suspicious

#### [ ] `unicorn/consistent-function-scoping`

- Category: suspicious
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.8.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-function-scoping.html
- What it does: Disallow functions that are declared in a scope which does not capture any variables from the outer scope.
- Covers: Moving function declarations to the highest possible scope improves readability, directly improves performance and allows JavaScript engines to better optimize your performance.

Flagged example:

```js
export function doFoo(foo) {
  // Does not capture anything from the scope, can be moved to the outer scope
  function doBar(bar) {
    return bar === "bar";
  }
  return doBar;
}

function doFoo(foo) {
  const doBar = (bar) => {
// ...
```

Accepted example:

```js
function doBar(bar) {
  return bar === "bar";
}

export function doFoo(foo) {
  return doBar;
}

export function doFoo(foo) {
  function doBar(bar) {
// ...
```

#### [ ] `unicorn/no-accessor-recursion`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.16.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-accessor-recursion.html
- What it does: Disallow recursive access to this within getters and setters.
- Covers: This rule prevents recursive access to this within getter and setter methods in objects and classes, avoiding infinite recursion and stack overflow errors.

Flagged example:

```js
const foo = {
  get bar() {
    return this.bar;
  },
};

const baz = {
  set bar(value) {
    this.bar = value;
  },
// ...
```

Accepted example:

```js
const foo = {
  get bar() {
    return this.qux;
  },
};

const baz = {
  set bar(value) {
    this._bar = value;
  },
// ...
```

#### [ ] `unicorn/no-array-fill-with-reference-type`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.70.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-fill-with-reference-type.html
- What it does: Disallows using reference values as Array#fill() values.
- Covers: Array#fill() reuses the same value for every array element. When the fill value is an object, array, class, or most constructed objects, all elements point at the same reference and mutating one element mutates the shared value observed by the others.

Flagged example:

```js
const rows = new Array(3).fill({});
rows[0].selected = true; // Every row now has `selected`.
```

Accepted example:

```js
const rows = Array.from({ length: 3 }, () => ({}));
```

#### [ ] `unicorn/no-array-reverse`

- Category: suspicious
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.15.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-reverse.html
- What it does: Prefer using Array#toReversed() over Array#reverse().
- Covers: Array#reverse() modifies the original array in place, which can lead to unintended side effects-especially when the original array is used elsewhere in the code.

Flagged example:

```js
const reversed = [...array].reverse();
```

Accepted example:

```js
const reversed = [...array].toReversed();
```

#### [ ] `unicorn/no-array-sort`

- Category: suspicious
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.15.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-sort.html
- What it does: Prefer using Array#toSorted() over Array#sort().
- Covers: Array#sort() modifies the original array in place, which can lead to unintended side effects-especially when the original array is used elsewhere in the code.

Flagged example:

```js
const sorted = [...array].sort();
```

Accepted example:

```js
const sorted = [...array].toSorted();
```

#### [ ] `unicorn/no-instanceof-builtins`

- Category: suspicious
- Default: no
- Fix: conditional suggestion
- Type-aware: no
- Added: 0.16.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-instanceof-builtins.html
- What it does: Disallows the use of instanceof with ECMAScript built-in constructors because:
- Covers: instanceof breaks across execution contexts (iframe, Web Worker, Node vm), and may give misleading results for subclasses or exotic objects.

Flagged example:

```javascript
if (arr instanceof Array) { … }
if (el instanceof HTMLElement) { … }
```

Accepted example:

```javascript
if (Array.isArray(arr)) { … }
if (el?.nodeType === 1) { … }
```

#### [ ] `unicorn/prefer-add-event-listener`

- Category: suspicious
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-add-event-listener.html
- What it does: Enforces the use of .addEventListener() and .removeEventListener() over their on-function counterparts.
- Covers: There are numerous advantages of using addEventListener. Some of these advantages include registering unlimited event handlers and optionally having the event handler invoked only once.

Flagged example:

```javascript
foo.onclick = () => {};
```

Accepted example:

```javascript
foo.addEventListener("click", () => {});
```

#### [ ] `unicorn/require-module-specifiers`

- Category: suspicious
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-module-specifiers.html
- What it does: Enforce a non-empty specifier list in import and export statements.
- Covers: Empty import/export specifiers add no value and can be confusing. If you want to import a module for side effects, use import 'module' instead.

Flagged example:

```js
import {} from "foo";
import foo from "foo";
export {} from "foo";
export {};
```

Accepted example:

```js
import "foo";
import foo from "foo";
```

#### [ ] `unicorn/require-post-message-target-origin`

- Category: suspicious
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.15.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-post-message-target-origin.html
- What it does: Enforce using the targetOrigin argument with window.postMessage().
- Covers: When calling window.postMessage() without the targetOrigin argument, the message cannot be received by any window.

Flagged example:

```js
window.postMessage(message);
```

Accepted example:

```js
window.postMessage(message, "https://example.com");

window.postMessage(message, "*");
```

### restriction

#### [ ] `unicorn/import-style`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/import-style.html
- What it does: Enforce specific import styles per module.
- Covers: Some modules are easier to read when imported in a consistent way. For example, utility modules often work better with named imports, while modules that expose one primary interface are clearer as default imports.

Flagged example:

```js
import util from "node:util";
```

Accepted example:

```js
import { promisify } from "node:util";
```

#### [ ] `unicorn/no-abusive-eslint-disable`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-abusive-eslint-disable.html
- What it does: Disallows oxlint-disable or eslint-disable comments without specifying rules.
- Covers: A general oxlint-disable or eslint-disable comment suppresses all lint errors, not just the intended one, potentially hiding useful warnings and making debugging harder.

Flagged example:

```javascript
/* eslint-disable */
console.log(message);

console.log(message); // eslint-disable-line

// eslint-disable-next-line
console.log(message);
```

Accepted example:

```javascript
/* eslint-disable no-console */
console.log(message);

console.log(message); // eslint-disable-line no-console

// eslint-disable-next-line no-console
console.log(message);
```

#### [ ] `unicorn/no-anonymous-default-export`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.3.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-anonymous-default-export.html
- What it does: Disallows anonymous functions and classes as default exports.
- Covers: Naming default exports improves searchability and ensures consistent identifiers for a module's default export in both declaration and import.

Flagged example:

```javascript
export default class {}
export default function () {}
export default () => {};
module.exports = class {};
module.exports = function () {};
module.exports = () => {};
```

Accepted example:

```javascript
export default class Foo {}
export default function foo () {}

const foo = () => {};
export default foo;

module.exports = class Foo {};
module.exports = function foo () {};

const foo = () => {};
// ...
```

#### [ ] `unicorn/no-array-for-each`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-for-each.html
- What it does: Forbids the use of Array#forEach in favor of a for loop.
- Covers: Benefits of for…of statement over the forEach method can include:

Flagged example:

```javascript
const foo = [1, 2, 3];
foo.forEach((element) => {
  /* ... */
});
```

Accepted example:

```javascript
const foo = [1, 2, 3];
for (const element of foo) {
  /* ... */
}
```

#### [ ] `unicorn/no-array-reduce`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-reduce.html
- What it does: Disallow Array#reduce() and Array#reduceRight().
- Covers: Array#reduce() and Array#reduceRight() usually result in hard-to-read and less performant code. In almost every case, it can be replaced by .map, .filter, or a for-of loop.

Flagged example:

```javascript
array.reduce(reducer, initialValue);
array.reduceRight(reducer, initialValue);
```

Accepted example:

```javascript
array.reduce(reducer, initialValue);
array.reduceRight(reducer, initialValue);
```

#### [ ] `unicorn/no-document-cookie`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-document-cookie.html
- What it does: Disallows direct use of document.cookie.
- Covers: It's not recommended to use document.cookie directly as it's easy to get the string wrong. Instead, you should use the Cookie Store API or a cookie library.

Flagged example:

```javascript
document.cookie =
  "foo=bar" +
  "; Path=/" +
  "; Domain=example.com" +
  "; expires=Fri, 31 Dec 9999 23:59:59 GMT" +
  "; Secure";
```

Accepted example:

```javascript
async function storeCookies() {
  await cookieStore.set({
    name: "foo",
    value: "bar",
    expires: Date.now() + 24 * 60 * 60 * 1000,
    domain: "example.com",
  });
}
```

#### [ ] `unicorn/no-length-as-slice-end`

- Category: restriction
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-length-as-slice-end.html
- What it does: Disallow using length as the end argument of a slice call.
- Covers: Passing length as the end argument of a slice call is unnecessary and can be confusing.

Flagged example:

```javascript
foo.slice(1, foo.length);
```

Accepted example:

```javascript
foo.slice(1);
```

#### [ ] `unicorn/no-magic-array-flat-depth`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-magic-array-flat-depth.html
- What it does: Disallow magic numbers for Array.prototype.flat depth.
- Covers: Magic numbers are hard to understand and maintain. When calling Array.prototype.flat, it is usually called with 1 or Infinity. If you are using a different number, it is better to add a comment explaining the reason for the depth provided.

Flagged example:

```javascript
array.flat(2);
array.flat(20);
```

Accepted example:

```javascript
array.flat(2 /* explanation */);
array.flat(1);
array.flat();
array.flat(Infinity);
```

#### [ ] `unicorn/no-process-exit`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.2.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-process-exit.html
- What it does: Disallow all usage of process.exit().
- Covers: process.exit() should generally only be used in command-line utilities. In all other types of applications, the code should throw an error instead.

Flagged example:

```javascript
if (problem) {
  process.exit(1);
}
```

Accepted example:

```javascript
if (problem) {
  throw new Error("message");
}
```

#### [ ] `unicorn/no-useless-error-capture-stack-trace`

- Category: restriction
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-error-capture-stack-trace.html
- What it does: Disallows unnecessary Error.captureStackTrace(…) in error constructors.
- Covers: Calling Error.captureStackTrace(…) inside the constructor of a built-in Error subclass is unnecessary, since the Error constructor calls it automatically.

Flagged example:

```js
class MyError extends Error {
  constructor() {
    Error.captureStackTrace(this, MyError);
  }
}
```

Accepted example:

```js
class MyError extends Error {
  constructor() {
    // No need to call Error.captureStackTrace
  }
}
```

#### [ ] `unicorn/prefer-modern-math-apis`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.1.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-modern-math-apis.html
- What it does: Checks for usage of legacy patterns for mathematical operations.
- Covers: Modern JavaScript provides more concise and readable alternatives to legacy patterns.

Flagged example:

```javascript
Math.log(x) * Math.LOG10E;
Math.sqrt(a * a + b * b);
```

Accepted example:

```javascript
Math.log10(x);
Math.hypot(a, b);
```

#### [ ] `unicorn/prefer-module`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.50.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-module.html
- What it does: Prefer JavaScript modules (ESM) over CommonJS.
- Covers: CommonJS globals and patterns (require, module, exports, __filename, __dirname) make code harder to migrate and can block ESM-only features.

Flagged example:

```js
"use strict";
const foo = require("foo");
module.exports = foo;
```

Accepted example:

```js
import foo from "foo";
export default foo;
```

#### [ ] `unicorn/prefer-node-protocol`

- Category: restriction
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-node-protocol.html
- What it does: Prefer using the node: protocol when importing Node.js built-in modules.
- Covers: Node.js built-in modules should be imported using the node: protocol to avoid ambiguity with local modules.

Flagged example:

```javascript
import fs from "fs";
```

Accepted example:

```javascript
import fs from "node:fs";
```

#### [ ] `unicorn/prefer-number-properties`

- Category: restriction
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-number-properties.html
- What it does: Disallows use of parseInt(), parseFloat(), isNaN(), isFinite(), NaN, Infinity and -Infinity as global variables.
- Covers: ECMAScript 2015 moved globals onto the Number constructor for consistency and to slightly improve them. This rule enforces their usage to limit the usage of globals:

Flagged example:

```javascript
const foo = parseInt("10", 2);
const bar = parseFloat("10.5");
```

Accepted example:

```javascript
const foo = Number.parseInt("10", 2);
const bar = Number.parseFloat("10.5");
```

### correctness

#### [ ] `unicorn/no-await-in-promise-methods`

- Category: correctness
- Default: yes
- Fix: suggestion
- Type-aware: no
- Added: 0.2.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-await-in-promise-methods.html
- What it does: Disallow using await in Promise method parameters.
- Covers: Using await on promises passed as arguments to Promise.all(), Promise.allSettled(), Promise.any(), or Promise.race() is likely a mistake.

Flagged example:

```javascript
async function foo() {
  Promise.all([await promise, anotherPromise]);
  Promise.allSettled([await promise, anotherPromise]);
  Promise.any([await promise, anotherPromise]);
  Promise.race([await promise, anotherPromise]);
}
```

Accepted example:

```javascript
async function foo() {
  Promise.all([promise, anotherPromise]);
  Promise.allSettled([promise, anotherPromise]);
  Promise.any([promise, anotherPromise]);
  Promise.race([promise, anotherPromise]);
}
```

#### [ ] `unicorn/no-empty-file`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-empty-file.html
- What it does: Disallows files that do not contain any meaningful code.
- Covers: Files with no executable or exportable content are typically unintentional or left over from refactoring. They clutter the codebase and may confuse tooling or developers by appearing to serve a purpose when they do not.

Flagged example:

```js

```

Accepted example:

```js
const x = 0;
```

#### [ ] `unicorn/no-invalid-fetch-options`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.15.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-invalid-fetch-options.html
- What it does: Disallow invalid options in fetch() and new Request(). Specifically, this rule ensures that a body is not provided when the method is GET or HEAD, as it will result in a TypeError.
- Covers: The fetch() function throws a TypeError when the method is GET or HEAD and a body is provided. This can lead to unexpected behavior and errors in your code. By disallowing such invalid options, the rule ensures that requests are correctly configured and prevents unnecessary errors.

Flagged example:

```javascript
const response = await fetch("/", { method: "GET", body: "foo=bar" });

const request = new Request("/", { method: "GET", body: "foo=bar" });
```

Accepted example:

```javascript
const response = await fetch("/", { method: "POST", body: "foo=bar" });

const request = new Request("/", { method: "POST", body: "foo=bar" });
```

#### [ ] `unicorn/no-invalid-remove-event-listener`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-invalid-remove-event-listener.html
- What it does: It warns when you use a non-function value as the second argument of removeEventListener.
- Covers: The removeEventListener function must be called with a reference to the same function that was passed to addEventListener. Calling removeEventListener with an inline function or the result of an inline .bind() call is indicative of an error, and won't actually remove the listener.

Flagged example:

```javascript
el.removeEventListener("click", () => {});
el.removeEventListener("click", function () {});
```

Accepted example:

```javascript
el.removeEventListener("click", handler);
el.removeEventListener("click", handler.bind(this));
```

#### [ ] `unicorn/no-new-array`

- Category: correctness
- Default: yes
- Fix: dangerous suggestion
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-new-array.html
- What it does: Disallow new Array().
- Covers: When using the Array constructor with one argument, it's not clear whether the argument is meant to be the length of the array or the only element.

Flagged example:

```javascript
const array = new Array(1);
const array = new Array(42);
const array = new Array(foo);
```

Accepted example:

```javascript
const array = Array.from({ length: 42 });
const array = [42];
```

#### [ ] `unicorn/no-single-promise-in-promise-methods`

- Category: correctness
- Default: yes
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.2.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-single-promise-in-promise-methods.html
- What it does: Disallow passing single-element arrays to Promise methods.
- Covers: Passing a single-element array to Promise.all(), Promise.any(), or Promise.race() is likely a mistake.

Flagged example:

```javascript
async function bad() {
  const foo = await Promise.all([promise]);
  const foo = await Promise.any([promise]);
  const foo = await Promise.race([promise]);
  const promise = Promise.all([nonPromise]);
}
```

Accepted example:

```javascript
async function good() {
  const foo = await promise;
  const promise = Promise.resolve(nonPromise);
  const foo = await Promise.all(promises);
  const foo = await Promise.any([promise, anotherPromise]);
  const [{ value: foo, reason: error }] = await Promise.allSettled([promise]);
}
```

#### [ ] `unicorn/no-thenable`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-thenable.html
- What it does: Disallow defining a then property.
- Covers: If an object is defined as "thenable", once it's accidentally used in an await expression, it may cause problems.

Flagged example:

```javascript
async function example() {
  const foo = {
    unicorn: 1,
    then() {},
  };

  const { unicorn } = await foo;

  console.log("after"); // <- This will never execute
}
```

Accepted example:

```javascript
async function example() {
  const foo = {
    unicorn: 1,
    bar() {},
  };

  const { unicorn } = await foo;

  console.log("after");
}
```

#### [ ] `unicorn/no-unnecessary-await`

- Category: correctness
- Default: yes
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-await.html
- What it does: Disallow awaiting on non-promise values.
- Covers: The await operator should only be used on Promise values.

Flagged example:

```javascript
async function bad() {
  await await promise;
}
```

Accepted example:

```javascript
async function bad() {
  await promise;
}
```

#### [ ] `unicorn/no-useless-fallback-in-spread`

- Category: correctness
- Default: yes
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-fallback-in-spread.html
- What it does: Disallow useless fallback when spreading in object literals.
- Covers: Spreading falsy values in object literals won't add any unexpected properties, so it's unnecessary to add an empty object as fallback.

Flagged example:

```javascript
const object = { ...(foo || {}) };
```

Accepted example:

```javascript
const object = { ...foo };
const object = { ...(foo || { not: "empty" }) };
```

#### [ ] `unicorn/no-useless-length-check`

- Category: correctness
- Default: yes
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-length-check.html
- What it does: It checks for an unnecessary array length check in a logical expression.
- Covers: An extra unnecessary length check is done.

Flagged example:

```javascript
if (array.length === 0 || array.every(Boolean)) {
  // do something!
}
```

Accepted example:

```javascript
if (array.every(Boolean)) {
  // do something!
}
```

#### [ ] `unicorn/no-useless-spread`

- Category: correctness
- Default: yes
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-spread.html
- What it does: Disallows using spread syntax in following, unnecessary cases:
- Covers: The following builtins accept an iterable, so it's unnecessary to convert the iterable to an array:

Flagged example:

```javascript
const array = [firstElement, ...[secondElement], thirdElement];

await Promise.all([...iterable]);

for (const foo of [...set]);

function* foo() {
  yield* [...anotherGenerator()];
}

// ...
```

Accepted example:

```javascript
const array = [firstElement, secondElement, thirdElement];

await Promise.all(iterable);

for (const foo of set);

function* foo() {
  yield* anotherGenerator();
}

// ...
```

#### [ ] `unicorn/prefer-set-size`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.19
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-set-size.html
- What it does: Prefer Set#size over Set#length when the Set is converted to an array.
- Covers: Using Set#size is more readable and performant.

Flagged example:

```javascript
const length = [...new Set([1, 2, 3])].length;
```

Accepted example:

```javascript
const size = new Set([1, 2, 3]).size;
```

#### [ ] `unicorn/prefer-string-starts-ends-with`

- Category: correctness
- Default: yes
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-starts-ends-with.html
- What it does: Prefer String#startsWith() and String#endsWith() over using a regex with /^foo/ or /foo$/.
- Covers: Using String#startsWith() and String#endsWith() is more readable and performant as it does not need to parse a regex.

Flagged example:

```javascript
const foo = "hello";
/^abc/.test(foo);
```

Accepted example:

```javascript
const foo = "hello";
foo.startsWith("abc");
```

### nursery

#### [ ] `unicorn/no-useless-iterator-to-array`

- Category: nursery
- Default: no
- Fix: fixable_safe_fix_or_suggestion
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-iterator-to-array.html
- What it does: Disallow unnecessary .toArray() on iterators.
- Covers: Iterator.prototype.toArray() converts an iterator to an array. However, this conversion is unnecessary in many cases:

Flagged example:

```js
const set = new Set(iterator.toArray());

const results = await Promise.all(iterator.toArray());

for (const item of iterator.toArray());

function* foo() {
  yield* iterator.toArray();
}

// ...
```

Accepted example:

```js
const set = new Set(iterator);

const results = await Promise.all(iterator);

for (const item of iterator);

function * foo() {
	yield * iterator;
}

// ...
```

### perf

#### [ ] `unicorn/prefer-array-find`

- Category: perf
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 0.16.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-find.html
- What it does: Encourages using Array.prototype.find instead of filter(...)[0] or similar patterns when only the first matching element is needed.
- Covers: Using filter(...)[0] to get the first match is less efficient and more verbose than using find(...). find short-circuits when a match is found, whereas filter evaluates the entire array.

Flagged example:

```js
const match = users.filter((u) => u.id === id)[0];
const match = users.filter(fn).shift();
```

Accepted example:

```js
const match = users.find((u) => u.id === id);
const match = users.find(fn);
```

#### [ ] `unicorn/prefer-array-flat-map`

- Category: perf
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-flat-map.html
- What it does: Prefers the use of .flatMap() when map().flat() are used together.
- Covers: It is slightly more efficient to use .flatMap(…) instead of .map(…).flat().

Flagged example:

```javascript
const bar = [1, 2, 3].map((i) => [i]).flat();
```

Accepted example:

```javascript
const bar = [1, 2, 3].flatMap((i) => [i]);
```

#### [ ] `unicorn/prefer-set-has`

- Category: perf
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 0.13.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-set-has.html
- What it does: Prefer Set#has() over Array#includes() when checking for existence or non-existence.
- Covers: Set#has() is faster than Array#includes().

Flagged example:

```js
const array = [1, 2, 3];
const hasValue = (value) => array.includes(value);
```

Accepted example:

```js
const set = new Set([1, 2, 3]);
const hasValue = (value) => set.has(value);
```

## vitest

### style

#### [ ] `vitest/consistent-each-for`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.39.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-each-for.html
- What it does: This rule enforces consistency in which method is used to create parameterized tests. This configuration affects different test function types (test, it, describe, suite).
- Covers: Without a consistent way to create parameterized tests, we rely on the developer to remember that .for spreads the values as different arguments while .each passes the array as a single argument.

Flagged example:

```js
// { test: 'for' }
test.each([[1, 1, 2]])("test", (a, b, expected) => {
  expect(a + b).toBe(expected);
});

// { describe: 'for' }
describe.each([[1], [2]])("suite %s", (n) => {
  test("test", () => {});
});
```

Accepted example:

```js
// { test: 'for' }
test.for([[1, 1, 2]])("test", ([a, b, expected]) => {
  expect(a + b).toBe(expected);
});

// { describe: 'for' }
describe.for([[1], [2]])("suite %s", ([n]) => {
  test("test", () => {});
});
```

#### [ ] `vitest/consistent-test-filename`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.36.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-test-filename.html
- What it does: This rule triggers an error when a file is considered a test file, but its name does not match an expected filename format.
- Covers: Files that are tests but with an unexpected filename make it hard to distinguish between source code files and test files.

Example signal: Covers consistent test filename concerns.

#### [ ] `vitest/consistent-test-it`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.5.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-test-it.html
- What it does: Vitest allows you to choose how you want to define your tests, using the it or the test keywords, with multiple permutations for each:
- Covers: It's a good practice to be consistent in your test suite, so that all tests are written in the same way.

Example signal: Covers consistent test it concerns.

#### [ ] `vitest/consistent-vitest-vi`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.37.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-vitest-vi.html
- What it does: This rule triggers an error when an unexpected Vitest accessor is used.
- Covers: Not having a consistent vitest accessor can lead to confusion when vi and vitest are used interchangeably.

Flagged example:

```js
vitest.mock("./src/calculator.ts", { spy: true });

vi.stubEnv("NODE_ENV", "production");
```

Accepted example:

```js
vi.mock("./src/calculator.ts", { spy: true });

vi.stubEnv("NODE_ENV", "production");
```

#### [ ] `vitest/max-expects`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.18
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/max-expects.html
- What it does: This rule enforces a maximum number of expect() calls in a single test.
- Covers: Tests with many different assertions are likely mixing multiple objectives. It is generally better to have a single objective per test to ensure that when a test fails, the problem is easy to identify.

Flagged example:

```javascript
test("should not pass", () => {
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
});

it("should not pass", () => {
// ...
```

Accepted example:

```javascript
test("should not pass", () => {
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
});

it("should not pass", () => {
// ...
```

#### [ ] `vitest/max-nested-describe`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.4
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/max-nested-describe.html
- What it does: This rule enforces a maximum depth to nested describe() calls.
- Covers: Nesting describe() blocks too deeply can make the test suite hard to read and understand.

Flagged example:

```javascript
describe("foo", () => {
  describe("bar", () => {
    describe("baz", () => {
      describe("qux", () => {
        describe("quxx", () => {
          describe("too many", () => {
            it("should get something", () => {
              expect(getSomething()).toBe("Something");
            });
          });
// ...
```

Accepted example:

```ts
describe("foo", () => {
  describe("bar", () => {
    it("should get something", () => {
      expect(getSomething()).toBe("Something");
    });
  });
  describe("qux", () => {
    it("should get something", () => {
      expect(getSomething()).toBe("Something");
    });
// ...
```

#### [ ] `vitest/no-alias-methods`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-alias-methods.html
- What it does: Enforces Vitest's canonical matcher names instead of aliases.
- Covers: Vitest matcher aliases are discouraged because they make matcher usage inconsistent. This rule makes it easier to search for all occurrences of a matcher and ensures consistency among matcher names.

Flagged example:

```javascript
expect(a).toBeCalled();
expect(a).toBeCalledTimes();
expect(a).toBeCalledWith();
expect(a).lastCalledWith();
expect(a).nthCalledWith();
expect(a).toReturn();
expect(a).toReturnTimes();
expect(a).toReturnWith();
expect(a).lastReturnedWith();
expect(a).nthReturnedWith();
// ...
```

Accepted example:

```javascript
expect(a).toHaveBeenCalled();
expect(a).toHaveBeenCalledTimes();
expect(a).toHaveBeenCalledWith();
expect(a).toHaveBeenLastCalledWith();
expect(a).toHaveBeenNthCalledWith();
expect(a).toHaveReturned();
expect(a).toHaveReturnedTimes();
expect(a).toHaveReturnedWith();
expect(a).toHaveLastReturnedWith();
expect(a).toHaveNthReturnedWith();
// ...
```

#### [ ] `vitest/no-duplicate-hooks`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-duplicate-hooks.html
- What it does: Disallows duplicate hooks in describe blocks.
- Covers: Having duplicate hooks in a describe block can lead to confusion and unexpected behavior. When multiple hooks of the same type exist, they all execute in order, which can make it difficult to understand the test setup flow and may result in redundant or conflicting operations. This makes tests harder to maintain and debug.

Flagged example:

```javascript
describe("foo", () => {
  beforeEach(() => {
    // some setup
  });
  beforeEach(() => {
    // some setup
  });
  test("foo_test", () => {
    // some test
  });
// ...
```

Accepted example:

```javascript
describe("foo", () => {
  beforeEach(() => {
    // some setup
  });
  test("foo_test", () => {
    // some test
  });
});

// Nested describe scenario
// ...
```

#### [ ] `vitest/no-hooks`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-hooks.html
- What it does: Disallows Jest setup and teardown hooks, such as beforeAll.
- Covers: Jest provides global functions for setup and teardown tasks, which are called before/after each test case and each test suite. The use of these hooks promotes shared state between tests.

Flagged example:

```javascript
function setupFoo(options) {
  /* ... */
}
function setupBar(options) {
  /* ... */
}

describe("foo", () => {
  let foo;
  beforeEach(() => {
// ...
```

Accepted example:

```javascript
function setupFoo(options) {
  /* ... */
}
function setupBar(options) {
  /* ... */
}

describe("foo", () => {
  let foo;
  beforeEach(() => {
// ...
```

#### [ ] `vitest/no-identical-title`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-identical-title.html
- What it does: This rule looks at the title of every test and test suite. It will report when two test suites or two test cases at the same level of a test suite have the same title.
- Covers: Having identical titles for two different tests or test suites may create confusion. For example, when a test with the same title as another test in the same test suite fails, it is harder to know which one failed and thus harder to fix.

Flagged example:

```javascript
describe("baz", () => {
  //...
});

describe("baz", () => {
  // Has the same title as a previous test suite
  // ...
});
```

Accepted example:

```javascript
describe("baz", () => {
  //...
});

describe("baz", () => {
  // Has the same title as a previous test suite
  // ...
});
```

#### [ ] `vitest/no-import-node-test`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.7.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-import-node-test.html
- What it does: This rule warns when node:test is imported (usually accidentally). With --fix, it will replace the import with vitest.
- Covers: Using node:test instead of vitest can lead to inconsistent test results and missing features. vitest should be used for all testing to ensure compatibility and access to its full functionality.

Flagged example:

```javascript
import { test } from "node:test";
import { expect } from "vitest";

test("foo", () => {
  expect(1).toBe(1);
});
```

Accepted example:

```javascript
import { test, expect } from "vitest";

test("foo", () => {
  expect(1).toBe(1);
});
```

#### [ ] `vitest/no-importing-vitest-globals`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-importing-vitest-globals.html
- What it does: The rule disallows importing any Vitest global functions.
- Covers: If a project is configured to provide Vitest functions as globals, this rule can be used to ensure that the globals are never imported via import or require.

Flagged example:

```js
import { test, expect } from "vitest";

test("foo", () => {
  expect(1).toBe(1);
});
```

Accepted example:

```js
test("foo", () => {
  expect(1).toBe(1);
});
```

#### [ ] `vitest/no-interpolation-in-snapshots`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-interpolation-in-snapshots.html
- What it does: Prevents the use of string interpolations in snapshots.
- Covers: Interpolation prevents snapshots from being updated. Instead, properties should be overloaded with a matcher by using property matchers.

Flagged example:

```javascript
expect(something).toMatchInlineSnapshot(
  `Object {
    property: ${interpolated}
  }`,
);

expect(something).toMatchInlineSnapshot(
  { other: expect.any(Number) },
  `Object {
    other: Any<Number>,
// ...
```

Accepted example:

```javascript
expect(something).toMatchInlineSnapshot(
  `Object {
    property: ${interpolated}
  }`,
);

expect(something).toMatchInlineSnapshot(
  { other: expect.any(Number) },
  `Object {
    other: Any<Number>,
// ...
```

#### [ ] `vitest/no-large-snapshots`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-large-snapshots.html
- What it does: Disallow large snapshots.
- Covers: When using Jest's snapshot capability one should be mindful of the size of created snapshots. As a general best practice snapshots should be limited in size in order to be more manageable and reviewable. A stored snapshot is only as good as its review and as such keeping it short, sweet, and readable is important to allow for thorough reviews.

Flagged example:

```javascript
exports[`a large snapshot 1`] = `
line 1
line 2
line 3
line 4
line 5
line 6
line 7
line 8
line 9
// ...
```

Accepted example:

```javascript
exports[`a large snapshot 1`] = `
line 1
line 2
line 3
line 4
line 5
line 6
line 7
line 8
line 9
// ...
```

#### [ ] `vitest/no-mocks-import`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-mocks-import.html
- What it does: This rule reports imports from a path containing a __mocks__ component.
- Covers: Manually importing mocks from a __mocks__ directory can lead to unexpected behavior and breaks Jest's automatic mocking system. Jest is designed to automatically resolve and use mocks from __mocks__ directories when jest.mock() is called. Directly importing from these directories bypasses Jest's module resolution system and can cause inconsistencies between test and production environments.

Flagged example:

```ts
import thing from "./__mocks__/index";
require("./__mocks__/index");
```

Accepted example:

```ts
import thing from "thing";
require("thing");
```

#### [ ] `vitest/no-restricted-matchers`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-restricted-matchers.html
- What it does: Ban specific matchers & modifiers from being used, and can suggest alternatives.
- Covers: Some matchers or modifiers might be discouraged in your codebase for various reasons: they might be deprecated, cause confusion, have performance implications, or there might be better alternatives available. This rule allows you to enforce consistent testing patterns by restricting certain Jest matchers and providing guidance on preferred alternatives.

Flagged example:

```javascript
it("is false", () => {
  // if this has a modifier (i.e. `not.toBeFalsy`), it would be considered fine
  expect(a).toBeFalsy();
});

it("resolves", async () => {
  // all uses of this modifier are disallowed, regardless of matcher
  await expect(myPromise()).resolves.toBe(true);
});

// ...
```

Accepted example:

```javascript
it("is false", () => {
  // if this has a modifier (i.e. `not.toBeFalsy`), it would be considered fine
  expect(a).toBeFalsy();
});

it("resolves", async () => {
  // all uses of this modifier are disallowed, regardless of matcher
  await expect(myPromise()).resolves.toBe(true);
});

// ...
```

#### [ ] `vitest/no-restricted-vi-methods`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.3
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-restricted-vi-methods.html
- What it does: Restrict the use of specific jest and vi methods.
- Covers: Certain Jest or Vitest methods may be deprecated, discouraged in specific contexts, or incompatible with your testing environment. Restricting them helps maintain consistent and reliable test practices.

Flagged example:

```javascript
jest.useFakeTimers();
it("calls the callback after 1 second via advanceTimersByTime", () => {
  // ...

  jest.advanceTimersByTime(1000);

  // ...
});

test("plays video", () => {
// ...
```

Accepted example:

```javascript
jest.useFakeTimers();
it("calls the callback after 1 second via advanceTimersByTime", () => {
  // ...

  jest.advanceTimersByTime(1000);

  // ...
});

test("plays video", () => {
// ...
```

#### [ ] `vitest/no-test-prefixes`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-test-prefixes.html
- What it does: Require using .only and .skip over f and x.
- Covers: Jest allows you to choose how you want to define focused and skipped tests, with multiple permutations for each:

Flagged example:

```javascript
fit("foo"); // invalid
fdescribe("foo"); // invalid
xit("foo"); // invalid
xtest("foo"); // invalid
xdescribe("foo"); // invalid
```

Accepted example:

```javascript
fit("foo"); // invalid
fdescribe("foo"); // invalid
xit("foo"); // invalid
xtest("foo"); // invalid
xdescribe("foo"); // invalid
```

#### [ ] `vitest/no-test-return-statement`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-test-return-statement.html
- What it does: Disallow explicitly returning from tests.
- Covers: Tests in Jest should be void and not return values. If you are returning Promises then you should update the test to use async/await.

Flagged example:

```javascript
test("one", () => {
  return expect(1).toBe(1);
});
```

Accepted example:

```javascript
test("one", () => {
  expect(1).toBe(1);
});
```

#### [ ] `vitest/no-unneeded-async-expect-function`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.39.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-unneeded-async-expect-function.html
- What it does: Disallows unnecessary async function wrapper for expected promises.
- Covers: When the only statement inside an async wrapper is await someCall(), the call should be passed directly to expect instead. This makes the test code more concise and easier to read.

Flagged example:

```js
await expect(async () => {
  await doSomethingAsync();
}).rejects.toThrow();

await expect(async () => await doSomethingAsync()).rejects.toThrow();
```

Accepted example:

```js
await expect(doSomethingAsync()).rejects.toThrow();
```

#### [ ] `vitest/padding-around-after-all-blocks`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.66.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/padding-around-after-all-blocks.html
- What it does: This rule enforces a line of padding before and after 1 or more afterAll statements.
- Covers: Inconsistent formatting of code can make the code more difficult to read and follow. This rule helps ensure that afterAll blocks are visually separated from the rest of the code, making them easier to identify while looking through test files.

Flagged example:

```js
const thing = 123;
afterAll(() => {});
```

Accepted example:

```js
const thing = 123;

afterAll(() => {});
```

#### [ ] `vitest/prefer-called-exactly-once-with`

- Category: style
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 1.58.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-exactly-once-with.html
- What it does: It checks when a target is asserted with both toHaveBeenCalledOnce and toHaveBeenCalledWith instead of toHaveBeenCalledExactlyOnceWith.
- Covers: The reader must deduce from both expectations that the spy function is called once and with specific arguments.

Flagged example:

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toHaveBeenCalledOnce();
  expect(mock).toHaveBeenCalledWith("foo");
});
```

Accepted example:

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toHaveBeenCalledExactlyOnceWith("foo");
});
```

#### [ ] `vitest/prefer-called-once`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.39.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-once.html
- What it does: Substitute toBeCalledTimes(1) and toHaveBeenCalledTimes(1) with toBeCalledOnce() and toHaveBeenCalledOnce() respectively.
- Covers: The *Times matchers require reading the argument to know how many times a spy is expected to be called. Most of the time, you expect a method to be called once.

Flagged example:

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toBeCalledTimes(1);
  expect(mock).toHaveBeenCalledTimes(1);
});
```

Accepted example:

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toBeCalledOnce();
  expect(mock).toHaveBeenCalledOnce();
});
```

#### [ ] `vitest/prefer-called-times`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.35.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-times.html
- What it does: This rule aims to enforce the use of toBeCalledTimes(1) or toHaveBeenCalledTimes(1) over toBeCalledOnce() or toHaveBeenCalledOnce().
- Covers: This rule aims to enforce the use of toBeCalledTimes(1) or toHaveBeenCalledTimes(1) over toBeCalledOnce() or toHaveBeenCalledOnce().

Flagged example:

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toBeCalledOnce();
  expect(mock).toHaveBeenCalledOnce();
});
```

Accepted example:

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toBeCalledTimes(1);
  expect(mock).toHaveBeenCalledTimes(1);
});
```

#### [ ] `vitest/prefer-called-with`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.5
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-with.html
- What it does: Suggest using toBeCalledWith() or toHaveBeenCalledWith()
- Covers: When testing function calls, it's often more valuable to assert both that a function was called AND what arguments it was called with. Using toBeCalled() or toHaveBeenCalled() only verifies the function was invoked, but doesn't validate the arguments, potentially missing bugs where functions are called with incorrect parameters.

Flagged example:

```javascript
expect(someFunction).toBeCalled();
expect(someFunction).toHaveBeenCalled();
```

Accepted example:

```javascript
expect(noArgsFunction).toBeCalledWith();
expect(roughArgsFunction).toBeCalledWith(expect.anything(), expect.any(Date));
expect(anyArgsFunction).toBeCalledTimes(1);
expect(uncalledFunction).not.toBeCalled();
```

#### [ ] `vitest/prefer-comparison-matcher`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.15
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-comparison-matcher.html
- What it does: This rule checks for comparisons in tests that could be replaced with one of the following built-in comparison matchers:
- Covers: Using generic matchers like toBe(true) with comparison expressions makes tests less readable and provides less helpful error messages when they fail. Jest's specific comparison matchers offer clearer intent and better error output that shows the actual values being compared.

Flagged example:

```js
expect(x > 5).toBe(true);
expect(x < 7).not.toEqual(true);
expect(x <= y).toStrictEqual(true);
```

Accepted example:

```js
expect(x).toBeGreaterThan(5);
expect(x).not.toBeLessThanOrEqual(7);
expect(x).toBeLessThanOrEqual(y);
// special case - see below
expect(x < "Carl").toBe(true);
```

#### [ ] `vitest/prefer-describe-function-title`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.39.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-describe-function-title.html
- What it does: When testing a specific function, this rule aims to enforce passing a named function to describe() instead of an equivalent hardcoded string.
- Covers: For tests that are related to a specific function, if the function being tested is renamed, the describe title will no longer match and can cause confusion in the future. Using the function directly ensures consistency even if the function is renamed.

Flagged example:

```js
// myFunction.test.js
import { myFunction } from "./myFunction";

describe("myFunction", () => {
  // ...
});
```

Accepted example:

```js
// myFunction.test.js
import { myFunction } from "./myFunction";

describe(myFunction, () => {
  // ...
});
```

#### [ ] `vitest/prefer-each`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.9.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-each.html
- What it does: This rule enforces using each rather than manual loops.
- Covers: Manual loops for tests can be less readable and more error-prone. Using each provides a clearer and more concise way to run parameterized tests, improving readability and maintainability.

Flagged example:

```js
for (const item of items) {
  describe(item, () => {
    expect(item).toBe("foo");
  });
}
```

Accepted example:

```js
describe.each(items)("item", (item) => {
  expect(item).toBe("foo");
});
```

#### [ ] `vitest/prefer-equality-matcher`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.2.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-equality-matcher.html
- What it does: Jest has built-in matchers for expecting equality, which allow for more readable tests and error messages if an expectation fails.
- Covers: Testing equality expressions with generic matchers like toBe(true) makes tests harder to read and understand. When tests fail, the error messages are less helpful because they don't show what the actual values were. Using specific equality matchers provides clearer test intent and better debugging information.

Flagged example:

```javascript
expect(x === 5).toBe(true);
expect(name === "Carl").not.toEqual(true);
expect(myObj !== thatObj).toStrictEqual(true);
```

Accepted example:

```javascript
expect(x).toBe(5);
expect(name).not.toEqual("Carl");
expect(myObj).toStrictEqual(thatObj);
```

#### [ ] `vitest/prefer-expect-assertions`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.62.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-assertions.html
- What it does: Enforces that every test has either expect.assertions(<number>) or expect.hasAssertions() as its first expression.
- Covers: Without explicit assertion counts, tests with asynchronous code, callbacks, or loops may pass even if some expect calls are never reached, silently hiding bugs.

Flagged example:

```javascript
test("no assertions", () => {
  // ...
});
test("assertions not first", () => {
  expect(true).toBe(true);
  // ...
});
```

Accepted example:

```javascript
test("with assertion count", () => {
  expect.assertions(1);
  expect(true).toBe(true);
});
test("with hasAssertions", () => {
  expect.hasAssertions();
  expect(true).toBe(true);
});
```

#### [ ] `vitest/prefer-expect-resolves`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-resolves.html
- What it does: Prefer await expect(...).resolves over expect(await ...) when testing promises.
- Covers: When working with promises, there are two primary ways you can test the resolved value:

Flagged example:

```javascript
it("passes", async () => {
  expect(await someValue()).toBe(true);
});
it("is true", async () => {
  const myPromise = Promise.resolve(true);
  expect(await myPromise).toBe(true);
});
```

Accepted example:

```javascript
it("passes", async () => {
  await expect(someValue()).resolves.toBe(true);
});
it("is true", async () => {
  const myPromise = Promise.resolve(true);

  await expect(myPromise).resolves.toBe(true);
});
it("errors", async () => {
  await expect(Promise.reject(new Error("oh noes!"))).rejects.toThrowError("oh noes!");
// ...
```

#### [ ] `vitest/prefer-expect-type-of`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.44.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-type-of.html
- What it does: Enforce using toBeTypeOf instead of expect(typeof ...).toBe(...).
- Covers: expect(typeof value).toBe(type) works but is awkward and produces poor failure messages. Vitest's built-in toBeTypeOf matcher performs the same typeof comparison with a clearer API and better error output.

Flagged example:

```js
test("type checking", () => {
  expect(typeof "hello").toBe("string");
  expect(typeof 42).toBe("number");
  expect(typeof true).toBe("boolean");
  expect(typeof {}).toBe("object");
  expect(typeof (() => {})).toBe("function");
  expect(typeof Symbol()).toBe("symbol");
  expect(typeof 123n).toBe("bigint");
  expect(typeof undefined).toBe("undefined");
});
```

Accepted example:

```js
test("type checking", () => {
  expect("hello").toBeTypeOf("string");
  expect(42).toBeTypeOf("number");
  expect(true).toBeTypeOf("boolean");
  expect({}).toBeTypeOf("object");
  expect(() => {}).toBeTypeOf("function");
  expect(Symbol()).toBeTypeOf("symbol");
  expect(123n).toBeTypeOf("bigint");
  expect(undefined).toBeTypeOf("undefined");
});
```

#### [ ] `vitest/prefer-hooks-in-order`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.6.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-hooks-in-order.html
- What it does: Ensures that hooks are in the order that they are called in.
- Covers: While hooks can be setup in any order, they're always called by jest in this specific order:

Flagged example:

```javascript
describe("foo", () => {
  beforeEach(() => {
    seedMyDatabase();
  });
  beforeAll(() => {
    createMyDatabase();
  });
  it("accepts this input", () => {
    // ...
  });
// ...
```

Accepted example:

```javascript
describe("foo", () => {
  beforeAll(() => {
    createMyDatabase();
  });
  beforeEach(() => {
    seedMyDatabase();
  });
  it("accepts this input", () => {
    // ...
  });
// ...
```

#### [ ] `vitest/prefer-hooks-on-top`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-hooks-on-top.html
- What it does: While hooks can be setup anywhere in a test file, they are always called in a specific order, which means it can be confusing if they're intermixed with test cases.
- Covers: When hooks are mixed with test cases, it becomes harder to understand the test setup and execution order. This can lead to confusion about which hooks apply to which tests and when they run. Grouping hooks at the top of each describe block makes the test structure clearer and more maintainable.

Flagged example:

```javascript
describe("foo", () => {
  beforeEach(() => {
    seedMyDatabase();
  });

  it("accepts this input", () => {
    // ...
  });

  beforeAll(() => {
// ...
```

Accepted example:

```javascript
describe("foo", () => {
  beforeAll(() => {
    createMyDatabase();
  });

  beforeEach(() => {
    seedMyDatabase();
  });

  afterAll(() => {
// ...
```

#### [ ] `vitest/prefer-import-in-mock`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-import-in-mock.html
- What it does: This rule enforces using a dynamic import() in vi.mock() or vi.doMock(), which improves type information and IntelliSense for the mocked module.
- Covers: A lack of type information and IntelliSense increases the risk of mismatches between the real module and its mock.

Flagged example:

```js
vi.mock("./path/to/module");
vi.doMock("./path/to/module");
```

Accepted example:

```js
vi.mock(import("./path/to/module"));
vi.doMock(import("./path/to/module"));
```

#### [ ] `vitest/prefer-importing-vitest-globals`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-importing-vitest-globals.html
- What it does: Enforces explicit imports from 'vitest' instead of using Vitest globals.
- Covers: Using Vitest globals without importing them relies on implicit global configuration (globals: true in vitest config). Explicit imports make dependencies clear, improve IDE support, and ensure compatibility across different setups.

Flagged example:

```js
describe("suite", () => {
  it("test", () => {
    expect(true).toBe(true);
  });
});
```

Accepted example:

```js
import { describe, it, expect } from "vitest";

describe("suite", () => {
  it("test", () => {
    expect(true).toBe(true);
  });
});
```

#### [ ] `vitest/prefer-lowercase-title`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.15.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-lowercase-title.html
- What it does: Enforce it, test, describe, and bench to have descriptions that begin with a lowercase letter. This provides more readable test failures.
- Covers: Lowercase messages for test failures generally result in more grammatically correct failure messages when you have a test failure.

Flagged example:

```javascript
it("Adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

Accepted example:

```javascript
it("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

#### [ ] `vitest/prefer-mock-promise-shorthand`

- Category: style
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.2.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-mock-promise-shorthand.html
- What it does: When working with mocks of functions that return promises, Jest provides some API sugar functions to reduce the amount of boilerplate you have to write. These methods should be preferred when possible.
- Covers: Using generic mock functions like mockImplementation(() => Promise.resolve()) or mockReturnValue(Promise.reject()) is more verbose and less readable than Jest's specialized promise shorthands. The shorthand methods like mockResolvedValue() and mockRejectedValue() are more expressive and make the test intent clearer.

Flagged example:

```javascript
jest.fn().mockImplementation(() => Promise.resolve(123));
jest.spyOn(fs.promises, "readFile").mockReturnValue(Promise.reject(new Error("oh noes!")));

myFunction
  .mockReturnValueOnce(Promise.resolve(42))
  .mockImplementationOnce(() => Promise.resolve(42))
  .mockReturnValue(Promise.reject(new Error("too many calls!")));
```

Accepted example:

```javascript
jest.fn().mockResolvedValue(123);
jest.spyOn(fs.promises, "readFile").mockRejectedValue(new Error("oh noes!"));

myFunction
  .mockResolvedValueOnce(42)
  .mockResolvedValueOnce(42)
  .mockRejectedValue(new Error("too many calls!"));
```

#### [ ] `vitest/prefer-mock-return-shorthand`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.49.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-mock-return-shorthand.html
- What it does: When working with mocks of functions that return simple values, Jest provides some API sugar functions to reduce the amount of boilerplate you have to write.
- Covers: Not using Jest's API sugar functions adds unnecessary boilerplate and makes tests harder to read. These helpers clearly express intent and reduce errors, keeping tests simple and maintainable.

Flagged example:

```js
jest.fn().mockImplementation(() => "hello world");

jest
  .spyOn(fs.promises, "readFile")
  .mockImplementationOnce(() => Promise.reject(new Error("oh noes!")));

myFunction
  .mockImplementationOnce(() => 42)
  .mockImplementationOnce(() => Promise.resolve(42))
  .mockReturnValue(0);
```

Accepted example:

```js
jest.fn().mockResolvedValue(123);

jest.spyOn(fs.promises, "readFile").mockReturnValue(Promise.reject(new Error("oh noes!")));
jest.spyOn(fs.promises, "readFile").mockRejectedValue(new Error("oh noes!"));

jest.spyOn(fs, "readFileSync").mockImplementationOnce(() => {
  throw new Error("oh noes!");
});

myFunction.mockResolvedValueOnce(42).mockResolvedValueOnce(42).mockReturnValue(0);
```

#### [ ] `vitest/prefer-spy-on`

- Category: style
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-spy-on.html
- What it does: When mocking a function by overwriting a property you have to manually restore the original implementation when cleaning up. When using jest.spyOn() Jest keeps track of changes, and they can be restored with jest.restoreAllMocks(), mockFn.mockRestore() or by setting restoreMocks to true in the Jest config.
- Covers: Directly overwriting properties with mock functions can lead to cleanup issues and test isolation problems. When you manually assign a mock to a property, you're responsible for restoring the original implementation, which is easy to forget and can cause tests to interfere with each other. Using jest.spyOn() provides automatic cleanup capabilities and makes your tests more reliable.

Flagged example:

```javascript
Date.now = jest.fn();
Date.now = jest.fn(() => 10);
```

Accepted example:

```javascript
jest.spyOn(Date, "now");
jest.spyOn(Date, "now").mockImplementation(() => 10);
```

#### [ ] `vitest/prefer-strict-boolean-matchers`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.57.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-strict-boolean-matchers.html
- What it does: Enforce using toBe(true) and toBe(false) over matchers that coerce types to boolean.
- Covers: Truthy/falsy matchers coerce values to boolean and can hide type mistakes. Strict boolean assertions make intent explicit and avoid accidental coercion.

Flagged example:

```javascript
expect(foo).toBeTruthy();
expectTypeOf(foo).toBeTruthy();
expect(foo).toBeFalsy();
expectTypeOf(foo).toBeFalsy();
```

Accepted example:

```javascript
expect(foo).toBe(true);
expectTypeOf(foo).toBe(true);
expect(foo).toBe(false);
expectTypeOf(foo).toBe(false);
```

#### [ ] `vitest/prefer-strict-equal`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-strict-equal.html
- What it does: This rule triggers a warning if toEqual() is used to assert equality.
- Covers: The toEqual() matcher performs a deep equality check but ignores undefined values in objects and arrays. This can lead to false positives where tests pass when they should fail. toStrictEqual() provides more accurate comparison by checking for undefined values.

Flagged example:

```javascript
expect({ a: "a", b: undefined }).toEqual({ a: "a" });
```

Accepted example:

```javascript
expect({ a: "a", b: undefined }).toStrictEqual({ a: "a" });
```

#### [ ] `vitest/prefer-to-be`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be.html
- What it does: Recommends using toBe matcher for primitive literals and specific matchers for null, undefined, and NaN.
- Covers: When asserting against primitive literals such as numbers and strings, the equality matchers all operate the same, but read slightly differently in code.

Flagged example:

```javascript
expect(value).not.toEqual(5);
expect(getMessage()).toStrictEqual("hello world");
expect(loadMessage()).resolves.toEqual("hello world");
```

Accepted example:

```javascript
expect(value).not.toBe(5);
expect(getMessage()).toBe("hello world");
expect(loadMessage()).resolves.toBe("hello world");
expect(didError).not.toBe(true);
expect(catchError()).toStrictEqual({ message: "oh noes!" });
```

#### [ ] `vitest/prefer-to-be-falsy`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.7.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be-falsy.html
- What it does: This rule warns when toBe(false) is used with expect or expectTypeOf. With --fix, it will be replaced with toBeFalsy().
- Covers: Using toBe(false) is less expressive and may not account for other falsy values like 0, null, or undefined. toBeFalsy() provides a more comprehensive check for any falsy value, improving the robustness of the tests.

Flagged example:

```javascript
expect(foo).toBe(false);
expectTypeOf(foo).toBe(false);
```

Accepted example:

```javascript
expect(foo).toBeFalsy();
expectTypeOf(foo).toBeFalsy();
```

#### [ ] `vitest/prefer-to-be-object`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.9.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be-object.html
- What it does: This rule enforces using toBeObject() to check if a value is of type Object.
- Covers: Using other methods such as toBeInstanceOf(Object) or instanceof Object can be less clear and potentially misleading. Enforcing the use of toBeObject() provides more explicit and readable code, making your intentions clear and improving the overall maintainability and readability of your tests.

Flagged example:

```js
expectTypeOf({}).toBeInstanceOf(Object);
expectTypeOf({} instanceof Object).toBeTruthy();
```

Accepted example:

```js
expectTypeOf({}).toBeObject();
expectTypeOf({}).toBeObject();
```

#### [ ] `vitest/prefer-to-be-truthy`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.7.1
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be-truthy.html
- What it does: This rule warns when toBe(true) is used with expect or expectTypeOf. With --fix, it will be replaced with toBeTruthy().
- Covers: Using toBe(true) is less flexible and may not account for other truthy values like non-empty strings or objects. toBeTruthy() checks for any truthy value, which makes the tests more comprehensive and robust.

Flagged example:

```javascript
expect(foo).toBe(true);
expectTypeOf(foo).toBe(true);
```

Accepted example:

```javascript
expect(foo).toBeTruthy();
expectTypeOf(foo).toBeTruthy();
```

#### [ ] `vitest/prefer-to-contain`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-contain.html
- What it does: In order to have a better failure message, toContain() should be used upon asserting expectations on an array containing an object.
- Covers: This rule triggers a warning if toBe(), toEqual() or toStrictEqual() is used to assert object inclusion in an array

Flagged example:

```javascript
expect(a.includes(b)).toBe(true);
expect(a.includes(b)).not.toBe(true);
expect(a.includes(b)).toBe(false);
expect(a.includes(b)).toEqual(true);
expect(a.includes(b)).toStrictEqual(true);
```

Accepted example:

```javascript
expect(a).toContain(b);
expect(a).not.toContain(b);
```

#### [ ] `vitest/prefer-to-have-been-called-times`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.34.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-have-been-called-times.html
- What it does: In order to have a better failure message, toHaveBeenCalledTimes should be used instead of directly checking the length of mock.calls.
- Covers: This rule triggers a warning if toHaveLength is used to assert the number of times a mock is called.

Flagged example:

```js
expect(someFunction.mock.calls).toHaveLength(1);
expect(someFunction.mock.calls).toHaveLength(0);
expect(someFunction.mock.calls).not.toHaveLength(1);
```

Accepted example:

```js
expect(someFunction).toHaveBeenCalledTimes(1);
expect(someFunction).toHaveBeenCalledTimes(0);
expect(someFunction).not.toHaveBeenCalledTimes(0);
expect(uncalledFunction).not.toBeCalled();
expect(method.mock.calls[0][0]).toStrictEqual(value);
```

#### [ ] `vitest/prefer-to-have-length`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.2.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-have-length.html
- What it does: In order to have a better failure message, toHaveLength() should be used upon asserting expectations on objects length property.
- Covers: This rule triggers a warning if toBe(), toEqual() or toStrictEqual() is used to assert objects length property.

Flagged example:

```javascript
expect(files["length"]).toBe(1);
expect(files["length"]).toBe(1);
expect(files["length"])["not"].toBe(1);
```

Accepted example:

```javascript
expect(files).toHaveLength(1);
```

#### [ ] `vitest/prefer-todo`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 0.0.16
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-todo.html
- What it does: When test cases are empty then it is better to mark them as test.todo as it will be highlighted in the summary output.
- Covers: This rule triggers a warning if empty test cases are used without 'test.todo'.

Flagged example:

```javascript
test("i need to write this test"); // invalid
test("i need to write this test", () => {}); // invalid
test.skip("i need to write this test", () => {}); // invalid
```

Accepted example:

```javascript
test.todo("i need to write this test");
```

#### [ ] `vitest/require-hook`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.3.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-hook.html
- What it does: This rule flags any expression that is either at the toplevel of a test file or directly within the body of a describe, except for the following:
- Covers: Having setup and teardown code outside of hooks can lead to unpredictable test behavior. Code that runs at the top level executes when the test file is loaded, not when tests run, which can cause issues with test isolation and make tests dependent on execution order. Using proper hooks like beforeEach, beforeAll, afterEach, and afterAll ensures that setup and teardown code runs at the correct time and maintains test isolation.

Flagged example:

```javascript
import { database, isCity } from "../database";
import { Logger } from "../../../src/Logger";
import { loadCities } from "../api";

jest.mock("../api");

const initializeCityDatabase = () => {
  database.addCity("Vienna");
  database.addCity("San Juan");
  database.addCity("Wellington");
// ...
```

Accepted example:

```javascript
import { database, isCity } from "../database";
import { Logger } from "../../../src/Logger";
import { loadCities } from "../api";

jest.mock("../api");
const initializeCityDatabase = () => {
  database.addCity("Vienna");
  database.addCity("San Juan");
  database.addCity("Wellington");
};
// ...
```

#### [ ] `vitest/require-top-level-describe`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.4.2
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-top-level-describe.html
- What it does: Requires test cases and hooks to be inside a top-level describe block.
- Covers: Having tests and hooks organized within describe blocks provides better structure and grouping for test suites. It makes test output more readable and helps with test organization, especially in larger codebases.

Flagged example:

```javascript
// Above a describe block
test("my test", () => {});
describe("test suite", () => {
  it("test", () => {});
});

// Below a describe block
describe("test suite", () => {});
test("my test", () => {});

// ...
```

Accepted example:

```javascript
// Above a describe block
// In a describe block
describe("test suite", () => {
  test("my test", () => {});
});

// In a nested describe block
describe("test suite", () => {
  test("my test", () => {});
  describe("another test suite", () => {
// ...
```

### correctness

#### [ ] `vitest/expect-expect`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/expect-expect.html
- What it does: This rule triggers when there is no call made to expect in a test, ensure that there is at least one expect call made in a test.
- Covers: People may forget to add assertions.

Flagged example:

```javascript
it("should be a test", () => {
  console.log("no assertion");
});
test("should assert something", () => {});
```

Accepted example:

```javascript
it("should be a test", () => {
  console.log("no assertion");
});
test("should assert something", () => {});
```

#### [ ] `vitest/hoisted-apis-on-top`

- Category: correctness
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.39.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/hoisted-apis-on-top.html
- What it does: Requires hoisted Vitest APIs (vi.mock, vi.unmock, and vi.hoisted) to appear at the top level of the file.
- Covers: Vitest hoists certain APIs to the top of the file during transformation, so they always run before any imports - regardless of where they appear in the source. Writing them inside conditionals, test bodies, or other runtime locations can be misleading and confusing.

Flagged example:

```js
if (condition) {
  vi.mock("some-module", () => {});
}
```

Accepted example:

```js
if (condition) {
  vi.doMock("some-module", () => {});
}
```

#### [ ] `vitest/no-conditional-expect`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.12
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-expect.html
- What it does: This rule prevents the use of expect in conditional blocks, such as if and catch. This includes using expect in callbacks to functions named catch, which are assumed to be promises.
- Covers: Jest only considers a test to have failed if it throws an error, meaning if calls to assertion functions like expect occur in conditional code such as a catch statement, tests can end up passing but not actually test anything. Additionally, conditionals tend to make tests more brittle and complex, as they increase the amount of mental thinking needed to understand what is actually being tested.

Flagged example:

```js
it("foo", () => {
  doTest && expect(1).toBe(2);
});

it("bar", () => {
  if (!skipTest) {
    expect(1).toEqual(2);
  }
});

// ...
```

Accepted example:

```js
it("foo", () => {
  expect(!value).toBe(false);
});

function getValue() {
  if (process.env.FAIL) {
    return 1;
  }
  return 2;
}
// ...
```

#### [ ] `vitest/no-conditional-tests`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.8.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-tests.html
- What it does: The rule disallows the use of conditional statements within test cases to ensure that tests are deterministic and clearly readable.
- Covers: Conditional statements in test cases can make tests unpredictable and harder to understand. Tests should be consistent and straightforward to ensure reliable results and maintainability.

Flagged example:

```js
describe("my tests", () => {
  if (true) {
    it("is awesome", () => {
      doTheThing();
    });
  }
});
```

Accepted example:

```js
describe("my tests", () => {
  it("is awesome", () => {
    doTheThing();
  });
});
```

#### [ ] `vitest/no-disabled-tests`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.7
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-disabled-tests.html
- What it does: This rule raises a warning about disabled tests.
- Covers: Jest has a feature that allows you to temporarily mark tests as disabled. This feature is often helpful while debugging or to create placeholders for future tests. Before committing changes we may want to check that all tests are running.

Example signal: Flags disabled tests patterns in vitest code.

#### [ ] `vitest/no-focused-tests`

- Category: correctness
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-focused-tests.html
- What it does: This rule reminds you to remove .only from your tests by raising a warning whenever you are using the exclusivity feature.
- Covers: Jest has a feature that allows you to focus tests by appending .only or prepending f to a test-suite or a test-case. This feature is really helpful to debug a failing test, so you don't have to execute all of your tests. After you have fixed your test and before committing the changes you have to remove .only to ensure all tests are executed on your build system.

Flagged example:

```javascript
describe.only("foo", () => {});
it.only("foo", () => {});
describe["only"]("bar", () => {});
it["only"]("bar", () => {});
test.only("foo", () => {});
test["only"]("bar", () => {});
fdescribe("foo", () => {});
fit("foo", () => {});
fit.each`
  table
// ...
```

Accepted example:

```javascript
describe.only("foo", () => {});
it.only("foo", () => {});
describe["only"]("bar", () => {});
it["only"]("bar", () => {});
test.only("foo", () => {});
test["only"]("bar", () => {});
fdescribe("foo", () => {});
fit("foo", () => {});
fit.each`
  table
// ...
```

#### [ ] `vitest/no-standalone-expect`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.13
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-standalone-expect.html
- What it does: Prevents expect statements outside of a test or it block. An expect within a helper function (but outside of a test or it block) will not trigger this rule.
- Covers: expect statements outside of test blocks will not be executed by the Jest test runner, which means they won't actually test anything. This can lead to false confidence in test coverage and may hide bugs that would otherwise be caught by proper testing.

Flagged example:

```javascript
describe("a test", () => {
  expect(1).toBe(1);
});
```

Accepted example:

```javascript
describe("a test", () => {
  expect(1).toBe(1);
});
```

#### [ ] `vitest/prefer-snapshot-hint`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.59.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-snapshot-hint.html
- What it does: Enforces including a hint string with snapshot matchers (toMatchSnapshot and toThrowErrorMatchingSnapshot).
- Covers: Auto-numbered snapshot names are fragile - adding or reordering assertions shifts all subsequent numbers, causing unrelated snapshots to appear changed and obscuring real differences in code review.

Flagged example:

```js
const snapshotOutput = ({ stdout, stderr }) => {
  expect(stdout).toMatchSnapshot();
  expect(stderr).toMatchSnapshot();
};

describe("cli", () => {
  describe("--version flag", () => {
    it("prints the version", async () => {
      snapshotOutput(await runCli(["--version"]));
    });
// ...
```

Accepted example:

```js
const snapshotOutput = ({ stdout, stderr }, hints) => {
  expect(stdout).toMatchSnapshot({}, `stdout: ${hints.stdout}`);
  expect(stderr).toMatchSnapshot({}, `stderr: ${hints.stderr}`);
};

describe("cli", () => {
  describe("--version flag", () => {
    it("prints the version", async () => {
      snapshotOutput(await runCli(["--version"]), {
        stdout: "version string",
// ...
```

#### [ ] `vitest/require-awaited-expect-poll`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.58.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-awaited-expect-poll.html
- What it does: This rule ensures that promises returned by expect.poll and expect.element calls are handled properly.
- Covers: expect.poll and expect.element return promises. If not awaited or returned, the test completes before the assertion resolves, meaning the test will pass regardless of whether the assertion succeeds or fails.

Flagged example:

```js
test("element exists", () => {
  asyncInjectElement();

  expect.poll(() => document.querySelector(".element")).toBeInTheDocument();
});
```

Accepted example:

```js
test("element exists", () => {
  asyncInjectElement();

  return expect.poll(() => document.querySelector(".element")).toBeInTheDocument();
});
test("element exists", async () => {
  asyncInjectElement();

  await expect.poll(() => document.querySelector(".element")).toBeInTheDocument();
});
```

#### [ ] `vitest/require-local-test-context-for-concurrent-snapshots`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.8.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-local-test-context-for-concurrent-snapshots.html
- What it does: The rule is intended to ensure that concurrent snapshot tests are executed within a properly configured local test context.
- Covers: Running snapshot tests concurrently without a proper context can lead to unreliable or inconsistent snapshots. Ensuring that concurrent tests are correctly configured with the appropriate context helps maintain accurate and stable snapshots, avoiding potential conflicts or failures.

Flagged example:

```javascript
test.concurrent("myLogic", () => {
  expect(true).toMatchSnapshot();
});

describe.concurrent("something", () => {
  test("myLogic", () => {
    expect(true).toMatchInlineSnapshot();
  });
});
```

Accepted example:

```javascript
test.concurrent("myLogic", ({ expect }) => {
  expect(true).toMatchSnapshot();
});

test.concurrent("myLogic", (context) => {
  context.expect(true).toMatchSnapshot();
});
```

#### [ ] `vitest/require-mock-type-parameters`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.58.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-mock-type-parameters.html
- What it does: Enforces the use of type parameters on vi.fn(), and optionally on vi.importActual() and vi.importMock().
- Covers: Without explicit type parameters, vi.fn() creates a mock typed as (...args: any[]) => any. This disables type checking between the mock and the real implementation, which can lead to two problems:

Flagged example:

```ts
import { vi } from "vitest";

test("foo", () => {
  const myMockedFn = vi.fn();
});
```

Accepted example:

```ts
import { vi } from "vitest";

test("foo", () => {
  const myMockedFnOne = vi.fn<(arg1: string, arg2: boolean) => number>();
  const myMockedFnTwo = vi.fn<() => void>();
  const myMockedFnThree = vi.fn<any>();
});
```

#### [ ] `vitest/require-to-throw-message`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.2.9
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-to-throw-message.html
- What it does: This rule triggers a warning if toThrow() or toThrowError() is used without an error message.
- Covers: Using toThrow() or toThrowError() without specifying an expected error message makes tests less specific and harder to debug. When a test only checks that an error was thrown but not what kind of error, it can pass even when the wrong error is thrown, potentially hiding bugs. Providing an expected error message or error type makes tests more precise and helps catch regressions more effectively.

Flagged example:

```javascript
test("all the things", async () => {
  expect(() => a()).toThrow();
  expect(() => a()).toThrowError();
  await expect(a()).rejects.toThrow();
  await expect(a()).rejects.toThrowError();
});
```

Accepted example:

```javascript
test("all the things", async () => {
  expect(() => a()).toThrow("a");
  expect(() => a()).toThrowError("a");
  await expect(a()).rejects.toThrow("a");
  await expect(a()).rejects.toThrowError("a");
});
```

#### [ ] `vitest/valid-describe-callback`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-describe-callback.html
- What it does: This rule validates that the second parameter of a describe() function is a callback function. This callback function:
- Covers: Using an improper describe() callback function can lead to unexpected test errors.

Flagged example:

```javascript
// Callback function parameters are not allowed
describe("myFunction()", (done) => {
  // ...
});

// Returning a value from a describe block is not allowed
describe("myFunction", () =>
  it("returns a truthy value", () => {
    expect(myFunction()).toBeTruthy();
  }));
```

Accepted example:

```javascript
// Callback function parameters are not allowed
describe("myFunction()", (done) => {
  // ...
});

// Returning a value from a describe block is not allowed
describe("myFunction", () =>
  it("returns a truthy value", () => {
    expect(myFunction()).toBeTruthy();
  }));
```

#### [ ] `vitest/valid-expect`

- Category: correctness
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-expect.html
- What it does: Checks that expect() is called correctly.
- Covers: expect() is a function that is used to assert values in tests. It should be called with a single argument, which is the value to be tested. If you call expect() with no arguments, or with more than one argument, it will not work as expected.

Flagged example:

```javascript
expect();
expect("something");
expect(true).toBeDefined;
expect(Promise.resolve("Hi!")).resolves.toBe("Hi!");
```

Accepted example:

```javascript
expect("something").toEqual("something");
expect(true).toBeDefined();
expect(Promise.resolve("Hi!")).resolves.toBe("Hi!");
```

#### [ ] `vitest/valid-expect-in-promise`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.60.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-expect-in-promise.html
- What it does: Ensures that expect calls inside promise chains (.then(), .catch(), .finally()) are properly awaited or returned from the test.
- Covers: When expect is called inside a promise callback that is not awaited or returned, the test may pass even if the assertion fails because the test completes before the promise resolves. This leads to silently passing tests with broken assertions.

Flagged example:

```javascript
test("promise test", async () => {
  something().then((value) => {
    expect(value).toBe("red");
  });
});

test("promises test", () => {
  const onePromise = something().then((value) => {
    expect(value).toBe("red");
  });
// ...
```

Accepted example:

```javascript
test("promise test", async () => {
  await something().then((value) => {
    expect(value).toBe("red");
  });
});

test("promises test", () => {
  const onePromise = something().then((value) => {
    expect(value).toBe("red");
  });
// ...
```

#### [ ] `vitest/valid-title`

- Category: correctness
- Default: no
- Fix: conditional auto-fix
- Type-aware: no
- Added: 0.0.14
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-title.html
- What it does: Checks that the titles of Jest and Vitest blocks are valid.
- Covers: Titles that are not valid can be misleading and make it harder to understand the purpose of the test.

Flagged example:

```javascript
describe("", () => {});
describe("foo", () => {
  it("", () => {});
});
it("", () => {});
test("", () => {});
xdescribe("", () => {});
xit("", () => {});
xtest("", () => {});
```

Accepted example:

```javascript
describe("foo", () => {});
it("bar", () => {});
test("baz", () => {});
```

#### [ ] `vitest/warn-todo`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.37.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/warn-todo.html
- What it does: This rule warns about usage of .todo in describe, it, or test functions.
- Covers: The tests you push should be complete. Any pending/TODO code should not be committed.

Flagged example:

```js
describe.todo("foo", () => {});
it.todo("foo", () => {});
test.todo("foo", () => {});
```

Accepted example:

```js
describe([])("foo", () => {});
it([])("foo", () => {});
test([])("foo", () => {});
```

### suspicious

#### [ ] `vitest/no-commented-out-tests`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.0.8
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-commented-out-tests.html
- What it does: This rule raises a warning about commented-out tests. It's similar to the no-disabled-tests rule.
- Covers: You may forget to uncomment some tests. This rule raises a warning about commented-out tests.

Flagged example:

```javascript
// describe('foo', () => {});
// it('foo', () => {});
// test('foo', () => {});

// describe.skip('foo', () => {});
// it.skip('foo', () => {});
// test.skip('foo', () => {});
```

Accepted example:

```javascript
// describe('foo', () => {});
// it('foo', () => {});
// test('foo', () => {});

// describe.skip('foo', () => {});
// it.skip('foo', () => {});
// test.skip('foo', () => {});
```

### pedantic

#### [ ] `vitest/no-conditional-in-test`

- Category: pedantic
- Default: no
- Fix: none
- Type-aware: no
- Added: 0.8.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-in-test.html
- What it does: Disallow conditional statements in tests.
- Covers: Conditional statements in tests can make the test harder to read and understand. It is better to have a single test case per test function.

Flagged example:

```js
it("foo", () => {
  if (true) {
    doTheThing();
  }
});

it("bar", () => {
  switch (mode) {
    case "none":
      generateNone();
// ...
```

Accepted example:

```js
describe("my tests", () => {
  if (true) {
    it("foo", () => {
      doTheThing();
    });
  }
});

beforeEach(() => {
  switch (mode) {
// ...
```

### restriction

#### [ ] `vitest/require-test-timeout`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.58.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-test-timeout.html
- What it does: Requires every test to have a timeout specified, either as a numeric third argument, a { timeout } option, or via vi.setConfig({ testTimeout: ... }).
- Covers: Tests without an explicit timeout rely on the default, which may be too generous to catch performance regressions or too short for slow CI environments, leading to flaky failures.

Flagged example:

```js
it("slow test", async () => {
  await doSomethingSlow();
});
```

Accepted example:

```js
// good (numeric timeout)
test("slow test", async () => {
  await doSomethingSlow();
}, 1000);

// good (options object)
test("slow test", { timeout: 1000 }, async () => {
  await doSomethingSlow();
});

// ...
```

## vue

### style

#### [ ] `vue/component-definition-name-casing`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.68.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/component-definition-name-casing.html
- What it does: Enforce specific casing for component definition names.
- Covers: Defining component names without a consistent casing makes templates harder to read and harder to grep. Picking either PascalCase or kebab-case and sticking with it across the codebase removes a class of bikeshedding and search misses.

Flagged example:

```vue
<script>
export default {
  name: "foo-bar",
};
</script>
```

Accepted example:

```vue
<script>
export default {
  name: "FooBar",
};
</script>
```

#### [ ] `vue/define-emits-declaration`

- Category: style
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.15.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/define-emits-declaration.html
- What it does: Enforce consistent declaration style for defineEmits in Vue. This rule only works in <script setup> with lang="ts".
- Covers: Inconsistent code style can be confusing and make code harder to read through.

Flagged example:

```vue
// "vue/define-emits-declaration": ["error", "type-based"]
<script setup lang="ts">
const emit = defineEmits(["change", "update"]);
const emit2 = defineEmits({
  change: (id) => typeof id === "number",
  update: (value) => typeof value === "string",
});
</script>

// "vue/define-emits-declaration": ["error", "type-literal"]
// ...
```

Accepted example:

```vue
// "vue/define-emits-declaration": ["error", "type-based"]
<script setup lang="ts">
const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();
const emit2 = defineEmits<{
  change: [id: number];
  update: [value: string];
}>();
// ...
```

#### [ ] `vue/define-props-declaration`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.15.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/define-props-declaration.html
- What it does: Enforce consistent declaration style for defineProps in Vue. This rule only works in <script setup> with lang="ts".
- Covers: Inconsistent code style can be confusing and make code harder to read through.

Flagged example:

```vue
// "vue/define-props-declaration": ["error", "type-based"]
<script setup lang="ts">
const props = defineProps({
  kind: { type: String },
});
</script>

// "vue/define-props-declaration": ["error", "runtime"]
<script setup lang="ts">
const props = defineProps<{
// ...
```

Accepted example:

```vue
// "vue/define-props-declaration": ["error", "type-based"]
<script setup lang="ts">
const props = defineProps<{
  kind: string;
}>();
</script>

// "vue/define-props-declaration": ["error", "runtime"]
<script setup lang="ts">
const props = defineProps({
// ...
```

#### [ ] `vue/define-props-destructuring`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/define-props-destructuring.html
- What it does: This rule enforces a consistent style for handling Vue 3 Composition API props, allowing you to choose between requiring destructuring or prohibiting it.
- Covers: By default, the rule requires you to use destructuring syntax when defineProps is assigned to a variable and warns against combining withDefaults with destructuring.

Flagged example:

```vue
<script setup lang="ts">
const props = defineProps(["foo"]);
const propsWithDefaults = withDefaults(defineProps(["foo"]), { foo: "default" });
const { baz } = withDefaults(defineProps(["baz"]), { baz: "default" });
const props = defineProps<{ foo?: string }>();
const propsWithDefaults = withDefaults(defineProps<{ foo?: string }>(), { foo: "default" });
</script>
```

Accepted example:

```vue
<script setup lang="ts">
const { foo } = defineProps(["foo"]);
const { bar = "default" } = defineProps(["bar"]);
const { foo } = defineProps<{ foo?: string }>();
const { bar = "default" } = defineProps<{ bar?: string }>();
</script>
```

#### [ ] `vue/next-tick-style`

- Category: style
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.69.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/next-tick-style.html
- What it does: Enforce Promise or callback style in nextTick.
- Covers: In Vue.js, nextTick can be used either by passing a callback or by using the returned Promise. Mixing these styles makes the code harder to read and inconsistent. Choose one style consistently.

Flagged example:

```js
this.$nextTick(() => {});
Vue.nextTick(() => {});
import { nextTick } from "vue";
nextTick(() => {});
```

Accepted example:

```js
this.$nextTick().then(() => {});
await Vue.nextTick();
import { nextTick } from "vue";
await nextTick();
```

#### [ ] `vue/prop-name-casing`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.69.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/prop-name-casing.html
- What it does: Enforce a specific casing (camelCase or snake\_case) for Vue component prop names.
- Covers: Inconsistent prop name casing makes templates harder to read and grep for. Pinning props to a single casing across the codebase keeps the declaration site and the call site aligned.

Flagged example:

```vue
<script>
export default {
  props: {
    greeting_text: String,
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  props: {
    greetingText: String,
  },
};
</script>
```

#### [ ] `vue/require-default-prop`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.70.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/require-default-prop.html
- What it does: Requires default value to be set for props that are not marked as required.
- Covers: A prop that is neither required nor given a default is implicitly undefined when omitted. Forcing a default keeps the component's behavior explicit and avoids undefined leaking into the template and logic. Boolean props are exempt because they already default to false.

Flagged example:

```vue
<script>
export default {
  props: {
    name: String,
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>
```

#### [ ] `vue/require-direct-export`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.69.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/require-direct-export.html
- What it does: This rule requires that the component object be directly exported.
- Covers: Indirect exports can make it harder to understand the component structure and may cause issues with Vue's component system.

Flagged example:

```vue
<script>
const A = {};
export default A;
</script>
```

Accepted example:

```vue
<script>
export default {};
</script>
```

#### [ ] `vue/require-prop-types`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.69.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/require-prop-types.html
- What it does: This rule enforces that a props statement contains a type definition.
- Covers: In committed code, prop definitions should always be as detailed as possible, specifying at least type(s).

Flagged example:

```vue
<script setup>
const props = defineProps({
  name: String,
});
</script>
```

Accepted example:

```vue
<script setup>
const props = defineProps({
  name: { type: String },
});
</script>

// Or with validator
<script setup>
const props = defineProps({
  name: {
// ...
```

#### [ ] `vue/require-typed-ref`

- Category: style
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.17.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/require-typed-ref.html
- What it does: Require ref and shallowRef functions to be strongly typed.
- Covers: With TypeScript it is easy to prevent usage of any by using noImplicitAny. Unfortunately this rule is easily bypassed with Vue ref() function. Calling ref() function without a generic parameter or an initial value leads to ref having Ref<any> type.

Flagged example:

```typescript
const count = ref();
const name = shallowRef();
```

Accepted example:

```typescript
const count = ref<number>();
const a = ref(0);
```

### restriction

#### [ ] `vue/max-props`

- Category: restriction
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.19.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/max-props.html
- What it does: Enforce a maximum number of props defined for a given Vue component.
- Covers: A large number of props on a component can indicate that it is trying to do too much and may be difficult to maintain or understand.

Flagged example:

```js
<script setup>
defineProps({
  prop1: String,
  prop2: String,
})
</script>
```

Accepted example:

```js
<script setup>
defineProps({
  prop1: String,
})
</script>
```

#### [ ] `vue/no-import-compiler-macros`

- Category: restriction
- Default: no
- Fix: dangerous auto-fix
- Type-aware: no
- Added: 1.21.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-import-compiler-macros.html
- What it does: Disallow importing Vue compiler macros.
- Covers: Compiler Macros like:

Flagged example:

```vue
<script setup>
import { defineProps, withDefaults } from "vue";
</script>
```

Accepted example:

```vue
<script setup>
import { ref } from "vue";
</script>
```

#### [ ] `vue/no-multiple-slot-args`

- Category: restriction
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.15.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-multiple-slot-args.html
- What it does: Disallow passing multiple arguments to scoped slots.
- Covers: Users have to use the arguments in fixed order and cannot omit the ones they don't need. e.g. if you have a slot that passes in 5 arguments but the user actually only need the last 2 of them, they will have to declare all 5 just to use the last 2.

Flagged example:

```vue
<script>
export default {
  render(h) {
    var children = this.$scopedSlots.default(foo, bar);
    var children = this.$scopedSlots.default(...foo);
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  render(h) {
    var children = this.$scopedSlots.default();
    var children = this.$scopedSlots.default(foo);
    var children = this.$scopedSlots.default({ foo, bar });
  },
};
</script>
```

### correctness

#### [ ] `vue/no-arrow-functions-in-watch`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.39.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-arrow-functions-in-watch.html
- What it does: This rule disallows using arrow functions when defining a watcher.
- Covers: Arrow functions bind this lexically, which means they don't have access to the Vue component instance. In Vue watchers, you often need access to this to interact with component data, methods, or other properties. Using regular functions or method shorthand ensures proper this binding.

Flagged example:

```vue
<script>
export default {
  watch: {
    foo: () => {},
    bar: {
      handler: () => {},
    },
    baz: [
      (val) => {},
      {
// ...
```

Accepted example:

```vue
<script>
export default {
  watch: {
    foo() {},
    bar: function () {},
    baz: {
      handler: function () {},
    },
  },
};
// ...
```

#### [ ] `vue/no-async-in-computed-properties`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: next
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-async-in-computed-properties.html
- What it does: Disallow asynchronous actions in computed properties.
- Covers: Asynchronous actions inside computed properties may lead to an unexpected behavior. A computed property's value should be a synchronous function of its dependencies.

Flagged example:

```vue
<script>
export default {
  computed: {
    pro() {
      return Promise.all([new Promise((resolve, reject) => {})]);
    },
    foo: async function () {
      return await someFunc();
    },
    bar() {
// ...
```

Accepted example:

```vue
<script>
export default {
  computed: {
    foo() {
      return this.bar;
    },
  },
};
</script>
```

#### [ ] `vue/no-computed-properties-in-data`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-computed-properties-in-data.html
- What it does: Disallow accessing computed properties inside data().
- Covers: data() runs before computed properties are initialized, so this.<computedName> evaluates to undefined and leaves silently broken state in the component instance.

Flagged example:

```vue
<script>
export default {
  data() {
    const foo = this.foo; // `foo` is a computed property
    return {};
  },
  computed: {
    foo() {},
  },
};
// ...
```

Accepted example:

```vue
<script>
export default {
  data() {
    const foo = this.foo; // `foo` is a prop, not a computed
    return {};
  },
  props: ["foo"],
};
</script>
```

#### [ ] `vue/no-deprecated-data-object-declaration`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.62.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-deprecated-data-object-declaration.html
- What it does: Disallow object declarations for data (in Vue.js 3.0.0+).
- Covers: In Vue 3, declaring data as an object causes the same object to be shared between every instance of the component, which leads to cross- instance state pollution. data must be a function that returns a fresh object per instance.

Flagged example:

```vue
<script>
export default {
  data: {
    foo: "bar",
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  data() {
    return { foo: "bar" };
  },
};
</script>
```

#### [ ] `vue/no-deprecated-delete-set`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.62.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-deprecated-delete-set.html
- What it does: Disallow using deprecated $set / $delete (in Vue.js 3.0.0+).
- Covers: In Vue 3, the instance methods $set / $delete and the global Vue.set / Vue.delete were removed. Reactivity is now backed by Proxies, so plain assignment and the delete operator work as expected and these helpers are no longer needed.

Flagged example:

```vue
<script>
export default {
  mounted() {
    this.$set(obj, key, value);
    this.$delete(obj, key);
    Vue.set(obj, key, value);
    Vue.delete(obj, key);
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  mounted() {
    obj[key] = value;
    delete obj[key];
  },
};
</script>
```

#### [ ] `vue/no-deprecated-destroyed-lifecycle`

- Category: correctness
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.35.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-deprecated-destroyed-lifecycle.html
- What it does: Disallow using deprecated destroyed and beforeDestroy lifecycle hooks in Vue.js 3.0.0+.
- Covers: In Vue.js 3.0.0+, the destroyed and beforeDestroy lifecycle hooks have been renamed to unmounted and beforeUnmount respectively. Using the old names is deprecated and may cause confusion or compatibility issues.

Flagged example:

```vue
<script>
export default {
  beforeDestroy() {},
  destroyed() {},
};
</script>
```

Accepted example:

```vue
<script>
export default {
  beforeUnmount() {},
  unmounted() {},
};
</script>
```

#### [ ] `vue/no-deprecated-events-api`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.62.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-deprecated-events-api.html
- What it does: Disallow using deprecated Events API ($on, $off, $once) in Vue.js 3.0.0+.
- Covers: In Vue.js 3.0.0+, the internal event APIs $on, $off, and $once have been removed. These methods were used for event handling between components but are no longer available.

Flagged example:

```vue
<script>
export default {
  mounted() {
    this.$on("event", () => {});
    this.$off("event");
    this.$once("event", () => {});
  },
};
</script>
```

Accepted example:

```vue
<script>
import mitt from "mitt";

const emitter = mitt();

export default {
  mounted() {
    emitter.on("event", () => {});
    emitter.off("event");
    emitter.once("event", () => {});
// ...
```

#### [ ] `vue/no-deprecated-model-definition`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.63.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-deprecated-model-definition.html
- What it does: Disallow deprecated model definition (in Vue.js 3.0.0+).
- Covers: Vue 3 removed the per-component model option. Instead, v-model works through the modelValue prop and the update:modelValue event, so a model: { prop, event } block is no longer needed.

Flagged example:

```vue
<script>
export default {
  model: {
    prop: "foo",
    event: "update",
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
};
</script>
```

#### [ ] `vue/no-deprecated-props-default-this`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-deprecated-props-default-this.html
- What it does: Disallow deprecated this access in props default function (in Vue.js 3.0.0+).
- Covers: In Vue.js 3.0.0+, props default factory functions no longer have access to this. They are invoked before the component instance is created, so this is undefined. The factory should rely on its first argument (the raw props passed by the parent) instead.

Flagged example:

```vue
<script>
export default {
  props: {
    a: String,
    b: {
      default() {
        return this.a;
      },
    },
  },
// ...
```

Accepted example:

```vue
<script>
export default {
  props: {
    a: String,
    b: {
      default(props) {
        return props.a;
      },
    },
  },
// ...
```

#### [ ] `vue/no-deprecated-vue-config-keycodes`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.62.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-deprecated-vue-config-keycodes.html
- What it does: Disallow using deprecated Vue.config.keyCodes (in Vue.js 3.0.0+).
- Covers: Vue.config.keyCodes was removed in Vue 3. Code that relies on it will silently stop working when upgrading.

Flagged example:

```js
Vue.config.keyCodes = { enter: 13 };
```

Accepted example:

```js
Vue.config.silent = true;
```

#### [ ] `vue/no-dupe-keys`

- Category: correctness
- Default: yes
- Fix: none
- Type-aware: no
- Added: 1.70.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-dupe-keys.html
- What it does: Disallow duplication of field names.
- Covers: Duplicate keys in Vue component options (props, data, computed, methods, setup) can cause unexpected behavior because they may overwrite each other at runtime, and they cause name collisions in the template.

Flagged example:

```vue
<script>
export default {
  props: ["foo"],
  computed: {
    foo() {},
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  props: ["foo"],
  computed: {
    bar() {},
  },
};
</script>
```

#### [ ] `vue/no-export-in-script-setup`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-export-in-script-setup.html
- What it does: Disallow export in <script setup>
- Covers: The previous version of <script setup> RFC used export to define variables used in templates, but the new <script setup> RFC has been updated to define without using export. See Vue RFCs - 0040-script-setup for more details.

Flagged example:

```vue
<script setup>
export let msg = "Hello!";
</script>
```

Accepted example:

```vue
<script setup>
let msg = "Hello!";
</script>
```

#### [ ] `vue/no-expose-after-await`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-expose-after-await.html
- What it does: Disallow asynchronously registered expose.
- Covers: defineExpose and context.expose() registered after an await expression in <script setup> or setup() may not work as expected because they are registered after the component instance has finished setting up.

Flagged example:

```vue
<script setup>
await doSomething();
defineExpose({
  /* ... */
}); // error
</script>
```

Accepted example:

```vue
<script setup>
defineExpose({
  /* ... */
}); // ok
await doSomething();
</script>
```

#### [ ] `vue/no-lifecycle-after-await`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.39.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-lifecycle-after-await.html
- What it does: Disallow asynchronously registered lifecycle hooks.
- Covers: Lifecycle hooks must be registered synchronously during setup() execution. If a lifecycle hook is called after an await statement, it may be registered too late and might not work as expected.

Flagged example:

```vue
<script>
import { onMounted } from "vue";
export default {
  async setup() {
    await doSomething();
    onMounted(() => {
      /* ... */
    }); // error
  },
};
// ...
```

Accepted example:

```vue
<script>
import { onMounted } from "vue";
export default {
  async setup() {
    onMounted(() => {
      /* ... */
    }); // ok
    await doSomething();
  },
};
// ...
```

#### [ ] `vue/no-reserved-component-names`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.68.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-reserved-component-names.html
- What it does: Disallow Vue component names that collide with HTML / SVG element names (and optionally Vue built-in component names).
- Covers: Using a reserved name silently shadows the standard element / built-in component, producing confusing behavior at runtime.

Flagged example:

```vue
<script>
export default {
  name: "div",
};
</script>
```

Accepted example:

```vue
<script>
export default {
  name: "MyComponent",
};
</script>
```

#### [ ] `vue/no-reserved-keys`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.69.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-reserved-keys.html
- What it does: Disallow overwriting reserved Vue instance keys (e.g. $data, $emit) or using _-prefixed keys inside data / asyncData.
- Covers: Vue exposes a number of instance properties ($emit, $data, $props, etc.). Defining a prop, computed, data, method or setup return key with the same name overwrites the underlying Vue API and silently breaks the component (e.g. methods: { $emit() {} } clobbers event emission). Vue also reserves _-prefixed names inside its reactivity system, so data() { return { _foo: 1 } } may collide with internal state.

Flagged example:

```vue
<script>
export default {
  props: ["$data"],
  methods: {
    $emit() {},
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  props: ["fooData"],
  methods: {
    send() {},
  },
};
</script>
```

#### [ ] `vue/no-reserved-props`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.69.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-reserved-props.html
- What it does: Disallow reserved attribute names (e.g. key, ref) from being used as prop names.
- Covers: Vue treats a number of attributes specially (key and ref in Vue 3; additionally is, slot, slot-scope, class and style in Vue 2). Declaring a prop with one of these names collides with the framework's own handling and breaks the component.

Flagged example:

```vue
<script>
export default {
  props: {
    ref: String,
    key: String,
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  props: {
    foo: String,
  },
};
</script>
```

#### [ ] `vue/no-shared-component-data`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-shared-component-data.html
- What it does: Enforce that the data property of a Vue component definition is a function.
- Covers: When data is declared as an object literal, the same object is shared across every instance of the component, which causes cross-instance state pollution. Returning a fresh object from a function avoids that.

Flagged example:

```vue
<script>
Vue.component("some-comp", {
  data: {
    foo: "bar",
  },
});
</script>
```

Accepted example:

```vue
<script>
Vue.component("some-comp", {
  data() {
    return { foo: "bar" };
  },
});
</script>
```

#### [ ] `vue/no-side-effects-in-computed-properties`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.70.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-side-effects-in-computed-properties.html
- What it does: Disallow side effects in computed properties.
- Covers: It is considered a very bad practice to introduce side effects inside computed properties. It makes the code unpredictable and hard to understand.

Flagged example:

```vue
<script>
export default {
  computed: {
    fullName() {
      this.firstName = "lorem"; // side effect
      return `${this.firstName} ${this.lastName}`;
    },
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
};
</script>
```

#### [ ] `vue/no-this-in-before-route-enter`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.37.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-this-in-before-route-enter.html
- What it does: Disallow this usage in a beforeRouteEnter method.
- Covers: Inside a beforeRouteEnter method, there is no access to this. See the vue-router docs. This behavior isn't obvious, and so this lint rule can help prevent runtime errors in some cases.

Flagged example:

```js
export default {
  beforeRouteEnter(to, from, next) {
    this.a; // Error: 'this' is not available
    next();
  },
};
```

Accepted example:

```js
export default {
  beforeRouteEnter(to, from, next) {
    // anything without `this`
  },
};
```

#### [ ] `vue/no-watch-after-await`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-watch-after-await.html
- What it does: Disallow asynchronously-registered watch.
- Covers: watch and watchEffect registered after an await expression in setup() may not work as expected because they are registered after the component instance has finished setting up.

Flagged example:

```vue
<script>
import { watch } from "vue";
export default {
  async setup() {
    await doSomething();
    watch(foo, () => {
      /* ... */
    }); // error
  },
};
// ...
```

Accepted example:

```vue
<script>
import { watch } from "vue";
export default {
  async setup() {
    watch(foo, () => {
      /* ... */
    }); // ok
    await doSomething();
  },
};
// ...
```

#### [ ] `vue/prefer-import-from-vue`

- Category: correctness
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.20.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/prefer-import-from-vue.html
- What it does: Enforce imports from vue instead of @vue/*.
- Covers: Imports from the following modules are almost always wrong. You should import from vue instead.

Flagged example:

```js
import { createApp } from "@vue/runtime-dom";
import { Component } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
```

Accepted example:

```js
import { createApp, ref, Component } from "vue";
```

#### [ ] `vue/require-prop-type-constructor`

- Category: correctness
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.68.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/require-prop-type-constructor.html
- What it does: Require props type values to be a constructor function (e.g. String, Number, Boolean) rather than a string, number, or other literal.
- Covers: Vue uses the prop type for runtime validation and dev-time warnings. A string like 'String' looks like the constructor but is never matched against an actual value, silently disabling the check.

Flagged example:

```vue
<script>
export default {
  props: {
    foo: "String",
    bar: { type: "Number" },
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  props: {
    foo: String,
    bar: { type: Number },
  },
};
</script>
```

#### [ ] `vue/require-render-return`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/require-render-return.html
- What it does: Enforce that a render function always returns a value.
- Covers: A Vue component's render function must produce a VNode tree. If a code path falls through without returning, Vue receives undefined and silently renders nothing.

Flagged example:

```vue
<script>
export default {
  render() {
    if (foo) {
      return h("div");
    }
    // falls through without returning
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  render() {
    return h("div");
  },
};
</script>
```

#### [ ] `vue/require-slots-as-functions`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/require-slots-as-functions.html
- What it does: Enforce properties of $slots to be used as functions.
- Covers: In Vue.js 3, this.$slots.<name> is a function (slot render function), not an array of vnodes like in Vue.js 2. Treating slot properties as values (e.g. this.$slots.default.filter(...)) breaks at runtime.

Flagged example:

```vue
<script>
export default {
  render(h) {
    var children = this.$slots.default
    return h('div', children.filter(...))
  }
}
</script>
```

Accepted example:

```vue
<script>
export default {
  render(h) {
    var children = this.$slots.default();
    return h("div", children);
  },
};
</script>
```

#### [ ] `vue/return-in-computed-property`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.63.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/return-in-computed-property.html
- What it does: Enforce that a return statement is present in every computed property.
- Covers: A Vue computed property is a getter that must produce a value. Forgetting to return turns the value into undefined, which silently breaks templates and reactive code that depend on the computed.

Flagged example:

```vue
<script>
export default {
  computed: {
    foo() {
      // missing return
    },
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  computed: {
    foo() {
      return this.bar;
    },
  },
};
</script>
```

#### [ ] `vue/return-in-emits-validator`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/return-in-emits-validator.html
- What it does: Enforce that a return statement is present in emits validators (in Vue.js 3.0.0+).
- Covers: An emits validator must return a boolean indicating whether the emitted payload is valid. Forgetting to return a value (or returning only falsy values) makes the validator effectively reject every emit, breaking the component contract silently.

Flagged example:

```vue
<script>
export default {
  emits: {
    foo() {
      // missing return
    },
  },
};
</script>
```

Accepted example:

```vue
<script>
export default {
  emits: {
    foo(payload) {
      return typeof payload === "string";
    },
  },
};
</script>
```

#### [ ] `vue/valid-define-emits`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.14.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/valid-define-emits.html
- What it does: Enforce valid usage of the defineEmits compiler macro in Vue.
- Covers: Misusing defineEmits can lead to runtime errors, unclear component contracts, and lost type safety. Vue may still compile the code, but emitted events may break silently or be typed incorrectly.

Flagged example:

```vue
<script setup>
const def = { notify: null };
defineEmits(def);
</script>
```

Accepted example:

```vue
<script setup>
defineEmits({ notify: null });
</script>
```

#### [ ] `vue/valid-define-options`

- Category: correctness
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/valid-define-options.html
- What it does: Enforce valid use of the defineOptions compiler macro.
- Covers: defineOptions is a compiler macro for <script setup>. It must be called with a single object literal containing component options that are evaluable at compile time. Misuse such as referencing locally declared variables, declaring props/emits/expose/slots, calling without arguments, or passing type arguments cannot be processed by the compiler.

Flagged example:

```vue
<script setup>
defineOptions(); // no options object
defineOptions({ name: "A" });
defineOptions({ name: "B" }); // multiple calls
defineOptions({ props: { msg: String } }); // use `defineProps()` instead
</script>
```

Accepted example:

```vue
<script setup>
defineOptions({ name: "foo", inheritAttrs: false });
</script>
```

#### [ ] `vue/valid-define-props`

- Category: correctness
- Default: no
- Fix: possible, not implemented
- Type-aware: no
- Added: 1.15.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/valid-define-props.html
- What it does: Enforce valid usage of the defineProps compiler macro in Vue.
- Covers: Misusing defineProps can lead to runtime errors, and lost type safety. Vue may still compile the code, but properties may break silently or be typed incorrectly.

Flagged example:

```vue
<script setup>
const def = { msg: String };
defineProps(def);
</script>
```

Accepted example:

```vue
<script setup>
defineProps({ msg: String });
</script>
```

#### [ ] `vue/valid-next-tick`

- Category: correctness
- Default: no
- Fix: auto-fix
- Type-aware: no
- Added: 1.67.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/valid-next-tick.html
- What it does: Enforce valid nextTick function calls.
- Covers: nextTick is a function that takes either a callback or returns a Promise. Misuse (accessing it as a value, passing extra arguments, both awaiting and passing a callback) is almost always a bug.

Flagged example:

```vue
<script>
import { nextTick } from "vue";
export default {
  async mounted() {
    nextTick(); // missing await or callback
    this.$nextTick; // not invoked
    this.$nextTick(a, b); // too many args
    await this.$nextTick(callback); // both await and callback
  },
};
// ...
```

Accepted example:

```vue
<script>
import { nextTick } from "vue";
export default {
  async mounted() {
    await nextTick();
    this.$nextTick(callback);
    this.$nextTick().then(callback);
  },
};
</script>
```

### suspicious

#### [ ] `vue/no-required-prop-with-default`

- Category: suspicious
- Default: no
- Fix: suggestion
- Type-aware: no
- Added: 1.17.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/no-required-prop-with-default.html
- What it does: Enforce props with default values to be optional.
- Covers: If a prop is declared with a default value, whether it is required or not, we can always skip it in actual use. In that situation, the default value would be applied. So, a required prop with a default value is essentially the same as an optional prop.

Flagged example:

```vue
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string | number;
    age?: number;
  }>(),
  {
    name: "Foo",
  },
);
// ...
```

Accepted example:

```vue
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string | number;
    age?: number;
  }>(),
  {
    name: "Foo",
  },
);
// ...
```

#### [ ] `vue/require-default-export`

- Category: suspicious
- Default: no
- Fix: none
- Type-aware: no
- Added: 1.21.0
- Docs: https://oxc.rs/docs/guide/usage/linter/rules/vue/require-default-export.html
- What it does: Require components to be the default export.
- Covers: Using SFCs (Single File Components) without a default export is not supported in Vue 3. Components should be exported as the default export.

Flagged example:

```vue
<script>
const foo = "foo";
</script>
```

Accepted example:

```vue
<script>
export default {
  data() {
    return {
      foo: "foo",
    };
  },
};
</script>
```
