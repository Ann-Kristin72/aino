"use client";

import Image from 'next/image';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import SnakkebobleAnimated from '../../components/SnakkebobleAnimated';
import SnakkebobleSoft from '../../components/SnakkebobleSoft';
import SnakkebobleVariant from '../../components/SnakkebobleVariant';
import EiraDynamic from '../../components/EiraDynamic';
import KjedeSpinner from '../../components/KjedeSpinner';
import KjedeButton from '../../components/KjedeButton';
import KjedeRibbon from '../../components/KjedeRibbon';

export default function DesignGuide() {
  return (
    <div className="min-h-screen bg-latte p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-skifer mb-8">Aino Design System</h1>
        
        {/* Eira Examples */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-skifer mb-6">Eira - Vår AI-veileder</h2>
          
          {/* Static Eira */}
          <Card className="mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative w-24 h-24">
                <Image
                  src="/design-guide/eira-neutral-removebg-preview.png"
                  alt="Eira - AI Assistant"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-skifer mb-2">Statisk Eira</h3>
                <p className="text-skifer/80">
                  Eira er designet i Pixar-inspirert stil: varm, livlig og uttrykksfull. 
                  Hun møter brukeren med empati og humor, og veileder dem gjennom Aino-plattformen.
                </p>
              </div>
            </div>
          </Card>

          {/* Dynamic Eira */}
          <Card>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-skifer mb-4">Dynamisk Eira med humør-endringer</h3>
              <p className="text-skifer/80 mb-6">
                Klikk på emoji-knappene for å se Eira endre humør med animerte overganger og glød-effekter.
              </p>
              <EiraDynamic />
            </div>
          </Card>
        </section>

        {/* Color Palette */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-skifer mb-6">Fargepalett</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Joda Colors */}
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Joda-farger</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#4CB6B6] rounded-lg"></div>
                  <div>
                    <p className="font-medium text-skifer">Teal</p>
                    <p className="text-sm text-skifer/60">#4CB6B6</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-joda-orange rounded-lg"></div>
                  <div>
                    <p className="font-medium text-skifer">Orange</p>
                    <p className="text-sm text-skifer/60">#F6A96B</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-joda-yellow rounded-lg"></div>
                  <div>
                    <p className="font-medium text-skifer">Yellow</p>
                    <p className="text-sm text-skifer/60">#F6D06B</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-joda-peach rounded-lg"></div>
                  <div>
                    <p className="font-medium text-skifer">Peach</p>
                    <p className="text-sm text-skifer/60">#F6B6A6</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-joda-green rounded-lg"></div>
                  <div>
                    <p className="font-medium text-skifer">Green</p>
                    <p className="text-sm text-skifer/60">#A6C6B6</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-joda-sand rounded-lg"></div>
                  <div>
                    <p className="font-medium text-skifer">Sand</p>
                    <p className="text-sm text-skifer/60">#E6E6C6</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Base Colors */}
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Grunnfarger</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-latte rounded-lg border border-skifer/20"></div>
                  <div>
                    <p className="font-medium text-skifer">Latte</p>
                    <p className="text-sm text-skifer/60">#F5EEE6</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-skifer rounded-lg"></div>
                  <div>
                    <p className="font-medium text-white">Skifer</p>
                    <p className="text-sm text-white/60">#333F48</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-softpink rounded-lg"></div>
                  <div>
                    <p className="font-medium text-skifer">Soft Pink</p>
                    <p className="text-sm text-skifer/60">#F8D9D6</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-bluegreen rounded-lg"></div>
                  <div>
                    <p className="font-medium text-white">Blue Green</p>
                    <p className="text-sm text-white/60">#4AAE9B</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-warmbrown rounded-lg"></div>
                  <div>
                    <p className="font-medium text-white">Warm Brown</p>
                    <p className="text-sm text-white/60">#A67C52</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-skifer mb-6">Typografi</h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-skifer">Heading 1 - Inter Bold</h1>
              <p className="text-sm text-skifer/60">Inter, sans-serif</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-skifer">Heading 2 - Inter Semibold</h2>
              <p className="text-sm text-skifer/60">Inter, sans-serif</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-skifer">Heading 3 - Inter Medium</h3>
              <p className="text-sm text-skifer/60">Inter, sans-serif</p>
            </div>
            <div>
              <p className="text-lg text-skifer">Body text - Inter Regular</p>
              <p className="text-sm text-skifer/60">Inter, sans-serif</p>
            </div>
            <div>
              <p className="text-lg font-slab text-skifer">Slab text - Roboto Slab</p>
              <p className="text-sm text-skifer/60">Roboto Slab, Georgia, serif</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-skifer mb-6">Knapper</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Varianter</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Størrelser</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-skifer mb-6">Kort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-xl font-semibold text-skifer mb-2">Standard kort</h3>
              <p className="text-skifer/80">Dette er et standard kort med skygge og avrundede hjørner.</p>
            </Card>
            <Card className="bg-[#4CB6B6] text-white">
              <h3 className="text-xl font-semibold mb-2">Farget kort</h3>
              <p className="text-white/90">Kort kan ha forskjellige bakgrunnsfarger fra Joda-paletten.</p>
            </Card>
            <Card className="bg-joda-orange text-white">
              <h3 className="text-xl font-semibold mb-2">Orange kort</h3>
              <p className="text-white/90">Et eksempel på et kort med Joda-orange bakgrunn.</p>
            </Card>
          </div>
        </section>

        {/* Speech Bubbles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-skifer mb-6">Snakkebobler</h2>
          <div className="space-y-8">
            {/* Animated Speech Bubble */}
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Animated Speech Bubble</h3>
              <div className="flex justify-center">
                <SnakkebobleAnimated>
                  <p className="text-center">
                    Hei:-) Jeg er Eira, din personge assisten i Aino. Jeg er helt sikker på at vi skal ha det mye gøy, men først nå, hva heter du?
                  </p>
                </SnakkebobleAnimated>
              </div>
            </div>

            {/* Soft Speech Bubble */}
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Soft Speech Bubble</h3>
              <div className="flex justify-center">
                <SnakkebobleSoft>
                  <p className="text-center">
                    Dette er den myke snakkeboblen med glass-effekt og fin skygge.
                  </p>
                </SnakkebobleSoft>
              </div>
            </div>

            {/* Variant Speech Bubbles */}
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Variant Speech Bubbles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex justify-center">
                  <SnakkebobleVariant variant="success">
                    Hei! Du svarte riktig, det var flott gjort 🌟
                  </SnakkebobleVariant>
                </div>
                <div className="flex justify-center">
                  <SnakkebobleVariant variant="warning">
                    Husk å fylle ut navn før du går videre.
                  </SnakkebobleVariant>
                </div>
                <div className="flex justify-center">
                  <SnakkebobleVariant variant="info">
                    Klar til å starte reisen sammen? 💬
                  </SnakkebobleVariant>
                </div>
                <div className="flex justify-center">
                  <SnakkebobleVariant variant="neutral">
                    Dette er en nøytral melding med orange border.
                  </SnakkebobleVariant>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-skifer mb-6">Spacing</h2>
          <div className="space-y-4">
            <div className="bg-[#4CB6B6]/10 p-4 rounded-lg">
              <p className="text-skifer">Standard padding (p-4)</p>
            </div>
            <div className="bg-joda-orange/10 p-6 rounded-lg">
              <p className="text-skifer">Større padding (p-6)</p>
            </div>
            <div className="bg-joda-green/10 p-8 rounded-lg">
              <p className="text-skifer">Stor padding (p-8)</p>
            </div>
          </div>
        </section>

        {/* Animations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-skifer mb-6">Animasjoner</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Fade In</h3>
              <div className="flex justify-center">
                <div className="bg-[#4CB6B6] text-white p-6 rounded-lg animate-fade-in">
                  Dette elementet fader inn med en smooth animasjon
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Fade Pop</h3>
              <div className="flex justify-center">
                <div className="bg-joda-orange text-white p-6 rounded-lg animate-fade-pop">
                  Dette elementet popper inn med scale og fade effekt
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Glow Effect</h3>
              <div className="flex justify-center">
                <div className="bg-joda-green text-white p-6 rounded-lg animate-glow">
                  Dette elementet har en pulserende glød-effekt
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-skifer mb-6">Border Radius</h2>
          <div className="flex flex-wrap gap-6">
            <div className="bg-[#4CB6B6] w-24 h-24 rounded-lg flex items-center justify-center text-white font-medium">
              lg
            </div>
            <div className="bg-joda-orange w-24 h-24 rounded-xl flex items-center justify-center text-white font-medium">
              xl
            </div>
            <div className="bg-joda-green w-24 h-24 rounded-2xl flex items-center justify-center text-white font-medium">
              2xl
            </div>
          </div>
        </section>

        {/* Kjede Components */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-skifer mb-6">Kjede-komponenter</h2>
          <div className="space-y-8">
            {/* Kjede Spinner */}
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Kjede Spinner</h3>
              <p className="text-skifer/80 mb-4">
                En animert spinner med tre ringer i Kjede-farger som roterer og skalerer.
              </p>
              <div className="flex justify-center">
                <KjedeSpinner />
              </div>
            </div>

            {/* Kjede Button */}
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Kjede Button</h3>
              <p className="text-skifer/80 mb-4">
                En knapp med Kjede-orange bakgrunn og sirkulær ikon.
              </p>
              <div className="flex justify-center">
                <KjedeButton>Start Skrivestue</KjedeButton>
              </div>
            </div>

            {/* Kjede Ribbon */}
            <div>
              <h3 className="text-xl font-semibold text-skifer mb-4">Kjede Ribbon</h3>
              <p className="text-skifer/80 mb-4">
                En ribbon med tre fargede prikker og tekst i Roboto Slab font.
              </p>
              <div className="flex justify-center">
                <KjedeRibbon />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 