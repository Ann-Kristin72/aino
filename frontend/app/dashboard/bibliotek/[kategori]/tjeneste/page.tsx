import Link from 'next/link';
import { BaseCard } from '../../../modules/BaseCard';

const services = [
  { title: 'Institusjon', slug: 'institusjon', color: 'bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors duration-200' },
  { title: 'Hjemmetjeneste', slug: 'hjemmetjeneste', color: 'bg-green-50 hover:bg-green-100 cursor-pointer transition-colors duration-200' },
  { title: 'Miljøarbeidertjeneste', slug: 'miljoarbeidertjeneste', color: 'bg-yellow-50 hover:bg-yellow-100 cursor-pointer transition-colors duration-200' },
];

export default function ServicePage({ params }: { params: { kategori: string } }) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href={`/dashboard/bibliotek`} className="text-blue-600 hover:underline mb-6 inline-block">← Tilbake til kategori</Link>
      <h1 className="text-2xl font-bold mb-8 capitalize">Tjenestetype for {params.kategori.replace(/-/g, ' ')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link key={service.slug} href={`/dashboard/bibliotek/${params.kategori}/${service.slug}/rolle`} className="block">
            <BaseCard title={service.title} bgColor={service.color} />
          </Link>
        ))}
      </div>
    </div>
  );
} 