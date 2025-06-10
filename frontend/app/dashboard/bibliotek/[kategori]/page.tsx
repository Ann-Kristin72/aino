import Link from "next/link";

const tjenester = [
  { label: "Institusjon", slug: "institusjon" },
  { label: "Hjemmetjeneste", slug: "hjemmetjeneste" },
  { label: "Miljøarbeidertjeneste", slug: "miljoarbeidertjeneste" },
];

export default function Page({ params }: { params: { kategori: string } }) {
  const { kategori } = params;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Tjenestetyper for: {kategori.replace(/-/g, " ")}
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tjenester.map((tjeneste) => (
          <li key={tjeneste.slug}>
            <Link
              href={`/dashboard/bibliotek/${kategori}/${tjeneste.slug}`}
              className="block border rounded p-4 hover:bg-gray-100"
            >
              {tjeneste.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
} 