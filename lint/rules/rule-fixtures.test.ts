import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  collectRuleMessages,
  parseFixtureExpectations,
  runOxlintForFixture,
} from "../test-utils/run-oxlint.js";

type FixtureCase =
  | {
      kind: "valid";
      fixturePath: string;
      ruleName: string;
    }
  | {
      kind: "invalid";
      fixturePath: string;
      ruleName: string;
    }
  | {
      kind: "fix";
      expectedPath: string;
      fixturePath: string;
      ruleName: string;
    };

type SortableArray<T> = T[] & {
  toSorted(compareFn?: (left: T, right: T) => number): T[];
};

function sortValues<T>({
  compare,
  values,
}: {
  compare?: (left: T, right: T) => number;
  values: T[];
}) {
  return (values as SortableArray<T>).toSorted(compare);
}

function getExpectedFixPath({ fixturePath }: { fixturePath: string }) {
  const expectedPath = fixturePath.replace(".input.", ".expected.");

  if (expectedPath === fixturePath || !existsSync(expectedPath)) {
    throw new Error(`Missing expected fix fixture for ${fixturePath}`);
  }

  return expectedPath;
}

function discoverFixtureCases({ rootDirectory }: { rootDirectory: string }) {
  const cases: FixtureCase[] = [];

  for (const entry of sortValues({
    values: readdirSync(rootDirectory, { withFileTypes: true }),
    compare: (left, right) => left.name.localeCompare(right.name),
  })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const ruleName = entry.name;
    const ruleDirectory = path.join(rootDirectory, ruleName);

    if (!existsSync(path.join(ruleDirectory, "rule.js"))) {
      throw new Error(`Rule directory ${ruleDirectory} is missing rule.js`);
    }

    const fixturesDir = path.join(ruleDirectory, "fixtures");

    if (!existsSync(fixturesDir)) {
      continue;
    }

    for (const fixtureName of sortValues({ values: readdirSync(fixturesDir) })) {
      const fixturePath = path.join(fixturesDir, fixtureName);

      if (fixtureName.startsWith("valid-")) {
        cases.push({ kind: "valid", fixturePath, ruleName });
        continue;
      }

      if (fixtureName.startsWith("invalid-")) {
        cases.push({ kind: "invalid", fixturePath, ruleName });
        continue;
      }

      if (fixtureName.startsWith("fix-") && fixtureName.includes(".input.")) {
        cases.push({
          kind: "fix",
          expectedPath: getExpectedFixPath({ fixturePath }),
          fixturePath,
          ruleName,
        });
        continue;
      }

      if (fixtureName.startsWith("fix-") && fixtureName.includes(".expected.")) {
        continue;
      }

      throw new Error(`Unknown fixture naming convention: ${fixturePath}`);
    }
  }

  return cases;
}

function getRuleId({ ruleName }: { ruleName: string }) {
  return `hodor/${ruleName}`;
}

const rulesRoot = path.dirname(fileURLToPath(import.meta.url));
const fixtureCases = discoverFixtureCases({ rootDirectory: rulesRoot });

describe("custom oxlint rule fixtures", () => {
  for (const fixtureCase of fixtureCases) {
    const title = `${fixtureCase.ruleName} ${path.basename(fixtureCase.fixturePath)}`;

    switch (fixtureCase.kind) {
      case "valid": {
        it.concurrent(`accepts ${title}`, async () => {
          const run = await runOxlintForFixture(fixtureCase);
          const messages = collectRuleMessages({
            results: run.parsed,
            ruleId: getRuleId(fixtureCase),
          });

          expect(run.status).toBe(0);
          expect(messages).toHaveLength(0);
        });
        break;
      }

      case "invalid": {
        it.concurrent(`reports ${title}`, async () => {
          const run = await runOxlintForFixture(fixtureCase);
          const messages = collectRuleMessages({
            results: run.parsed,
            ruleId: getRuleId(fixtureCase),
          });
          const expectations = parseFixtureExpectations({
            fixtureContent: readFileSync(fixtureCase.fixturePath, "utf8"),
            fixturePath: fixtureCase.fixturePath,
          });

          expect(run.status).toBe(1);
          expect(messages).toHaveLength(expectations.expectedCount ?? 1);

          for (const expectedMessage of expectations.expectedMessages) {
            expect(messages.some((message) => message.message?.includes(expectedMessage))).toBe(
              true,
            );
          }
        });
        break;
      }

      case "fix": {
        it.concurrent(`fixes ${title}`, async () => {
          const run = await runOxlintForFixture({ ...fixtureCase, fix: true });

          expect(run.status).toBe(0);
          expect(run.fileContent).toBe(readFileSync(fixtureCase.expectedPath, "utf8"));
        });
        break;
      }
    }
  }
});

describe("custom oxlint rule fixture conventions", () => {
  it("fails when a fix input fixture has no expected output pair", () => {
    expect(() =>
      getExpectedFixPath({
        fixturePath: path.join(rulesRoot, "example", "fixtures", "fix-example.input.tsx"),
      }),
    ).toThrow("Missing expected fix fixture");
  });

  it("fails on malformed hodor-test directives", () => {
    expect(() =>
      parseFixtureExpectations({
        fixtureContent: "// hodor-test expect-message missing colon",
        fixturePath: "fixture.tsx",
      }),
    ).toThrow("Malformed hodor-test directive");
  });

  it("fails when a rule fixture directory has no rule implementation", () => {
    const tempRulesRoot = mkdtempSync(path.join(tmpdir(), "hodor-rules-root-"));

    try {
      mkdirSync(path.join(tempRulesRoot, "missing-rule", "fixtures"), { recursive: true });

      expect(() =>
        discoverFixtureCases({
          rootDirectory: tempRulesRoot,
        }),
      ).toThrow("is missing rule.js");
    } finally {
      rmSync(tempRulesRoot, { recursive: true, force: true });
    }
  });
});
