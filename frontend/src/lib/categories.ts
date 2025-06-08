export type Category = {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  icon: string;
};

export const categories: Category[] = [
  {
    id: "ernaering",
    title: "Ernæring og kosthold",
    description: "Mat, måltid og næring",
    bgColor: "bg-orange-100",
    icon: "🍽️"
  },
  {
    id: "kommunikasjon",
    title: "Kommunikasjon",
    description: "Dialog, samspill og samarbeid",
    bgColor: "bg-indigo-100",
    icon: "💬"
  },
  {
    id: "dokumentasjon",
    title: "Dokumentasjon",
    description: "Oppdage, notere, melde",
    bgColor: "bg-blue-100",
    icon: "📄"
  },
  {
    id: "observasjon",
    title: "Observasjon",
    description: "Oppdage og vurdere",
    bgColor: "bg-teal-100",
    icon: "👁️"
  },
  {
    id: "lovverk",
    title: "Lovverk",
    description: "Regelverk, rettigheter og ansvar",
    bgColor: "bg-red-100",
    icon: "⚖️"
  },
  {
    id: "psykiskhelse",
    title: "Psykisk helse og rus",
    description: "Trygghet, støtte og forståelse",
    bgColor: "bg-rose-100",
    icon: "🧠"
  },
  {
    id: "institusjon",
    title: "Institusjon og tiltak",
    description: "Bolig, oppfølging og omsorg",
    bgColor: "bg-sky-100",
    icon: "🏠"
  },
  {
    id: "forebygging",
    title: "Forebygging",
    description: "Risiko, tiltak og sikkerhet",
    bgColor: "bg-amber-100",
    icon: "🛡️"
  },
  {
    id: "fysiskhelse",
    title: "Fysisk helse",
    description: "Aktivitet og velvære",
    bgColor: "bg-lime-100",
    icon: "🏃"
  },
  {
    id: "nyansatt",
    title: "Nye ansatte",
    description: "Startpakke for nye kolleger",
    bgColor: "bg-gray-100",
    icon: "✨"
  },
  {
    id: "sykdommer",
    title: "Sykdommer og tiltak",
    description: "Tiltak, diagnoser, støtte",
    bgColor: "bg-yellow-100",
    icon: "🦠"
  },
  {
    id: "smittevern",
    title: "Smittevern og hygiene",
    description: "Renhet og forebygging",
    bgColor: "bg-cyan-100",
    icon: "🧴"
  },
  {
    id: "velferdsteknologi",
    title: "Velferdsteknologi",
    description: "Teknologi i hverdagen",
    bgColor: "bg-zinc-100",
    icon: "🤖"
  }
]; 