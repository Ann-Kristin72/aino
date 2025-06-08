import { 
  Shield, 
  Sparkles, 
  MessageSquare, 
  Scale, 
  Home,
  Eye,
  Brain,
  Droplets,
  Bug,
  Activity,
  Sunset,
  Bot,
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
    bgColor: "bg-amber-100",
    icon: Shield
  },
  {
    id: "intro",
    title: "Introduksjon til nyansatte",
    description: "Startpakke for nye kolleger",
    bgColor: "bg-gray-100",
    icon: Sparkles
  },
  {
    id: "kommunikasjon",
    title: "Kommunikasjon",
    description: "Dialog, samspill og samarbeid",
    bgColor: "bg-indigo-100",
    icon: MessageSquare
  },
  {
    id: "etikk",
    title: "Etikk og lovverk",
    description: "Regler, rettigheter og plikter",
    bgColor: "bg-purple-100",
    icon: Scale
  },
  {
    id: "hverdagsliv",
    title: "Hverdagsliv",
    description: "Daglige gjøremål og rutiner",
    bgColor: "bg-green-100",
    icon: Home
  },
  {
    id: "observasjon",
    title: "Observasjon",
    description: "Kartlegging og vurdering",
    bgColor: "bg-blue-100",
    icon: Eye
  },
  {
    id: "psykiskhelse",
    title: "Psykisk helse",
    description: "Mental helse og velvære",
    bgColor: "bg-pink-100",
    icon: Brain
  },
  {
    id: "ernaering",
    title: "Ernæring",
    description: "Kosthold og måltider",
    bgColor: "bg-orange-100",
    icon: Droplets
  },
  {
    id: "smittevern",
    title: "Smittevern",
    description: "Hygiene og forebygging",
    bgColor: "bg-red-100",
    icon: Bug
  },
  {
    id: "aktivitet",
    title: "Aktivitet",
    description: "Bevegelse og deltakelse",
    bgColor: "bg-yellow-100",
    icon: Activity
  },
  {
    id: "livets-slutt",
    title: "Livets slutt",
    description: "Palliativ omsorg",
    bgColor: "bg-slate-100",
    icon: Sunset
  },
  {
    id: "velferdsteknologi",
    title: "Velferdsteknologi",
    description: "Digitale hjelpemidler",
    bgColor: "bg-teal-100",
    icon: Bot
  }
]; 