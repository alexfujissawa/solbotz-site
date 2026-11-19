import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/**
 * ============================================================================
 * 🤖 AGENTE DE CONTEÚDO DO BLOG — SOLBOTZ
 * 
 * Consultoria em Eficiência Operacional & Automação Inteligente
 * Agendado automaticamente toda Segunda e Quinta às 06h (fuso Japão) via GitHub Actions
 * ============================================================================
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(PROJECT_ROOT, 'src', 'content', 'blog');

// Banco de Temas Estratégicos da SolBotz
const bancoTemas = [
  {
    titulo: "Como Integrar WhatsApp e CRM com IA para Responder Clientes em Menos de 30 Segundos",
    descricao: "Descubra como empresas estão abandonando o atendimento manual e implementando agentes que qualificam leads e agendam reuniões em tempo real.",
    categoria: "Automação & IA",
    tags: ["WhatsApp", "CRM", "Atendimento", "Agentes IA", "Vendas"],
    secoes: [
      {
        subtitulo: "A matemática da velocidade no atendimento comercial",
        conteudo: "Estudos de conversão comprovam: responder um lead nos primeiros 5 minutos aumenta as chances de fechamento em até 7 vezes. Quando o tempo de resposta passa de 1 hora, mais de 60% dos potenciais compradores já fecharam com o concorrente mais rápido."
      },
      {
        subtitulo: "A arquitetura do Agente de Atendimento",
        conteudo: "Conectamos o WhatsApp corporativo via API oficial a um orquestrador (como n8n) integrado ao Supabase e ao CRM da empresa. O agente de IA analisa a mensagem, classifica o nível de prioridade, responde dúvidas frequentes e já disponibiliza o link da agenda do consultor."
      },
      {
        subtitulo: "Transição suave para o consultor humano",
        conteudo: "A inteligência artificial não substitui a conversa de fechamento do vendedor: ela elimina a triagem repetitiva. Quando o lead é qualificado, o agente notifica o time humano com o resumo estruturado de toda a conversa."
      }
    ]
  },
  {
    titulo: "Automação Financeira: Como Conciliar Pix, Boletos e Notas Fiscais Sem Erros Humanos",
    descricao: "Aprenda a eliminar horas semanais de digitação manual entre bancos, ERP e planilhas com pipelines automáticos de conciliação.",
    categoria: "Eficiência Operacional",
    tags: ["Financeiro", "Conciliação", "ERP", "Produtividade", "Redução de Custos"],
    secoes: [
      {
        subtitulo: "O custo invisível do retrabalho financeiro",
        conteudo: "Digitar comprovantes de pagamento e conciliar extratos manualmente consome mais de 20 horas por semana em médias empresas. Além do custo em horas da equipe, qualquer erro de digitação gera inconsistências fiscais e relatórios distorcidos."
      },
      {
        subtitulo: "Conexão direta de extratos e emissores de NF-e",
        conteudo: "Com rotinas de automação em tempo real, cada Pix recebido ou boleto compensado gera a baixa automática no sistema de gestão e dispara a emissão da nota fiscal eletrônica correspondente sem nenhuma intervenção humana."
      },
      {
        subtitulo: "Alertas inteligentes de inadimplência",
        conteudo: "Em vez de cobranças manuais constrangedoras, fluxos automatizados acompanham o vencimento e enviam lembretes elegantes com segunda via de boleto em um clique."
      }
    ]
  },
  {
    titulo: "IA no Atendimento ao Cliente: Como Resolver 70% dos Chamados Mantendo o Toque Humano",
    descricao: "Diga adeus aos chatbots de menu numérico engessados. Veja como agentes cognitivos compreendem a linguagem natural e resolvem problemas de verdade.",
    categoria: "Automação & IA",
    tags: ["Atendimento", "Suporte", "Satisfação", "Chatbots", "Helpdesk"],
    secoes: [
      {
        subtitulo: "Por que os chatbots antigos causavam tanta frustração",
        conteudo: "Menus do tipo 'Digite 1 para suporte' criavam filas e irritação. Agentes modernos usam processamento de linguagem natural avançado (LLMs) para entender gírias, erros de digitação e mensagens de áudio com máxima naturalidade."
      },
      {
        subtitulo: "Acesso a ferramentas e base de dados corporativa",
        conteudo: "O agente é treinado nas políticas reais da empresa e tem permissão para consultar o status de pedidos no banco de dados, gerar links de rastreio e emitir segundas vias na hora."
      },
      {
        subtitulo: "Alçadas claras de escalonamento",
        conteudo: "Caso o cliente demonstre insatisfação ou o caso envolva cancelamento/negociação sensível, o agente transfere imediatamente para um líder de suporte com todo o histórico já resumido."
      }
    ]
  },
  {
    titulo: "Auditoria de Processos: 5 Passos Para Identificar Onde Sua Empresa Está Perdendo Dinheiro",
    descricao: "Guia executivo para mapear gargalos operacionais ocultos, eliminar passos redundantes e proteger a margem de lucro da sua operação.",
    categoria: "Eficiência Operacional",
    tags: ["Auditoria", "Processos", "Gestão", "Redução de Custos"],
    secoes: [
      {
        subtitulo: "1. Mapeamento dos fluxos ponta a ponta",
        conteudo: "Desenhe como a informação viaja desde a entrada do cliente até a entrega do serviço. Identifique onde os dados precisam ser redigitados em outro sistema."
      },
      {
        subtitulo: "2. Medição do tempo de espera e gargalos",
        conteudo: "Descubra quanto tempo um pedido fica parado esperando aprovação manual de um gestor ou resposta de um setor dependente."
      },
      {
        subtitulo: "3. Priorização por impacto financeiro",
        conteudo: "Foque primeiro em automatizar tarefas diárias de alto volume que liberam tempo imediato das pessoas mais caras e estratégicas da sua folha."
      }
    ]
  },
  {
    titulo: "Contratar ou Automatizar? O Guia Executivo de ROI para Decisões Operacionais em 2026",
    descricao: "Como calcular com precisão o retorno sobre o investimento antes de abrir novas vagas na sua equipe operacional.",
    categoria: "Cases & Estratégia",
    tags: ["ROI", "Estratégia", "Folha de Pagamento", "Gestão Financeira"],
    secoes: [
      {
        subtitulo: "A matemática da folha de pagamento vs infraestrutura digital",
        conteudo: "Cada nova contratação traz encargos, benefícios, equipamentos e meses de treinamento. Já um fluxo de automação custa uma fração mensal fixa e escala instantaneamente se a demanda triplicar."
      },
      {
        subtitulo: "Quando contratar é indispensável",
        conteudo: "Contrate pessoas para papéis de estratégia, inovação, vendas complexas e relacionamento. Automatize todo o restante que for padronizável e repetitivo."
      },
      {
        subtitulo: "Garantindo estabilidade na escala",
        conteudo: "Uma infraestrutura sólida permite que sua empresa dobre de tamanho mantendo a equipe enxuta, motivada e com remunerações acima da média de mercado."
      }
    ]
  },
  {
    titulo: "Dashboards em Tempo Real: Como Eliminar Planilhas Perdidas e Tomar Decisões com Dados Reais",
    descricao: "Abandone reuniões baseadas em achismos e relatórios defasados. Conheça a arquitetura para monitorar KPIs operacionais minuto a minuto.",
    categoria: "Eficiência Operacional",
    tags: ["Dashboards", "Supabase", "Dados", "BI", "Métricas"],
    secoes: [
      {
        subtitulo: "O perigo de liderar olhando pelo retrovisor",
        conteudo: "Esperar o fechamento do mês para descobrir que a margem caiu ou que um setor acumulou atrasos impede a tomada de ação corretiva a tempo."
      },
      {
        subtitulo: "Centralização em PostgreSQL e Supabase",
        conteudo: "Com um banco de dados centralizado recebendo eventos em tempo real, painéis executivos mostram faturamento diário, chamados abertos e velocidade da equipe instantaneamente."
      },
      {
        subtitulo: "Alertas automáticos proativos",
        conteudo: "Configure alertas no Slack ou WhatsApp quando um indicador chave desviar da meta, permitindo agir antes que o problema chegue ao cliente."
      }
    ]
  },
  {
    titulo: "n8n Auto-Hospedado vs Zapier e Make: Como Reduzir em 90% a Fatura de Integrações",
    descricao: "Entenda por que empresas em expansão estão migrando de ferramentas pagas por tarefa para o orquestrador n8n com custos previsíveis.",
    categoria: "Cases & Estratégia",
    tags: ["n8n", "Zapier", "Make", "Infraestrutura", "Redução de Custos"],
    secoes: [
      {
        subtitulo: "A armadilha da precificação punitiva por tarefas",
        conteudo: "Plataformas tradicionais cobram por cada execução simples. À medida que os fluxos ganham volume, as mensalidades viram verdadeiras faturas exorbitantes."
      },
      {
        subtitulo: "A liberdade e segurança do n8n",
        conteudo: "Com o n8n hospedado em servidores próprios ou gerenciados, o número de execuções é ilimitado com custo fixo e total privacidade dos dados corporativos."
      },
      {
        subtitulo: "Nós avançados de IA e código personalizado",
        conteudo: "Suporte nativo a conectores de LLMs, vetores semânticos e scripts em JavaScript/Python tornam o n8n o canivete suíço definitivo para engenharia operacional."
      }
    ]
  }
];

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

function calcularTempoLeitura(texto) {
  const palavras = texto.trim().split(/\s+/).length;
  const minutos = Math.max(1, Math.ceil(palavras / 200));
  return `${minutos} min de leitura`;
}

function obterDataHojeJST() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' }).format(new Date());
}

function gerarPostMarkdown(tema) {
  const hoje = obterDataHojeJST();
  const slug = slugify(tema.titulo);

  let corpoArtigo = `Em um cenário corporativo cada vez mais dinâmico, **a eficiência operacional e a automação de processos** deixaram de ser meros diferenciais técnicos para se tornarem o alicerce fundamental de sustentabilidade e lucro de empresas médias.\n\n`;

  tema.secoes.forEach(sec => {
    corpoArtigo += `## ${sec.subtitulo}\n\n${sec.conteudo}\n\n`;
  });

  corpoArtigo += `---

## O Impacto Direto nos Resultados do Seu Negócio

Implementar essas melhorias traz benefícios palpáveis já nas primeiras semanas:
- **Redução drástica do tempo de resposta:** Passando de horas para segundos.
- **Proteção da margem operacional:** Aumento da receita sem a necessidade de inflar a folha de pagamento.
- **Governança e precisão:** Eliminação de gargalos decorrentes de esquecimentos ou erros de digitação.

---

> **Quer destravar a operação da sua empresa?**  
> Fale com a equipe da [SolBotz](/) e agende um Diagnóstico Operacional Estratégico. Analisamos seus processos atuais e desenhamos o plano de ação ideal para acelerar seu crescimento.
`;

  const readTime = calcularTempoLeitura(corpoArtigo);

  return `---
title: "${tema.titulo}"
description: "${tema.descricao}"
pubDate: ${hoje}
author: "Alex Ferreira | SolBotz"
category: "${tema.categoria}"
tags: ${JSON.stringify(tema.tags)}
coverImage: "/solbotz.jpeg"
readTime: "${readTime}"
featured: false
---

${corpoArtigo}`;
}

// Execução
const args = process.argv.slice(2);
const isAuto = args.includes('--auto');
const isGit = args.includes('--git');
const topicIdx = args.indexOf('--topic');
const customTopic = topicIdx !== -1 ? args[topicIdx + 1] : null;

if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

const postsExistentes = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace('.md', ''));

let temaEscolhido;

if (customTopic) {
  temaEscolhido = {
    titulo: customTopic,
    descricao: `Estratégias práticas sobre ${customTopic.toLowerCase()} para empresas que buscam alta eficiência operacional e automação inteligente.`,
    categoria: "Automação & IA",
    tags: ["Eficiência Operacional", "Automação", "IA", "Gestão"],
    secoes: [
      {
        subtitulo: "O desafio atual das empresas",
        conteudo: "Processos manuais e lentos continuam consumindo horas preciosas de equipes qualificadas, reduzindo a rentabilidade e a competitividade do negócio."
      },
      {
        subtitulo: "Como aplicar automação e IA de forma prática",
        conteudo: "Com a combinação de orquestradores modernos, APIs conectadas e modelos de inteligência artificial, é possível automatizar tarefas rotineiras com alta precisão e segurança."
      }
    ]
  };
} else {
  // Pega o próximo tema disponível na fila
  const temasDisponiveis = bancoTemas.filter(t => !postsExistentes.includes(slugify(t.titulo)));

  if (temasDisponiveis.length > 0) {
    temaEscolhido = temasDisponiveis[0];
  } else {
    // Gerador dinâmico quando a fila fixa for completada
    const timestamp = Date.now().toString().slice(-4);
    temaEscolhido = {
      titulo: `Novas Tendências em Automação Inteligente e IA para Empresas #${timestamp}`,
      descricao: `Inovações e metodologias para alavancar a eficiência operacional de equipes em crescimento sem aumentar custos fixos.`,
      categoria: "Automação & IA",
      tags: ["Automação", "IA", "Inovação", "Produtividade"],
      secoes: [
        {
          subtitulo: "O avanço dos agentes de inteligência artificial",
          conteudo: "Modelos capazes de raciocinar sobre dados de negócios e executar ferramentas em tempo real estão transformando a rotina operacional de empresas de todos os portes."
        },
        {
          subtitulo: "Como a SolBotz acelera sua implementação",
          conteudo: "Nossa metodologia desenha soluções sob medida para conectar seus sistemas e eliminar gargalos em tempo recorde."
        }
      ]
    };
  }
}

const slug = slugify(temaEscolhido.titulo);
const caminhoArquivo = path.join(BLOG_DIR, `${slug}.md`);
const conteudoMarkdown = gerarPostMarkdown(temaEscolhido);

fs.writeFileSync(caminhoArquivo, conteudoMarkdown.trim() + '\n', 'utf8');

console.log(`\n🤖 [SOLBOTZ BLOG AGENT]: Novo artigo gerado com sucesso!`);
console.log(`📌 Título: "${temaEscolhido.titulo}"`);
console.log(`📁 Arquivo: ${path.relative(PROJECT_ROOT, caminhoArquivo)}`);
console.log(`🌐 Rota: /blog/${slug}`);

if (isGit) {
  try {
    console.log('\n🚀 [AGENTE GIT]: Enviando post automaticamente para o GitHub e Vercel...');
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "feat(blog): novo artigo '${temaEscolhido.titulo}'"`, { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('✅ Deploy disparado com sucesso na Vercel!');
  } catch (err) {
    console.error('⚠️ Aviso: Erro ao executar git push automático:', err.message);
  }
}
