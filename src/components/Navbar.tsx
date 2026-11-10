import React, { useState } from 'react';
import { 
  Globe2, 
  Calendar, 
  Lightbulb, 
  Users2, 
  MessageSquare, 
  UserCircle2, 
  Plus, 
  Sun,
  Moon,
  ChevronDown,
  Compass,
  HandHeart,
  Film,
  Search,
  Eye,
  Menu,
  X
} from 'lucide-react';
import { User, BrazilRegion } from '../types';
import { NosBrLogo } from './NosBrLogo';

interface NavbarProps {
  activeTab: 'feed' | 'explorar' | 'reels' | 'eventos' | 'conhecimento' | 'comunidades' | 'projetos' | 'conexoes' | 'perfil';
  setActiveTab: (tab: 'feed' | 'explorar' | 'reels' | 'eventos' | 'conhecimento' | 'comunidades' | 'projetos' | 'conexoes' | 'perfil') => void;
  currentUser: User;
  activeRegion: BrazilRegion | 'Todas';
  onOpenRegionModal: () => void;
  onOpenCreateModal: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  unreadCount: number;
  highContrast?: boolean;
  onToggleHighContrast?: () => void;
  onOpenAccessibilityModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  activeRegion,
  onOpenRegionModal,
  onOpenCreateModal,
  darkMode,
  setDarkMode,
  unreadCount,
  highContrast = false,
  onOpenAccessibilityModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (tab: 'feed' | 'explorar' | 'reels' | 'eventos' | 'conhecimento' | 'comunidades' | 'projetos' | 'conexoes' | 'perfil') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 md:gap-8 h-16">
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => setActiveTab('feed')}
              className="group text-left flex items-center focus:outline-none"
              title="Nós BR - Rede Social Nacional"
            >
              <NosBrLogo size="md" variant="horizontal" showSubtitle={true} />
            </button>

            <button
              onClick={onOpenRegionModal}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors whitespace-nowrap ml-2"
              title="Filtrar por região do Brasil"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {activeRegion === 'Todas' ? 'Brasil Inteiro' : `Região ${activeRegion}`}
              </span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 text-sm font-medium">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'feed'
                  ? 'text-emerald-900 dark:text-emerald-200 bg-stone-100 dark:bg-stone-800 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
              }`}
            >
              <Globe2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('explorar')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'explorar'
                  ? 'text-emerald-900 dark:text-emerald-200 bg-stone-100 dark:bg-stone-800 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
              }`}
            >
              <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Explorar</span>
            </button>

            <button
              onClick={() => setActiveTab('reels')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'reels'
                  ? 'text-emerald-900 dark:text-emerald-200 bg-stone-100 dark:bg-stone-800 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
              }`}
            >
              <Film className="w-4 h-4 text-amber-500" />
              <span>Reels</span>
            </button>

            <button
              onClick={() => setActiveTab('eventos')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'eventos'
                  ? 'text-emerald-900 dark:text-emerald-200 bg-stone-100 dark:bg-stone-800 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Eventos Brasil</span>
            </button>

            <button
              onClick={() => setActiveTab('conhecimento')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'conhecimento'
                  ? 'text-emerald-900 dark:text-emerald-200 bg-stone-100 dark:bg-stone-800 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Troca de Conhecimento</span>
            </button>

            <button
              onClick={() => setActiveTab('comunidades')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'comunidades'
                  ? 'text-emerald-900 dark:text-emerald-200 bg-stone-100 dark:bg-stone-800 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
              }`}
            >
              <Users2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Comunidades</span>
            </button>

            <button
              onClick={() => setActiveTab('projetos')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'projetos'
                  ? 'text-emerald-900 dark:text-emerald-200 bg-stone-100 dark:bg-stone-800 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
              }`}
            >
              <HandHeart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Projetos</span>
            </button>

            <button
              onClick={() => setActiveTab('conexoes')}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'conexoes'
                  ? 'text-emerald-900 dark:text-emerald-200 bg-stone-100 dark:bg-stone-800 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Conexões</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {onOpenAccessibilityModal && (
              <button
                onClick={onOpenAccessibilityModal}
                aria-label="Acessibilidade"
                title="Acessibilidade: Alto Contraste e Tamanho da Fonte"
                className={`relative p-1.5 sm:p-2 rounded-lg transition-colors flex items-center justify-center ${
                  highContrast
                    ? 'bg-amber-400 text-black ring-2 ring-amber-500 font-bold'
                    : 'text-stone-600 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <Eye className="w-4 h-4" />
                {highContrast && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-black rounded-full border border-amber-300" />
                )}
              </button>
            )}

            <button
              onClick={() => setDarkMode(prev => !prev)}
              aria-label="Alternar tema"
              className="p-1.5 sm:p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            <button
              onClick={onOpenRegionModal}
              className="lg:hidden p-1.5 text-emerald-800 dark:text-emerald-300 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
              title="Filtrar por região do Brasil"
            >
              <Compass className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCreateModal}
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Criar / Compartilhar</span>
              <span className="sm:hidden">Criar</span>
            </button>

            <button
              onClick={() => setActiveTab('perfil')}
              className="hidden sm:flex relative items-center gap-2 pl-1 group focus:outline-none"
              title={currentUser.isVerified ? "Meu Perfil (Embaixador Verificado)" : "Meu Perfil Nós BR"}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className={`w-8 h-8 rounded-full object-cover transition-all ${
                  currentUser.isVerified ? 'ring-2 ring-sky-500' : 'ring-2 ring-emerald-700/20 group-hover:ring-emerald-700'
                }`}
                referrerPolicy="no-referrer"
              />
              {currentUser.isVerified && (
                <span className="absolute -bottom-1 -right-0.5 bg-sky-500 text-white rounded-full p-0.5 shadow-sm">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
              aria-label="Mais opções"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-1">
            <button
              onClick={() => handleMobileNav('eventos')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'eventos' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Eventos Brasil</span>
            </button>

            <button
              onClick={() => handleMobileNav('conhecimento')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'conhecimento' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Troca de Conhecimento</span>
            </button>

            <button
              onClick={() => handleMobileNav('comunidades')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'comunidades' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              <Users2 className="w-4 h-4 text-emerald-600" />
              <span>Comunidades</span>
            </button>

            <button
              onClick={() => handleMobileNav('projetos')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'projetos' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              <HandHeart className="w-4 h-4 text-emerald-600" />
              <span>Projetos</span>
            </button>
          </div>
        )}

        <div className="md:hidden flex items-center justify-around py-2 border-t border-stone-200/80 dark:border-stone-800 text-xs">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${
              activeTab === 'feed' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            <Globe2 className="w-5 h-5" />
            <span className="text-[10px]">Início</span>
          </button>

          <button
            onClick={() => setActiveTab('explorar')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${
              activeTab === 'explorar' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px]">Explorar</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="flex flex-col items-center gap-1 py-1 px-2 text-stone-700 dark:text-stone-200"
            title="Criar publicação"
          >
            <div className="w-6 h-6 rounded-lg border-2 border-stone-700 dark:border-stone-200 flex items-center justify-center">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-[10px]">Criar</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${
              activeTab === 'reels' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            <Film className="w-5 h-5" />
            <span className="text-[10px]">Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('conexoes')}
            className={`flex flex-col items-center gap-1 py-1 px-2 relative ${
              activeTab === 'conexoes' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px]">Direct</span>
            {unreadCount > 0 && <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-500" />}
          </button>

          <button
            onClick={() => setActiveTab('perfil')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${
              activeTab === 'perfil' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            <UserCircle2 className="w-5 h-5" />
            <span className="text-[10px]">Perfil</span>
          </button>
        </div>
      </div>
    </header>
  );
};
