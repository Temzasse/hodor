import { describe, expect, it } from "vitest";

import { createOxlintRuleTester } from "../../test-utils/run-oxlint.js";

const ruleId = "hodor/no-leaked-semicolon";
const { collectRuleMessages, runOxlint } = createOxlintRuleTester({
  ruleDirectoryUrl: import.meta.url,
  tempProjectPrefix: "hodor-no-leaked-semicolon-",
});

describe("hodor/no-leaked-semicolon via oxlint CLI", () => {
  it("does not report valid code", () => {
    const run = runOxlint({ fixtureName: "valid-no-leaked-semicolon.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("reports invalid code", () => {
    const run = runOxlint({ fixtureName: "invalid-no-leaked-semicolon.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("stray semicolon");
  });
});
