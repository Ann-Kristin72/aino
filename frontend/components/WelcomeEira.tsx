"use client";

import Image from 'next/image';
import SnakkebobleSoft from './SnakkebobleSoft';
import { useSteps, type Step } from '@/hooks/useSteps';

const steps = {
  welcome: {
    message: "Hei:-) Jeg er Eira, din personge assisten i Aino. Jeg er helt sikker på at vi skal ha det mye gøy, men først nå, hva heter du?"
  },
  name: {
    message: "Flott! Nå trenger jeg e-postadressen din for å sette opp kontoen.",
    placeholder: "Hva heter du?",
    validation: (value: string) => value.length >= 2
  },
  email: {
    message: "Perfekt! Siste spørsmål - hvilken rolle har du i organisasjonen?",
    placeholder: "Din e-postadresse",
    validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  role: {
    message: "Takk! Jeg setter opp alt for deg nå. Du vil snart få en e-post med påloggingsinformasjon.",
    options: ['Superadmin', 'Hovedredaktør', 'Redaktør', 'Veileder', 'Assistent']
  }
};

export default function WelcomeEira() {
  const {
    currentStep,
    showInput,
    userData,
    handleNext,
    handleInputChange,
    canProceed,
    currentStepConfig
  } = useSteps(steps);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed(currentStep)) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-skifer bg-gradient-to-br from-[#FFF4E1] via-[#FFF8F1] to-[#E6F7F4]">
      {/* Logo og tittel */}
      <div className="flex flex-col items-center text-center mb-12">
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

      {/* Eira og snakkeboble */}
      <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
        <Image
          src="/design-guide/eira-onboarding.png"
          alt="Eira"
          width={250}
          height={250}
          className="rounded-full"
          priority
        />
        <div className="animate-fade-in transition-all duration-500 ease-out">
          <SnakkebobleSoft>
            <div className="text-center">
              <p className="leading-snug tracking-normal">
                {currentStepConfig.message}
              </p>
              
              {showInput && currentStep !== 'welcome' && (
                <form onSubmit={handleSubmit} className="mt-4">
                  {currentStep === 'name' && (
                    <input
                      type="text"
                      placeholder={currentStepConfig.placeholder}
                      value={userData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-4 w-full px-4 py-2 border-2 border-joda-green rounded-lg focus:outline-none focus:border-joda-teal transition-colors"
                      autoFocus
                    />
                  )}
                  
                  {currentStep === 'email' && (
                    <input
                      type="email"
                      placeholder={currentStepConfig.placeholder}
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-4 w-full px-4 py-2 border-2 border-joda-green rounded-lg focus:outline-none focus:border-joda-teal transition-colors"
                      autoFocus
                    />
                  )}
                  
                  {currentStep === 'role' && (
                    <select
                      value={userData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="mt-4 w-full px-4 py-2 border-2 border-joda-green rounded-lg focus:outline-none focus:border-joda-teal transition-colors"
                      autoFocus
                    >
                      <option value="">Velg rolle</option>
                      {currentStepConfig.options?.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  )}
                  
                  <button
                    type="submit"
                    disabled={!canProceed(currentStep)}
                    className="mt-4 px-6 py-2 bg-joda-orange text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Fortsett
                  </button>
                </form>
              )}
            </div>
          </SnakkebobleSoft>
        </div>
      </div>
    </div>
  );
} 