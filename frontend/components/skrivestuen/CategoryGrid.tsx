"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import CategoryCard from '../CategoryCard';

const categories = [
  {
    title: 'Ernæring',
    colorClass: 'bg-aino-orange',
    backgroundColor: '#FF9F6B',
    icon: '🍎'
  },
  {
    title: 'Forebygging og beredskap',
    colorClass: 'bg-aino-teal',
    backgroundColor: '#549D91',
    icon: '🛡️'
  },
  {
    title: 'Introduksjon til nyansatte',
    colorClass: 'bg-aino-sand',
    backgroundColor: '#FDBD5D',
    icon: '👋'
  },
  {
    title: 'Kommunikasjon',
    colorClass: 'bg-aino-blågrønn',
    backgroundColor: '#76BBB9',
    icon: '💬'
  },
  {
    title: 'Lokasjon og rom',
    colorClass: 'bg-aino-korall',
    backgroundColor: '#CBCCAC',
    icon: '🏠'
  },
  {
    title: 'Lovverk',
    colorClass: 'bg-aino-orange',
    backgroundColor: '#FF9F6B',
    icon: '⚖️'
  },
  {
    title: 'Observasjon og dokumentasjon',
    colorClass: 'bg-aino-teal',
    backgroundColor: '#549D91',
    icon: '📝'
  },
  {
    title: 'Psykisk helse og rus',
    colorClass: 'bg-aino-sand',
    backgroundColor: '#FDBD5D',
    icon: '🧠'
  },
  {
    title: 'Smittevern og hygiene',
    colorClass: 'bg-aino-blågrønn',
    backgroundColor: '#76BBB9',
    icon: '🧴'
  },
  {
    title: 'Sykdommer og tiltak',
    colorClass: 'bg-aino-korall',
    backgroundColor: '#CBCCAC',
    icon: '🦠'
  },
  {
    title: 'Utviklingshemming',
    colorClass: 'bg-aino-orange',
    backgroundColor: '#FF9F6B',
    icon: '🧩'
  },
  {
    title: 'Ved livets slutt',
    colorClass: 'bg-aino-teal',
    backgroundColor: '#549D91',
    icon: '🕊️'
  },
  {
    title: 'Velferdsteknologi',
    colorClass: 'bg-aino-sand',
    backgroundColor: '#FDBD5D',
    icon: '🤖'
  }
];

function kebabCase(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
}

const CategoryGrid: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.title}
          name={cat.title}
          colorClass={cat.colorClass}
          backgroundColor={cat.backgroundColor}
          icon={cat.icon}
          onClick={() => router.push(`/skrivestuen/${kebabCase(cat.title)}`)}
        />
      ))}
      <CategoryCard
        name="Ny kategori"
        colorClass="bg-aino-blågrønn"
        backgroundColor="#76BBB9"
        icon="+"
        onClick={() => router.push('/skrivestuen/ny')}
      />
    </div>
  );
};

export default CategoryGrid; 