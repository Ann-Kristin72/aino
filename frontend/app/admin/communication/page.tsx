"use client";

import React from "react";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

export default function CommunicationPage() {
  return (
    <div className="min-h-screen bg-latte p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/admin/super"
            className="text-bluegreen hover:text-bluegreen/80 mb-4 inline-block"
          >
            ← Tilbake til Admin Dashboard
          </Link>
          <h1 className="text-4xl font-slab text-skifer mb-4">Sikker kommunikasjon</h1>
          <p className="text-warmbrown text-lg">
            Kontrollert intern dialog, journalnotat og meldingsutveksling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">💬 Chat-rom</h3>
            <p className="text-warmbrown mb-4">Sikre samtaler mellom kollegaer</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Åpne chat
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">📝 Journalnotat</h3>
            <p className="text-warmbrown mb-4">Dokumenter viktige samtaler</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se notater
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">🔔 Varsler</h3>
            <p className="text-warmbrown mb-4">Håndter meldingsvarsler</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se varsler
            </PrimaryButton>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
          <h2 className="text-2xl font-slab text-skifer mb-4">📊 Kommunikasjonsovervåking</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">156</div>
              <div className="text-warmbrown">Aktive samtaler</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">23</div>
              <div className="text-warmbrown">Nye meldinger</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">8</div>
              <div className="text-warmbrown">Ventende svar</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">99.9%</div>
              <div className="text-warmbrown">Oppetid</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 