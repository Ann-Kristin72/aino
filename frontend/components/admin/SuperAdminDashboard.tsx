"use client";
import { useEffect, useState } from "react";

type Redaktør = {
  id: string;
  name: string;
  email: string;
};

export default function HovedredaktørPanel() {
  const [redaktører, setRedaktører] = useState<Redaktør[]>([]);
  const [laster, setLaster] = useState(true);
  const [feil, setFeil] = useState<string | null>(null);

  useEffect(() => {
    const hentRedaktører = async () => {
      try {
        setFeil(null);
        const res = await fetch("/api/admins");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setRedaktører(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Kunne ikke hente redaktører", err);
        setFeil("Kunne ikke laste inn hovedredaktører. Vennligst prøv igjen senere.");
      } finally {
        setLaster(false);
      }
    };
    hentRedaktører();
  }, []);

  const leggTil = async () => {
    const navn = prompt("Skriv inn navn på ny hovedredaktør:");
    if (!navn) return;

    try {
      setFeil(null);
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
      setFeil("Kunne ikke legge til hovedredaktør. Vennligst prøv igjen senere.");
      console.error(err);
    }
  };

  if (laster) return (
    <div className="p-4">
      <p className="text-gray-600">Laster inn hovedredaktører…</p>
    </div>
  );

  if (feil) return (
    <div className="p-4">
      <p className="text-red-600">{feil}</p>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Hovedredaktører</h2>
      <button
        onClick={leggTil}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Legg til hovedredaktør
      </button>
      {redaktører.length === 0 ? (
        <p className="text-gray-600">Ingen hovedredaktører funnet.</p>
      ) : (
        <ul className="space-y-2">
          {redaktører.map((r) => (
            <li
              key={r.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded"
            >
              <div>
                <span className="font-medium">{r.name}</span>
                <span className="text-sm text-gray-500 block">{r.email}</span>
              </div>
              <span className="text-sm text-gray-500">{r.id.slice(0, 8)}...</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 