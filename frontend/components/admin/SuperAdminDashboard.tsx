"use client";
import { useEffect, useState } from "react";

type Redaktør = {
  id: string;
  name: string;
};

export default function HovedredaktørPanel() {
  const [redaktører, setRedaktører] = useState<Redaktør[]>([]);
  const [laster, setLaster] = useState(true);

  useEffect(() => {
    const hentRedaktører = async () => {
      try {
        const res = await fetch("/api/admins");
        const data = await res.json();
        setRedaktører(data);
      } catch (err) {
        console.error("Kunne ikke hente redaktører", err);
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
      alert("Kunne ikke legge til hovedredaktør.");
      console.error(err);
    }
  };

  if (laster) return <p>Laster inn hovedredaktører…</p>;

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
        {redaktører.map((r) => (
          <li
            key={r.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded"
          >
            <span>{r.name}</span>
            <span className="text-sm text-gray-500">{r.id.slice(0, 8)}...</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 