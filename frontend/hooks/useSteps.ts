import { useState, useEffect } from 'react';

export type Step = 'welcome' | 'name' | 'email' | 'role';

export interface StepConfig {
  message: string;
  placeholder?: string;
  options?: string[];
  validation?: (value: string) => boolean;
}

export interface UserData {
  name: string;
  email: string;
  role: string;
}

export function useSteps(steps: { [key in Step]: StepConfig }) {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [showInput, setShowInput] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    role: ''
  });

  const stepOrder: Step[] = ['welcome', 'name', 'email', 'role'];

  // Tidsstyrt visning av input og animasjoner
  useEffect(() => {
    if (currentStep === 'welcome') {
      // Vis input etter 2 sekunder
      const inputTimer = setTimeout(() => setShowInput(true), 2000);
      // Vis knapp etter 3 sekunder
      const buttonTimer = setTimeout(() => setShowButton(true), 3000);
      return () => {
        clearTimeout(inputTimer);
        clearTimeout(buttonTimer);
      };
    } else {
      // For andre steg, vis input umiddelbart
      setShowInput(true);
      setShowButton(true);
    }
  }, [currentStep]);

  // Simuler typing-effekt for meldinger
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
      setShowInput(false);
      setShowButton(false);
    }
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = (step: Step): boolean => {
    // For welcome steget, alltid tillat å gå videre
    if (step === 'welcome') return true;
    
    const value = userData[step as keyof UserData];
    const config = steps[step];
    
    if (!value) return false;
    
    if (config.validation) {
      return config.validation(value);
    }
    
    return true;
  };

  const reset = () => {
    setCurrentStep('welcome');
    setShowInput(false);
    setShowButton(false);
    setIsTyping(false);
    setUserData({ name: '', email: '', role: '' });
  };

  return {
    currentStep,
    showInput,
    showButton,
    isTyping,
    userData,
    handleNext,
    handleInputChange,
    canProceed,
    reset,
    stepOrder,
    currentStepConfig: steps[currentStep]
  };
} 