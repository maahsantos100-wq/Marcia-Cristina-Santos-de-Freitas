import React from 'react';

interface VerifiedBadgeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = 'sm',
  className = '',
  showTooltip = true
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <span 
      className={`inline-flex items-center justify-center shrink-0 text-sky-500 align-middle ${className}`}
      title={showTooltip ? 'Embaixador(a) da Comunidade Nós BR · Verificado(a)' : undefined}
    >
      <svg 
        viewBox="0 0 24 24" 
        className={`${sizeClasses[size]} fill-sky-500`}
        aria-label="Embaixador Verificado"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.8l-4.2-4.2 1.41-1.41 2.79 2.79 6.79-6.79 1.41 1.41-8.2 8.2z" />
      </svg>
    </span>
  );
};
