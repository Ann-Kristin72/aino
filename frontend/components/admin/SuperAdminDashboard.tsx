"use client";
import { useEffect, useState } from "react";
import AdminErrorBoundary from '../AdminErrorBoundary';
import { z } from 'zod';

interface Redaktør {
  id: number;
  name: string;
  email: string;
  role_id: number;
}

interface Role {
  id: number;
  name: string;
}

const validerRedaktørListe = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    role_id: z.number(),
  })
);

export default function SuperAdminDashboard() {
  const [redaktører, setRedaktører] = useState<Redaktør[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Redaktør | null>(null);

  const hentRedaktører = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admins");
      if (!response.ok) throw new Error('Kunne ikke hente redaktører');
      const data = await response.json();
      
      if (validerRedaktørListe.safeParse(data).success) {
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

  const hentRoller = async () => {
    try {
      const response = await fetch('/api/roles');
      if (!response.ok) throw new Error('Kunne ikke hente roller');
      const data = await response.json();
      setRoles(data);
    } catch (err) {
      console.error('Feil ved henting av roller:', err);
    }
  };

  useEffect(() => {
    hentRedaktører();
    hentRoller();
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    try {
      const response = await fetch('/api/admins', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAdmin),
      });

      if (!response.ok) throw new Error('Kunne ikke oppdatere redaktør');

      const updatedAdmin = await response.json();
      setRedaktører((prev) =>
        prev.map((r) => (r.id === updatedAdmin.id ? updatedAdmin : r))
      );
      setEditingAdmin(null);
    } catch (err) {
      console.error('Feil ved oppdatering av redaktør:', err);
      setError(err instanceof Error ? err.message : 'Ukjent feil');
    }
  };

  const handleRoleChange = async (adminId: number, newRoleId: number) => {
    try {
      const admin = redaktører.find((r) => r.id === adminId);
      if (!admin) return;

      const response = await fetch('/api/admins', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...admin, role_id: newRoleId }),
      });

      if (!response.ok) throw new Error('Kunne ikke oppdatere rolle');

      const updatedAdmin = await response.json();
      setRedaktører((prev) =>
        prev.map((r) => (r.id === updatedAdmin.id ? updatedAdmin : r))
      );
    } catch (err) {
      console.error('Feil ved oppdatering av rolle:', err);
      setError(err instanceof Error ? err.message : 'Ukjent feil');
    }
  };

  if (loading) return <div className="p-4">Laster redaktører...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!Array.isArray(roles) || roles.length === 0) {
    return <p>Kunne ikke laste roller.</p>;
  }

  return (
    <AdminErrorBoundary>
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
                {editingAdmin?.id === redaktør.id ? (
                  <form onSubmit={handleUpdate} className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Navn
                      </label>
                      <input
                        type="text"
                        value={editingAdmin.name}
                        onChange={(e) =>
                          setEditingAdmin((prev) =>
                            prev ? { ...prev, name: e.target.value } : null
                          )
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        E-post
                      </label>
                      <input
                        type="email"
                        value={editingAdmin.email}
                        onChange={(e) =>
                          setEditingAdmin((prev) =>
                            prev ? { ...prev, email: e.target.value } : null
                          )
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Lagre
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingAdmin(null)}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Avbryt
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div>
                      <span className="font-medium">{redaktør.name}</span>
                      <span className="text-gray-500 ml-2">({redaktør.email})</span>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Rolle
                      </label>
                      <select
                        value={redaktør.role_id}
                        onChange={(e) =>
                          handleRoleChange(redaktør.id, Number(e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingAdmin(redaktør)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Rediger
                      </button>
                      <button
                        onClick={() => handleDelete(redaktør.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Slett hovedredaktør"
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AdminErrorBoundary>
  );
} 