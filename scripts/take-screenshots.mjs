import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const vpnSites = [
  {
    slug: 'nordvpn',
    name: 'NordVPN',
    url: 'https://nordvpn.com',
  },
  {
    slug: 'surfshark',
    name: 'Surfshark',
    url: 'https://surfshark.com',
  },
  {
    slug: 'expressvpn',
    name: 'ExpressVPN',
    url: 'https://expressvpn.com',
  },
  {
    slug: 'cyberghost',
    name: 'CyberGhost',
    url: 'https://cyberghostvpn.com',
  },
  {
    slug: 'protonvpn',
    name: 'ProtonVPN',
    url: 'https://protonvpn.com',
  },
  {
    slug: 'private-internet-access',
    name: 'Private Internet Access',
    url: 'https://privateinternetaccess.com',
  },
];

async function takeScreenshots() {
  const outputDir = join(__dirname, '..', 'public', 'screenshots');
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  for (const vpn of vpnSites) {
    console.log(`📸 Taking screenshot of ${vpn.name} (${vpn.url})...`);

    try {
      const page = await context.newPage();

      // Navigate to the site
      await page.goto(vpn.url, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      // Wait a bit for any animations to settle
      await page.waitForTimeout(2000);

      // Close any cookie banners or popups (common patterns)
      try {
        // Try various common cookie/popup selectors
        const popupSelectors = [
          '[data-testid="cookie-banner"] button',
          '.cookie-banner button',
          '#cookie-consent button',
          '[class*="cookie"] button[class*="accept"]',
          '[class*="cookie"] button[class*="agree"]',
          '[class*="consent"] button',
          'button:has-text("Accept")',
          'button:has-text("I agree")',
          'button:has-text("Got it")',
          'button:has-text("OK")',
        ];

        for (const selector of popupSelectors) {
          const button = page.locator(selector).first();
          if (await button.isVisible({ timeout: 500 }).catch(() => false)) {
            await button.click().catch(() => {});
            await page.waitForTimeout(500);
            break;
          }
        }
      } catch (e) {
        // Ignore popup handling errors
      }

      // Wait a moment after closing popups
      await page.waitForTimeout(1000);

      // Take full page screenshot
      const screenshotPath = join(outputDir, `${vpn.slug}-full.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false, // Just viewport for hero section
      });
      console.log(`  ✅ Saved: ${screenshotPath}`);

      // Take a hero/above-fold screenshot (smaller, product card friendly)
      const heroPath = join(outputDir, `${vpn.slug}-hero.png`);
      await page.screenshot({
        path: heroPath,
        clip: { x: 0, y: 0, width: 1920, height: 800 },
      });
      console.log(`  ✅ Saved: ${heroPath}`);

      await page.close();
    } catch (error) {
      console.error(`  ❌ Error with ${vpn.name}: ${error.message}`);
    }
  }

  await browser.close();
  console.log('\n🎉 All screenshots completed!');
}

takeScreenshots().catch(console.error);
