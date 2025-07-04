interface UnitCardProps {
  unit: { 
    id: string; 
    title: string; 
    content: string;
    nanoId?: string;
    illustrationUrl?: string;
  };
  isCompleted: boolean;
  onToggle: () => void;
  loading?: boolean;
}

export function UnitCard({ unit, isCompleted, onToggle, loading = false }: UnitCardProps) {
  return (
    <div
      className={`p-4 rounded-lg shadow-sm border transition-all duration-200 ${
        isCompleted 
          ? 'bg-green-50 border-green-200' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-semibold text-base ${
          isCompleted ? 'text-green-800' : 'text-gray-900'
        }`}>
          {unit.title}
        </h3>
        <div className="flex items-center space-x-2">
          {isCompleted && (
            <span className="text-green-600 text-sm font-medium">
              ✓ Fullført
            </span>
          )}
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={onToggle}
            disabled={loading}
            className={`w-5 h-5 rounded border-2 transition-colors ${
              isCompleted 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 hover:border-gray-400'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          />
        </div>
      </div>
      
      {/* Illustrasjon/bilde/video øverst */}
      {unit.illustrationUrl && (
        <div className="mb-4">
          {unit.illustrationUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
            <img
              src={unit.illustrationUrl}
              alt={unit.title + ' illustrasjon'}
              className="max-w-full h-auto rounded-lg shadow border"
            />
          ) : unit.illustrationUrl.match(/(youtube\.com|youtu\.be)/i) ? (
            <iframe
              src={unit.illustrationUrl.replace('watch?v=', 'embed/')}
              title={unit.title}
              className="w-full aspect-video rounded-lg shadow border"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : unit.illustrationUrl.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              src={unit.illustrationUrl}
              controls
              className="w-full rounded-lg shadow border"
            >
              Din nettleser støtter ikke video.
            </video>
          ) : (
            // Fallback: vis som bilde/iframe
            <iframe
              src={unit.illustrationUrl}
              title={unit.title}
              className="w-full min-h-[200px] rounded-lg shadow border"
            />
          )}
        </div>
      )}
      
      {/* Tekstlig innhold */}
      <div 
        className={`prose prose-sm max-w-none ${
          isCompleted ? 'text-green-700' : 'text-gray-700'
        }`}
        dangerouslySetInnerHTML={{ __html: unit.content }} 
      />
      
      {loading && (
        <div className="mt-3 text-sm text-gray-500">
          Oppdaterer...
        </div>
      )}
    </div>
  );
} 