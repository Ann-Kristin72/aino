"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { titleCase } from '@/lib/utils';

// Definerer målbrukere basert på roller
const targetUsers = [
  {
    id: 'pleieassistenter',
    name: 'Pleieassistenter',
    description: 'Innhold tilpasset for pleieassistenter',
    icon: '👥',
    color: 'bg-blue-500'
  },
  {
    id: 'helsefagarbeidere',
    name: 'Helsefagarbeidere',
    description: 'Innhold tilpasset for helsefagarbeidere',
    icon: '🏥',
    color: 'bg-green-500'
  },
  {
    id: 'sykepleiere',
    name: 'Sykepleiere',
    description: 'Innhold tilpasset for sykepleiere',
    icon: '⚕️',
    color: 'bg-purple-500'
  },
  {
    id: 'fagsykepleiere',
    name: 'Fagsykepleiere',
    description: 'Innhold tilpasset for fagsykepleiere',
    icon: '🎓',
    color: 'bg-indigo-500'
  },
  {
    id: 'avdelingsledere',
    name: 'Avdelingsledere',
    description: 'Innhold tilpasset for avdelingsledere',
    icon: '👔',
    color: 'bg-orange-500'
  },
  {
    id: 'prosjektledere',
    name: 'Prosjektledere',
    description: 'Innhold tilpasset for prosjektledere',
    icon: '📊',
    color: 'bg-teal-500'
  }
];

export default function CategoryLocationPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.category as string;
  const locationSlug = params.location as string;
  const categoryTitle = titleCase(categorySlug);
  const locationTitle = titleCase(locationSlug);

  const handleTargetUserClick = (targetUserId: string) => {
    router.push(`/skrivestuen/${categorySlug}/${locationSlug}/${targetUserId}`);
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
            Tilbake til lokasjoner
          </button>
          <h1 className="text-4xl font-slab text-skifer mb-2">
            {categoryTitle} - {locationTitle}
          </h1>
          <p className="text-lg text-gray-600">
            Velg målbruker for å se eller lage innhold
          </p>
        </div>

        {/* Target Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetUsers.map((targetUser) => (
            <div
              key={targetUser.id}
              onClick={() => handleTargetUserClick(targetUser.id)}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div className={`${targetUser.color} text-white p-3 rounded-full mr-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{targetUser.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{targetUser.name}</h3>
                  <p className="text-sm text-gray-600">{targetUser.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Klikk for å se innhold
                </span>
                <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Breadcrumb */}
        <div className="mt-12 text-sm text-gray-500">
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push('/skrivestuen/existing')}>
            Kategorier
          </span>
          <span className="mx-2">→</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push(`/skrivestuen/${categorySlug}`)}>
            {categoryTitle}
          </span>
          <span className="mx-2">→</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push(`/skrivestuen/${categorySlug}/${locationSlug}`)}>
            {locationTitle}
          </span>
          <span className="mx-2">→</span>
          <span className="text-gray-800">Målbrukere</span>
        </div>
      </div>
    </div>
  );
} 