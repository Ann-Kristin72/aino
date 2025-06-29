"use client";

import React, { useState, useEffect } from "react";
import CategoryCard from "@/components/CategoryCard";
import ExistingContentView from "@/components/ExistingContentView";

export default function ContentTab() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Ernæring");
  const [contentMd, setContentMd] = useState("");
  const [contents, setContents] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(setContents)
      .catch(error => {
        console.error('Error fetching content:', error);
        setError('Kunne ikke laste innhold. Prøv igjen senere.');
        setContents([]); // fallback til tom liste
      });
  }, []);

  const saveContent = async () => {
    await fetch("/api/content", {
      method: "POST",
      body: JSON.stringify({ title, category, content_md: contentMd }),
      headers: { "Content-Type": "application/json" },
    });
    setTitle(""); setCategory("Ernæring"); setContentMd("");
    const updated = await fetch("/api/content").then(res => res.json());
    setContents(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Ny tekst</h2>
      <input placeholder="Tittel" value={title} onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded mb-2 w-full" />
      <select value={category} onChange={e => setCategory(e.target.value)}
        className="border p-2 rounded mb-2 w-full">
        <option>Ernæring</option>
        <option>Kommunikasjon</option>
        <option>Lovverk</option>
        {/* legg til alle 13 */}
      </select>
      <textarea placeholder="Markdown innhold"
        value={contentMd} onChange={e => setContentMd(e.target.value)}
        className="border p-2 rounded mb-2 w-full h-40" />
      <button onClick={saveContent} className="bg-blue-600 text-white px-4 py-2 rounded">Lagre</button>

      <h3 className="text-lg font-bold mt-6">Alt innhold</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul>
        {contents.map((c: any) => (
          <li key={c.id} className="border p-2 my-2 rounded">
            <strong>{c.title}</strong> — {c.category}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-8 mb-4">Kategorier</h3>
      <ExistingContentView />
    </div>
  );
} 