import React from 'react';
import { motion } from 'framer-motion';

const differentiators = [
  {
    title: 'Comunicação Contextual (IA)',
    description: 'Superamos os menus engessados. Criamos experiências onde a IA compreende a intenção do cliente, respondendo com a voz da sua marca.',
    benefit: 'Atendimento humanizado & inteligente',
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: 'Alta Disponibilidade (SLA)',
    description: 'Sua operação roda em ambientes de servidores geridos por nós. Estabilidade e segurança de dados para não deixar seu cliente na mão.',
    benefit: 'Infraestrutura isolada e redundante',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Monitoramento Ativo',
    description: 'Identificamos gargalos de infraestrutura preventivamente. Atuamos de forma silenciosa para que sua empresa não pare.',
    benefit: 'Prevenção de falhas em tempo real',
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function DifferentiatorsSection() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Por Que a SolBotz</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          Infraestrutura de nível corporativo <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400">
            para a sua empresa.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-400 leading-relaxed font-light"
        >
          Para sustentar o crescimento do seu negócio, você precisa de confiabilidade.
        </motion.p>
      </div>

      {/* Bullets de Confiança com Ícones de Check */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {differentiators.map((diff, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative rounded-3xl p-8 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/30 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)]"
          >
            {/* Ambient Lighting */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/5 group-hover:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {diff.icon}
                </div>
                {/* Check pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Garantido</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white tracking-tight mb-3">
                {diff.title}
              </h3>

              <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                {diff.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-emerald-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{diff.benefit}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
