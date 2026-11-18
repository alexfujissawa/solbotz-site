# ==============================================================================
# GUIA RÁPIDO: AGENTE DE BLOG SOLBOTZ (FLUXO FAZ TUDO)
# ==============================================================================

O Blog da SolBotz utiliza a arquitetura nativa de **Content Collections** do Astro (v7), garantindo SEO de alta performance, carregamento instantâneo e design escuro/glassmorphism alinhado à marca.

---

## 🚀 Como Usar o Agente de Blog ("Faz Tudo")

Abra o terminal na pasta `solbotz-site` e execute:

### 1. Modo "Faz Tudo" (Totalmente Autônomo)
O agente escolhe automaticamente a próxima pauta estratégica do repositório, gera o conteúdo completo com frontmatter e salva em `src/content/blog/`:
```bash
npm run blog:auto
```

### 2. Criar Artigo com Tema Personalizado
Gere um artigo instantâneo sobre qualquer assunto:
```bash
npm run blog:new "Como Automatizar a Cobrança no WhatsApp com IA"
```

### 3. Painel Interativo no Terminal
Menu interativo com opções de geração, seleção de categoria e consulta:
```bash
npm run blog:agent
```

### 4. Consultar Pautas Recomendadas
Visualize as pautas do nicho da SolBotz e veja quais já foram publicadas:
```bash
npm run blog:list
```

---

## ⚙️ Configuração de Inteligência Artificial (Opcional)

O agente possui um **Motor Heurístico Estruturado** que funciona **sem nenhuma chave de API** (zero dependência externa). 

Caso deseje gerar artigos com LLMs em tempo real, adicione no arquivo `.env` de `solbotz-site`:

```env
# Chave da API do Google Gemini (Recomendado)
GEMINI_API_KEY=sua_chave_do_gemini_aqui

# OU Chave da API da OpenAI
OPENAI_API_KEY=sua_chave_da_openai_aqui
```

---

## 📁 Estrutura de Arquivos Criados

- `src/content.config.ts`: Definição de esquema de validação do Blog (Astro Content Layer).
- `src/content/blog/*.md`: Artigos em Markdown com frontmatter SEO.
- `src/pages/blog/index.astro`: Página inicial do Blog com cards e filtros.
- `src/pages/blog/[slug].astro`: Página individual de leitura com tipografia de ponta e CTAs.
- `scripts/blog-agent.mjs`: Código do Agente Autônomo com suporte a Gemini, OpenAI e Fallback Heurístico.
