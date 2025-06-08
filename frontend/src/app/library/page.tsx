'use client';

import CategoryCard from '@/components/library/CategoryCard';
import EiraGuide from '@/components/library/EiraGuide';
import { categories } from '@/lib/categories';
import { useRouter } from 'next/navigation';

export default function LibraryPage() {
  const router = useRouter();

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <EiraGuide 
          message="Hva slags fagområde ser du etter? Velg en kategori under, så hjelper jeg deg videre 😊" 
          variant="happy"
        />
      </div>
      
      <h1 className="text-2xl font-bold mb-6">📚 Innholdsbibliotek</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            title={cat.title}
            description={cat.description}
            icon={cat.icon}
            color={cat.bgColor}
            onClick={() => router.push(`/library/${cat.id}`)}
          />
        ))}
      </div>
    </main>
  );
} 