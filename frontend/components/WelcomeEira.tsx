"use client";

import Image from 'next/image';
import SnakkebobleSoft from './SnakkebobleSoft';
import { useSteps, type Step } from '@/hooks/useSteps';

const steps = {
  welcome: {
    message: "Hei 😊 Jeg er Eira, din personlige assistent i Aino. Jeg er helt sikker på at vi skal ha det mye gøy, men først nå, hva heter du?"
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
    message: "Siste spørsmål - hvilken rolle har du i organisasjonen?",
    options: ['Superadmin', 'Hovedredaktør', 'Redaktør', 'Veileder', 'Assistent']
  }
};

export default function WelcomeEira() {
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

      {/* Eira og snakkeboble */}
      <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
        <div className="animate-slide-in-left">
          <Image
            src="/design-guide/eira-onboarding.png"
            alt="Eira"
            width={250}
            height={250}
            className="rounded-full hover:animate-wiggle cursor-pointer transition-all duration-300"
            priority
          />
        </div>
        
        <div className={`transition-all duration-500 ease-out ${showInput ? 'animate-slide-in-right' : 'opacity-0'}`}>
          <SnakkebobleSoft>
            <div className="text-center">
              <p className={`leading-snug tracking-normal transition-all duration-300 ${isTyping ? 'opacity-70' : 'opacity-100'}`}>
                {currentStepConfig.message}
              </p>
              
              {(showInput || (currentStep === 'welcome' && showButton)) && (
                <form onSubmit={handleSubmit} className="mt-4 animate-fade-pop">
                  {currentStep === 'name' && (
                    <input
                      type="text"
                      placeholder={currentStepConfig.placeholder}
                      value={userData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-4 w-full px-4 py-2 border-2 border-joda-green rounded-lg focus:outline-none focus:border-joda-teal transition-colors input-focus"
                      autoFocus
                    />
                  )}
                  
                  {currentStep === 'email' && (
                    <input
                      type="email"
                      placeholder={currentStepConfig.placeholder}
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-4 w-full px-4 py-2 border-2 border-joda-green rounded-lg focus:outline-none focus:border-joda-teal transition-colors input-focus"
                      autoFocus
                    />
                  )}
                  
                  {currentStep === 'role' && (
                    <div className="relative">
                      <select
                        value={userData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="mt-4 w-full px-4 py-2 border-2 border-joda-green rounded-lg focus:outline-none focus:border-joda-teal transition-colors input-focus select-custom"
                        autoFocus
                      >
                        <option value="">Velg rolle</option>
                        {currentStepConfig.options?.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      {!userData.role && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-pulse-slow">
                          <span className="text-joda-green">▼</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {showButton && (
                    <button
                      type="submit"
                      disabled={!canProceed(currentStep)}
                      className={`mt-4 px-6 py-2 bg-joda-orange text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-hover ${
                        canProceed(currentStep) ? 'animate-pulse-slow' : ''
                      }`}
                    >
                      {currentStep === 'role' ? 'Fullfør' : 'Fortsett'}
                    </button>
                  )}
                </form>
              )}
            </div>
          </SnakkebobleSoft>
        </div>
      </div>
    </div>
  );
} 