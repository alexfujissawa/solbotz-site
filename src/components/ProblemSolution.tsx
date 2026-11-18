import React from 'react';
import { motion } from 'framer-motion';

const painPoints = [
  {
    title: 'Processos Manuais e Lentos',
    desc: 'Equipes sobrecarregadas copiando dados entre planilhas, CRMs e e-mails, gerando atrasos diários.',
  },
  {
    title: 'Perda de Leads e Vendas',
    desc: 'Clientes esperando horas por uma resposta comercial. Cada minuto de espera reduz a conversão.',
  },
  {
    title: 'Silos de Informação e Erros',
    desc: 'Sistemas que não conversam entre si. Informações descentralizadas e retrabalho constante.',
  },
];

const solutions = [
  {
    title: 'Workflows 100% Autônomos',
    desc: 'Integrações robustas que conectam suas ferramentas e executam operações complexas em milissegundos.',
  },
  {
    title: 'Atendimento e Triagem com IA',
    desc: 'Agentes inteligentes que qualificam, tiram dúvidas e agendam reuniões 24 horas por dia, 7 dias por semana.',
  },
  {
    title: 'Infraestrutura Conectada e Confiável',
    desc: 'Dados unificados em tempo real com segurança enterprise, dashboards e auditoria de cada evento.',
  },
];

export default function ProblemSolution() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4"
        >
          Transformação Operacional
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
        >
          O custo da ineficiência vs. <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">
            o poder da escala com IA
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-400 leading-relaxed font-light"
        >
          Empresas que dependem de etapas manuais estagnam. A SolBotz substitui atritos humanos por ecossistemas autônomos que operam com precisão cirúrgica.
        </motion.p>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* The Problem Card (Before) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-8 sm:p-10 bg-white/[0.02] border border-white/5 backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-red-500/20 transition-colors"
        >
          {/* Subtle Ambient Red Tint */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-[0_0_10px_rgba(248,113,113,0.5)]"></span>
                <span className="text-sm font-semibold tracking-wider uppercase text-gray-400">O Cenário Atual (Gargalos)</span>
              </div>
              <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                Operação Frágil
              </span>
            </div>

            <div className="space-y-6">
              {painPoints.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                  <div className="mt-1 w-6 h-6 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 font-bold text-xs border border-red-500/20">
                    ✕
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
            <span>Resultado: Escalar exige contratar mais e mais</span>
            <span className="text-red-400/80 font-medium">Margens comprimidas</span>
          </div>
        </motion.div>

        {/* The Solution Card (After - SolBotz) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-blue-950/20 via-white/[0.03] to-white/[0.01] border border-blue-500/30 backdrop-blur-2xl shadow-[0_0_50px_-15px_rgba(37,99,235,0.25)] flex flex-col justify-between overflow-hidden group hover:border-blue-400/50 transition-colors"
        >
          {/* Subtle Ambient Blue & Cyan Flare */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-400/10 rounded-full blur-[90px] pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-blue-500/20">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse"></span>
                <span className="text-sm font-semibold tracking-wider uppercase text-blue-300">Com SolBotz (O Futuro)</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Escalabilidade 24/7
              </span>
            </div>

            <div className="space-y-6">
              {solutions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-blue-900/10 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                  <div className="mt-1 w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 font-bold text-xs border border-emerald-500/30">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base mb-1">{item.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Highlights Banner */}
          <div className="mt-8 pt-6 border-t border-blue-500/20 grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight">-85%</div>
              <div className="text-[11px] text-gray-400">Trabalho manual</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-lg sm:text-xl font-bold text-cyan-400 tracking-tight">&lt; 2s</div>
              <div className="text-[11px] text-gray-400">Tempo de resposta</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-lg sm:text-xl font-bold text-emerald-400 tracking-tight">99.9%</div>
              <div className="text-[11px] text-gray-400">Confiabilidade</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
