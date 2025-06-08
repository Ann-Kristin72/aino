'use client';

import React, { KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
};

export default function ServiceTypeCard({ title, description, icon, onClick }: Props) {
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
      className="rounded-xl p-4 shadow hover:bg-slate-50 transition-shadow bg-white"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl" role="img" aria-label={title}>
          {icon}
        </span>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 opacity-80 mb-2">{description}</p>
      <div className="flex items-center text-sm text-gray-500">
        <span>Velg tjeneste</span>
        <ArrowRight size={16} className="ml-1" />
      </div>
    </div>
  );
} 