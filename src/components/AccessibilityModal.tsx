import React from 'react';
import { 
  X, 
  Eye, 
  Type, 
  Keyboard, 
  RotateCcw, 
  Check, 
  ZoomIn, 
  ZoomOut,
  Sparkles,
  Contrast
} from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontScale: number; // e.g. 100, 115, 130, 145
  onChangeFontScale: (scale: number) => void;
  onResetAccessibility: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  highContrast,
  onToggleHighContrast,
  fontScale,
  onChangeFontScale,
  onResetAccessibility
}) => {
  if (!isOpen) return null;

  const fontOptions = [
    { scale: 100, label: 'Padrão (100%)', desc: '16px base' },
    { scale: 115, label: 'Grande (115%)', desc: '18px base' },
    { scale: 130, label: 'Muito Grande (130%)', desc: '21px base' },
    { scale: 145, label: 'Máxima (145%)', desc: '23px base' }
  ];

  const shortcuts = [
    { keyCombo: 'Alt + C', action: 'Alternar Alto Contraste', desc: 'Aumenta contraste de fundo, texto e bordas' },
    { keyCombo: 'Alt + +', action: 'Aumentar Fonte', desc: 'Aumenta o tamanho de todos os textos' },
    { keyCombo: 'Alt + -', action: 'Diminuir Fonte', desc: 'Reduz o tamanho de todos os textos' },
    { keyCombo: 'Alt + 0', action: 'Redefinir Fonte', desc: 'Restaura a escala padrão (100%)' },
    { keyCombo: 'Alt + A', action: 'Painel Acessibilidade', desc: 'Abre ou fecha esta janela' }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-modal-title"
    >
      <div 
        className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-800/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 id="accessibility-modal-title" className="text-base font-bold text-stone-900 dark:text-stone-100">
                Acessibilidade & Legibilidade
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Ajuste contraste, tamanho de texto ou use atalhos de teclado
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar janela de acessibilidade"
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Section 1: Alto Contraste */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Contrast className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Modo Alto Contraste</span>
                </span>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Reforça bordas, escurece fundos e maximiza nitidez de leitura.
                </p>
              </div>

              <button
                onClick={onToggleHighContrast}
                aria-pressed={highContrast}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                  highContrast ? 'bg-emerald-700' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 text-xs">
              <span className="text-stone-600 dark:text-stone-400">
                Status atual: <strong className="text-stone-900 dark:text-stone-100">{highContrast ? 'Ativado (Alto Contraste)' : 'Desativado (Contraste Normal)'}</strong>
              </span>
              <kbd className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-mono text-[11px] font-bold">
                Alt + C
              </kbd>
            </div>
          </div>

          {/* Section 2: Tamanho da Fonte */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Tamanho da Fonte Global</span>
                </span>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Escala tipográfica proporcional em todas as telas e abas.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onChangeFontScale(Math.max(100, fontScale - 15))}
                  disabled={fontScale <= 100}
                  aria-label="Diminuir tamanho da fonte"
                  className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-xs px-2 min-w-[50px] text-center text-emerald-700 dark:text-emerald-400">
                  {fontScale}%
                </span>
                <button
                  onClick={() => onChangeFontScale(Math.min(145, fontScale + 15))}
                  disabled={fontScale >= 145}
                  aria-label="Aumentar tamanho da fonte"
                  className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Font preset chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {fontOptions.map(opt => (
                <button
                  key={opt.scale}
                  onClick={() => onChangeFontScale(opt.scale)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    fontScale === opt.scale
                      ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                      : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span>{opt.label}</span>
                    {fontScale === opt.scale && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <span className="text-[10px] text-stone-400 block mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 text-xs">
              <span className="text-stone-600 dark:text-stone-400">
                Atalhos rápidos de fonte:
              </span>
              <div className="flex items-center gap-1.5">
                <kbd className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-mono text-[11px] font-bold">
                  Alt +
                </kbd>
                <kbd className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-mono text-[11px] font-bold">
                  Alt -
                </kbd>
                <kbd className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-mono text-[11px] font-bold">
                  Alt 0
                </kbd>
              </div>
            </div>
          </div>

          {/* Section 3: Tabela de Atalhos de Teclado Globais */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Keyboard className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Atalhos de Teclado Globais</span>
            </h4>

            <div className="divide-y divide-stone-100 dark:divide-stone-800 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-white dark:bg-stone-900">
              {shortcuts.map((sc, i) => (
                <div key={i} className="p-3 flex items-center justify-between text-xs gap-3">
                  <div>
                    <strong className="text-stone-900 dark:text-stone-100 block">
                      {sc.action}
                    </strong>
                    <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                      {sc.desc}
                    </span>
                  </div>
                  <kbd className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono font-bold text-stone-800 dark:text-stone-200 shrink-0 shadow-xs">
                    {sc.keyCombo}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Preview Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prévia ao Vivo de Legibilidade</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              &quot;Nós BR conecta o Brasil de Norte a Sul. Este texto reflete as configurações de escala e contraste selecionadas.&quot;
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-800/40 flex items-center justify-between">
          <button
            onClick={onResetAccessibility}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir Padrões</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm"
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
};
