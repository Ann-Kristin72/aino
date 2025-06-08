export type UserRole = 
  | 'assistent'
  | 'helsefagarbeider'
  | 'sykepleier'
  | 'fagsykepleier'
  | 'avdelingsleder'
  | 'prosjektleder';

export type ServiceArea = 
  | 'hjemmetjeneste'
  | 'sykehjem'
  | 'omsorgsbolig'
  | 'dagsenter';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  services: ServiceArea[];
  assignedModules: string[];
  preferences: {
    language: 'nb' | 'nn' | 'en';
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    eiraInteraction: 'active' | 'passive' | 'disabled';
  };
  context: {
    currentService: ServiceArea;
    activeModules: string[];
    lastActivity: Date;
    completedTraining: string[];
  };
  access: {
    level: number;
    restrictions?: string[];
    specialPermissions?: string[];
  };
} 