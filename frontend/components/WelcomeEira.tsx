"use client";

import Image from 'next/image';

export default function WelcomeEira() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F1] to-[#E6F7F4] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Toppseksjon: Logo og tittel */}
        <div className="mb-12">
          <div className="mb-6 flex flex-col items-center">
            <Image
              src="/logo-kjede.png"
              alt="Aino logo"
              width={60}
              height={60}
              className="mx-auto"
              priority
            />
            <span className="sr-only">Aino logo</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-slab text-skifer mb-2">Velkommen til Aino</h1>
          <p className="text-lg text-skifer/80">Din intelligente assistent for innholdsproduksjon</p>
        </div>
        {/* Hovedseksjon: Eira og snakkeboble */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          <Image
            src="/design-guide/eira-neutral-removebg-preview.png"
            alt="Eira figur"
            width={96}
            height={96}
            className="rounded-full shadow-md bg-white"
            priority
          />
          <div className="bg-white border-2 border-joda-teal text-skifer text-lg p-6 rounded-[24px] shadow-md max-w-sm relative before:content-[''] before:absolute before:left-[-12px] before:top-6 before:w-5 before:h-5 before:bg-white before:border-l-2 before:border-b-2 before:border-joda-teal before:rotate-45">
            Hei! Jeg er Eira, din personlige assistent i Aino. Jeg er her for å hjelpe deg med å skape fantastisk innhold og gjøre arbeidet ditt enklere og mer effektivt.
          </div>
        </div>
      </div>
    </div>
  );
} 