"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

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
  metadata: any;
  createdAt: string;
  updatedAt: string;
  nano?: Array<{
    id: string;
    title: string;
    content: string;
    order: number;
    courseId: string;
    units: Array<{
      id: string;
      title: string;
      content: string;
      order: number;
      nanoId: string;
    }>;
  }>;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/content/${slug}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch course: ${response.status}`);
        }
        
        const course: ContentItem = await response.json();
        setContent(course);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-latte p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Laster kurs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-latte p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Kurset ble ikke funnet</h3>
              <p className="text-gray-600 mb-6">{error || 'Ukjent feil'}</p>
              <button
                onClick={() => router.back()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Gå tilbake
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-latte p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <span className="mr-2">←</span>
            Tilbake til kursoversikt
          </button>
          <h1 className="text-4xl font-slab text-skifer mb-2">{content.title}</h1>
          <p className="text-lg text-gray-600">
            Kurs for {content.targetUser.toLowerCase()} innenfor {content.category.toLowerCase()} i {content.location.toLowerCase()}
          </p>
        </div>

        {/* Course Details */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Course Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Kursinformasjon</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tittel</label>
                  <p className="text-gray-900">{content.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {content.category}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasjon</label>
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {content.location}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Målgruppe</label>
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {content.targetUser}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Forfatter</label>
                  <p className="text-gray-900">{content.author}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Revisjonsintervall</label>
                  <p className="text-gray-900">{content.revisionInterval} måneder</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Språk</label>
                  <p className="text-gray-900">{content.language === 'nb-NO' ? 'Norsk (Bokmål)' : content.language}</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Metadata */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Metadata</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opprettet</label>
                  <p className="text-gray-900">{new Date(content.createdAt).toLocaleDateString('nb-NO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sist oppdatert</label>
                  <p className="text-gray-900">{new Date(content.updatedAt).toLocaleDateString('nb-NO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kurs-ID</label>
                  <p className="text-gray-900 font-mono text-sm">{content.id}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <p className="text-gray-900 font-mono text-sm">{content.slug}</p>
                </div>
                
                {content.keywords && content.keywords.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nøkkelord</label>
                    <div className="flex flex-wrap gap-2">
                      {content.keywords.map((keyword, index) => (
                        <span key={index} className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Structure */}
        {content.nano && content.nano.length > 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kursinnhold</h2>
            
            <div className="space-y-6">
              {content.nano.map((nanoItem, nanoIndex) => (
                <div key={nanoItem.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      {nanoIndex + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{nanoItem.title}</h3>
                  </div>
                  
                  {nanoItem.content && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivelse</label>
                      <div className="bg-gray-50 rounded-lg p-4 text-gray-800">
                        {nanoItem.content}
                      </div>
                    </div>
                  )}
                  
                  {nanoItem.units && nanoItem.units.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Enheter</label>
                      <div className="space-y-3">
                        {nanoItem.units.map((unit, unitIndex) => (
                          <div key={unit.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                            <div className="flex items-center mb-2">
                              <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2">
                                {unitIndex + 1}
                              </div>
                              <h4 className="font-medium text-gray-800">{unit.title}</h4>
                            </div>
                            {unit.content && (
                              <div className="text-gray-700 text-sm ml-8">
                                {unit.content}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kursinnhold</h2>
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <p className="text-gray-600 mb-4">Ingen kursinnhold er lagt til ennå</p>
              <button
                onClick={() => router.push(`/admin/skrivestue?tab=writer&edit=${content.id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Legg til innhold
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => router.push(`/admin/skrivestue?tab=writer&edit=${content.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center"
          >
            <span className="mr-2">✏️</span>
            Rediger kurs
          </button>
          <button
            onClick={() => router.push(`/skrivestuen/${content.category.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}/${content.location.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}/${content.targetUser.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}`)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center"
          >
            <span className="mr-2">📚</span>
            Se andre kurs i samme kategori
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500">
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push('/skrivestuen/existing')}>
            Kategorier
          </span>
          <span className="mx-2">→</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push(`/skrivestuen/${content.category.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}`)}>
            {content.category}
          </span>
          <span className="mx-2">→</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push(`/skrivestuen/${content.category.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}/${content.location.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}`)}>
            {content.location}
          </span>
          <span className="mx-2">→</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push(`/skrivestuen/${content.category.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}/${content.location.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}/${content.targetUser.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}`)}>
            {content.targetUser}
          </span>
          <span className="mx-2">→</span>
          <span className="text-gray-800">{content.title}</span>
        </div>
      </div>
    </div>
  );
} 