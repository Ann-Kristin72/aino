'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import RoleCard from '@/components/library/RoleCard';
import EiraAgent from '@/components/EiraAgent';

const categories = {
  ernaering: "Ernæring og kosthold",
  beredskap: "Forebygging og beredskap",
  intro: "Introduksjon til nyansatte",
  kommunikasjon: "Kommunikasjon",
  lovverk: "Lovverk",
  lokasjon: "Lokasjon og rom",
  observasjon: "Observasjon og dokumentasjon",
  psykiskhelse: "Psykisk helse og rus",
  smittevern: "Smittevern og hygiene",
  sykdommer: "Sykdommer og tiltak",
  utviklingshemming: "Utviklingshemming",
  livetslutt: "Ved livets slutt",
  velferdsteknologi: "Velferdsteknologi"
} as const;

const services = {
  hjemmetjeneste: "Hjemmetjeneste",
  institusjon: "Institusjon",
  miljoarbeidertjeneste: "Miljøarbeidertjeneste"
} as const;

const roles = [
  {
    title: "Assistent",
    icon: "👤",
  },
  {
    title: "Helsefagarbeider",
    icon: "👨‍⚕️",
  },
  {
    title: "Sykepleier",
    icon: "👩‍⚕️",
  }
];

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = params.service as string;
  
  const categoryTitle = categories[slug as keyof typeof categories];
  const serviceTitle = services[service as keyof typeof services];

  if (!categoryTitle || !serviceTitle) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Side ikke funnet</h1>
        <Link href="/library" className="text-blue-500 hover:underline">
          ← Tilbake til biblioteket
        </Link>
      </div>
    );
  }

  return (
    <main className="p-8">
      <div className="mb-8">
        <Link href={`/library/${slug}`} className="text-blue-500 hover:underline mb-4 inline-block">
          ← Tilbake til {categoryTitle}
        </Link>
        <h1 className="text-3xl font-bold mb-2">
          {categoryTitle} – {serviceTitle}
        </h1>
        <p className="text-gray-600">Velg din rolle for å se relevant innhold</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <RoleCard
            key={role.title}
            {...role}
            href={`/library/${slug}/${service}/${role.title.toLowerCase().replace(/\s+/g, '-')}`}
          />
        ))}
      </div>

      <EiraAgent context={`${categoryTitle.toLowerCase()} for ${serviceTitle.toLowerCase()}`} />
    </main>
  );
} 