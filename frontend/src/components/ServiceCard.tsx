'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  icon: string;
  href: string;
  roles?: string[]; // Made optional since we won't use it
};

export default function ServiceCard({ title, description, icon, href }: Props) {
  return (
    <Link href={href}>
      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition bg-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl" role="img" aria-label={title}>
            {icon}
          </span>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>Velg tjeneste</span>
          <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
} 