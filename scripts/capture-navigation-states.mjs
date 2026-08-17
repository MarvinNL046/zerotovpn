import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { chromium } from "playwright";

const TARGET_URL = "http://127.0.0.1:3001/countries";
const TARGET_PATH = "/countries";
const outputDir = resolve(
  process.argv.find((argument) => argument.startsWith("--output="))?.slice(9) ??
    "artifacts/visual-qa-navigation",
);

const systemBrowsers = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const viewports = [
  { id: "desktop", width: 1440, height: 900 },
  { id: "mobile", width: 390, height: 844 },
];

const requiredLinks = [
  { label: "Best VPNs 2026", href: "/best/best-vpn" },
  { label: "VPN for gaming", href: "/best/vpn-gaming" },
  { label: "VPN for privacy", href: "/best/vpn-privacy" },
  { label: "VPN for macOS", href: "/best/vpn-macos" },
  { label: "VPN for Android", href: "/best/vpn-android" },
  { label: "All country guides", href: "/countries" },
  { label: "VPN in China", href: "/countries/china" },
  { label: "VPN in Iran", href: "/countries/iran" },
  { label: "VPN in the Netherlands", href: "/countries/netherlands" },
];

const dutchFallbackLinks = [
  { label: "VPN voor gaming (Engels)", href: "/en/best/vpn-gaming" },
  { label: "VPN voor privacy (Engels)", href: "/en/best/vpn-privacy" },
  { label: "VPN voor macOS", href: "/nl/best/vpn-macos" },
  { label: "VPN voor Android (Engels)", href: "/en/best/vpn-android" },
  { label: "Alle landengidsen", href: "/nl/countries" },
  { label: "VPN in China (Engels)", href: "/en/countries/china" },
  { label: "VPN in Iran (Engels)", href: "/en/countries/iran" },
  { label: "VPN in Nederland", href: "/nl/countries/netherlands" },
];

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

async function captureNavigation(browser, viewport) {
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
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  try {
    const response = await page.goto(TARGET_URL, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    if (!response?.ok()) {
      throw new Error(`${TARGET_PATH} returned ${response?.status()}`);
    }
    await settlePage(page);

    if (viewport.id === "desktop") {
      await page
        .getByRole("button", { name: "Best VPNs", exact: true })
        .click();
    } else {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
    }

    const linkTargets = [];
    for (const link of requiredLinks) {
      const locator = page.getByRole("link", { name: link.label, exact: true });
      await locator.first().waitFor({ state: "visible" });
      const href = await locator.first().getAttribute("href");
      if (href !== link.href) {
        throw new Error(
          `${viewport.id}: ${link.label} points to ${href ?? "missing"}`,
        );
      }
      const box = await locator.first().boundingBox();
      if (!box || box.height < 43.5) {
        throw new Error(
          `${viewport.id}: ${link.label} has a ${box?.height ?? 0}px-high target`,
        );
      }
      linkTargets.push({ label: link.label, height: box.height });
    }

    const state = await page.evaluate(() => ({
      language: document.documentElement.lang,
      h1Count: document.querySelectorAll("h1").length,
      mainCount: document.querySelectorAll("main").length,
      horizontalOverflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
      overlayVisible: [...document.querySelectorAll("nextjs-portal")].some(
        (element) => getComputedStyle(element).display !== "none",
      ),
    }));
    const canonicalHref = await page
      .locator('link[rel="canonical"]')
      .first()
      .getAttribute("href");
    const canonicalPath = canonicalHref
      ? new URL(canonicalHref, TARGET_URL).pathname
      : null;

    if (state.language !== "en") throw new Error("Expected html[lang=en]");
    if (state.h1Count !== 1) throw new Error("Expected exactly one H1");
    if (state.mainCount !== 1) throw new Error("Expected exactly one main");
    if (state.horizontalOverflow) throw new Error("Page overflow detected");
    if (state.overlayVisible) throw new Error("Next.js overlay visible");
    if (canonicalPath !== TARGET_PATH) {
      throw new Error(`Canonical mismatch: ${canonicalHref ?? "missing"}`);
    }
    if (pageErrors.length) {
      throw new Error(`Page errors: ${pageErrors.join(" | ")}`);
    }
    if (consoleErrors.length) {
      throw new Error(`Console errors: ${consoleErrors.join(" | ")}`);
    }

    const filename = `navigation--best-vpns--en--${viewport.id}-${viewport.width}x${viewport.height}--open--light.png`;
    const destination = resolve(outputDir, filename);
    const png = await page.screenshot({
      path: destination,
      fullPage: false,
      animations: "disabled",
      caret: "hide",
      type: "png",
    });

    return {
      viewport,
      filename: basename(destination),
      file: destination,
      bytes: png.length,
      sha256: sha256(png),
      consoleErrors,
      pageErrors,
      linkTargets,
      assertions: {
        status200: response.status() === 200,
        canonicalEnglish: canonicalPath === TARGET_PATH,
        oneH1: state.h1Count === 1,
        oneMain: state.mainCount === 1,
        noHorizontalOverflow: !state.horizontalOverflow,
        noErrorOverlay: !state.overlayVisible,
        noPageErrors: pageErrors.length === 0,
        noConsoleErrors: consoleErrors.length === 0,
        allRequiredLinksVisible: true,
      },
    };
  } finally {
    await context.close();
  }
}

async function verifyDutchFallbackNavigation(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "nl-NL",
    extraHTTPHeaders: { "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.7" },
  });
  await context.addCookies([
    {
      name: "NEXT_LOCALE",
      value: "nl",
      url: "http://127.0.0.1:3001",
      sameSite: "Lax",
    },
  ]);
  const page = await context.newPage();

  try {
    const response = await page.goto("http://127.0.0.1:3001/nl/countries", {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    if (!response?.ok()) {
      throw new Error(`/nl/countries returned ${response?.status()}`);
    }
    await settlePage(page);
    await page.getByRole("button", { name: "Beste VPNs", exact: true }).click();

    const checkedLinks = [];
    for (const link of dutchFallbackLinks) {
      const locator = page.getByRole("link", { name: link.label, exact: true });
      await locator.first().waitFor({ state: "visible" });
      const href = await locator.first().getAttribute("href");
      if (href !== link.href) {
        throw new Error(
          `Dutch navigation: ${link.label} points to ${href ?? "missing"}`,
        );
      }
      checkedLinks.push({ ...link, actualHref: href });
    }

    return {
      status200: response.status() === 200,
      language: await page.locator("html").getAttribute("lang"),
      checkedLinks,
    };
  } finally {
    await context.close();
  }
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const browser = await launchBrowser();
  const captures = [];
  let dutchFallbackVerification;

  try {
    for (const viewport of viewports) {
      console.log(
        `Capturing open navigation at ${viewport.width}x${viewport.height} ...`,
      );
      captures.push(await captureNavigation(browser, viewport));
    }
    dutchFallbackVerification = await verifyDutchFallbackNavigation(browser);
  } finally {
    await browser.close();
  }

  const manifest = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    route: TARGET_PATH,
    localePolicy: "canonical locale-less English only",
    viewports,
    requiredLinks,
    dutchFallbackVerification,
    captures,
  };
  const manifestPath = resolve(outputDir, "manifest.json");
  await writeFile(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  console.log(`Navigation screenshots: ${outputDir}`);
  console.log(`Screenshot manifest: ${manifestPath}`);
}

main().catch((error) => {
  console.error(`Navigation screenshot QA failed: ${error.message}`);
  process.exitCode = 1;
});
