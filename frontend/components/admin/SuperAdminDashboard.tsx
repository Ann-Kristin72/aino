"use client";
import React from "react";
import ModuleCard from "../ModuleCard";
import { useRouter } from "next/navigation";

const modules = [
  {
    title: "Kvalitetssystem",
    description: "Se og rediger prosedyrer, nanoer, units.",
    path: "/admin/quality",
  },
  {
    title: "Oppgavedeling",
    description: "Fordel oppgaver og ansvar til ansatte.",
    path: "/admin/tasks",
  },
  {
    title: "Sikker kommunikasjon",
    description: "Administrer meldingsflyt og varsler.",
    path: "/admin/communication",
  },
  {
    title: "Velferdsteknologi",
    description: "Digital prosessveileder og teknologioversikt.",
    path: "/admin/welfare",
  },
  {
    title: "Rapporter & Analytics",
    description: "Se statistikk og generer rapporter.",
    path: "/admin/reports",
  },
  {
    title: "Tilgangsstyring Kunde",
    description: "Administrer kunder og deres tilganger.",
    path: "/admin/access",
  },
];

export default function SuperAdminDashboard() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
      {modules.map((mod) => (
        <ModuleCard
          key={mod.title}
          title={mod.title}
          description={mod.description}
          onClick={() => router.push(mod.path)}
        />
      ))}
    </div>
  );
} 