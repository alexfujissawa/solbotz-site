import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const partners = [
  {
    name: 'Square',
    category: 'Pagamentos & POS',
    description: 'Soluções de pagamento, maquininhas e vendas presenciais/online.',
    url: 'https://squareup.com/i/SOLBOTZ001',
    badge: 'Indicação Oficial',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    name: 'Hostinger',
    category: 'Hospedagem & Nuvem',
    description: 'Servidores VPS e hospedagem cloud com desconto especial.',
    url: 'https://www.hostinger.com/br?REFERRALCODE=SOLBOTZ',
    badge: 'Cupom: SOLBOTZ',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    icon: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    name: 'au (povo 2.0)',
    category: 'Telefonia & Dados Japão',
    description: 'Planos flexíveis de dados móveis no Japão com bônus de ativação.',
    url: 'https://povo.jp/service/referral/',
    badge: 'Código: MWGGQME0',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    referralCode: 'MWGGQME0',
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Wise',
    category: 'Câmbio & Conta Global',
    description: 'Conta multimoeda internacional com transferências sem taxas na 1ª remessa.',
    url: 'http://bit.ly/44r8Q00',
    badge: 'Inscreva-se e Ganhe!',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
];

export default function PartnersDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyToClipboard = (e: React.MouseEvent, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Botão Gatilho Apple Style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium tracking-wide text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 cursor-pointer group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
        <span>Parceiros</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Menu Suspenso Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 sm:right-auto sm:left-0 mt-3 w-80 sm:w-96 rounded-2xl p-2 bg-[#0c0d12]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
          >
            {/* Header do Menu */}
            <div className="px-3 py-2 border-b border-white/5 mb-1 flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                Parceiros Homologados
              </span>
              <span className="text-[10px] text-blue-400 font-medium bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                Links Exclusivos
              </span>
            </div>

            {/* Lista de Parceiros */}
            <div className="space-y-1">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all duration-200 group text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-white/20 transition-all">
                    {partner.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                          {partner.name}
                        </span>
                        <svg
                          className="w-3 h-3 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>

                      {partner.referralCode ? (
                        <button
                          onClick={(e) => copyToClipboard(e, partner.referralCode!)}
                          title="Clique para copiar o código"
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                            copiedCode === partner.referralCode
                              ? 'bg-emerald-500 text-white border-emerald-400'
                              : `${partner.badgeColor} hover:bg-white/10`
                          }`}
                        >
                          {copiedCode === partner.referralCode ? 'Copiado!' : partner.badge}
                        </button>
                      ) : (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${partner.badgeColor}`}>
                          {partner.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                      {partner.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Rodapé do Menu */}
            <div className="mt-1 pt-2 px-3 border-t border-white/5 text-[10px] text-gray-500 flex items-center justify-between">
              <span>Benefícios aplicados automaticamente</span>
              <span className="text-gray-400 font-mono">solbotz.com.br</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
