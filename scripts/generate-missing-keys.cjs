#!/usr/bin/env node

/**
 * Script to generate missing translation keys
 * 
 * Usage:
 *   node scripts/generate-missing-keys.js [--dry-run]
 * 
 * This will:
 * 1. Find all translation keys in the source code
 * 2. Check which keys are missing in translation files
 * 3. Add missing keys with placeholder values
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const localesDir = path.join(__dirname, '..', 'src', 'locales');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

/**
 * Extract keys from source files (simplified version)
 */
function extractKeysFromSource() {
  // This is a simplified version. In production, use the full extract-i18n-keys.js logic
  const keys = new Set();
  
  // Recursively scan files
  function scanDir(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && item !== 'node_modules' && item !== 'dist') {
        scanDir(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Extract t('key') patterns
        const matches = content.matchAll(/t\(['"`]([^'"`]+)['"`]\)/g);
        for (const match of matches) {
          keys.add(match[1]);
        }
      }
    }
  }
  
  scanDir(srcDir);
  return Array.from(keys);
}

/**
 * Parse namespace and key from full key
 */
function parseKey(fullKey) {
  const parts = fullKey.split(':');
  if (parts.length === 2) {
    return { namespace: parts[0], key: parts[1] };
  }
  return { namespace: 'common', key: fullKey };
}

/**
 * Set nested value in object
 */
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }
  
  const lastKey = keys[keys.length - 1];
  if (!(lastKey in current)) {
    current[lastKey] = value;
  }
}

/**
 * Get nested value from object
 */
function getNestedValue(obj, path) {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (!(key in current)) {
      return undefined;
    }
    current = current[key];
  }
  
  return current;
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Extracting translation keys from source code...\n');
  
  const allKeys = extractKeysFromSource();
  console.log(`Found ${allKeys.size} unique keys\n`);
  
  const languages = ['uk', 'en'];
  const placeholders = {
    uk: 'ПОТРЕБУЄ ПЕРЕКЛАДУ',
    en: 'NEEDS TRANSLATION',
  };
  
  let totalAdded = 0;
  
  for (const lang of languages) {
    console.log(`\n📝 Processing ${lang.toUpperCase()}...`);
    
    const langDir = path.join(localesDir, lang);
    const namespaces = new Map();
    
    // Group keys by namespace
    for (const fullKey of allKeys) {
      const { namespace, key } = parseKey(fullKey);
      
      if (!namespaces.has(namespace)) {
        namespaces.set(namespace, []);
      }
      namespaces.get(namespace).push(key);
    }
    
    // Process each namespace
    for (const [namespace, keys] of namespaces) {
      const filePath = path.join(langDir, `${namespace}.json`);
      
      let translations = {};
      if (fs.existsSync(filePath)) {
        translations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
      
      let added = 0;
      
      for (const key of keys) {
        if (getNestedValue(translations, key) === undefined) {
          const placeholder = `${placeholders[lang]}: ${key}`;
          setNestedValue(translations, key, placeholder);
          added++;
          console.log(`  + ${namespace}:${key}`);
        }
      }
      
      if (added > 0) {
        if (!dryRun) {
          fs.writeFileSync(
            filePath,
            JSON.stringify(translations, null, 2) + '\n',
            'utf-8'
          );
          console.log(`  ✓ Added ${added} keys to ${namespace}.json`);
        } else {
          console.log(`  [DRY RUN] Would add ${added} keys to ${namespace}.json`);
        }
        totalAdded += added;
      }
    }
  }
  
  console.log(`\n${dryRun ? '[DRY RUN] ' : ''}✨ Done! Added ${totalAdded} missing keys`);
  
  if (dryRun) {
    console.log('\nRun without --dry-run to apply changes');
  }
}

// Run
try {
  main();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

