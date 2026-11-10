import React from 'react';

export function NosBrLogo() {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-sm">
        Nós
      </div>
      <div className="leading-tight">
        <span className="text-base font-bold tracking-wide block">Nós BR</span>
        <span className="text-[10px] text-gray-500 block whitespace-nowrap">Rede Social Brasil</span>
      </div>
    </div>
  );
}

export default NosBrLogo;
