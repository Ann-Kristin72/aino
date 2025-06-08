import { 
  Shield, 
  Sparkles, 
  MessageSquare, 
  Scale, 
  Eye,
  Brain,
  Droplets,
  Bug,
  Heart,
  Sunset,
  Bot,
  Stethoscope,
  Home,
  LucideIcon
} from 'lucide-react';

export type Category = {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  {
    id: "beredskap",
    title: "Forebygging og beredskap",
    description: "Risiko, tiltak og sikkerhet",
    bgColor: "bg-amber-50",
    icon: Shield
  },
  {
    id: "intro",
    title: "Introduksjon til nyansatte",
    description: "Startpakke for nye kolleger",
    bgColor: "bg-indigo-50",
    icon: Sparkles
  },
  {
    id: "kommunikasjon",
    title: "Kommunikasjon",
    description: "Dialog, samspill og samarbeid",
    bgColor: "bg-violet-50",
    icon: MessageSquare
  },
  {
    id: "lovverk",
    title: "Lovverk",
    description: "Regelverk, rettigheter og ansvar",
    bgColor: "bg-purple-50",
    icon: Scale
  },
  {
    id: "lokasjon",
    title: "Lokasjon og rom",
    description: "Plassering og fysisk kontekst",
    bgColor: "bg-lime-50",
    icon: Home
  },
  {
    id: "observasjon",
    title: "Observasjon og dokumentasjon",
    description: "Oppdage, notere, melde",
    bgColor: "bg-cyan-50",
    icon: Eye
  },
  {
    id: "psykiskhelse",
    title: "Psykisk helse og rus",
    description: "Trygghet, støtte og forståelse",
    bgColor: "bg-rose-50",
    icon: Brain
  },
  {
    id: "smittevern",
    title: "Smittevern og hygiene",
    description: "Renhet og forebygging",
    bgColor: "bg-red-50",
    icon: Bug
  },
  {
    id: "sykdommer",
    title: "Sykdommer og tiltak",
    description: "Tiltak, diagnoser, støtte",
    bgColor: "bg-orange-50",
    icon: Stethoscope
  },
  {
    id: "utviklingshemming",
    title: "Utviklingshemming",
    description: "Forståelse, tilrettelegging og omsorg",
    bgColor: "bg-yellow-50",
    icon: Heart
  },
  {
    id: "livetslutt",
    title: "Ved livets slutt",
    description: "Palliasjon og verdighet",
    bgColor: "bg-slate-50",
    icon: Sunset
  },
  {
    id: "velferdsteknologi",
    title: "Velferdsteknologi",
    description: "Teknologi i hverdagen",
    bgColor: "bg-teal-50",
    icon: Bot
  }
]; 