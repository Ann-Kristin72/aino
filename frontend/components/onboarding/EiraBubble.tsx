"use client";

import React from 'react';

interface EiraBubbleProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function EiraBubble({ text, delay = 0, className = "" }: EiraBubbleProps) {
  return (
    <div
      className={`bg-pink-100 text-gray-800 rounded-xl p-6 shadow-lg max-w-md mx-auto animate-fade-in ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationFillMode: 'both'
      }}
    >
      <div className="relative">
        <p className="text-lg leading-relaxed">{text}</p>
        {/* Speech bubble tail */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-pink-100 transform rotate-45"></div>
      </div>
    </div>
  );
} 