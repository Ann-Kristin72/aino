'use client';

import { useState } from 'react';

export default function EiraDynamic() {
  const [mood, setMood] = useState<'neutral' | 'laughing' | 'wink'>('neutral');

  const getImage = () => {
    switch (mood) {
      case 'laughing':
        return '/eira-laugh.png';
      case 'wink':
        return '/eira-wink.png';
      default:
        return '/eira-neutral.png';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={getImage()}
        alt="Eira"
        className={`rounded-full transition-all duration-300 w-48 h-48 ${
          mood !== 'neutral' ? 'animate-glow' : ''
        }`}
      />
      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => setMood('neutral')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          😐
        </button>
        <button 
          onClick={() => setMood('laughing')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          😂
        </button>
        <button 
          onClick={() => setMood('wink')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          😉
        </button>
      </div>
    </div>
  );
} 