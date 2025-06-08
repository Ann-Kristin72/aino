'use client';

import React, { KeyboardEvent } from 'react';

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
      className="p-6 border border-blue-400 rounded-lg shadow-sm hover:shadow-md transition bg-white cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl" role="img" aria-label={title}>
          {icon}
        </span>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm opacity-80 text-gray-600">{description}</p>
    </div>
  );
} 