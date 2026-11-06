import React, { useState } from 'react';
import { Users2, MessageSquare, Plus, Check, ArrowRight, Sparkles, Flame, Globe2 } from 'lucide-react';
import { NationalHub, User } from '../types';
import { BrazilHeatmapD3 } from './BrazilHeatmapD3';

interface NationalCommunitiesSectionProps {
  hubs: NationalHub[];
  currentUser: User;
  onToggleJoinHub: (hubId: string) => void;
  onSelectState?: (uf: string) => void;
}

export const NationalCommunitiesSection: React.FC<NationalCommunitiesSectionProps> = ({
  hubs,
  currentUser,
  onToggleJoinHub,
  onSelectState
}) => {
  const [selectedUf, setSelectedUf] = useState<string | undefined>(currentUser.uf);

  const handleStateClick = (uf: string) => {
    setSelectedUf(uf);
    if (onSelectState) {
      onSelectState(uf);
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-900 via-stone-900 to-amber-950 p-6 sm:p-7 text-white shadow-xs overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold tracking-wider">
            <Globe2 className="w-4 h-4" />
            <span>COMUNIDADES NACIONAIS & DENSIDADE PELO BRASIL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-white text-balance">
            Mapa de calor comunitário e grupos temáticos de todo o país
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Acompanhe a concentração de membros ativos e eventos em cada estado brasileiro e participe de fóruns nacionais de ponta a ponta.
          </p>
        </div>
      </div>

      {/* D3 Heatmap Component */}
      <section className="space-y-3">
        <BrazilHeatmapD3
          selectedUf={selectedUf}
          onSelectState={handleStateClick}
        />
      </section>

      {/* Thematic National Hubs Section */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-display text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Users2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <span>Grupos & Comunidades Temáticas do Brasil</span>
            </h3>
            <p className="text-xs text-stone-500">
              Espaços de discussão e colaboração entre membros de todas as regiões.
            </p>
          </div>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {hubs.map(hub => {
            return (
              <div
                key={hub.id}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={hub.coverImage}
                      alt={hub.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                        {hub.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-display text-white leading-snug">
                        {hub.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {hub.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                      <span className="flex items-center gap-1 font-mono tabular-nums">
                        <Users2 className="w-3.5 h-3.5 text-emerald-600" />
                        {hub.membersCount.toLocaleString('pt-BR')} membros
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 font-mono tabular-nums">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                        {hub.topicsCount} debates ativos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-stone-50 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">
                    Alcance nacional
                  </span>

                  <button
                    onClick={() => onToggleJoinHub(hub.id)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                      hub.isMember
                        ? 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                        : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {hub.isMember ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Participando ✓</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Participar da Comunidade</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
