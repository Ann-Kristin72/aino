import Link from "next/link";
import { Building2, Home, Users } from "lucide-react";

const tjenester = [
  { 
    label: "Institusjon", 
    slug: "institusjon",
    description: "Kurs og opplæring for ansatte i institusjoner",
    icon: Building2,
    color: "bg-blue-50"
  },
  { 
    label: "Hjemmetjeneste", 
    slug: "hjemmetjeneste",
    description: "Kurs og opplæring for ansatte i hjemmetjenesten",
    icon: Home,
    color: "bg-green-50"
  },
  { 
    label: "Miljøarbeidertjeneste", 
    slug: "miljoarbeidertjeneste",
    description: "Kurs og opplæring for miljøarbeidere",
    icon: Users,
    color: "bg-purple-50"
  },
];

export default function Page({ params }: { params: { kategori: string } }) {
  const { kategori } = params;
  const categoryTitle = kategori
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Tjenestetyper for: {categoryTitle}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tjenester.map((tjeneste) => (
          <Link
            key={tjeneste.slug}
            href={`/dashboard/bibliotek/${kategori}/${tjeneste.slug}`}
            className={`${tjeneste.color} rounded-lg p-6 hover:shadow-lg transition-shadow duration-200`}
          >
            <div className="flex items-center gap-3 mb-3">
              <tjeneste.icon className="w-6 h-6" />
              <h3 className="text-lg font-semibold">{tjeneste.label}</h3>
            </div>
            <p className="text-sm text-gray-600">{tjeneste.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
} 