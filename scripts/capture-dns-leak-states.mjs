import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { chromium } from "playwright";

const TARGET_URL = "http://127.0.0.1:3001/tools/dns-leak-test";
const TARGET_PATH = "/tools/dns-leak-test";
const FIXTURE_IP = "203.0.113.42";
const outputDir = resolve(
  process.argv.find((argument) => argument.startsWith("--output="))?.slice(9) ??
    "artifacts/visual-qa-dns-leak-states",
);

const systemBrowsers = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const viewports = [
  { id: "desktop", width: 1440, height: 1000 },
  { id: "mobile", width: 390, height: 844 },
];

const scenarios = ["running", "observed", "error"];
const observedFixture = {
  ip: FIXTURE_IP,
  city: "Example City",
  country: "Documentation Network",
  isp: "RFC 5737 Test Network",
  org: "RFC 5737 Test Network",
  vpnDetection: "unsupported",
};

const forbiddenVerdictClaims = [
  /\bno dns leaks?(?: were)? detected\b/i,
  /\bdns leaks?(?: were)? detected\b/i,
  /\bno vpn detected\b/i,
  /\bvpn detected\b/i,
  /\byour vpn is (?:leak-free|safe|secure)\b/i,
  /\byour dns (?:is|looks) (?:safe|secure|protected)\b/i,
];

function normalizePathname(pathname) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    const executablePath = systemBrowsers.find((candidate) =>
      existsSync(candidate),
    );
    if (!executablePath) throw error;
    return chromium.launch({ headless: true, executablePath });
  }
}

async function settlePage(page) {
  await page.waitForLoadState("domcontentloaded");
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
}

async function positionTool(page) {
  await page.locator("section[data-status]").evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY;
    const headerOffset = window.innerWidth < 640 ? 118 : 82;
    window.scrollTo(0, Math.max(0, top - headerOffset));
  });
  await page.evaluate(
    () =>
      new Promise((resolveFrame) =>
        requestAnimationFrame(() => requestAnimationFrame(resolveFrame)),
      ),
  );
}

async function assertPage(page, scenario, pageErrors) {
  const language =
    (await page.locator("html").getAttribute("lang"))?.toLowerCase() ?? "";
  const pathname = normalizePathname(new URL(page.url()).pathname);
  const canonicalHref = await page
    .locator('link[rel="canonical"]')
    .first()
    .getAttribute("href");
  const canonicalPath = canonicalHref
    ? normalizePathname(new URL(canonicalHref, TARGET_URL).pathname)
    : null;
  const h1Count = await page.locator("h1").count();
  const horizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  const overlayVisible = await page
    .locator(
      "nextjs-portal, [data-nextjs-dialog-overlay], .nextjs-error-overlay",
    )
    .first()
    .isVisible()
    .catch(() => false);
  const renderedText = await page.locator("body").innerText();
  const fixtureVisible = renderedText.includes(FIXTURE_IP);
  const forbiddenClaims = forbiddenVerdictClaims
    .filter((pattern) => pattern.test(renderedText))
    .map((pattern) => pattern.source);
  const activeStateCount = await page
    .locator(`[data-state="${scenario}"][data-active="true"]`)
    .count();

  if (language !== "en") {
    throw new Error(`${scenario}: expected html[lang=en], received ${language}`);
  }
  if (pathname !== TARGET_PATH) {
    throw new Error(`${scenario}: non-canonical English path ${pathname}`);
  }
  if (canonicalPath !== TARGET_PATH) {
    throw new Error(
      `${scenario}: canonical mismatch ${canonicalHref ?? "missing"}`,
    );
  }
  if (h1Count !== 1) {
    throw new Error(`${scenario}: expected one H1, received ${h1Count}`);
  }
  if (horizontalOverflow) {
    throw new Error(`${scenario}: horizontal page overflow detected`);
  }
  if (overlayVisible) {
    throw new Error(`${scenario}: Next.js error overlay is visible`);
  }
  if (fixtureVisible) {
    throw new Error(`${scenario}: full RFC 5737 fixture IP is rendered`);
  }
  if (forbiddenClaims.length) {
    throw new Error(
      `${scenario}: unsupported verdict claim matched ${forbiddenClaims.join(", ")}`,
    );
  }
  if (activeStateCount !== 1) {
    throw new Error(`${scenario}: state rail does not mark the state active`);
  }
  if (pageErrors.length) {
    throw new Error(`${scenario}: page errors: ${pageErrors.join(" | ")}`);
  }

  return {
    canonicalPath,
    language,
    h1Count,
    horizontalOverflow,
    overlayVisible,
    fixtureVisible,
    forbiddenClaims,
    activeStateCount,
  };
}

async function captureScenario(browser, viewport, scenario) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "en-US",
    extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
  });
  await context.addCookies([
    {
      name: "NEXT_LOCALE",
      value: "en",
      url: "http://127.0.0.1:3001",
      sameSite: "Lax",
    },
  ]);
  await context.addInitScript(() => {
    window.localStorage.setItem("cookie-consent", "rejected");
    window.sessionStorage.setItem("stickyBarDismissed", "true");
  });

  const page = await context.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  let releaseRunningRequest = () => {};
  let completeRunningRequest = Promise.resolve();

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  try {
    let resolveRunningGate;
    const runningGate = new Promise((resolveGate) => {
      resolveRunningGate = resolveGate;
    });
    releaseRunningRequest = () => resolveRunningGate?.();

    let resolveRunningComplete;
    completeRunningRequest = new Promise((resolveComplete) => {
      resolveRunningComplete = resolveComplete;
    });

    await page.route("**/api/ip*", async (route) => {
      if (scenario === "running") await runningGate;

      if (scenario === "error") {
        await route.fulfill({
          status: 503,
          contentType: "application/json",
          body: JSON.stringify({ error: "fixture unavailable" }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          headers: { "Cache-Control": "no-store" },
          body: JSON.stringify(observedFixture),
        });
      }
      resolveRunningComplete?.();
    });

    const response = await page.goto(TARGET_URL, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    if (!response?.ok()) {
      throw new Error(`${TARGET_PATH} returned ${response?.status()}`);
    }

    await settlePage(page);
    const startButton = page
      .locator('section[data-status="idle"] button')
      .filter({ hasText: "Run route check" })
      .first();
    await startButton.waitFor({ state: "visible" });
    await startButton.click();
    await page
      .locator(`section[data-status="${scenario}"]`)
      .waitFor({ state: "visible", timeout: 10_000 });

    if (scenario === "observed") {
      const maskedIp = await page
        .locator("dl[data-screenshot-sensitive] > div")
        .first()
        .locator("dd")
        .innerText();
      if (maskedIp !== "203.0.••.••") {
        throw new Error(`observed: unexpected masked IP value ${maskedIp}`);
      }
    }
    if (scenario === "error") {
      await page.locator('[data-status="error"] [role="alert"]').waitFor({
        state: "visible",
      });
    }

    await positionTool(page);
    const assertions = await assertPage(page, scenario, pageErrors);
    const filename = `dns-leak-test--en--${scenario}--${viewport.id}-${viewport.width}x${viewport.height}--viewport--light.png`;
    const destination = resolve(outputDir, filename);
    const png = await page.screenshot({
      path: destination,
      fullPage: false,
      animations: "disabled",
      caret: "hide",
      mask: [page.locator("[data-screenshot-sensitive]")],
      maskColor: "#071226",
      type: "png",
    });

    return {
      id: `${scenario}-${viewport.id}`,
      scenario,
      viewport,
      captureMode: "viewport",
      file: destination,
      filename: basename(destination),
      bytes: png.length,
      sha256: sha256(png),
      mockedApi: {
        route: "/api/ip",
        response:
          scenario === "error"
            ? "503"
            : scenario === "running"
              ? "delayed 200"
              : "200",
      },
      consoleErrors,
      pageErrors,
      assertions: {
        status200: response.status() === 200,
        canonicalEnglish: true,
        oneH1: assertions.h1Count === 1,
        noHorizontalOverflow: !assertions.horizontalOverflow,
        noErrorOverlay: !assertions.overlayVisible,
        noPageErrors: pageErrors.length === 0,
        fixtureIpNotRendered: !assertions.fixtureVisible,
        noUnsupportedVerdictClaims: assertions.forbiddenClaims.length === 0,
        activeStateMarked: assertions.activeStateCount === 1,
      },
    };
  } finally {
    releaseRunningRequest();
    await Promise.race([
      completeRunningRequest,
      new Promise((resolveWait) => setTimeout(resolveWait, 1_000)),
    ]).catch(() => {});
    await context.close();
  }
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const browser = await launchBrowser();
  const captures = [];

  try {
    for (const viewport of viewports) {
      for (const scenario of scenarios) {
        console.log(
          `Capturing DNS leak ${scenario} state at ${viewport.width}x${viewport.height} ...`,
        );
        captures.push(await captureScenario(browser, viewport, scenario));
      }
    }
  } finally {
    await browser.close();
  }

  const manifest = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    route: TARGET_PATH,
    url: TARGET_URL,
    localePolicy: "canonical locale-less English only",
    fixturePolicy: "RFC 5737 documentation-only public IP",
    viewports,
    scenarios,
    captures,
  };
  const manifestPath = resolve(outputDir, "manifest.json");
  await writeFile(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  console.log(`DNS leak state screenshots: ${outputDir}`);
  console.log(`Screenshot manifest: ${manifestPath}`);
}

main().catch((error) => {
  console.error(`DNS leak screenshot QA failed: ${error.message}`);
  process.exitCode = 1;
});
