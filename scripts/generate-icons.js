const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const svgPath = path.join(publicDir, 'icon.svg');

// Sizes to generate
const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon.ico', size: 32 }
];

async function generateIcons() {
  console.log('Reading SVG file...');
  const svgBuffer = fs.readFileSync(svgPath);

  for (const { name, size } of sizes) {
    const outputPath = path.join(publicDir, name);
    console.log(`Generating ${name} (${size}x${size})...`);

    try {
      if (name.endsWith('.ico')) {
        // For ICO, generate a 32x32 PNG first
        await sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toFile(outputPath.replace('.ico', '-32.png'));

        console.log(`Generated ${name.replace('.ico', '-32.png')} (ICO needs manual conversion)`);
      } else {
        await sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toFile(outputPath);

        console.log(`✓ Generated ${name}`);
      }
    } catch (error) {
      console.error(`✗ Failed to generate ${name}:`, error.message);
    }
  }

  console.log('\n✓ Icon generation complete!');
}

generateIcons().catch(console.error);
