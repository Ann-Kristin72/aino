'use client';

import React from 'react';

type Props = {
  context?: string;
};

export default function EiraAgent({ context }: Props) {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <span role="img" aria-label="Eira" className="text-4xl">
            🤖
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            Hei! Jeg er Eira, din AI-assistent
          </h3>
          <p className="text-gray-600">
            {context ? (
              <>Jeg kan hjelpe deg med å finne relevant innhold om {context}. Spør meg om:</>
            ) : (
              <>Jeg kan hjelpe deg med å finne relevant innhold. Spør meg om:</>
            )}
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Prosedyrer og retningslinjer
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Praktiske tips og råd
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Relevant fagstoff og forskning
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 