import React from 'react';
import { motion } from 'framer-motion';

const painCards = [
  {
    badge: 'O Ralo de Oportunidades',
    title: 'Lentidão no Atendimento',
    text: 'Leads e clientes sem resposta imediata. Em um mercado competitivo, a demora de poucos minutos no retorno é o suficiente para o seu cliente fechar com a concorrência.',
    impact: 'Perda silenciosa de receita e leads frios',
    icon: (
      <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    badge: 'O Desperdício de Talentos',
    title: 'Processos Manuais e Repetitivos',
    text: 'Sua equipe dedica horas preciosas copiando dados, preenchendo planilhas e gerando orçamentos manualmente. Um trabalho braçal que gera erros humanos e reduz o tempo focado em vendas.',
    impact: 'Folha de pagamento gasta em burocracia mecânica',
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    badge: 'O Risco Operacional',
    title: 'Dependência e Gargalos',
    text: 'A operação centralizada no celular de poucos colaboradores ou na sua própria presença constante. Se a liderança se ausenta, o ritmo de vendas despenca e o padrão cai.',
    impact: 'Falta de previsibilidade e impossibilidade de escala',
    icon: (
      <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
];

export default function PainSection() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-300 border border-rose-500/20 mb-4 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
          <span>Diagnóstico de Gargalos</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          O custo da ineficiência é silencioso, <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-300 via-orange-300 to-amber-200">
            mas constante.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-400 leading-relaxed font-light"
        >
          Empresas não deixam de crescer apenas pela falta de clientes, mas pela incapacidade de atender a demanda com excelência. Onde sua operação está perdendo rentabilidade hoje?
        </motion.p>
      </div>

      {/* 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {painCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group relative rounded-3xl p-8 bg-[#0d0e12]/80 border border-white/[0.08] hover:border-rose-500/30 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]"
          >
            {/* Ambient Corner Glow on hover */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-500/5 group-hover:bg-rose-500/10 rounded-full blur-2xl pointer-events-none transition-all duration-500" />

            <div>
              {/* Badge + Icon */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300/90 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                  {card.badge}
                </span>
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {card.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white tracking-tight mb-3">
                {card.title}
              </h3>

              <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                {card.text}
              </p>
            </div>

            {/* Impact Flag */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
              <span>{card.impact}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
