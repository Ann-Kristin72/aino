"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import SnakkebobleSoft from '../SnakkebobleSoft';
import { useSteps, type Step } from '@/hooks/useSteps';

interface WelcomeEiraProps {
  onComplete?: (data: Record<string, unknown>) => void;
}

interface Role {
  id: number;
  name: string;
}

interface StepConfig {
  message: string;
  placeholder?: string;
  validation?: (value: string) => boolean;
  options?: string[];
}

const steps: { [key in Step]: StepConfig } = {
  welcome: {
    message: "Hei 😊 Jeg er Eira, din personlige assistent i Aino. Jeg gleder meg til å bli kjent med deg!"
  },
  name: {
    message: "Flott! Nå trenger jeg navnet ditt for å sette opp kontoen.",
    placeholder: "Hva heter du?",
    validation: (value: string) => value.length >= 2
  },
  email: {
    message: "Perfekt! Nå trenger jeg e-postadressen din.",
    placeholder: "Din e-postadresse",
    validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  role: {
    message: "Siste spørsmål - hvilken rolle har du i systemet?",
    placeholder: "Velg rolle",
    options: [] // Will be populated from API
  }
};

export default function WelcomeEira({ onComplete }: WelcomeEiraProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepsWithRoles, setStepsWithRoles] = useState(steps);

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
        if (response.ok) {
                  const rolesData = await response.json();
        // Update the steps with fetched roles
          setStepsWithRoles(prev => ({
            ...prev,
            role: {
              ...prev.role,
              options: rolesData.map((role: Role) => role.name)
            }
          }));
        }
      } catch (err) {
        console.error('Failed to fetch roles:', err);
        // Fallback to default roles if API fails
        setStepsWithRoles(prev => ({
          ...prev,
          role: {
            ...prev.role,
            options: ['Superadmin', 'Hovedredaktør', 'Redaktør', 'Veileder', 'Assistent']
          }
        }));
      }
    };

    fetchRoles();
  }, []);

  const {
    currentStep,
    showInput,
    showButton,
    isTyping,
    userData,
    handleNext,
    handleInputChange,
    canProceed,
    currentStepConfig
  } = useSteps(stepsWithRoles);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed(currentStep)) {
      if (currentStep === 'role') {
        // Onboarding complete, send to API
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await fetch('/api/onboarding', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: userData.name,
              email: userData.email,
              role: userData.role,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Onboarding feilet');
          }

          const data = await response.json();
          onComplete?.(data);
          
        } catch (err) {
          setError(err instanceof Error ? err.message : 'En feil oppstod');
        } finally {
          setIsLoading(false);
        }
      } else {
        handleNext();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-skifer bg-gradient-to-br from-[#FFF4E1] via-[#FFF8F1] to-[#E6F7F4]">
      {/* Logo og tittel */}
      <div className="flex flex-col items-center text-center mb-12 animate-fade-in">
        <Image 
          src="/design-guide/logo-kjede.png" 
          alt="Aino logo" 
          width={80} 
          height={80} 
          priority
          className="mb-4"
        />
        <h1 className="text-4xl md:text-5xl font-slab font-semibold mt-4">Velkommen til Aino</h1>
        <p className="text-lg text-skifer/80 mt-2 font-medium leading-snug tracking-normal">
          En base for kunnskap og mestring🧡
        </p>
      </div>

      {/* Eira og snakkebobler */}
      <div className="flex flex-col md:flex-row items-start gap-8 mt-6 max-w-4xl">
        <div className="animate-slide-in-left flex-shrink-0">
          <Image
            src="/design-guide/eira-onboarding.png"
            alt="Eira"
            width={250}
            height={250}
            className="rounded-full hover:animate-wiggle cursor-pointer transition-all duration-300"
            priority
          />
        </div>
        
        {/* Snakkebobler container */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="animate-slide-in-right">
            <SnakkebobleSoft>
              <div className="text-center">
                <p className={`leading-snug tracking-normal transition-all duration-300 ${isTyping ? 'opacity-70' : 'opacity-100'}`}>
                  {currentStepConfig.message}
                </p>
                
                {/* For welcome-steget: vis input-felt med placeholder */}
                {currentStep === 'welcome' && showButton && (
                  <div className="mt-6 animate-fade-pop">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Kom og bli med på reisen"
                        onClick={handleNext}
                        readOnly
                        className="w-full px-4 py-3 pr-12 border-2 border-orange-400 rounded-lg bg-white text-lg text-black placeholder:text-black/70 shadow-sm transition-all duration-200 cursor-pointer hover:border-orange-500 hover:bg-orange-50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 animate-pulse-slow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* For de andre stegene: vis form med input + knapp */}
                {currentStep !== 'welcome' && showInput && showButton && (
                  <form onSubmit={handleSubmit} className="mt-4 animate-fade-pop">
                    {currentStep === 'name' && (
                      <input
                        type="text"
                        placeholder={currentStepConfig.placeholder}
                        value={userData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-joda-green rounded-lg focus:outline-none focus:border-joda-teal bg-white text-lg placeholder:text-joda-green/60 shadow-sm transition-colors"
                        autoFocus
                      />
                    )}
                    {currentStep === 'email' && (
                      <input
                        type="email"
                        placeholder={currentStepConfig.placeholder}
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-joda-green rounded-lg focus:outline-none focus:border-joda-teal bg-white text-lg placeholder:text-joda-green/60 shadow-sm transition-colors"
                        autoFocus
                      />
                    )}
                    {currentStep === 'role' && (
                      <div className="relative">
                        <select
                          value={userData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-joda-green rounded-lg focus:outline-none focus:border-joda-teal bg-white text-lg shadow-sm transition-colors"
                          autoFocus
                        >
                          <option value="">Velg rolle</option>
                          {currentStepConfig.options?.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                        {!userData.role && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-pulse-slow">
                            <span className="text-joda-green text-xl">▼</span>
                          </div>
                        )}
                      </div>
                    )}
                    {error && (
                      <div className="mt-2 text-red-600 text-sm animate-fade-in">
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={!canProceed(currentStep) || isLoading}
                      className={`mt-4 px-6 py-2 bg-aino-orange text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-hover ${
                        canProceed(currentStep) && !isLoading ? 'animate-pulse-slow' : ''
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          Registrerer...
                        </span>
                      ) : (
                        currentStep === 'role' ? 'Fullfør' : 'Fortsett'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </SnakkebobleSoft>
          </div>
        </div>
      </div>
    </div>
  );
} 