import { describe, expect, it } from "vitest";

import { createOxlintRuleTester } from "../../test-utils/run-oxlint.js";

const ruleId = "hodor/no-forward-ref";
const { collectRuleMessages, runOxlint } = createOxlintRuleTester({
  ruleDirectoryUrl: import.meta.url,
  tempProjectPrefix: "hodor-no-forward-ref-",
});

describe("hodor/no-forward-ref via oxlint CLI", () => {
  it("does not report regular ref props", () => {
    const run = runOxlint({ fixtureName: "valid-ref-prop.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("reports forwardRef calls", () => {
    const run = runOxlint({ fixtureName: "invalid-forward-ref.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Avoid forwardRef");
  });

  it("reports React.forwardRef calls", () => {
    const run = runOxlint({ fixtureName: "invalid-react-forward-ref.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Avoid forwardRef");
  });
});
