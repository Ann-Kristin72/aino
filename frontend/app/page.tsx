import { redirect } from 'next/navigation';
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold text-bluegreen">Velkommen til Aino CMS</h1>
      <p className="mt-4 text-lg text-skifer">
        Dette er startsiden — du er live!
      </p>
      <Link
        href="/admin/super"
        className="inline-block mt-8 px-6 py-3 bg-bluegreen text-white rounded hover:bg-teal-700 transition"
      >
        Gå videre til Admin-panel
      </Link>
    </main>
  );
} 