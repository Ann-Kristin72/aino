import Link from 'next/link';
import { ReactNode } from 'react';

interface CategoryCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  color?: string;
  slug?: string;
}

export default function CategoryCard({ title, description, icon, color = 'bg-gray-50', slug }: CategoryCardProps) {
  const href = slug ? `/dashboard/bibliotek/${encodeURIComponent(title)}` : '#';
  
  return (
    <Link href={href} className="block">
      <div className={`p-6 rounded-lg ${color} hover:bg-opacity-80 transition-colors`}>
        <div className="flex items-center gap-4">
          {icon && <div className="text-2xl">{icon}</div>}
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
} 