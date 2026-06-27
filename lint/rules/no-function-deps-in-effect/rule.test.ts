import { describe, expect, it } from "vitest";

import { createOxlintRuleTester } from "../../test-utils/run-oxlint.js";

const ruleId = "hodor/no-function-deps-in-effect";
const { collectRuleMessages, loadFixture, runOxlint } = createOxlintRuleTester({
  ruleDirectoryUrl: import.meta.url,
  tempProjectPrefix: "hodor-no-function-deps-",
});

describe("hodor/no-function-deps-in-effect via oxlint CLI", () => {
  it("reports function identifiers in useEffect dependency arrays", () => {
    const run = runOxlint({ fixtureName: "invalid-function-dep.jsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Function 'handleClick' in effect deps");
  });

  it("reports useState setter references in dependency arrays", () => {
    const run = runOxlint({ fixtureName: "invalid-state-setter-dep.jsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Function 'setCount' in effect deps");
  });

  it("reports useCallback references in dependency arrays", () => {
    const run = runOxlint({ fixtureName: "invalid-use-callback-dep.jsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Function 'onChange' in effect deps");
  });

  it("does not report non-function dependencies", () => {
    const run = runOxlint({ fixtureName: "valid-non-function-dep.jsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("autofixes trailing function deps while preserving remaining deps", () => {
    const run = runOxlint({
      fixtureName: "fix-trailing-function-dep.input.jsx",
      fix: true,
    });

    expect(run.status).toBe(0);
    expect(run.fileContent).toBe(loadFixture("fix-trailing-function-dep.expected.jsx"));
  });

  it("autofixes a single function dep to an empty array", () => {
    const run = runOxlint({
      fixtureName: "fix-single-function-dep.input.jsx",
      fix: true,
    });

    expect(run.status).toBe(0);
    expect(run.fileContent).toBe(loadFixture("fix-single-function-dep.expected.jsx"));
  });
});
