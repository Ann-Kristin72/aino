import Link from "next/link";

const roller = [
  { label: "Pleieassistent", slug: "pleieassistent" },
  { label: "Helsefagarbeider", slug: "helsefagarbeider" },
  { label: "Sykepleier", slug: "sykepleier" },
];

export default function Page({
  params,
}: {
  params: { kategori: string; tjeneste: string };
}) {
  const { kategori, tjeneste } = params;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Roller i {tjeneste.replace(/-/g, " ")}
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roller.map((rolle) => (
          <li key={rolle.slug}>
            <Link
              href={`/dashboard/bibliotek/${kategori}/${tjeneste}/${rolle.slug}`}
              className="block border rounded p-4 hover:bg-gray-100"
            >
              {rolle.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
} 