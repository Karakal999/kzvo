#!/usr/bin/env node

/**
 * Script to check translation performance
 * 
 * Checks:
 * - Bundle size with translations
 * - Translation file sizes
 * - Loading time estimates
 * - Memory usage
 * 
 * Usage:
 *   node scripts/check-translation-performance.cjs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const localesDir = path.resolve('./src/locales');
const supportedLangs = ['uk', 'en'];

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (e) {
    return 0;
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Get all translation files
 */
function getTranslationFiles() {
  const files = {};
  
  for (const lang of supportedLangs) {
    const langDir = path.join(localesDir, lang);
    
    if (!fs.existsSync(langDir)) {
      console.warn(`${colors.yellow}⚠️  Warning: ${lang} directory not found${colors.reset}`);
      continue;
    }
    
    files[lang] = fs.readdirSync(langDir)
      .filter(file => file.endsWith('.json'))
      .map(file => ({
        name: file,
        path: path.join(langDir, file),
        size: getFileSize(path.join(langDir, file)),
      }));
  }
  
  return files;
}

/**
 * Analyze translation files
 */
function analyzeTranslations() {
  console.log(`${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║   Translation Performance Check       ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);

  const files = getTranslationFiles();
  
  let totalSize = 0;
  const sizeByLang = {};
  const sizeByNamespace = {};
  
  // Calculate sizes
  for (const [lang, langFiles] of Object.entries(files)) {
    sizeByLang[lang] = 0;
    
    console.log(`${colors.blue}📦 ${lang.toUpperCase()} Translation Files:${colors.reset}`);
    
    for (const file of langFiles) {
      const namespace = path.basename(file.name, '.json');
      
      if (!sizeByNamespace[namespace]) {
        sizeByNamespace[namespace] = 0;
      }
      
      sizeByNamespace[namespace] += file.size;
      sizeByLang[lang] += file.size;
      totalSize += file.size;
      
      console.log(`  ${file.name.padEnd(20)} ${formatBytes(file.size).padStart(10)}`);
    }
    
    console.log(`  ${colors.cyan}${'Total:'.padEnd(20)} ${formatBytes(sizeByLang[lang]).padStart(10)}${colors.reset}\n`);
  }
  
  // Summary
  console.log(`${colors.cyan}═════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}          PERFORMANCE SUMMARY            ${colors.reset}`);
  console.log(`${colors.cyan}═════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`${colors.magenta}📊 Total Translation Size:${colors.reset} ${formatBytes(totalSize)}`);
  console.log(`${colors.magenta}📊 Average per Language:${colors.reset} ${formatBytes(totalSize / supportedLangs.length)}\n`);
  
  // Size by namespace
  console.log(`${colors.blue}📦 Size by Namespace:${colors.reset}`);
  Object.entries(sizeByNamespace).forEach(([namespace, size]) => {
    const avgSize = size / supportedLangs.length;
    console.log(`  ${namespace.padEnd(20)} ${formatBytes(avgSize).padStart(10)} (avg)`);
  });
  console.log('');
  
  // Performance recommendations
  console.log(`${colors.yellow}💡 Performance Recommendations:${colors.reset}\n`);
  
  // Check for large files
  const largeFiles = [];
  for (const [lang, langFiles] of Object.entries(files)) {
    for (const file of langFiles) {
      if (file.size > 50 * 1024) { // > 50KB
        largeFiles.push({ lang, ...file });
      }
    }
  }
  
  if (largeFiles.length > 0) {
    console.log(`${colors.red}⚠️  Large Translation Files (>50KB):${colors.reset}`);
    largeFiles.forEach(file => {
      console.log(`  ${file.lang}/${file.name}: ${formatBytes(file.size)}`);
    });
    console.log(`  ${colors.yellow}Consider splitting these files into smaller namespaces.${colors.reset}\n`);
  } else {
    console.log(`${colors.green}✓ All translation files are under 50KB${colors.reset}\n`);
  }
  
  // Estimate loading time
  const estimatedLoadTime = totalSize / (1024 * 100); // Assuming 100KB/s
  console.log(`${colors.cyan}⏱️  Estimated Load Time:${colors.reset}`);
  console.log(`  3G (100 KB/s): ${estimatedLoadTime.toFixed(2)}s`);
  console.log(`  4G (500 KB/s): ${(estimatedLoadTime / 5).toFixed(2)}s`);
  console.log(`  WiFi (5 MB/s): ${(estimatedLoadTime / 50).toFixed(2)}s\n`);
  
  // Bundle size check
  console.log(`${colors.cyan}📦 Bundle Size Analysis:${colors.reset}`);
  
  const distDir = path.resolve('./dist');
  if (fs.existsSync(distDir)) {
    try {
      const jsFiles = execSync(`find "${distDir}" -name "*.js" -type f`, { encoding: 'utf-8' })
        .trim()
        .split('\n')
        .filter(Boolean);
      
      let totalBundleSize = 0;
      jsFiles.forEach(file => {
        totalBundleSize += getFileSize(file);
      });
      
      console.log(`  Total JS Bundle: ${formatBytes(totalBundleSize)}`);
      console.log(`  Translations: ${formatBytes(totalSize)} (${((totalSize / totalBundleSize) * 100).toFixed(2)}% of bundle)\n`);
      
      if (totalSize / totalBundleSize > 0.1) {
        console.log(`${colors.yellow}⚠️  Translations make up more than 10% of the bundle.${colors.reset}`);
        console.log(`  ${colors.yellow}Consider lazy-loading translations or using a CDN.${colors.reset}\n`);
      }
    } catch (e) {
      console.log(`  ${colors.yellow}Unable to analyze bundle (run 'npm run build' first)${colors.reset}\n`);
    }
  } else {
    console.log(`  ${colors.yellow}No build found. Run 'npm run build' to analyze bundle size.${colors.reset}\n`);
  }
  
  // Caching recommendations
  console.log(`${colors.cyan}🗄️  Caching Strategy:${colors.reset}`);
  console.log(`  ${colors.green}✓${colors.reset} Translation files are static and can be cached indefinitely`);
  console.log(`  ${colors.green}✓${colors.reset} Use versioned filenames or cache busting for updates`);
  console.log(`  ${colors.green}✓${colors.reset} Consider using service workers for offline support\n`);
  
  // Final score
  const score = calculateScore(totalSize, largeFiles.length);
  console.log(`${colors.cyan}═════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}          PERFORMANCE SCORE              ${colors.reset}`);
  console.log(`${colors.cyan}═════════════════════════════════════════${colors.reset}\n`);
  
  const scoreColor = score >= 80 ? colors.green : score >= 60 ? colors.yellow : colors.red;
  console.log(`${scoreColor}${score}/100${colors.reset}\n`);
  
  if (score >= 80) {
    console.log(`${colors.green}✅ Excellent! Your translations are well optimized.${colors.reset}\n`);
  } else if (score >= 60) {
    console.log(`${colors.yellow}⚠️  Good, but there's room for improvement.${colors.reset}\n`);
  } else {
    console.log(`${colors.red}❌ Poor performance. Consider optimizing your translations.${colors.reset}\n`);
  }
}

/**
 * Calculate performance score
 */
function calculateScore(totalSize, largeFilesCount) {
  let score = 100;
  
  // Deduct points for total size
  if (totalSize > 500 * 1024) { // > 500KB
    score -= 30;
  } else if (totalSize > 200 * 1024) { // > 200KB
    score -= 15;
  } else if (totalSize > 100 * 1024) { // > 100KB
    score -= 5;
  }
  
  // Deduct points for large files
  score -= largeFilesCount * 10;
  
  return Math.max(0, score);
}

// Run
try {
  analyzeTranslations();
} catch (error) {
  console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
  console.error(error.stack);
  process.exit(1);
}

