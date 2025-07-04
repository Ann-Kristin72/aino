"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Unit {
  id: string;
  title: string;
  content: string;
  order: number;
  nanoId: string;
}

interface Nano {
  id: string;
  title: string;
  content: string;
  order: number;
  courseId: string;
}

interface Course {
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
}

export default function UnitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const unitId = params.unitId as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [nano, setNano] = useState<Nano | null>(null);
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First fetch the course to get all nano and units
        const courseResponse = await fetch(`/api/content/${slug}`);
        if (!courseResponse.ok) {
          throw new Error(`Failed to fetch course: ${courseResponse.status}`);
        }
        
        const courseData = await courseResponse.json();
        setCourse(courseData);
        
        // Find the specific unit and its parent nano
        let foundUnit: Unit | null = null;
        let foundNano: Nano | null = null;
        
        for (const nanoItem of courseData.nano || []) {
          for (const unitItem of nanoItem.units || []) {
            if (unitItem.id === unitId) {
              foundUnit = unitItem;
              foundNano = nanoItem;
              break;
            }
          }
          if (foundUnit) break;
        }
        
        if (!foundUnit) {
          throw new Error('Unit not found');
        }
        
        setUnit(foundUnit);
        setNano(foundNano);
      } catch (err) {
        console.error('Error fetching unit:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch unit');
      } finally {
        setLoading(false);
      }
    };

    if (slug && unitId) {
      fetchUnit();
    }
  }, [slug, unitId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laster enhet...</p>
        </div>
      </div>
    );
  }

  if (error || !course || !nano || !unit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Enhet ikke funnet</h1>
          <p className="text-gray-600 mb-6">{error || 'Enheten kunne ikke lastes'}</p>
          <button
            onClick={() => router.push(`/skrivestuen/kurs/${slug}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Tilbake til kurset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{unit.title}</h1>
              <p className="text-gray-600">Enhet {unit.order} i {nano.title}</p>
            </div>
            <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
              {unit.order}
            </div>
          </div>
          
          {/* Course and Nano Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Kurs</label>
              <p className="text-gray-900 font-medium">{course.title}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nano</label>
              <p className="text-gray-900 font-medium">{nano.title}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Enhet</label>
              <p className="text-gray-900 font-medium">{unit.title}</p>
            </div>
          </div>
        </div>

        {/* Unit Content */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Innhold</h2>
          
          {unit.content ? (
            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {unit.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <p className="text-gray-600">Ingen innhold er lagt til for denne enheten ennå</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => router.push(`/skrivestuen/kurs/${slug}`)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center"
          >
            <span className="mr-2">←</span>
            Tilbake til kurset
          </button>
          <button
            onClick={() => router.push(`/admin/skrivestue?tab=writer&edit=${course.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center"
          >
            <span className="mr-2">✏️</span>
            Rediger kurs
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500">
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push('/skrivestuen/existing')}>
            Kategorier
          </span>
          <span className="mx-2">→</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push(`/skrivestuen/${course.category.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}`)}>
            {course.category}
          </span>
          <span className="mx-2">→</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push(`/skrivestuen/${course.category.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}/${course.location.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}`)}>
            {course.location}
          </span>
          <span className="mx-2">→</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push(`/skrivestuen/${course.category.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}/${course.location.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}/${course.targetUser.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')}`)}>
            {course.targetUser}
          </span>
          <span className="mx-2">→</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push(`/skrivestuen/kurs/${slug}`)}>
            {course.title}
          </span>
          <span className="mx-2">→</span>
          <span className="text-gray-800">{unit.title}</span>
        </div>
      </div>
    </div>
  );
} 