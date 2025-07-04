"use client";

interface CourseMeta {
  title: string;
  category: string;
  location: string;
  language: string;
  audience: string;
  author: string;
  reviewInterval: string;
  keywords: string;
}

interface MetadataPanelProps {
  courseMeta: CourseMeta;
  setCourseMeta: (meta: CourseMeta) => void;
}

export default function MetadataPanel({ courseMeta, setCourseMeta }: MetadataPanelProps) {
  const handleChange = (field: keyof CourseMeta, value: string) => {
    setCourseMeta({
      ...courseMeta,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tittel
          </label>
          <input
            type="text"
            value={courseMeta.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Kurs tittel..."
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            value={courseMeta.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Velg kategori...</option>
            <option value="Ernæring">Ernæring</option>
            <option value="Forebygging og beredskap">Forebygging og beredskap</option>
            <option value="Introduksjon til nyansatte">Introduksjon til nyansatte</option>
            <option value="Kommunikasjon">Kommunikasjon</option>
            <option value="Lokasjon og rom">Lokasjon og rom</option>
            <option value="Lovverk">Lovverk</option>
            <option value="Observasjon og dokumentasjon">Observasjon og dokumentasjon</option>
            <option value="Psykisk helse og rus">Psykisk helse og rus</option>
            <option value="Smittevern og hygiene">Smittevern og hygiene</option>
            <option value="Sykdommer og tiltak">Sykdommer og tiltak</option>
            <option value="Utviklingshemming">Utviklingshemming</option>
            <option value="Ved livets slutt">Ved livets slutt</option>
            <option value="Velferdsteknologi">Velferdsteknologi</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lokasjon
          </label>
          <select
            value={courseMeta.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Velg lokasjon...</option>
            <option value="Institusjon">Institusjon</option>
            <option value="Hjemmetjenesten">Hjemmetjenesten</option>
            <option value="Miljøarbeidertjenesten">Miljøarbeidertjenesten</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Språk
          </label>
          <select
            value={courseMeta.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="nb-NO">Norsk</option>
            <option value="en">Engelsk</option>
            <option value="sv">Svensk</option>
          </select>
        </div>

        {/* Audience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Målgruppe
          </label>
          <input
            type="text"
            value={courseMeta.audience}
            onChange={(e) => handleChange('audience', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="f.eks. Assistent, Helsefagarbeider..."
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Forfatter
          </label>
          <input
            type="text"
            value={courseMeta.author}
            onChange={(e) => handleChange('author', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Forfatter navn..."
          />
        </div>

        {/* Review Interval */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gjennomgangsintervall (måneder)
          </label>
          <select
            value={courseMeta.reviewInterval}
            onChange={(e) => handleChange('reviewInterval', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="3">3 måneder</option>
            <option value="6">6 måneder</option>
            <option value="12">12 måneder</option>
            <option value="24">24 måneder</option>
          </select>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nøkkelord
          </label>
          <input
            type="text"
            value={courseMeta.keywords}
            onChange={(e) => handleChange('keywords', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="komma-separerte nøkkelord..."
          />
        </div>
      </div>
    </div>
  );
} 