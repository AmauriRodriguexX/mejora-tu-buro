import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appDir = join(scriptDir, '..');
const legacyDir = join(appDir, '..', 'legacy', 'blog', 'articulos');
const articles = [
  ['carta-convenio-de-pago', 'Carta convenio de pago en México: guía completa'],
  ['como-negociar-una-quita-con-el-banco', '¿Cómo negociar una quita con el banco?'],
  ['un-despacho-de-cobranza-me-puede-embargar', '¿Puede un despacho de cobranza embargarte?'],
  ['como-manejar-el-estres-financiero', 'Cómo manejar el estrés financiero'],
  ['como-elegir-una-financiera-segura-en-mexico', '¿Cómo elegir una financiera segura en México?'],
  ['buro-de-credito', '¿Qué es el Buró de Crédito?']
];

function decode(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8211;|&#8212;/g, '—')
    .replace(/&#d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function entryHtml(source) {
  const start = source.lastIndexOf('<div class="entry-content">');
  if (start < 0) return '';
  const matcher = /<\/?div\b[^>]*>/gi;
  matcher.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = matcher.exec(source))) {
    if (match[0].startsWith('</')) depth -= 1;
    else depth += 1;
    if (depth === 0) return source.slice(start, matcher.lastIndex);
  }
  return source.slice(start);
}

function sections(html) {
  const clean = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/gi, '');
  const items = [];
  const matcher = /<(h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = matcher.exec(clean))) {
    const text = decode(match[2]);
    if (text.length < 35 || /compartir|facebook|twitter|pinterest|linkedin|whatsapp/i.test(text)) continue;
    items.push({ type: match[1].toLowerCase(), text });
  }
  const result = [];
  let current = { heading: '', paragraphs: [] };
  for (const item of items) {
    if (item.type === 'h2' || item.type === 'h3') {
      if (current.heading || current.paragraphs.length) result.push(current);
      current = { heading: item.text, paragraphs: [] };
    } else {
      current.paragraphs.push(item.text);
    }
  }
  if (current.heading || current.paragraphs.length) result.push(current);
  return result.filter((section) => section.paragraphs.length || section.heading).slice(0, 18);
}

const output = {};
for (const [slug, title] of articles) {
  const source = await readFile(join(legacyDir, slug, 'index.html'), 'utf8');
  output[slug] = { title, sections: sections(entryHtml(source)) };
}
const generated = `// Generated from legacy/blog article HTML. Do not edit manually.\nexport const legacyArticles = ${JSON.stringify(output, null, 2)};\n`;
await writeFile(join(appDir, 'src', 'lib', 'legacyArticles.js'), generated, 'utf8');
