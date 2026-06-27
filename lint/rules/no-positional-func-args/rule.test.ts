import { describe, expect, it } from "vitest";

import { createOxlintRuleTester } from "../../test-utils/run-oxlint.js";

const ruleId = "hodor/no-positional-func-args";
const { collectRuleMessages, runOxlint } = createOxlintRuleTester({
  ruleDirectoryUrl: import.meta.url,
  tempProjectPrefix: "hodor-no-positional-func-args-",
});

describe("hodor/no-positional-func-args via oxlint CLI", () => {
  it("does not report named object parameters", () => {
    const run = runOxlint({ fixtureName: "valid-object-parameter.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("does not report one positional parameter", () => {
    const run = runOxlint({ fixtureName: "valid-single-parameter.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("does not report two positional parameters with different primitive types", () => {
    const run = runOxlint({ fixtureName: "valid-two-different-types.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("does not report third-party or built-in calls with many arguments", () => {
    const run = runOxlint({ fixtureName: "valid-many-argument-calls.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("reports function signatures with more than two positional parameters", () => {
    const run = runOxlint({ fixtureName: "invalid-too-many.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("instead of 3 positional parameters");
  });

  it("reports two string parameters", () => {
    const run = runOxlint({ fixtureName: "invalid-two-strings.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("same string type");
  });

  it("reports two number parameters", () => {
    const run = runOxlint({ fixtureName: "invalid-two-numbers.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("same number type");
  });

  it("reports two boolean parameters", () => {
    const run = runOxlint({ fixtureName: "invalid-two-booleans.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("same boolean type");
  });
});
