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
  Apple
} from "lucide-react";

const categories = [
  {
    title: "Sykdommer og tiltak",
    description: "Kunnskap om vanlige sykdommer, symptomer og behandlingstiltak",
    icon: Stethoscope,
    color: "bg-blue-50",
    slug: "sykdommer-og-tiltak"
  },
  {
    title: "Psykisk helse",
    description: "Forståelse og håndtering av psykiske lidelser og utfordringer",
    icon: Brain,
    color: "bg-purple-50",
    slug: "psykisk-helse"
  },
  {
    title: "Omsorg og pleie",
    description: "Grunnleggende omsorgsprinsipper og praktiske pleieteknikker",
    icon: Heart,
    color: "bg-red-50",
    slug: "omsorg-og-pleie"
  },
  {
    title: "Kommunikasjon",
    description: "Effektiv kommunikasjon med brukere, pårørende og kollegaer",
    icon: Users,
    color: "bg-green-50",
    slug: "kommunikasjon"
  },
  {
    title: "Trygghet og sikkerhet",
    description: "Arbeidsmiljø, ulykkesforebygging og sikkerhetsrutiner",
    icon: Shield,
    color: "bg-yellow-50",
    slug: "trygghet-og-sikkerhet"
  },
  {
    title: "Hverdagsliv og aktivitet",
    description: "Støtte til daglige aktiviteter og livskvalitet",
    icon: Activity,
    color: "bg-orange-50",
    slug: "hverdagsliv-og-aktivitet"
  },
  {
    title: "Medisin og legemidler",
    description: "Grunnleggende medisinkunnskap og legemiddelhåndtering",
    icon: Pill,
    color: "bg-pink-50",
    slug: "medisin-og-legemidler"
  },
  {
    title: "Hjemmetjeneste",
    description: "Spesifikk kunnskap for hjemmetjenestearbeid",
    icon: Home,
    color: "bg-indigo-50",
    slug: "hjemmetjeneste"
  },
  {
    title: "Demens og kognisjon",
    description: "Forståelse og håndtering av demens og kognitive utfordringer",
    icon: Brain,
    color: "bg-teal-50",
    slug: "demens-og-kognisjon"
  },
  {
    title: "Ernæring",
    description: "Grunnleggende ernæring og kosthold i helse- og omsorgstjenesten",
    icon: Apple,
    color: "bg-emerald-50",
    slug: "ernaering"
  },
  {
    title: "Funksjonshemming",
    description: "Kunnskap om ulike funksjonshemninger og tilrettelegging",
    icon: Accessibility,
    color: "bg-cyan-50",
    slug: "funksjonshemming"
  },
  {
    title: "Barn og unge",
    description: "Spesifikk kunnskap for arbeid med barn og unge",
    icon: Baby,
    color: "bg-rose-50",
    slug: "barn-og-unge"
  },
  {
    title: "Kultur og mangfold",
    description: "Kulturell kompetanse og møte med mangfold",
    icon: Sparkles,
    color: "bg-violet-50",
    slug: "kultur-og-mangfold"
  },
  {
    title: "Læring og utvikling",
    description: "Kontinuerlig læring og profesjonell utvikling",
    icon: BookOpen,
    color: "bg-sky-50",
    slug: "laering-og-utvikling"
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