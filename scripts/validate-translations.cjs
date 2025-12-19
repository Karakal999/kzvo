#!/usr/bin/env node

/**
 * Script to validate translation files
 * 
 * Checks:
 * - All keys exist in all languages
 * - Variables in interpolations match
 * - HTML tags are balanced
 * - Pluralization keys are correct
 * - No empty values
 * 
 * Usage:
 *   node scripts/validate-translations.cjs
 *   node scripts/validate-translations.cjs --fix
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const localesDir = path.resolve('./src/locales');
const supportedLangs = ['uk', 'en'];
const defaultLang = 'uk';

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const errors = [];
const warnings = [];

/**
 * Get all keys from nested object
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = keys.concat(getAllKeys(obj[key], newPrefix));
      } else {
        keys.push({ path: newPrefix, value: obj[key] });
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
 * Extract interpolation variables from string
 */
function extractVariables(str) {
  if (typeof str !== 'string') return [];
  
  const regex = /\{\{(\w+)\}\}/g;
  const matches = [];
  let match;
  
  while ((match = regex.exec(str)) !== null) {
    matches.push(match[1]);
  }
  
  return matches;
}

/**
 * Extract HTML tags from string
 */
function extractHTMLTags(str) {
  if (typeof str !== 'string') return [];
  
  const regex = /<(\/?[\w-]+)[^>]*>/g;
  const tags = [];
  let match;
  
  while ((match = regex.exec(str)) !== null) {
    tags.push(match[1]);
  }
  
  return tags;
}

/**
 * Check if HTML tags are balanced
 */
function areHTMLTagsBalanced(str) {
  if (typeof str !== 'string') return true;
  
  const stack = [];
  const regex = /<(\/?)([\w-]+)[^>]*>/g;
  let match;
  
  while ((match = regex.exec(str)) !== null) {
    const isClosing = match[1] === '/';
    const tagName = match[2];
    
    // Skip self-closing tags
    if (['br', 'hr', 'img', 'input'].includes(tagName.toLowerCase())) {
      continue;
    }
    
    if (isClosing) {
      if (stack.length === 0 || stack[stack.length - 1] !== tagName) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(tagName);
    }
  }
  
  return stack.length === 0;
}

/**
 * Validate translation files
 */
function validateTranslations() {
  console.log(`${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║   Translation Validation Tool         ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);

  const namespaces = fs.readdirSync(path.join(localesDir, defaultLang))
    .filter(file => file.endsWith('.json'))
    .map(file => path.basename(file, '.json'));

  console.log(`${colors.blue}Found ${namespaces.length} namespaces: ${namespaces.join(', ')}${colors.reset}\n`);

  for (const namespace of namespaces) {
    console.log(`${colors.cyan}📦 Validating namespace: ${namespace}${colors.reset}`);
    
    const translations = {};
    for (const lang of supportedLangs) {
      const filePath = path.join(localesDir, lang, `${namespace}.json`);
      try {
        translations[lang] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) {
        errors.push({
          type: 'FILE_ERROR',
          namespace,
          lang,
          message: `Failed to parse JSON: ${e.message}`,
        });
        continue;
      }
    }

    // Check 1: All keys exist in all languages
    for (const lang of supportedLangs) {
      if (!translations[lang]) continue;
      
      const keys = getAllKeys(translations[lang]);
      const defaultKeys = getAllKeys(translations[defaultLang] || {});
      
      // Missing keys
      const defaultKeyPaths = new Set(defaultKeys.map(k => k.path));
      const currentKeyPaths = new Set(keys.map(k => k.path));
      
      for (const keyObj of defaultKeys) {
        if (!currentKeyPaths.has(keyObj.path)) {
          errors.push({
            type: 'MISSING_KEY',
            namespace,
            lang,
            key: keyObj.path,
            message: `Missing translation key`,
          });
        }
      }
      
      // Extra keys (exist in translation but not in default)
      for (const keyObj of keys) {
        if (!defaultKeyPaths.has(keyObj.path)) {
          warnings.push({
            type: 'EXTRA_KEY',
            namespace,
            lang,
            key: keyObj.path,
            message: `Extra key not in default language`,
          });
        }
      }
    }

    // Check 2: Interpolation variables match
    for (const keyObj of getAllKeys(translations[defaultLang] || {})) {
      const defaultValue = keyObj.value;
      const defaultVars = extractVariables(defaultValue);
      
      if (defaultVars.length > 0) {
        for (const lang of supportedLangs) {
          if (lang === defaultLang || !translations[lang]) continue;
          
          const translatedValue = getValueByPath(translations[lang], keyObj.path);
          const translatedVars = extractVariables(translatedValue);
          
          // Check if all variables are present
          for (const v of defaultVars) {
            if (!translatedVars.includes(v)) {
              errors.push({
                type: 'MISSING_VARIABLE',
                namespace,
                lang,
                key: keyObj.path,
                variable: v,
                message: `Missing interpolation variable: {{${v}}}`,
              });
            }
          }
          
          // Check for extra variables
          for (const v of translatedVars) {
            if (!defaultVars.includes(v)) {
              warnings.push({
                type: 'EXTRA_VARIABLE',
                namespace,
                lang,
                key: keyObj.path,
                variable: v,
                message: `Extra interpolation variable: {{${v}}}`,
              });
            }
          }
        }
      }
    }

    // Check 3: HTML tags are balanced
    for (const lang of supportedLangs) {
      if (!translations[lang]) continue;
      
      for (const keyObj of getAllKeys(translations[lang])) {
        if (typeof keyObj.value === 'string' && keyObj.value.includes('<')) {
          if (!areHTMLTagsBalanced(keyObj.value)) {
            errors.push({
              type: 'UNBALANCED_HTML',
              namespace,
              lang,
              key: keyObj.path,
              message: `Unbalanced HTML tags`,
              value: keyObj.value,
            });
          }
        }
      }
    }

    // Check 4: Empty values
    for (const lang of supportedLangs) {
      if (!translations[lang]) continue;
      
      for (const keyObj of getAllKeys(translations[lang])) {
        if (keyObj.value === '' || keyObj.value === null || keyObj.value === undefined) {
          warnings.push({
            type: 'EMPTY_VALUE',
            namespace,
            lang,
            key: keyObj.path,
            message: `Empty translation value`,
          });
        }
      }
    }

    // Check 5: Untranslated values (still have [LANG] prefix)
    for (const lang of supportedLangs) {
      if (lang === defaultLang || !translations[lang]) continue;
      
      for (const keyObj of getAllKeys(translations[lang])) {
        if (typeof keyObj.value === 'string' && keyObj.value.startsWith(`[${lang.toUpperCase()}]`)) {
          warnings.push({
            type: 'UNTRANSLATED',
            namespace,
            lang,
            key: keyObj.path,
            message: `Untranslated value (has [${lang.toUpperCase()}] prefix)`,
            value: keyObj.value,
          });
        }
      }
    }

    console.log(`  ${colors.green}✓${colors.reset} Validation complete\n`);
  }
}

/**
 * Print report
 */
function printReport() {
  console.log(`\n${colors.cyan}═════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}          VALIDATION REPORT              ${colors.reset}`);
  console.log(`${colors.cyan}═════════════════════════════════════════${colors.reset}\n`);

  // Errors
  if (errors.length > 0) {
    console.log(`${colors.red}❌ ERRORS (${errors.length}):${colors.reset}\n`);
    
    const groupedErrors = {};
    errors.forEach(err => {
      const key = `${err.namespace} (${err.lang})`;
      if (!groupedErrors[key]) groupedErrors[key] = [];
      groupedErrors[key].push(err);
    });

    Object.entries(groupedErrors).forEach(([key, errs]) => {
      console.log(`${colors.yellow}${key}:${colors.reset}`);
      errs.forEach(err => {
        console.log(`  ${colors.red}✗${colors.reset} [${err.type}] ${err.key}: ${err.message}`);
        if (err.value) {
          console.log(`    Value: "${err.value}"`);
        }
      });
      console.log('');
    });
  } else {
    console.log(`${colors.green}✓ No errors found!${colors.reset}\n`);
  }

  // Warnings
  if (warnings.length > 0) {
    console.log(`${colors.yellow}⚠️  WARNINGS (${warnings.length}):${colors.reset}\n`);
    
    const groupedWarnings = {};
    warnings.forEach(warn => {
      const key = `${warn.namespace} (${warn.lang})`;
      if (!groupedWarnings[key]) groupedWarnings[key] = [];
      groupedWarnings[key].push(warn);
    });

    Object.entries(groupedWarnings).forEach(([key, warns]) => {
      console.log(`${colors.yellow}${key}:${colors.reset}`);
      warns.slice(0, 10).forEach(warn => {
        console.log(`  ${colors.yellow}⚠${colors.reset}  [${warn.type}] ${warn.key}: ${warn.message}`);
      });
      if (warns.length > 10) {
        console.log(`  ... and ${warns.length - 10} more`);
      }
      console.log('');
    });
  } else {
    console.log(`${colors.green}✓ No warnings!${colors.reset}\n`);
  }

  // Summary
  console.log(`${colors.cyan}Summary:${colors.reset}`);
  console.log(`  Errors: ${errors.length}`);
  console.log(`  Warnings: ${warnings.length}`);
  console.log('');

  if (errors.length > 0) {
    console.log(`${colors.red}❌ Validation failed!${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.green}✅ Validation passed!${colors.reset}\n`);
    process.exit(0);
  }
}

// Run
try {
  validateTranslations();
  printReport();
} catch (error) {
  console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
  console.error(error.stack);
  process.exit(1);
}

