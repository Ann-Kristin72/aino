'use client';

import React from 'react';
import Link from 'next/link';

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
      <div className={`p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer ${color}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" role="img" aria-label={title}>
            {icon}
          </span>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm opacity-80 text-gray-600">{description}</p>
      </div>
    </Link>
  );
} 