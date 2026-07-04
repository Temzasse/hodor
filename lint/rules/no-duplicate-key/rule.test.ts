import { describe, expect, it } from "vitest";

import { createOxlintRuleTester } from "../../test-utils/run-oxlint.js";

const ruleId = "hodor/no-duplicate-key";
const { collectRuleMessages, runOxlint } = createOxlintRuleTester({
  ruleDirectoryUrl: import.meta.url,
  tempProjectPrefix: "hodor-no-duplicate-key-",
});

describe("hodor/no-duplicate-key via oxlint CLI", () => {
  it("does not report valid code", () => {
    const run = runOxlint({ fixtureName: "valid-no-duplicate-key.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("reports invalid code", () => {
    const run = runOxlint({ fixtureName: "invalid-no-duplicate-key.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Duplicate JSX key");
  });
});
