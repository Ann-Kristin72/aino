import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Velkommen til Aino
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          AI-drevet plattform for kvalitetssikring, kunnskapsdeling og velferdsteknologisk støtte
        </p>
        <div className="space-x-4">
          <Link 
            href="/admin/super"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Admin Dashboard
          </Link>
          <Link 
            href="/admin/writer"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Admin Writer
          </Link>
        </div>
      </div>
    </div>
  )
} 