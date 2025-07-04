"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProgress } from '@/lib/hooks/useProgress';
import { UnitCard } from '@/components/UnitCard';

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
      body: string;
      illustrationUrl?: string;
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
  const [openNanoId, setOpenNanoId] = useState<string | null>(null);
  const [openUnitId, setOpenUnitId] = useState<string | null>(null);

  // Temporary user ID for testing - in production this would come from auth
  const userId = 'test-user-123';
  const courseId = content?.id || '';

  // Use progress tracking hook
  const { completedUnits, toggleUnit, loading: progressLoading } = useProgress(userId, courseId);

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

  const handleNanoClick = (nanoId: string) => {
    if (openNanoId === nanoId) {
      setOpenNanoId(null);
      setOpenUnitId(null); // Close any open unit when closing nano
    } else {
      setOpenNanoId(nanoId);
      setOpenUnitId(null); // Close any previously open unit
    }
  };

  const handleUnitClick = (unitId: string) => {
    if (openUnitId === unitId) {
      setOpenUnitId(null);
    } else {
      setOpenUnitId(unitId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-latte p-4 sm:p-8">
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
      <div className="min-h-screen bg-latte p-4 sm:p-8">
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
    <div className="min-h-screen bg-latte p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors text-sm sm:text-base"
          >
            <span className="mr-2">←</span>
            Tilbake til kursoversikt
          </button>
          <h1 className="text-2xl sm:text-4xl font-slab text-skifer mb-2">{content.title}</h1>
          <p className="text-base sm:text-lg text-gray-600">
            Kurs for {content.targetUser.toLowerCase()} innenfor {content.category.toLowerCase()} i {content.location.toLowerCase()}
          </p>
        </div>

        {/* Course Content Structure - Mobile Optimized */}
        {content.nano && content.nano.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Kursinnhold</h2>
              <p className="text-sm text-gray-600 mt-1">Klikk på en nano for å se enhetene</p>
            </div>
            
            <div className="divide-y divide-gray-100">
              {content.nano.map((nanoItem, nanoIndex) => (
                <div key={nanoItem.id} className="bg-white">
                  {/* Nano Header - Clickable */}
                  <button
                    onClick={() => handleNanoClick(nanoItem.id)}
                    className="w-full p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-inset"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                          {nanoIndex + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                            {nanoItem.title}
                          </h3>
                          {nanoItem.units && nanoItem.units.length > 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                              {nanoItem.units.length} enhet{nanoItem.units.length !== 1 ? 'er' : ''}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className={`transform transition-transform duration-200 ${openNanoId === nanoItem.id ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Nano Content - Units */}
                  {openNanoId === nanoItem.id && nanoItem.units && nanoItem.units.length > 0 && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="p-4 sm:p-6">
                        <div className="space-y-3">
                          {nanoItem.units.map((unit, unitIndex) => (
                            <UnitCard
                              key={unit.id}
                              unit={{
                                id: unit.id,
                                title: unit.title,
                                content: unit.body,
                                nanoId: unit.nanoId,
                                illustrationUrl: unit.illustrationUrl
                              }}
                              isCompleted={completedUnits.includes(unit.id)}
                              onToggle={() => toggleUnit(unit.id, unit.nanoId)}
                              loading={progressLoading}
                            />
                          ))}
                        </div>
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
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => router.push(`/admin/skrivestue?tab=writer&edit=${content.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center"
          >
            <span className="mr-2">✏️</span>
            Rediger kurs
          </button>
          <button
            onClick={() => router.push(`/skrivestuen/${content.category.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}/${content.location.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}/${content.targetUser.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}`)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center"
          >
            <span className="mr-2">📚</span>
            Se andre kurs i samme kategori
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-8 hidden sm:block">
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