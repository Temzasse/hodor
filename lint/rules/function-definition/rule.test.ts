import { describe, expect, it } from "vitest";

import { createOxlintRuleTester } from "../../test-utils/run-oxlint.js";

const ruleId = "hodor/function-definition";
const { collectRuleMessages, runOxlint } = createOxlintRuleTester({
  ruleDirectoryUrl: import.meta.url,
  tempProjectPrefix: "hodor-function-definition-",
});

describe("hodor/function-definition via oxlint CLI", () => {
  it("does not report valid code", () => {
    const run = runOxlint({ fixtureName: "valid-function-definition.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("reports invalid code", () => {
    const run = runOxlint({ fixtureName: "invalid-function-definition.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("function declaration");
  });
});
