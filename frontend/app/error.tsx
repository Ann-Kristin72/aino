"use client";

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-latte p-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-slab text-warmbrown mb-4">Noe gikk galt</h2>
      <button
        className="bg-bluegreen text-white px-4 py-2 rounded-2xl shadow hover:bg-teal-700 transition"
        onClick={() => reset()}
      >
        Prøv igjen
      </button>
    </div>
  );
} 