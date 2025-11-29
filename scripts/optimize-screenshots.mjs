import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, '..', 'public', 'screenshots');
const outputDir = join(__dirname, '..', 'public', 'vpn-images');

async function optimizeImages() {
  await mkdir(outputDir, { recursive: true });

  const files = await readdir(inputDir);
  const pngFiles = files.filter(f => f.endsWith('.png'));

  console.log(`📸 Found ${pngFiles.length} images to optimize\n`);

  for (const file of pngFiles) {
    const { name } = parse(file);
    const inputPath = join(inputDir, file);

    // Determine if it's a hero or full screenshot
    const isHero = name.endsWith('-hero');
    const vpnSlug = name.replace('-hero', '').replace('-full', '');

    console.log(`🔄 Processing ${file}...`);

    // 1. WebP version (optimized, same size)
    const webpPath = join(outputDir, `${name}.webp`);
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(webpPath);

    const webpStats = await sharp(webpPath).metadata();
    console.log(`  ✅ WebP: ${name}.webp`);

    // 2. Thumbnail for cards (400x225 - 16:9 aspect ratio)
    if (isHero) {
      const thumbPath = join(outputDir, `${vpnSlug}-thumb.webp`);
      await sharp(inputPath)
        .resize(400, 225, {
          fit: 'cover',
          position: 'top'
        })
        .webp({ quality: 80 })
        .toFile(thumbPath);
      console.log(`  ✅ Thumbnail: ${vpnSlug}-thumb.webp`);

      // 3. Card image (600x338 - larger for retina)
      const cardPath = join(outputDir, `${vpnSlug}-card.webp`);
      await sharp(inputPath)
        .resize(600, 338, {
          fit: 'cover',
          position: 'top'
        })
        .webp({ quality: 85 })
        .toFile(cardPath);
      console.log(`  ✅ Card: ${vpnSlug}-card.webp`);

      // 4. OG Image for social sharing (1200x630)
      const ogPath = join(outputDir, `${vpnSlug}-og.webp`);
      await sharp(inputPath)
        .resize(1200, 630, {
          fit: 'cover',
          position: 'top'
        })
        .webp({ quality: 85 })
        .toFile(ogPath);
      console.log(`  ✅ OG Image: ${vpnSlug}-og.webp`);
    }
  }

  // Summary
  const outputFiles = await readdir(outputDir);
  console.log(`\n🎉 Optimization complete!`);
  console.log(`   Created ${outputFiles.length} optimized images in /public/vpn-images/`);

  // Show file sizes
  console.log('\n📊 File sizes:');
  for (const file of outputFiles.sort()) {
    const metadata = await sharp(join(outputDir, file)).metadata();
    const stats = await import('fs').then(fs => fs.promises.stat(join(outputDir, file)));
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`   ${file}: ${sizeKB} KB (${metadata.width}x${metadata.height})`);
  }
}

optimizeImages().catch(console.error);
