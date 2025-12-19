#!/usr/bin/env node

/**
 * Script to synchronize translations between languages
 * 
 * Features:
 * - Auto-add missing keys from default language
 * - Mark outdated keys
 * - Generate translation reports
 * - Export to Excel for translators
 * 
 * Usage:
 *   node scripts/sync-translations.cjs
 *   node scripts/sync-translations.cjs --export-excel
 *   node scripts/sync-translations.cjs --check-missing
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const localesDir = path.resolve('./src/locales');
const defaultLang = 'uk';
const supportedLangs = ['uk', 'en'];

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

/**
 * Get all translation keys from object
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = keys.concat(getAllKeys(obj[key], newPrefix));
      } else {
        keys.push(newPrefix);
      }
    }
  }
  return keys;
}

/**
 * Get value by path
 */
function getValueByPath(obj, pathStr) {
  const pathArr = pathStr.split('.');
  return pathArr.reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Set value by path
 */
function setValueByPath(obj, pathStr, value) {
  const pathArr = pathStr.split('.');
  let current = obj;
  
  for (let i = 0; i < pathArr.length - 1; i++) {
    const part = pathArr[i];
    if (!current[part] || typeof current[part] !== 'object') {
      current[part] = {};
    }
    current = current[part];
  }
  
  current[pathArr[pathArr.length - 1]] = value;
}

/**
 * Load translation file
 */
function loadTranslation(lang, namespace) {
  const filePath = path.join(localesDir, lang, `${namespace}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    console.warn(`${colors.yellow}Warning: Could not load ${filePath}${colors.reset}`);
    return {};
  }
}

/**
 * Save translation file
 */
function saveTranslation(lang, namespace, data) {
  const filePath = path.join(localesDir, lang, `${namespace}.json`);
  const dir = path.dirname(filePath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

/**
 * Get all namespaces
 */
function getAllNamespaces() {
  const files = glob.sync(path.join(localesDir, defaultLang, '*.json'));
  return files.map(file => path.basename(file, '.json'));
}

/**
 * Sync translations
 */
function syncTranslations() {
  console.log(`${colors.cyan}🔄 Syncing translations...${colors.reset}\n`);
  
  const namespaces = getAllNamespaces();
  const report = {
    added: 0,
    missing: [],
    outdated: [],
    warnings: [],
  };

  for (const namespace of namespaces) {
    console.log(`${colors.blue}📦 Processing namespace: ${namespace}${colors.reset}`);
    
    const defaultTranslation = loadTranslation(defaultLang, namespace);
    const defaultKeys = getAllKeys(defaultTranslation);

    for (const lang of supportedLangs) {
      if (lang === defaultLang) continue;

      const translation = loadTranslation(lang, namespace);
      const translationKeys = getAllKeys(translation);

      // Find missing keys
      const missingKeys = defaultKeys.filter(key => !translationKeys.includes(key));
      
      // Find outdated keys (exist in target but not in default)
      const outdatedKeys = translationKeys.filter(key => !defaultKeys.includes(key));

      // Add missing keys
      for (const key of missingKeys) {
        const defaultValue = getValueByPath(defaultTranslation, key);
        setValueByPath(translation, key, `[${lang.toUpperCase()}] ${defaultValue}`);
        report.added++;
        report.missing.push({
          namespace,
          lang,
          key,
          defaultValue,
        });
      }

      // Mark outdated keys
      if (outdatedKeys.length > 0) {
        report.outdated.push({
          namespace,
          lang,
          keys: outdatedKeys,
        });
      }

      // Save updated translation
      if (missingKeys.length > 0) {
        saveTranslation(lang, namespace, translation);
        console.log(`  ${colors.green}✓${colors.reset} ${lang}: Added ${missingKeys.length} missing keys`);
      } else {
        console.log(`  ${colors.green}✓${colors.reset} ${lang}: Up to date`);
      }

      if (outdatedKeys.length > 0) {
        console.log(`  ${colors.yellow}⚠${colors.reset}  ${lang}: ${outdatedKeys.length} outdated keys found`);
      }
    }
    
    console.log('');
  }

  return report;
}

/**
 * Check for missing translations
 */
function checkMissingTranslations() {
  console.log(`${colors.cyan}🔍 Checking for missing translations...${colors.reset}\n`);
  
  const namespaces = getAllNamespaces();
  const missing = [];

  for (const namespace of namespaces) {
    const defaultTranslation = loadTranslation(defaultLang, namespace);
    const defaultKeys = getAllKeys(defaultTranslation);

    for (const lang of supportedLangs) {
      if (lang === defaultLang) continue;

      const translation = loadTranslation(lang, namespace);
      const translationKeys = getAllKeys(translation);

      const missingKeys = defaultKeys.filter(key => {
        if (!translationKeys.includes(key)) return true;
        
        // Check if value starts with [LANG] prefix (not translated)
        const value = getValueByPath(translation, key);
        return typeof value === 'string' && value.startsWith(`[${lang.toUpperCase()}]`);
      });

      if (missingKeys.length > 0) {
        missing.push({
          namespace,
          lang,
          keys: missingKeys,
        });
      }
    }
  }

  if (missing.length === 0) {
    console.log(`${colors.green}✓ All translations are complete!${colors.reset}`);
  } else {
    console.log(`${colors.yellow}Found missing translations:${colors.reset}\n`);
    
    for (const item of missing) {
      console.log(`${colors.magenta}${item.namespace}${colors.reset} (${item.lang}):`);
      item.keys.forEach(key => {
        console.log(`  - ${key}`);
      });
      console.log('');
    }
  }

  return missing;
}

/**
 * Export to CSV for translators
 */
function exportToCSV() {
  console.log(`${colors.cyan}📤 Exporting translations to CSV...${colors.reset}\n`);
  
  const outputDir = path.resolve('./translations-export');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const namespaces = getAllNamespaces();
  const rows = [];

  // Header
  rows.push(['Namespace', 'Key', ...supportedLangs].join(','));

  for (const namespace of namespaces) {
    const translations = {};
    for (const lang of supportedLangs) {
      translations[lang] = loadTranslation(lang, namespace);
    }

    const allKeys = getAllKeys(translations[defaultLang]);

    for (const key of allKeys) {
      const values = supportedLangs.map(lang => {
        const value = getValueByPath(translations[lang], key);
        // Escape commas and quotes in CSV
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return '""';
      });

      rows.push([namespace, key, ...values].join(','));
    }
  }

  const csvPath = path.join(outputDir, 'translations.csv');
  fs.writeFileSync(csvPath, rows.join('\n'), 'utf-8');
  
  console.log(`${colors.green}✓ Exported to: ${csvPath}${colors.reset}`);
}

/**
 * Generate translation report
 */
function generateReport(report) {
  console.log(`\n${colors.cyan}📊 Translation Report${colors.reset}`);
  console.log('='.repeat(50));
  
  console.log(`\n${colors.green}Added keys:${colors.reset} ${report.added}`);
  
  if (report.missing.length > 0) {
    console.log(`\n${colors.yellow}Missing translations (${report.missing.length}):${colors.reset}`);
    const grouped = {};
    report.missing.forEach(item => {
      const key = `${item.namespace} (${item.lang})`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item.key);
    });
    
    Object.entries(grouped).forEach(([key, keys]) => {
      console.log(`  ${key}: ${keys.length} keys`);
    });
  }

  if (report.outdated.length > 0) {
    console.log(`\n${colors.yellow}Outdated keys:${colors.reset}`);
    report.outdated.forEach(item => {
      console.log(`  ${item.namespace} (${item.lang}): ${item.keys.length} keys`);
      item.keys.forEach(key => console.log(`    - ${key}`));
    });
  }
  
  console.log('');
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  
  console.log(`${colors.cyan}╔═══════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║   Translation Synchronization Tool   ║${colors.reset}`);
  console.log(`${colors.cyan}╚═══════════════════════════════════════╝${colors.reset}\n`);

  if (args.includes('--export-csv')) {
    exportToCSV();
  } else if (args.includes('--check-missing')) {
    checkMissingTranslations();
  } else {
    const report = syncTranslations();
    generateReport(report);
  }

  console.log(`${colors.green}✨ Done!${colors.reset}\n`);
}

// Run
try {
  main();
} catch (error) {
  console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
  process.exit(1);
}

