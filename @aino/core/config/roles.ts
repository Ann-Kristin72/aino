export interface Role {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

export const roles: Role[] = [
  {
    id: 'assistant',
    name: 'Assistent',
    description: 'Personlig assistent for brukeren',
    categoryId: 'beredskap',
  },
  {
    id: 'nurse',
    name: 'Sykepleier',
    description: 'Profesjonell helsepersonell',
    categoryId: 'sykdommer',
  },
  // Add more roles as needed
]; 