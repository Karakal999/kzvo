#!/usr/bin/env node

/**
 * Script to extract i18n translation keys from source code
 * 
 * Usage:
 *   node scripts/extract-i18n-keys.js
 * 
 * This will scan all .tsx and .ts files for translation keys and:
 * 1. List all unique keys found
 * 2. Check for missing translations
 * 3. Generate a report
 */

const fs = require('fs');
const path = require('path');

// Patterns to match translation keys
const patterns = [
  // t('key')
  /t\(['"`]([^'"`]+)['"`]\)/g,
  // t("key")
  /t\(["']([^"']+)["']\)/g,
  // i18nKey="key"
  /i18nKey=["']([^"']+)["']/g,
  // pageKeys(...), commonKeys(...), navKeys(...)
  /(?:pageKeys|commonKeys|navKeys)\(['"`]([^'"`]+)['"`](?:,\s*['"`]([^'"`]+)['"`])*\)/g,
];

// Directories to scan
const srcDir = path.join(__dirname, '..', 'src');
const localesDir = path.join(__dirname, '..', 'src', 'locales');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Recursively find all files with specific extensions
 */
function findFiles(dir, extensions = ['.tsx', '.ts'], files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and dist
      if (item !== 'node_modules' && item !== 'dist' && item !== 'build') {
        findFiles(fullPath, extensions, files);
      }
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extract translation keys from file content
 */
function extractKeys(content) {
  const keys = new Set();

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (match[1]) {
        keys.add(match[1]);
      }
    }
  }

  return Array.from(keys);
}

/**
 * Load translation file
 */
function loadTranslations(lang, namespace) {
  const filePath = path.join(localesDir, lang, `${namespace}.json`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error(`${colors.red}Error loading ${filePath}:${colors.reset}`, error.message);
    return null;
  }
}

/**
 * Flatten nested object to dot notation
 */
function flattenObject(obj, prefix = '') {
  const flattened = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  }

  return flattened;
}

/**
 * Check if key exists in translations
 */
function keyExists(translations, key) {
  // Handle namespace:key format
  const [namespace, ...keyParts] = key.split(':');
  const actualKey = keyParts.length > 0 ? keyParts.join(':') : namespace;
  const ns = keyParts.length > 0 ? namespace : 'common';

  const nsTranslations = translations[ns];
  if (!nsTranslations) return false;

  const flatTranslations = flattenObject(nsTranslations);
  return actualKey in flatTranslations;
}

/**
 * Main function
 */
function main() {
  console.log(`${colors.bright}${colors.cyan}=== i18n Keys Extraction ===${colors.reset}\n`);

  // Find all source files
  console.log(`${colors.blue}Scanning files in ${srcDir}...${colors.reset}`);
  const files = findFiles(srcDir, ['.tsx', '.ts']);
  console.log(`${colors.green}Found ${files.length} files${colors.reset}\n`);

  // Extract all keys
  const allKeys = new Set();
  const keysByFile = {};

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const keys = extractKeys(content);

    if (keys.length > 0) {
      const relativePath = path.relative(srcDir, file);
      keysByFile[relativePath] = keys;
      keys.forEach(key => allKeys.add(key));
    }
  }

  console.log(`${colors.cyan}${colors.bright}Total unique keys found: ${allKeys.size}${colors.reset}\n`);

  // Load translations
  const languages = ['uk', 'en'];
  const namespaces = ['common', 'navigation', 'pages', 'about', 'news'];
  
  const translations = {};
  for (const lang of languages) {
    translations[lang] = {};
    for (const ns of namespaces) {
      const trans = loadTranslations(lang, ns);
      if (trans) {
        translations[lang][ns] = trans;
      }
    }
  }

  // Check for missing translations
  const missingKeys = {
    uk: new Set(),
    en: new Set(),
  };

  for (const key of allKeys) {
    for (const lang of languages) {
      if (!keyExists(translations[lang], key)) {
        missingKeys[lang].add(key);
      }
    }
  }

  // Report
  console.log(`${colors.bright}${colors.yellow}=== Translation Status ===${colors.reset}\n`);

  for (const lang of languages) {
    const missing = missingKeys[lang].size;
    const total = allKeys.size;
    const coverage = ((total - missing) / total * 100).toFixed(1);

    const color = missing === 0 ? colors.green : missing < 10 ? colors.yellow : colors.red;

    console.log(`${color}${lang.toUpperCase()}: ${total - missing}/${total} keys (${coverage}% coverage)${colors.reset}`);

    if (missing > 0) {
      console.log(`${colors.red}Missing ${missing} translations:${colors.reset}`);
      for (const key of Array.from(missingKeys[lang]).slice(0, 10)) {
        console.log(`  - ${key}`);
      }
      if (missing > 10) {
        console.log(`  ... and ${missing - 10} more`);
      }
      console.log('');
    }
  }

  // Keys by file
  console.log(`\n${colors.bright}${colors.cyan}=== Keys by File ===${colors.reset}\n`);
  
  const sortedFiles = Object.entries(keysByFile).sort((a, b) => b[1].length - a[1].length);
  
  for (const [file, keys] of sortedFiles.slice(0, 10)) {
    console.log(`${colors.yellow}${file}${colors.reset}: ${keys.length} keys`);
  }

  if (sortedFiles.length > 10) {
    console.log(`\n... and ${sortedFiles.length - 10} more files`);
  }

  // Summary
  console.log(`\n${colors.bright}${colors.green}=== Summary ===${colors.reset}`);
  console.log(`Total files scanned: ${files.length}`);
  console.log(`Total unique keys: ${allKeys.size}`);
  console.log(`Languages: ${languages.join(', ')}`);
  console.log(`Namespaces: ${namespaces.join(', ')}`);
  
  const hasIssues = missingKeys.uk.size > 0 || missingKeys.en.size > 0;
  
  if (hasIssues) {
    console.log(`\n${colors.red}⚠ Some translations are missing!${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✓ All translations are complete!${colors.reset}`);
    process.exit(0);
  }
}

// Run
main();

