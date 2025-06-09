export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export const categories: Category[] = [
  {
    id: 'beredskap',
    name: 'Beredskap',
    description: 'Håndtering av akutte situasjoner og kriser',
  },
  {
    id: 'sykdommer',
    name: 'Sykdommer',
    description: 'Kunnskap om vanlige sykdommer og helsetilstander',
  },
  // Add more categories as needed
]; 