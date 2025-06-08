'use client';

import Link from 'next/link';

type Props = {
  title: string;
  icon: string;
  href: string;
};

export default function RoleCard({ title, icon, href }: Props) {
  return (
    <Link href={href}>
      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition bg-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" role="img" aria-label={title}>
            {icon}
          </span>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center text-sm text-blue-600">
          <span>Se innhold for {title.toLowerCase()}</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
} 