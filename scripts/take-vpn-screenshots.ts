import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// VPNs that need screenshots (missing from vpn-images folder)
const vpnsToScreenshot = [
  { slug: 'mullvad', website: 'https://mullvad.net' },
  { slug: 'ipvanish', website: 'https://ipvanish.com' },
  { slug: 'vyprvpn', website: 'https://vyprvpn.com' },
  { slug: 'tunnelbear', website: 'https://tunnelbear.com' },
  { slug: 'windscribe', website: 'https://windscribe.com' },
  { slug: 'hotspot-shield', website: 'https://hotspotshield.com' },
  { slug: 'strongvpn', website: 'https://strongvpn.com' },
  { slug: 'purevpn', website: 'https://purevpn.com' },
  { slug: 'atlas-vpn', website: 'https://atlasvpn.com' },
  { slug: 'privatevpn', website: 'https://privatevpn.com' },
  { slug: 'torguard', website: 'https://torguard.net' },
  { slug: 'airvpn', website: 'https://airvpn.org' },
  { slug: 'ivpn', website: 'https://ivpn.net' },
  { slug: 'mozilla-vpn', website: 'https://vpn.mozilla.org' },
  { slug: 'hide-me', website: 'https://hide.me' },
  { slug: 'zenmate', website: 'https://zenmate.com' },
  { slug: 'privadovpn', website: 'https://privadovpn.com' },
  { slug: 'hma', website: 'https://hidemyass.com' },
  { slug: 'astrill', website: 'https://astrill.com' },
  { slug: 'perfect-privacy', website: 'https://perfect-privacy.com' },
  { slug: 'goose-vpn', website: 'https://goosevpn.com' },
  { slug: 'trust-zone', website: 'https://trust.zone' },
  { slug: 'fastestvpn', website: 'https://fastestvpn.com' },
  { slug: 'ovpn', website: 'https://ovpn.com' },
  { slug: 'cactusvpn', website: 'https://cactusvpn.com' },
  { slug: 'betternet', website: 'https://betternet.co' },
  { slug: 'speedify', website: 'https://speedify.com' },
  { slug: 'vpn-unlimited', website: 'https://vpnunlimitedapp.com' },
  { slug: 'nordlayer', website: 'https://nordlayer.com' },
  { slug: 'perimeter-81', website: 'https://perimeter81.com' },
  { slug: 'urban-vpn', website: 'https://urban-vpn.com' },
  { slug: 'x-vpn', website: 'https://xvpn.io' },
];

const OUTPUT_DIR = path.join(__dirname, '../public/screenshots');

async function takeScreenshots() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  console.log(`Taking screenshots for ${vpnsToScreenshot.length} VPN websites...\n`);

  for (const vpn of vpnsToScreenshot) {
    const page = await context.newPage();

    try {
      console.log(`📸 ${vpn.slug}: ${vpn.website}`);

      // Navigate to the website with timeout
      await page.goto(vpn.website, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait a bit for any animations/lazy loading
      await page.waitForTimeout(2000);

      // Try to close cookie banners and popups
      try {
        // Common cookie consent selectors
        const cookieSelectors = [
          'button:has-text("Accept")',
          'button:has-text("Accept All")',
          'button:has-text("Accept Cookies")',
          'button:has-text("I Accept")',
          'button:has-text("Got it")',
          'button:has-text("OK")',
          'button:has-text("Agree")',
          '[data-testid="cookie-accept"]',
          '.cookie-accept',
          '#cookie-accept',
          '.accept-cookies',
          '#accept-cookies',
        ];

        for (const selector of cookieSelectors) {
          const button = page.locator(selector).first();
          if (await button.isVisible({ timeout: 500 }).catch(() => false)) {
            await button.click().catch(() => {});
            await page.waitForTimeout(500);
            break;
          }
        }
      } catch (e) {
        // Ignore cookie banner errors
      }

      // Take full page screenshot
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `${vpn.slug}-full.png`),
        fullPage: false, // Just the viewport
      });

      // Take hero section screenshot (top portion)
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `${vpn.slug}-hero.png`),
        clip: { x: 0, y: 0, width: 1920, height: 800 },
      });

      console.log(`   ✅ Success!`);

    } catch (error) {
      console.log(`   ❌ Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n🎉 Screenshot process complete!');
}

takeScreenshots().catch(console.error);
