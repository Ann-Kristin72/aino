import Link from "next/link";

interface AdminCardProps {
  href: string;
  title: string;
  description: string;
  colorClass: string;
}

export default function AdminCard({ href, title, description, colorClass }: AdminCardProps) {
  return (
    <Link href={href} className={`rounded-2xl shadow-md ${colorClass} p-6 hover:brightness-105 transition-all duration-200 hover:shadow-lg hover:scale-105`}>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white text-sm opacity-90">{description}</p>
    </Link>
  );
} 