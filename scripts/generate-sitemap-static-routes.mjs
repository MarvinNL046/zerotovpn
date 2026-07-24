import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const localeAppDir = path.join(projectRoot, "src", "app", "[locale]");
const outputFile = path.join(
  projectRoot,
  "src",
  "lib",
  "sitemap-static-routes.generated.json"
);

const PAGE_FILE_RE = /^page\.(tsx|ts|jsx|js|mdx)$/;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }
    if (PAGE_FILE_RE.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeRouteFromPageFile(filePath) {
  const routeDir = path.dirname(path.relative(localeAppDir, filePath));
  const rawSegments = routeDir === "." ? [] : routeDir.split(path.sep);

  const segments = rawSegments
    .filter((segment) => segment.length > 0)
    .filter((segment) => !segment.startsWith("(")) // route groups
    .filter((segment) => !segment.startsWith("@")) // parallel routes
    .filter((segment) => !segment.startsWith("_")); // private/internal conventions

  // Keep only static routes here. Dynamic routes are added from data sources.
  if (segments.some((segment) => segment.includes("["))) {
    return null;
  }

  return segments.length === 0 ? "" : `/${segments.join("/")}`;
}

function main() {
  if (!fs.existsSync(localeAppDir)) {
    throw new Error(`Locale app directory not found: ${localeAppDir}`);
  }

  const pageFiles = walk(localeAppDir);

  // Een aantal routes bestaat alleen om oude URL's door te sturen. Die horen
  // niet in de sitemap: Google op een 301 laten landen kost crawlbudget en
  // levert een "Pagina met omleiding"-melding op. We herkennen ze aan de
  // aanroep zelf, zodat een nieuwe stub automatisch buiten de sitemap valt.
  const REDIRECT_ONLY_RE = /\b(permanentRedirect|redirect)\s*\(/;
  const isRedirectOnly = (filePath) =>
    REDIRECT_ONLY_RE.test(fs.readFileSync(filePath, "utf8"));

  const redirectOnly = pageFiles.filter(isRedirectOnly);
  const routes = Array.from(
    new Set(
      pageFiles
        .filter((file) => !redirectOnly.includes(file))
        .map(normalizeRouteFromPageFile)
        .filter((route) => route !== null)
    )
  ).sort();

  const payload = {
    generatedAt: new Date().toISOString(),
    paths: routes,
  };

  fs.writeFileSync(outputFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(
    `[sitemap] generated ${routes.length} static locale routes -> ${path.relative(projectRoot, outputFile)}`
  );
  console.log(
    `[sitemap] excluded ${redirectOnly.length} redirect-only routes from the sitemap`
  );
}

main();
