#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sizes = [
  // Standard favicon sizes
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  
  // Apple Touch Icon sizes
  { size: 57, name: 'apple-touch-icon-57x57.png' },
  { size: 60, name: 'apple-touch-icon-60x60.png' },
  { size: 72, name: 'apple-touch-icon-72x72.png' },
  { size: 76, name: 'apple-touch-icon-76x76.png' },
  { size: 114, name: 'apple-touch-icon-114x114.png' },
  { size: 120, name: 'apple-touch-icon-120x120.png' },
  { size: 144, name: 'apple-touch-icon-144x144.png' },
  { size: 152, name: 'apple-touch-icon-152x152.png' },
  { size: 167, name: 'apple-touch-icon-167x167.png' },
  { size: 180, name: 'apple-touch-icon.png' }, // Default Apple Touch Icon
  
  // Android Chrome icons
  { size: 36, name: 'android-chrome-36x36.png' },
  { size: 48, name: 'android-chrome-48x48.png' },
  { size: 72, name: 'android-chrome-72x72.png' },
  { size: 96, name: 'android-chrome-96x96.png' },
  { size: 144, name: 'android-chrome-144x144.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 256, name: 'android-chrome-256x256.png' },
  { size: 384, name: 'android-chrome-384x384.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  
  // Microsoft tiles
  { size: 70, name: 'mstile-70x70.png' },
  { size: 144, name: 'mstile-144x144.png' },
  { size: 150, name: 'mstile-150x150.png' },
  { size: 310, name: 'mstile-310x310.png' },
  
  // Safari Pinned Tab (will be converted separately)
  { size: 512, name: 'safari-pinned-tab.png' },
  
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
  
  console.log('🎨 Generating favicons from logo.svg...');
  
  // Read SVG and create base buffer
  const svgBuffer = fs.readFileSync(inputPath);
  
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
          .png()
          .toFile(outputPath);
      } else {
        // Standard square icons
        await sharp(svgBuffer)
          .resize(config.size, config.size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .png()
          .toFile(outputPath);
      }
      
      console.log(`✅ Generated ${config.name} (${config.size || `${config.width}x${config.height}`})`);
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
  
  console.log('🎉 Favicon generation complete!');
}

generateFavicons().catch(console.error);
