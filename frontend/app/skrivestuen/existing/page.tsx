"use client";

import React from 'react';
import CategoryGrid from '@/components/skrivestuen/CategoryGrid';

export default function ExistingCategoriesPage() {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-nunito font-bold mb-8">Eksisterende kategorier</h1>
      <CategoryGrid />
    </div>
  );
} 