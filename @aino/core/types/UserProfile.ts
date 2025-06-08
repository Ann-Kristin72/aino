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
  roles: string[];
  services: string[];
  preferences: {
    language: string;
    notifications: boolean;
  };
  lastActive: string;
} 