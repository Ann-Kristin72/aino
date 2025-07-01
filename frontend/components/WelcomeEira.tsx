"use client";

import Image from 'next/image';

export default function WelcomeEira() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-skifer bg-gradient-to-br from-[#FFF4E1] via-[#FFF8F1] to-[#E6F7F4]">
      {/* Logo og tittel */}
      <div className="flex flex-col items-center text-center mb-12">
        <Image 
          src="/design-guide/logo-kjede.png" 
          alt="Aino logo" 
          width={80} 
          height={80} 
          priority
          className="mb-4"
        />
        <h1 className="text-4xl md:text-5xl font-slab mt-4">Velkommen til Aino</h1>
        <p className="text-lg text-skifer/80 mt-2">
          Din digitale assistent for læring og kvalitet i helsetjenesten.
        </p>
      </div>

      {/* Eira og snakkeboble */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <Image
          src="/design-guide/eira-onboarding.png"
          alt="Eira"
          width={250}
          height={250}
          className="rounded-full"
          priority
        />
        <div className="bg-white border-2 border-joda-teal text-skifer text-xl p-6 rounded-[24px] shadow-md max-w-sm relative before:content-[''] before:absolute before:left-[-12px] before:top-6 before:w-5 before:h-5 before:bg-white before:border-l-2 before:border-b-2 before:border-joda-teal before:rotate-45">
          Hei! Jeg er Eira. <br />
          Hva heter du?
        </div>
      </div>
    </div>
  );
} 