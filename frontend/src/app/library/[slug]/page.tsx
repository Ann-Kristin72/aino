'use client';

import { useParams } from 'next/navigation';
import ServiceCard from '@/components/ServiceCard';
import EiraAgent from '@/components/EiraAgent';
import Link from 'next/link';

const categories = {
  beredskap: {
    title: "Forebygging og beredskap",
    description: "Risiko, tiltak og sikkerhet",
  },
  intro: {
    title: "Introduksjon til nyansatte",
    description: "Startpakke for nye kolleger",
  },
  kommunikasjon: {
    title: "Kommunikasjon",
    description: "Dialog, samspill og samarbeid",
  },
  lovverk: {
    title: "Lovverk",
    description: "Regelverk, rettigheter og ansvar",
  },
  lokasjon: {
    title: "Lokasjon og rom",
    description: "Plassering og fysisk kontekst",
  },
  observasjon: {
    title: "Observasjon og dokumentasjon",
    description: "Oppdage, notere, melde",
  },
  psykiskhelse: {
    title: "Psykisk helse og rus",
    description: "Trygghet, støtte og forståelse",
  },
  smittevern: {
    title: "Smittevern og hygiene",
    description: "Renhet og forebygging",
  },
  sykdommer: {
    title: "Sykdommer og tiltak",
    description: "Tiltak, diagnoser, støtte",
  },
  utviklingshemming: {
    title: "Utviklingshemming",
    description: "Forståelse, tilrettelegging og omsorg",
  },
  livetslutt: {
    title: "Ved livets slutt",
    description: "Palliasjon og verdighet",
  },
  velferdsteknologi: {
    title: "Velferdsteknologi",
    description: "Teknologi i hverdagen",
  },
} as const;

const services = [
  {
    title: "Hjemmetjeneste",
    description: "For deg som jobber i hjemmebaserte tjenester",
    icon: "🏠",
    roles: ["Assistent", "Helsefagarbeider", "Sykepleier", "Fagsykepleier"],
  },
  {
    title: "Institusjon",
    description: "For deg som jobber på sykehjem eller institusjon",
    icon: "🏥",
    roles: ["Assistent", "Helsefagarbeider", "Sykepleier", "Fagsykepleier", "Avdelingsleder"],
  },
  {
    title: "Miljøarbeidertjeneste",
    description: "For deg som jobber med miljøarbeid og habilitering",
    icon: "🌱",
    roles: ["Miljøarbeider", "Vernepleier", "Helsefagarbeider", "Assistent"],
  },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories[slug as keyof typeof categories];

  if (!category) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Kategori ikke funnet</h1>
        <Link href="/library" className="text-blue-500 hover:underline">
          ← Tilbake til biblioteket
        </Link>
      </div>
    );
  }

  return (
    <main className="p-8">
      <div className="mb-6">
        <Link href="/library" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Tilbake til biblioteket
        </Link>
        <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            {...service}
            href={`/library/${slug}/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
          />
        ))}
      </div>

      <EiraAgent context={category.title.toLowerCase()} />
    </main>
  );
} 