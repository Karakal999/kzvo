#!/usr/bin/env node

/**
 * Generate sitemap files for multilingual website
 * 
 * Creates:
 * - public/sitemap.xml (main sitemap index)
 * - public/sitemap-uk.xml (Ukrainian pages)
 * - public/sitemap-en.xml (English pages)
 * 
 * Usage:
 *   node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const baseUrl = 'https://academy.ua';
const languages = ['uk', 'en'];
const publicDir = path.join(__dirname, '..', 'public');

// Static pages (without language prefix)
const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/about', priority: 0.8, changefreq: 'weekly' },
  { path: '/activity', priority: 0.8, changefreq: 'weekly' },
  { path: '/education', priority: 0.9, changefreq: 'weekly' },
  { path: '/teachers', priority: 0.8, changefreq: 'weekly' },
  { path: '/students', priority: 0.8, changefreq: 'weekly' },
  { path: '/resources', priority: 0.7, changefreq: 'weekly' },
  { path: '/news', priority: 0.9, changefreq: 'daily' },
  { path: '/contacts', priority: 0.7, changefreq: 'monthly' },
  { path: '/events', priority: 0.8, changefreq: 'weekly' },
  { path: '/competitions', priority: 0.8, changefreq: 'weekly' },
  { path: '/programs', priority: 0.9, changefreq: 'weekly' },
];

// Dynamic pages (would come from API/Database in production)
const dynamicPages = {
  news: [
    { 
      slugs: { uk: 'nova-osvitnya-programa', en: 'new-educational-program' },
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2025-01-15'
    },
    {
      slugs: { uk: 'mizhnarodna-konferenciya', en: 'international-conference' },
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2025-02-10'
    },
  ],
  // Add more dynamic content types here
};

/**
 * Generate URL entry for sitemap
 */
function generateUrl(loc, lastmod, changefreq, priority, alternates = []) {
  let xml = '  <url>\n';
  xml += `    <loc>${loc}</loc>\n`;
  if (lastmod) {
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
  }
  if (changefreq) {
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
  }
  if (priority) {
    xml += `    <priority>${priority}</priority>\n`;
  }
  
  // Add xhtml:link for alternate languages
  alternates.forEach(alt => {
    xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.url}"/>\n`;
  });
  
  xml += '  </url>\n';
  return xml;
}

/**
 * Generate sitemap for specific language
 */
function generateLanguageSitemap(lang) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  const today = new Date().toISOString().split('T')[0];

  // Add static pages
  staticPages.forEach(page => {
    const url = `${baseUrl}/${lang}${page.path}`;
    
    // Generate alternates
    const alternates = languages.map(l => ({
      lang: l,
      url: `${baseUrl}/${l}${page.path}`,
    }));
    
    // Add x-default
    alternates.push({
      lang: 'x-default',
      url: `${baseUrl}/uk${page.path}`,
    });

    xml += generateUrl(
      url,
      today,
      page.changefreq,
      page.priority,
      alternates
    );
  });

  // Add dynamic pages
  Object.entries(dynamicPages).forEach(([type, pages]) => {
    pages.forEach(page => {
      const slug = page.slugs[lang];
      const url = `${baseUrl}/${lang}/${type}/${slug}`;
      
      // Generate alternates with different slugs
      const alternates = languages.map(l => ({
        lang: l,
        url: `${baseUrl}/${l}/${type}/${page.slugs[l]}`,
      }));
      
      alternates.push({
        lang: 'x-default',
        url: `${baseUrl}/uk/${type}/${page.slugs.uk}`,
      });

      xml += generateUrl(
        url,
        page.lastmod || today,
        page.changefreq,
        page.priority,
        alternates
      );
    });
  });

  xml += '</urlset>';
  return xml;
}

/**
 * Generate main sitemap index
 */
function generateSitemapIndex() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const today = new Date().toISOString().split('T')[0];

  languages.forEach(lang => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${baseUrl}/sitemap-${lang}.xml</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });

  xml += '</sitemapindex>';
  return xml;
}

/**
 * Main function
 */
function main() {
  console.log('🗺️  Generating sitemaps...\n');

  // Create public directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate language-specific sitemaps
  languages.forEach(lang => {
    const sitemap = generateLanguageSitemap(lang);
    const filename = `sitemap-${lang}.xml`;
    const filepath = path.join(publicDir, filename);
    
    fs.writeFileSync(filepath, sitemap, 'utf-8');
    console.log(`✓ Generated ${filename}`);
  });

  // Generate main sitemap index
  const sitemapIndex = generateSitemapIndex();
  const indexPath = path.join(publicDir, 'sitemap.xml');
  
  fs.writeFileSync(indexPath, sitemapIndex, 'utf-8');
  console.log('✓ Generated sitemap.xml (index)\n');

  console.log('📊 Summary:');
  console.log(`   Static pages: ${staticPages.length} × ${languages.length} languages`);
  console.log(`   Dynamic pages: ${Object.values(dynamicPages).flat().length} × ${languages.length} languages`);
  console.log(`   Total URLs: ${(staticPages.length + Object.values(dynamicPages).flat().length) * languages.length}`);
  console.log(`\n✨ Done! Sitemaps saved to ${publicDir}`);
}

// Run
try {
  main();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

