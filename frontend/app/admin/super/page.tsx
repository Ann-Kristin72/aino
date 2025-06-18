"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getAdmins } from "@/lib/api/admins";
import AdminCard from "@/components/AdminCard";
import PrimaryButton from "@/components/PrimaryButton";
import Spinner from "@/components/Spinner";
import ModuleCard from "@/components/ModuleCard";

interface Admin {
  id: string;
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
    path: "/admin/skrivestue",
    description: "Rediger innhold og media i rolig kaffestemning ☕",
  },
];

export default function SuperAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: admins, isLoading, error } = useQuery<Admin[]>({
    queryKey: ["admins"],
    queryFn: getAdmins,
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading admins</div>;

  const filteredAdmins = admins?.filter((admin: Admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-latte p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-slab text-skifer mb-8">Admin Dashboard</h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Søk etter admin..."
            className="w-full p-3 rounded-lg border border-warmbrown bg-white text-skifer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdmins?.map((admin: Admin) => (
            <AdminCard 
              key={admin.id} 
              name={admin.name} 
              email={admin.email} 
            />
          ))}
        </div>

        <div className="mt-8">
          <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90">
            Legg til ny admin
          </PrimaryButton>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Kjernefunksjoner</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <Link key={mod.path} href={mod.path} className="block">
                <ModuleCard title={mod.title} description={mod.description} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 