import { ReactNode } from 'react';

interface BaseCardProps {
  children: ReactNode;
  className?: string;
}

export function BaseCard({ children, className = '' }: BaseCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
} 