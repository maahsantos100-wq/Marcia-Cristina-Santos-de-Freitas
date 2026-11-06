import React from 'react';

interface NosBrLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'knot-only' | 'horizontal';
  showSubtitle?: boolean;
}

export const NosBrLogo: React.FC<NosBrLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  showSubtitle = false
}) => {
  const logoSrc = '/src/assets/images/nosbr_logo_oficial_1793850959988.jpg';

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="relative rounded-2xl overflow-hidden bg-[#faf8f5] dark:bg-stone-900 p-2 shadow-xs border border-stone-200/80 dark:border-stone-800">
          <img
            src={logoSrc}
            alt="Nós BR - O nó que nos une em comunidade"
            className="w-full max-w-[280px] h-auto object-contain mx-auto mix-blend-multiply dark:mix-blend-screen"
            referrerPolicy="no-referrer"
          />
        </div>
        {showSubtitle && (
          <p className="mt-2 text-xs font-medium text-stone-500 dark:text-stone-400">
            Conectando o Brasil de Norte a Sul através de eventos e conhecimentos
          </p>
        )}
      </div>
    );
  }

  if (variant === 'knot-only') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        {/* Vector representation of the intertwined green & gold knot */}
        <svg
          viewBox="0 0 100 50"
          className="w-full h-full fill-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal Green ropes */}
          <path d="M 0 18 L 36 18" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <path d="M 0 32 L 36 32" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          
          {/* Horizontal Gold ropes */}
          <path d="M 64 18 L 100 18" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
          <path d="M 64 32 L 100 32" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />

          {/* Intertwined Loops */}
          <ellipse cx="44" cy="25" rx="14" ry="14" stroke="#15803d" strokeWidth="5.5" strokeDasharray="3 2" />
          <ellipse cx="56" cy="25" rx="14" ry="14" stroke="#eab308" strokeWidth="5.5" strokeDasharray="3 2" />

          {/* Knot core weaves */}
          <path d="M 36 18 Q 48 10 56 25 Q 64 40 44 40 Q 32 32 44 25" stroke="#166534" strokeWidth="4" fill="none" />
          <path d="M 64 18 Q 52 10 44 25 Q 36 40 56 40 Q 68 32 56 25" stroke="#ca8a04" strokeWidth="4" fill="none" />
        </svg>
      </div>
    );
  }

  // Horizontal variant (Ideal for Top Bar Navigation)
  const sizeMap = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
    xl: 'h-16'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${sizeMap[size]} aspect-[2/1] rounded-lg bg-[#faf8f5] dark:bg-stone-800 p-0.5 flex items-center justify-center border border-stone-200/60 dark:border-stone-700/60 overflow-hidden shrink-0`}>
        <img
          src={logoSrc}
          alt="Nós BR"
          className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-screen scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-serif leading-none">
          Nós <span className="text-emerald-700 dark:text-emerald-400 font-sans font-extrabold">BR</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] text-stone-500 dark:text-stone-400 leading-tight">
            Rede Social Brasil
          </span>
        )}
      </div>
    </div>
  );
};
