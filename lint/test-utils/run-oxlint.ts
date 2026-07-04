import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

type OxlintDiagnostic = {
  code?: string;
  message?: string;
};

export type FixtureExpectations = {
  expectedCount?: number;
  expectedMessages: string[];
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
const pluginPath = path.join(packageRoot, "lint", "plugin.js");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
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

function getDiagnostics(parsed: unknown) {
  if (!isRecord(parsed) || !Array.isArray(parsed.diagnostics)) {
    return [];
  }

  return parsed.diagnostics.filter((diagnostic) => isOxlintDiagnostic(diagnostic));
}

function normalizeRuleId(code?: string) {
  if (!code) {
    return;
  }

  const match = code.match(/^([^()]+)\(([^()]+)\)$/);

  if (!match) {
    return code;
  }

  return `${match[1]}/${match[2]}`;
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

function createTempProject({ fixturePath, ruleId }: { fixturePath: string; ruleId: string }) {
  const tempDir = mkdtempSync(path.join(tmpdir(), "hodor-rule-fixture-"));

  const srcFilePath = path.join(tempDir, `case${path.extname(fixturePath)}`);
  const oxlintConfigPath = path.join(tempDir, "oxlint.config.json");
  const config = {
    jsPlugins: [pluginPath],
    rules: {
      [ruleId]: "error",
    },
  };

  writeFileSync(srcFilePath, readFileSync(fixturePath, "utf8"), "utf8");
  writeFileSync(oxlintConfigPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");

  return {
    oxlintConfigPath,
    srcFilePath,
    tempDir,
  };
}

function runOxlintProcess({ args, cwd }: { args: string[]; cwd: string }) {
  return new Promise<{
    status: number | null;
    stderr: string;
    stdout: string;
  }>((resolve, reject) => {
    const child = spawn(oxlintBin, args, { cwd });
    const stderrChunks: Buffer[] = [];
    const stdoutChunks: Buffer[] = [];

    child.stderr.on("data", (chunk: Buffer) => {
      stderrChunks.push(chunk);
    });
    child.stdout.on("data", (chunk: Buffer) => {
      stdoutChunks.push(chunk);
    });
    child.on("error", reject);
    child.on("close", (status) => {
      resolve({
        status,
        stderr: Buffer.concat(stderrChunks).toString("utf8"),
        stdout: Buffer.concat(stdoutChunks).toString("utf8"),
      });
    });
  });
}

export function collectRuleMessages({
  results,
  ruleId,
}: {
  results: OxlintMessage[];
  ruleId: string;
}) {
  return results.filter((message) => message.ruleId === ruleId);
}

export function parseFixtureExpectations({
  fixtureContent,
  fixturePath,
}: {
  fixtureContent: string;
  fixturePath: string;
}): FixtureExpectations {
  const expectedMessages: string[] = [];
  let expectedCount: number | undefined;

  for (const [index, line] of fixtureContent.split("\n").entries()) {
    if (!line.includes("hodor-test")) {
      continue;
    }

    const directive = line.match(/^\s*\/\/\s*hodor-test\s+([a-z-]+):\s*(.*?)\s*$/);

    if (!directive) {
      throw new Error(`Malformed hodor-test directive in ${fixturePath}:${index + 1}`);
    }

    const [, name, value] = directive;

    switch (name) {
      case "expect-count": {
        if (!/^\d+$/.test(value)) {
          throw new Error(`Invalid expect-count directive in ${fixturePath}:${index + 1}`);
        }

        expectedCount = Number(value);
        break;
      }

      case "expect-message": {
        if (!value) {
          throw new Error(`Empty expect-message directive in ${fixturePath}:${index + 1}`);
        }

        expectedMessages.push(value);
        break;
      }

      default:
        throw new Error(`Unknown hodor-test directive "${name}" in ${fixturePath}:${index + 1}`);
    }
  }

  return {
    expectedCount,
    expectedMessages,
  };
}

export async function runOxlintForFixture({
  fixturePath,
  fix = false,
  ruleName,
}: {
  fixturePath: string;
  fix?: boolean;
  ruleName: string;
}): Promise<OxlintRun> {
  const ruleId = `hodor/${ruleName}`;
  const { oxlintConfigPath, srcFilePath, tempDir } = createTempProject({
    fixturePath,
    ruleId,
  });
  const args = ["--config", oxlintConfigPath, srcFilePath, "--format", "json"];

  if (fix) {
    args.unshift("--fix");
  }

  try {
    const result = await runOxlintProcess({ args, cwd: tempDir });
    const stdout = result.stdout.trim();

    return {
      status: result.status,
      stderr: result.stderr,
      stdout,
      parsed: parseOxlintJson(stdout),
      fileContent: readFileSync(srcFilePath, "utf8"),
    };
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}
