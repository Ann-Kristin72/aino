"use client";

export default function AIToolsTab() {
  return (
    <div className="p-6 space-y-8">
      {/* AI Tools Header */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">🤖 AI-verktøy</h2>
        <p className="text-purple-700 text-lg">Eira Assistant og intelligente verktøy for innholdsproduksjon</p>
      </section>

      {/* Coming Soon Section */}
      <section className="text-center py-16">
        <div className="text-8xl mb-6">🚀</div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Kommer snart...</h3>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Vi jobber med å integrere avanserte AI-verktøy inkludert Eira Assistant, 
          automatisk innholdsgenerering og intelligente redigeringsverktøy.
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">✍️</div>
            <h4 className="font-semibold text-gray-800 mb-2">AI Forfatter</h4>
            <p className="text-gray-600 text-sm">Automatisk innholdsgenerering basert på prompts</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="font-semibold text-gray-800 mb-2">Quiz Generator</h4>
            <p className="text-gray-600 text-sm">Lag interaktive quizzer fra innhold</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="font-semibold text-gray-800 mb-2">RAG System</h4>
            <p className="text-gray-600 text-sm">Retrieval-Augmented Generation for bedre svar</p>
          </div>
        </div>
      </section>
    </div>
  );
} 