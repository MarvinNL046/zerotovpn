import { chromium } from 'playwright';
import * as path from 'path';

// VPNs that failed the first time
const vpnsToRetry = [
  { slug: 'privatevpn', website: 'https://privatevpn.com' },
  { slug: 'nordlayer', website: 'https://nordlayer.com' },
  { slug: 'urban-vpn', website: 'https://urban-vpn.com' },
];

const OUTPUT_DIR = path.join(__dirname, '../public/screenshots');

async function retryScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  console.log(`Retrying ${vpnsToRetry.length} VPN websites with longer timeout...\n`);

  for (const vpn of vpnsToRetry) {
    const page = await context.newPage();

    try {
      console.log(`📸 ${vpn.slug}: ${vpn.website}`);

      // Use domcontentloaded instead of networkidle, with longer timeout
      await page.goto(vpn.website, {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      });

      // Wait for page to stabilize
      await page.waitForTimeout(5000);

      // Take screenshots
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `${vpn.slug}-full.png`),
        fullPage: false,
      });

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
  console.log('\n🎉 Retry complete!');
}

retryScreenshots().catch(console.error);
