import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const RECIPIENT_EMAIL = 'alex.fujissawa@gmail.com';

const DROPDOWN_OPTIONS = [
  'Lentidão no atendimento e perda de vendas no WhatsApp',
  'Excesso de trabalho manual e tarefas repetitivas da equipe',
  'Falta de integração entre sistemas (dados espalhados)',
  'Operação excessivamente dependente de mim ou de funcionários chave',
  'Necessidade de escalar vendas sem aumentar a folha de pagamento',
  'Outro desafio operacional',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  challenge: string;
  description: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    challenge: DROPDOWN_OPTIONS[0],
    description: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validação básica cliente
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Por favor, preencha todos os campos obrigatórios (Nome, E-mail e WhatsApp).');
      return;
    }

    setStatus('loading');

    try {
      const submittedAt = new Date().toISOString();
      const leadPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim() || null,
        challenge: formData.challenge,
        description: formData.description.trim() || null,
        created_at: submittedAt,
      };

      const [emailResult, supabaseResult] = await Promise.allSettled([
        fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `Novo Diagnóstico SolBotz: ${leadPayload.name}${leadPayload.company ? ` (${leadPayload.company})` : ''}`,
            _template: 'table',
            _captcha: 'false',
            Nome: leadPayload.name,
            Email: leadPayload.email,
            WhatsApp_Telefone: leadPayload.phone,
            Empresa: leadPayload.company || 'Não informada',
            Maior_Gargalo_Operacional: leadPayload.challenge,
            Descricao_Necessidade: leadPayload.description || 'Não detalhada',
            Data_Envio: submittedAt,
          }),
        }),
        supabase.from('leads').insert([leadPayload]),
      ]);

      const emailSucceeded = emailResult.status === 'fulfilled' && emailResult.value.ok;
      const supabaseSucceeded =
        supabaseResult.status === 'fulfilled' && !supabaseResult.value.error;

      if (!emailSucceeded) {
        console.warn('Aviso ao enviar e-mail via FormSubmit:', emailResult);
      }

      if (supabaseResult.status === 'fulfilled' && supabaseResult.value.error) {
        const sbError = supabaseResult.value.error;
        const isPlaceholder =
          sbError.message?.includes('fetch') ||
          sbError.message?.includes('placeholder') ||
          sbError.code === 'PGRST301';

        if (!isPlaceholder && !emailSucceeded) {
          throw sbError;
        }
        if (isPlaceholder) {
          console.warn(
            'Aviso Supabase: Configure PUBLIC_SUPABASE_URL e PUBLIC_SUPABASE_ANON_KEY no arquivo .env.'
          );
        }
      }

      if (!emailSucceeded && !supabaseSucceeded) {
        throw new Error(
          'Não foi possível enviar suas informações no momento. Verifique sua conexão e tente novamente.'
        );
      }

      setStatus('success');
    } catch (err: unknown) {
      console.error('Erro ao enviar lead:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Não foi possível enviar suas informações no momento. Tente novamente mais tarde.'
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Decorative Outer Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-indigo-500/20 to-cyan-500/30 rounded-3xl blur-2xl opacity-40 pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl p-8 sm:p-12 bg-[#0d0e12]/85 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                Diagnóstico Solicitado com Sucesso!
              </h3>
              <p className="text-gray-400 max-w-md text-sm sm:text-base leading-relaxed mb-8 font-light">
                Recebemos suas informações. Nossa equipe de engenharia e consultoria analisará os dados e entrará em contato para apresentar um plano personalizado.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    challenge: DROPDOWN_OPTIONS[0],
                  });
                }}
                className="px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-gray-400 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white transition-colors"
              >
                Enviar nova solicitação
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 text-left"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                  Solicitar Diagnóstico Operacional
                </h3>
                <p className="text-sm text-gray-400 font-light">
                  Preencha os dados abaixo para mapearmos seus processos e identificarmos onde recuperar rentabilidade.
                </p>
              </div>

              {/* Nome Completo */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-2">
                  Nome Completo <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Carlos Mendes"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm backdrop-blur-md"
                />
              </div>

              {/* Grid: E-mail e WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-2">
                    E-mail Corporativo <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="carlos@empresa.com.br"
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm backdrop-blur-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-2">
                    WhatsApp / Telefone (Brasil ou Japão) <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999 ou 090-9999-9999"
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm backdrop-blur-md"
                  />
                </div>
              </div>

              {/* Empresa */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Sua Empresa ou Ramo de Atuação"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm backdrop-blur-md"
                />
              </div>

              {/* Dropdown de Qualificação Solicitado na Copy */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-2">
                  Qual é o maior gargalo da sua operação hoje? <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <select
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#14151b] border border-white/10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm appearance-none cursor-pointer pr-10"
                  >
                    {DROPDOWN_OPTIONS.map((opt, i) => (
                      <option key={i} value={opt} className="bg-[#14151b] text-white py-2">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Caixa Retangular Longa para Descrever a Necessidade do Cliente */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-2">
                  Descreva a sua necessidade ou cenário atual <span className="text-gray-500 font-normal">(Opcional)</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Conte com detalhes o que sua equipe faz manualmente, os sistemas que utilizam e qual processo você gostaria de automatizar..."
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm backdrop-blur-md resize-y leading-relaxed"
                />
              </div>

              {/* Mensagem de Erro se houver */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <span>⚠</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full relative group overflow-hidden rounded-full py-4 px-8 font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-400 shadow-[0_0_35px_rgba(37,99,235,0.35)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div className="flex items-center justify-center gap-2">
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      <span>Processando Diagnóstico...</span>
                    </>
                  ) : (
                    <>
                      <span>Solicitar Diagnóstico Operacional</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </div>
              </button>

              <div className="text-center text-[11px] text-gray-500 pt-2 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Dados confidenciais com proteção de ponta a ponta</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
