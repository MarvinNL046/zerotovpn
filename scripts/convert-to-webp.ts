import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOTS_DIR = path.join(__dirname, '../public/screenshots');
const OUTPUT_DIR = path.join(__dirname, '../public/vpn-images');

// Sizes to generate (matching existing images)
const sizes = {
  'full': { width: 1920, height: 1080 },
  'hero': { width: 1920, height: 800 },
  'og': { width: 1200, height: 630 },
  'card': { width: 400, height: 250 },
  'thumb': { width: 200, height: 125 },
};

async function convertToWebP() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all unique VPN slugs from PNG files
  const files = fs.readdirSync(SCREENSHOTS_DIR).filter(f => f.endsWith('.png'));
  const slugs = [...new Set(files.map(f => f.replace(/-full\.png|-hero\.png/, '')))];

  console.log(`Converting ${slugs.length} VPNs to WebP format...\n`);

  for (const slug of slugs) {
    const fullPng = path.join(SCREENSHOTS_DIR, `${slug}-full.png`);
    const heroPng = path.join(SCREENSHOTS_DIR, `${slug}-hero.png`);

    if (!fs.existsSync(fullPng)) {
      console.log(`⚠️  Skipping ${slug}: full.png not found`);
      continue;
    }

    try {
      console.log(`🔄 ${slug}`);

      // Generate all sizes from the full screenshot
      for (const [sizeName, dimensions] of Object.entries(sizes)) {
        const sourcePng = sizeName === 'hero' ? heroPng : fullPng;
        const outputPath = path.join(OUTPUT_DIR, `${slug}-${sizeName}.webp`);

        if (fs.existsSync(sourcePng)) {
          await sharp(sourcePng)
            .resize(dimensions.width, dimensions.height, {
              fit: 'cover',
              position: 'top'
            })
            .webp({ quality: 85 })
            .toFile(outputPath);
        }
      }

      console.log(`   ✅ Generated all sizes`);

    } catch (error) {
      console.log(`   ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Count results
  const webpFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.webp'));
  console.log(`\n🎉 Conversion complete! Generated ${webpFiles.length} WebP images.`);
}

convertToWebP().catch(console.error);
