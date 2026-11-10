import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  FileCheck, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Users, 
  ExternalLink,
  Check
} from 'lucide-react';
import { User } from '../types';
import { VerifiedBadge } from './VerifiedBadge';
import { getLocationHashtag } from '../utils/hashtag';

interface AmbassadorVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onApproveVerification: (applicationData: {
    category: string;
    motivation: string;
    communityImpact: string;
    portfolioUrl?: string;
  }) => void;
  onRevokeVerification?: () => void;
}

export const AmbassadorVerificationModal: React.FC<AmbassadorVerificationModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onApproveVerification,
  onRevokeVerification
}) => {
  const [step, setStep] = useState<'info' | 'form' | 'reviewing' | 'success'>('info');

  // Form fields
  const [fullName, setFullName] = useState(currentUser.name);
  const [category, setCategory] = useState('Impacto Socioambiental & Clima');
  const [motivation, setMotivation] = useState(
    'Quero mobilizar jovens e vizinhos da minha cidade para projetos colaborativos de impacto real, fortalecendo a rede Nós BR no meu estado.'
  );
  const [communityImpact, setCommunityImpact] = useState(
    'Coordeno ações comunitárias de plantio agroecológico e rodas de troca de conhecimento no Rio de Janeiro.'
  );
  const [portfolioUrl, setPortfolioUrl] = useState('https://instagram.com/' + currentUser.handle.replace('@', ''));
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!isOpen) return null;

  const hashtag = getLocationHashtag(currentUser.cidade, currentUser.uf);
  const isAlreadyVerified = currentUser.isVerified;

  const handleStartApplication = () => {
    setStep('form');
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;

    setStep('reviewing');

    // Simulate community validation checks
    setTimeout(() => {
      onApproveVerification({
        category,
        motivation,
        communityImpact,
        portfolioUrl
      });
      setStep('success');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-stone-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-1.5 font-display">
                <span>Verificação de Embaixador da Comunidade</span>
                <VerifiedBadge size="sm" />
              </h3>
              <p className="text-[11px] text-stone-500">
                Selo azul oficial para lideranças ativas no Nós BR
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          {/* STATE 0: ALREADY VERIFIED */}
          {isAlreadyVerified && step === 'info' ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 rounded-full bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-400 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/10">
                <VerifiedBadge size="lg" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-1.5 text-base font-bold text-stone-900 dark:text-stone-100">
                  <span>{currentUser.name}</span>
                  <VerifiedBadge size="md" />
                </div>
                <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {hashtag} · {currentUser.cidade}, {currentUser.uf}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 pt-2">
                  Você é um(a) <strong>Embaixador(a) da Comunidade Verificado(a)</strong>. Seu selo azul é exibido ao lado do seu nome de usuário em publicações, stories, reels, comentários e projetos no Nós BR.
                </p>
              </div>

              {/* Verified Perks Card */}
              <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40 text-left space-y-2 text-xs">
                <div className="font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-sky-500" />
                  <span>Benefícios Ativos do Embaixador:</span>
                </div>
                <ul className="space-y-1.5 text-stone-700 dark:text-stone-300 pl-5 list-disc">
                  <li>Selo azul de notoriedade e confiança ao lado do nome em todo o aplicativo</li>
                  <li>Prioridade no feed e destaque de projetos colaborativos na sua cidade</li>
                  <li>Representante oficial para moderação e acolhimento de novos membros em {currentUser.cidade}</li>
                  <li>Canal direto com a equipe fundadora do Nós BR</li>
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-md transition-all text-xs"
                >
                  Continuar Navegando
                </button>
                {onRevokeVerification && (
                  <button
                    type="button"
                    onClick={() => {
                      onRevokeVerification();
                      onClose();
                    }}
                    className="text-stone-400 hover:text-red-500 text-xs font-medium"
                  >
                    Desativar verificação
                  </button>
                )}
              </div>
            </div>
          ) : step === 'info' ? (
            /* STATE 1: INTRO & BENEFITS */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-500/10 via-emerald-500/10 to-transparent border border-sky-200 dark:border-sky-800/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                    Destaque sua liderança regional no Brasil
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                    O selo azul de Embaixador identifica membros confiáveis que mobilizam suas cidades e impulsionam projetos comunitários.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  O que é ser um Embaixador(a) Nós BR?
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 space-y-1">
                    <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 text-xs">
                      <VerifiedBadge size="sm" />
                      <span>Selo Azul Oficial</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      Reconhecimento visual em todo o feed, stories, reels, perfis e comentários.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 space-y-1">
                    <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Voz da Sua Região</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      Lidere o ecossistema comunitário de {currentUser.cidade} e do estado de {currentUser.uf}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirements Checklist */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 space-y-2">
                <h4 className="font-bold text-xs text-stone-800 dark:text-stone-200">
                  Requisitos para Aprovação:
                </h4>
                <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Perfil ativo com localização confirmada ({hashtag})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Atuação comprovada em projetos, mentorias ou ações sociais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Adesão ao código ético de colaboração sem fins lucrativos</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                >
                  Agora Não
                </button>
                <button
                  type="button"
                  onClick={handleStartApplication}
                  className="px-5 py-2.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 text-xs flex items-center gap-1.5"
                >
                  <span>Iniciar Processo de Verificação</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : step === 'form' ? (
            /* STATE 2: FORM */
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Nome Completo ou Nome Social *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Cidade e Estado Representado
                  </label>
                  <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 font-medium flex items-center justify-between">
                    <span>{currentUser.cidade}, {currentUser.uf}</span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{hashtag}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Eixo de Atuação Comunitária *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  >
                    <option value="Impacto Socioambiental & Clima">Impacto Socioambiental & Clima</option>
                    <option value="Educação, Tecnologia & Inclusão">Educação, Tecnologia & Inclusão</option>
                    <option value="Cultura, Música & Arte Brasileira">Cultura, Música & Arte Brasileira</option>
                    <option value="Combate à Fome & Soberania Alimentar">Combate à Fome & Soberania Alimentar</option>
                    <option value="Empreendedorismo & Bioeconomia">Empreendedorismo & Bioeconomia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Iniciativas e Ações Comunitárias Realizadas *
                </label>
                <textarea
                  required
                  rows={2}
                  value={communityImpact}
                  onChange={e => setCommunityImpact(e.target.value)}
                  placeholder="Conte sobre projetos, mutirões, eventos ou mentorias que você já liderou ou participou..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Motivação para ser Embaixador(a) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={motivation}
                  onChange={e => setMotivation(e.target.value)}
                  placeholder="Por que você quer ser uma voz verificada da comunidade Nós BR?"
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Link de Referência / Prova Social (Instagram, LinkedIn, Projeto)
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={e => setPortfolioUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Term acceptance */}
              <label className="flex items-start gap-2.5 pt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={acceptedTerms}
                  onChange={e => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded border-stone-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  Comprometo-me a zelar pela convivência respeitosa, apoiar ações comunitárias na minha região e representar positivamente os valores do Nós BR.
                </span>
              </label>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>

                <button
                  type="submit"
                  disabled={!acceptedTerms}
                  className="px-6 py-2.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white shadow-md shadow-sky-600/20 text-xs flex items-center gap-1.5"
                >
                  <span>Enviar para Validação</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : step === 'reviewing' ? (
            /* STATE 3: REVIEWING ANIMATION */
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-sky-500 border-t-transparent animate-spin mx-auto" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  Validando elegibilidade comunitária...
                </h4>
                <p className="text-xs text-stone-500">
                  Verificando território regional em {currentUser.cidade} e histórico de colaboração
                </p>
              </div>
            </div>
          ) : (
            /* STATE 4: SUCCESS & APPROVED */
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 animate-bounce">
                <VerifiedBadge size="lg" />
              </div>

              <div className="space-y-1.5 max-w-sm mx-auto">
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
                  Parabéns, Embaixador(a)!
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  Sua verificação foi aprovada com sucesso. O <strong>selo azul de Embaixador da Comunidade</strong> já está ativo ao lado do seu nome de usuário em todo o Nós BR.
                </p>
              </div>

              {/* Preview of Verified Username */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-400"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-stone-900 dark:text-stone-100">
                    <span>{currentUser.name}</span>
                    <VerifiedBadge size="sm" />
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {hashtag} · Embaixador(a) Oficial
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/25 text-xs transition-transform active:scale-95"
              >
                Concluir e Ver no App
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
