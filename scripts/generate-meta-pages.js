import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// Config for 4K Film Festival social preview page
const filmFestMeta = {
  title: '4K Film Festival 2026 | PlusNine',
  description: 'A celebration of African and diaspora storytelling through film. November 12, 2026 at The Roxy Theatre, Edmonton. Free admission.',
  url: 'https://www.plusnine.org/film-fest',
  image: 'https://www.plusnine.org/images/og-filmfest.png',
  imageAlt: '4K Film Festival 2026 — PlusNine'
};

function generatePageHtml(base, meta) {
  let html = base;

  // Replace title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${meta.description}" />`
  );

  // Replace OpenGraph tags
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${meta.url}" />`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/i,
    `<meta property="og:image" content="${meta.image}" />`
  );
  html = html.replace(
    /<meta property="og:image:secure_url" content=".*?" \/>/i,
    `<meta property="og:image:secure_url" content="${meta.image}" />`
  );
  html = html.replace(
    /<meta property="og:image:alt" content=".*?" \/>/i,
    `<meta property="og:image:alt" content="${meta.imageAlt}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta name="twitter:url" content=".*?" \/>/i,
    `<meta name="twitter:url" content="${meta.url}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/i,
    `<meta name="twitter:image" content="${meta.image}" />`
  );
  html = html.replace(
    /<meta name="twitter:image:alt" content=".*?" \/>/i,
    `<meta name="twitter:image:alt" content="${meta.imageAlt}" />`
  );

  return html;
}

// 1. Create dist/film-fest/index.html
const filmFestDir = path.join(distDir, 'film-fest');
fs.mkdirSync(filmFestDir, { recursive: true });
const filmFestHtml = generatePageHtml(baseHtml, filmFestMeta);
fs.writeFileSync(path.join(filmFestDir, 'index.html'), filmFestHtml, 'utf-8');

console.log('✓ Successfully generated dist/film-fest/index.html with dedicated Open Graph & Twitter metadata');
