'use client';

import React from 'react';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function CategoryCard({ title, description, href }: Props) {
  return (
    <Link href={href}>
      <div className="p-4 border rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
} 