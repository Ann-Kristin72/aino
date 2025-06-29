import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">404 - Side ikke funnet</h2>
        <p className="text-gray-600 mb-6">Beklager, siden du leter etter eksisterer ikke.</p>
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Gå tilbake til forsiden
        </Link>
      </div>
    </div>
  )
} 