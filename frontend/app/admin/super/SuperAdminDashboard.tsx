"use client";

import Link from "next/link";
import ModuleCard from "@/components/ModuleCard";
import React, { useState } from "react";

const modules = [
  {
    title: "Kvalitetssystem",
    path: "/admin/quality",
    description: "Lagre, oppdatere og distribuere prosedyrer, kurs og nanoer.",
  },
  {
    title: "Oppgavedeling",
    path: "/admin/tasks",
    description: "Fordele arbeid, spore progresjon, status og frister.",
  },
  {
    title: "Sikker kommunikasjon",
    path: "/admin/communication",
    description: "Kontrollert intern dialog, journalnotat og meldingsutveksling.",
  },
  {
    title: "Prosessveiledning (Teknotassen)",
    path: "/admin/assistant",
    description: "Eira veileder ansatte i bruk av teknologi — minimerer feil.",
  },
  {
    title: "Tilgangsstyring Kunde",
    path: "/admin/access",
    description: "Opprette kunder, adminer, roller og håndtere abonnement.",
  },
  {
    title: "Bibliotek",
    path: "/admin/library",
    description: "Master-database for maler, prosedyrer, kurs og metadata.",
  },
];

export default function SuperAdminDashboard() {
  const [search, setSearch] = useState("");
  const [editors, setEditors] = useState([
    { id: 1, name: "Ann-Kristin Johansen", email: "annkristin@dynamiskhelse.no" },
    { id: 2, name: "Anne Kat", email: "akjohansen@dynamiskhelse.no" },
    { id: 3, name: "Anna Lena", email: "al@dh.no" },
  ]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const filteredEditors = editors.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
  );

  const addEditor = () => {
    if (!newName || !newEmail) return;
    setEditors([
      ...editors,
      { id: Date.now(), name: newName, email: newEmail },
    ]);
    setNewName("");
    setNewEmail("");
  };

  const removeEditor = (id: number) => {
    setEditors(editors.filter((e) => e.id !== id));
  };

  return (
    <main className="p-8 space-y-12">
      <header>
        <h1 className="text-3xl font-bold mb-4">🗂️ Super Admin Dashboard</h1>
      </header>

      {/* 📌 Hovedredaktører med CRUD */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Hovedredaktører</h2>
        <input
          type="text"
          placeholder="Søk redaktør..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded mb-4 w-full max-w-md"
        />

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Navn"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="email"
            placeholder="E-post"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={addEditor}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Legg til
          </button>
        </div>

        <ul className="space-y-2">
          {filteredEditors.map((editor) => (
            <li
              key={editor.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{editor.name}</p>
                <p className="text-sm text-gray-600">{editor.email}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Administrator
                </span>
                <button
                  onClick={() => removeEditor(editor.id)}
                  className="text-sm text-red-600 underline"
                >
                  Slett
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 📌 6 Modul-kort */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Kjernefunksjoner</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Link key={mod.path} href={mod.path} className="block">
              <ModuleCard title={mod.title} description={mod.description} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
} 