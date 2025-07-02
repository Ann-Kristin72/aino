"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WelcomeEira from '@/components/onboarding/WelcomeEira';

export default function Home() {
  const router = useRouter();
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userData, setUserData] = useState(null);

  // Sjekk om bruker allerede har fullført onboarding
  useEffect(() => {
    const storedUser = sessionStorage.getItem('userData');
    if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setOnboardingComplete(true);
        router.push('/dashboard');
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        sessionStorage.removeItem('userData');
      }
    }
  }, [router]);

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setOnboardingComplete(true);
    
    // Lagre brukerdata i sessionStorage
    sessionStorage.setItem('userData', JSON.stringify(data));
    
    // Naviger til dashboard
    router.push('/dashboard');
  };

  if (onboardingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-joda-orange mx-auto mb-4"></div>
          <p className="text-lg text-skifer">Omdirigerer til dashboard...</p>
        </div>
      </div>
    );
  }

  return <WelcomeEira onComplete={handleOnboardingComplete} />;
} 