import { describe, expect, it } from "vitest";

import { createOxlintRuleTester } from "../../test-utils/run-oxlint.js";

const ruleId = "hodor/no-react-fc";
const { collectRuleMessages, runOxlint } = createOxlintRuleTester({
  ruleDirectoryUrl: import.meta.url,
  tempProjectPrefix: "hodor-no-react-fc-",
});

describe("hodor/no-react-fc via oxlint CLI", () => {
  it("does not report plain function components", () => {
    const run = runOxlint({ fixtureName: "valid-plain-function.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(0);
    expect(messages).toHaveLength(0);
  });

  it("reports React.FC type references", () => {
    const run = runOxlint({ fixtureName: "invalid-react-fc.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Use a plain function component");
  });

  it("reports FunctionComponent type references", () => {
    const run = runOxlint({ fixtureName: "invalid-function-component.tsx" });
    const messages = collectRuleMessages(run.parsed, ruleId);

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Use a plain function component");
  });
});
