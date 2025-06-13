"use client";
import { useState } from "react";

type Redaktør = {
  id: string;
  navn: string;
};

export default function HovedredaktørPanel() {
  const [redaktører, setRedaktører] = useState<Redaktør[]>([
    { id: "1", navn: "Ann-Kristin Johansen" },
    { id: "2", navn: "Eirik DevOps" },
  ]);

  const leggTil = () => {
    const ny = prompt("Skriv inn navn på ny hovedredaktør:");
    if (ny) {
      setRedaktører([...redaktører, { navn: ny, id: crypto.randomUUID() }]);
      alert("Ny hovedredaktør lagt til!");
    }
  };

  const fjern = (id: string) => {
    setRedaktører(redaktører.filter((r) => r.id !== id));
    alert("Hovedredaktør fjernet.");
  };

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
            <span>{r.navn}</span>
            <button
              onClick={() => fjern(r.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Fjern
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 