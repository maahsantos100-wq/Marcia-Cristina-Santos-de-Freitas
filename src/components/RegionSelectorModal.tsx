import React, { useState } from 'react';
import { X, Check, Globe2, Compass, MapPin } from 'lucide-react';
import { BrazilRegion } from '../types';
import { BRAZIL_STATES } from '../data/seedData';

interface RegionSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRegion: BrazilRegion | 'Todas';
  onSelectRegion: (region: BrazilRegion | 'Todas') => void;
  activeState?: string;
  onSelectState?: (uf: string) => void;
}

export const RegionSelectorModal: React.FC<RegionSelectorModalProps> = ({
  isOpen,
  onClose,
  activeRegion,
  onSelectRegion,
  activeState,
  onSelectState
}) => {
  if (!isOpen) return null;

  const regions: { id: BrazilRegion | 'Todas'; name: string; desc: string; states: string }[] = [
    {
      id: 'Todas',
      name: 'Brasil Inteiro (Nacional)',
      desc: 'Eventos online, fóruns nacionais e conexões de todos os 26 estados + DF',
      states: 'Todos os Estados'
    },
    {
      id: 'Sudeste',
      name: 'Região Sudeste',
      desc: 'Pólos de tecnologia, negócios, inovação e centros culturais',
      states: 'SP, RJ, MG, ES'
    },
    {
      id: 'Nordeste',
      name: 'Região Nordeste',
      desc: 'Economia criativa, música, festivais, energia limpa e cultura viva',
      states: 'BA, PE, CE, RN, PB, AL, SE, PI, MA'
    },
    {
      id: 'Sul',
      name: 'Região Sul',
      desc: 'AgroTech, ecossistema de inovação, cooperativismo e indústria',
      states: 'PR, SC, RS'
    },
    {
      id: 'Centro-Oeste',
      name: 'Região Centro-Oeste',
      desc: 'GovTech, políticas públicas em Brasília e inovação no agronegócio',
      states: 'DF, GO, MT, MS'
    },
    {
      id: 'Norte',
      name: 'Região Norte',
      desc: 'Bioeconomia amazônica, biotecnologia e sustentabilidade da floresta',
      states: 'AM, PA, RO, AC, RR, AP, TO'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
              Conexões por Região do Brasil
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3 max-h-[75vh] overflow-y-auto">
          <p className="text-xs text-stone-600 dark:text-stone-400">
            O <strong>Nós BR</strong> conecta o país de ponta a ponta. Escolha ver iniciativas de todo o Brasil ou filtre por uma das macrorregiões:
          </p>

          <div className="space-y-2 pt-1">
            {regions.map(r => {
              const isSelected = activeRegion === r.id;

              return (
                <button
                  key={r.id}
                  onClick={() => {
                    onSelectRegion(r.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-800 dark:text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0">
                      {r.id === 'Todas' ? <Globe2 className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold">{r.name}</p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                        {r.desc}
                      </p>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                        {r.states}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-3 bg-stone-50 dark:bg-stone-900/80 border-t border-stone-200 dark:border-stone-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
