"use client";

import React from "react";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

export default function AccessPage() {
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
          <h1 className="text-4xl font-slab text-skifer mb-4">Tilgangsstyring Kunde</h1>
          <p className="text-warmbrown text-lg">
            Opprette kunder, adminer, roller og håndtere abonnement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">👥 Kunder</h3>
            <p className="text-warmbrown mb-4">Administrer kundeorganisasjoner</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se kunder
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">🔐 Roller</h3>
            <p className="text-warmbrown mb-4">Håndter brukerroller og tilganger</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se roller
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">💳 Abonnement</h3>
            <p className="text-warmbrown mb-4">Håndter betalinger og planer</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se abonnement
            </PrimaryButton>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
          <h2 className="text-2xl font-slab text-skifer mb-4">📊 Tilgangsoversikt</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">24</div>
              <div className="text-warmbrown">Aktive kunder</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">156</div>
              <div className="text-warmbrown">Brukere</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">5</div>
              <div className="text-warmbrown">Rolletyper</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">98%</div>
              <div className="text-warmbrown">Oppetid</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 