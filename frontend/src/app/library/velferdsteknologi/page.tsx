'use client';

import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import EiraAgent from '@/components/EiraAgent';

const technologies = [
  {
    title: "Termometer",
    description: "Digital temperaturmåling og overvåking",
    icon: "🌡️",
    roles: ["Superbruker", "Alt helsepersonell"],
  },
  {
    title: "Personvekter",
    description: "Digital vektmåling og oppfølging",
    icon: "⚖️",
    roles: ["Superbruker", "Alt helsepersonell"],
  },
  {
    title: "Medisindispensere",
    description: "Automatisk medisinutdeling og påminnelser",
    icon: "💊",
    roles: ["Superbruker", "Alt helsepersonell"],
  },
  {
    title: "Lokaliseringsteknologi",
    description: "GPS og sporingssystemer for trygghet",
    icon: "📍",
    roles: ["Superbruker", "Alt helsepersonell"],
  },
  {
    title: "Logistikk",
    description: "Digital planlegging og ressursstyring",
    icon: "📦",
    roles: ["Superbruker", "Alt helsepersonell"],
  },
  {
    title: "Kommunikasjon",
    description: "Digitale kommunikasjonsløsninger",
    icon: "💬",
    roles: ["Superbruker", "Alt helsepersonell"],
  },
  {
    title: "Digitalt tilsyn",
    description: "Sensorbasert overvåking og varsling",
    icon: "👁️",
    roles: ["Superbruker", "Alt helsepersonell"],
  },
  {
    title: "Blodsukkermålere",
    description: "Digital diabetesoppfølging",
    icon: "🩸",
    roles: ["Superbruker", "Alt helsepersonell"],
  },
  {
    title: "Alarmsystem",
    description: "Trygghetsalarmer og varslingssystemer",
    icon: "🚨",
    roles: ["Superbruker", "Alt helsepersonell"],
  },
  {
    title: "Aktivitetsmålere",
    description: "Digital aktivitetsregistrering og analyse",
    icon: "⌚",
    roles: ["Superbruker", "Alt helsepersonell"],
  },
];

export default function VelferdsteknologiPage() {
  return (
    <main className="p-8">
      <div className="mb-6">
        <Link href="/library" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Tilbake til biblioteket
        </Link>
        <h1 className="text-3xl font-bold mb-2">Velferdsteknologi</h1>
        <p className="text-gray-600">Teknologiske løsninger for bedre helse og omsorg</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technologies.map((tech) => (
          <ServiceCard
            key={tech.title}
            {...tech}
            href={`/library/velferdsteknologi/${tech.title.toLowerCase().replace(/\s+/g, '-')}`}
          />
        ))}
      </div>

      <EiraAgent context="velferdsteknologi" />
    </main>
  );
} 