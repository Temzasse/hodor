import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach } from "vitest";

type OxlintDiagnostic = {
  code?: string;
  message?: string;
};

type CreateTempProjectParams = {
  fixtureName: string;
  readFixture(name: string): string;
  tempProjectPrefix: string;
};

type LoadFixtureParams = {
  fixturesDir: string;
};

type RunOxlintParams = {
  fixturesDir: string;
  ruleDirectory: string;
  tempProjectPrefix: string;
};

export type OxlintMessage = {
  ruleId?: string;
  message?: string;
};

export type OxlintRun = {
  status: number | null;
  stderr: string;
  stdout: string;
  parsed: OxlintMessage[];
  fileContent: string;
};

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const oxlintBin = path.join(packageRoot, "node_modules", ".bin", "oxlint");
const tempDirs: string[] = [];

export function createOxlintRuleTester({
  ruleDirectoryUrl,
  tempProjectPrefix,
}: {
  ruleDirectoryUrl: string;
  tempProjectPrefix: string;
}) {
  const ruleDirectory = path.dirname(fileURLToPath(ruleDirectoryUrl));
  const fixturesDir = path.join(ruleDirectory, "fixtures");

  return {
    collectRuleMessages,
    loadFixture: loadFixture({ fixturesDir }),
    runOxlint: runOxlint({ fixturesDir, ruleDirectory, tempProjectPrefix }),
  };
}

function loadFixture({ fixturesDir }: LoadFixtureParams) {
  return function readFixture(name: string) {
    return readFileSync(path.join(fixturesDir, name), "utf8");
  };
}

function runOxlint({ fixturesDir, ruleDirectory, tempProjectPrefix }: RunOxlintParams) {
  const readFixture = loadFixture({ fixturesDir });

  return function runOxlintForFixture({
    fixtureName,
    configName = "oxlint.test.config.json",
    fix = false,
  }: {
    fixtureName: string;
    configName?: string;
    fix?: boolean;
  }): OxlintRun {
    const { srcFilePath, tempDir } = createTempProject({
      fixtureName,
      readFixture,
      tempProjectPrefix,
    });
    const oxlintConfigPath = path.join(ruleDirectory, configName);
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
  };
}

function createTempProject({
  fixtureName,
  readFixture,
  tempProjectPrefix,
}: CreateTempProjectParams) {
  const tempDir = mkdtempSync(path.join(tmpdir(), tempProjectPrefix));
  tempDirs.push(tempDir);

  const srcFilePath = path.join(tempDir, `case${path.extname(fixtureName)}`);
  writeFileSync(srcFilePath, readFixture(fixtureName), "utf8");

  return {
    tempDir,
    srcFilePath,
  };
}

function parseOxlintJson(stdout: string) {
  if (!stdout) {
    return [] as OxlintMessage[];
  }

  const parsed: unknown = JSON.parse(stdout);
  const diagnostics = getDiagnostics(parsed);

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

function getDiagnostics(parsed: unknown) {
  if (!isRecord(parsed) || !Array.isArray(parsed.diagnostics)) {
    return [];
  }

  return parsed.diagnostics.filter(isOxlintDiagnostic);
}

function isOxlintDiagnostic(value: unknown): value is OxlintDiagnostic {
  if (!isRecord(value)) {
    return false;
  }

  return (
    (value.code === undefined || typeof value.code === "string") &&
    (value.message === undefined || typeof value.message === "string")
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    rmSync(tempDir, { recursive: true, force: true });
  }
});
