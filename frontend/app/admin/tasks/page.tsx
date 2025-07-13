"use client";

import React from "react";
import PrimaryButton from "../../../components/PrimaryButton";

export default function TasksPage() {
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
          <h1 className="text-4xl font-slab text-skifer mb-4">Oppgavedeling</h1>
          <p className="text-warmbrown text-lg">
            Fordele arbeid, spore progresjon, status og frister.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">📝 Oppgaver</h3>
            <p className="text-warmbrown mb-4">Se og administrer oppgaver</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se oppgaver
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">👥 Tildeling</h3>
            <p className="text-warmbrown mb-4">Fordel oppgaver til ansatte</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Tildel oppgaver
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
            <h3 className="text-xl font-slab text-skifer mb-2">📊 Fremdrift</h3>
            <p className="text-warmbrown mb-4">Spor status og fremdrift</p>
            <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
              Se fremdrift
            </PrimaryButton>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-warmbrown">
          <h2 className="text-2xl font-slab text-skifer mb-4">📈 Oversikt</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">42</div>
              <div className="text-warmbrown">Aktive oppgaver</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">18</div>
              <div className="text-warmbrown">Ferdig</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">7</div>
              <div className="text-warmbrown">Forsinket</div>
            </div>
            <div className="text-center p-4 bg-bluegreen/10 rounded-lg">
              <div className="text-2xl font-bold text-bluegreen">73%</div>
              <div className="text-warmbrown">Effektivitet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 