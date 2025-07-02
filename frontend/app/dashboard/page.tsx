"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userData');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      // Ingen brukerdata, send til onboarding
      router.push('/');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-joda-orange"></div>
      </div>
    );
  }

  if (!userData) {
    return null; // Vil redirect til onboarding
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4E1] via-[#FFF8F1] to-[#E6F7F4]">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-joda-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Image 
                src="/design-guide/logo-kjede.png" 
                alt="Aino logo" 
                width={40} 
                height={40} 
              />
              <h1 className="text-2xl font-slab font-semibold text-skifer">Aino Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-skifer/70">
                Velkommen, {userData.name} ({userData.role})
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logg ut
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Admin Panel */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-joda-green/20">
            <h2 className="text-xl font-semibold text-skifer mb-4">Admin Panel</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/admin/super')}
                className="w-full text-left p-3 bg-joda-orange/10 hover:bg-joda-orange/20 rounded-lg transition-colors"
              >
                <span className="font-medium text-joda-orange">Super Admin</span>
                <p className="text-sm text-skifer/70">Administrer systemet</p>
              </button>
              <button
                onClick={() => router.push('/admin/skrivestue')}
                className="w-full text-left p-3 bg-joda-green/10 hover:bg-joda-green/20 rounded-lg transition-colors"
              >
                <span className="font-medium text-joda-green">Skrivestue</span>
                <p className="text-sm text-skifer/70">Rediger innhold</p>
              </button>
              <button
                onClick={() => router.push('/admin/quality')}
                className="w-full text-left p-3 bg-joda-teal/10 hover:bg-joda-teal/20 rounded-lg transition-colors"
              >
                <span className="font-medium text-joda-teal">Kvalitet</span>
                <p className="text-sm text-skifer/70">Kvalitetssikring</p>
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-joda-green/20">
            <h2 className="text-xl font-semibold text-skifer mb-4">Brukerinfo</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-skifer/70">Navn:</span>
                <p className="font-medium text-skifer">{userData.name}</p>
              </div>
              <div>
                <span className="text-sm text-skifer/70">E-post:</span>
                <p className="font-medium text-skifer">{userData.email}</p>
              </div>
              <div>
                <span className="text-sm text-skifer/70">Rolle:</span>
                <p className="font-medium text-joda-orange">{userData.role}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-joda-green/20">
            <h2 className="text-xl font-semibold text-skifer mb-4">Hurtigvalg</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/admin/assistant')}
                className="w-full text-left p-3 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors"
              >
                <span className="font-medium text-purple-600">AI Assistent</span>
                <p className="text-sm text-skifer/70">Få hjelp fra AI</p>
              </button>
              <button
                onClick={() => router.push('/admin/tasks')}
                className="w-full text-left p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors"
              >
                <span className="font-medium text-blue-600">Oppgaver</span>
                <p className="text-sm text-skifer/70">Se dine oppgaver</p>
              </button>
              <button
                onClick={() => router.push('/admin/communication')}
                className="w-full text-left p-3 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors"
              >
                <span className="font-medium text-green-600">Kommunikasjon</span>
                <p className="text-sm text-skifer/70">Team kommunikasjon</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 