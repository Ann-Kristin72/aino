'use client';

import React, { KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description: string;
  icon: string;
  color?: string;
  onClick: () => void;
};

export default function ServiceTypeCard({ 
  title, 
  description, 
  icon, 
  color = 'bg-yellow-50 border-yellow-400',
  onClick 
}: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'rounded-xl p-6 shadow-sm min-h-[120px]',
        'border-l-4 hover:scale-[1.01] hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-indigo-400',
        'transition-all duration-150',
        color
      )}
    >
      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl text-indigo-600" role="img" aria-label={title}>
          {icon}
        </span>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 opacity-80 mb-3">{description}</p>
      <div className="flex items-center text-sm text-indigo-600 font-medium">
        <span>Velg tjeneste</span>
        <ArrowRight size={16} className="ml-2" />
      </div>
    </div>
  );
} 