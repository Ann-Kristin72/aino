"use client";

import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-latte flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-card max-w-xl w-full p-8 space-y-6">
        {/* Eira intro-boble */}
        <div className="flex items-center space-x-4">
          <Image
            src="/design-guide/eira-neutral-removebg-preview.png"
            alt="Eira"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <p className="text-skifer font-slab text-lg">
              Jeg er Eira og jeg lover å veilede deg trygt gjennom alt som finnes i Aino.
            </p>
            <p className="text-skifer">Hvem er du?</p>
          </div>
        </div>

        {/* Input-felt */}
        <div className="space-y-4">
          <input placeholder="Navn" className="bg-latte p-3 w-full rounded-xl border border-gray-300 text-skifer" />
          <input placeholder="E-postadresse" className="bg-latte p-3 w-full rounded-xl border border-gray-300 text-skifer" />
          <select className="bg-latte p-3 w-full rounded-xl border border-gray-300 text-skifer">
            <option>Velg rolle</option>
            <option>Superadmin</option>
            <option>Hovedredaktør</option>
            <option>Redaktør</option>
            <option>Prosjektleder</option>
            <option>Sykepleier</option>
            <option>Avdelingsleder</option>
            <option>Helsefagarbeider</option>
            <option>Pleieassistent</option>
          </select>
        </div>

        <Button className="bg-joda-orange text-white w-full hover:bg-orange-600">
          Start reisen med Eira
        </Button>
      </div>
    </div>
  );
} 