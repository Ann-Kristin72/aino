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
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    role: ''
  });

  const stepOrder: Step[] = ['welcome', 'name', 'email', 'role'];

  // Tidsstyrt visning av input
  useEffect(() => {
    if (currentStep === 'welcome') {
      const timer = setTimeout(() => setShowInput(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowInput(true);
    }
  }, [currentStep]);

  const handleNext = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
      setShowInput(false);
    }
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = (step: Step): boolean => {
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
    setUserData({ name: '', email: '', role: '' });
  };

  return {
    currentStep,
    showInput,
    userData,
    handleNext,
    handleInputChange,
    canProceed,
    reset,
    stepOrder,
    currentStepConfig: steps[currentStep]
  };
} 