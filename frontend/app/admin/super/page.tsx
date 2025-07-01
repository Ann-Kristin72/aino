"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getAdmins } from "@/lib/api/admins";
import AdminCard from "@/components/AdminCard";
import AdminModuleCard from "@/components/admin/AdminCard";
import PrimaryButton from "@/components/PrimaryButton";
import Spinner from "@/components/Spinner";

interface Admin {
  id: string;
  name: string;
  email: string;
}

const adminCards = [
  {
    title: "Kvalitetssystem",
    description: "Lagre, oppdatere og distribuere prosedyrer, kurs og nanoer.",
    href: "/admin/quality",
    colorClass: "bg-orange-500",
  },
  {
    title: "Oppgavedeling",
    description: "Fordele arbeid, spore progresjon, status og frister.",
    href: "/admin/tasks",
    colorClass: "bg-teal-600",
  },
  {
    title: "Sikker kommunikasjon",
    description: "Kontrollert intern dialog, journalnotat og meldingsutveksling.",
    href: "/admin/communication",
    colorClass: "bg-emerald-700",
  },
  {
    title: "Prosessveiledning (Teknotassen)",
    description: "Eira veileder ansatte i bruk av teknologi — minimerer feil.",
    href: "/admin/assistant",
    colorClass: "bg-lime-500",
  },
  {
    title: "Tilgangsstyring Kunde",
    description: "Opprette kunder, adminer, roller og håndtere abonnement.",
    href: "/admin/access",
    colorClass: "bg-sky-600",
  },
  {
    title: "SkriveStuen",
    description: "Rediger innhold og media i rolig kaffestemning ☕",
    href: "/admin/skrivestue?tab=writer",
    colorClass: "bg-cyan-800",
  },
];

export default function SuperAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  const { data: admins, isLoading, error } = useQuery<Admin[]>({
    queryKey: ["admins"],
    queryFn: getAdmins,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, roleId: Number(roleId) }),
      });
      if (!res.ok) throw new Error("Kunne ikke opprette admin");
      setSuccess("Admin opprettet!");
      setName("");
      setEmail("");
      setRoleId(roles[0]?.id?.toString() || "");
    } catch (err) {
      setErrorMsg("Feil: Kunne ikke opprette admin");
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading admins</div>;

  const filteredAdmins = admins?.filter((admin: Admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-latte p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-slab text-skifer mb-8">🧠 Hovedredaktørpanel</h1>
        
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
          <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Lukk skjema" : "Legg til ny admin"}
          </PrimaryButton>
        </div>

        {showForm && (
          <form className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-md" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-4">Registrer ny admin</h3>
            <div className="mb-4">
              <label className="block mb-1">Navn</label>
              <input type="text" className="w-full border p-2 rounded" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">E-post</label>
              <input type="email" className="w-full border p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Rolle</label>
              <select className="w-full border p-2 rounded" value={roleId} onChange={e => setRoleId(e.target.value)} required>
                <option value="">Velg rolle</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-bluegreen text-white px-4 py-2 rounded hover:bg-bluegreen/90">Opprett admin</button>
            {success && <div className="mt-2 text-green-600">{success}</div>}
            {errorMsg && <div className="mt-2 text-red-600">{errorMsg}</div>}
          </form>
        )}

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-skifer mb-6">🎯 Kjernefunksjoner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {adminCards.map((card) => (
              <AdminModuleCard key={card.href} {...card} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 