'use client';

import CategoryCard from '@/components/library/CategoryCard';
import EiraPortrait from '@/components/library/EiraPortrait';
import { categories } from '@/lib/categories';

export default function LibraryPage() {
  return (
    <main className="p-8">
      <EiraPortrait stage="initial" />
      
      <h1 className="text-2xl font-bold mb-6">📚 Innholdsbibliotek</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            title={cat.title}
            description={cat.description}
            href={`/library/${cat.id}`}
            icon={cat.icon}
            color={cat.bgColor}
          />
        ))}
      </div>
    </main>
  );
} 