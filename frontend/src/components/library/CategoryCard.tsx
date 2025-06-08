'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
};

export default function CategoryCard({ title, description, href, icon, color }: Props) {
  return (
    <Link href={href}>
      <div className={`rounded-xl p-4 shadow hover:bg-slate-50 transition-shadow ${color}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl" role="img" aria-label={title}>
            {icon}
          </span>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 opacity-80 mb-2">{description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>Utforsk kategori</span>
          <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
} 