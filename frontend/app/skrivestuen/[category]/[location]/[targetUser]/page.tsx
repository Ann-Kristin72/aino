"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { titleCase, kebabCase } from '../../../../../lib/utils';

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  targetUser: string;
  language: string;
  author: string;
  revisionInterval: string;
  keywords: string[];
  imageUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// Mapping av target user IDs til visningsnavn
const targetUserNames: { [key: string]: string } = {
  'pleieassistenter': 'Pleieassistenter',
  'helsefagarbeidere': 'Helsefagarbeidere',
  'sykepleiere': 'Sykepleiere',
  'fagsykepleiere': 'Fagsykepleiere',
  'avdelingsledere': 'Avdelingsledere',
  'prosjektledere': 'Prosjektledere'
};

export default function CategoryLocationTargetUserPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.category as string;
  const locationSlug = params.location as string;
  const targetUserSlug = params.targetUser as string;
  
  const categoryTitle = titleCase(categorySlug);
  const locationTitle = titleCase(locationSlug);
  const targetUserName = targetUserNames[targetUserSlug] || titleCase(targetUserSlug);
  
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        
        const allContent: ContentItem[] = await response.json();
        
        // Filtrer innhold basert på URL-parametrene
        const filteredContent = allContent.filter(item => {
          // Normaliser både URL-parametrene og databasen-innholdet for sammenligning
          const itemCategoryNormalized = kebabCase(item.category);
          const itemLocationNormalized = kebabCase(item.location);
          const itemTargetUserNormalized = kebabCase(item.targetUser);
          
          const urlCategory = categorySlug;
          const urlLocation = locationSlug;
          const urlTargetUser = targetUserSlug;
          
          return itemCategoryNormalized === urlCategory && 
                 itemLocationNormalized === urlLocation && 
                 itemTargetUserNormalized === urlTargetUser;
        });
        
        setContents(filteredContent);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [categorySlug, locationSlug, targetUserSlug]);

  const handleCreateNew = () => {
    // Naviger til writer med pre-fylt kategori, lokasjon og målbruker
    router.push(`/admin/skrivestue?tab=writer&category=${categorySlug}&location=${locationSlug}&targetUser=${targetUserSlug}`);
  };

  const handleCourseClick = (content: ContentItem) => {
    // Naviger til kursdetalj-side
    router.push(`/skrivestuen/kurs/${content.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-latte p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Laster innhold...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-latte p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Feil ved lasting</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Prøv igjen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Tilbake til målbrukere
          </button>
          <h1 className="text-4xl font-slab text-skifer mb-2">
            {categoryTitle} - {locationTitle} - {targetUserName}
          </h1>
          <p className="text-lg text-gray-600">
            Innhold spesialtilpasset for {targetUserName.toLowerCase()} innenfor {categoryTitle.toLowerCase()} i {locationTitle.toLowerCase()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={handleCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center"
          >
            <span className="mr-2">✏️</span>
            Lag nytt innhold
          </button>
          <button
            onClick={() => router.push('/admin/skrivestue?tab=content')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center"
          >
            <span className="mr-2">📚</span>
            Se alt innhold
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <div
              key={content.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer transform hover:scale-105"
              onClick={() => handleCourseClick(content)}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">{content.title}</h3>
              <p className="text-gray-600 mb-4">
                Innhold for {content.targetUser.toLowerCase()} innenfor {content.category.toLowerCase()} i {content.location.toLowerCase()}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Av: {content.author}</span>
                <span>{new Date(content.createdAt).toLocaleDateString('nb-NO')}</span>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {content.category}
                </span>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {content.location}
                </span>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {content.targetUser}
                </span>
                {content.keywords && content.keywords.length > 0 && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    {content.keywords.length} nøkkelord
                  </span>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">Klikk for å åpne</span>
                  <span className="text-blue-600">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {contents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Ingen innhold ennå</h3>
            <p className="text-gray-600 mb-6">
              Det finnes ikke noe innhold for {categoryTitle} - {locationTitle} - {targetUserName} ennå.
            </p>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Lag det første innholdet
            </button>
          </div>
        )}

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
          <span className="text-gray-800">{targetUserName}</span>
        </div>
      </div>
    </div>
  );
} 