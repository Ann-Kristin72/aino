import { redirect } from 'next/navigation';
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold text-aino-blue">Velkommen til Aino CMS</h1>
      <p className="mt-4 text-lg text-gray-700">
        Dette er startsiden — du er live!
      </p>
      <Link
        href="/admin/super"
        className="inline-block mt-8 px-6 py-3 bg-aino-blue text-white rounded hover:bg-aino-blue-dark transition"
      >
        Gå videre til Admin-panel
      </Link>
    </main>
  );
} 