"use client";
import { useState } from "react";

const categories = [
  "Kommunikasjon",
  "Ernæring",
  "Kvalitetssystem",
  "Teknotassen",
  "Oppgavedeling",
  "Statistikk",
  "Innhold og læring",
  "Miljøarbeidertjeneste",
  "Hjemmetjeneste",
  "Institusjon"
];

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState(categories[0]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage("Velg en .md-fil først!");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    const res = await fetch("/api/upload-content", {
      method: "POST",
      body: formData,
    });
    if (res.ok) setMessage("Fil lastet opp!");
    else setMessage("Noe gikk galt under opplasting.");
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Admin: Last opp kursinnhold (.md)</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept=".md"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="border p-2 rounded"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Last opp</button>
      </form>
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  );
} 