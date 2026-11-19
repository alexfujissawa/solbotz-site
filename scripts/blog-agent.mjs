#!/usr/bin/env node
/**
 * ============================================================================
 * SOLBOTZ - AGENTE AUTÔNOMO DE CONTEÚDO E PUBLICAÇÃO NO BLOG
 * Fluxo "Faz Tudo" para geração e publicação automática de artigos no Astro
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(PROJECT_ROOT, 'src', 'content', 'blog');

// Carregar variáveis de ambiente do .env se existir
function loadEnv() {
  const envPaths = [
    path.join(PROJECT_ROOT, '.env'),
    path.join(PROJECT_ROOT, '..', '.env'),
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath) && fs.statSync(envPath).isFile()) {
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx !== -1) {
              const key = trimmed.slice(0, eqIdx).trim();
              const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
              if (!process.env[key]) {
                process.env[key] = val;
              }
            }
          }
        }
      } catch (e) {
        // Ignora erros de leitura de .env
      }
    }
  }
}

loadEnv();

// Banco de Pautas Inteligentes Alinhadas à Persona SolBotz
const PAUTAS_REPOSITORIO = [
  {
    topic: 'Como Integrar WhatsApp e CRM com IA para Responder Clientes em Menos de 30 Segundos',
    category: 'Automação & IA',
    tags: ['WhatsApp', 'CRM', 'Atendimento', 'Agentes IA', 'Conversão'],
    slug: 'como-integrar-whatsapp-crm-ia-resposta-rapida',
  },
  {
    topic: 'Automação Financeira: Como Conciliar Pix, Boletos e Notas Fiscais Sem Erros Humanos',
    category: 'Eficiência Operacional',
    tags: ['Financeiro', 'Conciliação', 'Contabilidade', 'Produtividade'],
    slug: 'automacao-financeira-conciliacao-pix-boletos-notas',
  },
  {
    topic: 'IA no Atendimento ao Cliente: Como Resolver 70% dos Chamados Mantendo o Toque Humano',
    category: 'Automação & IA',
    tags: ['Atendimento', 'Suporte', 'Satisfação', 'Chatbots', 'Helpdesk'],
    slug: 'ia-atendimento-resolver-chamados-toque-humano',
  },
  {
    topic: 'Auditoria de Processos: 5 Passos Para Identificar Onde Sua Empresa Está Perdendo Dinheiro',
    category: 'Eficiência Operacional',
    tags: ['Auditoria', 'Processos', 'Gestão', 'Redução de Custos'],
    slug: 'auditoria-processos-5-passos-identificar-desperdicio',
  },
  {
    topic: 'Contratar ou Automatizar? O Guia Executivo de ROI para Decisões Operacionais em 2026',
    category: 'Cases & Estratégia',
    tags: ['ROI', 'Estratégia', 'Folha de Pagamento', 'Gestão Financeira'],
    slug: 'contratar-ou-automatizar-guia-executivo-roi',
  },
  {
    topic: 'Dashboards em Tempo Real: Como Eliminar Planilhas Perdidas e Tomar Decisões com Dados Reais',
    category: 'Eficiência Operacional',
    tags: ['Dashboards', 'Supabase', 'Dados', 'BI', 'Métricas'],
    slug: 'dashboards-tempo-real-eliminar-planilhas-decisao-dados',
  },
  {
    topic: 'n8n Auto-Hospedado vs Zapier/Make: Como Reduzir em 90% a Fatura de Integrações',
    category: 'Cases & Estratégia',
    tags: ['n8n', 'Zapier', 'Make', 'Infraestrutura', 'Redução de Custos'],
    slug: 'n8n-vs-zapier-make-reduzir-custo-integracao',
  },
];

// Utilitário para gerar Slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Calcular tempo de leitura estimado
function calculateReadTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min de leitura`;
}

// Verifica posts já existentes
function getExistingSlugs() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    return [];
  }
  return fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => file.replace(/\.(md|mdx)$/, ''));
}

// Chamada à API Gemini se disponível
async function generateWithGemini(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 3000,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro Gemini API (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Resposta vazia da API Gemini');
  return text;
}

// Chamada à API OpenAI se disponível
async function generateWithOpenAI(prompt, apiKey) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Você é o especialista chefe de conteúdo da SolBotz, consultoria de eficiência operacional e automação com IA.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro OpenAI API (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content;
}

function getTodayJST() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' }).format(new Date());
}

// Fallback de alta qualidade caso não haja chave de API conectada
function generateStructuredFallback(topic, category = 'Automação & IA', tags = ['Automação', 'Eficiência Operacional', 'IA']) {
  const today = getTodayJST();
  const readTime = '6 min de leitura';

  return `---
title: "${topic}"
description: "Descubra como otimizar este pilar estratégico na sua empresa com técnicas avançadas de automação inteligente e eliminação de gargalos operacionais."
pubDate: ${today}
author: "Alex Ferreira | SolBotz"
category: "${category}"
tags: ${JSON.stringify(tags)}
coverImage: "/solbotz.jpeg"
readTime: "${readTime}"
featured: false
---

Em um mercado cada vez mais competitivo, a eficiência operacional deixou de ser um diferencial para se tornar o principal fator de sobrevivência e lucratividade de qualquer empresa.

Quando analisamos de perto a rotina de médias e pequenas operações, um padrão se repete: **profissionais qualificados passam horas preciosas executando tarefas puramente manuais, repetitivas e burocráticas**.

Esse desperdício invisível compromete a margem de lucro, atrasa o atendimento ao cliente e impede a liderança de focar em inovação e vendas.

---

## O Diagnóstico: Onde Reside o Gargalo?

Muitas empresas tentam solucionar problemas de velocidade contratando mais pessoas ou comprando mais licenças de softwares isolados. No entanto, o problema central quase sempre reside em três pontos críticos:

1. **Silos de Dados Desconectados:** O CRM não conversa com o ERP, que por sua vez não sincroniza com os canais de atendimento (WhatsApp e e-mail).
2. **Dependência de Ações Manuais:** A informação precisa ser copiada e colada de um lugar para o outro, gerando atrasos e erros de digitação.
3. **Falta de Padronização com Alçadas:** Sem regras claras e automações com inteligência, tarefas corriqueiras exigem a atenção direta da diretoria.

---

## Como a Solução é Implementada na Prática

Para transformar esse cenário e destravar a escala, a metodologia recomendada pela SolBotz divide-se em etapas claras:

### 1. Mapeamento de Fricção e Priorização
Nem todo processo deve ser automatizado de imediato. Começamos sempre pelos fluxos que apresentam **alto volume diário** e **regras bem definidas**. Exemplos: triagem de contatos recebidos, emissão e conferência de cobranças e disparo de alertas operacionais.

### 2. Conectividade Segura via APIs e Webhooks
Substituímos integrações frágeis por pipelines robustos em orquestradores modernos (como n8n e Supabase). Dessa forma, eventos ocorridos em uma ponta geram ações imediatas e auditáveis em toda a empresa.

### 3. Camada de Inteligência Artificial e Agentes
Nos pontos onde há necessidade de interpretação de texto, triagem de urgência ou geração de respostas personalizadas, plugamos modelos de linguagem calibrados para agir com precisão cirúrgica.

\`\`\`
ENTRADA (Demanda/Lead/Evento) 
    ──> [TRIAGEM AUTOMATIZADA COM IA] 
    ──> [EXECUÇÃO DE FERRAMENTAS / BANCO DE DADOS] 
    ──> [RESOLUÇÃO RÁPIDA OU ESCALONAMENTO HUMANO]
\`\`\`

---

## Benefícios Imediatos no Negócio

- **Tempo de Resposta Reduzido:** De horas ou dias para poucos segundos.
- **Proteção da Margem Operacional:** Crescimento da receita sem a necessidade de inchar a folha de pagamento de forma desproporcional.
- **Previsibilidade e Governança:** Relatórios em tempo real sem a dependência de consolidação manual de planilhas.

---

> **Quer aplicar essa transformação na sua operação?**  
> Agende uma sessão de diagnóstico operacional com a [SolBotz](/) e descubra exatamente onde sua empresa pode economizar tempo e alavancar resultados com tecnologia de ponta.
`;
}

// Cria o prompt para LLM gerar o artigo completo
function buildPrompt(topic, category, tags) {
  const today = getTodayJST();

  return `Você é o estrategista chefe de automação e engenharia operacional da SolBotz (consultoria de alta performance que elimina gargalos, acelera o tempo de resposta e protege a margem de empresas médias usando IA e automação inteligente).

Sua missão é escrever um artigo COMPLETO, profundo e persuasivo para o blog da SolBotz sobre o tema:
"${topic}"

REQUISITOS OBRIGATÓRIOS:
1. Retorne EXATAMENTE o documento em Markdown iniciando com o Frontmatter YAML entre --- e terminando com ---.
2. Formato do Frontmatter:
---
title: "Título magnético com foco executivo e sem enrolação"
description: "Descrição atraente de 1 a 2 frases para SEO e metatags (máx 160 caracteres)"
pubDate: ${today}
author: "Alex Ferreira | SolBotz"
category: "${category || 'Automação & IA'}"
tags: ${JSON.stringify(tags || ['Automação', 'Eficiência Operacional', 'IA'])}
coverImage: "/solbotz.jpeg"
readTime: "X min de leitura"
featured: false
---

3. Estrutura do artigo:
- Introdução forte contextualizando a dor real das empresas (perda de margem, processos manuais, sobrecarga de equipe).
- Seções H2 e H3 bem distribuídas com conteúdo denso, prático e acionável.
- Pelo menos um bloco comparativo em tabela Markdown OU um diagrama em texto/ASCII demonstrando o fluxo inteligente.
- 3 a 4 diretrizes práticas que o leitor pode começar a aplicar.
- Conclusão com gancho natural para o Diagnóstico Operacional da SolBotz (link para /#contato).
4. Tom de voz: Profissional, direto, confiante, moderno, sem jargões fúteis, com mentalidade "Apple-like" de clareza e alta sofisticação técnica.
5. NÃO inclua nenhum texto antes do '---' nem depois do final do artigo. Apenas o Markdown cru.`;
}

// Função principal de geração
async function generateArticle({ topic, category = 'Automação & IA', tags = ['Automação', 'IA'], slug = null }) {
  console.log(`\n🤖 [SolBotz Blog Agent] Iniciando fluxo de produção...`);
  console.log(`📌 Tema: "${topic}"`);
  console.log(`🏷️  Categoria: ${category}`);

  const targetSlug = slug || slugify(topic);
  const targetFile = path.join(BLOG_DIR, `${targetSlug}.md`);

  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  let content = '';

  if (geminiKey) {
    console.log(`✨ Conectado à API do Google Gemini (Modo LLM Ativo)...`);
    try {
      const rawPrompt = buildPrompt(topic, category, tags);
      content = await generateWithGemini(rawPrompt, geminiKey);
      // Limpa tags de código ```markdown se a IA colocar
      content = content.replace(/^```markdown\n?/i, '').replace(/\n?```$/i, '').trim();
    } catch (err) {
      console.warn(`⚠️  Falha na API Gemini: ${err.message}. Ativando gerador estruturado de fallback...`);
      content = generateStructuredFallback(topic, category, tags);
    }
  } else if (openaiKey) {
    console.log(`✨ Conectado à API da OpenAI (Modo LLM Ativo)...`);
    try {
      const rawPrompt = buildPrompt(topic, category, tags);
      content = await generateWithOpenAI(rawPrompt, openaiKey);
      content = content.replace(/^```markdown\n?/i, '').replace(/\n?```$/i, '').trim();
    } catch (err) {
      console.warn(`⚠️  Falha na API OpenAI: ${err.message}. Ativando gerador estruturado de fallback...`);
      content = generateStructuredFallback(topic, category, tags);
    }
  } else {
    console.log(`ℹ️  Nenhuma chave GEMINI_API_KEY ou OPENAI_API_KEY detectada no .env.`);
    console.log(`⚡ Ativando Motor Heurístico Estruturado da SolBotz (Zero dependência externa)...`);
    content = generateStructuredFallback(topic, category, tags);
  }

  // Garantir diretório
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  // Gravar post
  fs.writeFileSync(targetFile, content.trim() + '\n', 'utf8');

  console.log(`\n✅ [Artigo Publicado com Sucesso!]`);
  console.log(`📁 Arquivo: ${path.relative(PROJECT_ROOT, targetFile)}`);
  console.log(`🌐 Rota no Astro: /blog/${targetSlug}`);
  console.log(`⚡ Para visualizar: execute 'npm run dev' ou 'npm run build'`);

  return { targetSlug, targetFile };
}

// Fluxo "Faz Tudo" Totalmente Autônomo
async function runAutoFlow() {
  console.log(`\n========================================================`);
  console.log(`🚀 SOLBOTZ BLOG AGENT: FLUXO "FAZ TUDO" AUTÔNOMO`);
  console.log(`========================================================`);

  const existing = getExistingSlugs();
  const available = PAUTAS_REPOSITORIO.filter(p => !existing.includes(p.slug));

  let chosen;
  if (available.length > 0) {
    chosen = available[0];
  } else {
    // Se todos do repositório já existem, cria uma variação dinâmica
    const timestamp = Date.now().toString().slice(-4);
    chosen = {
      topic: `Estratégias Avançadas de Otimização e Inteligência de Processos #${timestamp}`,
      category: 'Eficiência Operacional',
      tags: ['Otimização', 'IA', 'Escala', 'Produtividade'],
      slug: `estrategias-avancadas-otimizacao-processos-${timestamp}`,
    };
  }

  await generateArticle(chosen);
}

// Menu Interativo
function promptUser(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

async function runInteractiveFlow() {
  console.log(`\n========================================================`);
  console.log(`🤖 AGENTE DE BLOG SOLBOTZ - PAINEL INTERATIVO`);
  console.log(`========================================================`);
  console.log(`1. Fluxo "Faz Tudo" (Seleciona pauta ideal e publica automaticamente)`);
  console.log(`2. Criar artigo a partir de um tema digitado`);
  console.log(`3. Listar pautas recomendadas da SolBotz`);
  console.log(`4. Sair\n`);

  const choice = await promptUser('Escolha uma opção (1-4): ');

  if (choice.trim() === '1') {
    await runAutoFlow();
  } else if (choice.trim() === '2') {
    const topic = await promptUser('Digite o tema ou título desejado: ');
    if (topic && topic.trim()) {
      const category = await promptUser('Categoria [Automação & IA]: ') || 'Automação & IA';
      await generateArticle({ topic: topic.trim(), category });
    } else {
      console.log('Tema inválido. Operação cancelada.');
    }
  } else if (choice.trim() === '3') {
    const existing = getExistingSlugs();
    console.log(`\n📋 Pautas Estratégicas no Repositório SolBotz:`);
    PAUTAS_REPOSITORIO.forEach((p, idx) => {
      const status = existing.includes(p.slug) ? '✅ [Já Publicado]' : '⭐ [Disponível]';
      console.log(`${idx + 1}. ${p.topic} ${status}`);
    });
    console.log('\nPara publicar qualquer uma, execute: npm run blog:auto');
  } else {
    console.log('Até logo!');
  }
}

// CLI Routing
const args = process.argv.slice(2);

if (args.includes('--auto')) {
  runAutoFlow();
} else if (args.includes('--list')) {
  const existing = getExistingSlugs();
  console.log(`\n📋 Pautas Estratégicas SolBotz:`);
  PAUTAS_REPOSITORIO.forEach((p, idx) => {
    const status = existing.includes(p.slug) ? '✅ [Já Publicado]' : '⭐ [Disponível]';
    console.log(`${idx + 1}. ${p.topic} ${status}`);
  });
} else if (args.includes('--topic')) {
  const topicIdx = args.indexOf('--topic');
  const customTopic = args[topicIdx + 1];
  if (customTopic) {
    generateArticle({ topic: customTopic });
  } else {
    console.error('Erro: Você deve informar o tema após --topic.');
    process.exit(1);
  }
} else {
  runInteractiveFlow();
}
