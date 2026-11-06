import React from 'react';
import { X, Calendar, Lightbulb, BookOpen, Globe2, ArrowRight, HandHeart } from 'lucide-react';

interface CreateActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: 'event' | 'offer-knowledge' | 'seek-knowledge' | 'feed-post' | 'create-project') => void;
}

export const CreateActionModal: React.FC<CreateActionModalProps> = ({
  isOpen,
  onClose,
  onSelectAction
}) => {
  if (!isOpen) return null;

  const actions = [
    {
      id: 'event' as const,
      icon: Calendar,
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      title: 'Criar Evento Nacional ou Regional',
      desc: 'Transmissão online para o país ou encontro presencial em uma capital'
    },
    {
      id: 'offer-knowledge' as const,
      icon: Lightbulb,
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      title: 'Oferecer Mentoria / Conhecimento',
      desc: 'Compartilhe sua experiência em tecnologia, negócios, bioeconomia ou cultura'
    },
    {
      id: 'seek-knowledge' as const,
      icon: BookOpen,
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      title: 'Buscar Mentoria & Troca de Habilidades',
      desc: 'Conecte-se com especialistas de outros estados para acelerar seus projetos'
    },
    {
      id: 'feed-post' as const,
      icon: Globe2,
      color: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300',
      title: 'Publicar no Feed Brasil',
      desc: 'Compartilhe um projeto colaborativo, oportunidade ou reflexão com o país'
    },
    {
      id: 'create-project' as const,
      icon: HandHeart,
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      title: 'Ação Social / Projeto Colaborativo',
      desc: 'Mobilize voluntários e arrecade materiais específicos na sua cidade'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
              Compartilhar no Nós BR
            </h3>
            <p className="text-xs text-stone-500">
              Conectando o Brasil de Norte a Sul
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {actions.map(act => {
            const Icon = act.icon;

            return (
              <button
                key={act.id}
                onClick={() => {
                  onSelectAction(act.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-stone-100 dark:border-stone-800 hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${act.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                      {act.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                      {act.desc}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
