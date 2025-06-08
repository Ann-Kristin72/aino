'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  onClick: () => void;
}

export default function CategoryCard({ 
  title, 
  description, 
  icon: Icon,
  color = 'bg-indigo-50',
  onClick 
}: CategoryCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "h-full p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer",
        color
      )}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-white/50">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
} 