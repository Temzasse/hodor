import { describe, expect, it } from "vitest";

import { createOxlintRuleTester } from "../../test-utils/run-oxlint.js";

const ruleId = "hodor/no-default-react-memoization";
const { collectRuleMessages, runOxlint } = createOxlintRuleTester({
  ruleDirectoryUrl: import.meta.url,
  tempProjectPrefix: "hodor-no-default-react-memoization-",
});

describe("hodor/no-default-react-memoization via oxlint CLI", () => {
  it("does not report direct code", () => {
    const run = runOxlint({ fixtureName: "valid-direct-code.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("reports useMemo", () => {
    const run = runOxlint({ fixtureName: "invalid-use-memo.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Avoid useMemo by default");
  });

  it("reports useCallback", () => {
    const run = runOxlint({ fixtureName: "invalid-use-callback.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Avoid useCallback by default");
  });

  it("reports memo", () => {
    const run = runOxlint({ fixtureName: "invalid-memo.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Avoid memo by default");
  });
});
