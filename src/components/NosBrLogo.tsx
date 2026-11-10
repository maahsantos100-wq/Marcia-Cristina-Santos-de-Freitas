import React from 'react';

interface NosBrLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'only-nos' | 'horizontal';
  showSubtitle?: boolean;
}

export const NosBrLogo: React.FC<NosBrLogoProps> = ({ 
  showSubtitle = true 
}) => {
  return (
    <div className="flex items-center gap-2.5 flex-shrink-0">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-sm border border-emerald-500/30 flex-shrink-0">
        <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="leading-tight text-left">
        <span className="text-lg font-extrabold tracking-tight text-stone-900 dark:text-white block">
          Nós <span className="text-emerald-600 dark:text-emerald-400">BR</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400 block whitespace-nowrap">
            Rede Social Brasil
          </span>
        )}
      </div>
    </div>
  );
};
