import React from 'react';
import { motion } from 'framer-motion';

const strategicPillars = [
  {
    pillarNumber: 'Pilar 01',
    title: 'Aceleração de Vendas',
    text: 'Triagem e atendimento em tempo real, 24/7. Seu cliente é qualificado e atendido no momento exato em que demonstra intenção de compra.',
    highlight: 'Zero Lead Frio • Conversão Imediata',
    gradient: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-300',
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    pillarNumber: 'Pilar 02',
    title: 'Otimização de Custos',
    text: 'Automatizamos a transferência de dados e burocracias operacionais. Sua folha de pagamento passa a ser investida em capital intelectual, não em trabalho de máquina.',
    highlight: 'Eliminação de Tarefas Manuais',
    gradient: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-300',
    icon: (
      <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    pillarNumber: 'Pilar 03',
    title: 'Governança e Escala',
    text: 'Histórico centralizado e operação padronizada. Você ganha previsibilidade, segurança de dados e a certeza de que sua empresa roda com excelência.',
    highlight: 'Previsibilidade & Auditoria Total',
    gradient: 'from-cyan-500/20 to-emerald-500/10 border-cyan-500/30 text-cyan-300',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function StrategicValueSection() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          <span>O Valor Estratégico</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          Engenharia de processos <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
            aplicada ao seu faturamento.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-400 leading-relaxed font-light"
        >
          A SolBotz não entrega "sistemas de mensagens". Nós implementamos infraestruturas autônomas focadas em três pilares de resultados diretos:
        </motion.p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {strategicPillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-blue-500/40 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_15px_45px_-15px_rgba(0,0,0,0.6)]"
          >
            {/* Top Glow Ambient */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <span className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r ${pillar.gradient} border`}>
                  {pillar.pillarNumber}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-4">
                {pillar.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed mb-8">
                {pillar.text}
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-mono text-gray-300 font-medium">
                {pillar.highlight}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
