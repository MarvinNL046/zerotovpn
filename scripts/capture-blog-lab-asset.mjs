import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const targetUrl =
  process.argv.find((argument) => argument.startsWith("--url="))?.slice(6) ??
  "http://127.0.0.1:3001/tools/dns-leak-test";
const publicOutput = resolve(
  process.argv.find((argument) => argument.startsWith("--out="))?.slice(6) ??
    "public/images/blog/dns-route-check-tool-card-2026-08-17.webp",
);
const artifactOutput = resolve(
  process.argv
    .find((argument) => argument.startsWith("--artifact="))
    ?.slice(11) ??
    "artifacts/visual-qa-blog-lab-current/dns-route-check--en--idle.png",
);

const systemBrowsers = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    const executablePath = systemBrowsers.find((candidate) =>
      existsSync(candidate),
    );
    if (!executablePath) throw error;
    return chromium.launch({ executablePath, headless: true });
  }
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

await mkdir(dirname(publicOutput), { recursive: true });
await mkdir(dirname(artifactOutput), { recursive: true });

const browser = await launchBrowser();
try {
  const context = await browser.newContext({
    colorScheme: "light",
    locale: "en-US",
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 1000 },
    extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
  });
  await context.addCookies([
    {
      name: "NEXT_LOCALE",
      value: "en",
      url: new URL(targetUrl).origin,
      sameSite: "Lax",
    },
  ]);
  await context.addInitScript(() => {
    window.localStorage.setItem("cookie-consent", "rejected");
    window.sessionStorage.setItem("stickyBarDismissed", "true");
  });

  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const response = await page.goto(targetUrl, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  if (!response?.ok()) {
    throw new Error(
      `DNS route returned HTTP ${response?.status() ?? "unknown"}`,
    );
  }
  await page
    .waitForLoadState("networkidle", { timeout: 8_000 })
    .catch(() => {});
  await page.evaluate(async () => {
    await Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((resolveWait) => setTimeout(resolveWait, 3_000)),
    ]);
  });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
        transition-duration: 0s !important;
      }
      nextjs-portal { display: none !important; }
    `,
  });

  const language =
    (await page.locator("html").getAttribute("lang"))?.toLowerCase() ?? "";
  const canonical = await page
    .locator('link[rel="canonical"]')
    .first()
    .getAttribute("href");
  if (language !== "en")
    throw new Error(`Expected lang=en, received ${language}`);
  if (new URL(canonical ?? "", targetUrl).pathname !== "/tools/dns-leak-test") {
    throw new Error(`Unexpected canonical: ${canonical ?? "missing"}`);
  }
  if (pageErrors.length) throw new Error(pageErrors.join(" | "));

  const tool = page.locator('section[data-status="idle"]');
  await tool.waitFor({ state: "visible" });
  const toolText = await tool.innerText();
  if (!/not the resolver test itself/i.test(toolText)) {
    throw new Error("Truth boundary is missing from the idle tool state");
  }
  if (await tool.locator("[data-screenshot-sensitive]").count()) {
    throw new Error(
      "Idle capture unexpectedly contains sensitive result fields",
    );
  }

  const rawPng = await tool.screenshot({ animations: "disabled", type: "png" });
  await sharp(rawPng).png().toFile(artifactOutput);
  const card = await sharp(rawPng)
    .resize({
      width: 1200,
      height: 675,
      fit: "contain",
      background: { r: 248, g: 250, b: 252, alpha: 1 },
    })
    .webp({ quality: 86 })
    .toBuffer();
  await writeFile(publicOutput, card);

  process.stdout.write(
    `${JSON.stringify(
      {
        targetUrl,
        selector: 'section[data-status="idle"]',
        artifactOutput,
        publicOutput,
        width: 1200,
        height: 675,
        sha256: sha256(card),
        truthBoundary: "not the resolver test itself",
      },
      null,
      2,
    )}\n`,
  );

  await context.close();
} finally {
  await browser.close();
}
