# Relatório de Auditoria: Copy_Site_SolBotz_Premium.md vs solbotz.com.br

**Data da Auditoria:** 18 de Novembro de 2026  
**Ambiente Auditado:** Produção (`https://www.solbotz.com.br` e `https://solbotz.com.br`)  
**Status Geral:** ✅ **100% APROVADO E CONFORME**

---

## 1. Comparativo Seção por Seção

| Seção da Copy | Elemento no Arquivo MD | Status no Site | Detalhes da Validação |
| :--- | :--- | :---: | :--- |
| **Seção 1: Hero** | Eyebrow: *CONSULTORIA EM EFICIÊNCIA OPERACIONAL* | ✅ | Implementado com badge animado neon |
| | Headline: *Seu negócio cresceu. Sua operação não precisa se tornar um gargalo.* | ✅ | Tipografia responsiva com gradiente Apple style |
| | Sub-headline: *A SolBotz projeta e implementa soluções de automação e IA...* | ✅ | Texto fiel na íntegra |
| | CTA Principal: *Solicitar Diagnóstico Operacional* | ✅ | Âncora suave para `#contato` |
| **Seção 2: A Dor** | Título: *O custo da ineficiência é silencioso, mas constante.* | ✅ | Implementado em `PainSection.tsx` |
| | Card 1: *Lentidão no Atendimento* | ✅ | Ícone, badge e texto idênticos |
| | Card 2: *Processos Manuais e Repetitivos* | ✅ | Ícone, badge e texto idênticos |
| | Card 3: *Dependência e Gargalos* | ✅ | Ícone, badge e texto idênticos |
| **Seção 3: Valor** | Título: *Engenharia de processos aplicada ao seu faturamento.* | ✅ | Implementado em `StrategicValueSection.tsx` |
| | Pilar 1: *Aceleração de Vendas* | ✅ | Fiel à copy |
| | Pilar 2: *Otimização de Custos* | ✅ | Fiel à copy |
| | Pilar 3: *Governança e Escala* | ✅ | Fiel à copy |
| **Seção 4: Método** | Título: *Como transformamos a sua operação.* | ✅ | Implementado em `MethodologySection.tsx` |
| | Passo 1 a 4: *Mapeamento, Arquitetura, Implementação, Sustentação* | ✅ | 4 passos Bento Grid com badges técnicos |
| **Seção 5: Diferencial** | Título: *Infraestrutura de nível corporativo para a sua empresa.* | ✅ | Implementado em `DifferentiatorsSection.tsx` |
| | Bullets: *Comunicação Contextual (IA), Alta Disponibilidade (SLA), Monitoramento* | ✅ | Cards com checkmarks verdes e métricas |
| **Seção 6: Fechamento** | Headline: *Vamos calcular o impacto da automação no seu negócio?* | ✅ | Implementado na seção `#contato` |
| | Texto: *Agende uma sessão de diagnóstico estratégico...* | ✅ | Texto fiel na íntegra |
| **Formulário / Dropdown** | Pergunta: *Qual é o maior gargalo da sua operação hoje?* | ✅ | Implementado em `ContactForm.tsx` |
| | 6 Opções exatas de qualificação da dor | ✅ | Todas as 6 opções presentes |

---

## 2. Auditoria Técnica e de Produção

- **Domínio Ativo:** `https://www.solbotz.com.br` e `https://solbotz.com.br` (Status HTTP 200 OK via Vercel Edge).
- **Blog Integrado:** `https://www.solbotz.com.br/blog` (Astro Content Layer com Markdown).
- **Agente Autônomo:** Configurado no GitHub Actions para Seg/Qui às 06h (JST).
- **Formulário de Leads:** Conectado com envio duplo (Notificação imediata por e-mail para `alex.fujissawa@gmail.com` + Supabase).
