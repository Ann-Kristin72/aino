"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';

const locations = [
  {
    title: 'Institusjon',
    description: 'Innhold for institusjonelle miljøer',
    icon: '🏥',
    color: 'bg-blue-500',
    backgroundColor: '#3B82F6'
  },
  {
    title: 'Hjemmetjenesten',
    description: 'Innhold for hjemmetjeneste',
    icon: '🏠',
    color: 'bg-green-500',
    backgroundColor: '#10B981'
  },
  {
    title: 'Miljøarbeidertjenesten',
    description: 'Innhold for miljøarbeidertjeneste',
    icon: '🌱',
    color: 'bg-purple-500',
    backgroundColor: '#8B5CF6'
  }
];

function kebabCase(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
}

function titleCase(text: string) {
  return text.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.category as string;
  const categoryTitle = titleCase(categorySlug);

  const handleLocationClick = (location: string) => {
    // Naviger til neste steg med kategori og lokasjon
    router.push(`/skrivestuen/${categorySlug}/${kebabCase(location)}`);
  };

  return (
    <div className="min-h-screen bg-latte p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <span className="mr-2">←</span>
            Tilbake til kategorier
          </button>
          <h1 className="text-4xl font-slab text-skifer mb-2">{categoryTitle}</h1>
          <p className="text-lg text-gray-600">Velg lokasjon for å se relevant innhold</p>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.title}
              onClick={() => handleLocationClick(location.title)}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4"
                  style={{ backgroundColor: location.backgroundColor }}
                >
                  {location.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{location.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{location.description}</p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Velg lokasjon</span>
                <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Om {categoryTitle}</h3>
          <p className="text-gray-600">
            Velg den lokasjonen som passer best for ditt arbeidsmiljø. 
            Innholdet vil bli tilpasset til de spesifikke behovene og utfordringene 
            som er unike for hver type tjeneste.
          </p>
        </div>
      </div>
    </div>
  );
} 