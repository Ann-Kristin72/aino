import EiraDynamic from '@/components/EiraDynamic';

export default function EiraTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-skifer mb-8">Eira Dynamic Test</h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-skifer mb-6">
            Test Eira's humør-endringer
          </h2>
          <p className="text-skifer/80 mb-8">
            Klikk på emoji-knappene nedenfor for å se Eira endre humør med animerte overganger og glød-effekter.
          </p>
          
          <EiraDynamic />
          
          <div className="mt-8 p-4 bg-latte rounded-lg">
            <h3 className="text-lg font-semibold text-skifer mb-2">Funksjoner:</h3>
            <ul className="text-skifer/80 text-left max-w-md mx-auto space-y-1">
              <li>• Smooth overganger mellom humør</li>
              <li>• Glød-effekt når Eira ikke er nøytral</li>
              <li>• Interaktive emoji-knapper</li>
              <li>• Responsivt design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 