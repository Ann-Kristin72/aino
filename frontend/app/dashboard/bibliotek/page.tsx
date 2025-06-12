import Link from "next/link";
import CategoryCard from "@/components/library/CategoryCard";
import { 
  BookOpen, 
  Heart, 
  Brain, 
  Shield, 
  Users, 
  Home, 
  Activity, 
  Pill, 
  Stethoscope, 
  Utensils, 
  Accessibility,
  Baby, 
  Sparkles,
  Apple,
  MessageSquare,
  Scale,
  Eye,
  Bug,
  Sunset,
  Bot
} from "lucide-react";

const categories = [
  {
    title: "Ernæring",
    description: "Grunnleggende ernæring og kosthold i helse- og omsorgstjenesten",
    icon: Apple,
    color: "bg-emerald-50",
    slug: "ernaering"
  },
  {
    title: "Forebygging og beredskap",
    description: "Risiko, tiltak og sikkerhet",
    icon: Shield,
    color: "bg-amber-50",
    slug: "beredskap"
  },
  {
    title: "Introduksjon til nyansatte",
    description: "Startpakke for nye kolleger",
    icon: Sparkles,
    color: "bg-indigo-50",
    slug: "intro"
  },
  {
    title: "Kommunikasjon",
    description: "Dialog, samspill og samarbeid",
    icon: MessageSquare,
    color: "bg-violet-50",
    slug: "kommunikasjon"
  },
  {
    title: "Lovverk",
    description: "Regelverk, rettigheter og ansvar",
    icon: Scale,
    color: "bg-purple-50",
    slug: "lovverk"
  },
  {
    title: "Lokasjon og rom",
    description: "Plassering og fysisk kontekst",
    icon: Home,
    color: "bg-lime-50",
    slug: "lokasjon"
  },
  {
    title: "Observasjon og dokumentasjon",
    description: "Oppdage, notere, melde",
    icon: Eye,
    color: "bg-cyan-50",
    slug: "observasjon"
  },
  {
    title: "Psykisk helse og rus",
    description: "Trygghet, støtte og forståelse",
    icon: Brain,
    color: "bg-rose-50",
    slug: "psykiskhelse"
  },
  {
    title: "Smittevern og hygiene",
    description: "Renhet og forebygging",
    icon: Bug,
    color: "bg-red-50",
    slug: "smittevern"
  },
  {
    title: "Sykdommer og tiltak",
    description: "Tiltak, diagnoser, støtte",
    icon: Stethoscope,
    color: "bg-orange-50",
    slug: "sykdommer"
  },
  {
    title: "Utviklingshemming",
    description: "Forståelse, tilrettelegging og omsorg",
    icon: Heart,
    color: "bg-yellow-50",
    slug: "utviklingshemming"
  },
  {
    title: "Ved livets slutt",
    description: "Palliasjon og verdighet",
    icon: Sunset,
    color: "bg-slate-50",
    slug: "livetslutt"
  },
  {
    title: "Velferdsteknologi",
    description: "Teknologi i hverdagen",
    icon: Bot,
    color: "bg-teal-50",
    slug: "velferdsteknologi"
  }
];

export default function Page() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Bibliotek</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.slug} href={`/dashboard/bibliotek/${category.slug}`}>
            <CategoryCard
              title={category.title}
              description={category.description}
              icon={category.icon}
              color={category.color}
            />
          </Link>
        ))}
      </div>
    </main>
  );
} 