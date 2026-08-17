import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.SCREENSHOT_BASE_URL ?? "http://127.0.0.1:3001";
const outputDir = resolve(
  process.argv.find((argument) => argument.startsWith("--output="))?.slice(9) ??
    "artifacts/visual-qa-vpn-finder-results",
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
  { id: "compact", width: 320, height: 800 },
];

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

async function dismissCookiePrompt(page) {
  const button = page
    .getByRole("button", {
      name: /^(accept|accept all|accept cookies)$/i,
    })
    .first();
  if (await button.isVisible({ timeout: 2_500 }).catch(() => false)) {
    await button.click();
  }
}

async function waitForFinderReady(page) {
  await page.locator("#primaryUse-privacy").waitFor({ state: "attached" });
  await page
    .waitForLoadState("networkidle", { timeout: 5_000 })
    .catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
}

async function chooseOption(page, inputId) {
  const input = page.locator(`#${inputId}`);
  await input.waitFor({ state: "attached" });
  await page.locator(`label[for="${inputId}"]`).click();
  await page.waitForFunction(
    (id) => document.getElementById(id)?.checked === true,
    inputId,
  );
}

async function advanceFinder(page, buttonName, stage) {
  const button = page.getByRole("button", { name: buttonName, exact: true });
  await button.waitFor({ state: "visible" });
  try {
    await page.waitForFunction(
      (label) =>
        [...document.querySelectorAll("button")].some(
          (candidate) =>
            candidate.textContent?.trim() === label && !candidate.disabled,
        ),
      buttonName,
      { timeout: 5_000 },
    );
  } catch {
    const heading = await page.locator("h2").first().innerText();
    const checked = await page
      .locator('input[type="radio"]:checked, input[type="checkbox"]:checked')
      .allTextContents();
    throw new Error(
      `${stage}: ${buttonName} did not become enabled (${heading}; checked controls: ${checked.length})`,
    );
  }
  if (await button.isDisabled()) {
    const heading = await page.locator("h2").first().innerText();
    throw new Error(
      `${stage}: ${buttonName} stayed disabled after selecting an answer (${heading})`,
    );
  }
  await button.click();
}

async function positionResultForCapture(page, mode) {
  if (mode === "full") {
    await page.evaluate(() => window.scrollTo(0, 0));
    return;
  }

  await page.locator("#finder-results-title").evaluate((heading) => {
    const top = heading.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo(0, Math.max(0, top));
  });
}

async function answerFinder(page) {
  await chooseOption(page, "primaryUse-privacy");
  await advanceFinder(page, "Continue", "shortlist step 1");

  await chooseOption(page, "platforms-desktop");
  await chooseOption(page, "platforms-android");
  await advanceFinder(page, "Continue", "shortlist step 2");

  await chooseOption(page, "deviceCount-six-ten");
  await advanceFinder(page, "Continue", "shortlist step 3");

  await chooseOption(page, "mustHave-none");
  await advanceFinder(page, "Continue", "shortlist step 4");

  await chooseOption(page, "network-home");
  await advanceFinder(page, "Show my shortlist", "shortlist step 5");
  await page.locator("#finder-results-title").waitFor({ state: "visible" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, 0);
    await new Promise((resolveFrame) =>
      requestAnimationFrame(() => requestAnimationFrame(resolveFrame)),
    );
  });
}

async function answerNoMatch(page) {
  await chooseOption(page, "primaryUse-privacy");
  await advanceFinder(page, "Continue", "no-match step 1");

  await chooseOption(page, "platforms-desktop");
  await advanceFinder(page, "Continue", "no-match step 2");

  await chooseOption(page, "deviceCount-more-ten");
  await advanceFinder(page, "Continue", "no-match step 3");

  await chooseOption(page, "mustHave-free");
  await advanceFinder(page, "Continue", "no-match step 4");

  await chooseOption(page, "network-home");
  await advanceFinder(page, "Show my shortlist", "no-match step 5");
  await page.locator("#finder-results-title").waitFor({ state: "visible" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, 0);
    await new Promise((resolveFrame) =>
      requestAnimationFrame(() => requestAnimationFrame(resolveFrame)),
    );
  });
}

async function freezePage(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      [style*="position: fixed"], nextjs-portal { display: none !important; }
    `,
  });
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const browser = await launchBrowser();
  const captures = [];

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport,
        colorScheme: "light",
        locale: "en-US",
        extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
      });
      await context.addInitScript(() => {
        window.localStorage.setItem("cookie-consent", "rejected");
      });
      const page = await context.newPage();
      const pageErrors = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));

      const response = await page.goto(`${baseUrl}/quiz`, {
        waitUntil: "domcontentloaded",
        timeout: 45_000,
      });
      if (!response?.ok())
        throw new Error(`/quiz returned ${response?.status()}`);
      if ((await page.locator("html").getAttribute("lang")) !== "en") {
        throw new Error("Finder screenshot must use canonical English");
      }
      await dismissCookiePrompt(page);
      await waitForFinderReady(page);
      await answerFinder(page);
      await dismissCookiePrompt(page);

      const result = page.locator('[class*="results"]').first();
      const resultText = await result.innerText();
      const providerNames = await result
        .locator("article h3")
        .allTextContents();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      const sponsored = page.locator('a[rel~="sponsored"]');
      const disclosure = result
        .locator('a[href*="affiliate-disclosure"]')
        .first();
      const sponsoredCount = await sponsored.count();
      if (overflow) throw new Error(`${viewport.id} result has page overflow`);
      if (pageErrors.length) throw new Error(pageErrors.join(" | "));
      if (providerNames.join("|") !== "NordVPN|Proton VPN|Surfshark") {
        throw new Error(`Unexpected shortlist: ${providerNames.join(", ")}`);
      }
      if (/match score|save\s+\d|\/month/i.test(resultText)) {
        throw new Error("Unsupported score or price language reached results");
      }
      if (sponsoredCount > 0) {
        const disclosureOrder = await disclosure.evaluate((element) => {
          const firstSponsored = document.querySelector('a[rel~="sponsored"]');
          return Boolean(
            firstSponsored &&
            element.compareDocumentPosition(firstSponsored) &
              Node.DOCUMENT_POSITION_FOLLOWING,
          );
        });
        if (!disclosureOrder) {
          throw new Error(
            "Affiliate disclosure must precede first sponsored link",
          );
        }
      }

      await freezePage(page);

      for (const mode of ["viewport", "full"]) {
        await positionResultForCapture(page, mode);
        const filename = `quiz-results--en--${viewport.id}-${viewport.width}x${viewport.height}--${mode}--light.png`;
        const destination = resolve(outputDir, filename);
        await page.screenshot({
          path: destination,
          fullPage: mode === "full",
          animations: "disabled",
          caret: "hide",
        });
        captures.push({
          id: `${viewport.id}-${mode}`,
          scenario: "supported-shortlist",
          file: destination,
          providers: providerNames,
          assertions: {
            english: true,
            noOverflow: !overflow,
            noPageErrors: pageErrors.length === 0,
            disclosureBeforeSponsored: true,
            noUnsupportedScoreOrPrice: true,
          },
        });
      }

      await page.close();
      const noMatchPage = await context.newPage();
      const noMatchPageErrors = [];
      noMatchPage.on("pageerror", (error) =>
        noMatchPageErrors.push(error.message),
      );
      const noMatchResponse = await noMatchPage.goto(`${baseUrl}/quiz`, {
        waitUntil: "domcontentloaded",
        timeout: 45_000,
      });
      if (!noMatchResponse?.ok()) {
        throw new Error(`/quiz returned ${noMatchResponse?.status()}`);
      }
      await waitForFinderReady(noMatchPage);
      await answerNoMatch(noMatchPage);

      const noMatchResult = noMatchPage.locator('[class*="results"]').first();
      const noMatchText = await noMatchResult.innerText();
      const noMatchProviders = await noMatchResult
        .locator("article h3")
        .count();
      const noMatchOverflow = await noMatchPage.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      if (noMatchProviders !== 0) {
        throw new Error("No-match state must not invent a provider result");
      }
      if (!/cannot give a reliable match/i.test(noMatchText)) {
        throw new Error("No-match explanation is missing");
      }
      if (await noMatchResult.locator('a[rel~="sponsored"]').count()) {
        throw new Error("No-match state must not contain sponsored links");
      }
      if (noMatchOverflow) {
        throw new Error(`${viewport.id} no-match state has page overflow`);
      }
      if (noMatchPageErrors.length) {
        throw new Error(noMatchPageErrors.join(" | "));
      }

      await freezePage(noMatchPage);
      for (const mode of ["viewport", "full"]) {
        await positionResultForCapture(noMatchPage, mode);
        const filename = `quiz-no-match--en--${viewport.id}-${viewport.width}x${viewport.height}--${mode}--light.png`;
        const destination = resolve(outputDir, filename);
        await noMatchPage.screenshot({
          path: destination,
          fullPage: mode === "full",
          animations: "disabled",
          caret: "hide",
        });
        captures.push({
          id: `no-match-${viewport.id}-${mode}`,
          scenario: "free-only + more-than-10-devices",
          file: destination,
          providers: [],
          assertions: {
            english: true,
            noOverflow: !noMatchOverflow,
            noInventedProvider: true,
            noSponsoredLink: true,
          },
        });
      }
      await noMatchPage.close();

      await context.close();
    }
  } finally {
    await browser.close();
  }

  await writeFile(
    resolve(outputDir, "manifest.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        route: "/quiz",
        localePolicy: "canonical locale-less English only",
        scenarios: [
          "privacy + desktop/android + 6–10 devices + no must-have + home",
          "privacy + desktop + more than 10 devices + free only + home",
        ],
        captures,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  console.log(`VPN finder result screenshots: ${outputDir}`);
}

main().catch((error) => {
  console.error(`VPN finder screenshot QA failed: ${error.message}`);
  process.exitCode = 1;
});
