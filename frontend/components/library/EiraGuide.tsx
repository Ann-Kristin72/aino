interface EiraGuideProps {
  message: string
  variant?: 'happy' | 'neutral' | 'sad'
}

export default function EiraGuide({ message, variant = 'neutral' }: EiraGuideProps) {
  const emoji = {
    happy: '😊',
    neutral: '🤖',
    sad: '😔'
  }[variant]

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-start gap-3">
        <span className="text-2xl" role="img" aria-label={variant}>
          {emoji}
        </span>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  )
} 