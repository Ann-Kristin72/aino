'use client';

export default function KjedeButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex items-center gap-2 bg-joda-orange text-white px-4 py-2 rounded-xl shadow hover:bg-orange-600 transition">
      <svg viewBox="0 0 100 100" className="w-4 h-4 fill-current text-white">
        <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="10" fill="none" />
      </svg>
      {children}
    </button>
  );
} 