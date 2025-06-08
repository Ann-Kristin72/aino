'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Props = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href: string;
  type?: 'document' | 'course' | 'procedure';
};

const typeIcons = {
  document: '📄',
  course: '🧩',
  procedure: '🛡️'
};

export default function ContentLinkCard({ title, description, icon, href, type = 'document' }: Props) {
  return (
    <Link href={href}>
      <div className="flex items-start gap-3 p-4 rounded-xl border hover:bg-slate-50 cursor-pointer transition">
        <div className="text-2xl" role="img" aria-label={type}>
          {icon || typeIcons[type]}
        </div>
        <div className="flex-grow">
          <h4 className="font-medium text-base text-gray-900">{title}</h4>
          {description && (
            <p className="text-sm text-gray-600 opacity-80">{description}</p>
          )}
        </div>
        <div className="flex-shrink-0 text-gray-400">
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
} 