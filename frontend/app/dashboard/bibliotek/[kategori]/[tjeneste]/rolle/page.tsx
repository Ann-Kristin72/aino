import Link from 'next/link';
import { BaseCard } from '../../../../modules/BaseCard';

const roles = [
  { title: 'Pleieassistent', color: 'bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors duration-200' },
  { title: 'Helsefagarbeider', color: 'bg-green-50 hover:bg-green-100 cursor-pointer transition-colors duration-200' },
  { title: 'Sykepleier', color: 'bg-yellow-50 hover:bg-yellow-100 cursor-pointer transition-colors duration-200' },
];

export default function RolePage({ params }: { params: { kategori: string; tjeneste: string } }) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href={`/dashboard/bibliotek/${params.kategori}/tjeneste`} className="text-blue-600 hover:underline mb-6 inline-block">← Tilbake til tjeneste</Link>
      <h1 className="text-2xl font-bold mb-8 capitalize">Velg rolle for {params.tjeneste.replace(/-/g, ' ')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.title}>
            <BaseCard title={role.title} bgColor={role.color} />
          </div>
        ))}
      </div>
    </div>
  );
} 