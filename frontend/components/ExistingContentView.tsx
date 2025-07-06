"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

interface Category {
  id: string;
  name: string;
  description?: string | null;
}

const palette = [
  "#F6C177", "#F7A072", "#6DB3A0", "#4A8C8C", "#A3B18A", "#3A6B6C"
];

const ExistingContentView: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Laster kategorier...</div>;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {categories.map((cat, i) => (
        <CategoryCard
          key={cat.id}
          name={cat.name}
          description={cat.description ?? undefined}
          backgroundColor={palette[i % palette.length]}
          onClick={() => console.log("Klikket på kategori:", cat.name)}
        />
      ))}
      <button
        className="rounded-xl border-2 border-dashed border-gray-400 p-6 w-full sm:w-64 m-2 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 transition"
        style={{ minHeight: 120 }}
        aria-label="Legg til ny kategori"
      >
        <span className="text-3xl mb-2">➕</span>
        <span className="font-bold">Legg til ny kategori</span>
      </button>
    </div>
  );
};

export default ExistingContentView; 