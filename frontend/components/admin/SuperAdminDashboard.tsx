"use client";
import { useEffect, useState } from "react";

type Redaktør = {
  id: number;
  name: string;
  email: string;
};

const validerRedaktør = (data: unknown): data is Redaktør => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  );
};

const validerRedaktørListe = (data: unknown): data is Redaktør[] => {
  return Array.isArray(data) && data.every(validerRedaktør);
};

export default function SuperAdminDashboard() {
  const [redaktører, setRedaktører] = useState<Redaktør[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hentRedaktører = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admins");
      if (!response.ok) throw new Error('Kunne ikke hente redaktører');
      const data = await response.json();
      
      if (validerRedaktørListe(data)) {
        setRedaktører(data);
      } else {
        console.error('Ugyldig data format:', data);
        setRedaktører([]);
      }
    } catch (err) {
      setError('Kunne ikke laste redaktører. Prøv å oppdatere siden.');
      setRedaktører([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hentRedaktører();
  }, []);

  const leggTil = async () => {
    const navn = prompt("Skriv inn navn på ny hovedredaktør:");
    if (!navn) return;

    try {
      setError(null);
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: navn }),
      });

      if (!res.ok) throw new Error("Feil ved oppretting");

      const ny = await res.json();
      setRedaktører((r) => [...r, ny]);
      alert("Ny hovedredaktør lagt til!");
    } catch (err) {
      setError("Kunne ikke legge til hovedredaktør. Vennligst prøv igjen senere.");
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Laster redaktører...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!Array.isArray(redaktører) || redaktører.length === 0) {
    return <div className="p-4">Ingen redaktører funnet</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Hovedredaktører</h2>
      <button
        onClick={leggTil}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Legg til hovedredaktør
      </button>
      <ul className="space-y-2">
        {redaktører.map((redaktør) => (
          <li key={redaktør.id} className="p-2 bg-gray-50 rounded">
            {redaktør.name} ({redaktør.email})
          </li>
        ))}
      </ul>
    </div>
  );
} 