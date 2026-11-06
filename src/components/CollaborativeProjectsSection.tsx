import React, { useState, useMemo } from 'react';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Plus, 
  Search, 
  CheckCircle, 
  Circle, 
  HandHeart, 
  Sparkles, 
  Send, 
  MessageSquare, 
  X, 
  TrendingUp, 
  Package, 
  Share2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Leaf
} from 'lucide-react';
import { CollaborativeProject, ProjectMaterialItem, User, BrazilRegion } from '../types';
import { BRAZIL_STATES } from '../data/seedData';
import { getLocationHashtag } from '../utils/hashtag';
import { VerifiedBadge } from './VerifiedBadge';

interface CollaborativeProjectsSectionProps {
  projects: CollaborativeProject[];
  currentUser: User;
  activeRegion: BrazilRegion | 'Todas';
  onToggleJoinProject: (projectId: string) => void;
  onContributeMaterial: (projectId: string, materialId: string) => void;
  onCreateProject: (project: Omit<CollaborativeProject, 'id' | 'createdAt' | 'members' | 'updates'>) => void;
  onAddProjectUpdate: (projectId: string, text: string) => void;
  onStartChatWithUser?: (user: User) => void;
}

export const CollaborativeProjectsSection: React.FC<CollaborativeProjectsSectionProps> = ({
  projects,
  currentUser,
  activeRegion,
  onToggleJoinProject,
  onContributeMaterial,
  onCreateProject,
  onAddProjectUpdate,
  onStartChatWithUser
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedState, setSelectedState] = useState<string>('Todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<CollaborativeProject | null>(null);

  // New update text for the detail modal
  const [newUpdateText, setNewUpdateText] = useState('');

  // Categories list
  const categories = [
    'Todas',
    'Meio Ambiente & Clima',
    'Educação & Tecnologia',
    'Combate à Fome & Solidariedade',
    'Cultura & Revitalização Urbana',
    'Saúde & Bem-Estar'
  ];

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(proj => {
      // Macro-region filter (from navbar if not 'Todas')
      if (activeRegion !== 'Todas' && proj.regiao !== activeRegion) {
        return false;
      }

      // State filter
      if (selectedState !== 'Todos' && proj.uf !== selectedState) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'Todas' && proj.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'Todos' && proj.status !== selectedStatus) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = proj.title.toLowerCase().includes(query);
        const matchGoal = proj.goal.toLowerCase().includes(query);
        const matchCity = proj.cidade.toLowerCase().includes(query);
        const matchUf = proj.uf.toLowerCase().includes(query);
        const matchDesc = proj.description.toLowerCase().includes(query);
        const hashtag = getLocationHashtag(proj.cidade, proj.uf).toLowerCase();
        const matchHashtag = hashtag.includes(query);
        if (!matchTitle && !matchGoal && !matchCity && !matchUf && !matchDesc && !matchHashtag) {
          return false;
        }
      }

      return true;
    });
  }, [projects, activeRegion, selectedState, selectedCategory, selectedStatus, searchTerm]);

  // Overall Statistics
  const totalVolunteers = useMemo(() => {
    return projects.reduce((acc, p) => acc + p.members.length, 0);
  }, [projects]);

  const totalMaterialsNeeded = useMemo(() => {
    return projects.reduce((acc, p) => acc + p.materialsNeeded.length, 0);
  }, [projects]);

  const totalMaterialsFulfilled = useMemo(() => {
    return projects.reduce((acc, p) => acc + p.materialsNeeded.filter(m => m.fulfilled).length, 0);
  }, [projects]);

  const activeCitiesCount = useMemo(() => {
    const cities = new Set(projects.map(p => `${p.cidade}-${p.uf}`));
    return cities.size;
  }, [projects]);

  // Keep detail modal updated if project changes in parent
  const activeDetailProject = useMemo(() => {
    if (!selectedProjectForDetail) return null;
    return projects.find(p => p.id === selectedProjectForDetail.id) || selectedProjectForDetail;
  }, [projects, selectedProjectForDetail]);

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDetailProject || !newUpdateText.trim()) return;
    onAddProjectUpdate(activeDetailProject.id, newUpdateText.trim());
    setNewUpdateText('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-700/30">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/60 text-emerald-100 border border-emerald-500/30 backdrop-blur-sm">
            <HandHeart className="w-3.5 h-3.5 text-amber-300" />
            <span>Mobilização Comunitária em Cidades Brasileiras</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Projetos Colaborativos & Ações Sociais
          </h1>

          <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
            Una-se a vizinhos e cidadãos para transformar desafios locais em soluções práticas. 
            Crie grupos de voluntários na sua cidade, ajude com arrecadação de materiais e acompanhe o impacto de cada iniciativa.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Criar Nova Ação Social</span>
            </button>

            <div className="text-xs text-emerald-100/90 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Ações comunitárias 100% colaborativas e sem fins lucrativos</span>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Badges */}
        <div className="mt-8 pt-6 border-t border-emerald-700/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-display">
              {projects.length}
            </div>
            <div className="text-xs text-stone-300 font-medium">Projetos Ativos</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-emerald-300 font-display">
              {totalVolunteers}
            </div>
            <div className="text-xs text-stone-300 font-medium">Voluntários no Grupo</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-display">
              {totalMaterialsFulfilled}/{totalMaterialsNeeded}
            </div>
            <div className="text-xs text-stone-300 font-medium">Materiais Arrecadados</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-emerald-300 font-display">
              {activeCitiesCount}
            </div>
            <div className="text-xs text-stone-300 font-medium">Cidades Mobilizadas</div>
          </div>
        </div>
      </div>

      {/* Controls & Search Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search input */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar ação por título, objetivo, cidade ou #NósNoRio..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* State selector */}
          <div className="md:col-span-3">
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              aria-label="Filtrar por estado brasileiro"
              className="w-full py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="Todos">Todos os 27 Estados (UF)</option>
              {BRAZIL_STATES.map(s => (
                <option key={s.uf} value={s.uf}>
                  {s.uf} - {s.nome} ({s.regiao})
                </option>
              ))}
            </select>
          </div>

          {/* Status selector */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              aria-label="Filtrar por status da ação social"
              className="w-full py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Em Formação">Em Formação (Precisando de voluntários)</option>
              <option value="Em Andamento">Em Andamento (Mutirão ativo)</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>
        </div>

        {/* Category horizontal pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-stone-400 font-semibold uppercase tracking-wider shrink-0 text-[11px] mr-1">
            Temas:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-12 text-center border border-dashed border-stone-300 dark:border-stone-800 space-y-3">
          <Building2 className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-600" />
          <h3 className="text-base font-bold text-stone-700 dark:text-stone-300">
            Nenhuma ação social encontrada para estes filtros
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Seja você o primeiro a criar um grupo na sua cidade para mobilizar vizinhos e apoiar causas importantes.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Ação Social Agora</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(proj => {
            const isUserInGroup = proj.members.some(m => m.id === currentUser.id);
            const leaderHashtag = getLocationHashtag(proj.leader.cidade, proj.leader.uf);
            const projectHashtag = getLocationHashtag(proj.cidade, proj.uf);
            const volunteerProgress = Math.min(100, Math.round((proj.members.length / proj.targetVolunteers) * 100));
            const fulfilledMaterials = proj.materialsNeeded.filter(m => m.fulfilled).length;

            return (
              <div 
                key={proj.id}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                {/* Card Header & Cover Image */}
                <div className="relative h-44 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-stone-950/80 text-emerald-300 backdrop-blur-md border border-emerald-500/30">
                      {proj.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold backdrop-blur-md ${
                      proj.status === 'Em Andamento' 
                        ? 'bg-emerald-600/90 text-white' 
                        : proj.status === 'Em Formação'
                        ? 'bg-amber-600/90 text-white'
                        : 'bg-stone-700/90 text-stone-200'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  {/* City & Hashtag badge on bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1 font-semibold drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{proj.cidade}, {proj.uf}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {projectHashtag}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col space-y-4">
                  {/* Leader Info with State Hashtag right below name */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={proj.leader.avatar}
                        alt={proj.leader.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-600/20"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          <span className="flex items-center gap-1">
                            <span>{proj.leader.name}</span>
                            {proj.leader.isVerified && <VerifiedBadge size="xs" />}
                          </span>
                          {proj.leader.id === currentUser.id && (
                            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                              Você
                            </span>
                          )}
                        </div>
                        {/* Location hashtag directly below leader name */}
                        <div className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                          {leaderHashtag}
                        </div>
                      </div>
                    </div>

                    {onStartChatWithUser && proj.leader.id !== currentUser.id && (
                      <button
                        onClick={() => onStartChatWithUser(proj.leader)}
                        title={`Conversar com líder ${proj.leader.name}`}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Title & Goal */}
                  <div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {proj.title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                      {proj.goal}
                    </p>
                  </div>

                  {/* Meeting date & place */}
                  <div className="space-y-1 bg-stone-50 dark:bg-stone-800/60 p-2.5 rounded-xl text-xs text-stone-600 dark:text-stone-300">
                    <div className="flex items-center gap-1.5 font-medium text-stone-800 dark:text-stone-200">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{proj.meetingDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{proj.meetingLocation}</span>
                    </div>
                  </div>

                  {/* Volunteers Progress */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                        <span>Voluntários no Grupo</span>
                      </span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                        {proj.members.length} / {proj.targetVolunteers} ({volunteerProgress}%)
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${volunteerProgress}%` }}
                      />
                    </div>

                    {/* Members Avatar Avatars Row */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {proj.members.slice(0, 5).map((m, idx) => (
                          <img
                            key={idx}
                            src={m.avatar}
                            alt={m.name}
                            title={`${m.name} (${getLocationHashtag(m.cidade, m.uf)})`}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-stone-900 object-cover"
                          />
                        ))}
                        {proj.members.length > 5 && (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-stone-200 dark:bg-stone-700 text-[10px] font-bold text-stone-700 dark:text-stone-200 ring-2 ring-white dark:ring-stone-900">
                            +{proj.members.length - 5}
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] text-stone-400 font-medium">
                        {proj.targetVolunteers - proj.members.length > 0 
                          ? `Faltam ${proj.targetVolunteers - proj.members.length} voluntários` 
                          : 'Meta atingida!'}
                      </span>
                    </div>
                  </div>

                  {/* Materials Quick Summary */}
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Materiais & Recursos</span>
                      </span>
                      <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                        {fulfilledMaterials} de {proj.materialsNeeded.length} atendidos
                      </span>
                    </div>

                    {/* Preview 2 items */}
                    <div className="space-y-1.5">
                      {proj.materialsNeeded.slice(0, 2).map(mat => (
                        <div 
                          key={mat.id}
                          className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-stone-50 dark:bg-stone-800/40"
                        >
                          <div className="flex items-center gap-1.5 truncate pr-2">
                            {mat.fulfilled ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            )}
                            <span className={`truncate text-[11px] ${mat.fulfilled ? 'line-through text-stone-400' : 'text-stone-700 dark:text-stone-200'}`}>
                              {mat.item}
                            </span>
                          </div>

                          {!mat.fulfilled ? (
                            <button
                              onClick={() => onContributeMaterial(proj.id, mat.id)}
                              className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0 whitespace-nowrap"
                            >
                              Contribuir
                            </button>
                          ) : (
                            <span className="text-[10px] text-stone-400 shrink-0">
                              Atendido
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="mt-auto pt-3 flex items-center gap-2">
                    <button
                      onClick={() => onToggleJoinProject(proj.id)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isUserInGroup
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                      }`}
                    >
                      {isUserInGroup ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>No Grupo</span>
                        </>
                      ) : (
                        <>
                          <Users className="w-3.5 h-3.5" />
                          <span>Entrar no Grupo</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setSelectedProjectForDetail(proj)}
                      className="py-2 px-3 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors flex items-center gap-1"
                      title="Ver mural de atualizações e lista completa de materiais"
                    >
                      <span>Mural</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL: Complete Project view, Materials Contribution, Updates Log */}
      {activeDetailProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 bg-gradient-to-r from-emerald-900 to-stone-900 text-white flex items-start justify-between">
              <div className="space-y-1.5 pr-8">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-white/20 backdrop-blur-sm text-emerald-200">
                    {activeDetailProject.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {getLocationHashtag(activeDetailProject.cidade, activeDetailProject.uf)}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                  {activeDetailProject.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeDetailProject.cidade}, {activeDetailProject.uf} · {activeDetailProject.meetingLocation}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedProjectForDetail(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-stone-800 dark:text-stone-200">
              {/* Leader & Goal */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-3">
                  <img
                    src={activeDetailProject.leader.avatar}
                    alt={activeDetailProject.leader.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-600/30"
                  />
                  <div>
                    <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <span>Líder da Ação: {activeDetailProject.leader.name}</span>
                      {activeDetailProject.leader.isVerified && <VerifiedBadge size="xs" />}
                    </div>
                    {/* Location hashtag directly below leader name */}
                    <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {getLocationHashtag(activeDetailProject.leader.cidade, activeDetailProject.leader.uf)}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {activeDetailProject.leader.headline}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onToggleJoinProject(activeDetailProject.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeDetailProject.members.some(m => m.id === currentUser.id)
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-emerald-700 text-white hover:bg-emerald-800'
                  }`}
                >
                  {activeDetailProject.members.some(m => m.id === currentUser.id) ? 'Você está no Grupo' : 'Entrar no Grupo'}
                </button>
              </div>

              {/* Description & Objective */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Sobre esta Ação Comunitária
                </h4>
                <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {activeDetailProject.description}
                </p>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200">
                  <span className="font-bold">Objetivo Prático: </span>
                  {activeDetailProject.goal}
                </div>
              </div>

              {/* Volunteers in group */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Voluntários Confirmados ({activeDetailProject.members.length} de {activeDetailProject.targetVolunteers})</span>
                  </h4>
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {Math.round((activeDetailProject.members.length / activeDetailProject.targetVolunteers) * 100)}% da meta
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeDetailProject.members.map(member => (
                    <div 
                      key={member.id}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-800"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="truncate flex-1">
                        <div className="text-xs font-bold text-stone-800 dark:text-stone-200 truncate flex items-center gap-1">
                          <span>{member.name}</span>
                          {member.isVerified && <VerifiedBadge size="xs" />}
                        </div>
                        <div className="text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                          {getLocationHashtag(member.cidade, member.uf)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Materials Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-amber-500" />
                    <span>Lista de Materiais Necessários</span>
                  </h4>
                  <span className="text-xs text-stone-500">
                    Clique em &quot;Contribuir&quot; para fornecer um item
                  </span>
                </div>

                <div className="space-y-2">
                  {activeDetailProject.materialsNeeded.map(mat => (
                    <div
                      key={mat.id}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                        mat.fulfilled
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40 text-stone-600 dark:text-stone-400'
                          : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {mat.fulfilled ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-400 shrink-0" />
                        )}
                        <div>
                          <div className={`text-xs font-medium ${mat.fulfilled ? 'line-through text-stone-500' : ''}`}>
                            {mat.item}
                          </div>
                          {mat.fulfilled && mat.contributorName && (
                            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                              <span>Garantido por: {mat.contributorName}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {!mat.fulfilled ? (
                        <button
                          onClick={() => onContributeMaterial(activeDetailProject.id, mat.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-sm"
                        >
                          Vou Levar / Contribuir
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          Confirmado
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Updates & Discussion Mural */}
              <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Mural de Atualizações & Avisos do Grupo</span>
                </h4>

                {/* Form to add an update */}
                <form onSubmit={handlePostUpdate} className="flex gap-2">
                  <input
                    type="text"
                    value={newUpdateText}
                    onChange={e => setNewUpdateText(e.target.value)}
                    placeholder="Compartilhe um aviso ou avanço com o grupo..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={!newUpdateText.trim()}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white disabled:opacity-50 hover:bg-emerald-800 transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Postar</span>
                  </button>
                </form>

                {/* Updates list */}
                <div className="space-y-2.5">
                  {activeDetailProject.updates.map(upd => (
                    <div 
                      key={upd.id}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={upd.author.avatar}
                            alt={upd.author.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="font-bold text-stone-800 dark:text-stone-200">
                            {upd.author.name}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                            {getLocationHashtag(upd.author.cidade, upd.author.uf)}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400">
                          {upd.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 dark:text-stone-300 pl-7 leading-relaxed">
                        {upd.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                Ponto de encontro: <strong className="text-stone-700 dark:text-stone-300">{activeDetailProject.meetingLocation}</strong>
              </span>
              <button
                onClick={() => setSelectedProjectForDetail(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL: Create New Collaborative Social Action */}
      {isCreateModalOpen && (
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          currentUser={currentUser}
          onCreate={projectData => {
            onCreateProject(projectData);
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Subcomponent: Modal to create a new project
interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onCreate: (project: Omit<CollaborativeProject, 'id' | 'createdAt' | 'members' | 'updates'>) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onCreate
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState<CollaborativeProject['category']>('Meio Ambiente & Clima');
  const [cidade, setCidade] = useState(currentUser.cidade || 'Rio de Janeiro');
  const [uf, setUf] = useState(currentUser.uf || 'RJ');
  const [targetVolunteers, setTargetVolunteers] = useState(15);
  const [meetingDate, setMeetingDate] = useState('Próximo Sábado às 09:00');
  const [meetingLocation, setMeetingLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/nosbr_horta_comunitaria_1793850619395.jpg');

  // Materials list
  const [materials, setMaterials] = useState<string[]>([
    'Luvas de proteção e sacos reforçados',
    'Ferramentas manuais para plantio'
  ]);
  const [newMaterialInput, setNewMaterialInput] = useState('');

  if (!isOpen) return null;

  const handleAddMaterial = () => {
    if (newMaterialInput.trim()) {
      setMaterials(prev => [...prev, newMaterialInput.trim()]);
      setNewMaterialInput('');
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setMaterials(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !goal.trim() || !cidade.trim()) return;

    // Find region of selected UF
    const stateObj = BRAZIL_STATES.find(s => s.uf === uf);
    const regiao = (stateObj ? stateObj.regiao : currentUser.regiao) as BrazilRegion;

    const materialsNeeded: ProjectMaterialItem[] = materials.map((item, idx) => ({
      id: `mat-${Date.now()}-${idx}`,
      item,
      fulfilled: false
    }));

    onCreate({
      title: title.trim(),
      description: description.trim() || goal.trim(),
      goal: goal.trim(),
      cidade: cidade.trim(),
      uf,
      regiao,
      category,
      leader: currentUser,
      targetVolunteers: Number(targetVolunteers) || 10,
      materialsNeeded,
      status: 'Em Formação',
      meetingDate: meetingDate.trim(),
      meetingLocation: meetingLocation.trim() || `Praça central de ${cidade.trim()}`,
      image: imageUrl
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-display text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <HandHeart className="w-5 h-5 text-emerald-600" />
              <span>Criar Nova Ação Social / Projeto Colaborativo</span>
            </h3>
            <p className="text-xs text-stone-500">
              Mobilize sua cidade no Nós BR com objetivos claros e lista de materiais
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Nome da Ação Social *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Mutirão de Limpeza e Educação Ambiental na Praia"
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Categoria da Ação *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as CollaborativeProject['category'])}
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Meio Ambiente & Clima">Meio Ambiente & Clima</option>
                <option value="Educação & Tecnologia">Educação & Tecnologia</option>
                <option value="Combate à Fome & Solidariedade">Combate à Fome & Solidariedade</option>
                <option value="Cultura & Revitalização Urbana">Cultura & Revitalização Urbana</option>
                <option value="Saúde & Bem-Estar">Saúde & Bem-Estar</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Meta de Voluntários Necessários
              </label>
              <input
                type="number"
                min="2"
                max="500"
                value={targetVolunteers}
                onChange={e => setTargetVolunteers(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Cidade *
              </label>
              <input
                type="text"
                required
                value={cidade}
                onChange={e => setCidade(e.target.value)}
                placeholder="Ex: Rio de Janeiro, Manaus, Salvador"
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Estado (UF) *
              </label>
              <select
                value={uf}
                onChange={e => setUf(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                {BRAZIL_STATES.map(s => (
                  <option key={s.uf} value={s.uf}>
                    {s.uf} - {s.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Objetivo Concreto da Ação *
            </label>
            <textarea
              required
              rows={2}
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="Ex: Limpar 500m de faixa de areia e distribuir 100 mudas nativas para a comunidade."
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Descrição Detalhada e Instruções
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Explique o que os voluntários devem levar, roupas adequadas e a relevância social."
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Meeting details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Data & Horário do Encontro
              </label>
              <input
                type="text"
                value={meetingDate}
                onChange={e => setMeetingDate(e.target.value)}
                placeholder="Ex: Sábado, 26 de Abril às 09:00"
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                Ponto de Encontro Físico na Cidade
              </label>
              <input
                type="text"
                value={meetingLocation}
                onChange={e => setMeetingLocation(e.target.value)}
                placeholder="Ex: Praça Santos Dumont, Posto 4, etc."
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Dynamic Materials Needed List */}
          <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
            <label className="block font-bold text-stone-700 dark:text-stone-300">
              Materiais Necessários para Arrecadação / Apoio
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMaterialInput}
                onChange={e => setNewMaterialInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddMaterial();
                  }
                }}
                placeholder="Ex: 50 sacos de lixo 100L, 10 galões de água, pincéis..."
                className="flex-1 p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddMaterial}
                className="px-3 py-2 rounded-xl font-bold bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs"
              >
                Adicionar
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {materials.map((mat, i) => (
                <span 
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40 text-[11px]"
                >
                  <span>{mat}</span>
                  <button 
                    type="button"
                    onClick={() => handleRemoveMaterial(i)}
                    className="hover:text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Preset Cover image selector */}
          <div className="space-y-1.5 pt-2">
            <label className="block font-bold text-stone-700 dark:text-stone-300">
              Foto de Capa do Projeto
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { url: '/src/assets/images/nosbr_horta_comunitaria_1793850619395.jpg', label: 'Horta' },
                { url: '/src/assets/images/nosbr_comunidade_roda_1793850617273.jpg', label: 'Comunidade' },
                { url: '/src/assets/images/nosbr_evento_cultural_1793850619532.jpg', label: 'Cultura' },
                { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', label: 'Tecnologia' }
              ].map(preset => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`relative rounded-xl overflow-hidden h-16 border-2 transition-all ${
                    imageUrl === preset.url ? 'border-emerald-600 ring-2 ring-emerald-500/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1 rounded font-bold">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20"
            >
              Lançar Projeto Colaborativo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
