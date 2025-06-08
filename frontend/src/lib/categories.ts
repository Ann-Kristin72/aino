export type Category = {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  icon: string;
};

export const categories: Category[] = [
  {
    id: "beredskap",
    title: "Forebygging og beredskap",
    description: "Risiko, tiltak og sikkerhet",
    bgColor: "bg-amber-100",
    icon: "🛡️"
  },
  {
    id: "intro",
    title: "Introduksjon til nyansatte",
    description: "Startpakke for nye kolleger",
    bgColor: "bg-gray-100",
    icon: "✨"
  },
  {
    id: "kommunikasjon",
    title: "Kommunikasjon",
    description: "Dialog, samspill og samarbeid",
    bgColor: "bg-indigo-100",
    icon: "💬"
  },
  {
    id: "lovverk",
    title: "Lovverk",
    description: "Regelverk, rettigheter og ansvar",
    bgColor: "bg-red-100",
    icon: "⚖️"
  },
  {
    id: "lokasjon",
    title: "Lokasjon og rom",
    description: "Plassering og fysisk kontekst",
    bgColor: "bg-sky-100",
    icon: "🏠"
  },
  {
    id: "observasjon",
    title: "Observasjon og dokumentasjon",
    description: "Oppdage, notere, melde",
    bgColor: "bg-teal-100",
    icon: "👁️"
  },
  {
    id: "psykiskhelse",
    title: "Psykisk helse og rus",
    description: "Trygghet, støtte og forståelse",
    bgColor: "bg-rose-100",
    icon: "🧠"
  },
  {
    id: "smittevern",
    title: "Smittevern og hygiene",
    description: "Renhet og forebygging",
    bgColor: "bg-cyan-100",
    icon: "🧴"
  },
  {
    id: "sykdommer",
    title: "Sykdommer og tiltak",
    description: "Tiltak, diagnoser, støtte",
    bgColor: "bg-yellow-100",
    icon: "🦠"
  },
  {
    id: "utviklingshemming",
    title: "Utviklingshemming",
    description: "Forståelse, tilrettelegging og omsorg",
    bgColor: "bg-lime-100",
    icon: "🏃"
  },
  {
    id: "livetslutt",
    title: "Ved livets slutt",
    description: "Palliasjon og verdighet",
    bgColor: "bg-purple-100",
    icon: "🌅"
  },
  {
    id: "velferdsteknologi",
    title: "Velferdsteknologi",
    description: "Teknologi i hverdagen",
    bgColor: "bg-zinc-100",
    icon: "🤖"
  }
]; 