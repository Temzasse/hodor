import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, it } from "vitest";

type OxlintDiagnostic = {
  code?: string;
  message?: string;
};

type OxlintJsonOutput = {
  diagnostics?: OxlintDiagnostic[];
};

type OxlintMessage = {
  ruleId?: string;
  message?: string;
};

const thisDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(thisDir, "../../..");
const fixturesDir = path.join(thisDir, "fixtures");
const oxlintConfigPath = path.join(thisDir, "oxlint.test.config.json");
const oxlintBin = path.join(packageRoot, "node_modules", ".bin", "oxlint");
const tempDirs: string[] = [];

function loadFixture(name: string) {
  return readFileSync(path.join(fixturesDir, name), "utf8");
}

function createTempProject(fixtureName: string) {
  const tempDir = mkdtempSync(path.join(tmpdir(), "react-taste-no-function-deps-"));
  tempDirs.push(tempDir);

  const srcFilePath = path.join(tempDir, "case.jsx");
  writeFileSync(srcFilePath, loadFixture(fixtureName), "utf8");

  return {
    tempDir,
    srcFilePath,
  };
}

function runOxlint({ fixtureName, fix = false }: { fixtureName: string; fix?: boolean }) {
  const { srcFilePath, tempDir } = createTempProject(fixtureName);
  const args = ["--config", oxlintConfigPath, srcFilePath, "--format", "json"];

  if (fix) {
    args.unshift("--fix");
  }

  const result = spawnSync(oxlintBin, args, {
    cwd: tempDir,
    encoding: "utf8",
  });

  if (result.error) {
    throw result.error;
  }

  const stdout = result.stdout.trim();

  return {
    status: result.status,
    stderr: result.stderr,
    stdout,
    parsed: parseOxlintJson(stdout),
    fileContent: readFileSync(srcFilePath, "utf8"),
  };
}

function parseOxlintJson(stdout: string) {
  if (!stdout) {
    return [] as OxlintMessage[];
  }

  const parsed = JSON.parse(stdout) as OxlintJsonOutput;
  const diagnostics = parsed.diagnostics ?? [];

  return diagnostics.map((diagnostic) => ({
    ruleId: normalizeRuleId(diagnostic.code),
    message: diagnostic.message,
  }));
}

function normalizeRuleId(code?: string) {
  if (!code) {
    return undefined;
  }

  const match = code.match(/^([^()]+)\(([^()]+)\)$/);

  if (!match) {
    return code;
  }

  return `${match[1]}/${match[2]}`;
}

function collectRuleMessages(results: OxlintMessage[], ruleId: string) {
  return results.filter((message) => message.ruleId === ruleId);
}

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

describe("react-taste/no-function-deps-in-effect via oxlint CLI", () => {
  it("reports function identifiers in useEffect dependency arrays", () => {
    const run = runOxlint({ fixtureName: "invalid-function-dep.jsx" });
    const messages = collectRuleMessages(run.parsed, "react-taste/no-function-deps-in-effect");

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Function 'handleClick' in effect deps");
  });

  it("reports useState setter references in dependency arrays", () => {
    const run = runOxlint({ fixtureName: "invalid-state-setter-dep.jsx" });
    const messages = collectRuleMessages(run.parsed, "react-taste/no-function-deps-in-effect");

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Function 'setCount' in effect deps");
  });

  it("reports useCallback references in dependency arrays", () => {
    const run = runOxlint({ fixtureName: "invalid-use-callback-dep.jsx" });
    const messages = collectRuleMessages(run.parsed, "react-taste/no-function-deps-in-effect");

    expect(run.status).toBe(1);
    expect(messages).toHaveLength(1);
    expect(messages[0]?.message).toContain("Function 'onChange' in effect deps");
  });

  it("does not report non-function dependencies", () => {
    const run = runOxlint({ fixtureName: "valid-non-function-dep.jsx" });
    const messages = collectRuleMessages(run.parsed, "react-taste/no-function-deps-in-effect");

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
