"use client";

import React from "react";
import PrimaryButton from "../../../components/PrimaryButton";

export default function QualitySystemPage() {
  return (
    <div className="min-h-screen bg-latte p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <a 
            href="/min-aino"
            className="text-bluegreen hover:text-bluegreen/80 mb-4 inline-block"
          >
            ← Tilbake til Min Aino
          </a>
          <h1 className="text-4xl font-slab text-skifer mb-4">Kvalitetssystem</h1>
          <p className="text-warmbrown text-lg">
            Lagre, oppdatere og distribuere prosedyrer, kurs og nanoer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">📋 Prosedyrer</h3>
            <p className="text-warmbrown mb-4">Håndter og oppdater prosedyrer</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se prosedyrer
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">📚 Kurs</h3>
            <p className="text-warmbrown mb-4">Administrer kurs og opplæring</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se kurs
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">🎯 Nanoer</h3>
            <p className="text-warmbrown mb-4">Korte læringsmomenter</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se nanoer
            </PrimaryButton>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
          <h2 className="text-2xl font-slab text-skifer mb-4">📊 Statistikk</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">24</div>
              <div className="text-warmbrown">Aktive prosedyrer</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">12</div>
              <div className="text-warmbrown">Kurs</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">156</div>
              <div className="text-warmbrown">Nanoer</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">89%</div>
              <div className="text-warmbrown">Oppdatert</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 