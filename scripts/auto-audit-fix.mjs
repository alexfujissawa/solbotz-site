#!/usr/bin/env node
/**
 * ============================================================================
 * SOLBOTZ - SISTEMA DE AUDITORIA & AUTO-CORREÇÃO AUTOMÁTICA
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(PROJECT_ROOT, 'src', 'content', 'blog');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const DOMAIN = 'https://www.solbotz.com.br';

console.log(`\n🔍 [AUTO-AUDITORIA SOLBOTZ]: Iniciando varredura e correções automáticas...`);

let totalFixes = 0;

// 1. Auditar e Corrigir Arquivos Markdown do Blog
if (fs.existsSync(BLOG_DIR)) {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  console.log(`📑 Verificando ${files.length} artigos no blog...`);

  files.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Correção 1: Garantir quebra de linha limpa
    content = content.replace(/\r\n/g, '\n');

    // Correção 2: Recalcular tempo de leitura correto
    const bodyWords = content.replace(/---[\s\S]*?---/, '').trim().split(/\s+/).length;
    const correctReadTime = `${Math.max(1, Math.ceil(bodyWords / 200))} min de leitura`;

    if (!content.includes(correctReadTime)) {
      content = content.replace(/readTime:\s*".*?"/, `readTime: "${correctReadTime}"`);
      changed = true;
    }

    // Correção 3: Garantir link interno para diagnóstico correto
    if (content.includes('](#contato)')) {
      content = content.replace(/\]\(#contato\)/g, '](/ #contato)');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  🔧 Corrigido: ${file}`);
      totalFixes++;
    }
  });
}

// 2. Gerar / Atualizar Sitemap.xml Dinamicamente para o Google
console.log(`🗺️  Gerando Sitemap.xml atualizado...`);
const blogSlugs = fs.existsSync(BLOG_DIR)
  ? fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''))
  : [];

const today = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${blogSlugs.map(slug => `  <url>
    <loc>${DOMAIN}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapContent, 'utf8');
console.log(`  ✅ Sitemap gerado com ${blogSlugs.length + 2} URLs indexáveis.`);

console.log(`\n🎉 [AUTO-AUDITORIA CONCLUÍDA]: ${totalFixes} correções aplicadas e sitemap atualizado com sucesso!\n`);
