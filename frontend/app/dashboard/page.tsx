"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';
import { getAdmins } from "@/lib/api/admins";
import AdminCard from "@/components/AdminCard";
import AdminModuleCard from "@/components/admin/AdminCard";
import PrimaryButton from "@/components/PrimaryButton";
import Spinner from "@/components/Spinner";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

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

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userData');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      // Ingen brukerdata, send til onboarding
      router.push('/');
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  const { data: admins, isLoading: adminsLoading, error } = useQuery<Admin[]>({
    queryKey: ["admins"],
    queryFn: getAdmins,
  });

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    router.push('/');
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-joda-orange"></div>
      </div>
    );
  }

  if (!userData) {
    return null; // Vil redirect til onboarding
  }

  if (adminsLoading) return <Spinner />;
  if (error) return <div>Error loading admins</div>;

  const filteredAdmins = admins?.filter((admin: Admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4E1] via-[#FFF8F1] to-[#E6F7F4]">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-joda-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Image 
                src="/design-guide/logo-kjede.png" 
                alt="Aino logo" 
                width={40} 
                height={40} 
              />
              <h1 className="text-2xl font-slab font-semibold text-skifer">🧠 Hovedredaktørpanel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-skifer/70">
                Velkommen, {userData.name} ({userData.role})
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logg ut
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Management Section */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Søk etter admin..."
            className="w-full p-3 rounded-lg border border-warmbrown bg-white text-skifer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredAdmins?.map((admin: Admin) => (
            <AdminCard 
              key={admin.id} 
              name={admin.name} 
              email={admin.email} 
            />
          ))}
        </div>

        <div className="mb-8">
          <PrimaryButton className="bg-bluegreen hover:bg-bluegreen/90" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Lukk skjema" : "Legg til ny admin"}
          </PrimaryButton>
        </div>

        {showForm && (
          <form className="mb-8 bg-white p-6 rounded-lg shadow-md max-w-md" onSubmit={handleSubmit}>
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

        {/* Core Functions Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-skifer mb-6">🎯 Kjernefunksjoner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {adminCards.map((card) => (
              <AdminModuleCard key={card.href} {...card} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 