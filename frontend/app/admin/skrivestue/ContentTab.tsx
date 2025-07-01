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
    <div className="p-6 space-y-8">
      {/* New Content Section */}
      <section className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
        <h2 className="text-2xl font-bold text-teal-800 mb-6">📝 Ny tekst</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tittel</label>
              <input 
                placeholder="Skriv tittel her..." 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              >
                <option>Ernæring</option>
                <option>Kommunikasjon</option>
                <option>Lovverk</option>
                <option>Teknologi</option>
                <option>Helse</option>
                <option>Utdanning</option>
                <option>Miljø</option>
                <option>Økonomi</option>
                <option>Kultur</option>
                <option>Sport</option>
                <option>Underholdning</option>
                <option>Vitenskap</option>
                <option>Politikk</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Innhold (Markdown)</label>
            <textarea 
              placeholder="Skriv innhold her i Markdown-format..."
              value={contentMd} 
              onChange={e => setContentMd(e.target.value)}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            onClick={saveContent} 
            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            💾 Lagre innhold
          </button>
        </div>
      </section>

      {/* Existing Content Section */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📚 Eksisterende innhold</h3>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.map((c: any) => (
            <div key={c.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800 mb-2">{c.title}</h4>
              <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                {c.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">🏷️ Kategorier</h3>
        <ExistingContentView />
      </section>
    </div>
  );
} 