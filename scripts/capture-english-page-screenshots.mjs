import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const NON_ENGLISH_PREFIX = /^\/(?:nl|de|es|fr|zh|ja|ko|th)(?:\/|$)/i;
const ENGLISH_PREFIX = /^\/en(?:\/|$)/i;
const DEFAULT_BASE_URL =
  process.env.SCREENSHOT_BASE_URL ?? "http://127.0.0.1:3001";
const DEFAULT_OUTPUT_DIR = resolve("artifacts", "visual-qa");
const CANONICAL_HOST = "www.zerotovpn.com";
const SYSTEM_CHROMIUM_PATHS = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const VIEWPORTS = [
  { id: "desktop", width: 1440, height: 1000 },
  { id: "mobile", width: 390, height: 844 },
];

function readOption(name) {
  const prefix = `--${name}=`;
  return process.argv
    .slice(2)
    .find((arg) => arg.startsWith(prefix))
    ?.slice(prefix.length);
}

function requestedRoutes() {
  return process.argv
    .slice(2)
    .filter((arg) => !arg.startsWith("--"))
    .map((route) => route.trim())
    .filter(Boolean);
}

function normalizePathname(pathname) {
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (withSlash === "/") return withSlash;
  return withSlash.replace(/\/+$/, "");
}

function localUrl(baseUrl, routeOrUrl) {
  const requested = new URL(routeOrUrl, `${baseUrl.replace(/\/$/, "")}/`);
  return new URL(
    `${requested.pathname}${requested.search}`,
    baseUrl,
  ).toString();
}

function routeSlug(pathname) {
  if (pathname === "/") return "home";
  return pathname
    .split("/")
    .filter(Boolean)
    .join("--")
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    const executablePath = SYSTEM_CHROMIUM_PATHS.find((candidate) =>
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

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
      }
    `,
  });

  await page.evaluate(async () => {
    const wait = (milliseconds) =>
      new Promise((resolveWait) => setTimeout(resolveWait, milliseconds));
    const bounded = (promise, milliseconds) =>
      Promise.race([promise, wait(milliseconds)]);

    await bounded(document.fonts?.ready ?? Promise.resolve(), 3_000);

    const scrollStep = Math.max(600, Math.round(window.innerHeight * 0.8));
    for (
      let y = 0;
      y < document.documentElement.scrollHeight;
      y += scrollStep
    ) {
      window.scrollTo(0, y);
      await wait(35);
    }

    await bounded(
      Promise.all(
        [...document.images].map((image) => image.decode().catch(() => {})),
      ),
      4_000,
    );
    window.scrollTo(0, 0);
    await new Promise((resolveFrame) =>
      requestAnimationFrame(() => requestAnimationFrame(resolveFrame)),
    );
  });
}

async function dismissCookiePrompt(page) {
  const labels = [
    /accept all/i,
    /accept cookies/i,
    /^accept$/i,
    /^allow all$/i,
    /^got it$/i,
  ];
  for (const label of labels) {
    const button = page.getByRole("button", { name: label }).first();
    if (await button.isVisible({ timeout: 250 }).catch(() => false)) {
      await button.click();
      return await button.innerText().catch(() => "cookie prompt");
    }
  }
  return null;
}

async function markSensitiveContent(page) {
  return page.evaluate(() => {
    const marked = new Set();
    const selectors = [
      "[data-screenshot-sensitive]",
      "[data-testid='ip-address']",
      "[data-testid='public-ip']",
      "[class*='ip-address' i]",
      "[id*='ip-address' i]",
    ];

    for (const element of document.querySelectorAll(selectors.join(","))) {
      element.setAttribute("data-screenshot-mask", "true");
      marked.add(element);
    }

    const sensitivePattern =
      /\b(?:\d{1,3}\.){3}\d{1,3}\b|\bBearer\s+[A-Za-z0-9._~-]+|\b(?:api[_-]?key|token|password)\s*[:=]\s*\S+/i;
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );
    let node;
    while ((node = walker.nextNode())) {
      if (!sensitivePattern.test(node.textContent ?? "")) continue;
      const parent = node.parentElement;
      if (
        !parent ||
        parent === document.body ||
        parent === document.documentElement
      )
        continue;
      parent.setAttribute("data-screenshot-mask", "true");
      marked.add(parent);
    }

    return marked.size;
  });
}

async function markFullPageLayers(page) {
  return page.evaluate(() => {
    let fixed = 0;
    let sticky = 0;
    for (const element of document.querySelectorAll("body *")) {
      const position = getComputedStyle(element).position;
      if (position === "fixed") {
        element.setAttribute("data-visual-qa-fixed", "true");
        fixed += 1;
      } else if (position === "sticky") {
        element.setAttribute("data-visual-qa-sticky", "true");
        sticky += 1;
      }
    }
    return { fixed, sticky };
  });
}

async function normalizeFullPageLayers(page) {
  const counts = await markFullPageLayers(page);

  await page.addStyleTag({
    content: `
      [data-visual-qa-fixed="true"] { display: none !important; }
      [data-visual-qa-sticky="true"] {
        inset: auto !important;
        position: relative !important;
        transform: none !important;
      }
    `,
  });

  return counts;
}

async function captureFullPagePng(page, mask) {
  const viewport = page.viewportSize();
  if (!viewport) throw new Error("The screenshot page has no fixed viewport");

  const dimensions = await page.evaluate(() => ({
    width: Math.max(
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
    ),
    height: Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    ),
  }));
  const tiles = [];
  const maximumScrollTop = Math.max(0, dimensions.height - viewport.height);
  const positions = [];
  for (let top = 0; top < maximumScrollTop; top += viewport.height)
    positions.push(top);
  positions.push(maximumScrollTop);

  for (const requestedTop of [...new Set(positions)]) {
    const top = await page.evaluate(async (targetTop) => {
      window.scrollTo(0, targetTop);
      await new Promise((resolveFrame) =>
        requestAnimationFrame(() => requestAnimationFrame(resolveFrame)),
      );
      return window.scrollY;
    }, requestedTop);
    // Fixed conversion widgets may mount only after the first scroll. Mark
    // every tile after scrolling so late-mounted layers cannot be stamped into
    // each segment of the stitched full-page screenshot.
    await markFullPageLayers(page);
    await page.evaluate(
      () =>
        new Promise((resolveFrame) =>
          requestAnimationFrame(() => requestAnimationFrame(resolveFrame)),
        ),
    );
    const input = await page.screenshot({
      fullPage: false,
      animations: "disabled",
      caret: "hide",
      mask,
      maskColor: "#071226",
      type: "png",
    });
    tiles.push({ input, left: 0, top });
  }

  await page.evaluate(() => window.scrollTo(0, 0));

  const image = await sharp({
    create: {
      width: dimensions.width,
      height: dimensions.height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite(tiles)
    .png()
    .toBuffer();

  return { image, dimensions, tileCount: tiles.length };
}

async function resolveEnglishRoute(page, baseUrl, route) {
  let response = await page.goto(localUrl(baseUrl, route), {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });
  if (!response) throw new Error(`No HTTP response for ${route}`);

  let language =
    (await page.locator("html").getAttribute("lang"))?.toLowerCase() ?? "";
  if (!language.startsWith("en")) {
    const englishAlternate = await page
      .locator('link[rel="alternate"][hreflang="en"]')
      .first()
      .getAttribute("href");

    if (!englishAlternate) {
      throw new Error(
        `${route} is ${language || "unlabelled"} and exposes no English hreflang route`,
      );
    }

    const englishPath = new URL(englishAlternate, baseUrl).pathname;
    await page.context().clearCookies();
    await page.context().addCookies([
      {
        name: "NEXT_LOCALE",
        value: "en",
        url: baseUrl,
        sameSite: "Lax",
      },
    ]);
    response = await page.goto(localUrl(baseUrl, englishPath), {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    if (!response)
      throw new Error(`No HTTP response for English route ${englishPath}`);
    language =
      (await page.locator("html").getAttribute("lang"))?.toLowerCase() ?? "";
  }

  const finalUrl = new URL(page.url());
  const finalPath = normalizePathname(finalUrl.pathname);
  const canonicalHref = await page
    .locator('link[rel="canonical"]')
    .first()
    .getAttribute("href");
  const canonicalUrl = canonicalHref ? new URL(canonicalHref, baseUrl) : null;
  const canonicalPath = canonicalUrl
    ? normalizePathname(canonicalUrl.pathname)
    : null;

  if (!response.ok())
    throw new Error(`${finalPath} returned HTTP ${response.status()}`);
  if (!language.startsWith("en"))
    throw new Error(
      `${finalPath} rendered html[lang=${language || "missing"}]`,
    );
  if (NON_ENGLISH_PREFIX.test(finalPath) || ENGLISH_PREFIX.test(finalPath)) {
    throw new Error(
      `${finalPath} is not the canonical locale-less English route`,
    );
  }
  if (
    !canonicalUrl ||
    canonicalUrl.hostname !== CANONICAL_HOST ||
    canonicalPath !== finalPath
  ) {
    throw new Error(
      `Canonical mismatch for ${finalPath}: ${canonicalHref ?? "missing"}`,
    );
  }

  return {
    finalPath,
    canonicalPath,
    canonicalUrl: canonicalUrl.toString(),
    language,
    status: response.status(),
  };
}

async function captureRoute(browser, route, options) {
  const routeResult = {
    requestedRoute: route,
    captures: [],
  };

  let verifiedEnglishPath;
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      colorScheme: "light",
      locale: "en-US",
      extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
    });
    await context.addInitScript(() => {
      window.localStorage.setItem("cookie-consent", "rejected");
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (message) => {
      if (message.type() !== "error") return;
      const source = message.location().url;
      consoleErrors.push(
        source ? `${message.text()} [${source}]` : message.text(),
      );
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    try {
      const resolvedRoute = await resolveEnglishRoute(
        page,
        options.baseUrl,
        verifiedEnglishPath ?? route,
      );
      verifiedEnglishPath = resolvedRoute.finalPath;
      Object.assign(routeResult, resolvedRoute);

      await settlePage(page);
      const dismissedPrompt = await dismissCookiePrompt(page);
      if (dismissedPrompt) {
        await page.waitForTimeout(250);
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      const maskedElements = await markSensitiveContent(page);
      const mask = [
        page.locator(
          '[data-screenshot-mask="true"], [data-screenshot-sensitive]',
        ),
      ];

      const h1Count = await page.locator("h1").count();
      const horizontalOverflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      );
      const overlayVisible = await page
        .locator(
          "nextjs-portal, [data-nextjs-dialog-overlay], .nextjs-error-overlay",
        )
        .first()
        .isVisible()
        .catch(() => false);

      if (h1Count !== 1)
        throw new Error(`${verifiedEnglishPath} has ${h1Count} H1 elements`);
      if (horizontalOverflow)
        throw new Error(
          `${verifiedEnglishPath} has horizontal page overflow at ${viewport.width}px`,
        );
      if (overlayVisible)
        throw new Error(`${verifiedEnglishPath} shows a Next.js error overlay`);
      if (pageErrors.length)
        throw new Error(
          `${verifiedEnglishPath} page errors: ${pageErrors.join(" | ")}`,
        );

      await page.addStyleTag({
        content: "nextjs-portal { display: none !important; }",
      });

      const slug = routeSlug(verifiedEnglishPath);
      for (const captureMode of ["viewport", "full"]) {
        await page.evaluate(() => window.scrollTo(0, 0));
        const isFullPage = captureMode === "full";
        const normalizedLayers = isFullPage
          ? await normalizeFullPageLayers(page)
          : null;
        const fullPageCapture = isFullPage
          ? await captureFullPagePng(page, mask)
          : null;
        const png =
          fullPageCapture?.image ??
          (await page.screenshot({
            fullPage: false,
            animations: "disabled",
            caret: "hide",
            mask,
            maskColor: "#071226",
            type: "png",
          }));
        const encodedImage = isFullPage
          ? png
          : await sharp(png).webp({ quality: 86, effort: 4 }).toBuffer();
        const extension = isFullPage ? "png" : "webp";
        const filename = `${slug}--en--${viewport.id}-${viewport.width}x${viewport.height}--${captureMode}--light.${extension}`;
        const destination = resolve(options.outputDir, filename);
        await writeFile(destination, encodedImage);

        routeResult.captures.push({
          id: `${viewport.id}-${captureMode}`,
          file: destination,
          filename: basename(destination),
          bytes: encodedImage.length,
          sha256: sha256(encodedImage),
          format: extension,
          viewport,
          captureMode,
          normalizedLayers,
          tileCount: fullPageCapture?.tileCount ?? 1,
          capturedDimensions: fullPageCapture?.dimensions ?? {
            width: viewport.width,
            height: viewport.height,
          },
          maskedElements,
          dismissedPrompt,
          consoleErrors,
          pageErrors,
          assertions: {
            status200: resolvedRoute.status === 200,
            englishLanguage: resolvedRoute.language.startsWith("en"),
            localeLessPath:
              !NON_ENGLISH_PREFIX.test(resolvedRoute.finalPath) &&
              !ENGLISH_PREFIX.test(resolvedRoute.finalPath),
            canonicalMatch:
              resolvedRoute.canonicalPath === resolvedRoute.finalPath,
            oneH1: h1Count === 1,
            noHorizontalOverflow: !horizontalOverflow,
            noErrorOverlay: !overlayVisible,
            noPageErrors: pageErrors.length === 0,
          },
        });
      }
    } finally {
      await context.close();
    }
  }

  return routeResult;
}

async function main() {
  const routes = requestedRoutes();
  if (!routes.length) {
    throw new Error(
      "Provide at least one route, for example: npm run qa:screenshots -- /compare/nordvpn-vs-surfshark",
    );
  }

  const baseUrl = readOption("base-url") ?? DEFAULT_BASE_URL;
  const outputDir = resolve(readOption("output") ?? DEFAULT_OUTPUT_DIR);
  await mkdir(outputDir, { recursive: true });

  const browser = await launchBrowser();
  const results = [];
  try {
    for (const route of routes) {
      console.log(`Capturing canonical English page for ${route} ...`);
      const result = await captureRoute(browser, route, { baseUrl, outputDir });
      results.push(result);
      console.log(
        `  ${result.finalPath}: ${result.captures.length} screenshots`,
      );
    }
  } finally {
    await browser.close();
  }

  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    baseUrl,
    outputDir,
    localePolicy: "canonical locale-less English only",
    viewports: VIEWPORTS,
    routes: results,
  };
  const reportPath = resolve(outputDir, "manifest.json");
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`Screenshot manifest: ${reportPath}`);
}

main().catch((error) => {
  console.error(`Screenshot QA failed: ${error.message}`);
  process.exitCode = 1;
});
