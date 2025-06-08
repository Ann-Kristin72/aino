'use client';

import React from 'react';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  icon: string;
  href: string;
  roles: string[];
};

export default function ServiceCard({ title, description, icon, href, roles }: Props) {
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
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Tilgjengelige roller:</p>
          <ul className="space-y-1">
            {roles.map((role) => (
              <li key={role} className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
} 