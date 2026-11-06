import React, { useState } from 'react';
import { 
  Lightbulb, 
  Search, 
  Plus, 
  Heart, 
  ArrowRightLeft, 
  MapPin, 
  BookOpen, 
  Share2, 
  Send,
  Video,
  X,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import { KnowledgeItem, User, BrazilRegion } from '../types';
import { getLocationHashtag } from '../utils/hashtag';
import { VerifiedBadge } from './VerifiedBadge';

interface KnowledgeExchangeSectionProps {
  knowledgeItems: KnowledgeItem[];
  currentUser: User;
  activeRegion: BrazilRegion | 'Todas';
  onProposeExchange: (proposalData: {
    knowledgeItem: KnowledgeItem;
    offeredSkill: string;
    proposalMessage: string;
    proposedFormat: string;
  }) => void;
  onCreateKnowledge: (item: Omit<KnowledgeItem, 'id' | 'createdAt' | 'requestsCount' | 'likesCount' | 'likedByUser'>) => void;
  onToggleLikeKnowledge: (id: string) => void;
}

const CATEGORIES: KnowledgeItem['category'][] = [
  'Tecnologia & Programação',
  'Negócios & Startups',
  'Design & Produto',
  'Marketing & Mídia',
  'Música & Áudio',
  'Sustentabilidade & ESG',
  'Idiomas & Comunicação',
  'Gastronomia & Cultura'
];

export const KnowledgeExchangeSection: React.FC<KnowledgeExchangeSectionProps> = ({
  knowledgeItems,
  currentUser,
  activeRegion,
  onProposeExchange,
  onCreateKnowledge,
  onToggleLikeKnowledge
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ensinar' | 'aprender'>('all');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForExchange, setSelectedItemForExchange] = useState<KnowledgeItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Proposal modal fields
  const [mySkillOffered, setMySkillOffered] = useState(currentUser.skillsToTeach[0] || '');
  const [proposalMsg, setProposalMsg] = useState('');
  const [meetingFormat, setMeetingFormat] = useState('Chamada de vídeo online (Google Meet)');
  const [proposalSent, setProposalSent] = useState(false);

  // Filter items
  const filteredItems = knowledgeItems.filter(item => {
    if (activeRegion !== 'Todas' && item.author.regiao !== activeRegion) {
      return false;
    }
    if (activeFilter === 'ensinar' && item.type !== 'ensinar') return false;
    if (activeFilter === 'aprender' && item.type !== 'aprender') return false;
    if (selectedCategory !== 'Todas' && item.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchAuthor = item.author.name.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchAuthor && !matchTags) return false;
    }

    return true;
  });

  const handleSendProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForExchange) return;

    onProposeExchange({
      knowledgeItem: selectedItemForExchange,
      offeredSkill: mySkillOffered || 'Colaboração e mentoria profissional',
      proposalMessage: proposalMsg.trim() || `Olá ${selectedItemForExchange.author.name}! Gostaria de propor uma mentoria e troca de conhecimentos.`,
      proposedFormat: meetingFormat
    });

    setProposalSent(true);
    setTimeout(() => {
      setProposalSent(false);
      setSelectedItemForExchange(null);
    }, 1600);
  };

  const handleCopy = (id: string) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-900 via-stone-900 to-amber-950 p-6 sm:p-7 text-white shadow-xs overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>TROCA DE CONHECIMENTOS & MENTORIAS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-white text-balance">
            Conecte suas habilidades com profissionais de todo o Brasil
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Ofereça mentorias, aprenda novas competências tecnológicas e de negócios e construa pontes entre especialistas de diferentes estados.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar Habilidade ou Pedido de Mentoria</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control bar */}
      <div className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Segmented Filter */}
          <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl shrink-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Todos ({knowledgeItems.length})
            </button>
            <button
              onClick={() => setActiveFilter('ensinar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeFilter === 'ensinar'
                  ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <span>Disponíveis para Ensinar</span>
            </button>
            <button
              onClick={() => setActiveFilter('aprender')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeFilter === 'aprender'
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <span>Buscam Mentoria</span>
            </button>
          </div>

          {/* Search box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar por habilidade, tema, mentor..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Category buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-stone-400 dark:text-stone-500 font-medium whitespace-nowrap shrink-0">
            Áreas:
          </span>
          {['Todas', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
          <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 font-display">
            Nenhuma oportunidade de conhecimento encontrada nesta categoria
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Compartilhe sua experiência profissional ou solicite uma mentoria com a rede Nós BR!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map(item => {
            const isOffer = item.type === 'ensinar';
            const locationHashtag = getLocationHashtag(item.author.cidade, item.author.uf);

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 flex flex-col justify-between hover:border-stone-300 dark:hover:border-stone-700 transition-all shadow-xs"
              >
                <div>
                  {/* Clean unboxed metadata (§1.A) */}
                  <div className="flex items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2.5">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className={`font-semibold ${isOffer ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                        {isOffer ? 'Disponível para Mentoria' : 'Busca Mentoria'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3 text-emerald-600" />
                        {item.format}
                      </span>
                    </div>
                    <span className="shrink-0">{item.createdAt}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display tracking-tight leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* Collaboration Interest Box */}
                  <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-100 dark:border-stone-800 mb-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 dark:text-stone-200">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>{isOffer ? 'Interesse em troca de conhecimentos com:' : 'Oferece em contrapartida:'}</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-normal">
                      {item.exchangeInterest}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400 mb-4">
                    {item.tags.map((tag, idx) => (
                      <span key={idx}>
                        #{tag} {idx < item.tags.length - 1 && <span className="opacity-40">·</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Author lockup and State Hashtag directly below username */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5 truncate">
                    <img
                      src={item.author.avatar}
                      alt={item.author.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate flex items-center gap-1">
                        <span>{item.author.name}</span>
                        {item.author.isVerified && <VerifiedBadge size="xs" />}
                      </p>
                      {/* Location hashtag directly below the username as requested */}
                      <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tight leading-none mt-0.5">
                        {locationHashtag}
                      </p>
                      <span className="text-[10px] text-stone-400">
                        {item.author.cidade} - {item.author.uf} (Região {item.author.regiao})
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onToggleLikeKnowledge(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.likedByUser 
                          ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40' 
                          : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
                      }`}
                      title="Curtir e apoiar"
                    >
                      <Heart className={`w-4 h-4 ${item.likedByUser ? 'fill-rose-600' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleCopy(item.id)}
                      className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg transition-colors"
                      title="Compartilhar"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {item.author.id !== currentUser.id && (
                      <button
                        onClick={() => setSelectedItemForExchange(item)}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg shadow-xs transition-all active:scale-95 whitespace-nowrap"
                      >
                        Conectar & Trocar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Proposal Modal */}
      {selectedItemForExchange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                Proposta de Mentoria & Conexão
              </h3>
              <button
                onClick={() => setSelectedItemForExchange(null)}
                className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {proposalSent ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  Proposta Enviada com Sucesso!
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  {selectedItemForExchange.author.name} ({getLocationHashtag(selectedItemForExchange.author.cidade, selectedItemForExchange.author.uf)}) foi notificado(a) e uma conversa direta foi aberta na aba <strong>Conexões</strong>!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendProposalSubmit} className="p-6 space-y-4">
                <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60">
                  <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    Conectar com {selectedItemForExchange.author.name} ({getLocationHashtag(selectedItemForExchange.author.cidade, selectedItemForExchange.author.uf)})
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                    Tema: {selectedItemForExchange.title}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 mb-1">
                    Qual conhecimento ou competência você oferece em contrapartida?
                  </label>
                  <select
                    value={mySkillOffered}
                    onChange={e => setMySkillOffered(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  >
                    {currentUser.skillsToTeach.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                    <option value="Colaboração profissional e networking">
                      Colaboração profissional e networking estratégico
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 mb-1">
                    Mensagem de apresentação & alinhamento:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Olá! Acompanho seus projetos e adoraria agendar uma sessão para trocarmos experiências..."
                    value={proposalMsg}
                    onChange={e => setProposalMsg(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 mb-1">
                    Formato de Encontro Sugerido:
                  </label>
                  <input
                    type="text"
                    value={meetingFormat}
                    onChange={e => setMeetingFormat(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedItemForExchange(null)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm"
                  >
                    Enviar Proposta de Troca
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Create Knowledge Modal */}
      {isCreateModalOpen && (
        <CreateKnowledgeFormModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          currentUser={currentUser}
          onCreateKnowledge={onCreateKnowledge}
        />
      )}
    </div>
  );
};

interface CreateKnowledgeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onCreateKnowledge: (item: Omit<KnowledgeItem, 'id' | 'createdAt' | 'requestsCount' | 'likesCount' | 'likedByUser'>) => void;
}

const CreateKnowledgeFormModal: React.FC<CreateKnowledgeFormModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onCreateKnowledge
}) => {
  const [type, setType] = useState<'ensinar' | 'aprender'>('ensinar');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<KnowledgeItem['category']>('Tecnologia & Programação');
  const [format, setFormat] = useState<KnowledgeItem['format']>('Online (Todo o Brasil)');
  const [exchangeInterest, setExchangeInterest] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onCreateKnowledge({
      title: title.trim(),
      description: description.trim(),
      type,
      category,
      format,
      author: currentUser,
      exchangeInterest: exchangeInterest.trim() || 'Aberto a mentorias e networking profissional',
      tags: tags.length ? tags : ['Conhecimento', category]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
            Compartilhar Habilidade ou Pedido de Mentoria
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Objetivo:
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
              <button
                type="button"
                onClick={() => setType('ensinar')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                  type === 'ensinar'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                💡 Oferecer Mentoria / Ensinar
              </button>
              <button
                type="button"
                onClick={() => setType('aprender')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                  type === 'aprender'
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                🔍 Buscar Mentoria / Aprender
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Título:
            </label>
            <input
              type="text"
              required
              placeholder={type === 'ensinar' ? 'Ex: Mentoria em Arquitetura Cloud e Liderança Técnica' : 'Ex: Busco mentoria em captação de investimento Seed'}
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Área:
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as KnowledgeItem['category'])}
                className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Formato:
              </label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as KnowledgeItem['format'])}
                className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
              >
                <option value="Online (Todo o Brasil)">Online (Todo o Brasil)</option>
                <option value="Mentoria 1-a-1">Mentoria 1-a-1</option>
                <option value="Workshop Prático">Workshop Prático</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Descrição detalhada:
            </label>
            <textarea
              required
              rows={3}
              placeholder="Descreva o que será abordado, qual o nível de profundidade e o público recomendado..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              O que você busca em troca / interesse de colaboração:
            </label>
            <input
              type="text"
              placeholder="Ex: Troca com profissionais de produto, networking ou projetos conjuntos"
              value={exchangeInterest}
              onChange={e => setExchangeInterest(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Tags (separadas por vírgula):
            </label>
            <input
              type="text"
              placeholder="Ex: Inovação, Tech, Startups, Mentoria"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
            />
          </div>

          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
