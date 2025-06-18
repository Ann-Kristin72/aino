"use client";

import Link from "next/link";
import ModuleCard from "@/components/ModuleCard";
import React, { useState } from "react";
import AdminCard from '@/components/AdminCard';
import PrimaryButton from '@/components/PrimaryButton';
import Spinner from '@/components/Spinner';
import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "@/lib/api/admins";

interface Editor {
  id: number;
  name: string;
  email: string;
}

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
    title: "SkriveStuen",
    description: "Rediger innhold og media",
    path: "/admin/skrivestue",
  }, 
];

export default function SuperAdminDashboard() {
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const { data: editors = [], isLoading, error } = useQuery({
    queryKey: ['admins'],
    queryFn: getAdmins
  });

  // Logging for debugging
  console.log('React Query State:', { data: editors, isLoading, error });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">
        <p>Noe gikk galt: {error instanceof Error ? error.message : 'Ukjent feil'}</p>
      </div>
    );
  }

  const filteredEditors = editors.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
  );

  const addEditor = async () => {
    if (!newName || !newEmail) return;
    try {
      const response = await fetch('/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });
      if (!response.ok) throw new Error('Failed to add editor');
      const newEditor = await response.json();
      setNewName("");
      setNewEmail("");
      // Note: React Query will automatically refetch the data
    } catch (error) {
      console.error('Error adding editor:', error);
    }
  };

  const removeEditor = async (id: number) => {
    try {
      const response = await fetch(`/api/admins/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove editor');
      // Note: React Query will automatically refetch the data
    } catch (error) {
      console.error('Error removing editor:', error);
    }
  };

  return (
    <main className="p-8 space-y-12 bg-latte text-skifer min-h-screen">
      <header>
        <h1 className="text-3xl font-slab mb-4 text-warmbrown">
          🗂️ Super Admin Dashboard
        </h1>
      </header>

      <section>
        <h2 className="text-xl font-slab text-warmbrown mb-4">Hovedredaktører</h2>

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
            className="bg-bluegreen text-white px-4 py-2 rounded-2xl shadow hover:bg-teal-700 transition"
          >
            Legg til
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEditors.map((editor) => (
            <div key={editor.id} className="flex items-center gap-4">
              <AdminCard name={editor.name} email={editor.email} />
              <PrimaryButton onClick={() => removeEditor(editor.id)}>
                Slett
              </PrimaryButton>
            </div>
          ))}
        </div>
      </section>

      {/* 📌 6 Modul-kort */}
      <section>
        <h2 className="text-xl font-slab text-warmbrown mb-4">Kjernefunksjoner</h2>
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