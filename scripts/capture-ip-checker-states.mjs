import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { chromium } from "playwright";

const baseUrl = (process.env.QA_BASE_URL ?? "http://127.0.0.1:3001").replace(
  /\/$/,
  "",
);
const targetPath = "/tools/what-is-my-ip";
const targetUrl = `${baseUrl}${targetPath}`;
const outputDir = resolve(
  process.argv.find((argument) => argument.startsWith("--output="))?.slice(9) ??
    "artifacts/visual-qa-ip-checker-states",
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

const scenarios = ["observed", "partial", "local", "error"];
const observedAt = "2026-08-16T12:34:56.000Z";

function maskFixtureIp(ip) {
  const parts = ip.split(".");
  return parts.length === 4
    ? `${parts[0]}.${parts[1]}.${parts[2]}.•••`
    : "••••:••••";
}

const checksNotPerformed = {
  vpn: "not_performed",
  proxy: "not_performed",
  dns: "not_performed",
  webrtc: "not_performed",
  encryption: "not_performed",
};

const fixtures = {
  observed: {
    status: 200,
    ip: "198.51.100.42",
    body: {
      ok: true,
      schemaVersion: 1,
      observedAt,
      route: {
        ip: "198.51.100.42",
        version: 4,
        scope: "public",
      },
      geo: {
        status: "available",
        accuracy: "approximate",
        city: "Example City",
        region: "Example Region",
        country: "Example Country",
        countryCode: "US",
        timezone: "Etc/UTC",
      },
      network: {
        organization: "RFC 5737 documentation network",
        asn: "AS64500",
      },
      checks: checksNotPerformed,
    },
  },
  partial: {
    status: 200,
    ip: "203.0.113.42",
    body: {
      ok: true,
      schemaVersion: 1,
      observedAt,
      route: {
        ip: "203.0.113.42",
        version: 4,
        scope: "public",
      },
      geo: {
        status: "unavailable",
        accuracy: "approximate",
        city: null,
        region: null,
        country: null,
        countryCode: null,
        timezone: null,
      },
      network: { organization: null, asn: null },
      checks: checksNotPerformed,
    },
  },
  local: {
    status: 200,
    ip: "192.0.2.42",
    body: {
      ok: true,
      schemaVersion: 1,
      observedAt,
      route: {
        ip: "192.0.2.42",
        version: 4,
        scope: "local_preview",
      },
      geo: {
        status: "unavailable",
        accuracy: "approximate",
        city: null,
        region: null,
        country: null,
        countryCode: null,
        timezone: null,
      },
      network: { organization: null, asn: null },
      checks: checksNotPerformed,
    },
  },
  error: {
    // A schema error exercises the UI error state without producing an
    // expected browser-console resource error that could hide real failures.
    status: 200,
    ip: null,
    body: {
      ok: false,
      schemaVersion: 1,
      code: "PUBLIC_IP_UNAVAILABLE",
      retryable: true,
    },
  },
};

const forbiddenVerdictClaims = [
  /\byou(?:'re| are) (?:not )?protected\b/i,
  /\byou(?:'re| are) unprotected\b/i,
  /\b(?:your )?(?:connection|route|ip|vpn) (?:is|looks) (?:protected|unprotected)\b/i,
  /\b(?:vpn|proxy) (?:was |is )?detected\b/i,
  /\bno (?:vpn|proxy) (?:was )?detected\b/i,
  /\bvpn status:\s*(?:protected|unprotected|detected)\b/i,
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

  const errorOverlayVisible = await page
    .locator("[data-nextjs-dialog-overlay], .nextjs-error-overlay")
    .first()
    .isVisible()
    .catch(() => false);

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

  return { errorOverlayVisible };
}

async function positionTool(page) {
  await page.locator("section[data-ip-state]").evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY;
    const headerOffset = window.innerWidth < 640 ? 126 : 104;
    window.scrollTo(0, Math.max(0, top - headerOffset));
  });
  await page.evaluate(
    () =>
      new Promise((resolveFrame) =>
        requestAnimationFrame(() => requestAnimationFrame(resolveFrame)),
      ),
  );
}

async function assertPage({
  page,
  scenario,
  fixture,
  pageErrors,
  consoleErrors,
  errorOverlayVisible,
  interceptedApiRequests,
}) {
  const language =
    (await page.locator("html").getAttribute("lang"))?.toLowerCase() ?? "";
  const pathname = normalizePathname(new URL(page.url()).pathname);
  const canonicalHref = await page
    .locator('link[rel="canonical"]')
    .first()
    .getAttribute("href");
  const canonicalPath = canonicalHref
    ? normalizePathname(new URL(canonicalHref, targetUrl).pathname)
    : null;
  const h1Count = await page.locator("h1").count();
  const horizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  const renderedText = await page.locator("body").innerText();
  const forbiddenClaims = forbiddenVerdictClaims
    .filter((pattern) => pattern.test(renderedText))
    .map((pattern) => pattern.source);
  const activeStateCount = await page
    .locator(`section[data-ip-state="${scenario}"]`)
    .count();

  if (language !== "en") {
    throw new Error(`${scenario}: expected html[lang=en], received ${language}`);
  }
  if (pathname !== targetPath) {
    throw new Error(`${scenario}: non-canonical English path ${pathname}`);
  }
  if (canonicalPath !== targetPath) {
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
  if (errorOverlayVisible) {
    throw new Error(`${scenario}: Next.js error overlay is visible`);
  }
  if (activeStateCount !== 1) {
    throw new Error(`${scenario}: expected one active ${scenario} state`);
  }
  if (forbiddenClaims.length) {
    throw new Error(
      `${scenario}: unsupported verdict claim matched ${forbiddenClaims.join(", ")}`,
    );
  }
  if (interceptedApiRequests !== 1) {
    throw new Error(
      `${scenario}: expected one intercepted /api/ip request, received ${interceptedApiRequests}`,
    );
  }
  if (pageErrors.length) {
    throw new Error(`${scenario}: page errors: ${pageErrors.join(" | ")}`);
  }
  if (consoleErrors.length) {
    throw new Error(
      `${scenario}: console errors: ${consoleErrors.join(" | ")}`,
    );
  }

  if (fixture.ip) {
    const address = page.locator(
      'section[data-ip-state] code[data-screenshot-sensitive="true"]',
    );
    if ((await address.count()) !== 1) {
      throw new Error(`${scenario}: IP result is not marked screenshot-sensitive`);
    }
    if ((await address.innerText()).trim() !== maskFixtureIp(fixture.ip)) {
      throw new Error(`${scenario}: fixture IP is not masked by default`);
    }
  } else if (
    (await page.locator('section[data-ip-state] code[data-screenshot-sensitive="true"]').count()) !==
    0
  ) {
    throw new Error(`${scenario}: error state rendered an IP result`);
  }

  return {
    language,
    pathname,
    canonicalHref,
    canonicalPath,
    h1Count,
    horizontalOverflow,
    errorOverlayVisible,
    activeStateCount,
    forbiddenClaims,
  };
}

async function captureScenario(browser, viewport, scenario) {
  const fixture = fixtures[scenario];
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "en-US",
    timezoneId: "UTC",
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
    window.localStorage.setItem("cookie-consent", "rejected");
    window.localStorage.setItem("theme", "light");
    window.sessionStorage.setItem("stickyBarDismissed", "true");
    window.sessionStorage.setItem("exitIntentShown", "true");
  });

  const page = await context.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  let interceptedApiRequests = 0;

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.route("**/api/ip*", async (route) => {
    interceptedApiRequests += 1;
    await route.fulfill({
      status: fixture.status,
      contentType: "application/json",
      headers: { "Cache-Control": "private, no-store, max-age=0" },
      body: JSON.stringify(fixture.body),
    });
  });

  try {
    const response = await page.goto(targetUrl, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    if (!response?.ok()) {
      throw new Error(`${targetPath} returned ${response?.status()}`);
    }

    await page
      .locator(`section[data-ip-state="${scenario}"]`)
      .waitFor({ state: "visible", timeout: 12_000 });
    if (scenario === "error") {
      await page
        .locator('section[data-ip-state="error"] [role="alert"]')
        .waitFor({ state: "visible", timeout: 5_000 });
    }

    const { errorOverlayVisible } = await settlePage(page);
    const assertions = await assertPage({
      page,
      scenario,
      fixture,
      pageErrors,
      consoleErrors,
      errorOverlayVisible,
      interceptedApiRequests,
    });

    await positionTool(page);
    const filename = `ip-checker--en--${scenario}--${viewport.id}-${viewport.width}x${viewport.height}--viewport--light.png`;
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
        response: `${fixture.status} ${scenario} fixture`,
        interceptedRequests: interceptedApiRequests,
        fixtureAddressFamily: fixture.ip ? "RFC 5737 IPv4" : null,
      },
      pageErrors,
      consoleErrors,
      assertions: {
        status200: response.status() === 200,
        canonicalEnglish:
          assertions.pathname === targetPath &&
          assertions.canonicalPath === targetPath &&
          assertions.language === "en",
        oneH1: assertions.h1Count === 1,
        noHorizontalOverflow: !assertions.horizontalOverflow,
        noErrorOverlay: !assertions.errorOverlayVisible,
        noPageErrors: pageErrors.length === 0,
        noConsoleErrors: consoleErrors.length === 0,
        noUnsupportedVerdictClaims: assertions.forbiddenClaims.length === 0,
        oneActiveState: assertions.activeStateCount === 1,
        sensitiveIpHandlingValid: true,
        realIpRequestPrevented: interceptedApiRequests === 1,
      },
    };
  } finally {
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
          `Capturing IP checker ${scenario} state at ${viewport.width}x${viewport.height} ...`,
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
    route: targetPath,
    url: targetUrl,
    localePolicy: "canonical locale-less English only",
    privacyPolicy:
      "No visitor IP lookup is allowed. /api/ip is intercepted with RFC 5737 documentation fixtures, and sensitive result fields are masked in every image.",
    fixturePolicy: "RFC 5737 documentation-only IPv4 addresses",
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
  console.log(`IP checker state screenshots: ${outputDir}`);
  console.log(`Screenshot manifest: ${manifestPath}`);
}

main().catch((error) => {
  console.error(`IP checker screenshot QA failed: ${error.message}`);
  process.exitCode = 1;
});
