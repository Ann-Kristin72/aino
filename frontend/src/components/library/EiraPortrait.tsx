'use client';

import React from 'react';

type Props = {
  stage: 'initial' | 'category' | 'role';
};

const messages = {
  initial: "Hva slags fagområde ser du etter?",
  category: "Skal vi se på hvor du jobber ...",
  role: "Supert! Nå er jeg klar med innhold."
};

export default function EiraPortrait({ stage }: Props) {
  return (
    <div className="flex items-start gap-4 p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
      <div className="flex-shrink-0">
        <span role="img" aria-label="Eira" className="text-4xl">
          🤖
        </span>
      </div>
      <div className="flex-grow">
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
          <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-8 border-t-transparent border-r-[16px] border-r-white border-b-8 border-b-transparent"></div>
          <p className="text-gray-800">{messages[stage]}</p>
        </div>
      </div>
    </div>
  );
} 