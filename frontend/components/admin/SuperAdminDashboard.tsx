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
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Feil ved oppretting");
      }

      const ny = await res.json();
      setRedaktører((r) => [...r, ny]);
      setNewAdmin({ name: "", email: "" });
      alert("Ny hovedredaktør lagt til!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke legge til hovedredaktør");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Er du sikker på at du vil slette denne hovedredaktøren?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admins?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Kunne ikke slette hovedredaktør");
      }

      setRedaktører((r) => r.filter((admin) => admin.id !== id));
      alert("Hovedredaktør slettet!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke slette hovedredaktør");
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Laster redaktører...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Hovedredaktører</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded">
        <h3 className="font-medium">Legg til ny hovedredaktør</h3>
        <div className="space-y-2">
          <input
            type="text"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            placeholder="Navn"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            placeholder="E-post"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Legger til..." : "Legg til hovedredaktør"}
        </button>
      </form>

      <div className="space-y-2">
        {redaktører.length === 0 ? (
          <p className="text-gray-500">Ingen hovedredaktører funnet</p>
        ) : (
          redaktører.map((redaktør) => (
            <div
              key={redaktør.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >
              <div>
                <span className="font-medium">{redaktør.name}</span>
                <span className="text-gray-500 ml-2">({redaktør.email})</span>
              </div>
              <button
                onClick={() => handleDelete(redaktør.id)}
                className="text-red-600 hover:text-red-800"
                title="Slett hovedredaktør"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 