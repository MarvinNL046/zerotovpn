import { spawnSync } from "node:child_process";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const scanRoots = [path.join(root, "src")];
const textExtensions = new Set([".css", ".ts", ".tsx"]);
const assetPattern =
  /["'(]((?:\/(?:affiliate|brand|images|logos)\/|\/icon(?:-|\.)|\/apple-touch-icon)[^"'()\s?#]*\.(?:avif|gif|jpe?g|png|svg|webp))/gi;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    if (entry.isFile() && textExtensions.has(path.extname(entry.name))) {
      files.push(absolute);
    }
  }
  return files;
}

const references = new Map();
const files = [path.join(root, "public", "manifest.json")];
for (const scanRoot of scanRoots) files.push(...(await walk(scanRoot)));
for (const file of files) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(assetPattern)) {
    const publicPath = match[1];
    const locations = references.get(publicPath) ?? [];
    locations.push(path.relative(root, file).replaceAll("\\", "/"));
    references.set(publicPath, locations);
  }
}

const missing = [];
const ignored = [];
for (const [publicPath, locations] of references) {
  const diskPath = path.join(root, "public", publicPath.slice(1));
  try {
    await access(diskPath);
  } catch {
    missing.push({ publicPath, locations });
    continue;
  }

  const relativeDiskPath = path.relative(root, diskPath).replaceAll("\\", "/");
  const result = spawnSync(
    "git",
    ["check-ignore", "-q", "--", relativeDiskPath],
    {
      cwd: root,
    },
  );
  if (result.status === 0) ignored.push({ publicPath, locations });
}

if (missing.length > 0 || ignored.length > 0) {
  console.error("Public asset audit failed:\n");
  for (const item of missing) {
    console.error(
      `- Missing ${item.publicPath} (used by ${item.locations.join(", ")})`,
    );
  }
  for (const item of ignored) {
    console.error(
      `- Git-ignored ${item.publicPath} (used by ${item.locations.join(", ")})`,
    );
  }
  process.exit(1);
}

console.log(
  `Public asset audit passed for ${references.size} referenced local assets.`,
);
