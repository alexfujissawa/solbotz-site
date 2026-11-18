import React from 'react';
import { motion } from 'framer-motion';

const ecosystemPillars = [
  {
    tag: 'Orquestração de Workflows',
    title: 'n8n Enterprise Engine',
    desc: 'Construção e sustentação de pipelines de dados avançados, integração de centenas de APIs e automações orientadas a eventos sem restrições.',
    metrics: ['+400 Conectores Nativos', 'Webhooks em Tempo Real', 'Self-hosted & Seguro'],
    badgeColor: 'from-orange-500/20 to-amber-500/10 text-orange-300 border-orange-500/30',
    icon: (
      <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    tag: 'Experiência Conversacional',
    title: 'Typebot & Omnichannel',
    desc: 'Atendentes virtuais humanizados com raciocínio lógico no WhatsApp, sites e canais corporativos. Coleta de dados fluida com taxas de conversão superiores.',
    metrics: ['Qualificação Imediata', 'Integração CRM Direta', 'Fluxos Dinâmicos'],
    badgeColor: 'from-blue-500/20 to-cyan-500/10 text-blue-300 border-blue-500/30',
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    tag: 'Inteligência Cognitiva',
    title: 'Agentes Autônomos de IA',
    desc: 'Modelos de linguagem de fronteira (OpenAI, Claude, Gemini) operando como analistas da sua empresa: sintetizam relatórios, leem documentos e tomam decisões.',
    metrics: ['RAG com Seus Dados', 'Decisões Autônomas', 'Visão Computacional'],
    badgeColor: 'from-purple-500/20 to-pink-500/10 text-purple-300 border-purple-500/30',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    tag: 'Persistência & Segurança',
    title: 'Supabase & Cloud Data',
    desc: 'Arquitetura de dados resiliente em PostgreSQL com Row-Level Security, sincronização em tempo real e capacidade de escalar para milhões de registros com segurança.',
    metrics: ['Postgres Escalável', 'Criptografia em Trânsito', 'Backups Automáticos'],
    badgeColor: 'from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30',
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
];

export default function EcosystemSection() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4"
        >
          Pilha Tecnológica de Alta Performance
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
        >
          Um ecossistema unificado, <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            construído para robustez máxima
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-400 leading-relaxed font-light"
        >
          Não criamos scripts frágeis. Implementamos uma arquitetura modular que combina as melhores tecnologias globais em um motor único e escalável.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {ecosystemPillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative rounded-3xl p-8 sm:p-10 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/15 backdrop-blur-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Dynamic Corner Ambient Lighting */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-gradient-to-br from-blue-500/10 to-indigo-500/0 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

            <div>
              {/* Header with Icon and Tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <span className={`text-[11px] font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-gradient-to-r ${pillar.badgeColor} border`}>
                  {pillar.tag}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">
                {pillar.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light mb-8">
                {pillar.desc}
              </p>
            </div>

            {/* Metrics Pills */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
              {pillar.metrics.map((m, mIdx) => (
                <span
                  key={mIdx}
                  className="text-xs text-gray-300 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                  {m}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
