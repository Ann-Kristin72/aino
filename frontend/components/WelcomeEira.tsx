"use client";

import Image from 'next/image';
import SnakkebobleSoft from './SnakkebobleSoft';

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
          En base for kunnskap og mestring🧡
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
        <SnakkebobleSoft>
          <p className="text-center">
            Hei:-) Jeg er Eira, din personge assisten i Aino. Jeg er helt sikker på at vi skal ha det mye gøy, men først nå, hva heter du?
          </p>
        </SnakkebobleSoft>
      </div>
    </div>
  );
} 