import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const BASE_URL = "https://api.dataforseo.com/v3";

export const DFS_DEFAULTS = { location_code: 2840, language_code: "en" };

function loadEnvLocal() {
  const path = resolve(ROOT, ".env.local");
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match || process.env[match[1]] !== undefined) continue;
    const value = match[2].trim();
    process.env[match[1]] = /^(['"]).*\1$/.test(value) ? value.slice(1, -1) : value;
  }
}

function authHeader() {
  loadEnvLocal();
  if (process.env.DATAFORSEO_BASE64?.trim()) return `Basic ${process.env.DATAFORSEO_BASE64.trim()}`;
  const login = process.env.DATAFORSEO_LOGIN?.trim();
  const password = process.env.DATAFORSEO_PASSWORD?.trim();
  if (!login || !password) {
    throw new Error("Missing DataForSEO credentials. Set DATAFORSEO_BASE64 or DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD.");
  }
  return `Basic ${Buffer.from(`${login}:${password}`).toString("base64")}`;
}

export async function dfs(endpoint, task) {
  const response = await fetch(`${BASE_URL}/${endpoint.replace(/^\/+/, "")}`, {
    method: "POST",
    headers: { Authorization: authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify([task]),
  });
  const payload = await response.json();
  const firstTask = payload.tasks?.[0];
  if (!response.ok || payload.status_code !== 20000 || firstTask?.status_code !== 20000) {
    throw new Error(`DataForSEO request failed: ${payload.status_code ?? response.status} ${payload.status_message ?? firstTask?.status_message ?? response.statusText}`);
  }
  return firstTask.result ?? [];
}
