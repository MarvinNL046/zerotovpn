import fs from "node:fs";
import path from "node:path";

const ENV_FILE_CANDIDATES = [".env.local", ".env", ".env.vercel"] as const;

const DEFAULT_GO2_FALLBACK_DIRS = [
  "go2thailand.com",
  "go2-bali.com",
  "go2-china.com",
  "go2-japan.com",
  "go2-vietnam.com",
  "go2-india.com",
  "go2-morocco.com",
  "go2-usa.com",
] as const;

type ResolvedFrom = "process.env" | "fallback-file";

export interface EnvFallbackResult {
  resolved: Record<string, ResolvedFrom>;
  missing: string[];
  filesChecked: string[];
}

function parseEnvLine(line: string): { key: string; value: string } | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  const withoutExport = trimmed.startsWith("export ")
    ? trimmed.slice("export ".length).trim()
    : trimmed;

  const equalIndex = withoutExport.indexOf("=");
  if (equalIndex <= 0) return null;

  const key = withoutExport.slice(0, equalIndex).trim();
  if (!/^[A-Z0-9_]+$/.test(key)) return null;

  let value = withoutExport.slice(equalIndex + 1).trim();

  // Remove trailing inline comments when value is unquoted.
  if (!value.startsWith('"') && !value.startsWith("'")) {
    const commentIndex = value.indexOf(" #");
    if (commentIndex >= 0) value = value.slice(0, commentIndex).trim();
  }

  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }

  // Guard against accidental over-quoting patterns such as ""value"".
  value = value.replace(/^["']+/, "").replace(/["']+$/, "").trim();
  value = value.replace(/\\n/g, "").trim();

  if (!value) return null;
  return { key, value };
}

function parseEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {};

  const data: Record<string, string> = {};
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
    const parsed = parseEnvLine(line);
    if (!parsed) continue;
    data[parsed.key] = parsed.value;
  }

  return data;
}

function buildFallbackFileList(): string[] {
  const root = path.resolve(process.cwd(), "..");

  const defaultFiles = DEFAULT_GO2_FALLBACK_DIRS.flatMap((dir) =>
    ENV_FILE_CANDIDATES.map((fileName) => path.join(root, dir, fileName))
  );

  const extraPaths = (process.env.GO2_ENV_FALLBACK_PATHS || "")
    .split(",")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const extraFiles = extraPaths.flatMap((segment) => {
    if (segment.includes(".env")) {
      return [path.resolve(segment)];
    }
    return ENV_FILE_CANDIDATES.map((fileName) => path.join(path.resolve(segment), fileName));
  });

  return [...new Set([...defaultFiles, ...extraFiles])];
}

function hasValue(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function ensureEnvVars(keys: readonly string[]): EnvFallbackResult {
  const resolved: Record<string, ResolvedFrom> = {};
  const missing = new Set<string>();

  for (const key of keys) {
    if (hasValue(process.env[key])) {
      resolved[key] = "process.env";
    } else {
      missing.add(key);
    }
  }

  const filesChecked = buildFallbackFileList();
  if (missing.size > 0) {
    for (const filePath of filesChecked) {
      if (missing.size === 0) break;
      if (!fs.existsSync(filePath)) continue;

      const parsed = parseEnvFile(filePath);
      for (const key of [...missing]) {
        const candidate = parsed[key];
        if (!hasValue(candidate)) continue;
        process.env[key] = candidate;
        resolved[key] = "fallback-file";
        missing.delete(key);
      }
    }
  }

  return {
    resolved,
    missing: [...missing],
    filesChecked,
  };
}

export function ensurePipelineApiEnv(): EnvFallbackResult {
  return ensureEnvVars([
    "JINA_API_KEY",
    "BRIGHT_DATA_API_KEY",
    "BRIGHT_DATA_ZONE",
    "ANTHROPIC_API_KEY",
  ]);
}
