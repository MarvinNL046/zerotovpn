import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright";

const baseUrl = (process.env.QA_BASE_URL ?? "http://127.0.0.1:3001").replace(
  /\/$/,
  "",
);
const targetPath = "/speed-test";
const targetUrl = `${baseUrl}${targetPath}`;
const outputDir = resolve(
  process.argv.find((argument) => argument.startsWith("--output="))?.slice(9) ??
    "artifacts/visual-qa-speed-test-states",
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
const scenarios = ["idle", "running", "complete", "error"];

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

async function positionLab(page) {
  await page.locator("section[data-speed-phase]").evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, Math.max(0, top - 132));
  });
  await page.evaluate(
    () =>
      new Promise((resolveFrame) =>
        requestAnimationFrame(() => requestAnimationFrame(resolveFrame)),
      ),
  );
}

async function captureScenario(browser, viewport, scenario) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "en-US",
    reducedMotion: "reduce",
    extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
  });
  await context.addCookies([
    {
      name: "NEXT_LOCALE",
      value: "en",
      url: baseUrl,
      sameSite: "Lax",
    },
  ]);
  await context.addInitScript(() => {
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.removeItem("zerotovpn-speed-runs-v3");
    sessionStorage.setItem("stickyBarDismissed", "true");
    sessionStorage.setItem("exitIntentShown", "true");
  });

  const page = await context.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  const benchmarkRequests = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("request", (request) => {
    if (new URL(request.url()).hostname === "speed.cloudflare.com") {
      benchmarkRequests.push(request.url());
    }
  });
  await page.route("https://speed.cloudflare.com/**", (route) =>
    route.abort("blockedbyclient"),
  );

  try {
    const query = scenario === "idle" ? "" : `?qa-speed-state=${scenario}`;
    const response = await page.goto(`${targetUrl}${query}`, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    if (!response?.ok()) {
      throw new Error(`${targetPath} returned ${response?.status()}`);
    }

    await settlePage(page);
    const expectedPhase = scenario === "running" ? "download" : scenario;
    const lab = page.locator(`section[data-speed-phase="${expectedPhase}"]`);
    await lab.waitFor({ state: "visible", timeout: 10_000 });

    if (scenario === "complete") {
      await lab.locator('input[type="checkbox"]').first().check();
    }

    const language =
      (await page.locator("html").getAttribute("lang"))?.toLowerCase() ?? "";
    const canonical = await page
      .locator('link[rel="canonical"]')
      .first()
      .getAttribute("href");
    const origin = await lab.getAttribute("data-result-origin");
    const h1Count = await page.locator("h1").count();
    const mainCount = await page.locator("main").count();
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

    if (language !== "en") throw new Error(`html lang is ${language}`);
    if (new URL(page.url()).pathname !== targetPath) {
      throw new Error(`non-English canonical path: ${page.url()}`);
    }
    if (new URL(canonical ?? "", targetUrl).pathname !== targetPath) {
      throw new Error(`canonical mismatch: ${canonical ?? "missing"}`);
    }
    if (h1Count !== 1) throw new Error(`expected 1 H1, found ${h1Count}`);
    if (mainCount !== 1) throw new Error(`expected 1 main, found ${mainCount}`);
    if (horizontalOverflow) throw new Error("horizontal overflow detected");
    if (overlayVisible) throw new Error("Next.js error overlay is visible");
    if (pageErrors.length) throw new Error(pageErrors.join(" | "));
    if (consoleErrors.length) throw new Error(consoleErrors.join(" | "));
    if (benchmarkRequests.length) {
      throw new Error("fixture capture attempted a real speed-test request");
    }
    if (scenario === "idle" ? origin !== "none" : origin !== "fixture") {
      throw new Error(`unexpected result origin: ${origin}`);
    }

    await positionLab(page);
    const viewportName = `speed-test--en--${scenario}--${viewport.id}-${viewport.width}x${viewport.height}--viewport.png`;
    const viewportBytes = await page.screenshot({
      path: resolve(outputDir, viewportName),
      fullPage: false,
    });
    const captures = [
      {
        file: viewportName,
        kind: "viewport",
        bytes: viewportBytes.byteLength,
        sha256: sha256(viewportBytes),
      },
    ];

    if (scenario === "idle" || scenario === "complete") {
      await page.evaluate(() => window.scrollTo(0, 0));
      const fullName = `speed-test--en--${scenario}--${viewport.id}-${viewport.width}x${viewport.height}--full.png`;
      const fullBytes = await page.screenshot({
        path: resolve(outputDir, fullName),
        fullPage: true,
      });
      captures.push({
        file: fullName,
        kind: "full",
        bytes: fullBytes.byteLength,
        sha256: sha256(fullBytes),
      });
    }

    return {
      scenario,
      viewport,
      assertions: {
        language,
        canonical,
        h1Count,
        mainCount,
        horizontalOverflow,
        overlayVisible,
        resultOrigin: origin,
        benchmarkRequestCount: benchmarkRequests.length,
        pageErrorCount: pageErrors.length,
        consoleErrorCount: consoleErrors.length,
      },
      captures,
    };
  } finally {
    await context.close();
  }
}

async function verifyEngineGuardrails(browser) {
  async function createGuardrailPage() {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      locale: "en-US",
      extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
    });
    await context.addCookies([
      {
        name: "NEXT_LOCALE",
        value: "en",
        url: baseUrl,
        sameSite: "Lax",
      },
    ]);
    await context.addInitScript(() => {
      localStorage.setItem("cookie-consent", "rejected");
      localStorage.removeItem("zerotovpn-speed-runs-v3");
      sessionStorage.setItem("stickyBarDismissed", "true");
    });
    return { context, page: await context.newPage() };
  }

  const failure = await createGuardrailPage();
  let failureRequests = 0;
  try {
    await failure.page.route(
      "https://speed.cloudflare.com/**",
      async (route) => {
        failureRequests += 1;
        await route.fulfill({ status: 503, body: "fixture unavailable" });
      },
    );
    await failure.page.goto(targetUrl, { waitUntil: "domcontentloaded" });
    const failureLab = failure.page.locator("section[data-speed-phase]");
    await failureLab
      .getByRole("button", { name: "Start test" })
      .waitFor({ state: "visible" });
    await failure.page.waitForTimeout(350);
    await failureLab.getByRole("button", { name: "Start test" }).click();
    await failure.page
      .locator('section[data-speed-phase="error"]')
      .waitFor({ state: "visible", timeout: 10_000 });
    const storedAfterFailure = await failure.page.evaluate(() =>
      localStorage.getItem("zerotovpn-speed-runs-v3"),
    );
    if (storedAfterFailure !== null) {
      throw new Error("failed benchmark was written to local history");
    }
  } finally {
    await failure.context.close();
  }

  const cancellation = await createGuardrailPage();
  let cancelledRequests = 0;
  try {
    await cancellation.page.route(
      "https://speed.cloudflare.com/**",
      async (route) => {
        cancelledRequests += 1;
        await new Promise((resolveWait) => setTimeout(resolveWait, 700));
        await route
          .fulfill({
            status: 200,
            contentType: "application/octet-stream",
            body: "",
          })
          .catch(() => {});
      },
    );
    await cancellation.page.goto(targetUrl, { waitUntil: "domcontentloaded" });
    const cancellationLab = cancellation.page.locator(
      "section[data-speed-phase]",
    );
    await cancellationLab
      .getByRole("button", { name: "Start test" })
      .waitFor({ state: "visible" });
    await cancellation.page.waitForTimeout(350);
    await cancellationLab.getByRole("button", { name: "Start test" }).click();
    const runningLab = cancellation.page.locator(
      'section[data-speed-phase="ping"]',
    );
    await runningLab.waitFor({ state: "visible", timeout: 5_000 });
    await runningLab.getByRole("button", { name: "Stop test" }).click();
    await cancellation.page
      .locator('section[data-speed-phase="stopped"]')
      .waitFor({ state: "visible", timeout: 5_000 });
    const storedAfterCancel = await cancellation.page.evaluate(() =>
      localStorage.getItem("zerotovpn-speed-runs-v3"),
    );
    if (storedAfterCancel !== null) {
      throw new Error("cancelled benchmark was written to local history");
    }
  } finally {
    await cancellation.context.close();
  }

  return {
    failureRequestsIntercepted: failureRequests,
    failureEndedAsError: true,
    failureSavedHistory: false,
    cancelledRequestsIntercepted: cancelledRequests,
    cancellationEndedAsStopped: true,
    cancellationSavedHistory: false,
  };
}

await mkdir(outputDir, { recursive: true });
const browser = await launchBrowser();
const results = [];
let engineGuardrails;
try {
  engineGuardrails = await verifyEngineGuardrails(browser);
  for (const viewport of viewports) {
    for (const scenario of scenarios) {
      results.push(await captureScenario(browser, viewport, scenario));
    }
  }
} finally {
  await browser.close();
}

const manifest = {
  capturedAt: new Date().toISOString(),
  target: targetUrl,
  note: "English-only deterministic UI fixtures. No request reached Cloudflare: screenshot fixtures made zero benchmark requests, and engine guardrail requests were intercepted locally.",
  engineGuardrails,
  results,
};
await writeFile(
  resolve(outputDir, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);
console.log(
  `Captured ${results.flatMap((result) => result.captures).length} verified screenshots in ${outputDir}`,
);
