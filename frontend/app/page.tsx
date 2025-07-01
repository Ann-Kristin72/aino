import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-joda-sand flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6 bg-white/80 rounded-2xl shadow-xl py-10">
        <Image
          src="/design-guide/eira-neutral-removebg-preview.png"
          alt="Eira – AI assistent"
          width={160}
          height={160}
          className="mx-auto mb-6 rounded-full shadow-lg bg-white"
          priority
        />
        <h1 className="text-4xl font-bold text-joda-teal mb-4 font-slab">
          Velkommen til Aino
        </h1>
        <p className="text-lg text-joda-green mb-8">
          AI-drevet plattform for kvalitetssikring, kunnskapsdeling og velferdsteknologisk støtte
        </p>
        <div className="space-x-4">
          <Link 
            href="/admin/super"
            className="inline-flex items-center px-6 py-3 bg-joda-orange text-white rounded-lg hover:bg-joda-orange/80 transition-colors font-semibold shadow"
          >
            Admin Dashboard
          </Link>
          <Link 
            href="/admin/writer"
            className="inline-flex items-center px-6 py-3 bg-joda-teal text-white rounded-lg hover:bg-joda-teal/80 transition-colors font-semibold shadow"
          >
            Admin Writer
          </Link>
        </div>
      </div>
    </div>
  )
} 