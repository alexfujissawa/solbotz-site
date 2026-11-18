import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroMockup() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 w-full max-w-5xl rounded-2xl p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_20px_80px_-20px_rgba(59,130,246,0.35)] relative group"
    >
      {/* Outer Glow Accent */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-purple-600/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />

      {/* Main Glassmorphism Frame */}
      <div className="relative rounded-2xl bg-[#0b0c10]/90 backdrop-blur-2xl border border-white/10 overflow-hidden">
        {/* Window Bar */}
        <div className="h-11 px-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 hover:opacity-100 transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity"></span>
            <span className="ml-3 text-xs font-mono text-gray-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              solbotz-runtime://process-engineering-engine.v3
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              SLA CORPORATIVO • LIVE PIPELINE
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pausar visualizador" : "Reproduzir visualizador"}
              className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
          </div>
        </div>

        {/* Video / Interactive Workflow Visualizer Canvas */}
        <div className="relative aspect-video w-full bg-[#07080b] flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden">
          {/* Animated Background Mesh Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>

          {/* Dynamic Light Cones */}
          <div className="absolute -top-24 left-1/3 w-72 h-72 bg-blue-500/20 rounded-full blur-[90px] pointer-events-none animate-pulse"></div>
          <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-cyan-400/15 rounded-full blur-[90px] pointer-events-none"></div>

          {/* Workflow Node Graph Preview */}
          <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Step 1: Atendimento Contextual */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-400">01. CAPTURA & TRIAGEM</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">24/7 Ativo</span>
                </div>
                <div className="text-sm font-medium text-white">Atendimento Imediato</div>
                <div className="text-xs text-gray-400 font-light">Qualificação e resposta em &lt; 2s sem perda de vendas</div>
              </div>

              {/* Step 2: Engenharia de Processos */}
              <div className="p-4 rounded-xl bg-white/[0.05] border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-md flex flex-col gap-2 relative">
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold">✓</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-400">02. AUTOMAÇÃO</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">Processos</span>
                </div>
                <div className="text-sm font-medium text-white">Eliminação de Tarefas Manuais</div>
                <div className="text-xs text-gray-400 font-light">Integração de planilhas, CRM e orçamentos</div>
              </div>

              {/* Step 3: Governança e Escala */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-400">03. GOVERNANÇA</span>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">Corporativo</span>
                </div>
                <div className="text-sm font-medium text-white">Histórico & Padronização</div>
                <div className="text-xs text-gray-400 font-light">Previsibilidade e segurança para a liderança</div>
              </div>
            </div>

            {/* Central Holographic Pulse / Play Status */}
            <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-gray-300 font-mono">
                Eficiência Operacional: <strong>+300% capacidade de atendimento</strong> • Zero gargalo humano
              </span>
            </div>
          </div>

          {/* Bottom Video Progress Bar Overlay */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"
              animate={{ width: isPlaying ? ['0%', '100%'] : '65%' }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
