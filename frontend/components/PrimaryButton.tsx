import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryButton({ children, className = "", ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`px-6 py-3 rounded-xl font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 