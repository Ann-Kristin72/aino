"use client";

import React from 'react';
import Image from 'next/image';

interface Unit {
  id: string;
  title: string;
  content: string;
  nanoId: string;
  illustrationUrl?: string;
}

interface UnitFullViewProps {
  unit: Unit;
  onNext: () => void;
  isLast?: boolean;
  eiraActive?: boolean;
}

const EiraTip = ({ text }: { text: string }) => (
  <div className="bg-aino-sand rounded-xl p-3 mt-6 flex items-start gap-3 shadow-md">
    <div className="flex-shrink-0">
      <Image 
        src="/design-guide/eira-thinking.png" 
        width={32} 
        height={32} 
        alt="Eira" 
        className="rounded-full"
      />
    </div>
    <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
  </div>
);

export default function UnitFullView({ 
  unit, 
  onNext, 
  isLast = false, 
  eiraActive = true 
}: UnitFullViewProps) {
  const handleNext = () => {
    // Scroll to top before navigating
    window.scrollTo(0, 0);
    onNext();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header with back button */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="mr-2 text-xl">←</span>
            <span className="text-sm font-medium">Tilbake</span>
          </button>
          <div className="text-sm text-gray-500 font-medium">
            Unit
          </div>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        {/* Illustration section */}
        {unit.illustrationUrl && (
          <div className="relative w-full h-[40vh] min-h-[300px] bg-gray-100">
            <Image
              src={unit.illustrationUrl}
              alt={unit.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content section */}
        <div className="flex-1 px-4 py-6 pb-24">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
            {unit.title}
          </h1>

          {/* HTML content */}
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: unit.content }}
          />

          {/* Eira tip */}
          {eiraActive && (
            <EiraTip 
              text="Hei! Visste du at du kan trykke 'Neste unit' for å lagre fremgangen din og gå videre til neste del av kurset?" 
            />
          )}
        </div>

        {/* Sticky next button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-sm mx-auto">
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLast ? (
                <>
                  <span>🎉</span>
                  Fullfør kurs
                </>
              ) : (
                <>
                  <span>→</span>
                  Neste unit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 