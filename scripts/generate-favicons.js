#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sizes = [
  // Essential favicon sizes only
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  
  // Apple Touch Icon (180x180 covers all iOS devices)
  { size: 180, name: 'apple-touch-icon.png' },
  
  // Android Chrome icons (essential sizes)
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  
  // Open Graph image
  { width: 1200, height: 630, name: 'og-image.png' },
];

async function generateFavicons() {
  const inputPath = path.join(__dirname, '../docs/public/logo.svg');
  const outputDir = path.join(__dirname, '../docs/public');
  
  if (!fs.existsSync(inputPath)) {
    console.error('logo.svg not found at:', inputPath);
    return;
  }
  
  console.log('🎨 Generating essential favicons from logo.svg...');
  
  // Read SVG and validate
  const svgBuffer = fs.readFileSync(inputPath);
  
  if (svgBuffer.length === 0) {
    console.error('❌ logo.svg is empty');
    return;
  }
  
  let successCount = 0;
  
  for (const config of sizes) {
    try {
      const outputPath = path.join(outputDir, config.name);
      
      if (config.width && config.height) {
        // Special handling for Open Graph image
        await sharp(svgBuffer)
          .resize(config.width, config.height, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(outputPath);
      } else {
        // Standard square icons
        await sharp(svgBuffer)
          .resize(config.size, config.size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(outputPath);
      }
      
      const stats = fs.statSync(outputPath);
      console.log(`✅ Generated ${config.name} (${config.size || `${config.width}x${config.height}`}) - ${stats.size} bytes`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to generate ${config.name}:`, error.message);
    }
  }
  
  // Generate ICO file (legacy support)
  try {
    const ico32 = await sharp(svgBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();
      
    const ico16 = await sharp(svgBuffer)
      .resize(16, 16, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();
    
    // For now, just use the 32x32 PNG as favicon.ico
    // (Proper ICO generation would require additional libraries)
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), ico32);
    console.log('✅ Generated favicon.ico');
  } catch (error) {
    console.error('❌ Failed to generate favicon.ico:', error.message);
  }
  
  // Generate Safari pinned tab SVG (monochrome)
  try {
    const safariSvg = svgBuffer.toString()
      .replace(/fill="[^"]*"/g, 'fill="black"')
      .replace(/opacity="[^"]*"/g, 'opacity="1"')
      .replace(/fill-opacity="[^"]*"/g, 'fill-opacity="1"');
    
    fs.writeFileSync(path.join(outputDir, 'safari-pinned-tab.svg'), safariSvg);
    console.log('✅ Generated safari-pinned-tab.svg');
  } catch (error) {
    console.error('❌ Failed to generate safari-pinned-tab.svg:', error.message);
  }
  
  console.log(`🎉 Favicon generation complete! Generated ${successCount} essential files`);
}

generateFavicons().catch(console.error);
