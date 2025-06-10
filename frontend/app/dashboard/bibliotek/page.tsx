import Link from "next/link";

const categories = [
  "forebygging-og-beredskap",
  "introduksjon-til-nyansatte",
  "kommunikasjon",
  "lovverk",
  "lokasjon-og-rom",
  "observasjon-og-dokumentasjon",
  "psykisk-helse-og-rus",
  "smittevern-og-hygiene",
  "sykdommer-og-tiltak",
  "utviklingshemming",
  "ved-livets-slutt",
  "velferdsteknologi",
  "ernaering",
];

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Velg kategori</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((slug) => (
          <li key={slug}>
            <Link
              href={`/dashboard/bibliotek/${slug}`}
              className="block border rounded p-4 hover:bg-gray-100"
            >
              {slug
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
} 