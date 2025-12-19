#!/usr/bin/env node

/**
 * Find all hardcoded Ukrainian text in components
 * and generate translation keys structure
 */

const fs = require('fs');
const path = require('path');

const CYRILLIC_PATTERN = /['"`]([\p{Script=Cyrillic}\s\d\p{P}]+)['"`]/gu;
const EXCLUDED_PATTERNS = [
  /useTranslation\(/,
  /t\(/,
  /i18n\./,
  /className=/,
  /\.test\./,
  /\.spec\./,
];

function shouldExcludeFile(filePath) {
  return (
    filePath.includes('node_modules') ||
    filePath.includes('.test.') ||
    filePath.includes('.spec.') ||
    filePath.includes('__tests__') ||
    filePath.includes('data/') // Skip data files for now
  );
}

function findUkrainianText(filePath) {
  if (shouldExcludeFile(filePath)) return [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = [];

    // Skip if file already uses translation hooks extensively
    const translationCount = (content.match(/\bt\(/g) || []).length;
    const fileLines = content.split('\n').length;
    if (translationCount > fileLines / 3) {
      // File is mostly translated
      return [];
    }

    let match;
    const regex = new RegExp(CYRILLIC_PATTERN);
    
    while ((match = regex.exec(content)) !== null) {
      const text = match[1].trim();
      
      // Skip very short strings and numbers
      if (text.length < 3 || /^\d+$/.test(text)) continue;
      
      // Get line number
      const lineNumber = content.substring(0, match.index).split('\n').length;
      const line = content.split('\n')[lineNumber - 1];
      
      // Skip if line is excluded pattern
      if (EXCLUDED_PATTERNS.some(pattern => pattern.test(line))) continue;
      
      matches.push({
        text,
        line: lineNumber,
        context: line.trim().substring(0, 100)
      });
    }

    return matches;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dir, results = {}) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
        scanDirectory(fullPath, results);
      }
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const matches = findUkrainianText(fullPath);
      if (matches.length > 0) {
        results[fullPath] = matches;
      }
    }
  }

  return results;
}

function generateReport(results) {
  const sortedFiles = Object.entries(results)
    .sort((a, b) => b[1].length - a[1].length);

  console.log('\n📊 UNTRANSLATED TEXT REPORT\n');
  console.log('='  .repeat(80));
  console.log(`Total files with untranslated text: ${sortedFiles.length}\n`);

  let totalStrings = 0;
  
  sortedFiles.slice(0, 20).forEach(([filePath, matches]) => {
    const relativePath = path.relative(process.cwd(), filePath);
    totalStrings += matches.length;
    
    console.log(`\n📄 ${relativePath} (${matches.length} strings)`);
    console.log('-'.repeat(80));
    
    matches.slice(0, 5).forEach(({ text, line }) => {
      console.log(`  Line ${line}: "${text.substring(0, 60)}${text.length > 60 ? '...' : ''}"`);
    });
    
    if (matches.length > 5) {
      console.log(`  ... and ${matches.length - 5} more`);
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log(`\n📈 SUMMARY:`);
  console.log(`   Total untranslated strings: ${totalStrings}`);
  console.log(`   Files needing translation: ${sortedFiles.length}`);
  
  if (sortedFiles.length > 20) {
    console.log(`   (Showing top 20 files, ${sortedFiles.length - 20} more...)`);
  }

  console.log('\n💡 TIP: Focus on these high-priority files first:');
  sortedFiles.slice(0, 5).forEach(([filePath, matches]) => {
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`   - ${relativePath} (${matches.length} strings)`);
  });

  return { sortedFiles, totalStrings };
}

// Main execution
if (require.main === module) {
  const srcDir = path.join(process.cwd(), 'src');
  
  console.log('🔍 Scanning for untranslated Ukrainian text...\n');
  
  const results = scanDirectory(srcDir);
  const { sortedFiles } = generateReport(results);

  // Save detailed results to JSON
  const outputPath = path.join(process.cwd(), 'untranslated-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(sortedFiles, null, 2));
  
  console.log(`\n✅ Detailed report saved to: ${outputPath}\n`);
}

module.exports = { findUkrainianText, scanDirectory };

