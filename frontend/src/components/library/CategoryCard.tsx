'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  color?: string;
  onClick?: () => void;
}

export default function CategoryCard({ 
  title, 
  icon: Icon,
  color = 'bg-slate-50', 
  onClick 
}: CategoryCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onClick) {
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
        'rounded-xl p-4 shadow hover:shadow-lg transition-shadow',
        'focus:outline-none focus:ring-2 focus:ring-slate-300',
        color
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon className="text-3xl w-8 h-8" />
        <h3 className="text-xl font-semibold text-center">{title}</h3>
      </div>
    </div>
  );
} 