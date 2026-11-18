import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    badge: 'Discovery',
    title: 'Mapeamento (Discovery)',
    description: 'Analisamos a fundo a sua rotina atual. Identificamos os pontos de fricção e onde a automação trará o maior retorno financeiro imediato.',
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: '02',
    badge: 'Design',
    title: 'Arquitetura da Solução',
    description: 'Desenhamos fluxos inteligentes e personalizados para a sua regra de negócio, garantindo que a tecnologia se adapte à sua empresa.',
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    step: '03',
    badge: 'Deploy',
    title: 'Implementação Tecnológica',
    description: 'Executamos a transição com impacto zero na sua operação atual, utilizando infraestrutura de ponta, isolada e segura.',
    icon: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: '04',
    badge: 'Scale',
    title: 'Monitoramento e Sustentação',
    description: 'Acompanhamos a performance da sua automação continuamente, garantindo estabilidade corporativa.',
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function MethodologySection() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/[0.04] text-gray-300 border border-white/10 mb-4 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          <span>O Processo Consultivo</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          Como transformamos <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-white">
            a sua operação.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-400 leading-relaxed font-light"
        >
          Do mapeamento de gargalos à sustentação contínua: um método testado para entregar eficiência com impacto zero na sua rotina diária.
        </motion.p>
      </div>

      {/* 4 Steps Bento / Connected Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {steps.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative rounded-3xl p-7 bg-[#0d0e12]/80 border border-white/[0.08] hover:border-white/20 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_10px_35px_-15px_rgba(0,0,0,0.5)]"
          >
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <span className="text-2xl font-black font-mono tracking-tight text-gray-600 group-hover:text-blue-400 transition-colors">
                  {item.step}
                </span>
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white tracking-tight mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-gray-400 font-light leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-gray-500">
              <span>Etapa {idx + 1} de 4</span>
              <span className="text-blue-400/80 uppercase">{item.badge}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
