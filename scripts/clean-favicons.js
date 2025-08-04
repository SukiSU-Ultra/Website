#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function cleanUpFavicons() {
  const publicDir = path.join(__dirname, '../docs/public');
  console.log('🧹 Cleaning up unnecessary favicon files...');
  
  // Files to keep (essential ones only)
  const keepFiles = [
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png', // 180x180 - covers all iOS devices
    'android-chrome-192x192.png', // Standard Android
    'android-chrome-512x512.png', // Maskable Android
    'safari-pinned-tab.svg',
    'og-image.png',
    'logo.svg',
    'site.webmanifest',
    'browserconfig.xml',
    'robots.txt',
    'sw.js'
  ];
  
  // Get all files in public directory
  const allFiles = fs.readdirSync(publicDir);
  let removedCount = 0;
  
  allFiles.forEach(file => {
    // Skip directories and essential files
    const filePath = path.join(publicDir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile()) {
      // Check if this is a favicon file we want to remove
      const isFaviconFile = file.match(/^(apple-touch-icon|android-chrome|mstile|favicon|safari-pinned-tab)/);
      
      if (isFaviconFile && !keepFiles.includes(file)) {
        console.log(`🗑️  Removing unnecessary: ${file}`);
        fs.unlinkSync(filePath);
        removedCount++;
      } else if (keepFiles.includes(file)) {
        console.log(`✅ Keeping essential: ${file}`);
      }
    }
  });
  
  console.log(`\n🎉 Cleanup complete! Removed ${removedCount} unnecessary files`);
  console.log(`📦 Kept ${keepFiles.length} essential files for optimal performance`);
}

cleanUpFavicons();
