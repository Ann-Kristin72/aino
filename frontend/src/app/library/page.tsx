import CategoryCard from '@/components/CategoryCard';

const categories = [
  { title: "Ernæring og kosthold", description: "Mat, måltid og næring", href: "/library/ernaering" },
  { title: "Forebygging og beredskap", description: "Risiko, tiltak og sikkerhet", href: "/library/beredskap" },
  { title: "Introduksjon til nyansatte", description: "Startpakke for nye kolleger", href: "/library/intro" },
  { title: "Kommunikasjon", description: "Dialog, samspill og samarbeid", href: "/library/kommunikasjon" },
  { title: "Lovverk", description: "Regelverk, rettigheter og ansvar", href: "/library/lovverk" },
  { title: "Lokasjon og rom", description: "Plassering og fysisk kontekst", href: "/library/lokasjon" },
  { title: "Observasjon og dokumentasjon", description: "Oppdage, notere, melde", href: "/library/observasjon" },
  { title: "Psykisk helse og rus", description: "Trygghet, støtte og forståelse", href: "/library/psykiskhelse" },
  { title: "Smittevern og hygiene", description: "Renhet og forebygging", href: "/library/smittevern" },
  { title: "Sykdommer og tiltak", description: "Tiltak, diagnoser, støtte", href: "/library/sykdommer" },
  { title: "Utviklingshemming", description: "Forståelse, tilrettelegging og omsorg", href: "/library/utviklingshemming" },
  { title: "Ved livets slutt", description: "Palliasjon og verdighet", href: "/library/livetslutt" },
  { title: "Velferdsteknologi", description: "Teknologi i hverdagen", href: "/library/velferdsteknologi" }
];

export default function LibraryPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">📚 Innholdsbibliotek</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.title}
            title={cat.title}
            description={cat.description}
            href={cat.href}
          />
        ))}
      </div>
    </main>
  );
} 