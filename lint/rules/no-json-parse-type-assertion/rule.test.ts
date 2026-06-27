import { describe, expect, it } from "vitest";

import { createOxlintRuleTester } from "../../test-utils/run-oxlint.js";

const ruleId = "hodor/no-json-parse-type-assertion";
const { collectRuleMessages, runOxlint } = createOxlintRuleTester({
  ruleDirectoryUrl: import.meta.url,
  tempProjectPrefix: "hodor-no-json-parse-type-assertion-",
});

describe("hodor/no-json-parse-type-assertion via oxlint CLI", () => {
  it("does not report validated JSON.parse results", () => {
    const run = runOxlint({ fixtureName: "valid-validated-json.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("reports as assertions around JSON.parse", () => {
    const run = runOxlint({ fixtureName: "invalid-as-assertion.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Validate JSON.parse output");
  });

  it("reports angle-bracket assertions around JSON.parse", () => {
    const run = runOxlint({ fixtureName: "invalid-angle-assertion.ts" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Validate JSON.parse output");
  });
});
