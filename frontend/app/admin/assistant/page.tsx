"use client";

import * as React from "react";
import Link from "next/link";
import PrimaryButton from "../../../components/PrimaryButton";

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-latte p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/min-aino"
            className="text-bluegreen hover:text-bluegreen/80 mb-4 inline-block"
          >
            ← Tilbake til Min Aino
          </Link>
          <h1 className="text-4xl font-slab text-skifer mb-4">Prosessveiledning (Teknotassen)</h1>
          <p className="text-warmbrown text-lg">
            Eira veileder ansatte i bruk av teknologi — minimerer feil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">🤖 Eira Assistent</h3>
            <p className="text-warmbrown mb-4">AI-drevet veiledning og støtte</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Start Eira
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">📋 Sjekklister</h3>
            <p className="text-warmbrown mb-4">Teknologibibliotek med prosesser</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se sjekklister
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">⚙️ Prosess-stier</h3>
            <p className="text-warmbrown mb-4">ROS, DPIA, samtykke og mer</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se prosesser
            </PrimaryButton>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
          <h2 className="text-2xl font-slab text-skifer mb-4">📊 Teknotassen Oversikt</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">89</div>
              <div className="text-warmbrown">Aktive veiledninger</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">156</div>
              <div className="text-warmbrown">Sjekklister</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">23</div>
              <div className="text-warmbrown">Prosess-stier</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">94%</div>
              <div className="text-warmbrown">Suksessrate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 