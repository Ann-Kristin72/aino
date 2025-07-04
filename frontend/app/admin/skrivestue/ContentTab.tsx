"use client";

import React, { useState, useEffect } from "react";
import CategoryCard from "@/components/CategoryCard";
import ExistingContentView from "@/components/ExistingContentView";
import CategoryGrid from '@/components/skrivestuen/CategoryGrid';

export default function ContentTab() {
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

  return (
    <div className="p-6 space-y-8">
      {/* Existing Content Section */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📚 Eksisterende innhold</h3>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.map((c: any) => (
            <div key={c.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
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
        <CategoryGrid />
      </section>
    </div>
  );
} 