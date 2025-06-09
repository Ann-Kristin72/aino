export interface Market {
  id: string;
  name: string;
  description: string;
  language: string;
}

export const markets: Market[] = [
  {
    id: 'norway',
    name: 'Norway',
    description: 'Norwegian market',
    language: 'no',
  },
  // Add more markets as needed
]; 