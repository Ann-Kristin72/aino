"use client";
import React, { useState } from "react";

type Admin = {
  id: string;
  name: string;
};

export default function SuperAdminDashboard() {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: "1", name: "Ann-Kristin Johansen" },
    { id: "2", name: "Eirik DevOps" },
  ]);

  const leggTil = () => {
    const ny = prompt("Skriv inn navn eller e-post til ny superadmin:");
    if (ny) {
      setAdmins([...admins, { name: ny, id: crypto.randomUUID() }]);
      alert("Ny superadmin lagt til!");
    }
  };

  const fjern = (id: string) => {
    setAdmins(admins.filter((a) => a.id !== id));
    alert("Superadmin fjernet.");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Superadminer</h2>
      <button
        onClick={leggTil}
                    className="bg-[#4CB6B6] text-white px-4 py-2 rounded hover:bg-[#379e9e]"
      >
        ➕ Legg til superadmin
      </button>
      <ul className="space-y-2">
        {admins.map((admin) => (
          <li
            key={admin.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded"
          >
            <span>{admin.name}</span>
            <button
              onClick={() => fjern(admin.id)}
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