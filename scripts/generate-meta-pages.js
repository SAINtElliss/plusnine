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

function generatePageHtml(base, meta) {
  let html = base;

  // Replace title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace meta description
  if (meta.description) {
    html = html.replace(
      /<meta name="description" content=".*?" \/>/i,
      `<meta name="description" content="${meta.description}" />`
    );
  }

  // Replace OpenGraph tags
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${meta.title}" />`
  );
  if (meta.description) {
    html = html.replace(
      /<meta property="og:description" content=".*?" \/>/i,
      `<meta property="og:description" content="${meta.description}" />`
    );
  }
  if (meta.url) {
    html = html.replace(
      /<meta property="og:url" content=".*?" \/>/i,
      `<meta property="og:url" content="${meta.url}" />`
    );
  }
  if (meta.image) {
    html = html.replace(
      /<meta property="og:image" content=".*?" \/>/i,
      `<meta property="og:image" content="${meta.image}" />`
    );
    html = html.replace(
      /<meta property="og:image:secure_url" content=".*?" \/>/i,
      `<meta property="og:image:secure_url" content="${meta.image}" />`
    );
  }

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${meta.title}" />`
  );
  if (meta.description) {
    html = html.replace(
      /<meta name="twitter:description" content=".*?" \/>/i,
      `<meta name="twitter:description" content="${meta.description}" />`
    );
  }
  if (meta.url) {
    html = html.replace(
      /<meta name="twitter:url" content=".*?" \/>/i,
      `<meta name="twitter:url" content="${meta.url}" />`
    );
  }
  if (meta.image) {
    html = html.replace(
      /<meta name="twitter:image" content=".*?" \/>/i,
      `<meta name="twitter:image" content="${meta.image}" />`
    );
  }

  return html;
}

function writePage(subPath, meta) {
  const targetDir = path.join(distDir, subPath);
  fs.mkdirSync(targetDir, { recursive: true });
  const html = generatePageHtml(baseHtml, meta);
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
}

// 1. 4K Film Festival
writePage('film-fest', {
  title: '4K Film Festival 2026 | PlusNine',
  description: 'A celebration of African and diaspora storytelling through film. November 12, 2026 at The Roxy Theatre, Edmonton. Free admission.',
  url: 'https://www.plusnine.org/film-fest',
  image: 'https://www.plusnine.org/images/og-filmfest.png'
});

// 2. Main Top-Level Pages
const topPages = [
  { path: 'work', title: 'Work Archive | PlusNine', desc: 'Asymmetrical numbered archive of films, campaigns, editorials, and visual culture projects.' },
  { path: 'events', title: 'Events & Gatherings | PlusNine', desc: 'Screenings, parties, pop-ups, showcases, and creative community cultural gatherings.' },
  { path: 'people', title: 'People & Collaborators | PlusNine', desc: 'Meet the multidisciplinary creators, directors, sound engineers, and producers behind PlusNine.' },
  { path: 'about', title: 'About PlusNine | Studio Manifesto', desc: 'Independent creative development studio, film production collective, and cultural magazine platform based in Edmonton.' },
  { path: 'as-we-are', title: 'AS WE ARE — Editorial Publication | PlusNine', desc: 'Collaborative publication release with Vernacular Magazine exploring Black cadence and ordinary life across Canada.' }
];

for (const p of topPages) {
  writePage(p.path, {
    title: p.title,
    description: p.desc,
    url: `https://www.plusnine.org/${p.path}`,
    image: 'https://www.plusnine.org/images/og-homepage.png'
  });
}

// 3. Member Profiles
const members = [
  { id: 'alfred', name: 'Alfred' },
  { id: 'denzel', name: 'Denzel' },
  { id: 'ellis', name: 'Ellis' },
  { id: 'ezinne', name: 'Ezinne' },
  { id: 'lucy', name: 'Lucy' },
  { id: 'nani', name: 'Nani' },
  { id: 'nicole', name: 'Nicole' },
  { id: 'oliseh', name: 'Oliseh' },
  { id: 'regina', name: 'Regina' },
  { id: 'sekani', name: 'Sekani' },
  { id: 'toluwani', name: 'Toluwani' }
];

for (const m of members) {
  writePage(`people/${m.id}`, {
    title: `${m.name} | PlusNine`,
    description: `${m.name} — multidisciplinary creator and member of the PlusNine collective.`,
    url: `https://www.plusnine.org/people/${m.id}`,
    image: 'https://www.plusnine.org/images/og-homepage.png'
  });
}

console.log('✓ Successfully pre-rendered static route pages for Vercel edge delivery (0 404s)');
