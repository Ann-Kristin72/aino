"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AdminModuleCard from "@/components/admin/AdminCard";
import PrimaryButton from "@/components/PrimaryButton";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const adminCards = [
  {
    title: "Kvalitetssystem",
    description: "Lagre, oppdatere og distribuere prosedyrer, kurs og nanoer.",
    href: "/admin/quality",
    colorClass: "bg-aino-orange",
    backgroundColor: "#FF9F6B",
  },
  {
    title: "Oppgavedeling",
    description: "Fordele arbeid, spore progresjon, status og frister.",
    href: "/admin/tasks",
    colorClass: "bg-aino-teal",
    backgroundColor: "#CBCCAC",
  },
  {
    title: "Sikker kommunikasjon",
    description: "Kontrollert intern dialog, journalnotat og meldingsutveksling.",
    href: "/admin/communication",
    colorClass: "bg-aino-sand",
    backgroundColor: "#549D91",
  },
  {
    title: "Prosessveiledning (Teknotassen)",
    description: "Eira veileder ansatte i bruk av teknologi — minimerer feil.",
    href: "/admin/assistant",
    colorClass: "bg-aino-grønn",
    backgroundColor: "#FDBD5D",
  },
  {
    title: "Tilgangsstyring Kunde",
    description: "Opprette kunder, adminer, roller og håndtere abonnement.",
    href: "/admin/access",
    colorClass: "bg-aino-blågrønn",
    backgroundColor: "#3D897D",
  },
  {
    title: "SkriveStuen",
    description: "Rediger innhold og media i rolig kaffestemning ☕",
    href: "/admin/skrivestue?tab=writer",
    colorClass: "bg-aino-korall",
    backgroundColor: "#76BBB9",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aino-orange"></div>
      </div>
    );
  }

  if (!userData) {
    return null; // Vil redirect til onboarding
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4E1] via-[#FFF8F1] to-[#E6F7F4]">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-aino-teal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Image 
                src="/design-guide/logo-kjede.png" 
                alt="Aino logo" 
                width={40} 
                height={40} 
              />
              <h1 className="text-2xl font-slab font-semibold text-skifer">Min Aino</h1>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-slab text-skifer mb-2">Velkommen tilbake!</h2>
          <p className="text-warmbrown text-lg">
            Her finner du alle dine kjernefunksjoner for å administrere Aino-plattformen.
          </p>
        </div>

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