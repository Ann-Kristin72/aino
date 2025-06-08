import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface EiraGuideProps {
  message: string;
  variant?: 'neutral' | 'happy' | 'thinking';
  className?: string;
}

export default function EiraGuide({ 
  message, 
  variant = 'neutral',
  className 
}: EiraGuideProps) {
  return (
    <div className={cn(
      'flex items-center gap-4 p-4 rounded-xl bg-indigo-50',
      'border border-indigo-100',
      className
    )}>
      <Image
        src={`/sprites/eira-${variant}.png`}
        alt="Eira"
        width={40}
        height={40}
        className="rounded-full"
      />
      <p className="text-sm text-indigo-900">{message}</p>
    </div>
  );
} 