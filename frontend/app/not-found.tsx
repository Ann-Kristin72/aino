import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-latte">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">404 - Side ikke funnet</h2>
        <p className="text-gray-600 mb-6">Beklager, siden du leter etter eksisterer ikke.</p>
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-[#4CB6B6] text-white rounded-lg hover:bg-[#379e9e] transition-colors"
        >
          Gå tilbake til forsiden
        </Link>
      </div>
    </div>
  )
} 