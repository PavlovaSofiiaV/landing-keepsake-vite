import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('src/assets/images');

async function optimizeImages() {
  const files = await fs.readdir(IMAGES_DIR);
  const jpgFiles = files.filter((file) => /\.(jpe?g|png)$/i.test(file));

  for (const file of jpgFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const baseName = path.parse(file).name;

    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(path.join(IMAGES_DIR, `${baseName}.webp`));

    await sharp(inputPath)
      .avif({ quality: 65 })
      .toFile(path.join(IMAGES_DIR, `${baseName}.avif`));

    console.log(`Optimized: ${file} -> ${baseName}.webp, ${baseName}.avif`);
  }
}

optimizeImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
